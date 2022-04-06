---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 12. 맵의 유용한 정보 표시하기"
excerpt: "지도를 다루다보면, 내가 현재 보고있는 영역의 좌표, 지도 상에서 마우스가 위치한 좌표, 줌 레벨 등 다양한 정보를 얻어야할 경우가 생긴다. 이런 니즈를 충족하기 위해, 지도 상에 상태창을 만들어 관련 정보를 출력해주면 필요할 때 유용하게 사용할 수 있을 것이다."
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










# 맵 정보 컴포넌트 만들기

`Map` 객체를 활용하여 필요한 정보를 제공하는 맵 정보 컴포넌트를 만들면, 여러 지도에서 재사용하기 편할 것이다.

위에서 언급한 방법을 통해 컴포넌트를 구현해보자.

<br />
<br />





## 배경지도 변경 컴포넌트

배경지도를 변경하는 컴포넌트를 만들어보자. 배경지도는 OSM과 VWorld 지도 중 하이브리드 지도를 제외한 4개로, 총 5개의 지도 중 하나를 선택할 수 있다.

이 경우 `select`가 적절할 것이다.

사용할 레이어의 객체들은 아래와 같다.

``` typescript
import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';

export const osmLayer = new TileLayer({
	source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>', cacheSize: 0 }),
	properties: { name: 'base-osm' },
	zIndex: 1,
	preload: Infinity
});

export const vworldBaseLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-base' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

export const vworldGrayLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/gray/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-gray' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

export const vworldMidnightLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/midnight/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-midnight' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

export const vworldSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg' }),
	properties: { name: 'base-vworld-satellite' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});
```

`properties` 객체의 `name`을 통해 지도 종류별 고유값을 지정하여 관리한다. 추후 레이어를 추출할 때, 해당 값이 키가 될 것이다.

배경지도는 기본적으로 `name`의 접두사로 `base`가 붙도록 통일했다.

``` tsx
<select value={layerState} onChange={(e) => setLayerState(e.target.value)}>
	<option value='base-osm'>OSM</option>
	<option value='base-vworld-base'>VWorld 기본</option>
	<option value='base-vworld-gray'>VWorld 흑백</option>
	<option value='base-vworld-midnight'>VWorld 야간</option>
	<option value='base-vworld-satellite'>VWorld 위성</option>
</select>
```

`layerState`, `setLayerState()`는 레이어의 고유값에 대한 상태 관리 객체다.

해당 컴포넌트의 값이 변경될 때마다 `option`의 `value`를 상태값으로 지정하고, `select`에 값을 자동으로 반영하도록 구성된다.

``` typescript
useEffect(() =>
{
	// 배경지도 전체 삭제
	map.getAllLayers().filter(layer => (layer.get('name') as string).startsWith('base')).forEach(layer => map.removeLayer(layer));

	// 선택한 값에 따라 레이어 추가
	switch (layerState)
	{
		case 'base-vworld-base':
			map.addLayer(vworldBaseLayer);
			break;

		case 'base-vworld-gray':
			map.addLayer(vworldGrayLayer);
			break;

		case 'base-vworld-midnight':
			map.addLayer(vworldMidnightLayer);
			break;

		case 'base-vworld-satellite':
			map.addLayer(vworldSatelliteLayer);
			break;

		default:
			map.addLayer(osmLayer);
			setExtState(false);
			break;
	}
}, [ layerState ]);
```

`useEffect()`를 통해 `layerState`가 변경될 때마다 로직을 수행하도록 구성한다.

배경지도 레이어를 전부 삭제하고 변경된 값에 따라 미리 지정된 레이어를 추가하며, 엉뚱한 값이 들어올 경우 OSM으로 기본 지정된다.

OSM으로 선택될 시, VWorld의 확장 지도는 사용이 불가능하도록 할 것이다.

<br />
<br />





## 확장지도 변경 컴포넌트

확장지도의 출력 여부를 변경하는 컴포넌트를 만들어보자. VWorld의 하이브리드 지도가 이에 해당하며, On/Off 형식으로 토글하는 것이 적절하다.

이러한 구조 상, `input[type=checkbox]`가 적절할 것이다.

사용할 레이어의 객체들은 아래와 같다.

