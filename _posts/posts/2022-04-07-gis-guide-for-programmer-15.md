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










## 