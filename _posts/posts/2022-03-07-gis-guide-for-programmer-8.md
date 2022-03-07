---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 8. 공간정보 데이터를 주문하는 법. OGC"
excerpt: "OpenLayers는 웹 브라우저에서 지도나 GIS 서비스를 제공하기 위한 JavaScript Library다. GIS 라이브러리 중 진입 장벽은 가장 높지만, 그에 상응하는 강력한 기능을 제공한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-07T01:12:33+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: false
---

# OGC 표준

이전 장에서 GeoServer를 통해 공간정보 데이터 관리 시스템을 구축했다. 이제 이 데이터를 적절히 호출만 하면 될텐데, 이를 어떻게 해야할까?

만약 소프트웨어나 서비스 제공 기관별로 호출방법을 제각각으로 둘 경우 많은 혼란이 야기될 것이다. 어떤 서비스에선 이런 기능이 제공되는데, 어떤 서비스에선 이 기능이 전무한 상황이 빈번할 것이다. 즉, 서비스의 일관성을 해치게 된다. 공간정보라는 복잡한 데이터의 특성 상 일관성의 훼손이 주는 의미는 더욱 크다.

이를 해결하기 위해 적절한 표준을 제정한 것이 OGC 표준이다. OGC(Open Geospatial Consortium)는 공간정보 관련 기술의 개방형 표준화를 개발하고 구현하는 국제 표준화 기구다.

OGC에서 공간정보 질의 표준을 정의한 것이 OGC 표준이다. 공간정보와 관련된 소프트웨어, 웹, 앱 등이 OGC 표준을 준수한다면, 어떤 형태든 동일한 요청 방식으로 데이터를 제공받을 수 있다. 즉, OGC 표준을 준수하는 시스템을 활용한다면, 서비스의 일관성을 지킬 수 있다. 한 번 잘 알아두면 OGC 표준을 준수하는 모든 서비스에서 동일하게 활용이 가능하다. 이러한 편의성으로 인해 정상적인 GIS 솔루션이라면 OGC 표준을 반드시 준수한다.

당연히 OGC 표준 준수는 그냥 막 가져다 붙일 수 있는 건 전혀 아니고, 심사를 통해 OGC 표준을 정상적으로 구현했는지 검증하는 과정을 거쳐야 비로소 OGC 표준을 준수한다고 할 수 있다.

<br />

아래는 웹 환경에서의 OGC 표준 주요 항목이다.

* WFS (Web Feature Service): 벡터 데이터의 속성 및 공간 정보
* WMS (Web Map Service): 배경지도 및 시각화
* WCS (Web Coverage Service): 래스터 데이터 추출
* WPS (Web Processing Service): 공간분석 처리

가장 사용 빈도가 높은 건 WFS, WMS다. 서비스의 대부분은 단순 공간정보를 질의하거나 배경지도를 호출하는 수준에 그치기 때문.

이 두 스펙 정도만 알아놔도 OpenLayers로 지도를 표현하는 데 아무런 문제가 없다.

<br />
<br />





## WFS

WFS의 주요 명령어를 기술한다.

* GetFeature
* GetFeatureInfo
* Transaction

<br />



### 1. GetFeature

레이어의 속성을 호출한다. DB로 따지자면 테이블의 데이터를 호출하는 것과 동일하다.

| Parameter |    Default     | Require |          Description          |
| :-------: | :------------: | :-----: | :---------------------------: |
|  service  |      WFS       |    Y    |           서비스명            |
|  version  |     2.0.0      |    Y    |             버전              |
|  request  |   GetFeature   |    Y    |            요청명             |
| typename  | {repo}:{layer} |    Y    | 레이어명 (다수는 쉼표로 구분) |

기본적으로 위와 같이 호출하면 요청한 typename의 모든 속성정보를 불러온다.

