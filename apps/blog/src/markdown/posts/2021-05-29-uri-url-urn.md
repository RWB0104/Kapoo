---
title: "URI? URL? URN? 리소스 식별자 구분하기"
excerpt: "우리가 인터넷 상에서 특정한 데이터에 접근할 때 URL이라는 것을 활용하여 접근한다. 원하는 자료의 URL을 얻으면, 브라우저 같은 HTTP 통신 프로그램에 해당 URL을 호출하여 응답을 얻는 것이다."
coverImage: "https://user-images.githubusercontent.com/50317129/120028437-a63ddc80-c02f-11eb-9d41-7c50d7002a42.png"
date: 1622226617000
type: "posts"
category: "WEB"
tag: [ "WEB(웹)", "URI", "URL", "URN" ]
comment: true
publish: true
---

# URL! URI... URN??

우리가 인터넷 상에서 **특정한 데이터**에 접근할 때 <span class="blue-400">URL</span>이라는 것을 활용하여 접근한다.  
원하는 자료의 <span class="blue-400">URL</span>을 얻으면, 브라우저 같은 HTTP 통신 프로그램에 해당 <span class="blue-400">URL</span>을 호출하여 응답을 얻는 것이다.

개발자나, 굳이 개발자가 아니더라도 관련 정보를 찾다보면 심심치않게 <span class="blue-400">URI</span>라는 용어를 접하게 된다.  
I와 L의 오묘한 유사성 때문에 아예 <span class="blue-400">URI</span>를 <span class="blue-400">URL</span>로 오독하는가 하면, 오타라고 생각하는 사람도 더러 있을 것이다.  
하지만 <span class="blue-400">URL</span>과 <span class="blue-400">URI</span>는 그 의미가 비슷하면서도 살짝 다르다.

누구나 알고있는 <span class="blue-400">URL</span>과 아리까리한 <span class="blue-400">URI</span>, 생소한 <span class="blue-400">URN</span>. 이들에 대해 알아보자

# UR* 톱아보기

<span class="blue-400">URI</span>, <span class="blue-400">URL</span>, <span class="blue-400">URN</span>은 구조상 서로 연관이 있다.

## URI(Uniform Resource Identifier, 통합 자원 식별자)

<span class="blue-400">URI</span>는 우리말로 **통합 자원 식별자**라고 한다. <span class="blue-400">URI</span>는 앞서 말한 <span class="blue-400">URL</span>, <span class="blue-400">URN</span>을 포함하는 상위 개념으로, <span class="orange-400">인터넷 상에 존재하는 **자원을 구분**하는 식별자</span>라 할 수 있다. 웹 상에서 자원을 식별하는 모든 수단이 곧 <span class="blue-400">URI</span>이라 할 수 있다.

## URL(Uniform Resource Locater, 통합 자원 지시자)

<span class="blue-400">URL</span>은 굳이 우리말로 하자면 **통합 자원 지시자**라고 할 수 있겠지만, 흔히 인터넷 상에서 **주소**라 함은 99% 이 <span class="blue-400">URL</span>을 의미한다. 1994년 **RFC-1738**에 정의되어있다.  
<span class="blue-400">URL</span>은 **Locater**라는 키워드에 걸맞게 <span class="orange-400">인터넷 상에 존재하는 자원의 **위치**를 나타내는 식별자</span>라 할 수 있다. 여기서 **위치**라는 키워드에 주목하자. <span class="blue-400">URL</span>은 자원의 위치정보를 가지므로, 어떠한 이유로든 자원의 위치가 변경되면 <span class="blue-400">URL</span>은 자원을 찾을 수 없으며, 변경된 위치를 추적할 수도 없다. 이 때 맞이하게 되는 HTTP 오류가 누구나 알고있는 404 Not Found다.  
당장 내가 이 게시물의 이름을 한 글자만 변경해도, 지금까지의 <span class="blue-400">URL</span>은 아무 쓸모가 없어지며, 사용자들 또한 해당 <span class="blue-400">URL</span>로 이 게시물에 접근할 수 없다. 또한, 이 <span class="blue-400">URL</span>을 통해 원래 있던 게시물의 <span class="blue-400">URL</span>을 논리적으로 유추할 수도 없다.

