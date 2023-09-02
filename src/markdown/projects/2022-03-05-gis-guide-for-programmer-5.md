---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 5. OpenLayers"
excerpt: "OpenLayers는 웹 브라우저에서 지도나 GIS 서비스를 제공하기 위한 JavaScript Library다. GIS 라이브러리 중 진입 장벽은 가장 높지만, 그에 상응하는 강력한 기능을 제공한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-05T03:39:25+09:00"
type: "projects"
category: "GIS"
tag: [ "GIS", "OpenLayers" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# OpenLayers

OpenLayers는 웹 브라우저에서 지도나 GIS 서비스를 제공하기 위한 JavaScript Library다. GIS 라이브러리 중 진입 장벽은 가장 높지만, 그에 상응하는 강력한 기능을 제공한다.

``` bash
 # OpenLayers 설치
yarn add ol
```

OpenLayers는 위와 같이 설치할 수 있다.

<br />
<br />





## OpenLayers의 Map 객체 구조

OpenLayers의 핵심이 되는 `Map` 객체엔 다양한 객체가 있다. 이 객체들이 서로 모이고 엮여, 하나의 상호작용 가능한 맵이 구현된다.

하나의 맵에 많은 객체들이 연관된 만큼, 각각의 객체들이 무엇을 의미하는지 파악하지 못하면 원하는 걸 구현하기 위해 어떤걸 사용해야하는지 모르는 사태가 벌어진다. 불행히 관련 키워드조차 모른다면, 관련 정보를 찾는 것조차 어려워진다. 설상가상으로 GIS라는 영역은 국내에서 자료의 양이 그리 많지 않다.

이런 시간낭비를 미연에 방지하기 위해, OpenLayers의 각 객체가 가지는 특성과, 무엇을 포함하는지와 같은 구조를 이해하면 구현이 좀 더 수월해질 것이다.

![image](https://user-images.githubusercontent.com/50317129/156811772-4fd36475-dcc9-41a5-a3ab-c7bcef24e8da.png)

위 그림은 OpenLayers의 주요 객체들을 도식화한 것이다. (그림의 객체가 OpenLayers의 전부는 아님)

* `Feature`: 점, 선, 면과 같은 요소 (벡터 레이어 한정)
* `Source`: 레이이의 데이터 원천. Feature의 모음과 같다. (SHP, GeoJSON 등)
* `Layer`: 데이터 원천을 토대로 정의한 데이터셋 (벡터, 이미지)
* `View`: 사용자가 현재 맵을 바라보는 방식의 정보
* `Interaction`: 맵의 상호작용 요소 (Zoom in, out 버튼 등)
* `Overlay`: 맵에 표시할 요소

이 외에도 여러 객체들이 모여 하나의 맵을 구성하게 되고, 이 맵이 사용자에게 보여지게 된다.

이를 잘 알아두면, 내가 필요한 정보에 따라 어떤 객체에 접근해야하는지 설계할 수 있다

예를 들어, 각 `Feature`에 접근하고 싶다면, `Map`의 `Layer` 객체에 접근해야한다

또한, 사용자가 바라보는 위치의 중심, 영역이 필요하다면 `View` 객체에 접근해야한다.

버튼을 만들고 싶다? `Interaction`에 길이 있을 것이다.

<br />

그 밖의 다양한 정보들은 [OpenLayers Docs](https://openlayers.org/)를 참고하자. 공식문서가 엄청 자세하고 친절한 편은 아니니 참고할 것.

아 물론, 당연히 영어다.