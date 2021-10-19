---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 2. 인증서버 설계하기"
excerpt: "OAuth2.0 프로토콜에 대한 사전 지식도 얻었으니, 이를 통해 인증서버를 직접 구축해보자. Frontend, Backend 부분으로 나누어 웹 페이지를 통해 소셜 로그인을 수행하고, 직접 구현한 인증서버에서 이를 처리하는 시스템 일체를 구축하는 것이 궁극적인 목표다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-14T22:12:25"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

OAuth2.0 프로토콜에 대한 사전 지식도 얻었으니, 이를 통해 인증서버를 직접 구축해보자.

Frontend, Backend 부분으로 나누어 웹 페이지를 통해 <span class="red-400">소셜 로그인을 수행</span>하고, 직접 구현한 <span class="red-400">인증서버에서 이를 처리하는 시스템 일체를 구축</span>하는 것이 궁극적인 목표다.

인증 서버의 인증 방식은 <span class="primary">인가 코드 승인 (Authorization Code Grant)</span>을 취한다.

# 제원

웹 페이지인 Frontend와 API 통신의 주체가 되는 인증서버인 Backend로 나뉜다.

## Backend

<b class="large green-600">💬 Language</b>

* [![Java](http://img.shields.io/badge/java-v16.0.2-007396?logo=java&logoWidth=25)](https://www.java.com/ko/)

<b class="large green-600">🧱 Framework</b>

* [![Gradle](https://img.shields.io/badge/gradle-02303A?logo=gradle&logoWidth=25)](https://gradle.org/)
* ![jakarta.servlet-api](https://img.shields.io/badge/jakarta.servlet--api-v5.0.0-blue)
* ![lombok](https://img.shields.io/badge/lombok-v1.18.20-blue)
* ![jjwt](https://img.shields.io/badge/jjwt-v0.9.1-blue)
* ![scribejava-apis](https://img.shields.io/badge/scribejava--apis-v8.3.1-blue)
* ![jersey-server](https://img.shields.io/badge/jersey--server-v3.0.3-blue)
* ![jersey-container-servlet](https://img.shields.io/badge/jersey--container--servlet-v3.0.3-blue)
* ![jersey-hk2](https://img.shields.io/badge/jersey--hk2-v3.0.3-blue)
* ![jersey-media-json-jackson](https://img.shields.io/badge/jersey--media--json--jackson-v3.0.3-blue)

<b class="large green-600">📦 Publish</b>

* [![Tomcat](http://img.shields.io/badge/Tomcat-v10.0.12-F8DC75?logo=apachetomcat&logoWidth=25&logoColor=FFF)](http://tomcat.apache.org/)
* [![Raspberry Pi](http://img.shields.io/badge/RaspberryPi-F00?logo=raspberrypi&logoWidth=25&logoColor=FFF)](https://www.raspberrypi.org/)

Jersey는 RESTful API 프레임워크, scribeJAVA는 OAuth 프레임워크다.

Jersey 3는 Servlet 5.0 최신 스펙인 `jakarta.*`을 사용한다. 때문에 이를 구현한 Tomcat 10을 사용한다. Tomcat 10 미만 혹은 `jakarta.*`을 구현하지 않는 등 <b class="red-600">최신 서블릿 스펙을 사용할 수 없는 WAS의 경우 이 프로젝트는 배포할 수 없다.</b>

## Frontend

<b class="large green-600">💬 Language</b>

* [![HTML5](http://img.shields.io/badge/HTML5-E34F26?logo=html5&logoWidth=25&logoColor=FFF)](https://developer.mozilla.org/ko/docs/Web/HTML)
* [![JavaScript](http://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoWidth=25&logoColor=000)](https://developer.mozilla.org/ko/docs/Web/JavaScript)
* [![CSS3](http://img.shields.io/badge/CSS3-1572B6?logo=css3&logoWidth=25)](https://developer.mozilla.org/ko/docs/Web/CSS)

<b class="large green-600">🧱 Framework</b>

* [![eslint](https://img.shields.io/badge/eslint-^7.32.0-4B32C3?logo=eslint&logoWidth=25)](https://eslint.org/)

<b class="large green-600">📦 Publish</b>

* [![GitHub](http://img.shields.io/badge/GitHub%20Pages-000?logo=github&logoWidth=25&logoColor=FFF)](https://pages.github.com/)

원래는 Raspberry Pi로 배포하고 있었으나, 굳이 그럴 필요가 없어서 GutHub Pages로 배포한다.

Frontend는 단순히 인증 서버와의 API 통신 및 정보 표출 정도만 수행하므로, React 같은 복잡한 기술은 최대한 지양하고 최대한 기본 기능으로만 구성했다.

# 구성

인증서버는 크게 세 부분으로 나눌 수 있다.

* `controller` - 지정한 URL의 요청을 받아 process에게 위임한다.
* `process` - API의 동작을 수행하고, 응답을 생성한다
* `module` - API 동작 수행에 필요한 모듈

이는 패키지로 구분한다.

## controller

Jersey 프레임워크는 `controller` 영역에서 동작한다.

기존의 Servlet은 RESTful API를 설계하기위해 직접 구현해야할 부분이 존재한다.

RESTful API를 효과적으로 설계하기 위해 Jersey 프레임워크를 사용한다.

![image](https://user-images.githubusercontent.com/50317129/137264829-4e703edf-e682-4793-a2b1-675056cba087.png)

controller는 <span class="primary">정의된 process로 요청을 전달하고, process가 반환하는 응답을 요청자에게 다시 전달</span>한다.

* `/login`
  * GET `/:platform` - 플랫폼별 인증 URL 반환 API
  * PUT `/put` - 정보 제공 동의 갱신 URL 반환 API
  * POST `/:platform` - 플랫폼별 로그인 API
  * POST `/auto` - 자동 로그인 API

* `/logout`
  * POST `/` - 로그아웃 API

* `/revoke`
  * POST `/` - 연동 해제 API

* `/userinfo`
  * POST `/` - 사용자 정보 API

해당 프로젝트에선 위 `controller`들이 구현될 것이다.

## process

`process`에선 실제 로직이 구현되는 영역이다. 이 때 필요하다면 `module`을 호출하기도 한다.

![image](https://user-images.githubusercontent.com/50317129/137265824-a2652f3c-c32f-42cf-9b5e-8f523530895e.png)

`process`는 <span class="primary">수행 결과를 정해진 형식의 JSON을 기반으로 응답 객체</span>를 만들어 `controller`로 반환한다.

``` json
{
    flag: true,
    title: "success",
    message: "test api response success",
    body: {
        key1: "value1",
        key2: true,
        key3: 4932,
        key4: [
            "A",
            "B",
            "C"
        ],
        key5: 93.203
    }
}
```

| 파라미터 | 필수 여부 |                   데이터 형식                    |      내용      |
| :------: | :-------: | :----------------------------------------------: | :------------: |
|   flag   |     Y     |                    `boolean`                     | 응답 정상 여부 |
|  title   |     Y     |                     `String`                     |   응답 제목    |
| message  |     Y     |                     `String`                     |  응답 메세지   |
|   body   |     Y     | `String \| Number \| boolean \| Array \| Object` | 응답 정상 여부 |

응답 명세는 위와 같다.

`process`는 GET, POST 등 HTTP Method에 따라 나누어 관리한다.

## module

module은 여러 `process`에서 <span class="primary">반복적으로 사용되는 로직의 모듈화를 구현한 객체</span>다.

이 중 핵심 기능인 OAuth의 인증을 처리하는 모듈은 scribeJAVA 기반으로 작성된다.

로그인, 사용자 정보 요청 등 인증과 관련된 로직을 수행하는 `process`들은 모두 위 모듈을 호출하여 사용함으로써 중복 코드를 줄이고 유지보수성을 높인다.

# OAuth 모듈

이 프로젝트의 Backend에 가장 중요한 역할을 담당하는 모듈로, OAuth 인증을 구현한다.

![image](https://user-images.githubusercontent.com/50317129/137314562-675ee988-0dad-4937-93a1-73753c2afee4.png)

요즘은 어느정도 규모있는 플랫폼이라면 OAuth 서비스를 제공한다. 플랫폼은 달라도 OAuth를 준수한다면 모두 공통된 요청 받아 공통된 응답을 제공할 것이다. 공통 프로토콜을 사용하므로, 인증 모듈 하나를 만들어 모든 인증을 거기서 처리하면 될 것이다.

![image](https://user-images.githubusercontent.com/50317129/137314573-599b1317-0e46-4698-ac65-04fef57933e8.png)

하지만 문제가 하나 있다. 아무리 공통 프로토콜을 사용한다지만, <span class="red-400">플랫폼마다 추가적인 파라미터 혹은 헤더를 요구</span>하기도 한다. 조건문을 떡칠한다면 모를까, 고작 인증 모듈 하나에서 플랫폼별 요구사항을 하나하나 처리하기엔 문제가 많다. 조건문을 통한 분기 역시 유지보수적인 측면에서 그리 좋은 방식은 아니다.

<br />
<br />

OAuth는 객체라기보단 일종의 개념에 더 가깝다. 이렇게 추상적인 개념의 형태는 JAVA의 인터페이스 내지는 추상 객체가 적합하다.

![image](https://user-images.githubusercontent.com/50317129/137314582-cf0c24f7-5ad3-42f8-a7d7-de19e59c8582.png)

인증 모듈의 경우, 몇몇 플랫폼의 특이 사항으로 인해 문제가 발생하니, 기본적으로는 <span class="blue-600">인증 모듈의 공통 로직을 사용하되, 추가적인 요구를 하는 플랫폼에 한해 로직을 변경하는 것이 효율적</span>일 것이다. 따라서 인증 모듈은 인터페이스보단 추상 객체가 더 어울릴 것이다.

이렇게 인증 추상 모듈을 하나 생성하고, 각 소셜 플랫폼마다 인증 모듈을 상속받아 구현하게끔 설계하면 될 것이다.

문제가 없는 플랫폼은 기 선언된 인증 모듈의 메서드를 그대로 사용하고, <span class="blue-600">추가 요구사항이 있는 플랫폼은 해당 플랫폼의 인증 모듈에서 메서드를 오버라이딩</span>하여 요구사항에 맞게 재설계한다.

## 인증 모듈 기능

구현해야할 기능은 아래와 같다.

* 플랫폼 로그인 URL 생성 로직
* 정보 제공 동의 갱신 URL 생성 로직
* 서비스 로그인 로직 (인가코드 -> Access Token)
* 자동 로그인 로직
* 로그아웃 로직
* 사용자 정보 호출 로직
* 연동 해제 로직

최소한 위 기능이 구현되어야한다.

사용자 정보 호출의 경우, 플랫폼마다 주는 응답이 천차만별로 다르다.

사용자 정보는 OAuth로 전달받은 Access Token으로 Service Provider에 정보를 요청하여 받을 수 있다. OAuth는 어디까지나 인증을 받기 위한 표준 프로토콜로, <span class="red-400">인증 토큰을 통해 수행하는 부가적인 활동에 대해서는 별다른 제약이 없으므로</span>, Access Token 발급 이후의 API 요청 및 응답은 플랫폼마다 천차만별로 다르다.

때문에 사용자 정보 호출 로직의 경우, OAuth 표준 프로토콜에 구애받지 않는다. 이에 대응하기 위해 추상 메서드로 선언하여 각 모듈에서 응답을 정제하여 반환하도록 강제하자.

# 구조도

![image](https://user-images.githubusercontent.com/50317129/137319720-28a6d25b-6128-4873-bbb4-b0e0f5cce847.png)

OAuth 모듈을 사용하는 API의 구조를 도식화하면 위와 같다.

Jersey가 URL을 캐치하여 정해진 process로 전달한다. process는 인증을 수행하기 위해 해당 플랫폼의 OAuth 구현체를 호출하여 로직을 수행할 것이다. 이후 결과가 반환되어 사용자에게 전달되는 구조다.

# 정리

지금까지 인증 서버에 대한 설계를 진행했다. 다음 장엔 위 설계를 토대로 인증 서버를 본격적으로 구축해본다. 그 중에서도 scribeJAVA와 OAuth 인증 모듈에 대해 다룰 예정이다.

구축 순서는 module -> process -> controller 순이다.

가장 안쪽에 위치한 프로세스가 module이므로, module에서부터 바깥쪽으로 순차적으로 구현할 예정이다.