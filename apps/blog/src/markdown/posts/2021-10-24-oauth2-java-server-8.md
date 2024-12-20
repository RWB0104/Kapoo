---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 8. 프로세스 구현하기"
excerpt: "4장부터 7장까지 진행하며 각 플랫폼의 인증 모듈을 구현했다. 이 장에서는 모듈을 사용하는 주체인 프로세스를 구현한다. 프로세스는 HTTP 메소드에 따라 구분하여 관리한다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: 1635087490000
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0" ]
group: "OAuth2.0 인증서버 구축기"
comment: trueㄴ
publish: true
---

# 개요

4장부터 7장까지 진행하며 각 플랫폼의 인증 모듈을 구현했다. 이 장에서는 모듈을 사용하는 주체인 프로세스를 구현한다.

프로세스는 HTTP 메소드에 따라 구분하여 관리한다.










# 구조

계정 관련 동작 이외엔 없으므로, 대분류는 `account` 하나 뿐이다.

작업에 필요한 HTTP 메소는 `GET`, `POST`, `PUT`, `DELETE`이므로, 아래와 같이 구분한다.

* `AccountGetProcess` - 계정 GET 프로세스 클래스
* `AccountPostProcess` - 계정 POST 프로세스 클래스
* `AccountPutProcess` - 계정 PUT 프로세스 클래스
* `AccountDeleteProcess` - 계정 DELETE 프로세스 클래스

`GET` 메소드에 사용하는 로직은 `AccountGetProcess`에 포함되는 식으로 구성한다.










# 프로세스 구현





## Process 추상 클래스 구현

여러 프로세스에 공통 로직을 적용하기 위해, 모든 프로세스 객체에 상속할 Process 추상 클래스를 구현한다.

``` java
package global.module;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import oauth.account.module.AuthModule;
import oauth.account.module.GithubAuthModule;
import oauth.account.module.GoogleAuthModule;
import oauth.account.module.KakaoAuthModule;
import oauth.account.module.NaverAuthModule;

/**
 * 프로세스 추상 클래스
 *
 * @author RWB
 * @since 2021.09.30 Thu 01:14:25
 */
abstract public class Process
{
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	
	/**
	 * 생성자 메서드
	 *
	 * @param request: [HttpServletRequest] HttpServletResponse 객체
	 * @param response: [HttpServletResponse] HttpServletResponse 객체
	 */
	protected Process(HttpServletRequest request, HttpServletResponse response)
	{
		this.request = request;
		this.response = response;
	}
	
	/**
	 * 인증 모듈 반환 메서드
	 *
	 * @param platform: [String] 플랫폼
	 *
	 * @return [AuthModule] AuthModule 객체
	 *
	 * @throws NullPointerException 유효하지 않은 플랫폼
	 */
	protected AuthModule getAuthModule(String platform) throws NullPointerException
	{
		return switch (platform)
				{
					case "naver" -> NaverAuthModule.getInstance();
					case "google" -> GoogleAuthModule.getInstance();
					case "kakao" -> KakaoAuthModule.getInstance();
					case "github" -> GithubAuthModule.getInstance();
					default -> throw new NullPointerException(Util.builder("'", platform, "' is invalid platform"));
				};
	}
}
```

서블릿 객체인 `HttpServletRequest`, `HttpServletResponse`에 쉽게 접근하기 위해 `protected` 접근 제어자로 각 지역변수를 선언한다.

생성자 사용 시 반드시 `HttpServletRequest`, `HttpServletResponse`를 인수로 주도록 강제한다.

이를 통해 `Process`를 상속하는 모든 하위 프로세스 클래스는 반드시 서블릿 객체를 인수로 받아야하며, 프로세스 내부에서 `request`, `response`로 서블릿 객체에 접근할 수 있다.

<br />

`getAuthModule`은 <span class="blue-400">각 플랫폼 이름에 따라 해당하는 인스턴스를 반환</span>하는 메서드다. 인증 모듈은 주로 프로세스에서 많이 사용하게 되므로, `Process`에 선언하여 이를 상속하는 모든 프로세스 클래스가 해당 메서드에 접근할 수 있도록 구성한다.

이러한 구성으로 동일한 프로세스에서 플랫폼별로 `AuthModule` 객체를 호출하여 플랫폼별로 선언한 메서드를 사용할 수 있다.





## GET 프로세스 구현

계정 프로세스 중 `GET`에 해당하는 동작이 집합된 프로세스 클래스를 구현한다.

* 인증 URL 응답 반환 메서드
* 사용자 정보 응답 반환 메서드

`GET`에 해당하는 동작은 위 두 메서드다. 단순히 데이터를 받아오는 작업들로 구성되어있다.



### 인증 URL 응답 반환 메서드