``` typescript
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

export const vworldHybridLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png' }),
	properties: { name: 'ext-vworld-hybrid' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 3,
	preload: Infinity
});
```

`properties` 객체의 `name`을 통해 지도 종류별 고유값을 지정하여 관리한다. 추후 레이어를 추출할 때, 해당 값이 키가 될 것이다.

배경지도는 기본적으로 `name`의 접두사로 `ext`가 붙도록 통일했다. 배경지도를 변경할 때, `name`이 `base`로 시작하는 모든 레이어를 삭제하는데, 이 때 확장지도는 이를 피할 수 있을 것이다.

``` tsx
<input type='checkbox' name='ext' checked={extState} disabled={layerState === 'base-osm'} onChange={(e) => setExtState(e.target.checked)} />
```

`extState`, `setExtState()`는 확장지도 표출 여부에 대한 상태 관리 객체다.

체크/해제할 때마다 상태값을 변경하고, `input[type=checkbox]`에 값을 반영하도록 구성한다.

추가로 배경지도가 OSM일 경우, 확장지도의 사용을 막기 위해 `layerState === 'base-osm'`일 경우 비활성화 시킨다.

``` typescript
useEffect(() =>
{
	// 확장 레이어를 추가할 경우
	if (extState)
	{
		map.addLayer(vworldHybridLayer);
	}

	// 확장 레이어를 삭제할 경우
	else
	{
		map.getAllLayers().filter(layer => (layer.get('name') as string).startsWith('ext')).forEach(layer => map.removeLayer(layer));
	}
}, [ extState ]);
```

`useEffect()`를 통해 `extState`가 변경될 때마다 로직을 수행하도록 구성한다.

확장지도를 사용할 경우 확장지도 레이어를 `Map`에 추가하며, 사용하지 않을 경우 확장지도 레이어를 제거한다.

<br />
<br />





## EPSG 코드 표시하기

지도의 EPSG 코드를 표시한다. 단순 `input[type=text]`로 표시만 해준다.

또한, 이 프로젝트의 모든 지도는 좌표계의 동적 변경 기능이 존재하지 않는다. 따라서, 지도가 렌더링 된 후 한 번만 확인하여 표시해주면 된다.

``` tsx
<input name='proj' value={epsg} readOnly />
```

`epsg`, `setEpsg()`는 EPSG 코드에 대한 상태 관리 객체다.

`Map`이 로딩됐을 때, 한 번만 수행해주면 된다. 따라서, 이벤트를 등록하되 한 번만 수행되면 된다.

``` typescript
map.once('postrender', () =>
{
	setEpsg(map.getView().getProjection().getCode());
});
```

* `once()`: 딱 한 번만 수행되는 이벤트를 등록하는 메서드
  * `postrender`: 지도 렌더링 후 수행
* `getView()`: `Map`의 `View` 객체를 반환하는 메서드
* `getProjection()`: `View`의 좌표계 객체를 반환하는 메서드
* `getCode()`: 좌표계 코드를 반환하는 메서드

`Map`이 미처 렌더링되기 이전에 위 메서드를 호출하면 오류가 발생한다. 이 때문에 `Map` 렌더링 이후 동작을 수행해야한다.

`once()`로 한 번만 수행하는 이벤트를 등록했기 때문에, 첫 지도 렌더링이 끝난 후에만 동작한다. 이와 반대로 `on()` 메서드를 사용하면 우리가 흔히 사용하는 일반적인 이벤트를 등록한다.

만약 `postrender`을 `on()`으로 등록했다면, 지도 이동이나 확대/축소 등 지도가 렌더링되는 시점마다 동작을 수행할 것이다. EPSG 코드가 변하지 않는다는 점을 감안하면 연산 낭비.

<br />
<br />





## 줌 레벨 표시하기

줌 레벨을 표시한다. 단순 `input[type=text]`로 표시만 해준다.

줌 레벨의 경우, 지도의 확대/축소 시에 변경이 일어나므로, 이 동작과 가장 적합한 이벤트를 등록하는 것이 좋다. EPSG 코드와 달리 지속적으로 유지되는 이벤트여야한다.

``` tsx
<input name='zoom' readOnly />
```

