---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 1. OAuth2.0이란?"
excerpt: "사이트를 돌아다니다보면 로그인이 필요한 사이트를 심심치않게 만나볼 수 있다. 그리고 이런 사이트들은 대부분 \"네이버로 로그인하기\"와 같은 플랫폼 로그인을 제공한다. 사이트 뿐만 아니라 근래 들어 출시되는 앱 역시 대부분 플랫폼을 통한 인증 서비스를 제공한다. 이를 활용하면 매우 간단한 절차를 통해 회원가입 또는 로그인을 수행할 수 있게 된다. 이러한 서비스는 네이버 뿐만 아니라 Google, 카카오 등 어느정도 규모있는 플랫폼의 대부분은 이러한 \"플랫폼으로 로그인하기\"와 같은 기능을 제공한다. 이렇게 플랫폼의 정보를 활용하여 타 사이트에서 인증을 수행하는 것을 OAuth 프로토콜이라 한다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: 1634140591000
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

사이트를 돌아다니다보면 로그인이 필요한 사이트를 심심치않게 만나볼 수 있다. 그리고 이런 사이트들은 대부분 "네이버로 로그인하기"와 같은 플랫폼 로그인을 제공한다. 사이트 뿐만 아니라 근래 들어 출시되는 앱 역시 대부분 플랫폼을 통한 인증 서비스를 제공한다.

