---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 8. 공간정보 데이터를 주문하는 법. OGC"
excerpt: "OpenLayers는 웹 브라우저에서 지도나 GIS 서비스를 제공하기 위한 JavaScript Library다. GIS 라이브러리 중 진입 장벽은 가장 높지만, 그에 상응하는 강력한 기능을 제공한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-14T23:37:32+09:00"
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# OGC 표준

이전 장에서 GeoServer를 통해 공간정보 데이터 관리 시스템을 구축했다. 이제 이 데이터를 적절히 호출만 하면 될텐데, 이를 어떻게 해야할까?

만약 소프트웨어나 서비스 제공 기관별로 호출방법을 제각각으로 둘 경우 많은 혼란이 야기될 것이다. 어떤 서비스에선 이런 기능이 제공되는데, 어떤 서비스에선 이 기능이 전무한 상황이 빈번할 것이다. 즉, 서비스의 일관성을 해치게 된다. 공간정보라는 복잡한 데이터의 특성 상 일관성의 훼손이 주는 의미는 더욱 크다.

이를 해결하기 위해 적절한 표준을 제정한 것이 OGC 표준이다. OGC(Open Geospatial Consortium)는 공간정보 관련 기술의 개방형 표준화를 개발하고 구현하는 국제 표준화 기구다.

OGC에서 공간정보 질의 표준을 정의한 것이 OGC 표준이다. 공간정보와 관련된 소프트웨어, 웹, 앱 등이 OGC 표준을 준수한다면, 어떤 형태든 동일한 요청 방식으로 데이터를 제공받을 수 있다. 즉, OGC 표준을 준수하는 시스템을 활용한다면, 서비스의 일관성을 지킬 수 있다. 한 번 잘 알아두면 OGC 표준을 준수하는 모든 서비스에서 동일하게 활용이 가능하다. 이러한 편의성으로 인해 정상적인 GIS 솔루션이라면 OGC 표준을 반드시 준수한다.

당연히 OGC 표준 준수는 그냥 막 가져다 붙일 수 있는 건 전혀 아니고, 심사를 통해 OGC 표준을 정상적으로 구현했는지 검증하는 과정을 거쳐야 비로소 OGC 표준을 준수한다고 할 수 있다.

<br />

아래는 웹 환경에서의 OGC 표준 주요 항목이다.

* **WFS (Web Feature Service)**: 벡터 데이터의 속성 및 공간 정보
* **WMS (Web Map Service)**: 배경지도 및 시각화
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

기본 URL은 `https://example.com/geoserver/wfs`와 같다.

<br />



### 1. GetFeature

레이어의 속성정보를 호출한다. DB로 따지자면 테이블의 데이터를 호출하는 것과 동일하다.

지도의 속성 정보가 필요할 때 사용한다.

GeoServer의 `GetFeature`에 필요한 파라미터는 아래와 같다.

``` txt
GET https://example.com/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=test:building&srsName=EPSG:3857&outputFormat=application/json&bbox=14168809.936013725,4366042.924151548,14170735.193663657,4367768.7289308,EPSG:3857
```

|  Parameter   |                   Example                   | Require |                     Description                     |
| :----------: | :-----------------------------------------: | :-----: | :-------------------------------------------------: |
|   service    |                 WFS (고정)                  |    Y    |                      서비스명                       |
|   version    |         2.0.0 (기본), 1.1.0, 1.0.0          |    Y    |                        버전                         |
|   request    |              GetFeature (고정)              |    Y    |                       요청명                        |
|   typename   |            repo_name:layer_name             |    Y    |            레이어명 (다수는 쉼표로 구분)            |
|   srsName    |                  EPSG:4326                  |         | 기준 좌표계 (비울 경우 레이어의 기본 좌표계로 표시) |
| outputFormat |      application/vnd.ogc.se_xml (기본)      |         |                      응답 형식                      |
|  exceptions  |      application/vnd.ogc.se_xml (기본)      |         |                   예외 응답 형식                    |
| propertyName |                  전체 컬럼                  |         |   응답에 포함할 컬럼명 (다수의 경우 쉼표로 구분)    |
|     bbox     | $x_{min},y_{min},x_{max},y_{max}$,EPSG:0000 |         |                     제한할 범위                     |
|  featureID   |                    {id}                     |         |                     Feature ID                      |

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