<span class="blue-400">플랫폼 로그인을 위한 인증 URL을 반환</span>하는 메서드다.

`AuthModule`의 `getAuthorizationUrl` 메서드를 통해 URL를 얻고, 이 내용을 담아 응답 객체로 만들어 반환한다.

``` java
public Response getAuthorizationUrlResponse(String platform)
{
	Response response;
	
	ResponseBean<String> responseBean = new ResponseBean<>();
	
	// 인증 URL 응답 생성 시도
	try
	{
		String state = UUID.randomUUID().toString();
		
		request.getSession().setAttribute("state", state);
		
		AuthModule authModule = getAuthModule(platform);
		
		responseBean.setFlag(true);
		responseBean.setTitle("success");
		responseBean.setMessage(Util.builder(platform, " authrorization url response success"));
		responseBean.setBody(authModule.getAuthorizationUrl(state));
		
		response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
	}
	
	// 예외
	catch (Exception e)
	{
		e.printStackTrace();
		
		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);
		
		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
	}
	
	return response;
}
```

동일한 세션인지 확인하기 위해 프로세스 수행 시 `state`를 생성하여 `getAuthorizationUrl`에 전달한다. 해당 메서드가 반환하는 URL에 전달한 `state`가 URL 파라미터로 입력되어있을 것이다.

해당 `state`를 세션 애트리뷰트에도 등록한다.

플랫폼 로그인은 여러 창을 거치기 때문에, 요청 하이재킹이 매우 쉽다. 이 과정에서 세션 정보가 손상되기 쉬우므로 `state`를 통해 로그인 과정 전체가 동일한 세션에서 이루어지고 있는지 검증할 수 있다.

만약 URL의 `state`와 세션의 `state`가 일치하지 않거나, 세션 정보가 아예 없다면 정상적인 로그인 절차가 아니라고 판단할 수 있다.

추후 이 세션값은 Access Token을 받아 로그인 작업을 수행할 때 사용한다.



### 사용자 정보 응답 반환 메서드

<span class="blue-400">Access Token을 통해 사용자 응답</span>을 받는 메서드다.

`AuthModule`의 `getUserInfoBean` 메서드를 통해 `UserInfoBean` 객체를 얻고, 이 내용을 담아 응답 객체로 만들어 반환한다.

``` java
public Response getUserInfoResponse(String accessCookie)
{
	Response response;
	
	ResponseBean<UserInfoBean> responseBean = new ResponseBean<>();
	
	// 사용자 정보 응답 생성 시도
	try
	{
		Jws<Claims> jws = JwtModule.openJwt(accessCookie);
		
		String accessToken = jws.getBody().get("access", String.class);
		String platform = jws.getBody().get("platform", String.class);
		
		AuthModule authModule = getAuthModule(platform);
		
		com.github.scribejava.core.model.Response userInfoResponse = authModule.getUserInfo(accessToken);
		
		// 응답이 정상적이지 않을 경우
		if (userInfoResponse.getCode() != 200)
		{
			throw new OAuthResponseException(userInfoResponse);
		}
		
		responseBean.setFlag(true);
		responseBean.setTitle("success");
		responseBean.setMessage("user info response success");
		responseBean.setBody(authModule.getUserInfoBean(userInfoResponse.getBody()));
		
		response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
	}
	
	// 예외
	catch (Exception e)
	{
		e.printStackTrace();
		
		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);
		
		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
	}
	
	return response;
}
```

추후 설명하겠지만, <span class="green-600">로그인 시 Access Token과 Refresh Token을 각각 플랫폼과 함께 JWT로 생성</span>하여 access, refresh 쿠키로 저장한다.

각 JWT 쿠키에 플랫폼 정보가 있으므로, access 쿠키만 있어도 Access Token와 그 플랫폼을 찾을 수 있다.



### 전체 코드

