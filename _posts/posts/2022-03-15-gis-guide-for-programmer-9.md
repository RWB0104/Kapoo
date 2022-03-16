---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 9. 데이터 필터링하기"
excerpt: "WFS나 WMS를 호출할 때, 좀 더 다채로운 필터링이 필요한 경우가 존재할 수 있다. 특정 영역 밖의 객체를 호출한다거나, 특정 영역에 걸치는 데이터만 호출하는 것, 혹은 다양한 조건을 조합하여 데이터를 조회해야 할 수도 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-15T01:11:19+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# OGC Filter

WFS나 WMS를 호출할 때, 좀 더 다채로운 필터링이 필요한 경우가 존재할 수 있다. 특정 영역 밖의 객체를 호출한다거나, 특정 영역에 걸치는 데이터만 호출하는 것, 혹은 다양한 조건을 조합하여 데이터를 조회해야 할 수도 있다.

이 때 요긴하게 사용할 수 있는 것이 OGC Filter다. OGC Filter는 XML의 형태를 가지며, 요청에 포함되어 좀 더 다양한 공간정보 데이터의 필터링을 가능케 한다.

OGC Filter의 요청 URL에 `filter` 파라미터로 값을 지정하여 사용할 수 있다. 또한 `Transaction` 명령에서도 사용할 수 있다.

<br />
<br />





## 이항 비교 연산자

이항 비교 연산자는 아래와 같다.

* `PropertyIsEqualTo`: 일치하는 데이터
* `PropertyIsNotEqualTo`: 불일치하는 데이터
* `PropertyIsLessThan`: 미만인 데이터
* `PropertyIsLessThanOrEqualTo`: 이하인 데이터
* `PropertyIsGreaterThan`: 초과인 데이터
* `PropertyIsGreaterThanOrEqualTo`: 이상인 데이터

|     Name     | Required | value  |
| :----------: | :------: | :----: |
| PropertyName |    Y     | 컬럼명 |
|   Literal    |    Y     |   값   |

``` xml
<!-- CITY 컬럼이 서울인 데이터만을 필터링 -->
<PropertyIsEqualTo>
	<PropertyName>CITY</PropertyName>
	<Literal>서울</Literal>
</PropertyIsEqualTo>

<!-- AREA 컬럼이 350 이하인 데이터만을 필터링 -->
<PropertyIsLessThanOrEqualTo>
	<PropertyName>AREA</PropertyName>
	<Literal>350</Literal>
</PropertyIsLessThanOrEqualTo>
```

<br />
<br />





## 값 비교 연산자

값 비교 연산자는 아래와 같다.

* `PropertyIsLike`: 값을 포함하는 데이터
* `PropertyIsNull`: 값이 NULL인 데이터
* `PropertyIsBetween`: 값이 지정값 사이인 데이터

연산자별로 양식이 조금씩 다르다.

* `PropertyIsLike`

|     Name     | Required | value  |
| :----------: | :------: | :----: |
| PropertyName |    Y     | 컬럼명 |
|   Literal    |    Y     |   값   |

PropertyName 태그에서 아래의 3가지 속성을 사용할 수 있다.

* wildCard: 와일드카드
* singleChar: 문자열 하나
* escapeChar: 개행문자

위 속성에 문자열을 할당하면, 해당 문자열은 위와 동일한 의미를 가지게 된다.

속성은 여러개를 동시에 사용할 수도 있다.

``` xml
<!-- CITY 컬럼이 서울이란 단어를 포함한 데이터만을 필터링 -->
<PropertyIsLike>
	<PropertyName>CITY</PropertyName>
	<Literal>서울</Literal>
</PropertyIsLike>

<!-- CITY 컬럼이 서울로 시작하는 3글자 단어를 포함한 데이터만을 필터링 -->
<PropertyIsLike>
	<PropertyName>CITY</PropertyName>
	<Literal singleChar="_">서울_</Literal>
</PropertyIsLike>

<!-- CITY 컬럼이 서로 시작해서 울로 끝나는 단어를 포함한 데이터만을 필터링 -->
<PropertyIsLike>
	<PropertyName>CITY</PropertyName>
	<Literal wildCard="%">서%울</Literal>
</PropertyIsLike>

<!-- CITY 컬럼이 서울로 시작하는 3글자 단어가 개행된 데이터만을 필터링 -->
<PropertyIsLike>
	<PropertyName>CITY</PropertyName>
	<Literal singleChar="_" escapeChar="-">서울_-</Literal>
</PropertyIsLike>
```