``` txt
/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:buld_sejong&srsName=EPSG:3857&outputFormat=application/json&exceptions=application/json&featureID=11645
```

``` json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": "buld_sejong.11645",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            1.418136757571567E7,
                            4370012.19281353
                        ],
                        [
                            1.418136633370244E7,
                            4370021.40639941
                        ],
                        [
                            1.418138830051506E7,
                            4370022.60152291
                        ],
                        [
                            1.418138868963238E7,
                            4370013.39142052
                        ],
                        [
                            1.418136757571567E7,
                            4370012.19281353
                        ]
                    ]
                ]
            },
            "geometry_name": "SHAPE",
            "properties": {
                "bdtyp_cd": "17005",
                "bd_mgt_sn": "3611033027102590003000005",
                "bsi_int_sn": 67897,
                "bsi_zon_no": "30078",
                "buld_mnnm": 35,
                "buld_nm": null,
                "buld_nm_dc": "4동",
                "buld_se_cd": "0",
                "buld_slno": 35,
                "bul_dpn_se": "M",
                "bul_eng_nm": null,
                "bul_man_no": 55809,
                "emd_cd": "330",
                "eqb_man_sn": 0,
                "gro_flo_co": 1,
                "li_cd": "27",
                "lnbr_mnnm": 259,
                "lnbr_slno": 6,
                "mntn_yn": "0",
                "mvmn_de": "20210308",
                "mvmn_resn": "건물번호 변경신청(노호리 259-6)에 따른 건물군 분리",
                "mvm_res_cd": "35",
                "ntfc_de": "20210308",
                "opert_de": "20210308130538",
                "pos_bul_nm": null,
                "rds_man_no": 3020,
                "rds_sig_cd": "36110",
                "rn_cd": "3258065",
                "sig_cd": "36110",
                "und_flo_co": 0
            }
        }
    ],
    "totalFeatures": 1,
    "numberMatched": 1,
    "numberReturned": 1,
    "timeStamp": "2022-03-10T16:05:54.511Z",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:EPSG::3857"
        }
    }
}
```

위 응답은 세종시 건물 중 아이디가 `11645`인 데이터를 `GetFeature`로 호출한 결과이다. `outputFormat`을 `application/json`으로 지정하여 GeoJSON이 응답된다. 만약 응답 형식을 따로 지정하지 않는다면 XML 형태로 응답한다.

만약 `propertyName=bdtyp_cd,bd_mgt_sn` 파라미터를 추가했다면, `properties`에서 `bdtyp_cd`, `bd_mgt_sn`만 포함될 것이다.

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
POST https://example.com/geoserver/wfs
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
				<gml:Polygon srsName="EPSG:4326">
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

위 XML은 Polygon을 추가하는 XML이다. 이 XML을 해석하면 아래와 같다.

* 대상 테이블은 `layer_name`이다.
* 컬럼 `column1`, `column2`, `column3`에 각각 `value1`, `value2`, `value3`을 삽입한다.
  * Schema엔 있으나, 삽입 시 컬럼을 명시하지 않았을 경우, 해당 컬럼은 `null`로 삽입된다.
* 공간정보 컬럼명은 `geo_column`이다.
* 좌표 `x1,y1 x2,y2 x3,y3 x4,y4 x1,y1`의 폴리곤이다.
  * 좌표계는 `EPSG:4326`이다.

용도에 맞게 테이블명, 컬럼 등을 변경하면 된다.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<wfs:WFS_TransactionResponse
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:ogc="http://www.opengis.net/ogc"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs https://api.itcode.dev/geoserver/schemas/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:InsertResult>
		<ogc:FeatureId fid="buld_test.71"/>
	</wfs:InsertResult>
	<wfs:TransactionResult>
		<wfs:Status>
			<wfs:SUCCESS/>
		</wfs:Status>
	</wfs:TransactionResult>
