---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 15. WFS를 사용하여 지도에 객체 표시하기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-04-04T01:56:03+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# WFS

지금까지는 온전히 OpenLayers만의 기능이였다면, 이 장부터 슬슬 GeoServer와의 연동을 다루게 된다.

그 중 첫 번째로 다룰 기능은, <span class="primary">WFS</span>다. GeoServer에서 WFS는 지정한 요소의 정보를 GeoJSON의 형태로 반환해준다. 이 정보를 적절히 활용하여 지도에 표시할 수 있다.

이러한 기능을 통해 직접 관리하거나 가공한 데이터를 지도에 표시할 수 있다.

<br />
<br />
<br />










# WFS를 활용하여 지도에 표시하기

WFS를 표시하기 위해, 총 4개 객체가 필요하다. 각각 WFS의 결과인 GeoJSON을 담을 `VectorSource`, `VectorSource`를 활용하여 지도를 렌더링하는 `VectorLayer`, 나머지 `View`와 `Map` 객체가 그것이다.

즉 이 4가지 요소를 구현하는 방법을 차례로 설명하여, 최종적으로 WFS를 활용한 지도를 만든다.

<br />
<br />





## 1. WFS URL 구성하기

GeoServer를 통해 데이터를 구축했으므로, GeoServer가 해당 레이어의 WFS 요청을 처리할 수 있다. WFS 호출 URL을 구성해보자.

WFS 중에서도, 속성정보를 제공하는 `GetFeature`를 사용한다. `GetFeature`의 요청방법은 아래와 같다.

``` txt
GET http://localhost:8080/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=test:building&srsName=EPSG:3857&outputFormat=application/json&bbox=14168809.936013725,4366042.924151548,14170735.193663657,4367768.7289308,EPSG:3857
```

|  Parameter   |                   Example                   | Require |                     Description                     |
| :----------: | :-----------------------------------------: | :-----: | :-------------------------------------------------: |
|   service    |                 WFS (고정)                  |    Y    |                      서비스명                       |
|   version    |         2.0.0 (기본), 1.1.0, 1.0.0          |    Y    |                        버전                         |
|   request    |              GetFeature (고정)              |    Y    |                       요청명                        |
|   typename   |            repo_name:layer_name             |    Y    |            레이어명 (다수는 쉼표로 구분)            |
|   srsName    |                  EPSG:4326                  |         | 기준 좌표계 (비울 경우 레이어의 기본 좌표계로 표시) |
| outputFormat |      application/vnd.ogc.se_xml (기본)      |         |                      응답 형식                      |
|  exceptions  |      application/vnd.ogc.se_xml (기본)      |         |                   예외 응답 형식                    |
| propertyName |                  전체 컬럼                  |         |   응답에 포함할 컬럼명 (다수의 경우 쉼표로 구분)    |
|     bbox     | $x_{min},y_{min},x_{max},y_{max}$,EPSG:0000 |         |                     제한할 범위                     |
|  featureID   |                    {id}                     |         |                     Feature ID                      |

본인이 구성한 레이어의 정보에 맞게 URL을 구성하자.

<br />
<br />





## 2. VectorSource 생성하기

OpenLayers의 `VectorSource` 객체는 입력받은 GeoJSON을 직접 해석할 수 있다. 덕분에 잘 구성된 GeoJSON이라면, 별도의 설정이나 매핑과정 없이 간편하게 적용이 가능하다.

위에서 생성한 WFS URL을 토대로 `VectorSource`를 생성한다.

