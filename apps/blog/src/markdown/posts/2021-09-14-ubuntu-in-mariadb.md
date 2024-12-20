---
title: "[라즈베리파이 4] MariaDB 구축하기"
excerpt: "드디어 라즈베리파이 개발환경 구축의 마지막 장이다. DBMS는 다양한 데이터를 저장하는 저장소인 DB(Database)를 관리하는 시스템이다. 필요한 데이터를 DB에 저장하고, 이를 적재적소에 꺼내어 데이터를 다룰 수 있도록 해준다. 웹 서버와 DBMS를 연동하면 사용자의 계정 정보, 설정 등을 저장하고 활용할 수 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: 1631552642000
type: "posts"
category: "RaspberryPi"
tag: [ "라즈베리파이", "Ubuntu", "MariaDB", "RDBMS" ]
group: "라즈베리파이"
comment: true
publish: true
---

# 개요

드디어 라즈베리파이 개발환경 구축의 마지막 장이다. 라즈베리파이에 DBMS를 구축한다.

![null](https://user-images.githubusercontent.com/50317129/133107200-6b527196-5ee8-41fb-a74d-3faf70e97dda.png)

<span class="blue-400">DBMS</span>는 다양한 데이터를 저장하는 저장소인 DB(Database)를 관리하는 시스템이다. 필요한 데이터를 DB에 저장하고, 이를 적재적소에 꺼내어 데이터를 다룰 수 있도록 해준다. 웹 서버와 DBMS를 연동하면 사용자의 계정 정보, 설정 등을 저장하고 활용할 수 있다.

# if (!storage.equals("dbms"))

HTTP 소켓 통신은 기본적으로 요청이 끝나는 순간 모든 데이터가 소멸된다. 즉, 내 <span class="red-400">브라우저와 웹 사이에서 일어나는 모든 상호작용은 해당 페이지가 닫히는 순간 사라진다</span>는 뜻이다. 때문에 이러한 데이터들의 보관해야 할 경우 별도의 영구적인 보관소가 필요하다.

## else if (storage.equals("browser"))

이를 해소하기 위한 가장 간단한 방법으로, <span class="indigo-400">브라우저에선 쿠키와 로컬/세션 스토리지라는 저장소를 제공</span>한다. JavaScript에서 간단한 API를 통홰 데이터를 저장, 추출할 수 있지만, 주력으로 쓰기엔 여러 제약이 있다.

1. <span class="red-400">용량 제한</span>이 있으며, 제한 또한 작다.
2. 모든 데이터가 문자열로 저장되므로, <span class="red-400">데이터의 형태에 제약</span>이 생긴다.
3. 브라우저에 저장하므로, <span class="red-400">브라우저나 컴퓨터가 바뀌면 데이터가 소실</span>된다.
4. 동일한 PC의 동일한 브라우저로 다른 사람이 데이터를 저장하면 <span class="red-400">이전 데이터는 덮어씌워진다.</span>
5. 동일한 PC의 동일한 브라우저를 사용하는 <span class="red-400">모든 구성원이 데이터에 제약없이 접근, 수정, 삭제</span>할 수 있다.
6. 저장소에 별도의 <span class="red-400">보안장치가 마련되지 않는다.</span>

위와 같은 여러 문제점이 존재한다. 데이터의 보안이 제대로 이루어지지도 않으며, 유저별로 데이터를 저장할 수도 없다. 즉, 주요 데이터를 저장하기엔 적합하지 않은 셈.

## else if (storage.equals("system"))

즉, 브라우저에 영향을 받지않는 외부의 공간에 데이터를 저장해야한다. 가장 간단한 방법으로 서버 파일시스템 내부에 txt나 csv같은 <span class="indigo-400">파일 형태로 저장소를 구성하는 방법</span>을 생각해볼 수 있다. 하지만 이 경우도 어딘가 하나씩 나사가 빠져있다.

1. 데이터 쓰기 작업이 <span class="red-400">쓰레드에 매우 취약</span>해진다.
2. 읽기, 쓰기 작업의 경우 <span class="red-400">데이터의 검색 로직이 필요</span>하며, 조건의 복잡도에 따라 검색 로직이 기하급수적으로 복잡해진다.
3. 데이터 검색 시 전체 데이터를 호출해야하며, <span class="red-400">데이터의 양이 많아질수록 검색에 요구되는 자원 소요량이 많아진다.</span>

쿠키나 브라우저 스토리지가 가진 대다수의 문제들이 해소됐지만, 데이터 관리 영역의 문제들은 여전히 존재하며, 그 규모 또한 무시할 수 없는 수준이다. 즉, 필요한 데이터만을 특정하는 데 많은 자원이 소요되며, 대용량 데이터를 다루는 데 적합하지 않다.

# else if (storage.equals("dbms"))

DBMS는 위 저장소들의 문제 대부분을 매우 깔끔하게 해소시켜준다.

1. <span class="green-A400">하나의 DBMS에 여러 저장소</span>를 생성할 수 있다.
2. <span class="green-A400">인가된 요청만 DBMS에 접근</span>이 가능하다.
3. 데이터의 읽기, 쓰기가 <span class="green-400">쓰레드에 구애받지 않는다.</span>
4. 관계형 데이터베이스(RDBMS)의 경우 <span class="green-400">SQL 스크립트</span>를 통해 데이터의 읽기, 쓰기를 효과적으로 수행할 수 있다.
5. <span class="green-400">PL/SQL</span>을 통해 DBMS 자체적으로 함수나, 스케쥴링을 수행할 수 있다.

그 밖에도 여러 장점이 있으나, 앞서 언급한 스토리지와 연관된 특징만 나열하면 위와 같이 정리할 수 있다.

이처럼 DBMS의 존재는 웹 서비스가 좀 더 다채로운 서비스를 제공하는 데 있어서 필수적인 요소나 다름없다.

# MariaDB 설치하기

이 장에서는 MariaDB를 설치한다. 여러 DBMS를 사용해봤지만, 대표적인 RDBMS인 ORACLE은 조금 무겁다는 느낌을 받았다. 또한 Linux 환경에 그리 친절하지도 않다. 설치에 반드시 GUI 환경을 요구하거나, 커널 변수의 수정을 요구하는 것은 확실히 부담인 부분. MySQL의 경우 개발진 대부분이 MariaDB로 넘어가기도 했고, 업데이트도 MariaDB가 훨씬 자주 일어나므로 MariaDB의 하위호환이라는 느낌이 강했다.

NoSQL의 경우 RDBMS와 결이 다르고, 현재 개발 구상 중인 대부분의 서비스가 비정형 데이터를 다루지 않으므로 논외.

또한 애초에 ORACLE이든 MariaDB든 <span class="orange-600">RDBMS는 기본 기능이 거의 비슷</span>하므로, 단순 데이터 CRUD나 간단한 PL/SQL를 사용하는데 차이가 없다.

> <b class="teal-400">CRUD?</b>  
> Create, Read, Update, Delete의 이니셜로, 데이터에서 할 수 있는 작업인 생성, 읽기, 수정, 삭제를 통칭하는 단어.

## MariaDB 설치하기

``` bash
sudo apt-get -y mariadb-server
```

위 명령어를 입력하여 MariaDB를 설치한다. 간단하다. 이게 끝이다.

만약 궁금하다면 Linux에 ORACLE 설치 과정을 찾아보라. MariaDB가 얼마나 간단한지 체감할 수 있을 것이다.

## MariaDB 접속 테스트

``` bash
sudo mariadb

 # 혹은
sudo mysql
```

위 명령어를 입력하여 MariaDB에 접속해보자. 비교적 최신 버전(10 이상)이라면 <span class="lightBlue-600">MariaDB는 시스템 계정을 MariaDB root 계정과 대응</span>되도록 설정한다. 위 명령어를 입력하면 별도의 비밀번호 입력 없이 MariaDB를 연결할 수 있다.

`sudo mysql`을 사용해도 접속할 수 있다. MariaDB와 MySQL의 유사성을 체감할 수 있는 부분.

![null](https://user-images.githubusercontent.com/50317129/133102225-7d63de47-0b70-49e4-9452-c202fad098c4.png)

위와 같이 접속되면 MariaDB가 정상적으로 동작하는 것이다.

## Windows에서 MariaDB 관리 툴 설치하기

DBMS는 Linux와 같이 명령어 기반으로 동작한다. 하지만 모든 명령어 기반이 그렇듯 사용자에게 편안함을 주는 환경이 아니다보니, 명령어를 일일히 치고 있긴 좀 귀찮다. 더군다나 이런 CLI 환경은 데이터 조회할 때 그 단점이 극명하게 드러나는데, 출력한 데이터를 어떻게든 표 형식으로 보여주기 위해 안간힘을 쓴다. 그러나 그 노력에도 불구하고 콘솔은 텍스트가 화면 길이를 넘어갈 경우 강제로 줄바꿈해서 보여준다. 수평 스크롤의 개념이 아예 없어 데이터가 일정량 이상 길어질 경우 극악의 가독성을 보여준다.

![null](https://user-images.githubusercontent.com/50317129/133102630-3a33dd50-18d6-4b16-848b-919000c75f2e.png)

이러한 특징으로 DBMS는 서버에서 돌리더라도 그 관리는 Window같은 GUI 환경에서 관리 툴을 사용하는 것이 보편적이다. 적어도 위와 같은 꼴은 보기 싫다면 더더욱.

MariaDB 전용 관리 툴은 대표적으로 두 가지가 존재하는데, <span class="lightBlue-600">MySQL Workbench</span>와 <span class="lightBlue-600">SQLyog</span>다. 둘 중 어느 툴을 사용해도 상관없으나, 이 장에서는 MySQL Workbench를 기준으로 설명한다. 이름은 MySQL이라고 명시되어있지만, 앞서 언급했듯이 <span class="green-600">MariaDB가 MySQL 기반이므로 접속 인터페이스가 동일한 모양인지 지장없이 사용</span>할 수 있다.

SQLyog는 커뮤니티 버전과 Ultimate 버전이 나누어져 있으며, 커뮤니티 버전에선 일부 심화기능이 제한된다. 데이터베이스의 간편 백업이나 다른 데이터베이스로 연결하여 복사하는 등의 심화적인 기능같은 것들이 대부분이다. DBMS의 기능을 제한하는 것이 아니라 관리 도구 단계에서 제공하는 디테일한 편의기능이므로, 일반적인 DBMS 사용에는 전혀 영향이 없으니 걱정하지 않아도 된다.

이 사이트에 접속하여 MySQL Workbench를 다운로드한다.

설치가 완료된다. 아직은 라즈베리파이의 IP를 입력해도 포트가 열려있지 않다면 접근할 수 없을 것이다.

## MariaDB 외부접속 허용하기

포트가 막혀있다면 Windows에서 MariaDB로 접속할 수 없다. <span class="blue-400">서비스 포트를 허용하여 외부 통신을 수행</span>하자.

우선 서비스하는 포트를 확인하자. MariaDB의 기본 서비스포트는 3306이며, MariaDB에서 아래의 SQL을 입력하면 서비스 포트를 확인할 수 있다.

``` bash
mariadb -u root -p
```

콘솔에서 위 명령어를 입력하여 MariaDB로 접근하자.

``` sql
SHOW GLOBAL VARIABLES LIKE 'PORT';
```

MariaDB를 접속한 상태에서 위 SQL을 입력하면 포트를 확인할 수 있다. 포트를 변경하지 않았다면 3306이 표시될 것이다.

``` bash
sudo ufw allow 3306
```

위 명령어를 입력하여 3306 포트를 허용하자.

이후 MySQL Workbench에서 접속정보를 입력하고 연결을 시도해보자. 위와 같이 뜬다면 성공이다.

# 목표

* <del class="grey-400">라즈베리파이에 Ubuntu 서버를 구축한다.</del>
* <del class="grey-400">Tomcat을 구동하여 페이지를 호스팅한다.</del>
* <del class="grey-400">도메인을 입힌다.</del>
* <del class="grey-400">SSL 인증서를 발급하여 HTTPS 통신을 제공한다.</del>
* <del class="grey-400">SSH, RDP 등의 원격 통신환경을 구축한다.</del>
* <del class="grey-400">MariaDB를 설치하여 DB 통신을 수행한다.</del>

이로써 라즈베리파이의 웹 개발환경의 구축이 끝났다. 이젠 내가 원하는대로 서비스를 개발/배포할 수 있을 것이다.