</wfs:WFS_TransactionResponse>
```

정상응답은 위와 같다. `Transaction`의 응답은 아쉽게도 XML만 지원한다.

위 응답에서 얻을 수 있는 정보는 아래와 같다.

* 데이터를 삽입함
* 응답 결과가 `SUCCESS`로 정상
* 생성된 객체의 아이디는 `buld_test.71`

<br />



#### 2-2. Transaction Update

레이어 데이터에 대한 수정 기능이다.

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

위 XML은 Polygon을 수정하는 XML이다. 이 XML을 해석하면 아래와 같다.

* 대상 테이블은 `layer_name`이다.
* 컬럼 `column1`, `column2`에 각각 `value1`, `value2`으로 변경한다.
  * 각 컬럼은 `wfs:Property`로 묶인다.
  * 명시된 컬럼만 변경한다.
* 공간정보 컬럼명은 `geo_column`이다.
* 좌표 `x1,y1 x2,y2 x3,y3 x4,y4 x1,y1`의 폴리곤으로 변경한다.
  * 좌표계는 `EPSG:4326`이다.
* 변경 대상 객체는 아이디가 `layer_name.32`인 객체다.

용도에 맞게 테이블명, 컬럼 등을 변경하면 된다.

`ogc:Filter`는 OGC Filter의 양식을 따른다.

위 XML은 아이디가 `layer_name.32`인 데이터 하나만을 대상으로 변경했지만, 필터의 구성에 따라 다수의 데이터를 전부 변경할 수도 있다.

이와 관련된 OGC 필터는 후술.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<wfs:WFS_TransactionResponse
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:ogc="http://www.opengis.net/ogc"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs https://api.itcode.dev/geoserver/schemas/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:InsertResult>
		<ogc:FeatureId fid="none"/>
	</wfs:InsertResult>
	<wfs:TransactionResult>
		<wfs:Status>
			<wfs:SUCCESS/>
		</wfs:Status>
	</wfs:TransactionResult>
</wfs:WFS_TransactionResponse>
```

정상응답은 위와 같다. 위 응답에서 얻을 수 있는 정보는 아래와 같다.

* 데이터를 갱신함
  * `InsertResult`로 삽입과 형태가 동일하지만, 새로 생성된게 없으므로 아이디가 `none`이다.
* 응답 결과가 `SUCCESS`로 정상

<br />



#### 2-3. Transaction Delete

레이어 데이터에 대한 삭제 기능이다.

단순 삭제만 수행하면 되므로, XML이 훨씬 간단하다.

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

위 XML은 Polygon을 삭제하는 XML이다. 이 XML을 해석하면 아래와 같다.

* 대상 테이블은 `layer_name`이다.
* 삭제 대상 객체는 아이디가 `layer_name.66`인 객체다.

데이터를 삭제하기만 하면 되므로, XML이 다른 API보다 훨씬 간단하다. 삭제할 객체가 어떤 객체인지 타깃만 하면 되기 때문.+

마찬가지로, 필터의 구성에 따라 다수의 데이터를 전부 삭제할 수도 있다.

이와 관련된 OGC 필터는 후술.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<wfs:WFS_TransactionResponse
	xmlns:wfs="http://www.opengis.net/wfs"
	xmlns:ogc="http://www.opengis.net/ogc"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	version="1.0.0"
	xsi:schemaLocation="http://www.opengis.net/wfs https://api.itcode.dev/geoserver/schemas/wfs/1.0.0/WFS-transaction.xsd">
	<wfs:InsertResult>
		<ogc:FeatureId fid="none"/>
	</wfs:InsertResult>
	<wfs:TransactionResult>
		<wfs:Status>
			<wfs:SUCCESS/>
		</wfs:Status>
	</wfs:TransactionResult>
</wfs:WFS_TransactionResponse>
```

정상응답은 위와 같다. 위 응답에서 얻을 수 있는 정보는 아래와 같다.

* 데이터를 삭제함
  * `InsertResult`로 삽입과 형태가 동일하지만, 새로 삭제된게 없으므로 아이디가 `none`이다.
  * 갱신과 삭제는 구분하기 어렵다.
* 응답 결과가 `SUCCESS`로 정상

<br />
<br />





## WMS

WMS의 주요 명령어를 기술한다.

* GetMap
* GetFeatureInfo

기본 URL은 `https://example.com/geoserver/wms`와 같다.

<br />



### 1. GetMap

