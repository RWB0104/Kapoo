---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 10. 컨트롤러 구현하기"
excerpt: "Jersey 라이브러리를 통해 요청을 받아 응답을 반환하는 컨트롤러를 구성해보자. Jersey에 대해 자세히 알아보고 싶다면 이전 글을 참고하자."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-25T02:24:17"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "Jersey" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

Jersey 라이브러리를 통해 요청을 받아 응답을 반환하는 컨트롤러를 구성해보자.

Jersey에 대해 자세히 알아보고 싶다면 [이전 글](/2021/10/25/oauth2-java-server-9)을 참고하자.










# 컨트롤러 기본 설정하기

컨트롤러 구현에 앞서 몇 가지 설정을 수행한다.

* Jersey 요청용 URL 지정
* CORS 설정

항목은 위와 같다.





## Jersey 요청용 URL 지정

이전 글에서도 다룬 내용이다. Jersey를 적용했다고 모든 요청을 Jersey가 받는 건 아니고, 직접 <span class="blue-400">Jersey가 요청을 위임받도록 지정</span>해야한다.

임의의 패키지에 클래스를 하나 생성한다. 이름은 상관없다. 이 프로젝트에선 `main.java.global.module` 패키지에 `App.java`로 생성했다.

``` java
package global.module;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

/**
 * 애플리케이션 클래스
 *
 * @author RWB
 * @since 2021.09.29 Wed 22:40:20
 */
@ApplicationPath("/api")
public class App extends Application
{
    // api 접두사 요청을 jersey가 담당
}
```

위와 같이 클래스에 추상 클래스 `Application`을 상속하고 `@ApplicationPath`를 통해 원하는 URL의 접두어를 지정한다.

`/api`로 지정했으므로, `{BASE_URL}/api`로 시작하는 모든 요청은 Jersey가 담당할 것이다. 이 패턴에 해당하지 않는 모든 요청은 정상적으로 Servlet이 담당한다.

현재 시연용 프로젝트의 API 서버는 `https://api.itcode.dev/oauth2`이므로, `https://api.itcode.dev/oauth2/api`로 시작하는 모든 요청은 Jersey가 받는다.

URL 설정은 위 코드 하나면 끝난다.





## CORS 설정

시연용 프로젝트의 각 주소는 아래와 같다.

* Frontend - `https://project.itcode.dev/oauth2`
* Backend - `https://api.itcode.dev/oauth2`

보다시피, 요청자/응답자 간의 도메인이 달라서, 그냥 보냈다간 십중팔구 CORS의 늪에 빠지게 된다.

이를 해결하기 위해 <span class="blue-400">서버에 CORS 설정을 지정하여 원하는 도메인에 요청을 보낼 수 있도록 설정</span>한다.

<br />

마찬가지로 임의의 패키지에 클래스를 하나 생성한다. 이름은 상관없다. 이 프로젝트에선 `main.java.global.module` 패키지에 `CorsFilter.java`로 생성했다.


``` java
package global.module;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

/**
 * CORS 필터 클래스
 *
 * @author RWB
 * @since 2021.10.02 Sat 15:42:04
 */
@Provider
public class CorsFilter implements ContainerResponseFilter
{
	/**
	 * 필터 메서드
	 *
	 * @param requestContext: [ContainerRequestContext] ContainerRequestContext 객체
	 * @param responseContext: [ContainerResponseContext] ContainerResponseContext 객체
	 */
	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
	{
		String origin = requestContext.getHeaderString("origin");
		
		// origin이 유효하고, itcode.dev 계열의 URL일 경우
		if (origin != null && origin.contains("itcode.dev"))
		{
			responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
			responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
			responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
			responseContext.getHeaders().add("Access-Control-Allow-Headers", "Content-Type");
		}
	}
}
```

인터페이스 `ContainerResponseFilter`을 상속하고 `filter` 메소드를 오버라이딩한다. 이 설정은 Jersey가 수행하는 모든 작업에 전역으로 동작한다.

`Origin` 헤더를 검증하여 `Origin`이 `itcode.dev` 도메인을 가질 경우 CORS 설정을 통해 응답을 허용한다.

