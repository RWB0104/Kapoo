---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 10. Open Street Map(OSM) 맵 만들기"
excerpt: "OSM이란, 전세계 지도 종사자들이 자율적으로 관리하는 세계지도다. 즉, 지도 분야의 오픈 소스라고 생각하면 이해하기 쉽다. 각 국의 기여자들이 지도를 관리하고 있으며, 각 국가의 영역은 해당하는 국가의 언어로 표시된다. 전세계를 대상으로 하는 서비스에도 무리없이 적용 가능하다는 장점이 있다. 단, 한국 기준으로 지도의 퀄리티가 그리 뛰어나진 않다. OpenLayers는 라이브러리 단계에서 OSM을 기본 제공한다. 즉, 별다른 API 호출이나 설정 없이 간단한 코드 몇 줄 만으로도 웹 상에 세계지도를 띄울 수 있다. 이 장에서는 OpenLayers6를 활용하여 웹 상에 OSM을 띄우는 매우 기초적인 방법에 대해 다룬다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-15T04:53:00+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "OpenLayers" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# Open Street Map

OSM이란, 전세계 지도 종사자들이 자율적으로 관리하는 세계지도다. 즉, 지도 분야의 오픈 소스라고 생각하면 이해하기 쉽다. 각 국의 기여자들이 지도를 관리하고 있으며, 각 국가의 영역은 해당하는 국가의 언어로 표시된다. 전세계를 대상으로 하는 서비스에도 무리없이 적용 가능하다는 장점이 있다. 단, 한국 기준으로 지도의 퀄리티가 그리 뛰어나진 않다.

OpenLayers는 라이브러리 단계에서 OSM을 기본 제공한다. 즉, 별다른 API 호출이나 설정 없이 간단한 코드 몇 줄 만으로도 웹 상에 세계지도를 띄울 수 있다.

이 장에서는 OpenLayers6를 활용하여 웹 상에 OSM을 띄우는 매우 기초적인 방법에 대해 다룬다.

<br />
<br />
<br />










# 웹 사이트에 OSM 띄우기

## 1. OpenLayers 구조 상기하기

일전에 언급했었지만, 혹시 모르니 다시 한 번 OpenLayers의 구조에 대해 짚고 넘어가자.

