---
title: "URI? URL? URN? 리소스 식별자 구분하기"
excerpt: ""
coverImage: "https://media.vlpt.us/images/hanblueblue/post/0261303c-2557-4673-9d91-24b08c6dde16/Tomcat-logo.png"
date: "2021-05-27T15:52:51"
type: "posts"
category: "WEB"
tag: [ "WEB(웹)", "URI", "URL", "URN" ]
comment: true
publish: true
---

## Table of Contents

# URL! URI... URN??

우리가 인터넷 상에서 **특정한 데이터**에 접근할 때 <span class="primary">URL</span>이라는 것을 활용하여 접근한다.  
원하는 자료의 <span class="primary">URL</span>을 얻으면, 브라우저 같은 HTTP 통신 프로그램에 해당 <span class="primary">URL</span>을 호출하여 응답을 얻는 것이다.

개발자나, 굳이 개발자가 아니더라도 관련 정보를 찾다보면 심심치않게 <span class="primary">URI</span>라는 용어를 접하게 된다.  
I와 L의 오묘한 유사성 때문에 아예 <span class="primary">URI</span>를 <span class="primary">URL</span>로 오독하는가 하면, 오타라고 생각하는 사람도 더러 있을 것이다.  
하지만 <span class="primary">URL</span>과 <span class="primary">URI</span>는 그 의미가 비슷하면서도 살짝 다르다.

누구나 알고있는 <span class="primary">URL</span>과 아리까리한 <span class="primary">URI</span>, 생소한 <span class="primary">URN</span>. 이들에 대해 알아보자

# UR* 톱아보기

<span class="primary">URI</span>, <span class="primary">URL</span>, <span class="primary">URN</span>은 구조상 서로 연관이 있다.

## URI(Uniform Resource Identifier, 통합 자원 식별자)

<span class="primary">URI</span>는 우리말로 **통합 자원 식별자**라고 한다. <span class="primary">URI</span>는 앞서 말한 <span class="primary">URL</span>, <span class="primary">URN</span>을 포함하는 상위 개념으로, <span class="orange-400">인터넷 상에 존재하는 **자원을 구분**하는 식별자</span>라 할 수 있다. 웹 상에서 자원을 식별하는 모든 수단이 곧 <span class="primary">URI</span>이라 할 수 있다.

## URL(Uniform Resource Locater, 통합 자원 지시자)

<span class="primary">URL</span>은 굳이 우리말로 하자면 **통합 자원 지시자**라고 할 수 있겠지만, 흔히 인터넷 상에서 **주소**라 함은 99% 이 <span class="primary">URL</span>을 의미한다.  
<span class="primary">URL</span>은 **Locater**라는 키워드에 걸맞게 <span class="orange-400">인터넷 상에 존재하는 자원의 **위치**를 나타내는 식별자</span>라 할 수 있다. 여기서 **위치**라는 키워드에 주목하자. <span class="primary">URL</span>은 자원의 위치정보를 가지므로, 어떠한 이유로든 자원의 위치가 변경되면 <span class="primary">URL</span>은 자원을 찾을 수 없으며, 변경된 위치를 추적할 수도 없다. 이 때 맞이하게 되는 HTTP 오류가 누구나 알고있는 404 Not Found다.  
당장 내가 이 게시물의 이름을 한 글자만 변경해도, 지금까지의 <span class="primary">URL</span>은 아무 쓸모가 없어지며, 사용자들 또한 해당 <span class="primary">URL</span>로 이 게시물에 접근할 수 없다. 또한, 이 <span class="primary">URL</span>을 통해 원래 있던 게시물의 <span class="primary">URL</span>을 논리적으로 유추할 수도 없다.

## URN(Uniform Resource Name, 통합 자원 이름)

<span class="primary">URN</span>은 **통합 자원 이름**이다. 눈치가 빠른 분들은 아시겠지만, <span class="primary">URN</span>은 <span class="orange-400">인터넷 상에 존재하는 자원의 **이름**을 나타내는 식별자</span>다. 자원의 이름은 고유한 값을 가지므로, 인터넷 상의 수 많은 자원들 중 특정 자원을 식별할 수 있는 것이다.  
<span class="primary">URN</span>은 대부분 위에 언급한 두 개념에 비해 생소할 것이다. 그도 그럴 것이, <span class="primary">URN</span>은 위 두 개념보다 훨씬 뒤에 나온 개념이기 때문이다.  

