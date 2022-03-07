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
* Transaction

기본 URL은 `http://localhost:8080/geoserver/wfs`와 같다.

<br />



### 1. GetFeature

레이어의 속성정보를 호출한다. DB로 따지자면 테이블의 데이터를 호출하는 것과 동일하다.

GeoServer의 `GetFeature`에 필요한 파라미터는 아래와 같다.

``` txt
GET http://localhost:8080/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=test:building&srsName=EPSG:3857&outputFormat=application/json&bbox=14168809.936013725,4366042.924151548,14170735.193663657,4367768.7289308,EPSG:3857
```

|  Parameter   |                   Default                   | Require |                         Description                         |
| :----------: | :-----------------------------------------: | :-----: | :---------------------------------------------------------: |
|   service    |                     WFS                     |    Y    |                          서비스명                           |
|   version    |                    2.0.0                    |    Y    |                            버전                             |
|   request    |                 GetFeature                  |    Y    |                           요청명                            |
|   typename   |               {repo}:{layer}                |    Y    |                레이어명 (다수는 쉼표로 구분)                |
|   srsName    |           레이어의 기본 EPSG 코드           |         | 기준 좌표계. 입력하지 않을 경우 레이어의 기본 좌표계로 표시 |
| outputFormat |             application/gml+xml             |         |                          응답 형식                          |
| propertyName |                  전체 컬럼                  |         |       응답에 포함할 컬럼명 (다수의 경우 쉼표로 구분)        |
|     bbox     | $x_{min},y_{min},x_{max},y_{max}$,EPSG:0000 |         |                         제한할 범위                         |
|  featureID   |                    {id}                     |         |                         Feature ID                          |

필수 파라미터만 입력하면 해당 레이어의 모든 데이터에 대한 속성정보를 불러온다.

<br />

`srsName`에 원하는 EPSG 코드를 입력하면, 그에 맞게 좌표변환을 수행하여 결과를 출력해준다. 클라이언트나 서버에서의 좌표변환을 전혀 신경쓰지 않아도 된다.

JSON 방식을 원할 경우, `application/json`을 `outputFormat`에 지정하면 된다.

<br />

`propertyName`에 컬럼명을 입력하면, 해당 데이터만을 불러온다. 이를 적절히 활용해 필요한 데이터만을 호출하여 응답 속도 및 크기를 최적화할 수 있다.

<br />

`bbox`나 `featureID`는 둘 중 하나만 사용 가능하다. 별다른 제한 없이 WFS를 그냥 호출해버리면 레이어의 모든 데이터를 연산하여 응답해주기 때문에 시간은 물론, 서버에 부하도 많이 간다. 때문에 대부분 현재 영역에 해당하는 데이터만을 반환하도록 제한한다. 이 때 사용하는 영역 제한값이 `bbox`.

`bbox`의 마지막 EPSG 코드는 생략할 수 있으며, 생략할 경우 레이어의 기본 EPSG 좌표계로 인식하고 계산한다.

<br />

`featureID`는 특정 아이디를 가진 데이터 하나만을 타깃하여 반환해준다. 기본적으로 모든 데이터에는 ID가 붙는데, `{layer}.{number}`와 같은 식이다. 예를 들어, 레이어 이름이 `test_layer`라면, `test_layer.354`와 같은 식.

`featureID=354`을 포함하여 요청하면 해당 데이터 하나만을 반환한다.

<br />



### 2. Transaction

레이어의 데이터에 대한 삽입, 갱신, 삭제 기능을 제공한다.

요청의 메소드는 `POST`로 공통이다. 삽입, 갱신, 삭제 모두 `POST`를 사용한다.

body에 동작을 XML로 구성하여 요청한다. OGC 표준이 워낙 옛날부터 제정되다보니, 대부분의 요청은 XML을 기본으로 한다.

<br />

공간정보의 좌표값은 정해진 XML 양식을 통해 죄표값을 기술하여 정의할 수 있다. 각 데이터 형식에 해당하는 XML은 아래와 같다.

해당 XML은 Transaction Insert, Update에 사용된다.

* Polygon

``` xml
<gml:Polygon srsName="EPSG:0000">
	<gml:outerBoundaryIs>
		<gml:LinearRing>
			<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
		</gml:LinearRing>
	</gml:outerBoundaryIs>
</gml:Polygon>
```