<br />

* `PropertyIsNull`

|     Name     | Required | value  |
| :----------: | :------: | :----: |
| PropertyName |    Y     | 컬럼명 |

컬럼값이 NULL인지만 비교하므로, Literal은 필요 없는 게 특징이다.

``` xml
<!-- CITY 컬럼이 NULL인 데이터만을 필터링 -->
<PropertyIsNull>
	<PropertyName>CITY</PropertyName>
</PropertyIsNull>
```

<br />

* `PropertyIsBetween`

|     Name      | Required |       value        |
| :-----------: | :------: | :----------------: |
| PropertyName  |    Y     |       컬럼명       |
| UpperBoundary |    Y     |        최대        |
| LowerBoundary |    Y     |        최소        |
|    Literal    |    Y     | 값 (Boundary 하위) |

``` xml
<!-- COUNT 컬럼이 500 ~ 1000인 데이터만을 필터링 -->
<PropertyIsBetween>
	<PropertyName>COUNT</PropertyName>
	<UpperBoundary>
		<Literal>1000</Literal>
	</UpperBoundary>
	<LowerBoundary>
		<Literal>500</Literal>
	</LowerBoundary>
</PropertyIsBetween>
```

Boundary 태그 안에 Literal 태그가 들어감을 주의하자.

<br />
<br />





## 공간 연산자

좌표, 영역 등의 공간을 기반으로 필터를 구성할 수 있다.

* `Intersects`: 해당 공간에 포함되거나 걸치는 데이터
* `Disjoint`: 해당 공간에 포함되지 않는 데이터
* `Contains`: 해당 공간에 포함되는 데이터
* `Within`: 해당 공간 내부의 데이터
* `Touches`: 해당 공간에 닿는 데이터
* `Crosses`: 해당 공간을 교차하는 데이터
* `Overlaps`: 해당 공간에 겹쳐지는 데이터
* `Equlas`: 해당 공간과 동일한 데이터

글로 보면 좀 모호할 수 있는데, 이해를 돕기 위해 아래 그림을 보자.

