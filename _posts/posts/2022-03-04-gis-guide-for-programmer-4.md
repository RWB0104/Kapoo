---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 4. QGIS 체험하기"
excerpt: "1986년, NASA에서 우주왕복선 챌린저호를 발사했으나, 발사한 지 약 73초만에 폭발한 안타까운 사고가 있었다. 원인은 어이없게도 단위 실수. 국제적인 표준은 미터법임에도 불구하고, 미국을 포함한 몇몇 국가는 인치법을 표준으로 사용하고 있었다. 이러한 상황에서 우주선의 설계도 중 미터법으로 표기된 부품 O Ring을 인치법으로 제작했기 때문에 일어난 사고였다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-04T01:47:29+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "React(리액트)", "TypeScript" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# QGIS

이전에 대부분의 공간정보 데이터는 SHP를 기본으로 제공한다고 언급했었다. 그런데 문제는 이 SHP. 어떻게 여는지 모르겠다. GeoJSON이나 CSV 같은 텍스트 기반 데이터는 어찌됐든 열어서 검증을 해볼 수 있지만, SHP는 그게 안 된다는 말이다.

때문에 SHP를 열어서 조작할 수 있는 일종의 툴이 필요한데, 이미 여러 툴이 있으니 크게 문제되진 않는다. 가장 대표적인 툴은 두 가지가 있다.

* ArcGIS: 강력한 퍼포먼스를 가진 상용 프로그램. 비싸다.
* QGIS: ESRI에서 만든 오픈소스 프로그램. 무료지만, 대용량 처리 시 좀 버벅인다.

타일맵 제작이나 초대용량 데이터 처리가 아니라면, 대부분은 QGIS로 충분히 커버할 수 있다.

QGIS 설치는 [공식 홈페이지](https://qgis.org/ko/site/)에서 설치 가능하다.

