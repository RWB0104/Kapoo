---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 17. WFS 객체에 상호작용 추가하기"
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

# 이미지와 객체의 차이점은 만질 수 있다는 것

WFS와 WMS의 가장 큰 특징은 데이터의 결과물이다. WFS는 GeoJSON으로 공간정보 요소를 반환해주는 반면, WMS는 공간정보 요소를 토대로 직접 지도를 렌더링하여 제공해준다.

OpenLayers는 WFS의 데이터를 토대로 `canvas`에 객체를 렌더링한다. 공간정보를 토대로 일종의 도형을 그린다고 생각하면 쉽다.

이미지와 다르게 웹 상에서 직접 그려지는 객체이므로, 웹은 이를 인식하거나 조작할 수 있다는 큰 장점이 있다.

<br />

이 문서에서는 일전에 구현한 WFS 지도에서 상호작용을 추가해본다.

<br />
<br />
<br />










# 상호작용 추가하기

[15장](/projects/2022/05/15/gis-guide-for-programmer-15)에서 다룬 WFS 지도를 그대로 사용한다. `Select` 객체를 통해 각 상호작용 별 스타일을 추가할 수 있다.

객체의 마우스 호버, 클릭 등의 상태에 따라 원하는 스타일을 부여하여 객체와의 상호작용을 시각적으로 표현할 수 있다.

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

``` typescript
// 상호작용 추가
map.addInteraction();

// 상호작용 리스트 반환
map.getInteractions();

// 상호작용 제거
map.removeInteraction();
```

관련 메서드는 위와 같다. 생성된 `Map` 객체에서 호출 가능하다. `map.addInteraction()`을 활용할 경우, 상호작용을 추가하는 동작이므로 위에서 언급한 `defaults().extend()`를 사용하지 않아도 된다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/169587097-b2513a74-6dc4-4d34-9b6c-a2acaca92f48.png)

[OpenLayers6 Sandbox - Feature Click](https://project.itcode.dev/gis-dev/feature-click)에서 이를 구현한 예제를 확인할 수 있다.