## URN(Uniform Resource Name, 통합 자원 이름)

<span class="blue-400">URN</span>은 **통합 자원 이름**이다. 눈치가 빠른 분들은 아시겠지만, <span class="blue-400">URN</span>은 <span class="orange-400">인터넷 상에 존재하는 자원의 **이름**을 나타내는 식별자</span>다. 자원의 이름은 고유한 값을 가지므로, 인터넷 상의 수 많은 자원들 중 특정 자원을 식별할 수 있는 것이다.  
<span class="blue-400">URN</span>은 대부분 위에 언급한 두 개념에 비해 생소할 것이다. 그도 그럴 것이, <span class="blue-400">URN</span>은 위 두 개념보다 훨씬 뒤에 나온 개념이기 때문이다. 1997년 **RFC-2141**에 정의되어있다. <span class="blue-400">URL</span>보다 3년 뒤에 출범하여 그 역사가 상대적으로 짧다.  

<span class="blue-400">URL</span>의 치명적인 단점은 **위치**정보 외에 다른 정보를 저장하지 않는다. 이 상황에서 해당 자원을 찾아야 한다면? 안타깝게도 <span class="blue-400">URL</span>만으로는 찾아낼 수 없다. 구글링해서 운 좋게 찾아낸다면 모를까.  
반면 <span class="blue-400">URN</span>을 사용한다면 어떨까? 위치가 아무리 변경된다 하더라도, 자원의 고유한 이름을 통해 찾기 때문에 자원이 웹 상에서 완전히 삭제된 게 아니라면 손쉽게 찾아낼 수 있을 것이다.

## 정리

난 어려운 개념을 이해할 때 현실세계와 연관지어 이해하는 걸 좋아한다. 위 세 개념을 현실에서 특정 사람의 신원을 확인하는 과정과 접목해서 정리하면 아래와 같이 정리할 수 있을 것 같다.

| 구분  |              현실               |         값          |
| :---: | :-----------------------------: | :-----------------: |
| 자원  |             나 자신             |         나          |
|  URI  | 나를 식별할 수 있는 모든 식별자 |          -          |
|  URL  |         내가 사는 주소          | 서울특별시 A구 가동 |
|  URN  |         내 주민등록번호         |   000000-0000000    |

<span class="small red-A400">※ URN은 모든 자원의 고유값이므로, 사람과 연관지었을 때, 중복 가능성이 있는 이름 보다는 고유값인 주민등록번호가 더 적합하다.</span>

예를 들어, 내 정보가 위와 같다고 가정해보자. 내가 사는 주소 및 내 주민등록번호 모두 내 신원을 확인할 수 있는 방식(<span class="blue-400">URI</span>)이므로, 나를 찾기에 적합하다.  
만약 내 주소(<span class="blue-400">URL</span>)를 통해 확인할 경우, 내가 이사(자원의 이동)를 가게 되면 해당 주소엔 아무것도 없으며, 날 찾을 수도 없다(404 HTTP 에러). 또한, 내가 예전에 살던 주소만으로 내가 이사간 주소를 유추해낼 수도 없을 것이다.

반면, 내 주민등록번호(<span class="blue-400">URN</span>)을 통해 확인할 경우, 내 주민등록번호와 매칭되는 사람을 찾는 것으로 나를 식별할 수 있다. 이 과정에서 내가 어디에 있는지는 전혀 중요치 않은 것이다. 주민등록번호 자체가 말소(자원 삭제)되지 않는 한, 내가 어디에서 무엇을 하고있든 내 신원을 확인할 수 있다.

# 구조