``` typescript
import { Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';

const wfs = new VectorSource({
	format: new GeoJSON(),
	url: (extent) => `http://localhost:8080/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=test:building&srsName=EPSG%3A3857&outputFormat=application%2Fjson&exceptions=application%2Fjson&bbox=${extent[0]}%2C${extent[1]}%2C${extent[2]}%2C${extent[3]}%2CEPSG%3A3857`,
	strategy: bbox
});
```

`VectorSource`에 대한 전체 정보는 [공식 문서](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html)에서 확인할 수 있다.

원래 `Vector`지만, 좀 더 명확한 표현을 위해 `VectorSource`로 명칭을 변경했다.

`VectorSource`는 JSON 형태로 원하는 옵션을 설정할 수 있는데, 위 설정은 가장 기초적인 설정값을 입력한 것이다.

|      Name       |                                                                                                                                                                 Type                                                                                                                                                                 | Default |                                                                                      Description                                                                                      |
| :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  attributions   |                                                                                             [ol/source/Source-AttributionLike](https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike) &#124; `undefined`                                                                                             |         |                                                                              기여 문구 (지도 우측 하단)                                                                               |
|    features     | Array<[ol/Feature-Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)> &#124; [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/Feature-Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)> &#124; `undefined` |         |                                                                                    `Feature` 배열                                                                                     |
|     format      |                                                                                              [ol/format/Feature-FeatureFormat](https://openlayers.org/en/latest/apidoc/module-ol_format_Feature-FeatureFormat.html) &#124; `undefined`                                                                                               |         |                                                  URL 데이터 로더가 데이터를 인식하기 위해 사용하는 포맷. `url`을 설정했을 경우 필수                                                   |
|     loader      |                                                                                               [ol/featureloader-FeatureLoader](https://openlayers.org/en/latest/apidoc/module-ol_featureloader.html#~FeatureLoader) &#124; `undefined`                                                                                               |         |               로더 메서드. 지정하지 않을 경우 기본 로더가 사용됨.<br />`features load end` 및 `features load error` 이벤트는 성공 및 실패 콜백을 사용하는 경우에만 발생               |
|    overlaps     |                                                                                                                                                              `boolean`                                                                                                                                                               | `true`  |                                     중첩된 지오메트리에 대한 처리 방식.<br />`false`일 경우, 렌더러가 지오메트리의 경계 및 채우기 작업을 최적화함                                     |
|    strategy     |                                                                                             [ol/source/Vector-LoadingStrategy](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector.html#~LoadingStrategy) &#124; `undefined`                                                                                             |         | 데이터 렌더링 전략. 기본적으로 [ol/loadingstrategy.all](https://openlayers.org/en/latest/apidoc/module-ol_loadingstrategy.html#.all)를 사용하며, 이는 모든 `Feature`를 한 번에 로드함 |
|       url       |                                                                                  `string` &#124; [ol/featureloader-FeatureUrlFunction](https://openlayers.org/en/latest/apidoc/module-ol_featureloader.html#~FeatureUrlFunction) &#124; `undefined`                                                                                  |         |                                                                                      데이터 URL                                                                                       |
| useSpatialIndex |                                                                                                                                                              `boolean`                                                                                                                                                               | `true`  |                                              공간 인덱스 사용 여부. 피쳐의 변경이 잦거나 수가 적을 경우, `false`로 두면 속도가 향상된다.                                              |
|      wrapX      |                                                                                                                                                              `boolean`                                                                                                                                                               | `true`  |                                                                                   수직 감싸기 여부                                                                                    |



`url`에 할당된 URL에 접근하면, 조건에 맞는 GeoJSON을 반환해준다. `VectorSource`의 `format`이 GeoJSON이므로, 데이터 해석이 가능하다.

현재 바라보는 지도의 영역을 기준으로 로딩하므로, 지도의 영역에 해당하는 데이터를 호출하기 용이하다.

그 외 사용할 수 있는 옵션과 메서드의 종류는 [ol/source/Vector-VectorSource](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html)에서 확인하자.

<br />



## 2-1. WFS URL 직관적으로 생성하기

``` typescript
const url = `http://localhost:8080/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=test:building&srsName=EPSG%3A3857&outputFormat=application%2Fjson&exceptions=application%2Fjson&bbox=${extent[0]}%2C${extent[1]}%2C${extent[2]}%2C${extent[3]}%2CEPSG%3A3857`
```

URL이 위와 같이 구성될 경우, URL의 구성 결과를 확인하기 용이하지만 각 데이터가 한 눈에 들어오지는 않는다. 이런 형태는 오타같은 작은 실수를 놓치기 쉽고, URL을 직접 구성하는 것 또한 피곤하다.

이를 해결하기 위해, JSON 형태로 데이터를 전달받아, 이를 URL Query 형태로 바꿔주는 메서드를 생성했다.

``` typescript
/**
 * URL 빌더 메서드
 *
 * @param {string} host: 호스트
 * @param {{ [ key: string ]: string | number | boolean | undefined }} query: 쿼리 파라미터
 *
 * @returns {string} URL
 */
