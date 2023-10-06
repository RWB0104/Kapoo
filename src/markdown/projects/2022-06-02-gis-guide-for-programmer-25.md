---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 25. WebGL로 초대용량 데이터 표시하기"
excerpt: "WFS 마커는 표현 대상이 많아지면 많아질수록 비용으로 직결된다고 언급한 적이 있었다. 하지만 만약, 정말 만약에, 수 많은 객체를 온전히 마커로 전부 보여줘야 한다면? 어떠한 이유로든 이러한 문제에 당면했을 경우, WebGL이 그 해결책이 될 수 있다. 이 장에서는 WebGL 렌더러를 활용하여 30만개의 마커를 표현해본다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1654099031000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS", "WebGL" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

WFS 마커는 표현 대상이 많아지면 많아질수록 비용으로 직결된다고 언급한 적이 있었다.

하지만 만약, 정말 만약에, 수 많은 객체를 온전히 마커로 전부 보여줘야 한다면? 어떠한 이유로든 이러한 문제에 당면했을 경우, WebGL이 그 해결책이 될 수 있다.

이 장에서는 WebGL 렌더러를 활용하여 30만개의 마커를 표현해본다.

<br />
<br />
<br />










# WebGL

일반적인 OpenLayers의 렌더러로는 약 2만 건 이상의 마커를 표시할 경우 속도가 매우 느려지게 된다.

하지만 이전에도 언급했듯이, 지도 상에 마커를 다닥다닥하게 보여주는 것 자체가 크게 의미가 없으므로, 대다수의 지도 서비스에서는 일정 줌 레벨 이상으로 축소할 경우 마커를 보여주지 않거나 Cluster Map으로 간략화해서 보여준다.

데이터의 시인성을 확보함과 동시에, 렌더링의 부담을 효과적으로 줄일 수 있는 일종의 트릭인 셈이다.

<br />

하지만 WebGL 렌더러를 활용하면 2만 건 이상의 데이터를 한 번에 렌더링하는 것도 무리가 아니게 된다.

<br />
<br />





## 1. 데이터 생성하기

데이터 표출 갯수는 약 30만 건 정도로 잡는다. 데이터 갯수가 30만 건인 이유는 딱히 없다.

``` typescript
const features: Feature<Geometry>[] = [];

let x = 14333482;
let y = 4304950;

for (let i = 0; i < 300000; i++)
{
	x += 500;

	// 500건마다 뒤로 내림
	if (i % 500 === 0)
	{
		y += 500;

		x -= 250000;
	}

	const point = new Point([ x, y ]);

	const feature = new Feature<Geometry>({
		geometry: point
	});

	features.push(feature);
}
```

임의의 위치 `[ 14333482, 4304950 ]`를 기준으로 일정한 위치마다 포인트를 생성하는 로직이다.

한 줄에 500건 씩, 총 600줄의 데이터가 생성된다.

<br />
<br />





## 2. WebGLPointsLayer 생성하기

WebGL을 렌더러로 사용하는 `WebGLPointsLayer`를 생성한다. `VectorLayer`와 큰 차이는 없다.

``` typescript
import WebGLPointsLayer from 'ol/layer/WebGLPoints';

const layer = new WebGLPointsLayer({
	source: source,
	zIndex: 5,
	properties: { name: 'wfs' }
});
```

`WebGLPointsLayer`은 정확한 API Docs가 없는 상태다. `VectorLayer`와 비슷하게 사용해도 큰 무리는 없다.

단, 스타일의 경우 조금 다른데, 기존의 `VectorLayer`는 `Style` 객체를 사용했지만, `WebGLPointsLayer`의 경우 리터럴로 받는다.

예를 들자면 아래와 같은 식이다.

``` json
{
	"symbol": {
		"symbolType": "circle",
		"size": 14,
		"color": "red",
		"opacity": 0.6
	}
}
```

이후의 사용법은 WFS와 동일하다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/171446281-7955f8fd-2140-45e3-8c94-134790c620e7.png)

[OpenLayers6 Sandbox - WebGL](https://project.itcode.dev/gis-dev/webgl)에서 이를 구현한 예제를 확인할 수 있다.

WebGL 적용/미적용을 선택할 수 있으므로, 직접 그 차이를 비교해보는 것도 좋을 것이다.

<br />
<br />
<br />










# 마치며

드디어 길고 길었던 GIS 프로젝트 게시글이 끝났다.

원래 이 정도 분량이 아니였는데, 이것저것 붙이다보니 꽤 많아졌다.

분량도 많아지고, 중간에 블로그 리뉴얼 작업때문에 뒤로 미뤄지는 바람에 시간을 오래 끌고 간 것 같다.

긴 작업기간 동안 중간중간 부족한 부분도 있고, 집중력이 흐려진 부분도 있어보여서 나중에 차근차근 보충해야할 것 같다. 처음부터 완벽하게 쓰려면 한도끝도 없을 것 같아서...

가급적 여러개 병행하는 게 싫어서, 이거 끝나면 다른거 하고 싶어서 뭘 잡질 못 했었는데, 이젠 좀 다른 주제를 잡고 해볼 생각이다.

<br />

그나저나 요즘 무기력증 때문에 집에서 거의 뭘 하질 못 했다. 더군다나 블로그 운영은 개발보다는 자기 PR에 가까운 일이다보니, 이직한지 얼마 안 된 나한텐 취미 그 이상 그 이하의 의미도 가지지 못 한다.

마지막으로 몰두했던 작업이 리뉴얼이였나...

뭔가 하나 잡고 집중하고 싶은데, 딱히 할 것도 없고. 주제 찾는 것도 고역이란 말이지.