그렇다면 이들은 어떻게 생겼는지 알아보자. <span class="blue-400">URI</span>는 자원의 식별자를 포괄하여 지칭하는 개념 그 자체이므로, 구조라고 할 건 없다. 하위 개념인 <span class="blue-400">URL</span>, <span class="blue-400">URN</span>에 대해 알아보자.

## URL 구조

<span class="blue-400">URL</span>은 아래와 같은 구조로 이루어진다. 매우 익숙할 것이다.

<p class="large" align="center"><span class="lightBlue-400">https</span>://<span class="green-400">rwb0104</span>.<span class="yellow-400">github</span>.<span class="pink-400">com</span>:<span class="amber-400">443</span>/<span class="cyan-400">posts</span><span class="teal-400">?category=WEB&page=1</span></p>

구조별로 색상을 입혔으며, 순서대로 기술한다.

### Protocol(프로토콜)

<span class="blue-400">URL</span>상의 <span class="lightBlue-400">https</span> 부분.

통신규약을 의미한다. 작성일 기준으로, 이 규약엔 계층별로 많은 <span class="lightBlue-400">프로토콜</span>이 존재하는데, 웹 통신을 수행할 땐 크게 두 가지로 나뉜다.

| 구분  |              내용              |
| :---: | :----------------------------: |
| HTTP  | W3 상에서의 HTML 문서 통신규약 |
| HTTPS |    암호화된 HTTP 통신 규약     |

현재는 포털, 쇼핑몰같은 대형 비즈니스 사이트나 블로그, 카페 등 중소규모의 개인 사이트까지 <span class="red-A400">HTTPS의 사용이 반 강제적으로 권장</span>되어 있다. 특히 전자상거래가 접목된 비즈니스 사이트의 경우 필수로 적용해야 한다. 더군다나 <span class="red-A400">HTTPS가 적용되지 않는 사이트(localhost 제외)에 접근할 경우 브라우저 측에서 보안 관련 경고 메시지</span>를 띄우니, 규모에 관계없이 웹 사이트를 운영할 경우 HTTPS는 필수로 적용하는 편이다.

### SLD(Second Level Domain, 서브도메인, 호스트)

<span class="blue-400">URL</span>상의 <span class="green-400">rwb0104</span> 부분.

도메인 앞에 붙으며, <span class="green-400">서브도메인</span>을 통해 하나의 <span class="yellow-400">도메인</span>으로 다중 서비스를 제공할 수 있다. 하나의 <span class="yellow-400">도메인</span>에 여러 <span class="green-400">서브도메인</span>을 생성할 수 있으며, 우리가 흔히 아는 `www` 외에도 `dev`, `admin`, `m` 용도에 따라 다양한 문자열을 지정할 수 있다.