``` java
package oauth.account.process;

import com.github.scribejava.core.model.OAuthResponseException;
import global.bean.ResponseBean;
import global.module.JwtModule;
import global.module.Process;
import global.module.Util;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oauth.account.bean.UserInfoBean;
import oauth.account.module.AuthModule;

import java.util.UUID;

/**
 * 계정 GET 프로세스 클래스
 *
 * @author RWB
 * @since 2021.09.30 Thu 21:00:48
 */
public class AccountGetProcess extends Process
{
	/**
	 * 생성자 메서드
	 *
	 * @param request: [HttpServletRequest] HttpServletRequest 객체
	 * @param response: [HttpServletResponse] HttpServletResponse 객체
	 */
	public AccountGetProcess(HttpServletRequest request, HttpServletResponse response)
	{
		super(request, response);
	}
	
	/**
	 * 인증 URL 응답 반환 메서드
	 *
	 * @param platform: [String] 플랫폼
	 *
	 * @return [Response] 응답 객체
	 */
	public Response getAuthorizationUrlResponse(String platform)
	{
		Response response;
		
		ResponseBean<String> responseBean = new ResponseBean<>();
		
		// 인증 URL 응답 생성 시도
		try
		{
			String state = UUID.randomUUID().toString();
			
			request.getSession().setAttribute("state", state);
			
			AuthModule authModule = getAuthModule(platform);
			
			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage(Util.builder(platform, " authrorization url response success"));
			responseBean.setBody(authModule.getAuthorizationUrl(state));
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
		}
		
		return response;
	}
	
	/**
	 * 사용자 정보 응답 반환 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	public Response getUserInfoResponse(String accessCookie)
	{
		Response response;
		
		ResponseBean<UserInfoBean> responseBean = new ResponseBean<>();
		
		// 사용자 정보 응답 생성 시도
		try
		{
			Jws<Claims> jws = JwtModule.openJwt(accessCookie);
			
			String accessToken = jws.getBody().get("access", String.class);
			String platform = jws.getBody().get("platform", String.class);
			
			AuthModule authModule = getAuthModule(platform);
			
			com.github.scribejava.core.model.Response userInfoResponse = authModule.getUserInfo(accessToken);
			
			// 응답이 정상적이지 않을 경우
			if (userInfoResponse.getCode() != 200)
			{
				throw new OAuthResponseException(userInfoResponse);
			}
			
			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage("user info response success");
			responseBean.setBody(authModule.getUserInfoBean(userInfoResponse.getBody()));
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
		}
		
		return response;
	}
}
```





## POST 프로세스 구현

계정 프로세스 중 `POST`에 해당하는 동작이 집합된 프로세스 클래스를 구현한다.

* 로그인 응답 반환 메서드
* 자동 로그인 응답 반환 메서드
* 로그아웃 응답 반환 메서드

`POST`에 해당하는 동작은 위 두 메서드다. 주로 로그인/로그아웃 작업으로 구성되어있다.



### 로그인 응답 반환 메서드

플랫폼 로그인 이후 발급되는 `code`를 통해 <span class="blue-400">Access Token으로 교환하여 로그인을 수행</span>하는 메서드다.

`AuthModule`의 `getAccessToken` 메서드를 통해 `OAuth2AccessToken` 객체를 반환받아 Access Token, Refresh Token을 추출한다.

이 토큰들을 JWT 쿠키로 만들어 로그인 절차를 수행한다.

``` java
public Response postLoginResponse(String platform, String code, String state)
{
	Response response;
	
	ResponseBean<String> responseBean = new ResponseBean<>();
	
	HttpSession session = request.getSession();
	
	// 로그인 응답 생성 시도
	try
	{
		Object sessionState = Objects.requireNonNull(session.getAttribute("state"));
		
		// 고유 상태값이 일치하지 않을 경우
		if (!state.equals(sessionState))
		{
			throw new BadAttributeValueExpException("state is mismatched");
		}
		
		AuthModule authModule = getAuthModule(platform);
		
		OAuth2AccessToken oAuth2AccessToken = authModule.getAccessToken(code);
		
		String accessToken = oAuth2AccessToken.getAccessToken();
		String refreshToken = oAuth2AccessToken.getRefreshToken();
		
		HashMap<String, Object> accessMap = new HashMap<>();
		accessMap.put("access", accessToken);
		accessMap.put("platform", platform);
		
		HashMap<String, Object> refreshMap = new HashMap<>();
		refreshMap.put("refresh", refreshToken);
		refreshMap.put("platform", platform);
		
		String accessJwt = JwtModule.generateJwt(state, accessMap);
		String refreshJwt = JwtModule.generateJwt(state, refreshMap);
		
		NewCookie accessCookie = new NewCookie("access", accessJwt, "/oauth2", ".itcode.dev", "access token", -1, true, true);
		NewCookie refreshCookie = new NewCookie("refresh", refreshJwt, "/oauth2", ".itcode.dev", "refresh token", refreshToken == null ? 0 : 86400 * 7 + 3600 * 9, true, true);
		
		responseBean.setFlag(true);
		responseBean.setTitle("success");
		responseBean.setMessage("authorized success");
		responseBean.setBody(null);
		
		response = Response.ok(responseBean, MediaType.APPLICATION_JSON).cookie(accessCookie, refreshCookie).build();
	}
	
	// 예외
	catch (Exception e)
	{
		e.printStackTrace();
		
		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);
		
		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
	}
	
	// 시도 후
	finally
	{
		session.invalidate();
	}
	
	return response;
}
```

