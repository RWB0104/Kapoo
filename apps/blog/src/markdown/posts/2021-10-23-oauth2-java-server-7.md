---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 7. GitHub OAuth 서비스 신청 및 모듈 구현하기"
excerpt: "마지막 플랫폼으로, GitHub에 OAuth 서비스를 신청하고 인증 모듈을 구현한다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: 1634933326000
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "scribeJAVA" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

마지막 플랫폼으로, GitHub에 OAuth 서비스를 신청하고 인증 모듈을 구현한다.





# GitHub OAuth 서비스 신청하기

API 정보를 얻기 위해 GitHub OAuth 서비스를 신청하자.



## 1. OAuth Apps 생성하기

로그인 후 [GitHub Developer Settings](https://github.com/settings/developers)에 접속하자.

상단 프로필 메뉴에서 [<span class="lightBlue-600">Setting</span> - <span class="lightBlue-600">Developer Settings</span> - <span class="lightBlue-600">OAuth Apps</span>]를 클릭하여 접속할 수도 있다.

[<span class="lightBlue-600">New OAuth App</span>]을 클릭하여 새로운 애플리케이션을 생성하자.

<br />

필수사항을 입력하면 된다. GitHub는 Callback URL를 하나만 입력할 수 있는 것 같다.



## 2. Client Secret 생성하기

생성한 애플리케이션을 클릭한다. [<span class="lightBlue-600">Generate a new client secret</span>]을 클릭하여 새로운 Client Secret을 발급받는다. 암호 확인 과정이 필요하다.

생성 직후 키를 보여주며, 창을 닫게 되면 해당 키는 다시 확인할 수 없으므로 적당한 곳에 임시로 기록해두던지 하자.

잊어버릴 경우 다시 발급받아야한다.



## 3. API 키 확인

메인 화면인 [<span class="lightBlue-600">General</span>]에서 확인할 수 있다.

![null](https://user-images.githubusercontent.com/50317129/138511105-63c370c1-2131-4ab7-871d-9eb023ea1374.png)

<span class="blue-400">Client ID</span>는 상시 확인 가능하고, <span class="blue-400">Client Secret</span>은 발급 직후에만 일시적으로 확인 가능하다는 점을 주의하자

GitHub OAuth는 이게 끝이다. <span class="red-400">별도의 정보 동의 과정도 요구하지 않는다.</span> 그도 그럴 것이, GitHub의 OAuth 키는 프로필 정보만 불러올 수 있기 때문.



# GitHub 인증 모듈 구현하기

필요한 모든 준비가 갖춰졌으니, GitHub 인증 모듈을 구현해보자. 이전에 구현한 `AuthModule`을 상속받아 구현할 것이다.

``` java
public class GithubAuthModule extends AuthModule
{
	// GitHub 인증 모듈
}
```

객체의 기본 형식은 위와 같다.

|           메서드            | 메서드 타입 |                 내용                  | 구현 필요 여부 |
| :-------------------------: | :---------: | :-----------------------------------: | :------------: |
|    `getAuthorizationUrl`    |    추상     |         인증 URL 반환 메서드          |       Y        |
|      `getAccessToken`       |             |         접근 토큰 반환 메서드         |       Y        |
|   `getRefreshAccessToken`   |             |     접근 토큰 갱신 및 반환 메서드     |                |
|        `getUserInfo`        |             |     사용자 정보 응답 반환 메서드      |       Y        |
|  `getRefreshTokenEndpoint`  |             | 접근 토큰 재발급 요청 URL 반환 메서드 |                |
|       `getApiKeyBean`       |             |        API 키 객체 반환 메서드        |                |
|    `getUserInfoEndPoint`    |             |   사용자 정보 요청 URL 반환 메서드    |                |
|      `getUserInfoBean`      |    추상     |      유저 정보 객체 반환 메서드       |       Y        |
|        `deleteInfo`         |    추상     |      연동 해제 결과 반환 메서드       |       Y        |
| `getUpdateAuthorizationUrl` |    추상     |  정보 제공 동의 갱신 URL 반환 메서드  |       Y        |
|  `getAccessTokenEndpoint`   |    추상     |    접근 토큰 요청 URL 반환 메서드     |       Y        |
|  `getAuthorizationBaseUrl`  |    추상     |     인증 API 요청 URL 반환 메서드     |       Y        |

GutHub 모듈이 구현해야하는 대상은 위와 같다. 이전 플랫폼과 다르게 `getAccessToken`, `getUserInfo`의 오버라이딩이 필요하다.



## properties 파일 생성하기

`WEB-INF` 아래 `github.properties` 파일을 생성한다. 기 생성된 `sample.properties`를 복사해서 사용해도 된다.

``` properties
api=API_KEY
secret=SECRET_KEY
callback=CALLBACK_URL
```

기본적인 형식은 위와 같으며, 각 항목에 해당하는 값을 입력하면 된다.



## 인증 모듈 기본 메서드 및 변수 할당하기

인증 모듈이 정상적으로 동작하기 위해선 기본적으로 지정해줘야할 메서드와 변수들이 존재한다. API 정보 설정, 인스턴스 반환같은 것들이다.

``` java
private static final String MODULE_NAME = "github";
	
private static final String API_KEY;
private static final String SECRET_KEY;
private static final String CALLBACK_URL;

static
{
	ApiKeyBean apiKeyBean = getApiKeyBean(MODULE_NAME);
	
	API_KEY = apiKeyBean.getApi();
	SECRET_KEY = apiKeyBean.getSecret();
	CALLBACK_URL = apiKeyBean.getCallback();
}

private static final ServiceBuilderOAuth20 SERVICE_BUILDER = new ServiceBuilder(API_KEY).apiSecret(SECRET_KEY).callback(CALLBACK_URL);

private static final GithubAuthModule INSTANCE = new GithubAuthModule(SERVICE_BUILDER);

private GithubAuthModule(ServiceBuilderOAuth20 serviceBuilder)
{
	super(serviceBuilder);
}

public static GithubAuthModule getInstance()
{
	return INSTANCE;
}
```

|       구분        |          형식           |         내용         |
| :---------------: | :---------------------: | :------------------: |
|   `MODULE_NAME`   |        `String`         |      모듈 이름       |
|     `API_KEY`     |        `String`         |        API키         |
|   `SECRET_KEY`    |        `String`         |       Secret키       |
|  `CALLBACK_URL`   |        `String`         |       콜백 URL       |
| `SERVICE_BUILDER` | `ServiceBuilderOAuth20` | OAuth2.0 서비스 빌더 |
|    `INSTANCE`     |   `GithubAuthModule`    |       인스턴스       |

정의된 변수는 전부 `static final`로 선언되어 있어서, 인스턴스 생성 시 한 번만 선언되며 재할당이 불가능하도록 관리한다.

`static{ }` 구문을 통해 인스턴스 생성 시 API 정보를 할당하도록 구성했다.

API 할당 시 `getApiKeyBean()` 메서드를 통해 제공된 이름을 갖는 properties를 분석하여 `ApiKeyBean` 객체를 반환받아 사용한다.



## API URL 할당하기

각 API 별 요청 URL을 반환하는 메서드를 구현하자.

``` java
@Override
public String getAccessTokenEndpoint()
{
	return "https://github.com/login/oauth/access_token";
}

@Override
protected String getAuthorizationBaseUrl()
{
	return "https://github.com/login/oauth/authorize";
}

@Override
protected String getUserInfoEndPoint()
{
	return "https://api.github.com/users/RWB0104";
}
```

* `getAccessTokenEndpoint()` - 토큰과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getAuthorizationBaseUrl()` - 인증과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getUserInfoEndPoint()` - 사용자 정보와 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.

OAuth2.0 서비스를 수행함에 있어서 필요한 URL은 위와 같다. 이 중 `getAccessTokenEndpoint()`과 `getAuthorizationBaseUrl()`는 scribeJAVA 라이브러리의 객체인 `DefaultApi20`의 추상 메서드고 나머지 하나가 `AuthModule`의 추상 메서드다.

`DefaultApi20`는 사용자 계정 API에 관련된 메서드를 별도로 제공하지 않는다. 하지만 `AuthModule`에서 사용자 정보 확인 공통 메서드를 사용할 때 사용자 계정 API가 반드시 필요하므로 `AuthModule`의 추상 메서드로 관리한다.



## 인증 URL 반환 메서드

<span class="blue-500">GitHub 플랫폼 로그인 URL을 반환하는 기능</span>을 구현한다.

우선 API를 살펴보자.

<br />

* 요청

``` txt
GET https://github.com/login/oauth/authorize?response_type=code&client_id={:client_id}&redirect_uri={:redirect_uri}&state={:state}
```

|    parameter     | type  |   data   | required |       description        |
| :--------------: | :---: | :------: | :------: | :----------------------: |
| {:response_type} | path  | `String` |    Y     | 응답 타입. `code`로 고정 |
|   {:client_id}   | path  | `String` |    Y     |          API키           |
| {:redirect_uri}  | path  | `String` |    Y     |       Callback URL       |
|     {:state}     | path  | `String` |    Y     |       고유 상태값        |

<br />

* 응답

GitHub 플랫폼 로그인 페이지

<br />

GitHub 플랫폼 로그인 API는 위와 같다. 메서드가 요청의 URL을 반환하도록 설계하면 된다.

문자열 연산으로 URL을 직접 설계할 수도 있지만, `service.getAuthorizationUrl()` 메서드를 통해 URL을 간편하게 생성할 수 있다.

<br />

이미 `AuthModule`에 공통 메서드로 선언된 게 있으므로, <span class="red-400">따로 구현하지 않아도 된다.</span>



## 접근 토큰 반환 메서드

로그인 결과로 Code를 전달받으므로 <span class="blue-500">Access Token으로 교환하는 기능</span>을 구현한다.

GitHub는 `Accept` 헤더로 JSON MIME를 지정해야하는데, 아쉽게도 scribeJAVA에는 임의 헤더를 넣어 인증 URL을 생성하는 API는 존재하지 않는다.

Access Token도 없으므로 <span class="red-400">HttpURLConnection으로 직접 구현</span>해야한다.

<br />

* 요청

``` txt
POST https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={:client_id}&client_secret={:client_secret}&redirect_uri={:redirect_uri}&code={:code}
Accept: application/json
```

|    parameter     | type  |   data   | required |              description               |
| :--------------: | :---: | :------: | :------: | :------------------------------------: |
|  {:grant_type}   | path  | `String` |    Y     | 인증 타입. `authorization_code`로 고정 |
|   {:client_id}   | path  | `String` |    Y     |                 API키                  |
| {:client_secret} | path  | `String` |    Y     |                Secret키                |
| {:redirect_uri}  | path  | `String` |    Y     |              Callback URL              |
|     {:code}      | path  | `String` |    Y     |               인가 코드                |

<br />

* 응답

``` json
{
	"access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
	"scope": "repo,gist",
	"token_type": "bearer"
}
```

|  parameter   |   data   | description |
| :----------: | :------: | :---------: |
| access_token | `String` |  인증 토큰  |
|  token_type  | `String` |  토큰 타입  |
|    scope     | `String` |  접근 권한  |

<br />

`AccessTokenRequestParams` 객체로 요청을 생성하여 `service.getAccessToken`으로 응답을 받는다.

특이하게 응답 헤더를 반드시 지정해야하므로, <span class="red-600">별도로 오버라이딩해서 사용</span>한다.



## 접근 토큰 갱신 및 반환 메서드

위 응답을 보면 알 수 있듯이, <span class="orange-600">GitHub는 Refresh Token이 따로 존재하지 않는다.</span> Access Token의 만료시간도 없다. GitHub는 그냥 Access Token 하나만 다루게 된다.

Refresh Token이 없으므로 기능 자체가 쓸모가 없다. 따라서 Github에선 건들지 않는다.



## 사용자 정보 응답 반환 메서드

<span class="blue-500">Access Token으로 유저 정보를 호출하는 기능</span>을 구현한다. 발급받은 Access Token을 실제로 유의미하게 쓰는 부분이다.

GitHub API는 아래와 같다.

<br />

* 요청

``` txt
GET/POST https://api.github.com/user
Authorization: token {:access_token}
```

|    parameter    |  type  |   data   | required | description |
| :-------------: | :----: | :------: | :------: | :---------: |
| {:access_token} | header | `String` |    Y     |  접근 토큰  |

<br />

* 응답

``` json
{
	"login": "octocat",
	"id": 1,
	"node_id": "MDQ6VXNlcjE=",
	"avatar_url": "https://github.com/images/error/octocat_happy.gif",
	"gravatar_id": "",
	"url": "https://api.github.com/users/octocat",
	"html_url": "https://github.com/octocat",
	"followers_url": "https://api.github.com/users/octocat/followers",
	"following_url": "https://api.github.com/users/octocat/following{/other_user}",
	"gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
	"starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
	"subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
	"organizations_url": "https://api.github.com/users/octocat/orgs",
	"repos_url": "https://api.github.com/users/octocat/repos",
	"events_url": "https://api.github.com/users/octocat/events{/privacy}",
	"received_events_url": "https://api.github.com/users/octocat/received_events",
	"type": "User",
	"site_admin": false,
	"name": "monalisa octocat",
	"company": "GitHub",
	"blog": "https://github.com/blog",
	"location": "San Francisco",
	"email": "octocat@github.com",
	"hireable": false,
	"bio": "There once was...",
	"twitter_username": "monatheoctocat",
	"public_repos": 2,
	"public_gists": 1,
	"followers": 20,
	"following": 0,
	"created_at": "2008-01-14T04:33:35Z",
	"updated_at": "2008-01-14T04:33:35Z",
	"private_gists": 81,
	"total_private_repos": 100,
	"owned_private_repos": 100,
	"disk_usage": 10000,
	"collaborators": 8,
	"two_factor_authentication": true,
	"plan": {
		"name": "Medium",
		"space": 400,
		"private_repos": 20,
		"collaborators": 0
	}
}
```

응답 명세는 GitHub에서 명확하게 제공하지 않는다. 확실한건 `email`, `login`, `avatar_url`를 쓰면 될 것 같다.



## 유저 정보 객체 반환 메서드

<span class="blue-500">GitHub의 유저 정보 호출 API 응답 형식에 맞게끔 응답을 파싱</span>하여 `UserInfoBean`로 반환하는 메서드를 구현한다.

이 프로젝트에선 이름, 이메일, 프로필사진 URL만을 사용하므로, 응답에서 해당 값을 빼내어 객체에 담는다.

<br />

* 코드

``` java
@Override
public UserInfoBean getUserInfoBean(String body) throws JsonProcessingException
{
	ObjectMapper mapper = new ObjectMapper();
	
	JsonNode node = mapper.readTree(body);
	
	String email = node.get("email") == null ? "미동의" : node.get("email").textValue();
	String name = node.get("name") == null ? "미동의" : node.get("name").textValue();
	String picture = node.get("avatar_url") == null ? "/oauth2/assets/images/logo.png" : node.get("avatar_url").textValue();
	
	return new UserInfoBean(email, name, picture, MODULE_NAME);
}
```

<br />

응답 형식에 맞추어 필요한 값을 추출한다. 만약, 사용자가 정보 제공에 동의하지 않았을 경우 대상 객체가 `null`을 반환한다. 데이터의 누락 시 오류를 방지하기 위해 데이터에 대한 `null` 처리를 반드시 해야한다.



## 연동 해제 결과 반환 메서드

카카오 아이디로 처음 로그인을 하면 정보 제공 동의를 수행하는데, 나중에 다시 로그인을 하면 이러한 동의 과정이 생략된다. 즉, 플랫폼에서 첫 로그인 시 정보 제공 동의를 받아 어딘가로부터 저장한다는 뜻이다. 만약 사용자가 서비스로부터 회원 탈퇴를 수행한다면 <span class="blue-500">GitHub와의 연동을 해제하여 정보를 완전히 삭제</span>할 필요가 있다.

GitHub API는 아래와 같다.

<br />

* 요청

``` txt
DELETE https://api.github.com/applications/{:client_id}/grant
Authorization: Basic {:auth}
Accept: application/vnd.github.v3+json
Content-Type: application/x-www-form-urlencoded
```

|  parameter   |  type  |   data   | required |           description           |
| :----------: | :----: | :------: | :------: | :-----------------------------: |
| {:client_id} |  path  | `String` |    Y     |             API 키              |
|   {:auth}    | header | `String` |    Y     | API 키와 Secret 키의 Basic 인증 |

> <b class="orange-600">ID:PW 기반의 Basic 헤더</b>  
> Basic 헤더는 ID:PW 기반의 인증 방식이다. ID와 PW를 [ID:PW]와 같이 `:`로 조인한 하나의 문자열로 만든다. 해당 텍스트를 헤더에 사용한다.

<br />

* 응답

응답은 204로, 아무도 오지 않는다.

<br />

* 코드

``` java
@Override
public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException
{
	HashMap<String, String> params = new HashMap<>();
	params.put("access_token", access);
	
	ObjectMapper mapper = new ObjectMapper();
	
	byte[] paramBytes = mapper.writeValueAsString(params).getBytes(StandardCharsets.UTF_8);
	
	URL url = new URL(Util.builder("https://api.github.com/applications/", API_KEY, "/grant"));
	
	HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	connection.setRequestMethod("DELETE");
	connection.addRequestProperty("Authorization", Util.builder("Basic ", Base64.getEncoder().encodeToString(Util.builder(API_KEY, ":", SECRET_KEY).getBytes())));
	connection.addRequestProperty("Accept", "application/vnd.github.v3+json");
	connection.addRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	connection.setDoOutput(true);
	connection.getOutputStream().write(paramBytes);
	
	int status = connection.getResponseCode();
	
	connection.disconnect();
	
	return status == 204;
}
```

구현은 간단하다. `OAuthRequest` 객체를 활용하면 요청을 쉽게 생성할 수 있다. 응답 자체는 중요하지 않다. 이번엔 응답이 204이므로, 응답 상태값이 204인지 비교하여 결과를 반환한다.



## 정보 제공 동의 갱신 URL 반환 메서드

<span class="red-400">GitHub는 별도의 동의가 이루어지지 않으므로 무시</span>한다.




## 전체 코드

``` java
package oauth.account.module;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.builder.ServiceBuilderOAuth20;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import global.module.Util;
import oauth.account.bean.ApiKeyBean;
import oauth.account.bean.UserInfoBean;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * GitHub 인증 모듈 클래스
 *
 * @author RWB
 * @since 2021.10.05 Tue 00:22:10
 */
public class GithubAuthModule extends AuthModule
{
	private static final String MODULE_NAME = "github";
	
	private static final String API_KEY;
	private static final String SECRET_KEY;
	private static final String CALLBACK_URL;
	
	static
	{
		ApiKeyBean apiKeyBean = getApiKeyBean(MODULE_NAME);
		
		API_KEY = apiKeyBean.getApi();
		SECRET_KEY = apiKeyBean.getSecret();
		CALLBACK_URL = apiKeyBean.getCallback();
	}
	
	private static final ServiceBuilderOAuth20 SERVICE_BUILDER = new ServiceBuilder(API_KEY).apiSecret(SECRET_KEY).callback(CALLBACK_URL);
	
	private static final GithubAuthModule INSTANCE = new GithubAuthModule(SERVICE_BUILDER);
	
	/**
	 * 생성자 메서드
	 *
	 * @param serviceBuilder: [ServiceBuilderOAuth20] API 서비스 빌더
	 */
	private GithubAuthModule(ServiceBuilderOAuth20 serviceBuilder)
	{
		super(serviceBuilder);
	}
	
	/**
	 * 인스턴스 반환 메서드
	 *
	 * @return [GithubAuthModule] 인스턴스
	 */
	public static GithubAuthModule getInstance()
	{
		return INSTANCE;
	}
	
	/**
	 * 접근 토큰 반환 메서드
	 *
	 * @param code: [String] 인증 코드
	 *
	 * @return [OAuth2AccessToken] 접근 토큰
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	@Override
	public OAuth2AccessToken getAccessToken(String code) throws IOException
	{
		HashMap<String, String> params = new HashMap<>();
		params.put("client_id", API_KEY);
		params.put("client_secret", SECRET_KEY);
		params.put("redirect_uri", CALLBACK_URL);
		params.put("code", code);
		
		StringBuilder builder = new StringBuilder();
		
		for (Map.Entry<String, String> param : params.entrySet())
		{
			String pre = builder.length() == 0 ? "" : "&";
			
			builder.append(pre).append(URLEncoder.encode(param.getKey(), StandardCharsets.UTF_8)).append("=").append(URLEncoder.encode(param.getValue(), StandardCharsets.UTF_8));
		}
		
		byte[] paramBytes = builder.toString().getBytes(StandardCharsets.UTF_8);
		
		URL url = new URL(getAccessTokenEndpoint());
		
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
		connection.setRequestProperty("Accept", "application/json");
		connection.setDoOutput(true);
		connection.getOutputStream().write(paramBytes);
		
		BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
		
		StringBuilder responseBuilder = new StringBuilder();
		String temp;
		
		while ((temp = reader.readLine()) != null)
		{
			responseBuilder.append(temp);
		}
		
		reader.close();
		connection.disconnect();
		
		ObjectMapper mapper = new ObjectMapper();
		
		JsonNode node = mapper.readTree(responseBuilder.toString());
		
		String access_token = node.get("access_token") == null ? "미동의" : node.get("access_token").textValue();
		String token_type = node.get("token_type") == null ? "미동의" : node.get("token_type").textValue();
		String scope = node.get("scope") == null ? "미동의" : node.get("scope").textValue();
		
		return new OAuth2AccessToken(access_token, token_type, 0, null, scope, responseBuilder.toString());
	}
	
	/**
	 * 사용자 정보 응답 반환 메서드
	 *
	 * @param access: [String] 접근 토큰
	 *
	 * @return [Response] 사용자 정보 응답
	 *
	 * @throws IOException 데이터 입출력 예외
	 * @throws ExecutionException 실행 예외
	 * @throws InterruptedException 인터럽트 예외
	 */
	@Override
	public Response getUserInfo(String access) throws IOException, ExecutionException, InterruptedException
	{
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.GET, getUserInfoEndPoint());
		oAuthRequest.addHeader("Authorization", Util.builder("token ", access));
		
		service.signRequest(access, oAuthRequest);
		
		return service.execute(oAuthRequest);
	}
	
	/**
	 * 유저 정보 객체 반환 메서드
	 *
	 * @param body: [String] OAuth 응답 내용
	 *
	 * @return [UserInfoBean] 유저 정보 객체
	 *
	 * @throws JsonProcessingException JSON 파싱 예외
	 */
	@Override
	public UserInfoBean getUserInfoBean(String body) throws JsonProcessingException
	{
		ObjectMapper mapper = new ObjectMapper();
		
		JsonNode node = mapper.readTree(body);
		
		String email = node.get("email") == null ? "미동의" : node.get("email").textValue();
		String name = node.get("name") == null ? "미동의" : node.get("name").textValue();
		String picture = node.get("avatar_url") == null ? "/oauth2/assets/images/logo.png" : node.get("avatar_url").textValue();
		
		return new UserInfoBean(email, name, picture, MODULE_NAME);
	}
	
	/**
	 * 연동 해제 결과 반환 메서드
	 *
	 * @param access: [String] 접근 토큰
	 *
	 * @return [boolean] 연동 해제 결과
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	@Override
	public boolean deleteInfo(String access) throws IOException
	{
		HashMap<String, String> params = new HashMap<>();
		params.put("access_token", access);
		
		ObjectMapper mapper = new ObjectMapper();
		
		byte[] paramBytes = mapper.writeValueAsString(params).getBytes(StandardCharsets.UTF_8);
		
		URL url = new URL(Util.builder("https://api.github.com/applications/", API_KEY, "/grant"));
		
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("DELETE");
		connection.addRequestProperty("Authorization", Util.builder("Basic ", Base64.getEncoder().encodeToString(Util.builder(API_KEY, ":", SECRET_KEY).getBytes())));
		connection.addRequestProperty("Accept", "application/vnd.github.v3+json");
		connection.addRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		connection.setDoOutput(true);
		connection.getOutputStream().write(paramBytes);
		
		int status = connection.getResponseCode();
		
		connection.disconnect();
		
		return status == 204;
	}
	
	/**
	 * 정보 제공 동의 갱신 URL 반환 메서드
	 *
	 * @param state: [String] 고유 상태값
	 *
	 * @return [String] 정보 제공 동의 갱신 URL
	 */
	@Override
	public String getUpdateAuthorizationUrl(String state)
	{
		return null;
	}
	
	/**
	 * 접근 토큰 요청 URL 반환 메서드
	 *
	 * @return [String] 접근 토큰 요청 URL
	 */
	@Override
	public String getAccessTokenEndpoint()
	{
		return "https://github.com/login/oauth/access_token";
	}
	
	/**
	 * 인증 API 요청 URL 반환 메서드
	 *
	 * @return [String] 인증 API 요청 URL
	 */
	@Override
	protected String getAuthorizationBaseUrl()
	{
		return "https://github.com/login/oauth/authorize";
	}
	
	/**
	 * 사용자 정보 요청 URL 반환 메서드
	 *
	 * @return [String] 사용자 정보 요청 URL
	 */
	@Override
	protected String getUserInfoEndPoint()
	{
		return "https://api.github.com/user";
	}
}
```

정리한 전체 코드는 위와 같다.



# 정리

이로써 모든 플랫폼에 대한 인증 모듈 구현이 끝났다. `AuthModule`를 활용함으로써 최소한의 코드로 각 플랫폼에 대응하는 모듈을 구현했다. 만약 추후 다른 OAuth를 붙일 경우, 위와 같은 방식으로 모듈을 추가 구성하면 된다.

다음 장에서는 모듈을 호출해서 사용하는 영역인 프로세스를 구현할 예정이다.