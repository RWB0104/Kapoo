---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 18. WFS에 팝업 붙이기"
excerpt: "지도에 표시된 마커 혹은 객체를 클릭하면, 팝업을 통해 해당 객체의 자세한 정보를 보여준다. 이 장에서는 WFS 지도에 팝업을 출력하여 마커의 세부 정보를 표현해본다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1653487206000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

지도에 표시된 마커 혹은 객체를 클릭하면, 팝업을 통해 해당 객체의 자세한 정보를 보여준다. 이 장에서는 WFS 지도에 팝업을 출력하여 마커의 세부 정보를 표현해본다.

<br />
<br />
<br />










# Overlay

[17장](/projects/2022/05/21/gis-guide-for-programmer-17)에서 다룬 WFS 지도를 그대로 사용한다. `Select` 객체가 포함되어 있으므로, 사용자로 하여금 시각적으로 상호작용이 가능하다는 걸 보여줄 수 있을 것이다.

OpenLayers는 `Overlay` 객체를 통해 지도 위에 원하는 HTML 태그를 띄울 수 있다. OpenLayers가 동작을 담당하긴 하지만, `canvas` 위에서 렌더링되는 객체는 아니고, 실제 DOM을 출력시켜준다.

`Overlay`는 기본적으로 지도 상에서 클릭한 위치를 따라간다. 즉, 지도의 특정 위치에서 `Overlay`를 띄우고 지도를 움직이면, 위치가 고정되지 않고 마커를 따라간다. 이런 동작을 실제 DOM에서 관리하려면 매우 귀찮은 핸들링이 필요할 것이다. 이러한 특징 덕분에 팝업과 매우 잘 어울리는 객체다.

<br />
<br />





## 1. Overlay 생성하기

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





## 2. Map에 적용하기

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





## 3. Overlay 이벤트 적용하기

오버레이를 등록했으니, 적절한 이벤트 핸들링을 통해 오버레이를 띄우고, 원하는 데이터를 보여줄 수 있을 것이다.

``` tsx
map.on('singleclick', (e) =>
{
	// 해당 픽셀에 객체가 있을 경우
	if (map.hasFeatureAtPixel(e.pixel))
	{
		map.forEachFeatureAtPixel(e.pixel, feature =>
		{
			// 해당 객체의 아이디가 buld_sejong으로 시작할 경우
			if (feature.getId()?.toString().startsWith('buld_sejong'))
			{
				const geom = feature.getGeometry();

				// 공간정보가 유효할 경우
				if (geom)
				{
					const [ minX, minY, maxX, maxY ] = geom.getExtent();

					setPopupState((
						<ul>
							<li>{feature.getId() || ''}</li>
							<li>{feature.get('buld_nm') || <span>이름 없음</span>}</li>
							<li>{feature.get('bul_man_no')}</li>
						</ul>
					));

					overlay.setPosition([ (maxX + minX) / 2, (maxY + minY) / 2 ]);
				}
			}
		});
	}

	// 없을 경우
	else
	{
		overlay.setPosition(undefined);
	}
});
```

위와 같이 클릭 이벤트를 적절히 활용한다.

1. 클릭 시, 해당 픽셀에 `Feature`가 있는지 `hasFeatureAtPixel` 메서드로 확인한다.
   1. 없다면 `overlay.setPosition(undefined)`으로 오버레이를 숨긴다.
2. `forEachFeatureAtPixel` 메서드로 해당 픽셀에 위치한 모든 `Feature`를 불러온다.
3. 그 중 우리에게 필요한 `Feature`의 데이터를 확인한다. 
   1. 본문에서는 `Feature`의 아이디가 `buld_sejong`로 시작되는 것들이 대상임.
4. 원하는 데이터를 DOM에 표시한다.
   1. 본문에서는 상태 기반의 데이터 관리를 사용한다.
5. `feature.getGeometry()`로 지오메트리 정보를 호출하여 오버레이의 위치를 계산한다.
   1. 본문에서는 `Feature` 영역의 센터값을 사용
6. `overlay.setPosition([ x, y ])`의 형태로 원하는 위치에 오버레이 출력

위와 같은 방식으로 로직이 진행된다. 물론 어디까지나 사용의 한 예시이므로, 이벤트에 원하는 동작을 기술하여 다양한 동작을 수행할 수 있다.

<br />



## 3-1. Feature에 커서 표시하기

번외로, `Feature`에 마우스 포인터를 호버링할 경우, 마우스 커서 모양을 `pointer`로 지정하여 사용자로 하여금 상호작용이 가능하다는 것을 UI로 표현해줄 수 있다.

``` typescript
map.on('pointermove', (e) => map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '');
```

`pointermove` 이벤트를 통해, 현재 픽셀에 `Feature`가 하나라도 있을 경우 커서 CSS를 `pointer`로 변경한다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/170280310-58a64c75-b529-4ce7-a9b4-09ca6a13abf2.png)

[OpenLayers6 Sandbox - WFS Popup](https://project.itcode.dev/gis-dev/wfs-popup)에서 이를 구현한 예제를 확인할 수 있다.