<span class="primary">URL</span>의 치명적인 단점은 **위치**정보 외에 다른 정보를 저장하지 않는다. 이 상황에서 해당 자원을 찾아야 한다면? 안타깝게도 <span class="primary">URL</span>만으로는 찾아낼 수 없다. 구글링해서 운 좋게 찾아낸다면 모를까.  
반면 <span class="primary">URN</span>을 사용한다면 어떨까? 위치가 아무리 변경된다 하더라도, 자원의 고유한 이름을 통해 찾기 때문에 자원이 웹 상에서 완전히 삭제된 게 아니라면 손쉽게 찾아낼 수 있을 것이다.

## 정리

난 어려운 개념을 이해할 때 현실세계와 연관지어 이해하는 걸 좋아한다. 위 세 개념을 현실에서 특정 사람의 신원을 확인하는 과정과 접목해서 정리하면 아래와 같이 정리할 수 있을 것 같다.

| 구분 | 현실 | 값 |
| :---: | :---: | :---: |
| 자원 | 나 자신 | 나 |
| URI | 나를 식별할 수 있는 모든 식별자 | - |
| URL | 내가 사는 주소 | 서울특별시 A구 가동 |
| URN | 내 주민등록번호 | 000000-0000000 |

<span class="small red-A400">※ URN은 모든 자원의 고유값이므로, 사람과 연관지었을 때, 중복 가능성이 있는 이름 보다는 고유값인 주민등록번호가 더 적합하다.</span>

예를 들어, 내 정보가 위와 같다고 가정해보자. 내가 사는 주소 및 내 주민등록번호 모두 내 신원을 확인할 수 있는 방식(<span class="primary">URI</span>)이므로, 나를 찾기에 적합하다.  
만약 내 주소(<span class="primary">URL</span>)를 통해 확인할 경우, 내가 이사(자원의 이동)를 가게 되면 해당 주소엔 아무것도 없으며, 날 찾을 수도 없다(404 HTTP 에러). 또한, 내가 예전에 살던 주소만으로 내가 이사간 주소를 유추해낼 수도 없을 것이다.

반면, 내 주민등록번호(<span class="primary">URN</span>)을 통해 확인할 경우, 내 주민등록번호와 매칭되는 사람을 찾는 것으로 나를 식별할 수 있다. 이 과정에서 내가 어디에 있는지는 전혀 중요치 않은 것이다. 주민등록번호 자체가 말소(자원 삭제)되지 않는 한, 내가 어디에서 무엇을 하고있든 내 신원을 확인할 수 있다.

# 구조

그렇다면 이들은 어떻게 생겼는지 알아보자. <span class="primary">URI</span>는 자원의 식별자를 포괄하여 지칭하는 개념 그 자체이므로, 구조라고 할 건 없다. 하위 개념인 <span class="primary">URL</span>, <span class="primary">URN</span>에 대해 알아보자.

## URL 구조

<span class="primary">URL</span>은 아래와 같은 구조로 이루어진다. 매우 익숙할 것이다.

<p class="large" align="center"><span class="lightBlue-400">https</span>://<span class="green-400">rwb0104</span>.<span class="yellow-400">github</span>.<span class="pink-400">com</span>:<span class="amber-400">443</span>/<span class="cyan-400">posts</span><span class="teal-400">?category=WEB&page=1</span></p>

구조별로 색상을 입혔으며, 순서대로 기술한다.

### Protocol(프로토콜)

<span class="primary">URL</span>상의 <span class="lightBlue-400">https</span> 부분.

통신규약을 의미한다. 작성일 기준으로, 이 규약엔 계층별로 많은 <span class="lightBlue-400">프로토콜</span>이 존재하는데, 웹 통신을 수행할 땐 크게 두 가지로 나뉜다.

| 구분 | 내용 |
| :---: | :---: |
| HTTP | W3 상에서의 HTML 문서 통신규약 |
| HTTPS | 암호화된 HTTP 통신 규약 |

현재는 포털, 쇼핑몰같은 대형 비즈니스 사이트나 블로그, 카페 등 중소규모의 개인 사이트까지 <span class="red-A400">HTTPS의 사용이 반 강제적으로 권장</span>되어 있다. 특히 전자상거래가 접목된 비즈니스 사이트의 경우 필수로 적용해야 한다. 더군다나 <span class="red-A400">HTTPS가 적용되지 않는 사이트(localhost 제외)에 접근할 경우 브라우저 측에서 보안 관련 경고 메시지</span>를 띄우니, 규모에 관계없이 웹 사이트를 운영할 경우 HTTPS는 필수로 적용하는 편이다.

### SLD(Second Level Domain, 서브도메인, 호스트)

<span class="primary">URL</span>상의 <span class="green-400">rwb0104</span> 부분.