export function urlBuilder(host: string, query: { [ key: string ]: string | number | boolean | undefined })
{
	const param = Object.entries(query).map(([ key, value ]) => value ? `${key}=${encodeURIComponent(value)}` : '').join('&');

	return `${host}?${param}`;
}

// https://example.com/wfs?name=steve&age=18&actived=true
urlBuilder('https://example.com/wfs', {
	name: 'steve',
	age: 18,
	actived: true
});
```

* `host`: 쿼리를 사용할 대상 URL
  * `http://localhost:8080/test?query=1`에서 `?` 앞의 주소 부분
* `query`: JSON 객체

<br />

위 메서드를 사용하면, WFS의 `url` 부분을 아래와 같이 변경할 수 있다.

``` typescript
const url = (extent) => `http://localhost:8080/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=test:building&srsName=EPSG%3A3857&outputFormat=application%2Fjson&exceptions=application%2Fjson&bbox=${extent[0]}%2C${extent[1]}%2C${extent[2]}%2C${extent[3]}%2CEPSG%3A3857`;

const advanced = (extent) => urlBuilder('http://localhost:8080/geoserver/wfs', {
	service: 'WFS',
	version: '2.0.0',
	request: 'GetFeature',
	typename: 'test:building',
	srsName: 'EPSG:3857',
	outputFormat: 'application/json',
	exceptions: 'application/json',
	bbox: `${extent.join(',')},EPSG:3857`
});
```

`url`과 `advanced`를 비교하면, `advanced` 쪽이 훨씬 직관적임을 확인할 수 있다.

<br />
<br />





## 3. VectorLayer 생성하기

OpenLayers의 `VectorLayer` 객체는 `VectorSource` 객체를 통해 지도를 렌더링한다. 벡터 지도는 단순 그림이 아니라, JS 상에서 일종의 DOM의 형태로 렌더링되기 때문에, 브라우저 상에서 인식이 가능한 실체화된 객체다.

``` typescript
import { Vector as VectorLayer } from 'ol/layer';

