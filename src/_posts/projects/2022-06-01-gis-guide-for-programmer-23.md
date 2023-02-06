---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 23. Cluster Map 표현하기"
excerpt: "지도에서 마커의 경우, 사용자와의 상호작용이 일어나는 주요소이기 때문에 통상 WFS 객체로 관리한다. 객체를 기반으로 렌더링하다보니, 데이터가 많아지면 많아질수록 곧 서비스의 비용으로 직결된다. 보다시피, 너무 많은 양의 마커는 데이터로써의 의미를 잃게 된다. 너무나도 많은 요소로 인해 시인성은 극도로 떨어지며, 유의미한 상호작용 또한 불가능하다. 최대한 많은 데이터를 보여주고자 흔히 하는 실수이기도 하다. 시인성 이전에, 저렇게 많은 마커를 표현하는 지도는 매우 느리다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-06-01T02:59:12+09:00"
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

지도에서 마커의 경우, 사용자와의 상호작용이 일어나는 주요소이기 때문에 통상 WFS 객체로 관리한다. 객체를 기반으로 렌더링하다보니, 데이터가 많아지면 많아질수록 곧 서비스의 비용으로 직결된다.

![image](https://user-images.githubusercontent.com/50317129/171227755-40fbf5f0-9dcb-4e42-b10d-3b83440920f2.png)

보다시피, 너무 많은 양의 마커는 데이터로써의 의미를 잃게 된다. 너무나도 많은 요소로 인해 시인성은 극도로 떨어지며, 유의미한 상호작용 또한 불가능하다.

최대한 많은 데이터를 보여주고자 흔히 하는 실수이기도 하다. 시인성 이전에, 저렇게 많은 마커를 표현하는 지도는 매우 느리다.

<br />

이 때, Cluster Map을 활용하면 많은 양의 데이터도 비교적 적은 비용으로 표출시킬 수 있다. Cluster Map이란, 마커 위치를 기준으로 일정 거리 이상 가까운 마커들을 그룹화하여 하나의 마커로 표현한 지도다.

이 장에서는 Cluster Map을 활용하여 다량의 데이터를 간단하게 표현해보자.

<br />
<br />
<br />










# Cluster Map

Cluster Map의 유용성을 쉽게 확인하기 위해선, 아래의 조건을 충족하는 데이터가 필요하다.

1. 넓은 지역에 비교적 고르게 분포되어있다. (최소 전국 단위)
2. 데이터의 양이 많다.

지금까지 예시에 활용됐던 데이터는 세종시의 건물 데이터다. 데이터는 많지만, 세종시 자체의 영역이 넓지 않아서, 1번 조건을 충족하지 않는다.

그렇다고 전국의 건물 데이터를 몽땅 사용하기엔 부담이 좀 크다. 고작 예제 페이지 하나에 몇 기가나 되는 데이터를 넣는건 너무 과하다.

<br />

때문에 이번엔 국내 인기 프랜차이즈 중 하나를 선별하여 데이터로 삼았다. 대부분의 프랜차이즈는 각 지점별 주소를 제공하고 있기 때문에, 관련 데이터를 어렵지않게 구할 수 있다. 물론 약간의 후처리는 필요할 것이다.

그 중 이 문서는 스타벅스 지점 데이터를 활용했다. 스타벅스 홈페이지에서 API 형태로 제공하는 데이터를 원본삼아, 후처리를 진행 후, QGIS를 통해 SHP 파일로 만들어 사용했다.

<br />
<br />





## 1. Cluster Source 구성하기

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

생성한 `VectorSource`를 `Cluster` 객체로 감싸면 된다. 방법은 아래와 같다.

``` typescript
const clusterSource = new Cluster({
	source: wfs
});
```

그냥 `Cluster` 객체 선언해서 `source`에다만 할당해주면 된다. 이 과정만으로 Cluster Map을 구현할 수 있다.

나머지 과정은 WFS 지도 생성 과정과 완전히 동일하다. `VectorLayer`의 소스가 `VectorSource`가 아닌 `Cluster`인 것만 유의하면 된다.

|       Name       |                                                                     Type                                                                     | Default |                                                   Description                                                   |
| :--------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :-------------------------------------------------------------------------------------------------------------: |
|   attributions   | [ol/source/Source-AttributionLike](https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike) &#124; `undefined` |         |                                           기여 문구 (지도 우측 하단)                                            |
|     distance     |                                                                   `number`                                                                   |  `20`   |                                              클러스터링 기준 거리                                               |
|   minDistance    |                                                                   `number`                                                                   |   `0`   |                                          클러스터 마커 간의 최소 거리                                           |
| geometryFunction |                                                        `function` &#124; `undefined`                                                         |         | 지오메트리 오버라이딩 메서드<br />클러스터링 시, 이 메서드가 반환하는 지오메트리를 기준으로 클러스터링을 수행함 |
|  createCluster   |                                                        `function` &#124; `undefined`                                                         |         |                                              클러스터 생성 메서드                                               |
|      source      |              [ol/source/Vector-VectorSource](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html)              | `null`  |                                                    소스 객체                                                    |
|      wrapX       |                                                                  `boolean`                                                                   | `true`  |                                                수직 감싸기 여부                                                 |

`Cluster`에 대한 전체 정보는 [공식 문서](https://openlayers.org/en/latest/apidoc/module-ol_source_Cluster-Cluster.html)에서 확인할 수 있다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/171253658-b907a824-c626-42c2-8bbf-1111d8538ffb.png)

[OpenLayers6 Sandbox - Cluster Map](https://project.itcode.dev/gis-dev/cluster-map)에서 이를 구현한 예제를 확인할 수 있다.