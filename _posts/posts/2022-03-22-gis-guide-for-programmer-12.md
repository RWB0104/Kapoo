---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 12. 맵의 유용한 정보 표시하기"
excerpt: "이전 장에서 OSM을 통해 지도를 표시해봤다. 하지만, OSM의 지도는 디테일함이 떨어진다는 무시할 수 없는 단점이 존재한다. OSM은 사용하기 쉬운 세계지도라는 큰 장점이 있음에도, 저 단점 하나로 인해 국내 서비스용 지도로 사용하기 어렵다. 즉, 예제 이상의 실질적인 서비스에 사용하려면 국내 지리에 특화된 지도가 필요하다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-21T23:51:45+09:00"
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
<br />





## 3. 현재 영역 좌표 추출하기

현재 영역 좌표는 현재 우리가 지도를 바라보는 영역의 좌표다. 지도가 움직이고 확대/축소될 때마다 영역의 좌표가 변경된다.

마찬가지로 영역 좌표 역시 우리가 바라보는 방식에 따라 결정되므로, `View` 객체가 관련된 정보를 갖고 있을 것이다.

``` typescript
const zoom: number | undefined = map.getView().getZoom();
```