레이어의 데이터 및 선언된 스타일을 토대로 렌더링된 지도를 제공한다. 즉, JSON 같은 텍스트 기반 데이터가 아닌, PNG 같은 이미지를 제공한다.

보유한 데이터를 토대로, 자신이 직접 디자인한 지도를 제공할 수도 있다.

GeoServer의 `GetMap`에 필요한 파라미터는 아래와 같다.

``` txt
GET https://example.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&layers=buld_sejong&exceptions=application%2Fjson&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=14167144.570487704%2C4365471.559422987%2C14167756.066713985%2C4366083.055649268
```

|  Parameter  |              Example              | Require |                                      Description                                      |
| :---------: | :-------------------------------: | :-----: | :-----------------------------------------------------------------------------------: |
|   service   |            WMS (고정)             |    Y    |                                       서비스명                                        |
|   version   | 1.3.0 (고정), 1.1.1, 1.1.0, 1.0.0 |    Y    |                                         버전                                          |
|   request   |           GetMap (고정)           |    Y    |                                        요청명                                         |
|   layers    |       repo_name:layer_name        |    Y    |                             레이어명 (다수는 쉼표로 구분)                             |
|   styles    |              style1               |         | 적용할 스타일명 (비울 경우 GeoServer에서 설정한 기본 스타일 적용, 다수는 쉼표로 구분) |
| srs(or crs) |             EPSG:4326             |         |                  기준 좌표계 (비울 경우 레이어의 기본 좌표계로 인식)                  |
|    bbox     | $x_{min},y_{min},x_{max},y_{max}$ |    Y    |                                   이미지 영역 좌표                                    |
|    width    |                256                |    Y    |                                      이미지 넓이                                      |
|   height    |                256                |    Y    |                                      이미지 높이                                      |
|   format    |             image/png             |    Y    |                                        요청명                                         |
| transparent |           false (기본)            |         |                                    배경 투명 여부                                     |
|   bgcolor   |           FFFFFF (기본)           |         |                                RRGGBB 형태의 배경 색상                                |
| exceptions  | application/vnd.ogc.se_xml (기본) |         |                                    예외 응답 형식                                     |
|    time     |   2022-03-14T22:30.27.520+09:00   |         |                 시계열 데이터를 위한 시간 (yyyy-MM-ddThh:mm:ss.SSSZ)                  |
|     sld     |    https://example.com/sld.xml    |         |                                     XML 파일 경로                                     |
|  sld_body   |            <sld></sld>            |         |                                        SLD XML                                        |

WMS는 OGC 표준 명령어 중에서 특이하게 이미지를 반환하는 명령어다. `format` 역시 이미지 MIME 타입인 것을 확인할 수 있다. 이를 통해서 자신이 직접 디자인한 지도를 서비스할 수도 있다.

단, 레이어가 너무 많거나, SLD가 복잡해질수록 렌더링 시간이 길어질 수 있다.

<br />

`srs`는 기준 좌표계다. `bbox`의 EPSG 코드를 입력하면 되며, 비울 경우 레이어의 기본 EPSG 코드로 인식한다.

`version`이 1.3.0일 경우, `crs`로 사용한다.

<br />

WMS는 반드시 `bbox`를 통해 영역을 입력해야한다.

<br />

`styles`는 사용할 SLD의 이름이다. GeoServer에서 해당 레이어에 사용할 SLD를 지정할 수 있는데, 이 때 지정한 SLD의 이름을 입력하는 것이다.

쉼표로 구분하여 하나 이상의 SLD를 입력할 수 있으며, 비울 경우 기본으로 지정한 SLD가 자동으로 선택된다.

<br />

`time`은 시계열 데이터를 위한 파라미터. 시간별로 구분된 데이터가 있다면, 해당 파라미터를 통해 호출할 수 있다.

<br />

`sld`는 외부 SLD를 지정하기 위한 파라미터로, URL을 입력한다.

`sld_body`는 SLD XML을 직접 파라미터에 입력하는 것이다.