* `Access-Control-Allow-Origin` - 요청에 사용할 수 있는 도메인
* `Access-Control-Allow-Credentials` - 자격증명이 포함된 요청 허용 여부
* `Access-Control-Allow-Methods` - 요청에 사용할 수 있는 HTTP 메소드
* `Access-Control-Allow-Headers` - 요청에 사용할 수 있는 헤더

로그인, 로그아웃 작업 등에 쿠키를 생성하는 `Set-Cookie` 헤더가 포함되어있는데, 이렇게 서로 다른 도메인에서 쿠키를 사용해야할 경우, 서버에서 `Access-Control-Allow-Credentials`를 `true`로 지정해야하고, 마찬가지로 웹은 요청 시 `credentials`을 `true`로 지정하여 요청해야한다.

> <b class="teal-500">자격 증명 요청은 도메인을 명시해야해!</b>  
> `Access-Control-Allow-Origin` 헤더는 와일트카드 `*`을 지원한다. 헤더를 `*`로 지정할 경우, 모든 도메인에 상관없이 응답을 허용한다. 하지만 `Access-Control-Allow-Credentials`을 `true`로 지정했을 경우, 보안 정책으로 인해 반드시 도메인을 명시해야만 한다.










# controller 구현하기

구현해야할 controller는 총 7개다.

* **LoginAPI** (/api/login)
  * 인증 URL API
  * 정보 제공 동의 갱신 URL API
  * 로그인 API
  * 자동 로그인 API
* **LogoutAPI** (/api/logout)
  * 로그아웃 API
* **RevokeAPI** (/api/revoke)
  * 연동 해제 API
* **UserInfoAPI** (/api/userinfo)
  * 사용자 정보 API

API 역시 공통 로직을 관리하기위해 추상 클래스를 구현하여 모든 컨트롤러가 상속받도록 구성한다.





## 추상 클래스 API 구현하기

모든 컨트롤러가 상속받을 추상 클래스 `API`를 구현한다.

``` java
package global.module;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.UriInfo;

/**
 * API 추상 클래스
 *
 * @author RWB
 * @since 2021.09.29 Wed 22:34:27
 */
abstract public class API
{
	@Context
	protected HttpServletRequest request;
	
	@Context
	protected HttpServletResponse response;
	
	@Context
	protected UriInfo uriInfo;
}
```

프로젝트 특성 상 API가 사용해야할 공통로직은 따로 없으며, Servlet 객체에 효율적으로 접근하기 위해 `@Context` 애노테이션으로 Servlet 객체들을 선언한다.

이를 상속받는 모든 컨트롤러는 Servle 객체에 마음껏 접근할 수 있을 것이다.





## LoginAPI 구현하기

LoginAPI가 담당하는 API는 아래와 같다.

* **LoginAPI** (/api/login)
  * 인증 URL API
  * 정보 제공 동의 갱신 URL API
  * 로그인 API
  * 자동 로그인 API

총 4개의 메서드가 선언되어야한다.

``` java
@Path("/login")
public class LoginAPI extends API
{
	// /api/login
}
```

컨트롤러 객체는 위와 같이 구현된다.



### 플랫폼 인증 URL API

플랫폼 로그인을 수행하기 위한 <span class="blue-400">플랫폼별 인증 URL을 반환</span>하는 API.

플랫폼별로 인증 객체가 다르므로, 플랫폼을 구별할 필요가 있다.

`@PathParam`을 통해 플랫폼을 구분한다.

``` java
@GET
@Path("/{platform}")
public Response authorizationUrlResponse(@PathParam("platform") String platform)
{
	return new AccountGetProcess(request, response).getAuthorizationUrlResponse(platform);
}
```

`GET /api/login/{platform}` 요청은 `authorizationUrlResponse`가 담당할 것이다.

`@PathParam`인 platform이 인수로 할당된다.



#### 요청

``` txt
GET https://api.itcode.dev/oauth2/api/login/{platform}
```

|   구분   | 파라미터 형태 | 데이터 형식 |    내용     |
| :------: | :-----------: | :---------: | :---------: |
| platform |     Path      |  `String`   | 플랫폼 이름 |

플랫폼 이름은 플랫폼의 소문자 표기와 동일하다.

