---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 22. WFS Transaction으로 데이터 삭제하기"
excerpt: "세 가지 WFS Transaction API 중, 마지막 단계로 데이터 삭제에 대해 다뤄보자."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1653929177000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

세 가지 WFS Transaction API 중, 마지막 단계로 데이터 삭제에 대해 다뤄보자.

<br />
<br />
<br />










# 공간정보 데이터 삭제하기

WFS Transaction 프로토콜을 활용하면, 공간정보 데이터를 DB가 아닌 웹/앱 등 API 호출이 가능한 다양한 환경에서 데이터를 수정할 수 있다.

본 문서에서의 처리 방식은 아래와 같다.

1. 객체를 클릭하면 나타나는 `Overlay` 안의 삭제 버튼을 클릭한다.

<br />
<br />





## 1. WFS Transaction Delete URL 구성하기

``` txt
POST https://example.com/geoserver/wfs
```

``` xml
<wfs:Transaction
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:ogc="http://www.opengis.net/ogc"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	service="WFS"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:Delete typeName="layer_name">
		<ogc:Filter>
			<ogc:FeatureId fid="layer_name.66" />
		</ogc:Filter>
	</wfs:Delete>
</wfs:Transaction>
```

이전까지의 API 호출은 모두 GET으로 이루어졌지만, WFS Transaction의 모든 요청은 POST로 이루어진다. 요청의 body에 위 XML 양식을 입력하여 추가할 데이터를 선언할 수 있다.

* 대상 테이블은 `layer_name`이다.
  * `wfs:Update` 태그의 프로퍼티 `typeName`으로 명시한다.
* 조건은 `ogc:Filter` 태그로 명시하며, OGC Filter 스펙을 따른다.

데이터를 삭제하는 기능이므로, 별도의 공간정보 데이터는 필요없고 조건만 잘 넣으면 삭제된다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/171033925-64b45b42-9b44-4c75-b2aa-5f3de3d74ddb.png)

[OpenLayers6 Sandbox - WFS Transaction Delete](https://project.itcode.dev/gis-dev/transaction-delete)에서 이를 구현한 예제를 확인할 수 있다.