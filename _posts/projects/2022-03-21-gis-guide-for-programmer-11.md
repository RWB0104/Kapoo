---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 11. VWorld 맵 만들기"
excerpt: "이전 장에서 OSM을 통해 지도를 표시해봤다. 하지만, OSM의 지도는 디테일함이 떨어진다는 무시할 수 없는 단점이 존재한다. OSM은 사용하기 쉬운 세계지도라는 큰 장점이 있음에도, 저 단점 하나로 인해 국내 서비스용 지도로 사용하기 어렵다. 즉, 예제 이상의 실질적인 서비스에 사용하려면 국내 지리에 특화된 지도가 필요하다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-21T23:51:45+09:00"
type: "projects"
category: "GIS"
tag: [ "GIS", "OpenLayers" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# OSM만으로 괜찮을까?

이전 장에서 OSM을 통해 지도를 표시해봤다. 하지만, OSM의 지도는 디테일함이 떨어진다는 무시할 수 없는 단점이 존재한다.

![image](https://user-images.githubusercontent.com/50317129/159114894-ea855a99-8989-4979-adda-72ad93bd0e70.png)

OSM은 사용하기 쉬운 세계지도라는 큰 장점이 있음에도, 저 단점 하나로 인해 국내 서비스용 지도로 사용하기 어렵다.

즉, 예제 이상의 실질적인 서비스에 사용하려면 국내 지리에 특화된 지도가 필요하다.

<br />
<br />
<br />










# VWorld

이 때 고려해볼만한 것이 VWorld 지도다. VWorld는 국가기관인 공간정보산업진흥원에서 제공하는 지도다. 국가기관에서 제공하는 지도인 만큼. OSM보다 국내 지리에 좀 더 특화되어 있다.

VWorld는 API 서비스를 제공하며, URL의 형태로 배경지도를 제공하므로, OpenLayers와 호환성이 좋다.

<br />

VWorld는 여러 타입의 배경지도를 제공하므로, 필요에 맞게 활용할 수 있다.

* 기본지도: 우리가 흔히 사용하는 지도
* 백지도: 일반지도의 흑백버전
* 야간지도: 어두운 배색을 사용하여 야간 가시성을 높인 지도
* 위성지도: 실사지도
* 하이브리드 지도: 도로, 지명만을 강조한 확장용 지도. 단독으로 사용하긴 어렵다.

이 장에서는 OpenLayers를 통해 VWorld를 지도에 띄워본다.

<br />
<br />





## VWorld API Key 발급하기

* [VWorld 홈페이지](https://www.vworld.kr/)

API키를 발급하기 위해선 회원가입이 필요하다. 위 링크에 접속하여 회원가입을 수행하자.

[인증키] - [인증키 발급] 메뉴에서 API 발급을 신청할 수 있다. 발급은 신청 즉시 이루어진다.

![image](https://user-images.githubusercontent.com/50317129/159266446-7dee6a83-f0b0-419a-a88b-1206ac847b86.png)

요구하는 항목을 작성하고 신청하면 된다.

[브이월드 활용API]는 반드시 [WMTS/TMS API]가 체크되어야 한다.

처음 지급되는 키는 개발키로, 개발키는 3개월 간 유효하며, 최대 3번 연장 가능하다.

안정적인 서비스를 원한다면 운영키 신청을 하면 된다. 최대 10일 정도의 심사기간이 있다. 예제 페이지 같은 사이트는 발급해주지 않는 것 같다.

운영키 역시 무제한은 아니고, 1년 주기로 갱신이 필요하며, 갱신을 요청할 때마다 재심사를 거치는 것 같다.

<br />
<br />





## VWorld API 사용하기

VWorld를 요청하는 방법은 아래와 같다.

``` txt
http://api.vworld.kr/req/wmts/1.0.0/{key}/{layer}/{tileMatrix}/{tileRow}/{tileCol}.{tileType}
```

|    Name    |   Description    |                           Value                            |
| :--------: | :--------------: | :--------------------------------------------------------: |
|    key     | 발급받은 API Key |                                                            |
|   layer    |  요청 지도 타입  |     `Base`, `gray`, `midnight`, `Hybrid`, `Satellite`      |
| tileMatrix |    지도 레벨     | 6 ~ 18 (gray, midnight) / 6 ~ 19 (Base, Hybrid, Satellite) |
|  tileRow   |      y좌표       |                                                            |
|  tileCol   |      x좌표       |                                                            |
|  tileType  |      확장자      |               jpeg (Satellite) / png (other)               |

자세한 정보는 [VWorld WMTS/TMS API 레퍼런스](https://www.vworld.kr/dev/v4dv_wmtsguide_s001.do)에서 확인할 수 있다.

<br />
<br />
<br />










# 웹 사이트에 VWorld 띄우기

## 1. VWorld Source 만들기

OSM의 경우, OpenLayers에서 자체적으로 `OSM`이라는 객체를 제공했으므로 매우 쉽게 사용이 가능했지만, VWorld의 경우 직접 소스를 구성해줄 필요가 있다.

`XYZ`객체를 통해 VWorld 소스를 만들 수 있다.

``` typescript
import XYZ from 'ol/source/XYZ';

const source = new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/API_KEY/Base/{z}/{y}/{x}.png' });
```

위 URL은 VWorld의 기본지도를 호출하는 URL이다.

|            Name            |                                                                     Type                                                                     |    Default     |                                     Description                                      |
| :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------------: | :----------------------------------------------------------------------------------: |
|        attributions        | [ol/source/Source-AttributionLike](https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike) &#124; `undefined` |                |                              기여 문구 (지도 우측 하단)                              |
|  attributionsCollapsible   |                                                                  `boolean`                                                                   |     `true`     |                                 기여 문구 축소 여부                                  |
|         cacheSize          |                                                         `number` &#124; `undefined`                                                          |                |                                    타일 캐시 크기                                    |
|        crossOrigin         |                                                            `string` &#124; `null`                                                            |  `anonymous`   |                                      CORS 속성                                       |
|     ~~imageSmoothing~~     |                                                                  `boolean`                                                                   |     `true`     |                           Deprecated 속성. 보간 사용 여부                            |
|        interpolate         |                                                                  `boolean`                                                                   |     `true`     |                                    보간 사용 여부                                    |
|           opaque           |                                                                  `boolean`                                                                   |     `true`     |                                     불투명 여부                                      |
|         projection         |                    [ol/proj-ProjectionLike](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#~ProjectionLike)                     |  `EPSG:3857`   |                                        좌표계                                        |
| reprojectionErrorThreshold |                                                                   `number`                                                                   |     `0.5`      |                            최대 재투영 오류 픽셀 (0 ~ 1)                             |
|          maxZoom           |                                                                   `number`                                                                   |      `42`      |               최대 줌 레벨. 지정된 줌레벨을 초과할 경우 데이터 미출력                |
|          minZoom           |                                                                   `number`                                                                   |      `0`       |              최소 줌 레벨. 지정된 줌레벨 보다 미만일 경우 데이터 미출력              |
|       maxResolution        |                                                         `number` &#124; `undefined`                                                          |      `0`       |                  줌 레벨 0의 해상도 (`tileGrid`가 있을 경우 미적용)                  |
|          tileGrid          |                           [ol/tilegrid/TileGrid-TileGrid](module:ol/tilegrid/TileGrid~TileGrid) &#124; `undefined`                           |      `0`       |                                     타일 그리드                                      |
|      tileLoadFunction      |             [ol/Tile-LoadFunction](https://openlayers.org/en/latest/apidoc/module-ol_Tile.html#~LoadFunction) &#124; `undefined`             |                |                                    타일 로드 함수                                    |
|       tilePixelRatio       |                                                                   `number`                                                                   |      `1`       |                 타일 픽셀 비율 (값이 2일 경우, 타일 픽셀은 512x512)                  |
|          tileSize          |                      `number` &#124; [ol/size-Size](https://openlayers.org/en/latest/apidoc/module-ol_size.html#~Size)                       | `[ 256, 256 ]` |                     타일 사이즈 (`tileGrid`가 있을 경우 미적용)                      |
|      tileUrlFunction       |              [ol/Tile-UrlFunction](https://openlayers.org/en/latest/apidoc/module-ol_Tile.html#~UrlFunction) &#124; `undefined`              |                |                                    URL 반환 함수                                     |
|            url             |                                                         `string` &#124; `undefined`                                                          |                |               URL 양식. `{x}`, `{y}` 혹은 `{-y}`, `{z}`를 포함해야 함                |
|            urls            |                                                      `Array<string>` &#124; `undefined`                                                      |                |                                    URL 양식 배열                                     |
|           wrapX            |                                                                  `boolean`                                                                   |     `true`     |                                   수직 감싸기 여부                                   |
|         transition         |                                                                   `number`                                                                   |     `250`      |                             렌더링 출력 애니메이션 시간                              |
|         zDirection         | [ol/array-NearestDirectionFunction](https://openlayers.org/en/latest/apidoc/module-ol_array.html#~NearestDirectionFunction) &#124; `number`  |      `0`       | 줌 레벨이 실수(ex. 12.552)일 경우 더 높은 타일을 사용할지, 낮은 타일을 사용할지 여부 |

다른 옵션은 몰라도, 자원의 위치를 제공하는 `url` 혹은 `urls`, `tileUrlFunction`은 반드시 명시해야한다.

`url`의 경우 URL에 리터럴 패턴으로 `{x}`, `{y}`, `{-y}`, `{z}` 등을 입력할 수 있는데, 현재 지도의 x, y, z좌표를 URL에 자동으로 반영해준다.

그 밖의 동적인 URL 생성이 필요하다면 `tileUrlFunction`을 활용하는 것이 좋다.

그 외 사용할 수 있는 옵션과 메서드의 종류는 [ol/source/XYZ](https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html)에서 확인하자.

<br />

여담으로, 이전 장에서 다뤘던 `OSM` 객체 또한 `XYZ` 객체를 확장하여 구현한 객체다.

<br />
<br />





## 2. Layer 만들기

XYZ Source를 담을 Layer 객체를 생성한다. 이 Layer는 할당된 XYZ Source를 통해 VWorld 지도를 표출해줄 것이다.

``` typescript
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

// 기본지도
const vworldBaseLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-base' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

// 백지도
const vworldGrayLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/gray/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-gray' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

// 야간지도
const vworldMidnightLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/midnight/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-midnight' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

// 하이브리드 지도
const vworldHybridLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png' }),
	properties: { name: 'ext-vworld-hybrid' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 3,
	preload: Infinity
});

// 위성지도
const vworldSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg' }),
	properties: { name: 'base-vworld-satellite' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
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

<br />
<br />





## 3. View 만들기

``` typescript
import View from 'ol/View';

const view = new View({
	projection: 'EPSG:3857',
	center: [ 14135490.777017945, 4518386.883679577 ],
	zoom: 17
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





## 4. Map 만들기

모든 정보를 종합하여 지도를 만드는 Map 객체를 생성한다.

``` typescript
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

// 기본지도
const vworldBaseLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-base' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

// 하이브리드 지도
const vworldHybridLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png' }),
	properties: { name: 'ext-vworld-hybrid' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 3,
	preload: Infinity
});

const view = new View({
	projection: 'EPSG:3857',
	center: [ 14135490.777017945, 4518386.883679577 ],
	zoom: 17
});

const map = new Map({
	layers: [ vworldBaseLayer, vworldHybridLayer ],
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

![image](https://user-images.githubusercontent.com/50317129/164761239-e80c77e5-1948-43fa-8640-4abc566a90e5.png)

[OpenLayers6 Sandbox - VWorld](https://project.itcode.dev/gis-dev/vworld)에서 이를 구현한 예제를 확인할 수 있다.

4가지 배경 지도와, 확장용 지도인 하이브리드 지도를 확인할 수 있다. 좌측 상단의 패널에서 배경지도를 변경하거나, 확장 지도를 On/Off 할 수 있다.

OSM에 비해 다양한 타입의 지도를 제공함과 동시에, 국내에 최적화된 지도임을 확인할 수 있다.