`AccountGetProcess`의 `getAuthorizationUrlResponse` 동작 중 세션 애트리뷰트에 `state`를 입력했었는데, 여기서 그 <span class="orange-500">세션값을 통해 검증을 수행</span>한다.

URL을 통해 인수로 받은 `state`와 세션의 `state`를 추출하여 비교하고, 동일하지 않을 경우 예외를 발생시킨다. 중간에 URL을 탈취해서 전혀 다른 `code`를 삽입하여 요청을 보내도 이를 방지할 수 있는 보안책인 셈이다.

Access Token과 Refresh Token을 전달받아 JWT 쿠키로 만든다.

<br />

* Access Token JWT

``` json
{
	"iss": "oauth2",
	"sub": "auth",
	"aud": "c9159786-40bf-4cf2-8c93-f683d1070137",
	"access": "{ACCESS_TOKEN}",
	"platform": "naver",
	"exp": 1634986011,
	"nbf": 1634982411,
	"iat": 1634982411,
	"jti": "c9159786-40bf-4cf2-8c93-f683d1070137"
}
```

* Refresh Token JWT

``` json
{
	"iss": "oauth2",
	"sub": "auth",
	"aud": "c9159786-40bf-4cf2-8c93-f683d1070137",
	"refresh": "{REFRESH_TOKEN}",
	"platform": "naver",
	"exp": 1634986011,
	"nbf": 1634982411,
	"iat": 1634982411,
	"jti": "c9159786-40bf-4cf2-8c93-f683d1070137"
}
```

<br />

JWT의 내용은 위와 같다. 쿠키에 해당 JWT를 담아 생성한다. <span class="green-400">access 쿠키는 세션 쿠키로 생성하여 브라우저 종료 시 즉시 쿠키가 즉시 소멸</span>되도록 구성하고, <span class="green-400">refresh 쿠키는 어느 정도 보관기간을 두어 추후 다시 사용할 수 있도록 구성</span>한다.

쿠키 도메인은 `.itcode.dev`로 지정되어있는데, 그 이유는 프론트엔드와 백엔드가 전혀 다른 환경에서 동작하기 때문이다.

* Frontend - `project.itcode.dev`
* Backend - `api.itcode.dev`

브라우저의 보안정책으로 다른 도메인에 쿠키를 생성할 수 없다. 때문에 `.itcode.dev`로 지정하여 모든 서브 도메인에 적용하도록 구성했다.

만약 도메인을 지정하지 않으면 자동으로 `api.itcode.dev`를 대상으로 쿠키를 발급한다. 따라서 `project.itcode.dev` 도메인 서비스에서는 쿠키에 접근할 수 없다.



### 자동 로그인 응답 반환 메서드

만약 이전에 로그인을 수행한 이력이 있어, <span class="blue-400">access, refresh 쿠키를 이미 가지고 있을 경우 이를 활용하여 자동 로그인을 수행</span>하는 메서드다.

``` java
public Response postAutoLoginResponse(String accessCookie, String refreshCookie)
{
	Response response;
	
	ResponseBean<String> responseBean = new ResponseBean<>();
	
	// 자동 로그인 시도
	try
	{
		// 접근 토큰 쿠키가 있을 경우
		if (accessCookie != null)
		{
			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage("auto authorized success");
			responseBean.setBody(null);
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
		}
		
		// 리프레쉬 토큰 쿠키가 없을 경우
		else if (refreshCookie == null)
		{
			responseBean.setFlag(false);
			responseBean.setTitle("fail");
			responseBean.setMessage("refresh token is empty");
			responseBean.setBody(null);
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
		}
		
		// 리프레쉬 토큰 쿠키가 있을 경우
		else
		{
			Jws<Claims> refreshJws = JwtModule.openJwt(refreshCookie);
			
			String refreshToken = refreshJws.getBody().get("refresh", String.class);
			String platform = refreshJws.getBody().get("platform", String.class);
			
			AuthModule authModule = getAuthModule(platform);
			
			OAuth2AccessToken oAuth2AccessToken = authModule.getRefreshAccessToken(refreshToken);
			
			String accessToken = oAuth2AccessToken.getAccessToken();
			
			HashMap<String, Object> accessMap = new HashMap<>();
			accessMap.put("access", accessToken);
			accessMap.put("platform", platform);
			
			HashMap<String, Object> refreshMap = new HashMap<>();
			refreshMap.put("refresh", refreshToken);
			refreshMap.put("platform", platform);
			
			String uuid = UUID.randomUUID().toString();
			
			String accessJwt = JwtModule.generateJwt(uuid, accessMap);
			String refreshJwt = JwtModule.generateJwt(uuid, refreshMap);
			
			NewCookie newAccessCookie = new NewCookie("access", accessJwt, "/oauth2", ".itcode.dev", "access token", -1, true, true);
			NewCookie newRefreshCookie = new NewCookie("refresh", refreshJwt, "/oauth2", ".itcode.dev", "refresh token", 86400 * 7 + 3600 * 9, true, true);
			
			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage("auto authorized success");
			responseBean.setBody(null);
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).cookie(newAccessCookie, newRefreshCookie).build();
		}
	}
	
	// 예외
	catch (Exception e)
	{
		e.printStackTrace();
		
		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);
		
		NewCookie newAccessCookie = new NewCookie("access", null, "/oauth2", ".itcode.dev", "access token", 0, true, true);
		NewCookie newRefreshCookie = new NewCookie("refresh", null, "/oauth2", ".itcode.dev", "refresh token", 0, true, true);
		
		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).cookie(newAccessCookie, newRefreshCookie).build();
	}
	
	return response;
}
```

