---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 9. Jersey로 RESTful API 서비스 제공하기"
excerpt: "이 장에서는 Jersey를 활용하여 RESTful API 서비스를 제공하는 방법에 대해 다룬다. 이 프로젝트는 Jersey를 통해 요청을 받아 응답하므로, 컨트롤러를 구성하기 이전에 Jersey에 대해 잠깐 다루고 넘어간다. 통상 JAVA 서버를 구축하는데 Spring 프레임워크를 많이 사용할 것이다. 그럼에도 굳이 Jersey를 선택하는 이유는 일단 내가 Spring을 잘 모른다. 그것도 그거지만, Spring에 비해 규모가 작고 설정이 간단해서 온전히 RESTful 서버를 구축하는데 집중할 수 있다. Spring 설정의 악랄함은 고사하고, 이 프로젝트의 특성 상 복잡한 로직이나 다채로운 기능을 요구하지 않는다. Spring의 방대한 규모를 온전히 쓰지 못 하므로 배보다 배꼽이 더 크다는 뜻이다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-25T00:12:58"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "Jersey" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

이 장에서는 Jersey를 활용하여 RESTful API 서비스를 제공하는 방법에 대해 다룬다. 이 프로젝트는 Jersey를 통해 요청을 받아 응답하므로, 컨트롤러를 구성하기 이전에 Jersey에 대해 잠깐 다루고 넘어간다.

통상 JAVA 서버를 구축하는데 Spring 프레임워크를 많이 사용할 것이다. 그럼에도 굳이 Jersey를 선택하는 이유는 일단 내가 Spring을 잘 모른다. 그것도 그거지만, Spring에 비해 <span class="blue-600">규모가 작고 설정이 간단해서 온전히 RESTful 서버를 구축하는데 집중</span>할 수 있다. Spring 설정의 악랄함은 고사하고, 이 프로젝트의 특성 상 복잡한 로직이나 다채로운 기능을 요구하지 않는다. Spring의 방대한 규모를 온전히 쓰지 못 하므로 배보다 배꼽이 더 크다는 뜻이다.

<br />

`Tomcat`은 반드시 <span class="red-600">10 이상으로 사용할 것</span>. 이전 장에서도 누누히 얘기했지만, `Jersey 3.x`는 Servlet 5.0인 `jakarta.*`만을 사용한다. Servlet 4.x 밑으로는 지원을 안 하므로, 아무리 스펙 상 올바른 요청을 전송해도 404만 죽어라 뜬다. Tomcat은 이를 버전 10부터 제공하니 주의하자. 내가 이 문제 때문에 거진 수 시간을 날렸다.

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

각 라이브러리의 의미는 위와 같다. 이 중 `jersey-media-json-jackson`은 플러그인으로, <span class="red-400">JSON 형태로 응답하기 위해선 반드시 이 제공자 플러그인이 필요</span>하다. 그 밖에도 여러 유용한 플러그인이 있지만, 이 프로젝트에선 위 4개 정도만 있으면 Jersey를 사용할 수 있다.





## Jersey 요청 URL 지정하기

Jersey의 요청 URL을 지정한다. 무슨 뜻이냐면, <span class="blue-400">Jersey가 담당할 최상위 URL을 지정</span>한다는 의미다.

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

|   애노테이션   |                             내용                             |
| :------------: | :----------------------------------------------------------: |
|  `@PathParam`  | 지정한 URL의 값이 할당됨. `@Path`에서 `/{key}`와 같이 입력함 |
| `@QueryParam`  |            지정한 키를 가진 URL 파라미터가 할당됨            |
|  `@FormParam`  |               지정한 Body의 파라미터가 할당됨                |
| `@CookieParam` |               지정한 키를 가진 Cookie가 할당됨               |
| `@HeaderParam` |               지정한 키를 가진 Header가 할당됨               |

위 애노테이션을 사용해서 원하는 요소를 쉽게 인수로 받아올 수 있다.

|        메서드        |  HTTP  | 대상 URL                                |
| :------------------: | :----: | :-------------------------------------- |
|    `testResponse`    |  GET   | `/api/userinfo`                         |
|  `userinfoResponse`  |  GET   | `/api/userinfo/{id}`                    |
|  `useraddResponse`   |  POST  | `/api/userinfo/{hash}`                  |
| `usercheckResponse`  |  GET   | `/api/userinfo/check?id={id}&key={key}` |
| `userremoveResponse` | DELETE | `/api/userinfo/remove`                  |

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










# 정리

Jersey를 사용함으로써 Servlet 보다 훨씬 강력한 요청, 응답을 수행할 수 있다. 다음 장에서는 이를 기반으로 컨트롤러를 직접 구성해보자.