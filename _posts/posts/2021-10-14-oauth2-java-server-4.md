---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 3. Jersey로 RESTful API 서버 구축하기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-14T22:12:25"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "Jersey" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: false
---

# 개요

이 장에서는 Jersey를 활용하여 RESTful API 서버를 구축한다.

통상 JAVA 서버를 구축하는데 Spring 프레임워크를 많이 사용할 것이다. 그럼에도 굳이 Jersey를 선택하는 이유는 일단 내가 Spring을 잘 모른다. 그것도 그거지만, Spring에 비해 규모가 작고 설정이 간단해서 온전히 RESTful 서버를 구축하는데 집중할 수 있다. Spring 설정의 악랄함은 고사하고, 이 프로젝트의 특성 상 복잡한 로직이나 다채로운 기능을 요구하지 않는다. Spring의 방대한 규모를 온전히 쓰지 못 하므로 배 보다 배꼽이 더 크다는 뜻이다.

제원은 이전에도 설명했듯이, `JAVA v16.0.2`를 기반으로 작성했다. 꼭 16버전일 필요는 없다. 그냥 내가 최신을 좋아해서 그런거니, 적당히 한 11 정도면 그냥저냥 사용할 수 있을 것이다.

빌드 툴은 `Gradle`을 사용한다. `Maven`의 pom.xml 보다 훨씬 간단해서 좋아한다. Gradle이 Maven의 후속이라 그런지 성능 상으로도 뭐 여러가지 이점이 있다고는 하는데... 둘 다 써본 입장에선 크게 체감되진 않았다.

`Tomcat`은 반드시 10 이상으로 수행할 것. 이전 장에서도 누누히 얘기했지만, `Jersey 3.x`는 Servlet 5.0인 `jakarta.*`만을 사용한다. Servlet 4.x 밑으로는 지원을 안 하므로, 아무리 스펙 상 올바른 요청을 전송해도 404만 죽어라 뜬다. Tomcat은 이를 버전 10부터 제공하니 주의하자. 내가 이 문제 때문에 거진 수 시간을 날렸다.

> <b class="orange-400">Servlet 5.0?</b>  
> Servlet 5.0부터는 `jakarta.*`이라는 패키지를 사용한다. 우리가 지금까지 사용했던 Servlet 4.x 이하는 `javax.*` 패키지를 사용한다. 패키지가 달라지는 것 외에 사용 방법은 완전히 동일하다. `javax.*`을 `jakarta.*`로 변경하기만 해도 마이그레이션이 완료된다.

# Jersey 3 설정하기

프로젝트에 Jersey 3을 설정해보자.

## 의존성 모듈 설치

`Gradle`을 기준으로 설명한다. `build.gradle`의 dependencies에 아래와 같이 지정한다.

``` txt
dependencies {
	// https://mvnrepository.com/artifact/jakarta.servlet/jakarta.servlet-api
	compileOnly group: 'jakarta.servlet', name: 'jakarta.servlet-api', version: '5.0.0'
	
	// https://mvnrepository.com/artifact/org.glassfish.jersey.core/jersey-server
	implementation group: 'org.glassfish.jersey.core', name: 'jersey-server', version: '3.0.3'
	
	// https://mvnrepository.com/artifact/org.glassfish.jersey.containers/jersey-container-servlet
	implementation group: 'org.glassfish.jersey.containers', name: 'jersey-container-servlet', version: '3.0.3'
	
	// https://mvnrepository.com/artifact/org.glassfish.jersey.inject/jersey-hk2
	implementation group: 'org.glassfish.jersey.inject', name: 'jersey-hk2', version: '3.0.3'
	
	// https://mvnrepository.com/artifact/org.glassfish.jersey.media/jersey-media-json-jackson
	implementation group: 'org.glassfish.jersey.media', name: 'jersey-media-json-jackson', version: '3.0.3'

    // 다른 라이브러리들...
}
```

* `jakarta.servlet-api` - Servlet 5.0
* `jersey-server` - Jersey 서버 코어 구현체
* `jersey-container-servlet` - Jersey의 Servlet 구현체
* `jersey-hk2` - HK2 InjectionManager 구현체
* `jersey-media-json-jackson` - Jersey의 응답 객체에 JSON 제공자를 Jackson과 연동하는 모듈