![image](https://user-images.githubusercontent.com/50317129/158647221-814d9d12-a03e-47fd-acb9-487ca6c5da8d.png)

`GetMap`의 응답 예시다.

<br />



### 2. GetFeatureInfo

GetMap으로 출력된 지도는 모든 객체들이 이미지로 바뀌므로, 객체를 선택하거나 판별하는 것이 불가능해보인다.

하지만, `GetFeatureInfo`를 사용하면, 이미지를 클릭했을 때 해당 객체의 정보를 확인할 수 있다.

GeoServer의 `GetFeatureInfo`에 필요한 파라미터는 아래와 같다.

``` txt
GET https://example.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=buld_sejong&layers=buld_sejong&exceptions=application%2Fjson&INFO_FORMAT=application%2Fjson&I=221&J=178&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=14169590.555392835%2C4366694.551875548%2C14169896.303505976%2C4367000.299988689
```

|   Parameter   |              Example              | Require |                     Description                     |
| :-----------: | :-------------------------------: | :-----: | :-------------------------------------------------: |
|    service    |            WMS (고정)             |    Y    |                      서비스명                       |
|    version    | 1.3.0 (고정), 1.1.1, 1.1.0, 1.0.0 |    Y    |                        버전                         |
|    request    |       GetFeatureInfo (고정)       |    Y    |                       요청명                        |
|    layers     |       repo_name:layer_name        |    Y    |            레이어명 (다수는 쉼표로 구분)            |
|    styles     |              style1               |         |  적용할 스타일명 (`GetFeatureInfo`에선 의미 없음)   |
|  crs(or srs)  |             EPSG:4326             |         | 기준 좌표계 (비울 경우 레이어의 기본 좌표계로 인식) |
|     bbox      | $x_{min},y_{min},x_{max},y_{max}$ |    Y    |                  이미지 영역 좌표                   |
|     width     |                256                |    Y    |                     이미지 넓이                     |
|    height     |                256                |    Y    |                     이미지 높이                     |
| query_layers  |       repo_name:layer_name        |    Y    |       추가 요청 레이어명 (다수는 쉼표로 구분)       |
|  info_format  | application/vnd.ogc.se_xml (기본) |         |                      응답 형식                      |
| feature_count |             1 (기본)              |         |                  최대 객체 호출 수                  |
|    x(or i)    |                225                |    Y    |                   지도의 x 픽셀값                   |
|    y(or j)    |                156                |    Y    |                   지도의 y 픽셀값                   |
|  exceptions   | application/vnd.ogc.se_xml (기본) |         |                   예외 응답 형식                    |

`layers`와 `query_layers`가 비슷해서 헷갈릴 수 있는데, 이는 `GetMap`에서의 확장을 염두에 두었기 때문이다.

`GetMap`의 요청에 `GetFeatureInfo`가 추가로 요구하는 몇몇 파라미터만 이어붙여 사용하기 위해 별도로 둔 것이다. `layers`와 `query_layers`의 차이는 아래와 같다.

* `layers`: `GetMap`시 해당 레이어가 지도에 출력됨
* `query_layers`: `GetMap`에는 출력되지 않으나, `GetFeatureInfo`에선 포함되어 검색됨

지금까지 소개한 명령어들의 응답 형식이 `format`인데 비해, `GetFeatureInfo`만 `info_format`으로 상이한 이유 또한 여기에 있다.

<br />

`GetFeatureInfo`은 클릭한 위치를 계산하여 해당하는 객체의 정보를 출력하는 명령어이므로, `info_format`에 입력하는 값은 `GetFeature`와 같이 텍스트 MIME를 사용한다.

<br />

`x`, `y`는 지도 상에서 마우스가 클릭한 픽셀 값이다. 좌표가 아님에 주의하자. 좌표는 `bbox`에 입력한다.

`version`이 1.3.0일 경우, `x`, `y`가 아닌 `i`, `j`로 사용해야한다.

<br />
<br />





## 마치며

위에서 소개한 명령어는 OGC 표준 중 가장 빈번하게 사용하는 명령어로, 이외에도 당신에게 꼭 필요할 수도 있는 다채로운 명령어들이 존재한다.

앞으로 설명할 예제들도 그렇고, 기본적인 기능의 지도는 위 기능들만 적절히 활용해도 충분히 서비스할 수 있다.

더 많은 내용이 궁금하다면, 여기를 확인하길 바란다.