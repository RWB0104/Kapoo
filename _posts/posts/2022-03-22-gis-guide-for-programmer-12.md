---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 12. 맵의 유용한 정보 표시하기"
excerpt: "도를 다루다보면, 내가 현재 보고있는 영역의 좌표, 지도 상에서 마우스가 위치한 좌표, 줌 레벨 등 다양한 정보를 얻어야할 경우가 생긴다. 이런 니즈를 충족하기 위해, 지도 상에 상태창을 만들어 관련 정보를 출력해주면 필요할 때 유용하게 사용할 수 있을 것이다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-22T22:37:21+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 편의성 확보하기

지도를 다루다보면, 내가 현재 보고있는 영역의 좌표, 지도 상에서 마우스가 위치한 좌표, 줌 레벨 등 다양한 정보를 얻어야할 경우가 생긴다.

이런 니즈를 충족하기 위해, 지도 상에 상태창을 만들어 관련 정보를 출력해주면 필요할 때 유용하게 사용할 수 있을 것이다.

<br />

이 장에선 `Map`에서 유용할만한 정보를 추출하는 방법에 대해 다룬다.

추출할 정보는 아래와 같다.

* 좌표계 EPSG 코드
* 줌 레벨
* 현재 영역의 좌표
* 마우스의 좌표

또한, 아래의 기능을 구현하는 방법 또한 다룬다.

* 지도 레이어 변경

이 과정을 통해 지도의 정보를 직관적으로 보여주고, 사용자가 원하는 타입의 지도(ex. 위성지도)로 즉시 변경할 수 있을 것이다.

<br />
<br />
<br />










# 정보 추출하기

`Map` 객체에서 유용할만한 정보를 추출해보자.