| 플랫폼 |   값   | URL                     |
| :----: | :----: | :---------------------- |
| NAVER  | naver  | GET `/api/login/naver`  |
| Google | google | GET `/api/login/google` |
| KAKAO  | kakao  | GET `/api/login/kakao`  |
| GitHub | github | GET `/api/login/github` |



#### 응답

``` json
{
    "flag": true,
    "title": "success",
    "message": "naver authrorization url response success",
    "body": "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=czCaqAOB1aAjNRk6N_Oq&redirect_uri=https%3A%2F%2Fproject.itcode.dev%2Foauth2%2Fcallback%3Fplatform%3Dnaver&state=24ca41d9-f432-4e0d-9b48-e5fd4ba49e6e"
}
```

| 파라미터 | 데이터 형식 |      내용       |
| :------: | :---------: | :-------------: |
|   flag   |  `boolean`  | 응답 정상 여부  |
|  title   |  `String`   |    응답 제목    |
| message  |  `String`   |   응답 메세지   |
|   body   |  `String`   | 플랫폼 인증 URL |

위 요청은 `https://api.itcode.dev/oauth2/api/login/naver` 응답의 예시다.



### 정보 제공 동의 갱신 URL API

<span class="blue-400">정보 제공 동의 갱신을 위한 URL을 반환</span>하는 API.

``` java
@PUT
@Path("/put")
public Response putAuthorizationUrlResponse(@CookieParam("access") String accessCookie)
{
	return new AccountPutProcess(request, response).putUpdateAuthorizationUrl(accessCookie);
}
```

`PUT /api/login/{platform}` 요청은 `putAuthorizationUrlResponse`가 담당할 것이다.

access란 이름을 가진 쿠키가 인수로 할당된다.



#### 요청

``` txt
PUT https://api.itcode.dev/oauth2/api/login/put
Cookie: access={:access};
```

| parameter |  type  |   data   | required | description |
| :-------: | :----: | :------: | :------: | :---------: |
| {:access} | Cookie | `String` |    Y     |  인증 쿠키  |



#### 응답

``` json
{
	"flag": true,
	"title": "success",
	"message": "naver reauthrorization url response success",
	"body": "https://nid.naver.com/oauth2.0/authorize?auth_type=reprompt&state=08199e0e-ef61-444a-8d4f-f3c048b771f0&response_type=code&client_id=czCaqAOB1aAjNRk6N_Oq&redirect_uri=https%3A%2F%2Fproject.itcode.dev%2Foauth2%2Fcallback%3Fplatform%3Dnaver"
}
```

위 응답은 `https://api.itcode.dev/oauth2/api/login/put`의 예시다.

access 쿠키의 인증정보 내부에 플랫폼이 이미 포함되어 있으므로, 별도로 플랫폼을 구분할 필요가 없다.

| parameter |   data    |         description         |
| :-------: | :-------: | :-------------------------: |
|   flag    | `boolean` |          동작 결과          |
|   title   | `String`  |            제목             |
|  message  | `String`  |            내용             |
|   body    | `String`  | 정보 제공 동의 갱신 URL URL |



### 로그인 API

<span class="blue-400">로그인을 수행</span>하는 API.

플랫폼을 구분한다.

``` java
@POST
@Path("/{platform}")
public Response loginResponse(@PathParam("platform") String platform, LoginResponseBean loginResponseBean)
{
	return new AccountPostProcess(request, response).postLoginResponse(platform, loginResponseBean.getCode(), loginResponseBean.getState());
}
```

`POST /api/login/{platform}` 요청은 `loginResponse`가 담당할 것이다.



#### 요청

``` txt
POST https://api.itcode.dev/oauth2/api/login/{:platform}

{
    "code": {:code},
    "state": {:state}
}
```

|  parameter  | type  |   data   | required |     description      |
| :---------: | :---: | :------: | :------: | :------------------: |
| {:platform} | path  | `String` |    Y     | 플랫폼 (소문자 표기) |
|   {:code}   | body  | `String` |    Y     |      접근 코드       |
|  {:state}   | body  | `String` |    Y     |     고유 상태값      |

플랫폼 이름은 플랫폼의 소문자 표기와 동일하다.