`gml:Polygon`의 속성 `srsName`에 좌표계를 기술한다. 생략할 경우, 대상 레이어의 기본 좌표계로 인식한다.

`gml:coordinates`의 내부에 좌표를 기술한다. 하나의 좌표 $x, y$는 쉼표로 구분하고, 각 좌표끼리는 공백으로 구분한다.

Polygon은 반드시 첫 좌표와 마지막 좌표가 동일해야한다는 점을 잊지 말자.

* Line

``` xml
<gml:LineString srsName="EPSG:0000">
	<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4</gml:coordinates>
</gml:LineString>
```

`gml:LineString`의 속성 `srsName`에 좌표계를 기술한다. 생략할 경우, 대상 레이어의 기본 좌표계로 인식한다.

`gml:coordinates`의 내부에 좌표를 기술한다. 하나의 좌표 $x, y$는 쉼표로 구분하고, 각 좌표끼리는 공백으로 구분한다.

Line은 반드시 첫 좌표와 마지막 좌표가 다르다는 점을 잊지 말자.

* Point

``` xml
<gml:Point srsName="EPSG:0000">
	<gml:coordinates>x,y</gml:coordinates>
</gml:Point>
```

`gml:Point`의 속성 `srsName`에 좌표계를 기술한다. 생략할 경우, 대상 레이어의 기본 좌표계로 인식한다.

`gml:coordinates`의 내부에 좌표를 기술한다. 점이므로 $x, y$만 존재하며 이 둘은 쉼표로 구분한다.

<br />



#### 2-1. Transaction Insert

레이어 데이터에 대한 삽입 기능이다.

``` txt
POST http://localhost:8080/geoserver/wfs
```

``` xml
<wfs:Transaction
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	service="WFS"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:Insert>
		<layer_name>
			<column1>value1</column1>
			<column2>value2</column2>
			<column3>value3</column3>
			<geo_column>
				<gml:Polygon srsName="EPSG:0000">
					<gml:outerBoundaryIs>
						<gml:LinearRing>
							<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
						</gml:LinearRing>
					</gml:outerBoundaryIs>
				</gml:Polygon>
			</geo_column>
		</layer_name>
	</wfs:Insert>
</wfs:Transaction>
```

| Parameter  |   Description   |
| :--------: | :-------------: |
| layer_name |    레이어명     |
|   column   |     컬럼명      |
|   value    |     컬럼값      |
| geo_column | 공간정보 컬럼명 |

위 XML은 Polygon을 추가하는 XML이다.

<br />



#### 2-2. Transaction Update

레이어 데이터에 대한 수정 기능이다.

``` txt
POST http://localhost:8080/geoserver/wfs
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

		<gml:Filter>
			<gml:FeatureId fid="layer_name.32" />
		</gml:Filter>
	</wfs:Update>
</wfs:Transaction>
```

| Parameter  |   Description   |
| :--------: | :-------------: |
|  typeName  |    레이어명     |
|   column   |     컬럼명      |
|   value    |     컬럼값      |
| geo_column | 공간정보 컬럼명 |

`gml:Filter`는 OGC Filter의 양식을 따른다.

`gml:FeatureId` 입력한 FeatureID를 반환한다. 즉, 위 XML은 FeatureID가 32인 데이터를 수정하는 것. 속성값 이외에도 좌표의 수정 또한 가능하다.

필터의 조건에 따라 다수의 데이터를 한 번에 수정할 수도 있다. CQL Filter는 후술.

<br />



#### 2-3. Transaction Delete

레이어 데이터에 대한 삭제 기능이다.

단순 삭제만 수행하면 되므로, XML이 훨씬 간단하다.

``` txt
POST http://localhost:8080/geoserver/wfs
```

``` xml
<wfs:Transaction
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	service="WFS"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:Delete typeName="layer_name">
		<gml:Filter>
			<gml:FeatureId fid="layer_name.66" />
		</gml:Filter>
	</wfs:Delete>
</wfs:Transaction>
```

| Parameter | Description |
| :-------: | :---------: |
| typeName  |  레이어명   |

`gml:Filter`는 OGC Filter의 양식을 따른다.

`gml:FeatureId` 입력한 FeatureID를 반환한다. 즉, 위 XML은 FeatureID가 66인 데이터를 삭제하는 것.

필터의 조건에 따라 다수의 데이터를 한 번에 삭제할 수도 있다. CQL Filter는 후술.