access 쿠키가 이미 있을 경우, 이미 인증 정보가 있기 때문에 별다른 동작을 취하지 않고 넘어간다.

만약 access 쿠키는 없고 <span class="orange-400">refresh 쿠키만 있다면, 이를 통해 Access Token을 재발급받아 인증 정보를 갱신</span>하여 자동으로 로그인을 수행한다.

로그인 로직 자체는 기존 로그인 메서드와 동일하며, Access Token만 Refresh Token을 통해 갱신하여 사용한다.



### 로그아웃 응답 반환 메서드

<span class="blue-400">인증 정보를 제거</span>하여 로그아웃을 수행하는 메서드.

``` java
public Response postLogoutResponse()
{
	Response response;

	ResponseBean<String> responseBean = new ResponseBean<>();

	// 로그아웃 응답 생성 시도
	try
	{
		NewCookie accessCookie = new NewCookie("access", null, "/oauth2", ".itcode.dev", "access token", 0, true, true);
		NewCookie refreshCookie = new NewCookie("refresh", null, "/oauth2", ".itcode.dev", "refresh token", 0, true, true);

		responseBean.setFlag(true);
		responseBean.setTitle("success");
		responseBean.setMessage("logout success");
		responseBean.setBody(null);

		response = Response.ok(responseBean, MediaType.APPLICATION_JSON).cookie(accessCookie, refreshCookie).build();
	}

	// 예외
	catch (Exception e)
	{
		e.printStackTrace();

		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);

		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
	}

	return response;
}
```

인증정보는 쿠키 기반이다. 서버에서 쿠키 생성 시 보안을 위해 `HttpOnly` 옵션을 활성화했기 때문에 JavaScript에선 access, refresh 쿠키를 다룰 수 없다.

서버에서 쿠키 만료시간을 0으로 덮어씌워 인증쿠키를 제거한다.



### 전체 코드

