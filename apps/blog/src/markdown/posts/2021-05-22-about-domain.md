---
title: "도메인이란?"
excerpt: "도메인을 이해하기 위해선, IP에 대해 짚고 넘어가야 한다. 인터넷에 연결된 모든 디바이스(컴퓨터, 스마트폰, 공유기 등)는 고유한 12자리 숫자로 구성된 IP주소를 가진다. IP를 유동성으로 나누면 크게 유동 IP, 고정 IP로 분류할 수 있다. 유동 IP: 임의의 시점마다 IP주소가 갱신되는 IP. 갱신 주기는 일정하지 않음. 대부분의 인터넷 회선에 적용됨. 고정 IP: 회선에 고정된 IP를 부여하며, 해당 회선의 IP는 갱신되지 않음. 부가서비스 형태로 제공되며, 쇼핑몰이나 회사 등 지속적으로 시스템을 운영해야 할 경우 적합함. 우리가 원하는 장소에 방문하기 위해 주소를 찾듯이, 특정 서버에서 운영하는 웹 사이트를 방문하기 위해선 해당 서버의 주소인 IP가 필요하다."
coverImage: "https://user-images.githubusercontent.com/50317129/120056028-b2985880-c074-11eb-8cc3-39f5f10a2c7f.png"
date: 1621655571000
type: "posts"
category: "WEB"
tag: [ "WEB(웹)", "Domain(도메인)" ]
comment: true
publish: true
---

# Domain(도메인)이란?

도메인을 이해하기 위해선, IP에 대해 짚고 넘어가야 한다.  
인터넷에 연결된 모든 디바이스(컴퓨터, 스마트폰, 공유기 등)는 <span class="blue-500">고유한 12자리 숫자로 구성된 IP주소</span>를 가진다.  
IP를 유동성으로 나누면 크게 유동 IP, 고정 IP로 분류할 수 있다.

* <span class="blue-400">유동 IP</span>: 임의의 시점마다 IP주소가 갱신되는 IP. 갱신 주기는 일정하지 않음. 대부분의 인터넷 회선에 적용됨.
* <span class="blue-400">고정 IP</span>: 회선에 고정된 IP를 부여하며, 해당 회선의 IP는 갱신되지 않음. 부가서비스 형태로 제공되며, 쇼핑몰이나 회사 등 지속적으로 시스템을 운영해야 할 경우 적합함.

우리가 원하는 장소에 방문하기 위해 주소를 찾듯이, <span class="green-500">특정 서버에서 운영하는 웹 사이트를 방문하기 위해선 해당 서버의 주소인 IP가 필요</span>하다.  
불행히도, IP는 불규칙적인 숫자로 이루어져있어, 사람이 쉽게 기억하기 다소 어렵다. 이러한 불편함을 해소하기 위한 것이 Domain(도메인)이다.

도메인은 <span class="pink-400">SLD(서브도메인)</span>, <span class="pink-400">도메인</span>, <span class="pink-400">TLD(최상위 도메인)</span>으로 구분되며, 해당 도메인의 정보는 1차적으로 각 로컬 DNS 서버가 관리하며, 최종적으로는 TLD를 관리하는 Root DNS에서 관리한다.

> 도메인에 대한 자세한 내용은 이전에 작성된 [URI? URL? URN? 리소스 식별자 구분하기](/posts/uri-url-urn)를 참조한다.

# 그래서 도메인을 왜 쓰는데?

우리가 흔히 <span class="green-A700">네이버</span>라고 부르는 사이트의 실제 IP는 [125.209.222.141](http://125.209.222.141)이다. 하지만 우리들 중 그 누구도 저런 IP로 <span class="green-A700">네이버</span>에 접속하지 않는다. 대신 우리는 [https://www.naver.com](https://www.naver.com)이라는 도메인으로 접속한다. 이유는 간단하다. 주소 자체에 <span class="green-A700">naver</span>라는 키워드가 포함되어 있으므로 기억하기 쉽기 때문이다.

<span class="pink-400">도메인</span>은 숫자가 아닌, 문자 형태로 이루어진 주소다. 문자이므로, 주소에 의미를 부여하기 용이하다. 사용자가 주소를 기억하기 쉬워 주소에 대한 접근성을 높여준다.  
생성한 <span class="pink-400">도메인</span>에 원하는 IP를 연결하면 <span class="pink-400">도메인</span> 주소를 통해서도 해당 IP에 접근할 수 있다.
<span class="pink-400">도메인</span> 제공 업체에 따라, 영숫자 뿐만 아니라 한글과 같은 유니코드 문자도 지원하므로, 딱딱한 IP 대신 개성있는 주소를 사용할 수 있는 것이다.

# 도메인의 원리

여기서 의문점이 한 가지 생긴다. IP [125.209.222.141](http://125.209.222.141)와 <span class="pink-400">도메인</span> [https://www.naver.com](https://www.naver.com)가 <span class="green-A700">네이버</span>를 가리키는 주소인건 알겠는데, 인터넷은 과연 두 주소의 연결고리를 어떻게 아는 걸까?

이는 <span class="pink-400">도메인</span>의 동작 원리를 보면 알 수 있다. `blog.itcode.dev` <span class="pink-400">도메인</span>에 접근하는 과정을 예시로 보자.

1. HTTP 통신을 통해 `blog.itcode.dev`에 접근을 시도한다.
2. 네트워크에 지정된 로컬 DNS에게 `blog.itcode.dev`의 정보를 요청한다.
   * 만약 로컬 DNS가 해당 도메인의 정보를 보유하고 있을 경우, 즉시 정보를 제공한다.
3. `blog.itcode.dev`에 대한 정보가 없을 경우, 근접한 Root DNS에 해당 도메인의 정보를 요청한다.
4. Root DNS가 `.io` TLD를 관리하는 DNS 서버의 정보를 로컬 DNS에 제공한다.
5. 로컬 DNS가 `blog.itcode.dev`를 관리하는 TLD의 DNS 서버에 해당 정보를 요청한다.
6. TLD DNS 서버가 `blog.itcode.dev`에 대한 정보(IP 등)을 제공한다.
7. 로컬 DNS가 `blog.itcode.dev`의 IP를 알고 있으므로, 이를 통해 해당 사이트에 접근할 수 있다.

기본적으로 <span class="pink-400">도메인</span>은 반드시 하나의 IP와 연결된다. 이런 특징 덕분에 <span class="pink-400">도메인</span>은 항상 특정한 하나의 IP만을 반환한다.