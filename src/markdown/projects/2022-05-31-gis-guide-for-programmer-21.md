---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 21. WFS Transaction으로 데이터 수정하기"
excerpt: "세 가지 WFS Transaction API 중, 데이터를 수정하는 Update에 대해 다뤄보자."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1653927012000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "WFS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

세 가지 WFS Transaction API 중, 데이터를 수정하는 Update에 대해 다뤄보자.

<br />
<br />
<br />










# 공간정보 데이터 수정하기

WFS Transaction 프로토콜을 활용하면, 공간정보 데이터를 DB가 아닌 웹/앱 등 API 호출이 가능한 다양한 환경에서 데이터를 수정할 수 있다.

본 문서에서의 처리 방식은 아래와 같다.

1. 객체를 클릭하면 나타나는 `Overlay` 안의 수정 버튼을 클릭한다.
2. 원하는 모양으로 `Polygon`을 수정한다.
   1. 본 문서에서는 `Polygon` 형태만을 다룬다.
3. 수정할 데이터를 작성한다.
4. WFS Transaction Update를 통해 데이터를 수정한다.

<br />
<br />





## 1. WFS Transaction Update URL 구성하기

``` txt
POST https://example.com/geoserver/wfs
```

``` xml
<wfs:Transaction
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:ogc="http://www.opengis.net/ogc"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	service="WFS"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:Update typeName="layer_name">
		<wfs:Property>
			<wfs:Name>column1</wfs:Name>
			<wfs:Value>value1</wfs:Value>
		</wfs:Property>

		<wfs:Property>
			<wfs:Name>column2</wfs:Name>
			<wfs:Value>value2</wfs:Value>
		</wfs:Property>

		<wfs:Property>
			<wfs:Name>geo_column</wfs:Name>
			<wfs:Value>
				<gml:Polygon srsName="EPSG:0000">
					<gml:outerBoundaryIs>
						<gml:LinearRing>
							<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
						</gml:LinearRing>
					</gml:outerBoundaryIs>
				</gml:Polygon>
			</wfs:Value>
		</wfs:Property>

		<ogc:Filter>
			<ogc:FeatureId fid="layer_name.32" />
		</ogc:Filter>
	</wfs:Update>
</wfs:Transaction>
```

이전까지의 API 호출은 모두 GET으로 이루어졌지만, WFS Transaction의 모든 요청은 POST로 이루어진다. 요청의 body에 위 XML 양식을 입력하여 추가할 데이터를 선언할 수 있다.

* 대상 테이블은 `layer_name`이다.
  * `wfs:Update` 태그의 프로퍼티 `typeName`으로 명시한다.
* 각 컬럼 데이터는 `wfs:Property` 태그로 각각 표시한다.
  * 하위 태그 `wfs:Name`는 컬럼의 이름을 의미한다.
  * 하위 태그 `wfs:Value`는 컬럼의 수정할 값을 의미한다.
* 조건은 `ogc:Filter` 태그로 명시하며, OGC Filter 스펙을 따른다.

XML의 의미는 위와 같다. 직접 지도에 도형을 그린 후, 도형의 좌표값과 넣을 데이터를 입력하여 XML을 생성해야한다.

위 XML은 `Polygon` 데이터를 포함하며, 다른 형식의 데이터 XML이 궁금하다면 [8장](/projects/2022/03/14/gis-guide-for-programmer-8#2.-Transaction)을 참조하자.

<br />
<br />





## 2. Snap과 Modify 기능 추가하기

지도는 일반적인 WFS 지도를 활용한다. `Draw` 객체가 도형을 그리는 객체라면, `Modify` 객체는 이미 그려진 도형을 조작할 수 있는 기능이다.

쉽게 말해서, 그냥 도형의 모습을 바꿀 수 있다고 생각하면 된다.

`Snap`은 마우스 포인터가 객체에 쉽게 달라붙도록 유도하는 기능이다.

``` typescript
import Snap from 'ol/interaction/Snap';
import Modify from 'ol/interaction/Modify';

const snap = new Snap({
	source: wfsLayer
});

const modify = new Modify({
	source: wfsLayer
});
```

`Snap`과 `Modify` 모두 `Source` 객체를 주요 옵션으로 받는다. 각 기능은 해당 `Source` 데이터에서만 동작하게 된다.

<br />
<br />





## 3. Snap과 Modify 객체에 이벤트 붙이기

`map.addInteraction()` 메서드로 기능을 활성화할 수 있다. 반대로 드로잉 기능을 비활성화하려면, `map.removeInteraction()`으로 `Modify` 객체를 제거해야한다.

`Snap` 객체는 그냥 바로 `Map` 객체에 상시 할당해도 무방하다.

``` typescript
document.onkeyup = (e) =>
{
	// ESC를 눌렀을 경우
	if (e.key.toLowerCase() === 'escape')
	{
		map.removeInteraction(modify);
	}
};

document.oncontextmenu = () =>
{
	map.removeInteraction(modify);
};
```

각각 ESC 키를 눌렀을 때, 오른쪽 마우스 버튼을 눌렀을 때 `Modify` 기능을 해제한다.

이 문서에서는 `Modify` 기능이 끝날 경우 데이터 입력 폼을 출력한다. 입력이 완료되면 WFS Transaction API를 호출한다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/171029500-f0fee3e6-fe98-4b7c-ad23-33843efdba69.png)

[OpenLayers6 Sandbox - WFS Transaction Update](https://project.itcode.dev/gis-dev/transaction-update)에서 이를 구현한 예제를 확인할 수 있다.