줌 레벨부터는 상태관리로 값을 관리하지 않는다. 너무 많은 양의 상태 변환이 일어나면 렌더링에 문제가 발생할 수 있기 때문. 물론 줌 레벨의 경우 그 변화의 정도가 많지 않아서, 상태 관리를 사용해도 큰 문제는 발생하지 않는다.

``` typescript
/**
 * 줌 레벨 지정 메서드
 *
 * @param {number} level: 줌 레벨
 */
function setZoom(level: number)
{
	const tag = meta.querySelector('input[name=zoom]');;

	// 태그가 유효할 경우
	if (tag)
	{
		tag.value = level.toString();
	}
}
```

줌 레벨을 표시하는 메서드를 만든다. `level`을 파라미터로 받아, `input`에 할당한다.

``` typescript
map.once('postrender', () =>
{
	const zoom = map.getView().getZoom() || 0;

	setZoom(zoom);
});

map.on('moveend', () =>
{
	const zoom = map.getView().getZoom() || 0;

	setZoom(zoom);
});
```

* `on()`: 지속적으로 수행되는 이벤트를 등록하는 메서드
* `once()`: 딱 한 번만 수행되는 이벤트를 등록하는 메서드
  * `postrender`: 지도 렌더링 후 수행
  * `moveend`: 지도 이동 후 수행
* `getView()`: `Map`의 `View` 객체를 반환하는 메서드
* `getZoom()`: 현재 `View`의 줌 레벨을 반환하는 메서드. `undefined`이 반환될 수 있으므로 적절한 예외처리가 필요하다.

이벤트는 두 개를 등록한다. 하나는 한 번만 수행되는 `postrender` 이벤트. 다른 하나는 지속적으로 수행되는 `moveend` 이벤트다.

줌 레벨의 경우, 지도가 완전히 이동된 후 추출해야 정확하게 나온다. `movestart`와 같이 지도가 막 움직이기 시작할 때 줌 레벨을 추출하면, 현재 레벨에서 다음 레벨로 이동하는 도중의 사이값이 나올 수 있다. 예를 들자면, 지도가 움직이기 시작할 때 이벤트를 등록하면, `14`에서 `15`로 확대될 때, 그 중간값인 `14.2235`와 같이 나오는 식이다.

`postrender` 이벤트를 또 등록하는 이유는 초기값 설정의 필요성 때문. `moveend` 이벤트만 등록했다면, 지도를 이동하기 전까진 줌 레벨을 표시할 수가 없다.

<br />
<br />





## 현재 영역 표시하기

현재 영역을 표시한다. 단순 `input[type=text]`로 표시만 해준다.

현재 영역의 경우, 지도의 이동 시에 변경이 일어나므로, 이 동작과 가장 적합한 이벤트를 등록하는 것이 좋다.

``` tsx
<input name='minX' readOnly />
<input name='minY' readOnly />
<input name='maxX' readOnly />
<input name='maxY' readOnly />
```

현재 영역의 경우, 지도를 이동할 때마다 값의 변경이 일어나므로 상태 관리를 사용하기 부적절하다.

지도가 조금이라도 이동할 때마다 상태값이 미친듯이 바뀌기 때문이다. 만약 상태 관리를 사용한다면 지도를 이동할 때마다 버벅이는 현상을 볼 수 있다.

``` typescript
/**
 * 영역 지정 메서드
 *
 * @param {number[]} pos: 영역
 */
function setBoundary(pos: number[])
{
	const tag1 = boundary.querySelector('input[name=minX]');
	const tag2 = boundary.querySelector('input[name=minY]');
	const tag3 = boundary.querySelector('input[name=maxX]');
	const tag4 = boundary.querySelector('input[name=maxY]');

	// 태그가 유효할 경우
	if (tag1 && tag2 && tag3 && tag4)
	{
		const [ minX, minY, maxX, maxY ] = pos;

		tag1.value = minX.toString();
		tag2.value = minY.toString();
		tag3.value = maxX.toString();
		tag4.value = maxY.toString();
	}
}
```

현재 영역을 표시하는 메서드를 만든다. `pos`를 파라미터로 받아, 각 `input`에 할당한다.