각 라이브러리의 의미는 위와 같다. 이 중 `jersey-media-json-jackson`은 플러그인으로, JSON 형태로 응답하기 위해선 반드시 이 제공자 플러그인이 필요하다. 그 밖에도 여러 유용한 플러그인이 있지만, 이 프로젝트에선 위 4개 정도만 있으면 Jersey를 사용할 수 있다.

## Jersey 요청 URL 지정하기

Jersey의 요청 URL을 지정한다. 무슨 뜻이냐면, Jersey가 담당할 최상위 URL을 지정한다는 의미다.

예를 들어, `/api`로 지정했다면 `https://example.com/api`로 시작하는 요청은 일반적인 Servlet이 아닌 Jersey가 위임받게 된다.

전통적인 방식으로 `web.xml`에 지정하는 방법이 있지만, 다소 번거로운데다가 권장하지도 않는다. 우리는 서버 단계에서 이를 구현할 것이다.

``` java
@ApplicationPath("/api")
public class App extends Application
{
    // api 접두사 요청을 jersey가 담당
}
```

위와 같이 지정하면 된다. 클래스 하나 생성해서 `Application` 상속시키면 된다. 이후 `@ApplicationPath`에 원하는 경로 접두어를 지정하면 된다.

위 설정은 `/api`로 시작하는 경로를 Jersey에게 위임한다.

## RESTful API 설정하기

위 설정 정도만 하면 Jersey를 사용할 준비가 끝났다. 이제 RESTful API를 설계하여 응답을 받아보자.

임의의 클래스 하나를 생성하고 아래와 같이 지정하자. 클래스 이름은 임의로 지정해도 무관하다.

``` java
@Path("/userinfo")
public class TestAPI
{
	// /api/userinfo API
}
```

`@Path`에 원하는 경로를 지정하다. 위 클래스는 `/api/userinfo` 요청을 위임받아 수행하는 API 클래스가 된다.

``` java
@Path("/userinfo")
public class TestAPI
{
    @GET
    @Path("")
	public String testResponse()
    {
        return "It's Worked!";
    }
}
```

위 처럼 메소드를 하나 생성해보자. `testResponse` 메소드에 의해 `/api/userinfo` GET 요청은 It's Worked!를 반환하여 브라우저에 출력할 것이다. `@GET` 이외에도 `@POST`, `@PUT` 등 다양한 HTTP 메서드를 지원하니, 원하는대로 설정하면 된다.

`@Path`는 마찬가지로 요청을 받을 URL을 지정한다. 이 때 상위의 `@Path`를 순서대로 URL 접두어에 붙이니 유의할 것. 이 패턴으로 다양한 RESTful API를 생성할 수 있다.

``` java
@Path("/userinfo")
public class TestAPI
{
    @GET
    @Path("")
	public String testResponse()
    {
        return "It's Worked!";
    }

    @GET
    @Path("/{id}")
	public String userinfoResponse(@PathParam("id") String id)
    {
        return "{ key1: \"value1\", key2: \"value2\", id: \"" + id + "\" }";
    }

    @POST
    @Path("/{hash}")
	public String useraddResponse(@PathParam("hash") String hash, @FormParam("key") String key)
    {
        return hash + key;
    }

    @GET
    @Path("/check")
	public boolean usercheckResponse(@QueryParam("id") String id, @QueryParam("key") String key)
    {
        return true;
    }

    @DELETE
    @Path("/remove")
	public int userremoveResponse(@CookieParam("auth") String auth)
    {
        return 1;
    }
}
```

위 처럼 다채롭게 RESTful API를 설계해보자. 다양한 반환값을 줄 수 있다.

|  애노테이션  |                             내용                             |
| :----------: | :----------------------------------------------------------: |
|  @PathParam  | 지정한 URL의 값이 할당됨. `@Path`에서 `/{key}`와 같이 입력함 |
| @QueryParam  |            지정한 키를 가진 URL 파라미터가 할당됨            |
|  @FormParam  |               지정한 Body의 파라미터가 할당됨                |
| @CookieParam |               지정한 키를 가진 Cookie가 할당됨               |
| @HeaderParam |               지정한 키를 가진 Header가 할당됨               |