|                  URL                   |                                          내용                                          |
| :------------------------------------: | :------------------------------------------------------------------------------------: |
|     [naver.com](https://naver.com)     | 기본 네이버 홈페이지. 각 플랫폼(데스크탑, 모바일 등)에 가장 적합한 사이트로 리다이렉트 |
| [www.naver.com](https://www.naver.com) |                               데스크탑용 네이버 홈페이지                               |
|   [m.naver.com](https://m.naver.com)   |                                모바일용 네이버 홈페이지                                |
| [map.naver.com](https://map.naver.com) |                                      네이버 지도                                       |

위는 네이버 서비스의 <span class="green-400">서브도메인</span>으로, `naver.com` <span class="yellow-400">도메인</span>을 중심으로 각기 다른 서비스를 제공하는 것을 확인할 수 있다.

### Domain(도메인)

<span class="blue-400">URL</span>상의 <span class="yellow-400">github</span> 부분.

URL의 중심이 되는 부분으로, 제공하는 웹 서비스의 아이덴티티 역할을 겸한다. 때문에 <span class="yellow-400">도메인</span>에는 대부분 해당 웹 서비스의 이름이 들어간다.

|  서비스   |                  URL                   |
| :-------: | :------------------------------------: |
|  네이버   |     [naver.com](https://naver.com)     |
|   다음    |  [www.daum.com](https://www.daum.com)  |
|  GitHub   |    [github.com](https://github.com)    |
| Instagram | [instagram.com](https://instagram.com) |

대부분의 서비스가 <span class="yellow-400">도메인</span>으로 서비스의 이름을 사용하고 있다.

### TLD(Top Level Domain, 최상위 도메인)

<span class="blue-400">URL</span>상의 <span class="pink-400">com</span> 부분.

<span class="pink-400">최상위 도메인</span>이란, 앞서 언급한 <span class="green-400">서브도메인</span>, <span class="yellow-400">도메인</span>을 관리하는 업체 혹은 기관이라고 볼 수 있다.  
앞서 언급한 개념의 경우, 중복되지 않는 선에서 사용자가 임의로 지정할 수 있다. 하지만 <span class="pink-400">최상위 도메인</span>의 경우 현재 운영 중인 업체나 기관 중 하나를 **선택**해서 등록해야 한다. <span class="pink-400">최상위 도메인</span>을 선택할 경우, 당신의 도메인은 해당 <span class="pink-400">최상위 도메인</span>을 운영하는 곳에서 관리하게 된다.  

<span class="pink-400">최상위 도메인</span>은 운영 주체에 따라 두 가지로 나뉜다.

#### ccTLD(country code TLD, 국가 코드 최상위 도메인)

국가를 나타내는 <span class="pink-400">최상위 도메인</span>이다.

| ccTLD |     내용      |
| :---: | :-----------: |
|  .kr  |  한국(KISA)   |
|  .us  |   미국(LLC)   |
|  .jp  |     일본      |
|  .io  | 영국령 인도양 |

<span class="pink-400">ccTLD</span>는 위 표와 같이 국가 코드 형태이며, 각 국가기관이 직접 관리한다. 즉, `.kr`을 가진 모든 도메인은 **한국의 KISA(한국 인터넷 진흥원)에서 관리**한다.

#### gTLD(generic TLD, 일반 최상위 도메인)

사이트 혹은 사이트를 소유한 조직, 기관의 특성에 따라 사용하는 <span class="pink-400">최상위 도메인</span>이다.

| gTLD  |       내용        |
| :---: | :---------------: |
| .com  | 영리 단체 및 기관 |
| .net  | 네트워크 관리기관 |
| .org  |    비영리 기관    |
| .gov  |     정부 기관     |

<span class="pink-400">gTLD</span>는 위 표와 같이 다양한 종류가 있으며, 그 중 몇몇은 자주 접했을 것이다. 정부기관이 왜 여기있나 생각할 수도 있는데, <span class="pink-400">ccTLD</span>는 **국가 코드**만 해당된다. 국가 예하의 정부기관, 군사조직 등은 구분 상 <span class="pink-400">gTLD</span>로 분류된다.  
마찬가지로, 각 <span class="pink-400">최상위 도메인</span>은 **해당 <span class="pink-400">최상위 도메인</span>을 소유한 기관 혹은 기업에서 관리**한다.

> 현재 운영 중인 <span class="pink-400">최상위 도메인</span>은 [IANA](https://www.iana.org/domains/root/db)에서 확인할 수 있다.

여담으로, <span class="pink-400">최상위 도메인</span>에 중복된 <span class="yellow-400">도메인</span>을 등록할 수 없다. 예를 들어, 내가 `aaa.com` URL을 등록한다고 가정해보자.  
우선 제일 먼저 `.com`을 관리하는 업체에 `aaa`라는 <span class="yellow-400">도메인</span>을 등록해야 한다. 하지만, 이미 누군가가 `aaa.com`을 등록했다면 해당 소유주가 <span class="yellow-400">도메인</span>의 소유권을 포기하기 전까진 `aaa.com` <span class="yellow-400">도메인</span>을 소유할 수 없다.  
물론 `.com`이 아닌 `.kr`이나 `.net`에는 등록할 수 있다. 하지만 `socket.io` 처럼 <span class="yellow-400">도메인</span>과 <span class="pink-400">최상위 도메인</span>까지 의미론적으로 구성했다면, 이러한 상황이 달갑지 않을 것이다. 때문에 일전에 이슈됐던 <span class="blue-400">덮죽 상표권 선점</span>과 비슷한 일이 일어나기도 한다.

## Port(포트)

<span class="blue-400">URL</span>상의 <span class="amber-400">443</span> 부분. 앞에 반드시 `:`이 붙는다.

인터넷에 연결된 모든 디바이스는 사용하는 네트워크의 IP를 할당받는다. 할당받은 IP 내에서 해당 디바이스가 수행 중인 모든 프로세스의 통신이 이루어진다. <span class="amber-400">포트</span>는 프로세스의 데이터가 IO되는 통로다. 작업 시, 각 프로세스 별로 고유한 <span class="amber-400">포트</span>를 할당받으며, 하나의 <span class="amber-400">포트</span>는 반드시 하나의 프로세스와 1:1 매칭된다. 반면, 하나의 프로세스는 여러 <span class="amber-400">포트</span>를 할당받을 수 있다.  
**특정 프로세스와 통신하기 위해선 반드시 해당 프로세스가 할당받은 <span class="amber-400">포트</span>에 데이터를 전송**해야 한다. 때문에 <span class="amber-400">포트</span> 통신은 어떤 <span class="amber-400">포트</span>가 보내는지는 크게 중요하지 않으며, 어떤 <span class="amber-400">포트</span>로 보내는지가 중요하다.

웹 통신에서의 기본<span class="amber-400">포트</span>는 아래와 같다.

| 포트  |      내용       |
| :---: | :-------------: |
|  80   | HTTP 기본 포트  |
|  443  | HTTPS 기본 포트 |

아마 이러한 숫자를 처음 볼 수도 있는데, 대부분의 웹 사이트 <span class="blue-400">URL</span>에는 <span class="amber-400">포트</span>를 확인할 수 없다. 사이트가 **각 프로토콜의 기본 <span class="amber-400">포트</span>로 서비스될 경우, <span class="blue-400">URL</span>에서 <span class="amber-400">포트</span>를 생략**할 수 있다. 즉, `https://naver.com`의 <span class="amber-400">포트</span>번호는 `443`이지만, `443`은 HTTPS의 기본 <span class="amber-400">포트</span>이므로 생략된다. 만약, `443`이 아닌 `8080`, `9200`과 같은 **임의의 <span class="amber-400">포트</span>로 서비스를 제공할 경우, <span class="amber-400">포트</span>를 반드시 명시해야하므로 생략이 불가능**하다. 이 경우 <span class="blue-400">URL</span>은 `https://naver.com:8080`이 될 것이다.  
위와 같은 이유로, 대부분의 웹 사이트는 서비스하는 프로토콜에 맞는 기본 <span class="amber-400">포트</span>를 사용한다.

<span class="amber-400">포트</span>는 **0 ~ 65535**의 범위를 가지며, 크게 세 가지로 구분할 수 있다.

### 잘 알려진 포트(well-known Port)

**0 ~ 1023**의 범위에 해당하는 <span class="amber-400">포트</span>. 이 <span class="amber-400">포트</span>들은 컴퓨터에서 기본적으로 사용되는 주요 프로세스에 기본적으로 할당되는 포트로, ICANN(Internet Corporation for Assigned Names and Numbers, 국제 인터넷주소 관리기구)에 의해 통제된다.

|  포트  |  기능  |        용도        |
| :----: | :----: | :----------------: |
| 20, 21 |  FTP   |    파일 송수신     |
|   22   |  SFTP  | 파일 암호화 송수신 |
|   23   | Telnet |    터미널 통신     |
|   25   |  SMTP  |     메일 전송      |
|   53   |  DNS   |      DNS 통신      |
|   67   |  DHCP  |     DHCP 통신      |
|   80   |  HTTP  |     HTML 통신      |
|  443   | HTTPS  |  HTML 암호화 통신  |

어디까지나 초기에 지정되는 <span class="amber-400">포트</span>이므로, 추후 **사용자의 의도에 따라 비어있는 다른 포트로 변경**할 수도 있다. 즉, 초기값일뿐, 강제는 아니다.

### 등록된 포트(registered Port)

**1024 ~ 49151**의 범위에 해당하는 <span class="amber-400">포트</span>. 이 <span class="amber-400">포트</span>들은 컴퓨터의 기본 프로세스는 아니지만, 주요 프로그램들이 기본으로 사용하고자 ICANN에 등록한 <span class="amber-400">포트</span>다. <span class="amber-400">잘 알려진 포트</span>와 마찬가지로 프로그램의 설정을 통해 **사용자의 의도에 따라 비어있는 다른 포트로 변경**할 수 있다.

| 포트  |         기능         |             용도             |
| :---: | :------------------: | :--------------------------: |
| 1433  |        MSSQL         |        MSSQL DB 통신         |
| 3306  |        MySQL         |        MySQL DB 통신         |
| 3389  |         RDP          | 원격 데스크톱 접근 (Windows) |
| 5432  |      PostgreSQL      |      PostgreSQL DB 통신      |
| 8080  | HTTP 통신(Tomcat 등) |   HTTP 통신 (80포트 대용)    |
| 27017 |       MongoDB        |         MongoDB 통신         |

주로 <span class="blue-400">DB</span>같은 개발 관련 프로그램들이 많이 등록돼있다.

#### 왜? 하필 개발 관련 프로그램들만?

개발 관련 프로그램들은 그 특성 상 통신의 방식이 **항상 일정**해야 한다. 만약 DB의 <span class="amber-400">포트</span>가 기동할 때마다 수시로 변경된다면 어떨까? 이유를 막론하고 DB가 재기동될 경우, 개발자는 DB가 사용 중인 임의의 <span class="amber-400">포트</span>를 추적하여 프로그램의 DB 통신 코드를 변경해야하는 매우 불합리한 상황이 발생하게 된다.  

이에 비해 게임이나 IDE 같은 일반적인 프로그램들은 굳이 통신의 방식이 일정할 필요는 없다. 어찌됐든 **서버에 정보를 요청하는 순간, 서버는 자연스레 내 통신 정보를 알게되기 때문**이다. 서버는 요청했던 경로로 다시 데이터를 반환해주면 된다. 어떤 <span class="amber-400">포트</span>가 보내는지는 별로 중요하지 않는 이유가 여기에 있다.

### 동적 포트(dynamic Port)

**49152 ~ 65535**의 범위에 해당하는 <span class="amber-400">포트</span>. 대다수의 프로그램들은 <span class="amber-400">포트</span> 기본값이 지정되지 않는 경우가 대부분이다. 이러한 프로그램들은 <span class="amber-400">동적 포트</span> 중 사용 가능한 임의의 빈 <span class="amber-400">포트</span>를 자동으로 점유한다. 때문에 ICANN이 관리하지도 않으며, 특정 프로그램이 고유한 <span class="amber-400">포트</span>로 등록되어있지도 않다. 자유석을 생각하면 편하다.

### Path(경로)

<span class="blue-400">URL</span>상의 <span class="cyan-400">posts</span> 부분. 웹 사이트의 하위 경로를 의미한다. <span class="cyan-400">경로</span>는 `/`로 구분하며, 경로 입력을 통해 서버 내의 원하는 자원에 접근할 수 있다.

* https://blog.itcode.dev
  * posts
    * index.html
    * a1000
      * index.html
    * a1001
      * index.html
    * uri-url-urn
      * index.html
  * project
    * index.html
  * index.html

위 트리는 이 블로그의 단편적인 디렉토리 예시다. 이 중 해당 게시물에 접근하려면 <span class="cyan-400">경로</span>는 `/posts/uri-url-urn/index.html`와 같이 구성할 수 있다. <span class="blue-400">index.html은 생략이 가능</span>하므로 `/posts/uri-url-urn`로 접근해도 무방하다.

> **아시나요?**  
> **index.html** 경로의 기본 HTML을 의미함. 더이상의 하위 경로를 표시하지 않을 경우, 해당 경로의 index.html를 응답한다.

<span class="cyan-400">경로</span>는 서버의 구조에 따라 결정되므로, 사이트마다 천차만별이다.

### Query String(쿼리 문자열)

<span class="blue-400">URL</span>상의 <span class="teal-400">?category=WEB&page=1</span> 부분. 해당 <span class="cyan-400">경로</span>에 임의의 데이터를 같이 전송할 때 사용한다.  
<span class="blue-400">key=value</span> 형태로 이루어지며, 각 `key`는 <span class="purple-400">Parameter(파라미터)</span>라 칭한다. 첫 <span class="purple-400">파라미터</span>는 `?`로 시작하며, 이후 각 <span class="purple-400">파라미터</span>들은 `&`으로 구분된다. 즉 `?key1=value1&key2=value2&key3=value3`과 같은 양식으로 전개된다.

임의의 키워드를 전달하여 페이지의 동작을 제어할 수 있다. <span class="blue-400">URL</span> 중 **사용자의 니즈가 가장 활발하게 반영**되는 부분. <span class="teal-400">쿼리 문자열</span>은 각각의 `key`에 대한 역할을 정의해야 하므로, 개발자가 각 <span class="purple-400">파라미터</span>의 `key`가 동작하는 로직을 작성했을 때 그 의미가 있다.

## URN 구조

지금까지 <span class="blue-400">URL</span>에 대해선 상당히 장황하게 설명했지만, <span class="blue-400">URN</span>의 경우 <span class="blue-400">URL</span>보다 역사가 짧다. 이미 3년이라는 시간 사이에 <span class="blue-400">URL</span>이 표준으로 자리매김한 탓에, 현재까지도 비주류를 면치 못 해 구현된 예시도 그리 많지 않은게 현실이다.  
<span class="blue-400">URL</span>이 위치만 바뀌어도 찾을 수 없다는 단점은, 오히려 제공중인 데이터를 은닉하는 측면 등 상황에 따라 오히려 유용하게 사용할 여지도 있다. 즉, <span class="blue-400">URL</span>의 단점이 마냥 나쁜것만은 아닌 셈이다. 이는 곳 <span class="blue-400">URN</span>의 장점이 현재 구축된 <span class="blue-400">URL</span>체계를 갈아 엎을 정도로 매력적이지 않다는 주장을 뒷받침한다.

<span class="blue-400">URN</span>은 아래와 같은 구조로 이루어진다. 각 요소는 `:`으로 구분한다.

<p class="large" align="center"><span class="lightBlue-400">urn</span>:<span class="green-400">isbn</span>:<span class="yellow-400">1234567890</span></p>

### Protocol(프로토콜)

<span class="blue-400">URN</span>상의 <span class="lightBlue-400">urn</span> 부분. `urn`으로 시작하면 <span class="blue-400">URN</span>체계로 보면 된다.

### NID(Namespace Identifier, 네임스페이스 지시자)

<span class="blue-400">URN</span>상의 <span class="green-400">isbn</span> 부분. **자원이 저장된 저장소**를 표시한다.  
`isbn`은 서지정보유통지원시스템으로 도서 일련번호에 대한 정보를 저장하는 저장소이다. 즉, `isbn`을 <span class="green-400">NID</span>로 지정하면 도서 관련 자원을 식별할 수 있다.

### NSS(Namespace Specific String, 네임스페이스 특정 문자)

<span class="blue-400">URN</span>상의 <span class="yellow-400">1234567890</span> 부분. **자원을 식별할 수 있는 고유값**이다.  
<span class="green-400">NID</span>가 `isbn`으로 지정되어 있으므로, ISBN의 일련번호가 1234567890인 도서를 식별하는 <span class="blue-400">URN</span>이라 볼 수 있다.