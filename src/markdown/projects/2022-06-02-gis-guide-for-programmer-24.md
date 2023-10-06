---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 24. Heat Map 표현하기"
excerpt: "데이터는 보는 관점에 따라, 전혀 새로운 결과를 도출하기도 한다. 지금까지 다뤘던 지도들은 하나같이 데이터를 지도 상에 있는 그대로 보여주는 것에 중점을 뒀었다. 이번 장에서는 Heat Map을 통해, 데이터를 바라보는 관점을 조금 바꿔본다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1654097277000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

데이터는 보는 관점에 따라, 전혀 새로운 결과를 도출하기도 한다. 지금까지 다뤘던 지도들은 하나같이 데이터를 지도 상에 있는 그대로 보여주는 것에 중점을 뒀었다.

이번 장에서는 Heat Map을 통해, 데이터를 바라보는 관점을 조금 바꿔본다.

<br />
<br />
<br />










# Heat Map

Heat Map은 데이터의 분포도를 중점적으로 나타내는 지도다. 데이터들의 분포도, 갯수 등을 계산하여 시각화한다.

![image](https://user-images.githubusercontent.com/50317129/171439560-2afc37c1-6b20-4b9b-adf3-a0055a4983c4.png)

영화 같은 매체에서 한 번쯤 봤을 것이다. 통상 재난(특히 질병)의 분포나 규모를 파악하는 데 주로 쓰인다.

이 처럼 Heat Map은 데이터의 분포를 제공하기 때문에, 데이터의 흐름을 파악하는 데 매우 용이하다. 즉, 나무가 아닌 숲에 관점을 두는 것이다.

<br />

데이터는 마찬가지로 스타벅스 위치 데이터를 사용한다.

<br />
<br />





## 1. Heatmap Layer 구성하기

WFS 지도 생성 방법은 [15장](/projects/2022/05/15/gis-guide-for-programmer-15)을 확인하자.

WFS 지도를 생성하는 과정에서 원본 데이터를 관리하는 `VectorSource`를 생성하게 되며, 과정은 아래와 같다.

``` typescript
const wfs = new VectorSource({
	format: new GeoJSON(),
	url: (extent) => urlBuilder('https://example.com/geoserver/wfs', {
		service: 'WFS',
		version: '2.0.0',
		request: 'GetFeature',
		typename: 'test:building',
		srsName: 'EPSG:3857',
		outputFormat: 'application/json',
		exceptions: 'application/json',
		bbox: `${extent.join(',')},EPSG:3857`
	}),
	strategy: bbox
});
```

Heat Map을 만드는 것 또한, Cluster Map을 만드는 것과 유사하게 사용하는 객체만 조금 바꿔서 사용해주면 된다.

`Source` 객체 중 하나였던 `Cluster`와 달리, `Heatmap` 객체는 `Layer` 객체 중 하나다. 즉, `VectorSource`는 그대로 사용하되, 이를 감싸는 레이어를 `VectorLayer`가 아닌 `Heatmap`으로 감싸주기만 하면 된다.

|     Name      |                                                                                                                                 Type                                                                                                                                  |                   Default                    |                            Description                            |
| :-----------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------: | :---------------------------------------------------------------: |
|   className   |                                                                                                                               `string`                                                                                                                                |                  `ol-layer`                  |                             클래스명                              |
|    opacity    |                                                                                                                               `number`                                                                                                                                |                     `1`                      |                          투명도 (0 ~ 1)                           |
|    visible    |                                                                                                                               `boolean`                                                                                                                               |                    `true`                    |                             표시 여부                             |
|    extent     |                                                                             [ol/extent-Extent](https://openlayers.org/en/latest/apidoc/module-ol_extent.html#~Extent) &#124; `undefined`                                                                              |                                              | 레이어의 렌더링 범위. 해당 범위를 넘어가면 데이터를 표시하지 않음 |
|    zIndex     |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |                                              |                  우선 순위 (높을수록 위에 표시)                   |
| minResolution |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |                                              |                         최소 표시 해상도                          |
| maxResolution |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |                                              |                         최대 표시 해상도                          |
|    minZoom    |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |                                              |                         최소 표시 줌 레벨                         |
|    maxZoom    |                                                                                                                      `number` &#124; `undefined`                                                                                                                      |                                              |                         최대 표시 줌 레벨                         |
|   gradient    |                                                                                                                            `Array<string>`                                                                                                                            | `[ '#00f', '#0ff', '#0f0', '#ff0', '#f00' ]` |                 히트맵 표현에 사용되는 색상 배열                  |
|    radius     |                                                                                                                               `number`                                                                                                                                |                     `8`                      |                           히트맵 반지름                           |
|     blur      |                                                                                                                               `number`                                                                                                                                |                     `15`                     |                            히트맵 블러                            |
|    weight     |                                                                                                                      `string` &#124; `function`                                                                                                                       |                   `weight`                   |                              가중치                               |
|    source     | ([ol/source/Vector-VectorSource](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html) &#124; [ol/source/VectorTile-VectorTile](https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html)) &#124; `undefined` |                                              |                           레이어의 소스                           |
|  properties   |                                                                                                                      `object` &#124; `undefined`                                                                                                                      |                                              |             임의 속성. `get()`, `set()`으로 조작 가능             |

`Heatmap`에 대한 전체 정보는 [공식 문서](https://openlayers.org/en/latest/apidoc/module-ol_layer_Heatmap-Heatmap.html)에서 확인할 수 있다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/171441697-29880b11-235d-435b-bfab-7907b4d33e3d.png)

[OpenLayers6 Sandbox - Heat Map](https://project.itcode.dev/gis-dev/heat-map)에서 이를 구현한 예제를 확인할 수 있다.