도메인 앞에 붙으며, <span class="green-400">서브도메인</span>을 통해 하나의 <span class="yellow-400">도메인</span>으로 다중 서비스를 제공할 수 있다. 하나의 <span class="yellow-400">도메인</span>에 여러 <span class="green-400">서브도메인</span>을 생성할 수 있으며, 우리가 흔히 아는 `www` 외에도 `dev`, `admin`, `m` 용도에 따라 다양한 문자열을 지정할 수 있다.

| URL | 내용 |
| :---: | :---: |
| [naver.com](https://naver.com) | 기본 네이버 홈페이지. 각 플랫폼(데스크탑, 모바일 등)에 가장 적합한 사이트로 리다이렉트 |
| [www.naver.com](https://www.naver.com) | 데스크탑용 네이버 홈페이지 |
| [m.naver.com](https://m.naver.com) | 모바일용 네이버 홈페이지 |
| [map.naver.com](https://map.naver.com) | 네이버 지도 |

위는 네이버 서비스의 <span class="green-400">서브도메인</span>으로, `naver.com` <span class="yellow-400">도메인</span>을 중심으로 각기 다른 서비스를 제공하는 것을 확인할 수 있다.

### Domain(도메인)

<span class="primary">URL</span>상의 <span class="yellow-400">github</span> 부분.

URL의 중심이 되는 부분으로, 제공하는 웹 서비스의 아이덴티티 역할을 겸한다. 때문에 <span class="yellow-400">도메인</span>에는 대부분 해당 웹 서비스의 이름이 들어간다.

| 서비스 | URL |
| :---: | :---: |
| 네이버 | [naver.com](https://naver.com) |
| 다음 | [www.daum.com](https://www.daum.com) |
| GitHub | [github.com](https://github.com) |
| Instagram | [instagram.com](https://instagram.com) |

대부분의 서비스가 <span class="yellow-400">도메인</span>으로 서비스의 이름을 사용하고 있다.

### TLD(Top Level Domain, 최상위 도메인)

<span class="primary">URL</span>상의 <span class="pink-400">com</span> 부분.

<span class="pink-400">최상위 도메인</span>이란, 앞서 언급한 <span class="green-400">서브도메인</span>, <span class="yellow-400">도메인</span>을 관리하는 업체 혹은 기관이라고 볼 수 있다.  
앞서 언급한 개념의 경우, 중복되지 않는 선에서 사용자가 임의로 지정할 수 있다. 하지만 <span class="pink-400">최상위 도메인</span>의 경우 현재 운영 중인 업체나 기관 중 하나를 **선택**해서 등록해야 한다. <span class="pink-400">최상위 도메인</span>을 선택할 경우, 당신의 도메인은 해당 <span class="pink-400">최상위 도메인</span>을 운영하는 곳에서 관리하게 된다.

<span class="pink-400">최상위 도메인</span>은 운영 주체에 따라 두 가지로 나뉜다.

#### ccTLD(country code TLD, 국가 코드 최상위 도메인)

국가를 나타내는 <span class="pink-400">최상위 도메인</span>이다.

| ccTLD | 내용 |
| :---: | :---: |
| .kr | 한국(KISA) |
| .us | 미국(LLC) |
| .jp | 일본 |
| .io | 영국령 인도양 |

<span class="pink-400">ccTLD</span>는 위 표와 같이 국가 코드 형태이며, 각 국가기관이 직접 관리한다. 즉, `.kr`을 가진 모든 도메인은 **한국의 KISA(한국 인터넷 진흥원)에서 관리**한다.

#### gTLD(generic TLD, 일반 최상위 도메인)

사이트 혹은 사이트를 소유한 조직, 기관의 특성에 따라 사용하는 <span class="pink-400">최상위 도메인</span>이다.

| gTLD | 내용 |
| :---: | :---: |
| .com | 영리 단체 및 기관 |
| .net | 네트워크 관리기관 |
| .org | 비영리 기관 |
| .gov | 정부 기관 |

<span class="pink-400">gTLD</span>는 위 표와 같이 다양한 종류가 있으며, 그 중 몇몇은 자주 접했을 것이다. 정부기관이 왜 여깄나 생각할 수도 있는데, <span class="pink-400">ccTLD</span>는 **국가 코드**만 해당된다. 국가 예하의 정부기관, 군사조직 등은 구분 상 <span class="pink-400">gTLD</span>로 분류된다.  
마찬가지로, 각 <span class="pink-400">최상위 도메인</span>은 **해당 <span class="pink-400">최상위 도메인</span>을 소유한 기관 혹은 기업에서 관리**한다.

현재 운영 중인 <span class="pink-400">최상위 도메인</span>은 [IANA](https://www.iana.org/domains/root/db)에서 확인할 수 있다.