``` java
package oauth.account.process;

import com.github.scribejava.core.model.OAuth2AccessToken;
import global.bean.ResponseBean;
import global.module.JwtModule;
import global.module.Process;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import oauth.account.module.AuthModule;

import javax.management.BadAttributeValueExpException;
import java.util.HashMap;
import java.util.Objects;
import java.util.UUID;

/**
 * 계정 POST 프로세스 클래스
 *
 * @author RWB
 * @since 2021.10.02 Sat 00:53:52
 */
public class AccountPostProcess extends Process
{
	/**
	 * 생성자 메서드
	 *
	 * @param request: [HttpServletRequest] HttpServletRequest 객체
	 * @param response: [HttpServletResponse] HttpServletResponse 객체
	 */
	public AccountPostProcess(HttpServletRequest request, HttpServletResponse response)
	{
		super(request, response);
	}
	
	/**
	 * 로그인 응답 반환 메서드
	 *
	 * @param platform: [String] 플랫폼
	 * @param code: [String] 인증 코드
	 * @param state: [String] 고유 상태값
	 *
	 * @return [Response] 응답 객체
	 */
	public Response postLoginResponse(String platform, String code, String state)
	{
		Response response;
		
		ResponseBean<String> responseBean = new ResponseBean<>();
		
		HttpSession session = request.getSession();
		
		// 로그인 응답 생성 시도
		try
		{
			Object sessionState = Objects.requireNonNull(session.getAttribute("state"));
			
			// 고유 상태값이 일치하지 않을 경우
			if (!state.equals(sessionState))
			{
				throw new BadAttributeValueExpException("state is mismatched");
			}
			
			AuthModule authModule = getAuthModule(platform);
			
			OAuth2AccessToken oAuth2AccessToken = authModule.getAccessToken(code);
			
			String accessToken = oAuth2AccessToken.getAccessToken();
			String refreshToken = oAuth2AccessToken.getRefreshToken();
			
			HashMap<String, Object> accessMap = new HashMap<>();
			accessMap.put("access", accessToken);
			accessMap.put("platform", platform);
			
			HashMap<String, Object> refreshMap = new HashMap<>();
			refreshMap.put("refresh", refreshToken);
			refreshMap.put("platform", platform);
			
			String accessJwt = JwtModule.generateJwt(state, accessMap);
			String refreshJwt = JwtModule.generateJwt(state, refreshMap);
			
			NewCookie accessCookie = new NewCookie("access", accessJwt, "/oauth2", ".itcode.dev", "access token", -1, true, true);
			NewCookie refreshCookie = new NewCookie("refresh", refreshJwt, "/oauth2", ".itcode.dev", "refresh token", refreshToken == null ? 0 : 86400 * 7 + 3600 * 9, true, true);
			
			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage("authorized success");
			responseBean.setBody(null);
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).cookie(accessCookie, refreshCookie).build();
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
		}
		
		// 시도 후
		finally
		{
			session.invalidate();
		}
		
		return response;
	}
	
	/**
	 * 자동 로그인 응답 반환 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 * @param refreshCookie: [String] 리프레쉬 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	public Response postAutoLoginResponse(String accessCookie, String refreshCookie)
	{
		Response response;
		
		ResponseBean<String> responseBean = new ResponseBean<>();
		
		// 자동 로그인 시도
		try
		{
			// 접근 토큰 쿠키가 있을 경우
			if (accessCookie != null)
			{
				responseBean.setFlag(true);
				responseBean.setTitle("success");
				responseBean.setMessage("auto authorized success");
				responseBean.setBody(null);
				
				response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
			}
			
			// 리프레쉬 토큰 쿠키가 없을 경우
			else if (refreshCookie == null)
			{
				responseBean.setFlag(false);
				responseBean.setTitle("fail");
				responseBean.setMessage("refresh token is empty");
				responseBean.setBody(null);
				
				response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
			}
			
			// 리프레쉬 토큰 쿠키가 있을 경우
			else
			{
				Jws<Claims> refreshJws = JwtModule.openJwt(refreshCookie);
				
				String refreshToken = refreshJws.getBody().get("refresh", String.class);
				String platform = refreshJws.getBody().get("platform", String.class);
				
				AuthModule authModule = getAuthModule(platform);
				
				OAuth2AccessToken oAuth2AccessToken = authModule.getRefreshAccessToken(refreshToken);
				
				String accessToken = oAuth2AccessToken.getAccessToken();
				
				HashMap<String, Object> accessMap = new HashMap<>();
				accessMap.put("access", accessToken);
				accessMap.put("platform", platform);
				
				HashMap<String, Object> refreshMap = new HashMap<>();
				refreshMap.put("refresh", refreshToken);
				refreshMap.put("platform", platform);
				
				String uuid = UUID.randomUUID().toString();
				
				String accessJwt = JwtModule.generateJwt(uuid, accessMap);
				String refreshJwt = JwtModule.generateJwt(uuid, refreshMap);
				
				NewCookie newAccessCookie = new NewCookie("access", accessJwt, "/oauth2", ".itcode.dev", "access token", -1, true, true);
				NewCookie newRefreshCookie = new NewCookie("refresh", refreshJwt, "/oauth2", ".itcode.dev", "refresh token", 86400 * 7 + 3600 * 9, true, true);
				
				responseBean.setFlag(true);
				responseBean.setTitle("success");
				responseBean.setMessage("auto authorized success");
				responseBean.setBody(null);
				
				response = Response.ok(responseBean, MediaType.APPLICATION_JSON).cookie(newAccessCookie, newRefreshCookie).build();
			}
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			NewCookie newAccessCookie = new NewCookie("access", null, "/oauth2", ".itcode.dev", "access token", 0, true, true);
			NewCookie newRefreshCookie = new NewCookie("refresh", null, "/oauth2", ".itcode.dev", "refresh token", 0, true, true);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).cookie(newAccessCookie, newRefreshCookie).build();
		}
		
		return response;
	}
	
	/**
	 * 로그아웃 응답 반환 메서드
	 *
	 * @return [Response] 응답 객체
	 */
	public Response postLogoutResponse()
	{
		Response response;
		
		ResponseBean<String> responseBean = new ResponseBean<>();
		
		// 로그아웃 응답 생성 시도
		try
		{
			NewCookie accessCookie = new NewCookie("access", null, "/oauth2", ".itcode.dev", "access token", 0, true, true);
			NewCookie refreshCookie = new NewCookie("refresh", null, "/oauth2", ".itcode.dev", "refresh token", 0, true, true);
			
			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage("logout success");
			responseBean.setBody(null);
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).cookie(accessCookie, refreshCookie).build();
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
		}
		
		return response;
	}
}
```





