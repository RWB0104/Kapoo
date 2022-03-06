---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 7. 공간정보 데이터를 주문하는 법. GeoServer"
excerpt: "OpenLayers는 웹 브라우저에서 지도나 GIS 서비스를 제공하기 위한 JavaScript Library다. GIS 라이브러리 중 진입 장벽은 가장 높지만, 그에 상응하는 강력한 기능을 제공한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-05T04:35:41+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# Without GeoServer

이전 장에서 공간정보 데이터를 DB에 넣어봤다. 이제 데이터를 적절한 방법으로 통신할 방법만 마련한다면, DB에 저장한 공간정보 데이터를 웹에서든 앱에서든 자유롭게 활용할 수 있을 것이다.

하지만 누누히 언급했듯이, 공간정보 데이터는 다른 데이터와 엄연한 차별점이 존재한다. 바로 공간 데이터라는 점이다. 공간정보 데이터는 일반적인 텍스트 기반의 데이터가 아니다보니, CRUD에 있어서 굉장히 취약하다. 좀 더 자유로운 통신을 위해 DB에 넣었음에도 CRUD에 전혀 강점이 없는 것.

즉, MyBatis든, JPA든, 일반적인 DB 통신으로는 공간정보 데이터를 온전히 받기가 어렵다.

<br />
<br />
<br />










# GeoServer

이 쯤에서 등장하는 게 <span class="primary">GeoServer</span>다. GeoServer는 GIS 데이터를 공유, 편집할 수 있는 웹 서버다. JAVA로 개발된 오픈 소프트웨어다.

API 형태로 원하는 GIS 데이터를 다양한 형태로 통신할 수 있으며, 엔진 단계에서 좌표계 변환, 타일 렌더링 등을 제공하기 때문에 개발자가 구현해야할 GIS 연산 로직이 대폭 감소한다.

<br />
<br />





## GeoServer 설치하기

설치는 [GeoServer 공식 홈페이지](http://geoserver.org/release/stable/)에서 확인 가능하다. GeoServer의 파일은 두 가지 형태로 제공한다.

* Stand-Alone: 단독 설치버전. WAS가 자체적으로 포함되어있음.
  * Platform Independent Binary: OS에 범용적인 바이너리 파일
  * Windows Installer: Windows 전용 exe 파일
* WAR: WAR 버전. Tomcat같은 JavaEE를 구현한 WAS에서 구동 가능.

둘 중 원하는 방식을 사용하면 된다.