![image](https://user-images.githubusercontent.com/50317129/156811772-4fd36475-dcc9-41a5-a3ab-c7bcef24e8da.png)

* `Feature`: 점, 선, 면과 같은 요소 (벡터 레이어 한정)
* `Source`: 레이이의 데이터 원천. Feature의 모음과 같다. (SHP, GeoJSON 등)
* `Layer`: 데이터 원천을 토대로 정의한 데이터셋 (벡터, 이미지)
* `View`: 사용자가 현재 맵을 바라보는 방식의 정보
* `Interaction`: 맵의 상호작용 요소 (Zoom in, out 버튼 등)
* `Overlay`: 맵에 표시할 요소

OpenLayers의 구조와 연관지어 생각해보자.

`Map` 객체는 코드에서 `map`으로 표기한다.

<br />
<br />





## 1. EPSG 코드 추출하기

EPSG 코드는 현재 우리가 지도를 바라볼 때 사용하는 좌표계 코드다. 우리가 선언한 좌표계에 맞게 모든 배경지도와 객체들이 지도에 렌더링되어 표현된다.

즉, 우리가 바라보는 방식에 따라 결정되므로, `View` 객체가 EPSG 코드와 관련된 정보를 갖고 있을 것이다.

``` typescript
const epsg: string = map.getView().getProjection().getCode();
```

* `getView()`: 맵의 `View` 객체를 반환하는 메서드
* `getProjection()`: `View`에 선언된 `Projection` 객체를 반환하는 메서드
* `getCode()`: `Projection`에 사용된 EPSG 코드를 `string` 형태로 반환하는 메서드

우리가 원하는 EPSG 코드는 최종적으로 `getCode()`에서 얻을 수 있다.

<br />
<br />





## 2. 줌 레벨 추출하기

줌 레벨은 현재 우리가 지도를 바라보는 높이다. 줌 레벨이 크면 클수록 지도가 확대되고, 작으면 작을수록 지도가 축소된다.

즉, 줌 레벨 역시 우리가 바라보는 방식에 따라 결정되므로, `View` 객체가 관련된 정보를 갖고 있을 것이다.

``` typescript
const zoom: number | undefined = map.getView().getZoom();
```

* `getView()`: 맵의 `View` 객체를 반환하는 메서드
* `getZoom()`: 맵의 줌 레벨을 `number` 형태로 반환하는 메서드 (undefined 가능성 있음)

우리가 원하는 줌 레벨은 `getZoom()`에서 얻을 수 있다. `getZoom()`은 줌 레벨을 숫자로 반환하되, `undefined`를 반환할 가능성이 있으므로 값의 예외처리가 필요하다는 점을 참고하자.

<br />

줌 레벨의 경우, 지도를 스크롤 할 때마다 값이 변경된다. 따라서, 이벤트를 통해 줌 레벨 변경 시마다 적절히 반영해주는 것이 중요하다.

지도의 이동이 끝날 때 발생하는 이벤트인 `moveend`가 가장 적절하다. 지도의 이동이 완전히 끝난 후에 줌 레벨을 측정하는 것이 정확하기 때문. 반대로 지도가 시작할 때 발생하는 이벤트인 `movestart`를 사용할 경우, 줌의 이동이 끝나기 전에 측정되므로, 정확한 값이 표시되지 않는다.

``` typescript
map.on('moveend', () =>
{
	const zoom: number | undefined = map.getView().getZoom();
});
```

해당 이벤트에서 줌 레벨의 변경을 감지하고, 해당 값을 적절히 렌더링해서 사용한다.

<br />
<br />





## 3. 현재 영역 좌표 추출하기

현재 영역 좌표는 현재 우리가 지도를 바라보는 영역의 좌표다. 지도가 움직이고 확대/축소될 때마다 영역의 좌표가 변경된다.

마찬가지로 영역 좌표 역시 우리가 바라보는 방식에 따라 결정되므로, `View` 객체가 관련된 정보를 갖고 있을 것이다.

``` typescript
const [ minX, minY, maxX, maxY ]: number[] = map.getView().calculateExtent();
```

* `getView()`: 맵의 `View` 객체를 반환하는 메서드
* `calculateExtent()`: 맵의 현재 범위 좌표를 반환하는 메서드

`calculateExtent()`를 통해 현재 좌표의 영역을 얻을 수 있다. 파라미터로 원하는 픽셀 영역을 입력할 수도 있으며, 이 경우 해당 픽셀에 해당하는 좌표를 반환한다.

<br />

현재 영역의 경우, 지도의 이동에 따라 값이 수시로 변하게 된다. 따라서, 지도 이동 시 이벤트를 캐치하여 지도의 영역을 계산하도록 설계해야한다.

`Map` 객체에 `on()` 메서드를 통해 원하는 이벤트를 삽입할 수 있다. 이 글에서는 `pointermove` 이벤트에 해당 로직을 삽입한다. 지도를 이동하기 위해선 반드시 마우스의 움직임이 요구되기 때문.

``` typescript
map.on('pointermove', e =>
{
	// event에서 Map 객체를 호출할 수 있다.
	const [ minX, minY, maxX, maxY ]: number[] = e.map.getView().calculateExtent();
});
```

값이 변경되는 주기가 워낙 빠르므로, 상태값으로 관리하는 건 그리 좋지 못하다. 짧은 시간에 반복적인 상태값 변경이 일어나므로, 렌더링 문제가 일어나기 때문.

<br />
<br />





## 4. 마우스 위치 좌표 추출하기

마우스 위치 좌표는 현재 지도 상에 마우스가 위치한 좌표다. 지도 상에서 마우스가 움직일 때마다 좌표가 변경된다.

엄밀히 따지면, 마우스의 위치는 `Map`에 종속된 객체는 아니다. 마우스 관련 이벤트가 발생할 때, 이벤트에서 마우스의 위치를 반환해주므로, 필연적으로 마우스 이벤트 안에서 얻을 수 있다.

``` typescript
map.on('pointermove', e =>
{
	const [ x, y ]: number[] = e.coordinate;
});
```

현재 영역과 마찬가지로, 값의 변환이 짧은 시간에 반복적으로 이루어지므로, 상태값으로 관리할 경우 문제가 발생할 수 있다.

<br />
<br />
<br />










# 지도 객체 변경하기

이미 선언된 `Map` 객체와 하위 요소들도 적절한 메서드를 사용하여 변경할 수 있다. 이를 통해 `Source` 객체나, `Layer` 객체 등을 변경할 수도 있다. 즉, 사용자의 상호작용에 따라 지도의 성질을 이에 맞게 변환할 수 있는 것이다.

이 장에서는 레이어를 변경하는 방법에 대해서만 다룬다.

<br />
<br />





## 레이어 추가하기

레이어를 동적으로 추가하는 기능을 통해, 사용자의 상호작용에 따른 지도 레이어의 변화를 구현할 수 있다.

이를 통해 초기 화면은 기본 지도만 보여주지만, 이후 사용자의 선택을 통해 추가적인 지도를 표현해주는 식의 구현이 가능하다.

``` typescript
// 위성지도
const vworldSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg' }),
	properties: { name: 'base-vworld-satellite' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

map.addLayer(vworldSatelliteLayer);
```

* `addLayer()`: 맵의 `Layer` 객체를 추가하는 메서드

`BaseLayer`를 상속받아 구현된 `Layer` 객체를 파라미터로 받아 `Map` 객체에 레이어를 추가한다.

<br />
<br />





## 레이어 삭제하기

레이어를 동적으로 삭제하는 기능을 통해, 사용자의 상호작용에 따른 지도 레이어의 변화를 구현할 수 있다.

``` typescript
// 위성지도
map.getAllLayers().forEach(layer =>
{
	if (layer.get('name') === 'target')
	{
		map.removeLayer(layer);
	}
});
```

* `getAllLayers()`: 맵에 선언된 `Layer` 객체의 배열을 반환하는 메서드
* `addLayer()`: 맵의 `Layer` 객체를 삭제하는 메서드

`BaseLayer`를 상속받아 구현된 `Layer` 객체를 파라미터로 받아 해당 레이어를 `Map`에서 삭제한다.

`getAllLayers()`를 통해 `Map`의 레이어 배열을 받을 수 있으며, 이를 통해 원하는 레이어를 추출하여 제거할 수 있다.

지금껏 `Layer`를 선언할 때, 항상 `properties` 객체를 지정했는데, 그 이유가 여기에 있다. 레이어명 규칙을 따서 `properties`에 할당하면, 내가 원하는 레이어를 쉽게 찾을 수 있기 때문이다. 이런 고유값이 없다면 원하는 레이어를 찾기 난감하다.

<br />
<br />





## 기타

그 밖에도 `Map` 객체는 하위 객체의 동적 CUD를 위한 다양한 메서드를 제공한다. 비단, `Layer` 뿐만 아니라, `Control`, `Overlay`, `Interaction` 등의 하위 객체를 동적으로 관리할 수 있다. 원리는 `Layer`와 동일하다.

추가하려는 객체를 생성한 뒤, `Map`의 메서드 중 적절한 것을 사용하여 추가하고, 삭제하고싶은 요소를 찾아 메서드로 제거하는 방식이다.

<br />
<br />
<br />










# 예제 확인하기

[OpenLayers6 Sandbox - MapInfo](https://project.itcode.dev/gis-dev/map-info)에서 이를 구현한 예제를 확인할 수 있다.

좌측 하단의 패널에서 지도와 관련된 정보 및 레이어 관리가 가능하다.