## PUT 프로세스 구현

계정 프로세스 중 `PUT`에 해당하는 동작이 집합된 프로세스를 구현한다.

* 정보 제공 동의 갱신 URL 응답 반환 메서드

`PUT`에 해당하는 메서드는 하나다. 데이터를 수정하는 작업들로 구성되어있다.



### 정보 제공 동의 갱신 URL 응답 반환 메서드

<span class="blue-400">정보 제공 동의를 새로 갱신하는 URL을 반환</span>하는 메서드다.

``` java
public Response putUpdateAuthorizationUrl(String accessCookie)
{
	Response response;

	ResponseBean<String> responseBean = new ResponseBean<>();

	// 정보 제공 동의 갱신 URL 응답 생성 시도
	try
	{
		String state = UUID.randomUUID().toString();

		Jws<Claims> jws = JwtModule.openJwt(accessCookie);

		String platform = jws.getBody().get("platform", String.class);

		AuthModule authModule = getAuthModule(platform);

		String url = authModule.getUpdateAuthorizationUrl(state);

		// URL이 null일 경우
		if (url == null)
		{
			responseBean.setFlag(false);
			responseBean.setTitle("skipped");
			responseBean.setMessage(Util.builder(platform, " doesn't need that service"));
			responseBean.setBody(null);
		}

		// URL이 유효할 경우
		else
		{
			request.getSession().setAttribute("state", state);

			responseBean.setFlag(true);
			responseBean.setTitle("success");
			responseBean.setMessage(Util.builder(platform, " reauthrorization url response success"));
			responseBean.setBody(url);
		}

		response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
	}

	// 예외
	catch (Exception e)
	{
		e.printStackTrace();

		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);

		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
	}

	return response;
}
```

첫 로그인 시, 서비스가 요구하는 정보에 대해 동의/거부하는 절차를 거친다. 이후 유저 정보 요청 시, 이 정보 제공 동의 여부에 의거하여 동의한 정보만을 제공한다.

만약 서비스 운영 도중 요구 정보가 변경되어 추가적인 정보가 필요하다면, 정보 제공 동의를 갱신할 필요가 있다.

서비스는 반환받은 URL로 리다이렉션하여 동의를 갱신한 뒤 갱신된 정보가 반영된 `code`를 반환한다. 이후의 과정은 로그인과 동일한 과정을 거친다.

<br />

즉, <span class="blue-400">정보 제공 동의는 새로운 정보를 갱신하여 로그인을 다시 수행하는 것과 동일</span>하다.



### 전체 코드

``` java
package oauth.account.process;

import global.bean.ResponseBean;
import global.module.JwtModule;
import global.module.Process;
import global.module.Util;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oauth.account.module.AuthModule;

import java.util.UUID;

/**
 * 계정 PUT 프로세스 클래스
 *
 * @author RWB
 * @since 2021.10.19 Tue 21:56:32
 */
public class AccountPutProcess extends Process
{
	/**
	 * 생성자 메서드
	 *
	 * @param request: [HttpServletRequest] HttpServletRequest 객체
	 * @param response: [HttpServletResponse] HttpServletResponse 객체
	 */
	public AccountPutProcess(HttpServletRequest request, HttpServletResponse response)
	{
		super(request, response);
	}
	
	/**
	 * 정보 제공 동의 갱신 URL 응답 반환 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	public Response putUpdateAuthorizationUrl(String accessCookie)
	{
		Response response;
		
		ResponseBean<String> responseBean = new ResponseBean<>();
		
		// 정보 제공 동의 갱신 URL 응답 생성 시도
		try
		{
			String state = UUID.randomUUID().toString();
			
			Jws<Claims> jws = JwtModule.openJwt(accessCookie);
			
			String platform = jws.getBody().get("platform", String.class);
			
			AuthModule authModule = getAuthModule(platform);
			
			String url = authModule.getUpdateAuthorizationUrl(state);
			
			// URL이 null일 경우
			if (url == null)
			{
				responseBean.setFlag(false);
				responseBean.setTitle("skipped");
				responseBean.setMessage(Util.builder(platform, " doesn't need that service"));
				responseBean.setBody(null);
			}
			
			// URL이 유효할 경우
			else
			{
				request.getSession().setAttribute("state", state);
				
				responseBean.setFlag(true);
				responseBean.setTitle("success");
				responseBean.setMessage(Util.builder(platform, " reauthrorization url response success"));
				responseBean.setBody(url);
			}
			
			response = Response.ok(responseBean, MediaType.APPLICATION_JSON).build();
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
		}
		
		return response;
	}
}
```





## DELETE 프로세스 구현