| 플랫폼 |   값   | URL                      |
| :----: | :----: | :----------------------- |
| NAVER  | naver  | POST `/api/login/naver`  |
| Google | google | POST `/api/login/google` |
| KAKAO  | kakao  | POST `/api/login/kakao`  |
| GitHub | github | POST `/api/login/github` |



#### 응답

``` txt
Set-Cookie: access={access}
Set-Cookie: refresh={refresh}

{
    "flag": true,
    "title": "success",
    "message": "authorized success",
    "body": null
}
```

| 파라미터 | 데이터 형식 |      내용      |
| :------: | :---------: | :------------: |
|   flag   |  `boolean`  | 응답 정상 여부 |
|  title   |  `String`   |   응답 제목    |
| message  |  `String`   |  응답 메세지   |
|   body   |   `null`    |      null      |

`Set-Cookie` 헤더를 통해 자동으로 인증 정보가 담긴 토큰을 추가한다.



### 자동 로그인 API

기존에 남아있던 인증정보를 활용하여 <span class="blue-400">상호작용 없이 로그인을 자동으로 수행</span>하는 API.

``` java
@POST
@Path("/auto")
public Response autoLoginResponse(@CookieParam("access") String accessCookie, @CookieParam("refresh") String refreshCookie)
{
	return new AccountPostProcess(request, response).postAutoLoginResponse(accessCookie, refreshCookie);
}
```

access 쿠키와 refresh 쿠키를 검증하여 이상이 없을 경우 쿠키 정보 확인 혹은 Access Token 재발급을 통해 로그인을 자동으로 수행한다.

이미 쿠키 내부에 플랫폼 정보가 포함되어 있으므로, 플랫폼 구분은 필요 없다.

`POST /api/login/auto` 요청은 `autoLoginResponse`가 담당할 것이다.

#### 요청

``` txt
POST https://api.itcode.dev/oauth2/api/login/auto
Cookie: access={:access}; refresh={:refresh};
```

| parameter  |  type  |   data   | required |  description  |
| :--------: | :----: | :------: | :------: | :-----------: |
| {:access}  | Cookie | `String` |    N     |   인증 쿠키   |
| {:refresh} | Cookie | `String` |    Y     | 리프레쉬 쿠키 |

#### 응답

``` json
{
	"flag": true,
	"title": "success",
	"message": "auto authorized success",
	"body": null
}
```

``` txt
# Header
Set-Cookie: access={access JWT}
Set-Cookie: refresh={refresh JWT}
```

refresh 쿠키만을 보유하고 있어서 Access Token을 갱신한 경우에만 `Set-Cookie`가 포함된다.

| parameter |   data    | description |
| :-------: | :-------: | :---------: |
|   flag    | `boolean` |  동작 결과  |
|   title   | `String`  |    제목     |
|  message  | `String`  |    내용     |
|   body    |  `null`   |   `null`    |

`Set-Cookie` 헤더를 통해 자동으로 인증 정보가 담긴 토큰을 추가한다.

만약 아직 access 쿠키가 살아있다면, 별도의 쿠키를 생성하지 않아도 되므로 `Set-Cookie` 헤더는 전송되지 않는다.



### 전체 코드

``` java
package oauth.account.controller;

import global.module.API;
import jakarta.ws.rs.CookieParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import oauth.account.bean.LoginResponseBean;
import oauth.account.process.AccountGetProcess;
import oauth.account.process.AccountPostProcess;
import oauth.account.process.AccountPutProcess;

/**
 * 로그인 API 클래스
 *
 * @author RWB
 * @since 2021.09.30 Thu 20:44:43
 */
@Path("/login")
public class LoginAPI extends API
{
	/**
	 * 인증 URL 응답 메서드
	 *
	 * @param platform: [String] 플랫폼
	 *
	 * @return [Response] 응답 객체
	 */
	@GET
	@Path("/{platform}")
	public Response authorizationUrlResponse(@PathParam("platform") String platform)
	{
		return new AccountGetProcess(request, response).getAuthorizationUrlResponse(platform);
	}
	
	/**
	 * 정보 제공 동의 갱신 URL 응답 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	@PUT
	@Path("/put")
	public Response putAuthorizationUrlResponse(@CookieParam("access") String accessCookie)
	{
		return new AccountPutProcess(request, response).putUpdateAuthorizationUrl(accessCookie);
	}
	
	/**
	 * 로그인 응답 메서드
	 *
	 * @param platform: [String] 플랫폼
	 * @param loginResponseBean: [LoginResponseBean] LoginResponseBean 객체
	 *
	 * @return [Response] 응답 객체
	 */
	@POST
	@Path("/{platform}")
	public Response loginResponse(@PathParam("platform") String platform, LoginResponseBean loginResponseBean)
	{
		return new AccountPostProcess(request, response).postLoginResponse(platform, loginResponseBean.getCode(), loginResponseBean.getState());
	}
	
	/**
	 * 자동 로그인 응답 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 * @param refreshCookie: [String] 리프레쉬 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	@POST
	@Path("/auto")
	public Response autoLoginResponse(@CookieParam("access") String accessCookie, @CookieParam("refresh") String refreshCookie)
	{
		return new AccountPostProcess(request, response).postAutoLoginResponse(accessCookie, refreshCookie);
	}
}
```





