---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 7. 공간정보 데이터를 관리하는 법. GeoServer"
excerpt: "이전 장에서 공간정보 데이터를 DB에 넣어봤다. 이제 데이터를 적절한 방법으로 통신할 방법만 마련한다면, DB에 저장한 공간정보 데이터를 웹에서든 앱에서든 자유롭게 활용할 수 있을 것이다. 하지만 누누히 언급했듯이, 공간정보 데이터는 다른 데이터와 엄연한 차별점이 존재한다. 바로 공간 데이터라는 점이다. 공간정보 데이터는 일반적인 텍스트 기반의 데이터가 아니다보니, CRUD에 있어서 굉장히 취약하다. 좀 더 자유로운 통신을 위해 DB에 넣었음에도 CRUD에 전혀 강점이 없는 것. 즉, MyBatis든, JPA든, 일반적인 DB 통신으로는 공간정보 데이터를 온전히 받기가 어렵다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-07T01:12:33+09:00"
type: "projects"
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

![image](https://user-images.githubusercontent.com/50317129/157473965-c0bdfa0c-8915-4053-a1f0-eff73fc3e719.png)

이 쯤에서 등장하는 게 <span class="primary">GeoServer</span>다. GeoServer는 GIS 데이터를 공유, 편집할 수 있는 웹 서버다. JAVA로 개발된 오픈 소프트웨어다.

API 형태로 원하는 GIS 데이터를 다양한 형태로 통신할 수 있으며, 엔진 단계에서 좌표계 변환, 타일 렌더링 등을 제공하기 때문에 개발자가 구현해야할 GIS 연산 로직이 대폭 감소한다.

<br />
<br />





## GeoServer 설치하기

설치는 [GeoServer 공식 홈페이지](http://geoserver.org/release/stable/)에서 확인 가능하다. GeoServer의 파일은 두 가지 형태로 제공한다.

* Stand-Alone: 단독 설치버전. WAS가 자체적으로 포함되어있음.
  * Platform Independent Binary: OS에 범용적인 바이너리 파일
  * Windows Installer: Windows 전용 exe 파일
* Web Archive: WAR 버전. Tomcat같은 JavaEE를 구현한 WAS에서 구동 가능.

둘 중 원하는 방식을 사용하면 된다.

만약 별도로 Tomcat을 운용하는데, GeoServer 스탠드얼론 버전을 사용할 경우, 포트가 8080으로 서로 겹친다. GeoServer 스탠드얼론 버전의 기본 포트도 8080이기 때문. `start.ini`의 `jetty.port=8080`을 원하는 포트로 변경해주면 된다.

기본 설정 기준으로 [https://example.com/geoserver](https://example.com/geoserver)로 접속하면 GeoServer에 접속할 수 있다.

![image](https://user-images.githubusercontent.com/50317129/157474361-20317947-87f0-4695-86a5-2c3517ad7991.png)

위 페이지가 뜬다면 정상적으로 설치가 완료된 것.

GeoServer의 모든 설정은 웹에서 관리하므로, 여기에서 원하는 설정을 관리하면 된다.

기본 계정의 아이디/비밀번호는 `admin/geoserver`다.

<br />
<br />





## CORS 설정

GeoServer 서버 설정엔 CORS도 포함이 되어있다. 처음 설치할 때 놓치기 쉬운데, CORS 설정을 빼먹고 요청을 보낼 경우, CORS 설정에 의해 요청을 받지 못할 수 있다.

`web.xml`을 수정하면 되는데, 바이너리와 WAR 파일마다 web.xml의 위치가 조금씩 다르다.

- 바이너리
  - `{ROOT}/webapps/geoserver/WEB-INF/web.xml`
- WAR
  - `{ROOT}/WEB-INF/web.xml`
  - WAR의 경우, Tomcat이 구동되어 압축이 풀려있어야 한다.

<br />
<br />
<br />



### 1. web.xml 설정

어찌됐든 `web.xml`을 찾아 수정하자. 파일에서 아래의 항목을 찾을 수 있을 것이다.

``` xml
<!-- Uncomment following filter to enable CORS in Jetty. Do not forget the second config block further down.
<filter>
    <filter-name>cross-origin</filter-name>
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
    <init-param>
    <param-name>chainPreflight</param-name>
    <param-value>false</param-value>
    </init-param>
    <init-param>
    <param-name>allowedOrigins</param-name>
    <param-value>*</param-value>
    </init-param>
    <init-param>
    <param-name>allowedMethods</param-name>
    <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
    </init-param>
    <init-param>
    <param-name>allowedHeaders</param-name>
    <param-value>*</param-value>
    </init-param>
</filter>
-->

<!-- Uncomment following filter to enable CORS in Tomcat. Do not forget the second config block further down.
<filter>
    <filter-name>cross-origin</filter-name>
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>*</param-value>
    </init-param>
</filter>
-->
```

기본적으로 주석 처리가 되어있으며, GeoServer 종류에 따라 두 주석 중 하나를 제거하여 CORS 설정을 적용할 수 있다. `filter-class`를 보고 구분해야한다.

<br />
<br />
<br />



#### WAR 파일일 경우

``` xml
<filter>
    <filter-name>cross-origin</filter-name>
    <!-- 여기 주목! 👇 -->
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>*</param-value>
    </init-param>
</filter>
```

<br />
<br />
<br />



#### WAR 파일이 아닐 경우

WAR의 경우, WAR를 구동하는 Tomcat 설정에 의존하므로, `filter-class`의 값이 `org.apache.catalina.filters.CorsFilter`인 설정을 해제하면 된다.

``` xml
<filter>
    <filter-name>cross-origin</filter-name>
    <!-- 여기 주목! 👇 -->
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
    <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>*</param-value>
    </init-param>
</filter>
```

WAR가 아닌 다른 버전의 경우, WAR 처럼 Tomcat에 얹어 구동하는 게 아니라, 프로그램 스스로 구동하는 거라 프로그램 내부에 이미 `Jetty`라는 웹서버가 내장되어 있다.

따라서 `filter-class`의 값이 `org.eclipse.jetty.servlets.CrossOriginFilter`인 설정을 해제해야 한다.

<br />
<br />
<br />



### 2. 필터 매핑 활성화하기

``` xml
<!-- Uncomment following filter to enable CORS
<filter-mapping>
    <filter-name>cross-origin</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
-->
```

`web.xml`의 CORS 설정에서 조금만 내려보면 위와 같이 주석 처리된 설정을 확인할 수 있다.

위에서 활성화된 `cross-origin` 필터의 매핑을 활성화시키는 것으로, 기본적으로 모든 URL에 적용된다.

<br />
<br />
<br />



### 3. 필터 설정하기

``` xml
<filter>
    <filter-name>cross-origin</filter-name>
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
    <init-param>
    <param-name>cors.allowed.origins</param-name>
    <!-- 여기 주목! 👇 -->
    <param-value>https://example1.com,https://example2.com</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>*</param-value>
    </init-param>
</filter>
```

기본적인 CORS 필터 설정은 <span class="red-400">모든 도메인의 CORS 설정을 해제</span>하는 것이다. 이를 그대로 적용할 경우, 누구나 내 GeoServer에 요청을 보내 응답을 받을 수 있게 된다.

특정 도메인에만 요청을 허용하고 싶을 경우, 아래와 같이 설정하자. 도메인이 여러개라면, 쉼표로 구분하면 된다.


<br />
<br />





## 계정 관리

기본 계정을 그대로 사용할 경우, 보안 상의 위협을 받을 수 있다. 따라서 비밀번호를 변경하거나, 아예 새로운 계정을 만들어 관리하는 것이 안전하다.

![image](https://user-images.githubusercontent.com/50317129/157474677-97f37c75-f4b3-495a-9c72-55f640d5ad99.png)

사이드 메뉴의 [사용자, 그룹, 역할] 메뉴를 클릭한다. 상단의 탭에서 [사용자/그룹] 탭을 클릭하여 계정을 관리할 수 있다. `admin` 계정은 가장 기본적으로 제공하는 계정이므로, 노출도가 심하다. 비밀번호를 적절히 변경해주거나, 아니면 아예 다른 계정을 사용하는 것이 안전하다.

<br />
<br />
<br />



### 새로운 계정 생성하기

상단의 버튼 중 [새로운 사용자 추가] 버튼을 클릭한다.

![image](https://user-images.githubusercontent.com/50317129/157474979-a427e2c4-83c7-4e5c-9b37-a161d030f867.png)

원하는 계정명, 비밀번호를 입력한다. 맨 하단의 역할에서 [ADMIN]을 활성화하면, 기존의 `admin` 계정과 동일한 권한을 부여받는다.

<br />
<br />
<br />



### admin 계정 비활성화

![image](https://user-images.githubusercontent.com/50317129/157475238-d434d927-6527-4bda-b556-3b8ac6608ca9.png)

사용하지 않는 계정은 비활성화하는 것이 안전하다. 아까와 동일한 메뉴에서 `admin` 계정을 클릭하여 들어간다.

계정명 하단의 [비활성화] 체크박스를 활성화하고 저정하면 계정이 비활성화된다.

<br />
<br />





## 레이어 추가하기

GeoServer를 설치했으니, GeoServer에게 어떤 데이터를 서비스할 것인지 알려주는 과정이 필요하다. 이 과정을 "레이어를 추가한다"고 한다.

레이어는 아래의 분류를 가진다.

* 레이어: 데이터의 주체가 되는 소분류. DB의 테이블이 여기에 해당한다.
* 레이어 그룹: 다수의 레이어를 그룹화한 것. 한꺼번에 여러개의 레이어를 호출해야할 경우, 그룹화하여 호출 레이어를 간략화할 수 있다.
* 저장소: 데이터 저장소가 되는 중분류. DB, SHP가 여기에 해당한다. 다수의 레이어 및 그룹을 하위에 포함하고 있다.
* 작업공간: GeoServer에서 레이어를 관리하기 위한 대분류. 다수의 저장소를 하위에 포함하고 있다.

작업공간은 저장소를 포함하고, 저장소는 레이어 그룹 및 레이어를 포함한다. 즉, 레이어를 추가하기 위해선 먼저 작업공간을 만들고, 저장소를 추가한 뒤 레이어를 생성하는 순서로 진행된다.

<br />
<br />
<br />



### 1. 작업공간 추가하기

레이어의 가장 대분류가 되는 작업공간을 추가하자. 좌측 사이드 메뉴에서 [작업공간] 메뉴를 클릭하자.

![image](https://user-images.githubusercontent.com/50317129/157476460-04787661-7156-470d-ab6e-c8d828efb364.png)

[새로운 작업공간 추가하기]를 클릭하여 작업공간을 추가한다.

이름과 URI를 지정한다. URI는 추후 레이어 호출 시 같이 입력해야 하므로, 적절한 걸 입력해주자.

<br />
<br />
<br />



### 2. 저장소 생성하기

레이어를 담고있는 저장소를 생성하자. SHP 혹은 DB를 연결할 수 있다.

DB의 경우, 기본적으로 PostgreSQL을 지원하며, 별도의 플러그인을 통해 다른 DB와의 연결을 추가할 수도 있다. 이 장에서 사용할 MariaDB(MySQL)의 경우도 별도의 플러그인을 추가하여 진행하게 된다.

![image](https://user-images.githubusercontent.com/50317129/157476582-8ea73590-6a25-456e-9d87-5ebd059325a2.png)

[새로운 저장소 생성하기]를 클릭하여 저장소를 생성한다.

원하는 연결 방법을 선택하자. 파일 시스템의 SHP를 지정할 수도, DB를 연결할 수도 있다.

<br />
<br />
<br />



#### 플러그인 추가하기

[GeoServer 다운로드 페이지](http://geoserver.org/release/stable/)에서 각 버전에 해당하는 플러그인을 다운로드 받을 수 있다.

링크의 사이트를 Stable 버전으로, 자신이 설치한 버전에 맞는 플러그인을 받는 것이 좋으므로 버전을 꼭 확인하자.

MariaDB(MySQL) 플러그인의 경우, 하단의 [Vector Formats - MySQL]을 클릭해서 다운로드 받을 수 있다.

이 밖에도 Oracle, MongoDB 등 타 DB의 플러그인도 있는 걸 확인할 수 있으니, 필요하다면 참고할 것. [Extensions - Extensions]를 클릭하여 제공하는 플러그인 일체를 확인할 수 있다.

<br />

받은 플러그인의 압축을 해제하면 `jar` 파일이 나오는데, 이 `jar` 라이브러리를 GeoServer의 라이브러리에 넣으면 된다. 아래의 경로 중 하나에 넣자.

Tomcat의 설치경로를 `CATALINA_HOME`으로 표기한다.

* Tomcat 전역 라이브러리: `CATALINA_HOME/lib`
* GeoServer 라이브러리 `CATALINA_HOME/webapps/geoserver/WEB-INF/lib`

이후 재기동을 해주면 반영된다. MySQL 플러그인을 설치하면, 이후 [저장소 생성하기] 메뉴의 저장소 목록에서 MySQL 관련 항목이 추가된 것을 확인할 수 있다.

<br />
<br />
<br />



#### SHP 추가하기

DB를 따로 구축하기 싫다면, 파일 기반의 SHP를 통해 레이어를 구성할 수도 있다.

[Directory of Spatial files]를 클릭한다.

![image](https://user-images.githubusercontent.com/50317129/157479933-7f1ef829-8a0b-47f7-8b5e-fbe337638207.png)

1. 할당할 저장공간을 선택한다.
2. 데이터 저장소의 이름을 선택한다.
3. SHP 경로를 지정한다.
4. 데이터의 문자셋을 지정한다.

이후 저장을 누르면 SHP 기반의 저장소가 생성된다.


<br />
<br />
<br />



#### MariaDB(MySQL) 추가하기

GIS 데이터를 관리하는 DB가 있다면, GeoServer와 연동하여 레이어를 구성할 수 있다.

진행 전에 아래 두 사항을 진행했는지 확인하자.

* GIS 데이터가 DB에 이미 삽입되어 있어야한다.
* MySQL 플러그인이 설치되어 있어야한다.

[MySQL]을 클릭한다.

![image](https://user-images.githubusercontent.com/50317129/157480077-057964b7-c818-4bec-a365-e9b2a38e8ecc.png)

1. 할당할 저장공간을 선택한다.
2. 데이터 저장소의 이름을 선택한다.
3. host를 입력한다. (IP 혹은 도메인)
4. 포트를 입력한다.
5. 데이터베이스의 이름을 입력한다.
6. 계정명, 비밀번호를 입력한다.

이 정도가 필수 사항이고, 나머지 하단의 옵션은 Connection Pool에 대한 설정이므로 원한다면 별도로 수정해주면 된다.

이후 저장을 누르면 MySQL 기반의 저장소가 생성된다.

<br />
<br />
<br />



### 3. 레이어 추가하기

GIS 데이터의 기본이 되는 레이어를 추가하자. 기존에 유효한 저장소가 추가되어 있어야, 정상적으로 레이어를 추가할 수 있다.

[새로운 레이어 추가하기]를 클릭한다.

![image](https://user-images.githubusercontent.com/50317129/157480381-7a4e548e-7d3a-4c52-a7d5-2f45e85aef99.png)

1. 대상 저장소를 선택한다. 추가 가능한 레이어 목록이 표시된다.
2. 원하는 레이어의 우측 [발행하기] 버튼을 클릭한다.
3. 좌표계를 지정한다. 원하는 좌표계를 검색하여 선택할 수 있다.
4. 레이어 영역을 지정한다. [데이터로부터 계산하기], [원본 영역으로부터 계산하기]를 각각 눌러주면 알아서 계산된다.
5. 상단 탭의 [발행]을 클릭한다.
6. [WMS 설정]의 [기본 스타일]을 지정한다.
   1. 해당 스타일은 WMS 요청 시 기본으로 지정되여 렌더링된다. (자세한건 추후 별도 문서에서 후술)

이후 저장을 누르면 레이어가 추가된다. 여기까지 진행해야 GeoServer에서 레이어를 호출할 수 있다.

레이어 호출 시 `{저장공간 URI명}:{레이어명}`으로 레이어를 특정할 수 있다. 만약, 저장공간의 URI를 `storage`라 지정하고, 레이어명은 `polygon`으로 지정했다면, `storage:polygon`이라는 형식으로 해당 레이어를 특정할 수 있는 것이다.

그 밖에도 지도 서비스와 관련해서 여러 설정을 할 수 있으니, 확인해보자.