위 애노테이션을 사용해서 원하는 요소를 쉽게 인수로 받아올 수 있다.

|       메서드       |  HTTP  | 대상 URL                                |
| :----------------: | :----: | :-------------------------------------- |
|    testResponse    |  GET   | `/api/userinfo`                         |
|  userinfoResponse  |  GET   | `/api/userinfo/{id}`                    |
|  useraddResponse   |  POST  | `/api/userinfo/{hash}`                  |
| usercheckResponse  |  GET   | `/api/userinfo/check?id={id}&key={key}` |
| userremoveResponse | DELETE | `/api/userinfo/remove`                  |

각 메서드에 매칭되는 URL은 위 표와 같다.

그 밖에도 `@Producer`로 응답 타입이나 응답의 Header 등을 강제하는 기능도 있지만, 이 프로젝트에선 크게 중요하지 않으므로 넘어간다.

자세한 내용은 [Jersey 3 공식 문서](https://eclipse-ee4j.github.io/jersey.github.io/documentation/latest3x/index.html)를 참고하자.

## Jersey Context 지정하기

근데 쓰다보면 좀 이상하다. 우리가 Servlet에서 지겹게 사용하던 `HttpServletRequest`, `HttpServletResponse`는 어디로 갔을까?

Jersey가 Servlet를 대신하여 요청을 위임받고 있다보니, Servlet 객체가 표면적으로 드러나지 않는다. 이 경우 `@Context` 애노테이션을 통해 Servlet 객체들에게 접근할 수 있다.

### 상속으로 구현하기

필자는 각 추상 객체 하나를 만들어 필요한 Context를 몰아넣고, 모든 controller API에 상속하는 방식으로 구성하고 있다.

``` java
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

위와 같이 API라는 추상 객체 하나를 선언한다. 이후 `HttpServletRequest`, `HttpServletResponse`를 `@Context` 애노테이션을 붙여 지정한다. `UriInfo`는 나도 크게 써본적은 없어서, 굳이 없어도 무방하다.

그 밖에 공통 API 객체에 넣고 싶은 메서드가 있다면 같이 포함해도 무방하다.

``` java
@Path("/userinfo")
public class TestAPI extends API
{
    @GET
    @Path("")
	public String testResponse()
    {
        return request.getContextPath();
    }
}
```

`TestAPI` 객체에 `API` 추상 객체를 상속시킨다. `protected`로 선언되어 있으므로, `API`를 상속받는 모든 객체에서 `HttpServletRequest`를 비롯한 다른 Context에 접근할 수 있게 된다.

### 그냥 구현하기

어떠한 이유로든 상속으로 구현하기 싫다면, 아래와 같이 통짜로 그냥 집어넣으면 된다.

``` java
@Path("/userinfo")
public class TestAPI
{
    @Context
	protected HttpServletRequest request;
	
	@Context
	protected HttpServletResponse response;
	
	@Context
	protected UriInfo uriInfo;

    @GET
    @Path("")
	public String testResponse()
    {
        return request.getContextPath();
    }
}
```

이렇게 해도 무방하다. 단, 각 controller API 마다 동일한 코드를 넣어줘야함은 잊지 말자.

# controller 구현하기

구현해야할 controller는 총 5개다.

* **LoginAPI** (/login)
  * 플랫폼 인증 URL API
  * 로그인 API
  * 자동 로그인 API
* **LogoutAPI** (/logout)
  * 로그아웃 API
* **UserInfoAPI** (/userinfo)
  * 사용자 정보 API

## LoginAPI 구현하기

LoginAPI가 담당하는 API는 3개다. 즉, 3개의 메서드가 생성되어야한다.

``` java
@Path("/login")
public class LoginAPI extends API
{
	// /api/login
}
```

controller 객체는 위와 같이 구현하면 된다.

### 플랫폼 인증 URL API

플랫폼별로 인증 객체가 다르므로, 플랫폼을 구별할 필요가 있다.

`@PathParam`을 통해 플랫폼을 구분한다.

``` java
@GET
@Path("/{platform}")
public Response authorizationUrlResponse(@PathParam("platform") String platform)
{
    return null;
}
```

GET `/api/login/{platform}` 요청은 `authorizationUrlResponse()`가 담당할 것이다.

`@PathParam`인 platform이 인수로 할당된다.

#### 요청

``` txt
GET https://api.itcode.dev/api/login/{platform}
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

위 요청은 NAVER 플랫폼으로 지정한 응답의 예시다.

### 로그인 API

마찬가지로 인증 토큰을 발급받기 위해 플랫폼을 구별한다.

``` java
@POST
@Path("/{platform}")
public Response loginResponse(@PathParam("platform") String platform, LoginResponseBean loginResponseBean)
{
    return null;
}
```

플랫폼 로그인 후 반환되는 `code`, `state`를 통해 접근 토큰으로 교환하는 API다.

`LoginResponseBean` 객체는 POST body에 담겨오는 JSON 객체를 매핑하기 위한 객체로, `code`, `state`의 Getter, Setter로 구성된다.

POST `/api/login/{platform}` 요청은 `loginResponse()`가 담당할 것이다.

#### 요청

``` txt
POST https://api.itcode.dev/api/login/{platform}

{
    "code": {code},
    "state": "24ca41d9-f432-4e0d-9b48-e5fd4ba49e6e"
}
```

|   구분   | 파라미터 형태 | 데이터 형식 |    내용     |
| :------: | :-----------: | :---------: | :---------: |
| platform |     Path      |  `String`   | 플랫폼 이름 |
|   code   |     Form      |  `String`   |  인가 코드  |
|  state   |     Form      |  `String`   | 고유 상태값 |

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

자동로그인은 쿠키에 저장된 access 쿠키와 refresh 쿠키를 통해 이루어진다.

``` java
@POST
@Path("/auto")
public Response autoLoginResponse(@CookieParam("access") String accessCookie, @CookieParam("refresh") String refreshCookie)
{
    return null;
}
```

access 쿠키와 refresh 쿠키를 검증하여 이상이 없을 경우 쿠키 정보 확인 혹은 Access Token 재발급을 통해 로그인을 자동으로 수행한다.

이미 쿠키 내부에 플랫폼 정보가 포함되어 있으므로, 플랫폼 구분은 필요 없다.

POST `/api/login/auto` 요청은 `autoLoginResponse()`가 담당할 것이다.

#### 요청

``` txt
POST https://api.itcode.dev/api/login/auto
Cookie: access={access}; refresh={refresh};
```

|  구분   | 파라미터 형태 | 데이터 형식 |     내용      |
| :-----: | :-----------: | :---------: | :-----------: |
| access  |    Cookie     |  `String`   |   접근 토큰   |
| refresh |    Cookie     |  `String`   | 리프레쉬 토큰 |

#### 응답

``` txt
Set-Cookie: access={access}
Set-Cookie: refresh={refresh}

{
    "flag": true,
    "title": "success",
    "message": "auto authorized success",
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

만약 아직 access 쿠키가 살아있다면, 별도의 쿠키를 생성하지 않아도 되므로 `Set-Cookie` 헤더는 전송되지 않는다.

## LogoutAPI 구현하기

LogoutAPI가 담당하는 API는 1개다.

``` java
@Path("/logout")
public class LogoutAPI extends API
{
	// /api/logout
}
```

controller 객체는 위와 같이 구현하면 된다.

### 로그아웃 API

로그아웃은 단순히 access와 refresh 쿠키를 삭제하는 것으로 처리한다.

``` java
@POST
@Path("")
public Response logoutResponse()
{
    return null;
}
```

이 두 쿠키는 `OnlyHttp` 속성을 적용할 예정이므로, JavaScript에선 삭제가 불가능하다.

반드시 Backend 영역에서 쿠키를 삭제한 응답을 보내야만 한다.

POST `/api/login/auto` 요청은 `autoLoginResponse()`가 담당할 것이다.