## LogoutAPI 구현하기

LogoutAPI가 담당하는 API는 아래와 같다.

* **LogoutAPI** (/api/logout)
  * 로그아웃 API

총 하나의 메서드가 선언되어야 한다.

``` java
@Path("/logout")
public class LogoutAPI extends API
{
	// /api/logout
}
```

컨트롤러 객체는 위와 같이 구현된다.



### 로그아웃 API

<span class="blue-400">로그아웃을 수행</span>하는 API.

쿠키에 저장된 인증 정보를 삭제한다.

``` java
@POST
@Path("")
public Response logoutResponse()
{
	return new AccountPostProcess(request, response).postLogoutResponse();
}
```

`POST /api/login/auto` 요청은 `autoLoginResponse`가 담당할 것이다.

별도의 인수가 없는데, access, refresh 쿠키 둘 다 삭제할 예정이므로, 해당 쿠키의 존재 유무는 신경쓰지 않는다.



#### 요청

``` txt
POST https://api.itcode.dev/oauth2/api/logout
```


#### 응답

``` json
{
	"flag": true,
	"title": "success",
	"message": "logout success",
	"body": null
}
```

``` txt
# Header
Set-Cookie: access={access JWT}
Set-Cookie: refresh={refresh JWT}
```

| parameter |   data    | description |
| :-------: | :-------: | :---------: |
|   flag    | `boolean` |  동작 결과  |
|   title   | `String`  |    제목     |
|  message  | `String`  |    내용     |
|   body    |  `null`   |   `null`    |

`Max-Age` 0인 쿠키로 만들어 `Set-Cookie`로 덮어씌워 삭제한다.



### 전체 코드

``` java
package oauth.account.controller;

import global.module.API;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import oauth.account.process.AccountPostProcess;

/**
 * 로그아웃 API 클래스
 *
 * @author RWB
 * @since 2021.10.04 Mon 21:19:00
 */
@Path("/logout")
public class LogoutAPI extends API
{
	/**
	 * 로그아웃 응답 메서드
	 *
	 * @return [Response] 응답 객체
	 */
	@POST
	@Path("")
	public Response logoutResponse()
	{
		return new AccountPostProcess(request, response).postLogoutResponse();
	}
}
```





## RevokeAPI 구현하기

RevokeAPI가 담당하는 API는 아래와 같다.

* **RevokeAPI** (/api/revoke)
  * 연동 해제 API

총 하나의 메서드가 선언되어야 한다.

``` java
@Path("/revoke")
public class RevokeAPI extends API
{
	// /api/revoke
}
```

컨트롤러 객체는 위와 같이 구분된다.



### 연동 해제 API

<span class="blue-400">플랫폼과의 연동을 완전히 해제</span>하는 API.

``` java
@DELETE
@Path("")
public Response deleteInfoResponse(@CookieParam("access") String accessCookie)
{
	return new AccountDeleteProcess(request, response).deleteInfoResponse(accessCookie);
}
```

`DELETE /api/revoke` 요청은 `deleteInfoResponse`가 담당할 것이다.



#### 요청

``` txt
DELETE https://api.itcode.dev/oauth2/api/revoke
Cookie: access={:access};
```

| parameter |  type  |   data   | required | description |
| :-------: | :----: | :------: | :------: | :---------: |
| {:access} | Cookie | `String` |    Y     |  인증 쿠키  |