![image](https://user-images.githubusercontent.com/50317129/156811772-4fd36475-dcc9-41a5-a3ab-c7bcef24e8da.png)

* `Feature`: 점, 선, 면과 같은 요소 (벡터 레이어 한정)
* `Source`: 레이이의 데이터 원천. Feature의 모음과 같다. (SHP, GeoJSON 등)
* `Layer`: 데이터 원천을 토대로 정의한 데이터셋 (벡터, 이미지)
* `View`: 사용자가 현재 맵을 바라보는 방식의 정보
* `Interaction`: 맵의 상호작용 요소 (Zoom in, out 버튼 등)
* `Overlay`: 맵에 표시할 요소

이 장에서는 OSM 하나만 있으면 되므로, 필요한 요소는 아래와 같다.

* `Source`: OSM의 소스
* `Layer`: OSM의 소스로 정의된 OSM 레이어
* `View`: 뷰 정보

나머지 요소는 사용하지 않거나, 기본값을 사용한다.

<br />
<br />





## 2. OSM Source 만들기

OSM 데이터를 관리하는 OSM Source 객체를 생성하자.

``` typescript
import OSM from 'ol/source/OSM';

// 기본
const source = new OSM();

// 옵션 적용
const source = new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>', cacheSize: 0 });
```

|            Name            |                                                                     Type                                                                     |                        Default                         |                                     Description                                      |
| :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------------------------------------: |
|        attributions        | [ol/source/Source-AttributionLike](https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike) &#124; `undefined` |                                                        |                              기여 문구 (지도 우측 하단)                              |
|         cacheSize          |                                                         `number` &#124; `undefined`                                                          |                                                        |                                    타일 캐시 크기                                    |
|        crossOrigin         |                                                            `string` &#124; `null`                                                            |                      `anonymous`                       |                                      CORS 속성                                       |
|     ~~imageSmoothing~~     |                                                                  `boolean`                                                                   |                         `true`                         |                           Deprecated 속성. 보간 사용 여부                            |
|        interpolate         |                                                                  `boolean`                                                                   |                         `true`                         |                                    보간 사용 여부                                    |
|          maxZoom           |                                                                   `number`                                                                   |                          `19`                          |               최대 줌 레벨. 지정된 줌레벨을 초과할 경우 데이터 미출력                |
|           opaque           |                                                                  `boolean`                                                                   |                         `true`                         |                                     불투명 여부                                      |
| reprojectionErrorThreshold |                                                                   `number`                                                                   |                         `0.5`                          |                            최대 재투영 오류 픽셀 (0 ~ 1)                             |
|      tileLoadFunction      |             [ol/Tile-LoadFunction](https://openlayers.org/en/latest/apidoc/module-ol_Tile.html#~LoadFunction) &#124; `undefined`             |                                                        |                                    URL 로드 함수                                     |
|         transition         |                                                                   `number`                                                                   |                         `250`                          |                             렌더링 출력 애니메이션 시간                              |
|            url             |                                                                   `string`                                                                   | `https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png` |                      URL 양식. 중괄호 값은 OL에서 자동으로 할당                      |
|           wrapX            |                                                                  `boolean`                                                                   |                         `true`                         |                                   수직 감싸기 여부                                   |
|         zDirection         | [ol/array-NearestDirectionFunction](https://openlayers.org/en/latest/apidoc/module-ol_array.html#~NearestDirectionFunction) &#124; `number`  |                          `0`                           | 줌 레벨이 실수(ex. 12.552)일 경우 더 높은 타일을 사용할지, 낮은 타일을 사용할지 여부 |

OSM Source는 `OSM`을 통해 생성할 수 있다. 파라미터로 객체 형태의 옵션을 받는다.

그 외 사용할 수 있는 옵션과 메서드의 종류는 [ol/source/OSM](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html)에서 확인하자.

<br />
<br />





## 3. Layer 만들기

OSM Source를 담을 Layer 객체를 생성한다. 이 Layer는 할당된 OSM Source를 통해 OSM 지도를 표출해줄 것이다.

``` typescript
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const source = new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>', cacheSize: 0 });

const layer = new TileLayer({
	source: source,
	properties: { name: 'base-osm' },
	zIndex: 1,
	preload: Infinity
});
```

|          Name          |                                                                Type                                                                 |  Default   |                            Description                            |
| :--------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :--------: | :---------------------------------------------------------------: |
|       className        |                                                              `string`                                                               | `ol-layer` |                             클래스명                              |
|        opacity         |                                                              `number`                                                               |    `1`     |                          투명도 (0 ~ 1)                           |
|        visible         |                                                              `boolean`                                                              |   `true`   |                             표시 여부                             |
|         extent         |            [ol/extent-Extent](https://openlayers.org/en/latest/apidoc/module-ol_extent.html#~Extent) &#124; `undefined`             |            | 레이어의 렌더링 범위. 해당 범위를 넘어가면 데이터를 표시하지 않음 |
|         zIndex         |                                                     `number` &#124; `undefined`                                                     |            |                  우선 순위 (높을수록 위에 표시)                   |
|     minResolution      |                                                     `number` &#124; `undefined`                                                     |            |                         최소 표시 해상도                          |
|     maxResolution      |                                                     `number` &#124; `undefined`                                                     |            |                         최대 표시 해상도                          |
|        minZoom         |                                                     `number` &#124; `undefined`                                                     |            |                         최소 표시 줌 레벨                         |
|        maxZoom         |                                                     `number` &#124; `undefined`                                                     |            |                         최대 표시 줌 레벨                         |
|        preload         |                                                              `number`                                                               |    `0`     |      지정한 레벨까지 저해상도 타일을 미리 로드 (0은 미사용)       |
|         source         |    [ol/source/Tile-TileSource](https://openlayers.org/en/latest/apidoc/module-ol_source_Tile-TileSource.html) &#124; `undefined`    |            |                           레이어의 소스                           |
|          map           | [ol/PluggableMap-PluggableMap](https://openlayers.org/en/latest/apidoc/module-ol_PluggableMap-PluggableMap.html) &#124; `undefined` |            |        지정한 `Map` 객체에서 해당 레이어를 오버레이로 사용        |
| useInterimTilesOnError |                                                              `boolean`                                                              |   `true`   |                    오류 시 중간타일 사용 여부                     |
|       properties       |                                                     `object` &#124; `undefined`                                                     |            |             임의 속성. `get()`, `set()`으로 조작 가능             |

`TileLayer` 객체를 통해 타일 레이어를 생성할 수 있다.

옵션의 `source`는 필수 옵션으로, 이 옵션을 비우면 레이어에 아무 것도 뜨지 않아 레이어의 의미가 없다.

`properties`는 레이어의 임의의 속성을 지정할 수 있다. 위 처럼 레이어의 고유 식별자를 할당해주면, 레이어를 관리하는 데 도움이 된다. `Map` 객체에서 레이어를 뽑아낼 때, 고유 식별자가 없으면 곤란하기 때문.

그 외 사용할 수 있는 옵션과 메서드의 종류는 [ol/layer/Tile](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)에서 확인하자.

> <b class="teal-500">왜 하필 타일맵이야?</b>  
> 배경지도의 경우, 빠른 서비스를 위해 지도를 줌 레벨별로 미리 잘라서 정적 이미지 형태로 관리한다. 때문에 통짜 이미지로 관리하는 것보다, 일정 규격으로 지도를 잘라서 관리하는 것이 관리나 효율성 측면에서도 훨씬 이득이다. 그 큰 지도를 자르지 않고 통짜로 보관하게 되면, 그 이미지 용량은 브라우저가 감당할만한 수준이 아니다.  
>   
> 실제로 필자가 전 직장에서 맵 타일링을 한 적이 있는데, 1 ~ 14레벨까지의 용량은 테라 단위를 가진다. 때문에 잘게 쪼개서 현재 사용자가 보고 있는 범위만 호출하는 게 이득이다.

<br />
<br />





## 4. View 만들기

지도의 뷰잉 정보를 선언할 View 객체를 생성한다.

``` typescript
import View from 'ol/View';

const view = new View({
	projection: 'EPSG:3857',
	center: [ 14135490.777017945, 4518386.883679577 ],
	zoom: 17,
	constrainResolution: true
});
```

`[ 14135490.777017945, 4518386.883679577 ]`은 `EPSG:3857`으로 표기한 서울시청 좌표다.

|            Name            |                                                             Type                                                             |     Default      |                                            Description                                            |
| :------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------: | :-----------------------------------------------------------------------------------------------: |
|           center           | [ol/coordinate-Coordinate](https://openlayers.org/en/latest/apidoc/module-ol_coordinate.html#~Coordinate) &#124; `undefined` |                  |                                            지도의 중심                                            |
|     constrainRotation      |                                                  `boolean` &#124; `number`                                                   |      `true`      |          회전 구속 여부. 숫자일 경우 회전 가능 갯수를 의미 (0일 경우, 90, 180, 270, 360)          |
|       enableRotation       |                                                          `boolean`                                                           |      `true`      |                                          회전 가능 여부                                           |
|           extent           |         [ol/extent-Extent](https://openlayers.org/en/latest/apidoc/module-ol_extent.html#~Extent) &#124; `undefined`         |                  |                         지도의 뷰잉 범위. 지정된 범위 밖을 벗어날 수 없음                         |
|    constrainOnlyCenter     |                                                          `boolean`                                                           |     `false`      |          `true`일 경우 extent 제한이 View 중심에만 적용되며, 전체 extent에 적용되지 않음          |
|   smoothExtentConstraint   |                                                          `boolean`                                                           |      `true`      |                          View가 extent 범위를 약간 벗어날 수 있는지 여부                          |
|       maxResolution        |                                                 `number` &#124; `undefined`                                                  |                  |                          최대 뷰잉 해상도. 지정 해상도 이상 확대 불가능.                          |
|       minResolution        |                                                 `number` &#124; `undefined`                                                  |                  |                          최소 뷰잉 해상도. 지정 해상도 이상 축소 불가능.                          |
|          maxZoom           |                                                           `number`                                                           |       `28`       |                         최대 뷰잉 줌 레벨. 지정 줌 레벨 이상 확대 불가능.                         |
|          minZoom           |                                                           `number`                                                           |       `0`        |                         최소 뷰잉 줌 레벨. 지정 줌 레벨 이상 축소 불가능.                         |
|         multiWorld         |                                                          `boolean`                                                           |     `false`      |                                        다중 월드 사용 여부                                        |
|    constrainResolution     |                                                          `boolean`                                                           |     `false`      |                                     줌 레벨 정수만 허용 여부                                      |
| smoothResolutionConstraint |                                                          `boolean`                                                           |      `true`      |                                  느슨한 확대/축소 규칙 사용 여부                                  |
|       showFullExtent       |                                                          `boolean`                                                           |     `false`      |                                   전체 구성된 extent 표시 여부                                    |
|         projection         |            [ol/proj-ProjectionLike](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#~ProjectionLike)             |   `EPSG:3857`    |                                              좌표계                                               |
|         resolution         |                                                 `number` &#124; `undefined`                                                  |                  |                                            초기 해상도                                            |
|        resolutions         |                                              `Array<number>` &#124; `undefined`                                              |                  | 사용 가능한 해상도 목록 (내림차순) `max/minResolution`, `max/minZoom`, `zoomFactor` 옵션이 무시됨 |
|          rotation          |                                                           `number`                                                           |       `0`        |                                            기본 회전값                                            |
|            zoom            |                                                 `number` &#124; `undefined`                                                  |                  |                                           기본 줌 레벨                                            |
|         zoomFactor         |                                                           `number`                                                           |       `2`        |                                              줌 배율                                              |
|          padding           |                                                       `Array<number>`                                                        | `[ 0, 0, 0, 0 ]` |                                               패딩                                                |

`View` 객체를 통해, 지도의 뷰잉 정보를 선언할 수 있다.

`smoothResolutionConstraint` 옵션은, 예를 들어 지도의 크기가 `width: 120px`, `height: 80px`이라고 가정하자. 기본값 `false`라면, 지도는 최대 80px까지 확대가 가능하다.

그러나 `true`라면, 지도는 최대 120px까지 확대가 가능해진다. 즉, 지도의 확대 기준을 가장 짧은 길이로 할지, 긴 길이로 할지 지정하는 것.

<br />
<br />





## 5. Map 만들기

모든 정보를 종합하여 지도를 만드는 Map 객체를 생성한다.

``` typescript
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const source = new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>', cacheSize: 0 });

const layer = new TileLayer({
	source: source,
	properties: { name: 'base-osm' },
	zIndex: 1,
	preload: Infinity
});

const view = new View({
	projection: 'EPSG:3857',
	center: [ 14135490.777017945, 4518386.883679577 ],
	zoom: 17,
	constrainResolution: true
});

const map = new Map({
	layers: [ layer ],
	target: 'map',
	view: view
});
```

|        Name         |                                                                                                                                                                                                                                    Type                                                                                                                                                                                                                                    |                                             Default                                             |                          Description                           |
| :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------: |
|      controls       |                                                    [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/control/Control-Control](https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html)> &#124; Array<[ol/control/Control-Control](https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html)> &#124; `undefined`                                                    | [ol/control/defaults](https://openlayers.org/en/latest/apidoc/module-ol_control.html#.defaults) |                        지도 컨트롤 객체                        |
|     pixelRatio      |                                                                                                                                                                                                                                  `number`                                                                                                                                                                                                                                  |                                    `window.devicePixelRatio`                                    |                         기기 픽셀 비율                         |
|    interactions     |                            [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/interaction/Interaction-Interaction](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html)> &#124; Array<[ol/interaction/Interaction-Interaction](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html)> &#124; `undefined`                            |                                                                                                 |                                                                |
| keyboardEventTarget |                                                                                                                                                                                                     `HTMLElement` &#124; `Document` &#124; `string` &#124; `undefined`                                                                                                                                                                                                     |                                                                                                 |                    키보드 이벤트 대상 요소                     |
|       layers        | Array<[ol/layer/Base-BaseLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html)> &#124; [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/layer/Base-BaseLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html)> &#124; [ol/layer/Group-LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) &#124; `undefined` |                                                                                                 |       레이어 목록. 배열 뒤에 있을 수록 우선순위가 높아짐       |
|   maxTilesLoading   |                                                                                                                                                                                                                                  `number`                                                                                                                                                                                                                                  |                                              `16`                                               |                 동시 로드 가능한 최대 타일 수                  |
|    moveTolerance    |                                                                                                                                                                                                                                  `number`                                                                                                                                                                                                                                  |                                               `1`                                               | 지도 이동 이벤트로 인식하기 위해 마우스가 움직여야할 최소 픽셀 |
|      overlays       |                                                                    [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/Overlay-Overlay](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html)> &#124; Array<[ol/Overlay-Overlay](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html)> &#124; `undefined`                                                                    |                                                                                                 |                       지도 오버레이 객체                       |
|       target        |                                                                                                                                                                                                              `HTMLElement` &#124; `string` &#124; `undefined`                                                                                                                                                                                                              |                                                                                                 |               지도를 표시할 DOM 혹은 DOM 아이디                |
|        view         |                                                                                                                                    [ol/View-View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html) &#124; Promise<[ol/View-View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html)> &#124; `undefined`                                                                                                                                    |                                                                                                 |                          지도 뷰 객체                          |

`Map` 객체에 지금까지 선언한 객체들을 할당한다. `target`에 지정된 DOM에 선언된 지도가 표시된다.

`target: map`은 아이디가 `map`인 DOM에 지도를 표시한다는 뜻이다. 꼭 아이디가 아니더라도 `HTMLElement`를 할당할 수도 있다.

<br />
<br />
<br />










# 예제 확인하기

[OpenLayers6 Sandbox - OSM](https://project.itcode.dev/gis-dev/osm)에서 이를 구현한 예제를 확인할 수 있다.

단순 OSM 지도를 띄워놓은 페이지므로, 지도 뷰잉 외엔 딱히 상호작용할 요소는 없다.

OSM의 생김새와 국내에 서비스되는 지도의 차이를 비교하는 것도 좋을 것이다.

국내 한정으로 건물 정보가 누락된 곳이 많으며, 대중교통의 표시 또한 굉장히 부실하다. 국내 한정 서비스로는 메리트가 없는 이유.