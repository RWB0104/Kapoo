---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 20. WFS Transaction으로 데이터 추가하기"
excerpt: "지금까지는 GeoServer를 통해 데이터를 호출하고, 이를 표현하는 것이 전부였다. 객체로 표현을 하던, 이미지로 그리던, 데이터를 직접 표현해주던, 결국 어떠한 형태로든 데이터를 보여주는 수준에 그쳤다. 이 문서를 포함하여, 앞으로 서술할 3개 문서는 공간정보 데이터의 삽입/수정/삭제에 대해 다룬다. WFS Transaction 프로토콜을 활용하면 정해진 패턴으로 데이터의 CUD를 수행할 수 있다. 이 중 이 문서에서는 WFS Transaction Insert. 즉, 공간정보 데이터의 추가에 대해 다룬다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1653839746000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

지금까지는 GeoServer를 통해 데이터를 호출하고, 이를 표현하는 것이 전부였다. 객체로 표현을 하던, 이미지로 그리던, 데이터를 직접 표현해주던, 결국 어떠한 형태로든 데이터를 보여주는 수준에 그쳤다.

이 문서를 포함하여, 앞으로 서술할 3개 문서는 공간정보 데이터의 삽입/수정/삭제에 대해 다룬다. WFS Transaction 프로토콜을 활용하면 정해진 패턴으로 데이터의 CUD를 수행할 수 있다.

이 중 이 문서에서는 WFS Transaction Insert. 즉, 공간정보 데이터의 추가에 대해 다룬다.

<br />
<br />
<br />










# 공간정보 데이터 추가하기

WFS Transaction 프로토콜을 활용하면, 공간정보 데이터를 DB가 아닌 웹/앱 등 API 호출이 가능한 다양한 환경에서 데이터를 추가할 수 있다.

본 문서에서의 처리 방식은 아래와 같다.

1. 추가하기 버튼을 누른다.
2. 원하는 모양으로 `Polygon`을 그린다.
   1. 본 문서에서는 `Polygon` 형태만을 다룬다.
3. 삽입할 데이터를 작성한다.
4. WFS Transaction Insert를 통해 데이터를 추가한다.

<br />
<br />





## 1. WFS Transaction Insert URL 구성하기

``` txt
POST https://example.com/geoserver/wfs
```

``` xml
<wfs:Transaction
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	service="WFS"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:Insert>
		<layer_name>
			<column1>value1</column1>
			<column2>value2</column2>
			<column3>value3</column3>
			<geo_column>
				<gml:Polygon srsName="EPSG:4326">
					<gml:outerBoundaryIs>
						<gml:LinearRing>
							<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
						</gml:LinearRing>
					</gml:outerBoundaryIs>
				</gml:Polygon>
			</geo_column>
		</layer_name>
	</wfs:Insert>
</wfs:Transaction>
```

이전까지의 API 호출은 모두 GET으로 이루어졌지만, WFS Transaction의 모든 요청은 POST로 이루어진다. 요청의 body에 위 XML 양식을 입력하여 추가할 데이터를 선언할 수 있다.

* 대상 테이블은 `layer_name`이다.
* 컬럼 `column1`, `column2`, `column3`에 각각 `value1`, `value2`, `value3`을 삽입한다.
  * Schema엔 있으나, 삽입 시 컬럼을 명시하지 않았을 경우, 해당 컬럼은 `null`로 삽입된다.
* 공간정보 컬럼명은 `geo_column`이다.
* 좌표 `x1,y1 x2,y2 x3,y3 x4,y4 x1,y1`의 폴리곤이다.
  * 좌표계는 `EPSG:4326`이다.

XML의 의미는 위와 같다. 직접 지도에 도형을 그린 후, 도형의 좌표값과 넣을 데이터를 입력하여 XML을 생성해야한다.

위 XML은 `Polygon` 데이터를 포함하며, 다른 형식의 데이터 XML이 궁금하다면 [8장](/projects/2022/03/14/gis-guide-for-programmer-8#2.-Transaction)을 참조하자.

<br />
<br />





## 2. Draw 기능 추가하기

지도는 일반적인 WFS 지도를 활용한다. 지도 위에 `Polygon`을 그리기 위해 `Draw` 객체를 추가해보자.

``` typescript
import { Map } from 'ol';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const drawSource = new VectorSource();

const drawLayer = new VectorLayer({
	source: drawSource,
	properties: { name: 'draw' }
});

const drawInteraction = new Draw({
	source: drawLayer.getSource(),
	type: 'Polygon'
});

new Map({
	...
	layers: [ ..., drawLayer ]
});
```

1. 빈 `VectorSource`를 생성한다.
   1. 드로잉되는 객체는 해당 `VectorSource`에 생성된다.
2. `VectorSource`로 `VectorLayer`를 생성한다.
   1. 기존의 `VectorLayer`를 활용하는 것도 가능하다.
3. `VectorSource`로 `Draw` 객체를 생성한다.
   1. `type` 값을 통해 원하는 데이터의 형식을 지정할 수 있다.

<br />
<br />





## 4. Draw 객체에 이벤트 붙이기

`map.addInteraction()` 메서드로 기능을 활성화할 수 있다. 반대로 드로잉 기능을 비활성화하려면, `map.removeInteraction()`으로 `Draw` 객체를 제거해야한다.

즉, `Draw`를 `Map`에 추가해놓고 제거하지 않으면, 드로잉 기능이 계속 활성화되어 있어서 지도를 제대로 조작할 수 없는 현상이 발생한다. 따라서 드로잉 후 적절한 시점에 `Draw` 객체를 `Map`에서 제거해줘야한다.

혹은 `Draw` 객체의 `setActive()` 메서드를 통해서 조작할 수도 있다. `boolean`을 파라미터로 주어 동작 여부를 지정한다.

``` typescript
document.onkeyup = (e) =>
{
	// ESC를 눌렀을 경우
	if (e.key.toLowerCase() === 'escape')
	{
		map.removeInteraction(drawInteraction);
	}
};

document.oncontextmenu = () =>
{
	map.removeInteraction(drawInteraction);
};
```

각각 ESC 키를 눌렀을 때, 오른쪽 마우스 버튼을 눌렀을 때 `Draw` 기능을 해제한다.

`Draw` 객체 또한 이벤트를 지원한다.

``` typescript
// 드로잉 시작 이벤트
drawInteraction.on('drawstart', () => {});

// 드로잉 종료 이벤트
drawInteraction.on('drawend', () => {});

// 드로잉 취소 이벤트
drawInteraction.on('drawabort', () => {});
```

* `drawstart` - 드로잉을 시작할 때
* `drawend` - 드로잉이 종료될 때 (도형을 정상적으로 그림)
* `drawabort` - 드로잉을 취소할 때 (다시 그리기와 비슷)

이 문서에서는 드로잉이 끝날 경우 데이터 입력 폼을 출력한다. 입력이 완료되면 WFS Transaction API를 호출한다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/170878861-a364f06e-3c30-432c-b081-0fd9c096c29d.png)

[OpenLayers6 Sandbox - WFS Transaction Insert](https://project.itcode.dev/gis-dev/transaction-insert)에서 이를 구현한 예제를 확인할 수 있다.