계정 프로세스 중 `DELETE`에 해당하는 동작이 집합된 프로세스를 구현한다.

* 연동 해제 응답 반환 메서드

`DELETE`에 해당하는 메서드는 하나다. 주로 데이터를 삭제하는 작업들로 구성되어있다.



### 연동 해제 응답 반환 메서드

<span class="blue-400">플랫폼과의 연동을 완전히 해제하고 로그아웃을 수행</span>하는 메서드다.

``` java
public Response deleteInfoResponse(String accessCookie)
{
	Response response;

	ResponseBean<String> responseBean = new ResponseBean<>();

	// 연동 해제 응답 생성 시도
	try
	{
		Jws<Claims> jws = JwtModule.openJwt(accessCookie);

		String accessToken = jws.getBody().get("access", String.class);
		String platform = jws.getBody().get("platform", String.class);

		AuthModule authModule = getAuthModule(platform);

		// 연동 해제에 성공할 경우
		if (authModule.deleteInfo(accessToken))
		{
			response = new AccountPostProcess(request, this.response).postLogoutResponse();
		}

		// 아닐 경우
		else
		{
			throw new RequestAuthenticationException("revoke fail");
		}
	}

	// 예외
	catch (Exception e)
	{
		e.printStackTrace();

		responseBean.setFlag(false);
		responseBean.setTitle(e.getClass().getSimpleName());
		responseBean.setMessage(e.getMessage());
		responseBean.setBody(null);

		response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
	}

	return response;
}
```

플랫폼과의 연동을 해제하면 발급받았던 Access Token과 Refresh Token이 만료되어 더 이상 제 기능을 할 수 없게 된다.

보통 회원탈퇴 시 이루어지는 과정이지만, 이 프로젝트는 별도의 회원가입이랄게 따로 없으므로, 자동으로 로그아웃을 시키는 것으로 끝난다.

추후 재로그인 시 처음 로그인하는 것과 동일한 과정을 거치게 된다.



### 전체 코드

``` java
package oauth.account.process;

import global.bean.ResponseBean;
import global.module.JwtModule;
import global.module.Process;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oauth.account.module.AuthModule;
import org.glassfish.jersey.client.authentication.RequestAuthenticationException;

/**
 * 계정 DELETE 프로세스 클래스
 *
 * @author RWB
 * @since 2021.10.02 Sat 00:53:52
 */
public class AccountDeleteProcess extends Process
{
	/**
	 * 생성자 메서드
	 *
	 * @param request: [HttpServletRequest] HttpServletRequest 객체
	 * @param response: [HttpServletResponse] HttpServletResponse 객체
	 */
	public AccountDeleteProcess(HttpServletRequest request, HttpServletResponse response)
	{
		super(request, response);
	}
	
	/**
	 * 연동 해제 응답 반환 메서드
	 *
	 * @param accessCookie: [String] 접근 토큰 쿠키
	 *
	 * @return [Response] 응답 객체
	 */
	public Response deleteInfoResponse(String accessCookie)
	{
		Response response;
		
		ResponseBean<String> responseBean = new ResponseBean<>();
		
		// 연동 해제 응답 생성 시도
		try
		{
			Jws<Claims> jws = JwtModule.openJwt(accessCookie);
			
			String accessToken = jws.getBody().get("access", String.class);
			String platform = jws.getBody().get("platform", String.class);
			
			AuthModule authModule = getAuthModule(platform);
			
			// 연동 해제에 성공할 경우
			if (authModule.deleteInfo(accessToken))
			{
				response = new AccountPostProcess(request, this.response).postLogoutResponse();
			}
			
			// 아닐 경우
			else
			{
				throw new RequestAuthenticationException("revoke fail");
			}
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
			
			responseBean.setFlag(false);
			responseBean.setTitle(e.getClass().getSimpleName());
			responseBean.setMessage(e.getMessage());
			responseBean.setBody(null);
			
			response = Response.status(Response.Status.BAD_REQUEST).entity(responseBean).type(MediaType.APPLICATION_JSON).build();
		}
		
		return response;
	}
}
```










# 정리

이로써 프로젝트 구현을 완료했다. `NaverAuthModule`, `GoogleAuthModule` 같은 각기 다른 인증모듈을 `AuthModule`이라는 상위 객체로 반환받은 덕분에 복잡한 분기나 중복 코드를 막을 수 있었다.

파이프라인이 나눠지는 순간, 이와 연결된 하위 파이프라인까지 강제로 분리되는 경향이 있다. 가장 밑단인 모듈을 적절히 설계한 덕분에, 그 상위 파이프라인들은 하나로 관리할 수 있음을 확인할 수 있다.

다음 장에서는 Jersey를 통한 컨트롤러 구성 방법에 대해 다룬다.