---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 26. 실전! OpenLayers6 Sandbox를 내 GeoServer로 구동하기"
excerpt: "이 시리즈를 쭉 정독했다면, 코드와 함께 예시로 보여주는 OpenLayers6 Sandbox를 봤을 것이다.
해당 사이트는 코드의 결과를 직관적으로 보여주기 위해 만든 예시 사이트다. 코드로 보는 것보다, 직접 구현된 결과물을 보는 것이 이해가 훨씬 빠를거라 생각했다.
예시 사이트를 보여주는 것도 좋지만, 자신이 직접 GeoServer를 구축하고 이를 예시 사이트에 연결하는 방법을 알려준다면, 더 자유롭게 탐구를 할 수 있지 않을까 싶었다.
이 장에선, 내가 직접 예시 사이트에 사용한 데이터 일체와 GeoServer의 구축 방식을 제공하여, OpenLayers6 Sandbox 사이트를 내 GeoServer로 연결하여 구축해본다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1695496723000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "React" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 실전! OpenLayers6 Sandbox를 내 GeoServer로 구동하기

이 시리즈를 쭉 정독했다면, 코드와 함께 예시로 보여주는 [OpenLayers6 Sandbox](https://project.itcode.dev/gis-dev)를 봤을 것이다.

해당 사이트는 코드의 결과를 직관적으로 보여주기 위해 만든 예시 사이트다. 코드로 보는 것보다, 직접 구현된 결과물을 보는 것이 이해가 훨씬 빠를거라 생각했다.

예시 사이트를 보여주는 것도 좋지만, 자신이 직접 GeoServer를 구축하고 이를 예시 사이트에 연결하는 방법을 알려준다면, 더 자유롭게 탐구를 할 수 있지 않을까 싶었다.

이 장에선, 내가 직접 예시 사이트에 사용한 데이터 일체와 GeoServer의 구축 방식을 제공하여, OpenLayers6 Sandbox 사이트를 내 GeoServer로 연결하여 구축해본다.



## 준비물

준비물은 아래와 같다.

- OpenLayers6 Sandbox 소스코드
    - [GitHub Repository](https://github.com/RWB0104/gis-dev)
    - 명령어 `git clone https://github.com/RWB0104/gis-dev`
- 데이터베이스
    - `MariaDB`를 기준으로 진행함
    - 타 DB도 상관없음
- GeoServer
    - [GeoServer 공식 다운로드 홈페이지](https://geoserver.org/release/stable/)
    - Platform Independent Binary 기준으로 설명
- GeoServer DB 플러그인
    - PostgreSQL일 경우 필요 없음
    - 위의 GeoServer 공식 홈페이지에서 **Vector Formats** 항목 중 사용하는 DB의 플러그인을 다운로드
- SHP 공간정보 파일
    - [ZIP 다운로드](https://github.com/RWB0104/blog.itcode.dev/files/12706796/shp.zip)
    - `buld_sejong`: 세종 도로명주소 건물 폴리곤 데이터 (EPSG:5181)
    - `point_starbucks`: 스타벅스 위치 포인트 데이터 (EPSG:4326)
    - `buld_test`: Transaction용 폴리곤 데이터 (EPSG:5181)
- QGIS
    - SHP 확인용
    - GDAL로 대체 가능



## 구동 환경

OpenLayers6 Sandbox 소스코드와 GeoServer, DB 모두 동일한 PC에서 구동한다고 가정한다. 즉, `localhost` 환경이다.

OS는 어디든 상관은 없으나, 본문에서는 `Windows`를 기준으로 설명한다.



## DB 구축

SHP 데이터를 넣을 DB를 구축하자. DB 정보는 아래와 같다.

- 데이터베이스명: geoserver
- host: `localhost`
- port: `3306` (기본)
- 유저 정보
    - username: username
    - password: password1234

``` sql
-- 데이터베이스 생성
create database geoserver;

-- 계정 생성
create user "username"@"localhost" identified by "password1234";

-- 권한 부여
grant all privileges on geoserver.* to "username"@"localhost";
```

이 정보는 이후 GeoServer에 연동할 때 사용된다. 소스코드와는 연관이 없기 때문에, 원한다면 예시와 다르게 본인만의 정보로 바꿔서 사용해도 상관없다. 하지만, 예시는 위의 정보를 기준으로 진행하니 헷갈리지 않도록 주의하자.

위 계정은 `localhost`에서만 접속 가능한 계정임을 참고할 것. `"localhost"` 부분을 `"%"`로 바꾸면 모든 곳에서 접속을 허용한다.



## SHP 삽입

GDAL의 `ogr2ogr`이 필요하다. 이 문서에서는 QGIS가 설치되었다고 가정하고, QGIS의 `ogr2ogr`을 사용한다.

QGIS 3.16 기준 `ogr2ogr`의 위치는 아래와 같다.

`C:\Program Files\QGIS 3.16\bin`

<br />

명령어 형식은 이렇다. 만약 DB 정보 및 계정정보를 다르게 설정했다면, 아래의 명령어 형식과 후술할 명령어셋을 보고 자신의 정보에 맞게 치환하여 사용하자.

`ogr2ogr -f MySQL MySQL:"{DB명},host={DB 호스트},user={DB 계정명},password={DB 비밀번호}" {SHP 경로} -nln {생성할 테이블 이름} -a_srs {SHP의 EPSG 코드} -lco engine=MYISAM`

`shp.zip`을 해제하면 SHP 파일 3개 세트가 나오며, 각각의 SHP를 삽입하는 명령어는 아래와 같다.

``` txt
.\ogr2ogr -f MySQL MySQL:"geoserver,host=172.30.1.4,user=username,password=password1234" C:\Users\itcode\Downloads\shp\buld_sejong.shp -a_srs EPSG:5181 -lco engine=MYISAM
.\ogr2ogr -f MySQL MySQL:"geoserver,host=172.30.1.4,user=username,password=password1234" C:\Users\itcode\Downloads\shp\point_starbucks.shp -a_srs EPSG:4326 -lco engine=MYISAM
.\ogr2ogr -f MySQL MySQL:"geoserver,host=172.30.1.4,user=username,password=password1234" C:\Users\itcode\Downloads\shp\buld_test.shp -a_srs EPSG:5181 -lco engine=MYISAM
```

테이블 목록에서 아래의 3개 테이블이 생성되면 정상적으로 삽입된 것이다.

- buld_sejong
- point_starbucks
- buld_test

테이블명은 SHP 이름과 동일하며, 이 이름은 추후 GeoServer의 API 호출에서도 사용하니, 달라지면 안 된다.

위 세 개 테이블 이외에도 다른 테이블이 더 생겼을텐데, 메타정보이므로 신경쓰지 않아도 상관없다.

해당 블로그의 [OpenLayers를 여행하는 개발자를 위한 안내서 - 6. 공간정보의 DB화](/projects/2022/03/05/gis-guide-for-programmer-6) 게시글에서 자세한 내용을 확인할 수 있다.



## GeoServer 세팅

GeoServer를 세팅한다.



### 1. DB 플러그인 적용

아까 다운받은 DB 플러그인을 적용하자. PostgreSQL일 경우 플러그인이 필요없다.

``` txt
// Platform Independent Binary 기준
{geoserver}\webapps\geoserver\WEB-INF\lib

// war 기준
{geoserver}\WEB-INF\lib
```

위 경로에 아래의 파일을 옮겨놓자.

- `gt-jdbc-mysql-29.2.jar`
- `mysql-connector-java-8.0.28.jar`

GeoServer 구동 후, 레이어 추가에서 해당 DB 옵션이 뜨면 적용된 것이다.



### 2. CORS 설정

GeoServer와 프론트가 `localhost`라도 포트가 서로 달라 CORS 오류가 발생하므로, CORS 설정을 해줘야한다.

이는 [OpenLayers를 여행하는 개발자를 위한 안내서 - 7. 공간정보 데이터를 관리하는 법. GeoServer](/projects/2022/03/07/gis-guide-for-programmer-7#cors-설정)에서 확인할 수 있다.



### 3. GeoServer 구동

GeoServer를 구동하자.

``` txt
java -jar start.jar
```

구동 완료 후 [http://localhost:8080/geoserver](http://localhost:8080/geoserver)에 접근해서 GeoServer 페이지가 뜨는지 확인하자.

GeoServer 로그인 정보는 아래와 같다.

- username: `admin`
- password: `geoserver`

해당 블로그의 [OpenLayers를 여행하는 개발자를 위한 안내서 - 7. 공간정보 데이터를 관리하는 법. GeoServer](/projects/2022/03/07/gis-guide-for-programmer-7#geoserver-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0) 게시글에서 자세한 내용을 확인할 수 있다.



### 4. 작업공간 생성하기

GeoServer에서 작업공간을 생성하자. 아래 정보는 GeoServer API 호출 시 직접적으로 영향이 있는 정보이므로, 바꾸면 안 된다.

좌측 사이드바에서 <span class="blue-400">작업공간</span> 메뉴를 클릭하여 생성 가능하다.

- Name: `TEST`
- 네임스페이스 URI: `test`
- [X] 기본 작업공간으로 설정

`TEST` 작업공간이 생성된다.



### 5. 저장소 생성하기

데이터 소스인 저장소를 생성하자. MariaDB를 연결해야하므로, 벡터 데이터 저장소 중 `MySQL`을 선택하자. 만약 보이지 않는다면, 플러그인이 제대로 적용됐는지 확인하자.

좌측 사이드바에서 <span class="blue-400">저장소</span> 메뉴를 클릭하여 생성 가능하다.

- 작업공간: `TEST`
    - 처음 설정한다면, 위에서 만든 작업공간 `TEST` 하나밖에 없으므로, 자동 선택된다.
- 데이터 저장소 이름: `mariadb`
    - 저장소의 이름은 GeoServer API와 관계 없으므로, 마음대로 설정하자.
- host: `localhost`
- port: `3306`
- database: `geoserver`
- user: `username`
- passwd: `password1234`

DB 정보를 다르게 설정했다면, 그에 맞게 치환하여 적용하자.

연결에 문제가 없다면 저장소가 생성된다.



### 6. 레이어 생성하기

레이어를 생성한다. 3개의 SHP를 넣었으므로, 각각의 SHP에 해당하는 레이어 3개를 만들어야 한다. 이를 **발행**이라고 표현한다.

좌측 사이드바에서 <span class="blue-400">레이어</span> 메뉴를 클릭하여 생성 가능하다.

지금까지 잘 따라왔다면, `TEST:mariadb` 저장소를 선택할 수 있다. 레이어 생성 대상은 아래와 같다.

- buld_sejong
- point_starbucks
- buld_test

동작의 **발행하기**를 클릭하여 발행을 수행할 수 있다.

- 정의한 좌표체계
    - `검색`을 클릭하여 좌표계를 검색하고 지정할 수 있다.
    - `buld_sejong`, `buld_test`는 `EPSG:5181`로 지정
    - `point_starbucks`는 `EPSG:4326`으로 지정
- 원본 데이터 최소경계 영역
    - 데이터로부터 계산하기 클릭
- 위/경도 영역
    - 원본 영역으로부터 계산하기 클릭

`buld_sejong`은 WMS 설정을 위해 추가적인 설정이 필요하다. 발행 탭을 눌러 아래의 설정을 수행하자.

- 발행
    - 사용가능한 스타일 목록 중 `polygon`을 선택된 스타일로 옮기고 저장한다.

`buld_test`는 WFS-Transaction 설정을 위해 추가적인 설정이 필요하다. 보안 탭을 눌러 아래의 설정을 수행하자.

- 보안
    - [x] 모든 역할에 액세스 권한 부여

이 설정을 해주지 않으면 WFS-Transaction 시 `{test}buld_test is read-only` 오류가 뜬다.



## API URL 변경하기

`./src/common/env.ts`에서 아래와 같이 API URL을 변경한다.

``` ts
export const API_BASE_URL = 'http://localhost:8080/geoserver';
```

여기까지 잘 따라왔다면, 직접 구축한 자신의 GeoServer에 연결되는 걸 확인할 수 있다.



# 마치며

이 시리즈가 알음알음 관심을 받은 이후로, 크고 작은 질문들을 많이 받았다. 그 과정에서 내가 썼던 글을 다시 보면, 어딘가 미흡하다는 느낌을 많이 받았다.

보다보니, 보편적인 방법만을 설명한 것 같아서, 예시 프로젝트를 기반으로 실제 세팅방법을 설명하면 좋을 것 같다는 생각이 들었다.

사람들이 이 과정을 통해 GeoServer에 대한 구체적인 구축 방법을 더 쉽게 이해할 수 있길 바란다.