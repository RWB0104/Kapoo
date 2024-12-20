---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 2. GIS랑 인사하기"
excerpt: "여러분들이 GIS를 처음 접했다면, 한 번 물어보고 싶다. 공간이란 뭘로 이루어져 있을까? 한 번 생각해보자. 다양한 답이 나왔을 것이라 생각한다. 무슨 답인지 내가 직접 못 듣는다는 게 좀 아쉽지만. 아마 대부분 추상적인 답이 나왔을 것이라 생각한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1646318164000
type: "projects"
category: "GIS"
tag: [ "GIS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# GIS의 50가지 그림자

여러분들이 GIS를 처음 접했다면, 한 번 물어보고 싶다. **공간이란 뭘로 이루어져 있을까?** 한 번 생각해보자.

다양한 답이 나왔을 것이라 생각한다. 무슨 답인지 내가 직접 못 듣는다는 게 좀 아쉽지만. 아마 대부분 추상적인 답이 나왔을 것이라 생각한다.

<br />

어떤 사물을 파악할 때, <span class="red-500">가장 효과적인 방법은 사물의 본질을 파악하는 것</span>이다. 철로 이루어진 어떤 물건이 있다고 해보자. 이걸 어디다 쓰는진 알 수 없지만, 단단한 게 필요할 때 요긴하게 쓸 수 있을 것이다. 필요하다면, 녹여서 다른 철제 물건으로 만들 수도 있다.

반대로 이게 정확히 뭔지 모르고 "어... 이거 그건데..? 그 뭐였더라...?" 같은 추상적인 방법으로 접근한다면 그 사물이 뭔지 파악하는 건 매우 어렵다.

공간을 구현해야한다는 관점에서 볼 때, 공간을 추상적인 개념으로 접근한다면 공간을 디지털화하기 매우 어려울 것이다. 때문에 우리는 공간을 다루기 이전에, 공간이 무엇으로 이루어지는지 그 개념을 명확하게 알 필요가 있다.

공간은 **점(Point)**, **선(Line)**, **면(Polygon)** 세 가지로 이루어진다.

* 공간에 점을 하나 찍으면 점이 생긴다.
* 무수히 많은 점을 연달아 찍으면 선이 생긴다.
* 무수히 많은 선을 연달아 그으면 면이 생긴다.
* 면과 면을 조합하면 공간이 된다.

![null](https://user-images.githubusercontent.com/50317129/156584563-367bd1e7-390d-4e3d-bef1-1ff3103b1a13.png)

3차원 관점에서는 좀 더 복잡한 요소들이 작용하지만, 2차원은 단순한 점, 선, 면만으로 온전한 공간을 구현할 수 있다. 면은 선의 집합으로 표현할 수 있고, 선은 점의 집합으로 표현할 수 있으니, 공간은 점의 위치들로 표현이 가능하다. 이 글에서 궁극적으로 다룰 OpenLayers는 2차원 형태의 지도이므로, 이 정도로만 기억해도 당장엔 무리가 없다.

공간이 무엇으로 이루어져 있는지 앞서 생각한 답과 점의 집합 중 어느게 더 구현하기 쉬울 지 비교해보자. 아마 점 $(x, y)$로 표현하는 것이 더 간단할 것이다.

* 점: 하나의 $(x, y)$로 이루어진다.
* 선: 다수의 $(x, y)$들로 이루어진다. 단, 가장 처음 $(x, y)$와 마지막 $(x, y)$가 달라야 한다.
* 면: 다수의 $(x, y)$들로 이루어진다. 단, 가장 처음 $(x, y)$와 마지막 $(x, y)$가 서로 같아야 한다.

선과 면의 차이에 주목하자. 선과 면 모두 무수히 많은 점들로 구성되어 있는데, 선과 면을 구분할 수 있는 가장 큰 차이는 가장 첫 좌표와 마지막 좌표가 동일한지 확인하는 것이다.

<span class="blue-500">첫 좌표와 마지막 좌표가 동일하면 온전히 하나의 면이 이루어진 것</span>으로 보며, 만약 육안으로 아무리 가까워보여도 <span class="blue-500">첫 좌표와 마지막 좌표가 서로 일치하지 않으면 선</span>이다.

3차원 공간은 GIS 지식에 대한 전공 수준의 이해 뿐만 아니라, 3D 프로그래밍에도 조예가 있어야하는 매우 복잡한 영역이니, 여기선 다루지 않는다. <del class="grey-500">애초에 3차원 개발하려는 사람의 수준은 이 글을 아득히 뛰어넘는다.</del>

<br />
<br />





## 공간정보를 냉장고에 넣는 법

디지털에서 공간을 표현하는 데 점의 위치를 이용한다는 것을 알았다. 그런데, 이 정보. 도대체 어떤 식으로 다뤄야될까?

점의 경우 다행히 데이터의 표현 방식이 $(x, y)$로 명확하다. 하지만 선, 면으로 가면 얘기가 다소 복잡해진다. 우선 데이터의 양이 매우 많아진다. 데이터를 어떤 식으로 구분하는지에도 차이가 발생한다.

* ${x_1}$,${y_1}$ ${x_2}$,${y_2}$ ... ${x_n}$,${y_n}$ (공백으로 구분)
* ${x_1}$ ${y_1}$,${x_2}$ ${y_2}$, ... ${x_n}$ ${y_n}$ (쉼표로 구분)

위 처럼 같은 집합을 표현함에도 개발자에 따라 다양한 표현 방법이 나오게 된다. 특정 컬럼의 양이 기하급수적으로 늘어남은 물론이고, 문자열 연산도 수행해야한다. 더 큰 문제는 데이터 보관 주체마다 양식이 통일되지 않으므로, 호환성은 희망사항일 뿐이다.

때문에 공간정보를 다루기 위한 여러 포맷이 고안됐다.

<br />



### SHP (Shape)

가장 대표적인 공간정보 데이터 포맷이다. 미국의 ESRI에서 공간정보 데이터를 위해 고안한 형식이다. ESRI는 SHP 뿐만 아니라 QGIS라는 걸출한 GIS 오픈소스 툴을 만든 회사이기도 하다.

SHP는 일반 데이터 컬럼은 데이터 형식에 맞게 저장하고(VARCHAR, NUMBER, DATE 등) 위치정보만 정해진 규격으로 저장한다. 해당 바이너리를 통해 데이터의 형식 및 좌표 데이터를 산출할 수 있다.

SHP 파일은 기본적으로 아래 4가지 파일로 이루어져있다. shp를 제외한 나머지 파일은 shp를 보조하는 파일로, 없어도 shp를 다루는데 문제는 없다.

* `shp`: 벡터 도형 데이터 (핵심)
* `shx`: 벡터 도형 인덱스
* `dbf`: 각 도형의 속성 데이터
* `prj`: 좌표 정보

공간정보 뿐만 아니라 다양한 부가 데이터를 쉽게 저장할 수 있으며, 구조 상 데이터베이스와 매우 유사하다는 이점이 있으며, 거의 대부분의 GIS 툴이 SHP를 지원한다.

이러한 이점과 범용성에 힘입어 공간정보 데이터의 표준이 되었고, 대부분의 공간정보는 기본적으로 SHP로 제공된다고 봐도 무방하다. 즉, <span class="blue-400">공간정보 데이터는 SHP 하나만 알고 있어도 된다.</span>

<br />



### GeoJSON

JSON은 알겠는데, GeoJSON은 또 뭐야? 하겠지만, 우리가 아는 그 JSON 맞다. 단, 공간정보를 표현하기 위해 정해진 방식으로 구성된 JSON이다.

GeoJSON의 양식은 아래와 같다.

JavaScript와 친숙한 JSON을 차용함으로써, HTTP 통신으로 공간정보를 쉽게 호출하는 데 쓰인다. 이러한 특성 때문에, 공간정보 데이터를 보관한다는 목적 보다는 HTTP 데이터 통신 시 주로 사용한다.

물론 GeoJSON도 공간정보를 보관하는데 무리가 없으며, 인지도 있는 GIS 툴은 GeoJSON을 지원한다. 또한 SHP와 달리 데이터의 CRUD에 별다른 툴이 필요하지 않다는 장점이 있다.

``` json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "buld_test.56",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              14134175.8064104,
              4517568.65467798
            ],
            [
              14134176.63665842,
              4517562.01269381
            ],
            [
              14134187.59593229,
              4517562.34479301
            ],
            [
              14134175.8064104,
              4517568.65467798
            ]
          ]
        ]
      },
      "geometry_name": "SHAPE",
      "properties": {
        "name": "테스트",
        "address": "서울시 어딘가",
        "reg_date": null
      }
    }
  ],
  "totalFeatures": 1,
  "numberMatched": 1,
  "numberReturned": 1,
  "timeStamp": "2023-03-08T14:19:49.134Z",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:EPSG::3857"
    }
  }
}
```

GeoJSON의 예시. `coordinates`에 공간정보 데이터가 담겨온다.

<br />



### GML

GML(Geography Markup Language)는 XML 형식의 공간정보 데이터다. JSON이 성장하기 이전엔 복합적인 객체를 송수신하기 어려움이 많았을 것이다. 공간정보라는 복잡한 데이터를 위해 XML 형태로 이루어진 데이터 포맷이다.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<wfs:FeatureCollection
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:TEST="test"
  xmlns:wfs="http://www.opengis.net/wfs/2.0"
  xmlns:gml="http://www.opengis.net/gml/3.2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  numberMatched="1"
  numberReturned="1"
  timeStamp="2023-03-08T14:20:58.669Z"
  xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://api.itcode.dev/geoserver/schemas/wfs/2.0/wfs.xsd test http://api.itcode.dev/geoserver/wfs?service=WFS&amp;version=2.0.0&amp;request=DescribeFeatureType&amp;typeName=TEST%3Abuld_test http://www.opengis.net/gml/3.2 http://api.itcode.dev/geoserver/schemas/gml/3.2.1/gml.xsd"
>
  <wfs:member>
    <TEST:buld_test gml:id="buld_test.56">
      <gml:name>테스트</gml:name>
      <TEST:SHAPE>
        <gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857" srsDimension="2" gml:id="buld_test.56.SHAPE">
          <gml:exterior>
            <gml:LinearRing>
              <gml:posList>1.41341758064104E7 4517568.65467798 1.413417663665842E7 4517562.01269381 1.413418759593229E7 4517562.34479301 1.41341758064104E7 4517568.65467798</gml:posList>
            </gml:LinearRing>
          </gml:exterior>
        </gml:Polygon>
      </TEST:SHAPE>
      <TEST:address>서울시 어딘가</TEST:address>
    </TEST:buld_test>
  </wfs:member>
</wfs:FeatureCollection>
```

XML이 으레 그렇듯이, 각 데이터의 구분이 상당히 장황하기 때문에, 가독성이 그리 좋진 못 하다.

<br />



### KML

GML과 비슷하게 KML이라는 데이터 포맷도 존재한다. K-GML 이딴거 아니다.

KML(Keyhole Markup Language)는 구글 어스에서 사용하기 위해 구글이 개량한 데이터 포맷이다.

구글 어스에서 데이터를 추출할 때, KML로 제공하며, 2차원 지도는 물론, 구글 어를 활용한 3차원 데이터를 표시하는데 용이하다.

``` xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<kml
  xmlns="http://www.opengis.net/kml/2.2"
  xmlns:ns2="http://www.google.com/kml/ext/2.2"
  xmlns:ns3="http://www.w3.org/2005/Atom"
  xmlns:ns4="urn:oasis:names:tc:ciq:xsdschema:xAL:2.0"
>
  <Document>
    <Schema name="buld_test_1" id="buld_test_1">
      <SimpleField type="string" name="name"/>
      <SimpleField type="string" name="address"/>
      <SimpleField type="string" name="reg_date"/>
    </Schema>
    <Folder>
      <name>buld_test</name>
      <Placemark id="buld_test.56">
        <ExtendedData>
          <SchemaData schemaUrl="#buld_test_1">
            <SimpleData name="name">테스트</SimpleData>
            <SimpleData name="address">서울시 어딘가</SimpleData>
          </SchemaData>
        </ExtendedData>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <tessellate>1</tessellate>
              <coordinates>126.96946155330825,37.560818684658145 126.9694690115531,37.560771387037555 126.96956746038528,37.56077375191923 126.96946155330825,37.560818684658145</coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>
    </Folder>
  </Document>
</kml>
```

<br />



### 기타

그 밖에도 CSV, Excel, txt 등 여러 텍스트 기반 파일로 다루기도 한다. 단, 이러한 형식들은 공간정보를 저장하는데 적합하지 않아 공간 데이터의 추출 결과물이나, 점 데이터에 한해 제한적으로 사용하기도 한다.

공간정보를 다루는 방법에 있어서 꼭 SHP나 GeoJSON으로만 한정되지 않는다는 것만 참고하자.

<br />
<br />
<br />










# 둘러보기

* [도로명주소 건물 데이터](http://data.nsdi.go.kr/dataset/14783) (로그인 필요)

위 URL은 도로명주소의 건물 데이터를 제공받을 수 있는 URL이다. 건물 뿐만 아니라 시도, 시군구, 건물 진출입로, 도로 등 다양한 데이터를 제공하고 있다. 대부분 SHP로 제공한다는 점에 주목하자.