#### 응답

``` json
{
	"flag": true,
	"title": "success",
	"message": "logout success",
	"body": null
}
```

``` txt
# Header
Set-Cookie: access={access JWT}
Set-Cookie: refresh={refresh JWT}
```

| parameter |   data    | description |
| :-------: | :-------: | :---------: |
|   flag    | `boolean` |  동작 결과  |
|   title   | `String`  |    제목     |
|  message  | `String`  |    내용     |
|   body    |  `null`   |   `null`    |



### 전체 코드

``` java
package oauth.account.controller;

import global.module.API;
import jakarta.ws.rs.CookieParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import oauth.account.process.AccountDeleteProcess;

/**
 * 연동 해제 API 클래스
 *
 * @author RWB
 * @since 2021.10.18 Mon 01:19:30
 */
@Path("/revoke")
public class RevokeAPI extends API
{
	/**
	 * 연동 해제 URL 응답 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	@DELETE
	@Path("")
	public Response deleteInfoResponse(@CookieParam("access") String accessCookie)
	{
		return new AccountDeleteProcess(request, response).deleteInfoResponse(accessCookie);
	}
}
```





## UserInfoAPI 구현하기

UserInfoAPI가 담당하는 API는 아래와 같다.

* **UserInfoAPI** (/api/userinfo)
  * 사용자 정보 API

총 하나의 메서드가 선언되어야 한다.

``` java
@Path("/userinfo")
public class UserInfoAPI extends API
{
	// /api/userinfo
}
```

컨트롤러 객체는 위와 같이 구현된다.



### 사용자 정보 API

Access Token을 토대로 <span class="blue-400">사용자 정보를 반환</span>하는 API.

``` java
@GET
@Path("")
public Response userInfoResponse(@CookieParam("access") String accessCookie)
{
	return new AccountGetProcess(request, response).getUserInfoResponse(accessCookie);
}
```

`GET /api/userinfo` 요청은 `userInfoResponse`가 담당할 것이다.

플랫폼에서 응답한 내용을 그대로 반환하지는 않고, 플랫폼별 응답 스키마에 따라 적절히 가공하여 정형화된 응답을 제공한다.



#### 요청

``` txt
GET https://api.itcode.dev/oauth2/api/userinfo
Cookie: access={:access};
```

| parameter |  type  |   data   | required | description |
| :-------: | :----: | :------: | :------: | :---------: |
| {:access} | Cookie | `String` |    Y     |  인증 쿠키  |



#### 응답

``` json
{
	"flag": true,
	"title": "success",
	"message": "user info response success",
	"body": {
		"email": "example@gmail.com",
		"name": "name",
		"profile": "https://phinf.pstatic.net/contact/PROFILE.png",
		"platform": "naver"
	}
}
```

위 응답은 네이버 사용자 정보 응답의 예시다.

| parameter |   data    |   description    |
| :-------: | :-------: | :--------------: |
|   flag    | `boolean` |    동작 결과     |
|   title   | `String`  |       제목       |
|  message  | `String`  |       내용       |
|   body    | `Object`  | 사용자 정보 JSON |
|   email   | `String`  |      이메일      |
|   name    | `String`  |       이름       |
|  profile  | `String`  | 프로필 사진 URL  |
| platform  | `String`  |      플랫폼      |



### 전체 코드

``` java
package oauth.account.controller;

import global.module.API;
import jakarta.ws.rs.CookieParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import oauth.account.process.AccountGetProcess;

/**
 * 사용자 정보 API 클래스
 *
 * @author RWB
 * @since 2021.10.02 Sat 00:29:46
 */
@Path("/userinfo")
public class UserInfoAPI extends API
{
	/**
	 * 사용자 정보 응답 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	@GET
	@Path("")
	public Response userInfoResponse(@CookieParam("access") String accessCookie)
	{
		return new AccountGetProcess(request, response).getUserInfoResponse(accessCookie);
	}
}
```










# 정리

이 장을 끝으로 인증 서버의 주요 요소인 controller - process - module의 모든 구현을 완료했다.

인증 서버의 구현이 완료되었으므로, 다음 장에선 프로젝트 마무리를 위한 심사 과정에 대해 다룬다.