``` typescript
map.once('postrender', () =>
{
	const [ minX, minY, maxX, maxY ] = map.getView().calculateExtent();

	setBoundary([ minX, minY, maxX, maxY ]);
});

map.on('postrender', () => setBoundary(map.getView().calculateExtent()));
```

* `on()`: 지속적으로 수행되는 이벤트를 등록하는 메서드
* `once()`: 딱 한 번만 수행되는 이벤트를 등록하는 메서드
  * `postrender`: 지도 렌더링 후 수행
* `getView()`: 맵의 `View` 객체를 반환하는 메서드
* `calculateExtent()`: 맵의 현재 범위 좌표를 반환하는 메서드

이벤트는 두 개를 등록한다. 이벤트 종류는 `postrender`로 둘 다 동일하다. 초기 영역을 표시하기 위해 `once()`로 한 번, 그 이후는 `on()`으로 이벤트를 등록하여 지도의 이동이 있을 때마다 영역을 계산해서 표시한다.

줌 레벨과 같은 이유로 지도의 렌더링이 완료된 후 영역을 계산하는 것이 가장 정확하다.

<br />
<br />





## 마우스 커서 위치 표시하기

마우스 커서 위치를 표시한다. 단순 `input[type=text]`로 표시만 해준다.

마우스 커서 위치의 경우, 마우스의 이동 시에 변경이 일어나므로, 이 동작과 가장 적합한 이벤트를 등록하는 것이 좋다.

``` tsx
<input name='x' readOnly />
<input name='y' readOnly />
```

마우스 커서 위치 또한 상태 관리를 사용하기엔 부적절하다.

``` typescript
/**
 * 마우스 위치 지정 메서드
 *
 * @param {number[]} pos: 마우스 위치
 */
function setBoundary(pos: number[])
{
	const tag1 = boundary.querySelector('input[name=x]');
	const tag2 = boundary.querySelector('input[name=y]');

	// 태그가 유효할 경우
	if (tag1 && tag2)
	{
		const [ x, y ] = pos;

		tag1.value = x.toString();
		tag2.value = y.toString();
	}
}
```

마우스 커서 위치를 표시하는 메서드를 만든다. `pos`를 파라미터로 받아, 각 `input`에 할당한다.

``` typescript
map.once('postrender', () =>
{
	const [ minX, minY, maxX, maxY ] = map.getView().calculateExtent();
	const [ x, y ] = [ (minX + maxX) / 2, (minY + maxY) / 2 ];

	setPosition([ x, y ]);
});

map.on('pointermove', (e) => setPosition(e.coordinate));
```

* `on()`: 지속적으로 수행되는 이벤트를 등록하는 메서드
* `once()`: 딱 한 번만 수행되는 이벤트를 등록하는 메서드
  * `postrender`: 지도 렌더링 후 수행
  * `pointermove`: 마우스 이동 시 수행
* `getView()`: 맵의 `View` 객체를 반환하는 메서드
* `calculateExtent()`: 맵의 현재 범위 좌표를 반환하는 메서드
* `e.coordinate`: 마우스 이벤트 객체의 좌표 객체

지도 상에 종속된 위치가 아니라, 마우스의 위치이므로 다른 요소와 달리 마우스 관련 이벤트를 등록해야한다.

`pointermove` 이벤트로 마우스 이동 시, 이벤트 객체의 마우스 위치를 통해 이를 표시할 수 있다.

`postrender` 이벤트에선 초기값 표시를 위해, 지도의 중앙을 표시해준다. 지도의 중앙은 현재 영역을 적절히 계산해서 구하거나, `map.getView().getCenter()`를 사용하면 된다.

<br />

위에서 언급한 요소를 모아 하나의 컴포넌트를 만들어 여러 지도에서 재사용할 수 있다. 이 프로젝트에선 `MapBoard`라는 컴포넌트를 구현하여 지도의 정보를 표시한다.

<br />
<br />
<br />










# 예제 확인하기

[OpenLayers6 Sandbox - MapInfo](https://project.itcode.dev/gis-dev/map-info)에서 이를 구현한 예제를 확인할 수 있다.

우측 하단의 패널에서 지도와 관련된 정보 및 레이어 관리가 가능하다.