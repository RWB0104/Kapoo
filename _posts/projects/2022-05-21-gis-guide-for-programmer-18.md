---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 18. WFS에 팝업 붙이기"
excerpt: "WFS와 WMS의 가장 큰 특징은 데이터의 결과물이다. WFS는 GeoJSON으로 공간정보 요소를 반환해주는 반면, WMS는 공간정보 요소를 토대로 직접 지도를 렌더링하여 제공해준다. OpenLayers는 WFS의 데이터를 토대로 `canvas`에 객체를 렌더링한다. 공간정보를 토대로 일종의 도형을 그린다고 생각하면 쉽다. 이미지와 다르게 웹 상에서 직접 그려지는 객체이므로, 웹은 이를 인식하거나 조작할 수 있다는 큰 장점이 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-05-21T03:04:59+09:00"
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers" ]
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





## 1. Select 객체 구성하기

상호작용 디자인을 표현할 땐 `Select` 객체를 사용하면 쉽게 구현할 수 있다.


|    Parameter    |                                                                                                           Type                                                                                                            | Default |                                                                                          Description                                                                                          |
| :-------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  addCondition   |                                          [ol/events/condition-Condition](https://openlayers.org/en/latest/apidoc/module-ol_events_condition.html#~Condition) &#124; `undefined`                                           |         |                                                                                           상태 추가                                                                                           |
|    condition    |                                          [ol/events/condition-Condition](https://openlayers.org/en/latest/apidoc/module-ol_events_condition.html#~Condition) &#124; `undefined`                                           |         |                                                                                             상태                                                                                              |
|     layers      |                                       Array<[ol/layer/Layer-Layer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html)> &#124; `function` &#124; `undefined`                                        |         |                                                                   적용 대상 레이어. 없을 경우, 모든 레이어를 대상으로 적용                                                                    |
|      style      |                                        [ol/style/Style-StyleLike](https://openlayers.org/en/latest/apidoc/module-ol_style_Style.html#~StyleLike) &#124; `null` &#124; `undefined`                                         |         | 레이어 스타일. `null`일 경우 고유 스타일을 가진 `Feature`만 렌더링됨<br />기본 스타일은 [ol/style/Style-Style](https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html) 참조 |
| removeCondition |                                          [ol/events/condition-Condition](https://openlayers.org/en/latest/apidoc/module-ol_events_condition.html#~Condition) &#124; `undefined`                                           |         |                                                                                           상태 삭제                                                                                           |
| toggleCondition |                                          [ol/events/condition-Condition](https://openlayers.org/en/latest/apidoc/module-ol_events_condition.html#~Condition) &#124; `undefined`                                           |         |                                                                                           상태 토글                                                                                           |
|      multi      |                                                                                                         `boolean`                                                                                                         | `false` |                                                                                   피쳐 다중 선택 가능 여부                                                                                    |
|    features     | [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/Feature-Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)> &#124; `undefined` |         |                                                                                  선택된 피쳐들의 컬렉션 반환                                                                                  |
|     filter      |                                   [ol/interaction/Select-FilterFunction](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select.html#~FilterFunction) &#124; `undefined`                                    |         |                                                                                             필터                                                                                              |
|  hitTolerance   |                                                                                                         `number`                                                                                                          |   `0`   |                                                            선택 범위. 값이 커질 수록, 원래 크기보다 더 넓은 반경에서도 선택이 가능                                                            |

hover, click 등의 상태를 `condition`이라 부른다. 기본적인 사용법은 아래와 같다.

``` typescript
import { Select } from 'ol/interaction';
import { click, pointerMove } from 'ol/events/condition';

const hoverSelect = new Select({
	condition: pointerMove,
	style: feature => { ... }
});

const clickSelect = new Select({
	condition: click,
	style: feature => { ... }
});
```

[ol/events/condition-Condition](https://openlayers.org/en/latest/apidoc/module-ol_events_condition.html#~Condition)에 이미 기본적인 상호작용이 선언되어 있으므로, 필요한 상호작용을 가져다 할당만 해주면 된다.

`style`을 통해, 지정된 상호작용 발생 시 원하는 디자인을 보여줄 수 있다.

<br />

`Select`에 대한 전체 정보는 [공식 문서](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select-Select.html)에서 확인할 수 있다.

<br />
<br />





## 2. Map에 적용하기

생성한 `Select`를 `Map`에 적용시켜본다.

``` typescript
import { Map } from 'ol';
import { defaults } from 'ol/interaction';

const map = new Map({
	// ...
	interactions: defaults().extend([ clickSelect, hoverSelect ])
	// ...
});
```

위와 같이 적용이 가능하다. `default()` 메서드는 기본 상호작용 객체다. `extend` 메서드를 활용하여 기존 상호작용에 새로운 상호작용을 확장하는 방식이다.

이런 확장 없이 상호작용을 그냥 할당하게 되면 다른 상호작용이 먹히지 않는다. 여기엔 **지도 이동**과 **확대** 같은 기본적인 상호작용도 포함된다!

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/169587097-b2513a74-6dc4-4d34-9b6c-a2acaca92f48.png)

[OpenLayers6 Sandbox - Feature Click](https://project.itcode.dev/gis-dev/feature-click)에서 이를 구현한 예제를 확인할 수 있다.