---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 19. WMS에 팝업 붙이기"
excerpt: "지도에 표시된 마커 혹은 객체를 클릭하면, 팝업을 통해 해당 객체의 자세한 정보를 보여준다. 이 장에서는 WFS 지도에 팝업을 출력하여 마커의 세부 정보를 표현해본다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1653738923000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WMS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

WFS와 같은 객체 기반의 지도가 아닌, WMS와 같이 이미지 기반의 지도에도 팝업을 표현할 수 있을까?

표면적으론 불가능해보인다. WFS의 경우 스크립트 상에서 공간정보를 갖고 있으므로, 이를 적절히 활용하면 원하는 정보를 보여줄 수 있었다. 하지만 WMS의 경우 기반 자체가 이미지이므로, 분석 가능한 데이터로써의 활용성은 매우 떨어진다.

![null](https://user-images.githubusercontent.com/50317129/170293519-b0ed1d98-77ea-4249-89fd-5de5934d3de6.png)

즉, 컴퓨터가 이 한 장의 이미지에서 어떤 객체를 얼마나 갖고 있는지 직접적으로 알 수 없다.

그렇다면 WMS 지도는 팝업을 표현하는 게 불가능한 걸까?

<br />
<br />
<br />










# GetFeatureInfo

이 때 고려해볼만한 것이 이 `GetFeatureInfo`라는 프로토콜이다. `GetFeatureInfo`는 현재 지도의 BBOX, 클릭한 좌표, 지도 상의 픽셀값을 통해 계산된 위치에 있는 `Feature`들의 정보를 제공해준다.

즉, 지도 이미지를 클릭하는 것으로 `Feature`의 존재 여부와 `Feature`의 정보에 대해 캐낼 수 있다. 이를 통해 팝업을 구현할 수 있을 것이다.

<br />

[1장](/projects/2022/05/16/gis-guide-for-programmer-16)에서 다룬 WMS 지도를 그대로 사용한다.

OpenLayers는 `Overlay` 객체를 통해 지도 위에 원하는 HTML 태그를 띄울 수 있다. OpenLayers가 동작을 담당하긴 하지만, `canvas` 위에서 렌더링되는 객체는 아니고, 실제 DOM을 출력시켜준다.

`Overlay`는 기본적으로 지도 상에서 클릭한 위치를 따라간다. 즉, 지도의 특정 위치에서 `Overlay`를 띄우고 지도를 움직이면, 위치가 고정되지 않고 마커를 따라간다. 이런 동작을 실제 DOM에서 관리하려면 매우 귀찮은 핸들링이 필요할 것이다. 이러한 특징 덕분에 팝업과 매우 잘 어울리는 객체다.

<br />
<br />





## 1. GetFeatureInfo URL 구성하기

``` txt
GET https://example.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=test:building&layers=buld_sejong&exceptions=application%2Fjson&INFO_FORMAT=application%2Fjson&I=221&J=178&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=14169590.555392835%2C4366694.551875548%2C14169896.303505976%2C4367000.299988689
```

|   Parameter   |              Example              | Require |                     Description                     |
| :-----------: | :-------------------------------: | :-----: | :-------------------------------------------------: |
|    service    |            WMS (고정)             |    Y    |                      서비스명                       |
|    version    | 1.3.0 (고정), 1.1.1, 1.1.0, 1.0.0 |    Y    |                        버전                         |
|    request    |       GetFeatureInfo (고정)       |    Y    |                       요청명                        |
|    layers     |       repo_name:layer_name        |    Y    |            레이어명 (다수는 쉼표로 구분)            |
|    styles     |              style1               |         |  적용할 스타일명 (`GetFeatureInfo`에선 의미 없음)   |
|  crs(or srs)  |             EPSG:4326             |         | 기준 좌표계 (비울 경우 레이어의 기본 좌표계로 인식) |
|     bbox      | $x_{min},y_{min},x_{max},y_{max}$ |    Y    |                  이미지 영역 좌표                   |
|     width     |                256                |    Y    |                     이미지 넓이                     |
|    height     |                256                |    Y    |                     이미지 높이                     |
| query_layers  |       repo_name:layer_name        |    Y    |       추가 요청 레이어명 (다수는 쉼표로 구분)       |
|  info_format  | application/vnd.ogc.se_xml (기본) |         |                      응답 형식                      |
| feature_count |             1 (기본)              |         |                  최대 객체 호출 수                  |
|    x(or i)    |                225                |    Y    |                   지도의 x 픽셀값                   |
|    y(or j)    |                156                |    Y    |                   지도의 y 픽셀값                   |
|  exceptions   | application/vnd.ogc.se_xml (기본) |         |                   예외 응답 형식                    |

`GetFeatureInfo`의 경우도 `GetImage`와 마찬가지로 입력해야할 파라미터의 갯수가 많다. `GetFeatureInfo` 자체가 클릭 시 해당 위치의 마커 정보를 반환하는 API이므로, 지도 상의 클릭한 위치를 `x`, `y`의 형태로 제공해야한다. 여러모로 까다로운 파라미터들이 많은 편.

다행히 `GetImage`와 마찬가지로 OpenLayers에서 `GetFeatureInfo` URL를 생성해주는 객체를 제공해주니, 이를 사용하면 쉽게 호출할 수 있다. 이 방법은 `Overlay`의 이벤트를 핸들링하는 부분에서 서술한다. 여기선 그냥 순수 URL로 이와 같이 호출할 수 있다는 점만 알아두자.

<br />
<br />





## 2. Overlay 생성하기

`Overlay` 객체를 직접 생성해보자.

|    Parameter     |                                                                  Type                                                                  |               Default                |                                                                              Description                                                                               |
| :--------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|        id        |                                              `number` &#124; `string` &#124; `undefined`                                               |                                      |         오버레이 아이디<br />[ol/Map-Map#getOverlayById](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#getOverlayById) 메서드 호출 시 사용됨          |
|     element      |                                                    `HTMLElement` &#124; `undefined`                                                    |                                      |                                                                         오버레이 대상 Element                                                                          |
|      offset      |                                                            `Array<number>`                                                             |              `[ 0, 0 ]`              |                   오버레이 출력의 오프셋(px)<br />`[ x, y ]`이며, `x`는 좌우, `y`는 상하를 의미한다.<br />각각 값이 커질 수록 우측, 아래로 이동한다.                   |
|     position     | [ol/events/condition-Condition](https://openlayers.org/en/latest/apidoc/module-ol_events_condition.html#~Condition) &#124; `undefined` |                                      |                                                                          오버레이의 출력 위치                                                                          |
|   positioning    |                   [ol/OverlayPositioning](https://openlayers.org/en/latest/apidoc/module-ol_OverlayPositioning.html)                   |              `top-left`              |                                                  오버레이 배치 기준<br />`bottom-left`, `top-right` 등의 값을 가진다.                                                  |
|    stopEvent     |                                                               `boolean`                                                                |                `true`                | 이벤트 전파 여부<br />`true`일 경우 클래스가 `ol-overlay container-stopevent`인 DOM에 배치<br />`false`일 경우 `className` 속성에 지정된 값을 클래스로 가진 DOM에 배치 |
|   insertFirst    |                                                               `boolean`                                                                |                `true`                |                                                          오버레이를 엘리먼트에 먼저 삽입할 지, 추가할 지 선택                                                          |
|     autoPan      |  [ol/Overlay-PanIntoViewOptions](https://openlayers.org/en/latest/apidoc/module-ol_Overlay.html#~PanIntoViewOptions) &#124; `boolean`  |               `false`                |                                               오버레이 `setPosition` 호출 시, 오버레이가 완전히 보이도록 지도 자동 이동                                                |
| autoPanAnimation |                  [ol/Overlay-PanOptions](https://openlayers.org/en/latest/apidoc/module-ol_Overlay.html#~PanOptions)                   |                                      |                         `autoPan` 활성화로 인한 이동 시 애니메이션 설정.<br />`autoPan` 설정이 `boolean`이 아닌 객체일 경우 해당 설정은 무시됨                         |
|  autoPanMargin   |                                                                `number`                                                                |                 `20`                 |                `autoPan` 활성화로 인한 이동 시 오버레이와 지도 테두리 사이의 여백<br />`autoPan` 설정이 `boolean`이 아닌 객체일 경우 해당 설정은 무시됨                |
|  autoPanOptions  | [ol/Overlay-PanIntoViewOptions](https://openlayers.org/en/latest/apidoc/module-ol_Overlay.html#~PanIntoViewOptions) &#124; `undefined` |                                      |                                               `autoPan`의 옵션<br />`autoPanAnimation`, `autoPanMargin` 보다 우선 시 됨                                                |
|    className     |                                                                `string`                                                                | `ol-overlay-container ol-selectable` |                                                                             CSS 클래스 값                                                                              |

생성 방법은 아래와 같다.

``` html
<div id="map-popup"></div>
```

팝업 시 사용할 DOM을 입력한다. DOM을 특정하기 위해 `id` 혹은 `class` 속성을 적절히 활용하자. HTML 코드 상 태그의 위치는 크게 상관없다.

``` typescript
import { Overlay } from 'ol';

const popup = document.getElementById('map-popup') as HTMLElement | null;

const overlay = new Overlay({
	id: 'popup',
	element: popup || undefined,
	positioning: 'center-center',
	autoPan: {
		animation: {
			duration: 250
		}
	}
});
```

태그를 할당하고 적절히 설정하면 `Overlay` 객체를 생성할 수 있다.

`Overlay`에 대한 전체 정보는 [공식 문서](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html)에서 확인할 수 있다.

<br />
<br />





## 3. Map에 적용하기

생성한 `Overlay`를 `Map`에 적용시켜본다.

``` typescript
import { Map } from 'ol';

const map = new Map({
	// ...
	overlays: [ overlay ]
	// ...
});
```

위와 같이 적용이 가능하다. 배열의 형태로 `Overlay`를 등록할 수 있다.

``` typescript
// 오버레이 추가
map.addOverlay();

// 아이디별 오버레이 반환
map.getOverlayById();

// 오버레이 리스트 반환
map.getOverlays();

// 오버레이 제거
map.removeOverlay();
```

관련 메서드는 위와 같다. 생성된 `Map` 객체에서 호출 가능하다.

<br />
<br />





## 3. Overlay 이벤트 적용하고 GetFeatureInfo 호출하기

여기서부터는 WFS와 WMS의 방식이 좀 다르다. WFS의 경우, `GetFeature`의 정보를 토대로 스크립트 상에서 해당 정보에 접근하여 `Feature`의 정보를 바로 보여줄 수 있었다.

하지만 누차 언급하듯이, WMS의 `GetImage`는 공간정보를 토대로 이미지를 렌더링하여 반환하기 때문에, 직접적으로 `Feature`의 정보를 보여주는 데 한계가 있다.

클릭 시 `GetFeatureInfo`를 활용하면 해당 클릭 위치의 `Feature` 데이터를 받아올 수 있으므로, 이를 활용한다.

``` typescript
import ImageLayer from 'ol/layer/Image';

const layer = new TileLayer({
	source: source,
	minZoom: 15,
	properties: { name: 'wms' },
	zIndex: 5
});
```

WMS 레이어는 위와 같이 선언됐다고 가정한다.

``` tsx
map.on('singleclick', (e) =>
{
	// WMS properties의 name이 wms인 레이어를 추출
	const wmsLayer = map.getAllLayers().filter(layer => layer.get('name') === 'wms')[0];

	// WMS 레이어의 Source 호출
	const source: TileWMS | ImageWMS = wmsLayer.getSource();

	// GetFeatureInfo URL 생성
	const url = source.getFeatureInfoUrl(e.coordinate, map.getView().getResolution() || 0, 'EPSG:3857', {
		QUERY_LAYERS: 'test:building',
		INFO_FORMAT: 'application/json'
	});

	// GetFeatureInfo URL이 유효할 경우
	if (url)
	{
		const request = await fetch(url.toString(), { method: 'GET' }).catch(e => alert(e.message));

		// 응답이 유효할 경우
		if (request)
		{
			// 응답이 정상일 경우
			if (request.ok)
			{
				const json = await request.json();

				// 객체가 하나도 없을 경우
				if (json.features.length === 0)
				{
					overlay.setPosition(undefined);
				}

				// 객체가 있을 경우
				else
				{
					// GeoJSON에서 Feature를 생성
					const feature = new GeoJSON().readFeature(json.features[0]);

					// 생성한 Feature로 VectorSource 생성
					const vector = new VectorSource({ features: [ feature ] });

					setPopupState(
						<ul>
							<li>{feature.getId() || ''}</li>
							<li>{feature.get('buld_nm') || <span>이름 없음</span>}</li>
							<li>{feature.get('bul_man_no')}</li>
						</ul>
					);

					overlay.setPosition(getCenter(vector.getExtent()));
				}
			}

			// 아닐 경우
			else
			{
				alert(request.status);
			}
		}
	}
});
```

위와 같이 클릭 이벤트를 적절히 활용한다.

1. 클릭 시, WMS 레이어를 호출한다.
2. WMS 레이어에서 `Source` 객체를 호출한다.
3. `Source` 객체의 `getFeatureInfoUrl` 메서드를 통해 `GetFeatureInfo` URL을 생성한다.
4. GeoServer에 `GetFeatureInfo`를 호출한다.
5. 응답의 GeoJSON을 토대로 `Feature`를 만들어 `VectorSource` 객체를 생성한다.
6. 생성한 `Feature` 객체에서 원하는 데이터를 받아 호출한다.
7. `vector.getExtent()`를 통해 데이터의 실제 위치를 계산하여 `Overlay` 위치로 지정한다.

위와 같은 방식으로 로직이 진행된다. 물론 어디까지나 사용의 한 예시이므로, 이벤트에 원하는 동작을 기술하여 다양한 동작을 수행할 수 있다.

<br />
<br />
<br />










# 예제 확인하기

![null](https://user-images.githubusercontent.com/50317129/170824412-2ca5f1d3-2066-4fd5-a6fc-179b3978a7ae.png)

[OpenLayers6 Sandbox - WMS Popup](https://project.itcode.dev/gis-dev/wms-popup)에서 이를 구현한 예제를 확인할 수 있다.