---
title: "URI? URL? URN? 리소스 식별자 구분하기"
excerpt: ""
coverImage: "https://media.vlpt.us/images/hanblueblue/post/0261303c-2557-4673-9d91-24b08c6dde16/Tomcat-logo.png"
date: "2021-05-27T15:52:51"
type: "posts"
category: "WEB"
tag: [ "WEB(웹)", "URI", "URL", "URN" ]
comment: true
publish: false
---

## Table of Contents

# Domain(도메인)이란?

도메인을 이해하기 위해선, IP에 대해 짚고 넘어가야 한다.  
인터넷에 연결된 모든 디바이스(컴퓨터, 스마트폰, 공유기 등)는 <span class="blue-500">고유한 12자리 숫자로 구성된 IP주소</span>를 가진다.  
IP를 유동성으로 나누면 크게 유동 IP, 고정 IP로 분류할 수 있다.

* <span class="primary">유동 IP</span>: 임의의 시점마다 IP주소가 갱신되는 IP. 갱신 주기는 일정하지 않음. 대부분의 인터넷 회선에 적용됨.
* <span class="primary">고정 IP</span>: 회선에 고정된 IP를 부여하며, 해당 회선의 IP는 갱신되지 않음. 부가서비스 형태로 제공되며, 쇼핑몰이나 회사 등 지속적으로 시스템을 운영해야 할 경우 적합함.

우리가 원하는 장소에 방문하기 위해 주소를 찾듯이, <span class="green-500">특정 서버에서 운영하는 웹 사이트를 방문하기 위해선 해당 서버의 주소인 IP가 필요</span>하다.  
불행히도, IP는 불규칙적인 숫자로 이루어져있어, 사람이 쉽게 기억하기 다소 어렵다. 이러한 불편함을 해소하기 위한 것이 Domain(도메인)이다.

# 그래서 도메인을 왜 쓰는데?

우리가 흔히 <span class="green-A700">네이버</span>라고 부르는 사이트의 실제 IP는 [125.209.222.141](http://125.209.222.141)이다. 하지만 우리들 중 그 누구도 저런 IP로 <span class="green-A700">네이버</span>에 접속하지 않는다. 대신 우리는 [https://www.naver.com](https://www.naver.com)이라는 도메인으로 접속한다. 이유는 간단하다. 주소 자체에 <span class="green-A700">naver</span>라는 키워드가 포함되어 있으므로 기억하기 쉽기 때문이다.

<span class="pink-400">도메인</span>은 숫자가 아닌, 문자 형태로 이루어진 주소다. 문자이므로, 주소에 의미를 부여하기 용이하다. 사용자가 주소를 기억하기 쉬워 주소에 대한 접근성을 높여준다.  
생성한 <span class="pink-400">도메인</span>에 원하는 IP를 연결하면 <span class="pink-400">도메인</span> 주소를 통해서도 해당 IP에 접근할 수 있다.
<span class="pink-400">도메인</span> 제공 업체에 따라, 영숫자 뿐만 아니라 한글과 같은 유니코드 문자도 지원하므로, 딱딱한 IP 대신 개성있는 주소를 사용할 수 있는 것이다.

# 도메인의 구조 <- URL로 뺄 것

도메인은 아래와 같은 구조로 이루어진다.

<p class="large" align="center"><span class="lightBlue-400">https</span>://<span class="green-400">rwb0104</span>.<span class="yellow-400">github</span>.<span class="pink-400">com</span>:<span class="amber-400">443</span></p>

* <span class="lightBlue-400">Protocol(프로토콜)</span>: 도메인의 프로토콜. 웹 페이지는 `http` 혹은 `https` 중 하나를 선택한다. 이 중 `https`는 <span class="deepPurple-400">SSL</span>이 적용되어 <span class="red-400">서버와 클라이언트 간의 통신이 암호화</span>됨을 의미한다.

* <span class="green-400">SLD(Second Level Domain; 서브도메인, 호스트)</span>: <span class="pink-400">도메인</span>의 확장자. 같은 <span class="pink-400">도메인</span>에 <span class="pink-400">서브도메인</span>을 여러개 추가할 수 있으며, 이를 통해 각 <span class="pink-400">서브도메인</span>별로 다른 서비스를 제공할 수 있다. `www`, `admin`, `dev` 등 다양한 문자열로 지정할 수 있다.
  * [naver.com](https://naver.com): 기본 네이버 홈페이지. 각 플랫폼(데스크탑, 모바일 등)에 가장 적합한 사이트로 리다이렉트
  * [www.naver.com](https://www.naver.com): 데스크탑용 네이버 홈페이지
  * [m.naver.com](https://m.naver.com): 모바일용 네이버 홈페이지
  * [map.naver.com](https://map.naver.com): 네이버 지도

* <span class="yellow-400">Domain(도메인)</span>: 도메인의 이름. 대부분 해당 도메인이 제공하는 서비스의 아이덴티티를 위해 제공하는 서비스의 이름을 사용한다. `naver`, `github`, `steam`, `instagram` 등이 있다.

* <span class="pink-400">TLD(Top Level Domain; 최상위도메인)</span>: 해당 도메인을 관리하는 국가, 업체, 기관 등을 나타낸다. <span class="pink-400">서브도메인</span> 및 <span class="pink-400">도메인</span>과 달리 사용자가 임의로 지정할 수 없으며, 반드시 존재하는 최상위 도메인 중 하나를 선택해야 한다. 최상위 도메인의 예시와 의미는 아래와 같으며, 대부분의 최상위 도메인은 사이트의 용도와 일치하지 않아도 무관하다.
  * <span class="primary">.kr</span>: 대한민국 국가코드 도메인
  * <span class="primary">.us</span>: 미국 국가코드 도메인
  * <span class="primary">.com</span>: 영리 기업, 단체 도메인
  * <span class="primary">.net</span>: 네트워크 기관
  * <span class="primary">.org</span>: 비영리 기관

* <span class="amber-400">포트</span>: 해당 사이트를 서비스하는 포트. http의 경우 `80`, https의 경우 `443` 포트를 기본으로 사용한다. 기본 포트를 사용할 경우 URL에 표시되지 않는다.

해당 URL을 기준으로 하위 디렉토리나 쿼리 등이 붙게 된다.

# 도메인의 원리

여기서 의문점이 한 가지 생긴다. IP [125.209.222.141](http://125.209.222.141)와 <span class="pink-400">도메인</span> [https://www.naver.com](https://www.naver.com)가 <span class="green-A700">네이버</span>를 가리키는 주소인건 알겠는데, 인터넷은 과연 두 주소의 연결고리를 어떻게 아는 걸까?

이는 <span class="pink-400">도메인</span>의 동작 원리를 보면 알 수 있다.

-- 사진 --

1. 사용자가 <span class="pink-400">도메인</span>에 접근을 요청한다.
2. 사용자의 네트워트에 지정된 로컬<span class="pink-400">DNS(Domain Name System)</span>에 <span class="pink-400">도메인</span>의 정보를 요청한다.
3. 로컬<span class="pink-400">DNS(Domain Name System)</span>에 해당 정보가 있을 경우, 정보를 즉시 반환한다.
4. 전 세계에 구축된 Root <span class="pink-400">DNS(Domain Name System)</span> 중 근접한 Root <span class="pink-400">DNS</span>에 <span class="pink-400">도메인</span>의 정보를 요청한다.
5. Root <span class="pink-400">DNS</span>가 해당 도메인의 정보를 보유 중인 <span class="pink-400">DNS</span>의 정보를 전달한다.
   * ex) `.com`, `.net`, `.kr`, `.io` 등 해당