const wfsLayer = new VectorLayer({
	source: wfs,
	style: feature => basicStyle(feature, 'buld_nm'),
	minZoom: 15,
	zIndex: 5,
	properties: { name: 'wfs' }
});
```

|          Name          |                                                                                                                                 Type                                                                                                                                  |  Default   |                                                                                          Description                                                                                          |
| :--------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       className        |                                                                                                                               `string`                                                                                                                                | `ol-layer` |                                                                                           클래스명                                                                                            |
|        opacity         |                                                                                                                               `number`                                                                                                                                |    `1`     |                                                                                        투명도 (0 ~ 1)                                                                                         |
|        visible         |                                                                                                                               `boolean`                                                                                                                               |   `true`   |                                                                                           표시 여부                                                                                           |
|         extent         |                                                                             [ol/extent-Extent](https://openlayers.org/en/latest/apidoc/module-ol_extent.html#~Extent) &#124; `undefined`                                                                              |            |                                                               레이어의 렌더링 범위. 해당 범위를 넘어가면 데이터를 표시하지 않음                                                               |
|         zIndex         |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |            |                                                                                우선 순위 (높을수록 위에 표시)                                                                                 |
|     minResolution      |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |            |                                                                                       최소 표시 해상도                                                                                        |
|     maxResolution      |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |            |                                                                                       최대 표시 해상도                                                                                        |
|        minZoom         |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |            |                                                                                       최소 표시 줌 레벨                                                                                       |
|        maxZoom         |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |            |                                                                                       최대 표시 줌 레벨                                                                                       |
|      renderOrder       |                                                                      [ol/render-OrderFunction](https://openlayers.org/en/latest/apidoc/module-ol_render.html#~OrderFunction) &#124; `undefined`                                                                       |            |                                                                                 `Feature`의 렌더링 순서 정렬                                                                                  |
|      renderBuffer      |                                                                                                                               `number`                                                                                                                                |    100     |                                             현재 영역의 버퍼 크기<br />버퍼가 100일 경우, 현재 영역에서 100만큼 더 넓은 영역의 `Feature`를 렌더링                                             |
|         source         | ([ol/source/Vector-VectorSource](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html) &#124; [ol/source/VectorTile-VectorTile](https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html)) &#124; `undefined` |            |                                                                                         레이어의 소스                                                                                         |
|          map           |                                                                  [ol/PluggableMap-PluggableMap](https://openlayers.org/en/latest/apidoc/module-ol_PluggableMap-PluggableMap.html) &#124; `undefined`                                                                  |            |                                                                      지정한 `Map` 객체에서 해당 레이어를 오버레이로 사용                                                                      |
|       declutter        |                                                                                                                               `boolean`                                                                                                                               |  `false`   |                                                                           지도의 이미지, 텍스트의 분해 미사용 여부                                                                            |
|         style          |                                                              [ol/style/Style-StyleLike](https://openlayers.org/en/latest/apidoc/module-ol_style_Style.html#~StyleLike) &#124; `null` &#124; `undefined`                                                               |            | 레이어 스타일. `null`일 경우 고유 스타일을 가진 `Feature`만 렌더링됨<br />기본 스타일은 [ol/style/Style-Style](https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html) 참조 |
|       background       |                                                                [ol/layer/Base-BackgroundColor](https://openlayers.org/en/latest/apidoc/module-ol_layer_Base.html#~BackgroundColor) &#124; `undefined`                                                                 |            |                                                                           레이어의 배경색. 지정하지 않을 경우 투명                                                                            |
|  updateWhileAnimating  |                                                                                                                               `boolean`                                                                                                                               |  `false`   |            `true`일 경우, 애니메이션 과정에서 `Feature` 배치가 재생성됨. `Feature`가 많을 경우 성능이 저하될 우려가 있음<br />`false`일 경우, 애니메이션이 끝나고 배치가 재생성됨             |
| updateWhileInteracting |                                                                                                                               `boolean`                                                                                                                               |   `true`   |                                               `true`일 경우, 상호작용 과정에서 `Feature` 배치가 재생성됨. `updateWhileAnimating` 옵션과 비슷함                                                |
|       properties       |                                                                                                                      `object` &#124; `undefined`                                                                                                                      |            |                                                                           임의 속성. `get()`, `set()`으로 조작 가능                                                                           |

`VectorLayer`에 대한 전체 정보는 [ol/layer/Vector-VectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html)에서 확인할 수 있다.

<br />
<br />





## 4. View 만들기

지도의 뷰잉 정보를 선언할 View 객체를 생성한다.

``` typescript
import View from 'ol/View';
import proj4 from 'proj4';

const view = new View({
	projection: 'EPSG:3857',
	center: proj4('EPSG:4326', 'EPSG:3857', [ 127.28923267492068, 36.48024986578043 ]),
	zoom: 17
});
```

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

<br />



## 3-1. 좌표 변환하기

`[ 127.28923267492068, 36.48024986578043 ]`는 세종시청의 경위도(EPSG:4326) 좌표다. 하지만 이 문서에서 다루는 좌표는 Google 좌표계(EPSG:3857)이다. 좌표체계가 다르므로 이에 맞춰 변환이 필요하다.

`proj4`를 활용하면 좌표변환을 쉽게 구현할 수 있다.

``` typescript
import proj4 from 'proj4';

// 경위도 좌표를 EPSG:5179로 변환
const xy: number[] = proj4('EPSG:5179', 'EPSG:4326', [ x, y ]);
```

위 코드는 EPSG:4326 경위도 좌표를 EPSG:5179로 변환하는 코드다.