![image](https://user-images.githubusercontent.com/50317129/137170074-d678c0e1-d30a-4d38-91e5-543344e18ec3.png)

이를 활용하면 매우 간단한 절차를 통해 회원가입 또는 로그인을 수행할 수 있게 된다. 이러한 서비스는 네이버 뿐만 아니라 Google, 카카오 등 어느정도 규모있는 플랫폼의 대부분은 이러한 "플랫폼으로 로그인하기"와 같은 기능을 제공한다.

이렇게 플랫폼의 정보를 활용하여 타 사이트에서 인증을 수행하는 것을 OAuth 프로토콜이라 한다.

# OAuth

![image](https://user-images.githubusercontent.com/50317129/137171256-3ca820ec-1435-4103-bc34-9c922832886c.png)

OAuth는 Open Authentication의 약자로, 인증을 위한 표준 프로토콜이다.

이전의 인증 방식은 사이트 혹은 애플리케이션에 직접 회원가입을 수행하여 내 정보를 제공하고, 비밀번호를 통해 인증하는 비밀번호 인증 방식을 취한다. 물론 이 비밀번호 인증 방식은 인터넷의 초창기부터 지금까지 사용하는 기법이지만, 그렇다고 문제가 아주 없는 것은 아니였다.

* 서비스마다 운영되는 중구난방적인 인증 시스템
* 사이트의 신뢰성 문제
* 인터넷을 사용할수록 과적되는 인증 정보

OAuth 이전에는 이렇다할 인증 표준이 존재하지 않았다. 표준이 없다보니 인증 시스템은 서비스마다 개성이 넘처흘렀다. 사이트마다 요구하는 정보, 방식이 천차만별로 다르니 사용자 입장에서는 매우 혼란스러울 것이다.

그래도 이 점은 나름 사이트를 구분할 수 있는 일종의 척도(?)가 되기도 한다만, 더 큰 문제는 해당 사이트를 신뢰할만한 지표가 전혀 없다는 것이다. 내 정보를 왜 가져가는지, 어떻게 보관하는지 알 길이 없는 사용자들은 울며 겨자먹기로 서비스에게 내 정보를 제공하게 된다.

이런 사이트들을 조금만 돌아다니면서 상호작용을 하다보면, 나도 모르는 새에 계정정보가 쌓여있을 것이다. 인증의 주체가 되는 "나"는 하나인데, 인증 표준의 부재로 인해 각 서비스마다 나 자신을 인증하기 위한 여러 방법을 소유하게되는 것이다.

<br />

이러한 비효율성을 타파하기 위해 Twitter 주도하에 인증 표준이 설립되었고, 이 것이 OAuth의 시초다. OAuth 라는 표준 프로토콜이 정의됨에 따라 각 서비스는 공통된 인터페이스로 사용자에게 인증을 요구할 수 있고, 사용자 역시 익숙하고 신뢰성있는 대형 플랫폼에 인증 정보를 입력하기 때문에 보안적인 측면은 물론, 절차 또한 간소화되는 이점을 가지게 된다.

OAuth는 1.0을 시작으로, 1.0에 세션 고정 공격이라는 보안 취약점이 발견됨에 따라 현재는 2.0을 사용하고 있다.

> <b class="orange-400">OAuth1.0의 몰락</b>  
> OAuth1.0은 <span class="blue-400">세션 고정 공격</span>이라는 보안 취약점을 가지고 있다. 이를 해결하기 위해 OAuth2.0에서는 이러한 문제들이 해결되었으며, OAuth2.0은 OAuth1.0을 완전히 대체한다.

OAuth2.0은 그 방식에 따라 4가지 방식으로 구분한다.

이를 설명하기 앞서 OAuth에서 사용하는 키워드에 대해 알아보자

|      키워드      |                             의미                             |
| :--------------: | :----------------------------------------------------------: |
|       User       |                            사용자                            |
|     Consumer     |               OAuth를 제공하는 서비스 (웹 등)                |
| Service Provider |                OAuth 서비스 제공자 (NAVER 등)                |
|   Access Token   | Consumer가 Service Provider의 자원에 접근하기 위한 인증 코드 |
|  Refresh Token   |             Access Token을 재발급하기 위한 코드              |

아마 대부분 User의 범주에 속해있을 것이다. 여기서 궁극적으로 구축할 서비스는 Consumer가 된다.

간혹 Service Provider는 인증 서버와 자원 서버로 분리해서 다루기도 한다.

NAVER, Google과 같은 플랫폼은 Service Provider가 되며, 인증 절차를 통해 Access Token과 Refresh Token을 전달받게 된다.

# OAuth Workflow

OAuth2.0은 구현 방식에 따라 4가지 방식으로 구분된다.

## 인가 코드 승인 (Authorization Code Grant)

![image](https://user-images.githubusercontent.com/50317129/137179813-de61fd8a-bbe6-4824-afdf-3652cde164bc.png)

* 사용자가 Service Provider에 직접 인증을 수행
* 인증에 성공하면 Consumer Frontend는 인가 코드를 전달받음
* Consumer는 인가 코드를 Service Provider에 전달하여 Access, Refresh Token을 반환받음
* Token 반환 이전에 인가 코드를 받는 과정이 추가되어 높은 수준의 보안을 제공함
* Consumer의 Backend에서 Token 교환이 일어나므로 중간에 이를 탈취하기 어려움
* 웹에서 사용되는 가장 보편적인 인증 형태로, 이 프로젝트 또한 인가 코드 승인 형태가 적용됨

``` input
GET /auth
Host: oauth2.example.com

response_type=code
&client_id=asj2y93bdjen3
&redirect_url=https://oauth2.example.com/callback
&state=6b773c55-b688-4a77-adaf-0bd25f4c4111
&scope=email,profile
```

|     구분      |           필수 여부            |                내용                 |
| :-----------: | :----------------------------: | :---------------------------------: |
| response_type | <span class="red-400">Y</span> |  응답 타입으로, 값은 `code`로 고정  |
|   client_id   | <span class="red-400">Y</span> | Service Provider에서 제공한 API KEY |
| redirect_url  | <span class="red-400">Y</span> |            응답 반환 URL            |
|     state     |               N                |      임의로 생성한 고유 상태값      |
|     scope     |               N                |              요청 권한              |

<br />
<br />

``` output
GET /callback
Host: oauth2.example.com

code=dfnY865gHjUbnknt57yGV
&state=6b773c55-b688-4a77-adaf-0bd25f4c4111
```

| 구분  |            내용             |
| :---: | :-------------------------: |
| code  |          인가 코드          |
| state | 요청에서 전달한 고유 상태값 |

`state`는 Consumer Backend에서 임의로 생성한 상태값으로, 통상 UUID를 하나 생성하여 사용한다.

`code`와 입력했던 `state`가 반환된다. `code`를 통해 Service Provider에 요청하여 Access Token으로 교환할 수 있다.

## 암시적 승인 (Implicit Grant)

![image](https://user-images.githubusercontent.com/50317129/137179833-fe688388-0d29-47c0-b4db-c4a42b26dccd.png)

* 인가 코드 승인과 달리, 인증 성공 시 Consumer는 Token을 직접 전달받음
* 각 플랫폼에서 제공되는 JavaScript SDK를 사용하여 구현
* 인가 코드 승인에 비해 서버가 필요하지 않아 구현이 간단함
* Token이 GET 방식으로 URL 파라미터에 담겨 전달되므로 보안에 취약하다.

``` input
GET /auth
Host: oauth2.example.com

response_type=token
&client_id=asj2y93bdjen3
&redirect_url=https://oauth2.example.com/callback
&state=97c66e11-d0e0-4c86-833c-e08bed40748d
&scope=email,profile
```

|     구분      |           필수 여부            |                 내용                 |
| :-----------: | :----------------------------: | :----------------------------------: |
| response_type | <span class="red-400">Y</span> | 응답 타입으로, 값은 `token`으로 고정 |
|   client_id   | <span class="red-400">Y</span> | Service Provider에서 제공한 API KEY  |
| redirect_url  | <span class="red-400">Y</span> |            응답 반환 URL             |
|     state     |               N                |      임의로 생성한 고유 상태값       |
|     scope     |               N                |              요청 권한               |

<br />
<br />

``` output
GET /callback
Host: oauth2.example.com

#access_token=kr40FkgksmGS92lffkGls
&token_type=Bearer
&expires_in=3600
&state=97c66e11-d0e0-4c86-833c-e08bed40748d
```

|     구분     |                  내용                  |
| :----------: | :------------------------------------: |
| access_token |               접근 토큰                |
|  token_type  | 접근 토큰의 타입으로, 통상 Bearer 사용 |
|  expires_in  |           토큰 유효기간 (초)           |
|    state     |      요청에서 전달한 고유 상태값       |

인가 코드 승인과 달리, 요청에 Access Token이 포함되어 전달된다.

> <b class="orange-400">파라미터가 왜 </b>`#`<b class="orange-400">으로 시작하지?</b>  
> `#`은 URI Fragment라는 식별자다. 해당 식별자는 URL 접근 시 서버에 전달되지 않기 때문에 보안적인 측면에서 이점을 가져가기 위한 조치다.

## 리소스 소유자 암호 자격 승인 (Resource Owner Password Credentials Grant)

![image](https://user-images.githubusercontent.com/50317129/137179866-29962644-c0a7-42f8-a397-7b3b1c361082.png)

* Service Provider에 ID, PW를 전달하여 Token을 전달받음
* 보안 구조가 비밀번호 기반의 인증 뿐이므로 이를 구현하는 Consumer는 신뢰성이 매우 높아야 함

``` input
POST /auth
Host: oauth2.example.com

grant_type=password
&client_id=asj2y93bdjen3
&username=username123
&password=password123
&scope=email,profile
```

|    구분    |           필수 여부            |                내용                 |
| :--------: | :----------------------------: | :---------------------------------: |
| grant_type | <span class="red-400">Y</span> |  승인 타입으로, `password`로 고정   |
| client_id  | <span class="red-400">Y</span> | Service Provider에서 제공한 API KEY |
|  username  | <span class="red-400">Y</span> |               아이디                |
|  password  | <span class="red-400">Y</span> |              비밀번호               |
|   scope    |               N                |              요청 권한              |

<br />
<br />

``` json
{
    "access_token": "dGkdi93ns2kdkV9dkA3",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "email,profile"
}
```

|     구분     |                  내용                  |
| :----------: | :------------------------------------: |
| access_token |               접근 토큰                |
|  token_type  | 접근 토큰의 타입으로, 통상 Bearer 사용 |
|  expires_in  |           토큰 유효기간 (초)           |
|    scope     |               요청 권한                |

## 클라이언트 자격 승인 (Client Credentials Grant)

![image](https://user-images.githubusercontent.com/50317129/137179894-94e8f974-27cd-44b1-9c36-5e1d3dc69377.png)

* 사용자가 Access Token을 외부 저장소에서 받아 인증하는 형식
* 클라이언트 자체가 인증 수단이므로 절차가 매우 간소함
* 통상 자기 자신의 정보만을 호출함

``` input
GET /auth
Host: oauth2.example.com

grant_type=client_credentials
&client_id=asj2y93bdjen3
&client_secret=https://oauth2.example.com/callback
&scope=email,profile
```

|     구분      |           필수 여부            |                      내용                       |
| :-----------: | :----------------------------: | :---------------------------------------------: |
|  grant_type   | <span class="red-400">Y</span> | 응답 타입으로, 값은 `client_credentials`로 고정 |
|   client_id   | <span class="red-400">Y</span> |       Service Provider에서 제공한 API KEY       |
| client_secret | <span class="red-400">Y</span> |   Service Provider에서 제공한 API Secret KEY    |
|     scope     |               N                |                    요청 권한                    |

<br />
<br />

``` json
{
    "access_token": "dGkdi93ns2kdkV9dkA3",
    "token_type": "Bearer",
    "expires_in": 3600,
	"scope": "email,profile"
}
```

|     구분     |                  내용                  |
| :----------: | :------------------------------------: |
| access_token |               접근 토큰                |
|  token_type  | 접근 토큰의 타입으로, 통상 Bearer 사용 |
|  expires_in  |           토큰 유효기간 (초)           |
|    scope     |               요청 권한                |

# 정리

* OAuth2.0은 인증을 위한 표준 프로토콜으로, OAuth 프로토콜을 준수하는 서비스는 기본적으로 공통된 API를 사용해서 인증을 수행할 수 있다.
* OAuth 프로토콜을 통해 인증 절차는 간소화하고, 보안 수준은 강화할 수 있다.
* OAuth의 방식은 4가지로 구분되며, 보편적으로 인가 코드 승인 방식을 사용한다.
* 암시적 승인은 Serverless 서비스나 앱에서 주로 사용된다.
* 나머지 방식은 특수한 환경에서 사용된다.

다음 장에서는 구축할 시스템의 구성에 대해 다룬다.

# 참고

* [IT위키 - OAuth](https://itwiki.kr/w/OAuth)
* [Microsoft OAuth](https://docs.microsoft.com/ko-kr/azure/active-directory/develop/active-directory-v2-protocols)
* [RFC6749](https://datatracker.ietf.org/doc/html/rfc6749)