![image](https://user-images.githubusercontent.com/50317129/158647372-0e75b6ba-2f93-46bd-9425-eba12f0335cf.png)

이와 같은 차이가 존재한다.

|     Name     | Required |      value      |
| :----------: | :------: | :-------------: |
| PropertyName |    Y     | 공간정보 컬럼명 |
|     gml      |    Y     |  공간정보 XML   |

공간정보 XML은 이전 장에서 확인할 수 있다.

``` xml
<!-- 해당 영역에 포함되거나 걸치는 데이터만을 필터링 -->
<Intersects>
	<PropertyName>GEOM</PropertyName>
	<gml:Polygon srsName="EPSG:0000">
		<gml:outerBoundaryIs>
			<gml:LinearRing>
				<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
			</gml:LinearRing>
		</gml:outerBoundaryIs>
	</gml:Polygon>
</Intersects>

<!-- 해당 라인을 교차하는 데이터만을 필터링 -->
<Crosses>
	<PropertyName>GEOM</PropertyName>
	<gml:LineString srsName="EPSG:0000">
		<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4</gml:coordinates>
	</gml:LineString>
</Crosses>
```

공간 연산의 특성 상, 점 데이터는 활용 가능성이 낮다.

<br />
<br />





## 거리 연산자

데이터의 거리를 기반으로 필터를 구성한다.

* `DWithin`: 해당 거리 이내의 데이터
* `Beyond`: 해당 거리 너머의 데이터

|     Name     | Required |      value      |
| :----------: | :------: | :-------------: |
| PropertyName |    Y     | 공간정보 컬럼명 |
|     gml      |    Y     |  공간정보 XML   |
|   Distance   |    Y     |      거리       |

Distance의 속성으로 units를 사용할 수 있으며, 거리의 단위를 표기한다.

``` xml
<!-- 해당 점과 100m 이내의 데이터만을 필터링 -->
<DWithin>
	<PropertyName>GEOM</PropertyName>
	<gml:Point srsName="EPSG:0000">
		<gml:coordinates>x,y</gml:coordinates>
	</gml:Point>
	<Distance units="m">100</Distance>
</DWithin>
```

<br />
<br />





## 영역 연산자

데이터의 영역을 기반으로 필터를 구성한다.

* `BBOX`: 해당 공간에 포함되거나 걸치는 데이터 (Intersects와 동일)

|     Name     | Required |      value      |
| :----------: | :------: | :-------------: |
| PropertyName |    Y     | 공간정보 컬럼명 |
|   Literal    |    Y     |       값        |
|     gml      |    Y     |  공간정보 XML   |

``` xml
<!-- 해당 영역에 포함되거나 걸치는 데이터만을 필터링 -->
<BBOX>
	<PropertyName>GEOM</PropertyName>
	<Literal>
		<gml:Polygon srsName="EPSG:0000">
			<gml:outerBoundaryIs>
				<gml:LinearRing>
					<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
				</gml:LinearRing>
			</gml:outerBoundaryIs>
		</gml:Polygon>
	</Literal>
</BBOX>
```

사실상 공간 연산자의 Intersects와 동일한 결과.

<br />
<br />





## 논리 연산자

여러 조건을 결합하여 필터를 구성한다.

* `And`: 조건을 모두 충족하는 데이터
* `Or`: 조건을 하나 이상 충족하는 데이터
* `Not`: 조건을 충족하지 않는 데이터

``` xml
<!-- 해당 영역에 포함되거나 걸치면서, AREA가 350 이하인 데이터 -->
<And>
	<BBOX>
		<PropertyName>GEOM</PropertyName>
		<Literal>
			<gml:Polygon srsName="EPSG:0000">
				<gml:outerBoundaryIs>
					<gml:LinearRing>
						<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
					</gml:LinearRing>
				</gml:outerBoundaryIs>
			</gml:Polygon>
		</Literal>
	</BBOX>

	<PropertyIsLessThanOrEqualTo>
		<PropertyName>AREA</PropertyName>
		<Literal>350</Literal>
	</PropertyIsLessThanOrEqualTo>
</And>
```

논리 연산자를 적절히 중첩하여 복잡한 필터를 구성할 수 있다.

<br />
<br />
<br />










# CQL Filter

OGC Filter 이외에도 CQL Filter라는 것 또한 존재한다. 잠깐 짚고 넘어가보자.

CQL Filter는 사용자에 따라 OGC Filter 보다 더 쉬울 수 있다. SQL의 형태와 매우 유사하기 때문.

CQL Filter는 요청 URL에 `cql_filter` 파라미터로 값을 지정하여 사용할 수 있다.

<br />

예를 들어, 아래와 같이 사용할 수 있다.

* `PropertyIsLike`

``` xml
<!-- CITY 컬럼이 서울이란 단어를 포함한 데이터만을 필터링 -->
<PropertyIsLike>
	<PropertyName>CITY</PropertyName>
	<Literal>서울</Literal>
</PropertyIsLike>
```

``` txt
CITY LIKE '%서울%'
```

<br />

* `Intersects`

``` xml
<!-- 해당 영역에 포함되거나 걸치는 데이터만을 필터링 -->
<Intersects>
	<PropertyName>GEOM</PropertyName>
	<gml:Polygon srsName="EPSG:0000">
		<gml:outerBoundaryIs>
			<gml:LinearRing>
				<gml:coordinates>x1,y1 x2,y2 x3,y3 x4,y4 x1,y1</gml:coordinates>
			</gml:LinearRing>
		</gml:outerBoundaryIs>
	</gml:Polygon>
</Intersects>
```

``` txt
INTERSECTS(GEOM, POLYGON((x1 y1, x2 y2, x3 y3, x4 y4, x1 y1)))
```

<br />
<br />
<br />










# 마치며

OGC Filter와 CQL Filter에 대해서 알아봤다.

데이터의 필터링을 구체적으로 수행할 경우, 요긴하게 사용할 것이다.

<br />

OGC, CQL Filter에 더 많은 정보가 필요하다면 각각 아래의 사이트를 확인하자.

* [OGC Filter](https://docs.geoserver.org/latest/en/user/filter/filter_reference.html)
* [CQL Filter](https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html)