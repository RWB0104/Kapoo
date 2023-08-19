---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 3. scribeJAVA로 OAuth2.0 인증 모듈 구현하기"
excerpt: "OAuth 라이브러리인 scribeJAVA를 통해 인증 모듈을 구현해보자."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-20T01:26:40"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "Jersey" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

OAuth 라이브러리인 scribeJAVA를 통해 인증 모듈을 구현해보자.





# OAuth 인증 모듈 구현하기

이전 장에서도 언급했듯이, OAuth 인증 모듈은 그 공통된 특성으로 인해 추상 객체가 적합하다.

scribeJAVA 모듈을 사용하여 추상 객체를 구현한다.



## scribeJAVA 적용하기

프로젝트에 scribeJAVA를 적용해보자.

``` groovy
implementation group: 'com.github.scribejava', name: 'scribejava-apis', version: '8.3.1'
```

`build.gradle`의 dependencies에 위 의존성을 추가하는 것으로 scribeJAVA를 적용할 수 있다.



## scribeJAVA 사용하기

본격적으로 scribeJAVA를 사용해보자.

scribeJAVA는 `OAuth20Service`라는 객체를 중심으로 동작한다. `OAuth20Service` 객체를 통해 아래의 로직을 수행할 수 있다.

* 플랫폼 로그인 URL 생성
* 인가 코드를 Access, Refresh Token으로 교환
* Refresh Token을 통해 Access Token 갱신
* 기타 OAuth 관련 요청 생성

즉, OAuth 인증에 있어서 핵심이 되는 동작은 모두 이 `OAuth20Service` 객체를 중심으로 이루어진다.


### OAuth20Service 객체 생성하기

`OAuth20Service` 객체를 생성한다. 필요한 요소는 아래와 같다.

|      구분      |     필수 여부     |           내용           |
| :------------: | :---------------: | :----------------------: |
|    API Key     |         Y         |          API 키          |
| API Secret Key |         Y         |      API 시크릿 키       |
|  Callback URL  |         Y         | 로그인 결과를 반환할 URL |
|     Scope      | N (일부 플랫폼 Y) |           권한           |

API Key, API Secret Key, Callback URL은 기본적으로 반드시 필요하며, 몇몇 플랫폼의 경우 Scope도 필수 사양으로 지정하는 경우가 있다. 이 프로젝트에 적용할 플랫폼들 중 Google이 그렇다. 구글은 후술할 플랫폼 로그인 URL 생성 시 Scope를 지정하지 않으면 오류를 출력한다.

API Key, API Secret Key는 각 플랫폼에 OAuth 서비스 등록 시 부여해주며, Callback URL은 본인이 직접 정해서 입력하면 된다. 등록되지 않은 Callback URL로 로그인을 수행하면 오류가 출력된다. Callback URL은 여러개를 지정할 수 있다.

> <b class="orange-600">Callback URL의 등록 이유</b>  
> Callback URL이 사전에 등록된 URL이 아닐경우 오류가 뜨는 이유는 보안 때문이다. 플랫폼 로그인 URL은 Callback URL이 URL 파라미터 형태로 입력되어있어서 탈취 및 변조가 매우 간단하다. 이러한 상황에서 Callback URL의 적절한 검증을 수행하지 않는다면 Callback URL을 임의 URL로 변경하여 code 혹은 Access Token을 탈취할 수 있게 된다.

각 플랫폼 별 OAuth 서비스를 등록하는 방법은 추후에 다루고, 일단 이런 부가적인 부분들은 준비가 됐다고 가정한다.

``` java
OAuth20Service service = new ServiceBuilder("{API_KEY}").apiSecret("{SECRET_KEY}").callback("{CALLBACK_URL}").build(this);
```

이와 같이 생성할 수 있다. `build(this)`에서 `this`는 `DefaultApi20` 객체다. 아래는 `OAuth20Service` 객체의 메서드와 그 기능들이다.

|         구분          |             내용              |
| :-------------------: | :---------------------------: |
| `getAuthorizationUrl` | 플랫폼 로그인 URL 반환 메서드 |
|   `getAccessToken`    | OAuth2AccessToken 반환 메서드 |
|     `signRequest`     |    OAuth 요청 등록 메서드     |
|       `execute`       |    등록된 요청 수행 메서드    |

이 프로젝트에선 위 4가지 용도만 알아도 무방하다.




## AuthModule 생성하기

이제 본격적으로 모듈 객체를 구현해보자. 인증 모듈은 반드시 `DefaultApi20`을 상속받아 구현해야한다.

``` java
abstract public class AuthModule extends DefaultApi20
{
	// 구현 예정
}
```

`DefaultApi20` 추상 객체는 두 개의 추상 메서드를 가지고 있다. 즉, 이를 상속하는 `AuthModule`는 이 두 메서드를 구현해야할 책임이 있다.

* `getAccessTokenEndpoint` - 접근 토큰 요청 URL 반환 메서드
* `getAuthorizationBaseUrl` - 인증 URL 반환 메서드

하지만 `AuthModule` 역시 추상 객체이므로, 이를 상속받아 사용할 하위 플랫폼 인증 모듈에게 이 책임을 위임할 수 있다. 즉, `DefaultApi20`의 추상 메서드는 `AuthModule`에서 구현하지 않고 이를 상속하는 하위 플랫폼 인증 모듈에서 구현할 것이다.

인증 모듈 추상 객체는 위와 같은 형태를 가진다. NAVER, Google 등 플랫폼별 인증 모듈은 위 `AuthModule`을 상속받아 사용할 것이다. 인증 모듈의 핵심 동작은 대부분 `OAuth20Service` 객체로부터 이루어지니, `AuthModule`을 상속할 때 반드시 관련 객체를 받도록 명시하는 것이 좋아보인다.

``` java
abstract public class AuthModule extends DefaultApi20
{
    protected OAuth20Service service;
	
	@Getter
	protected String unique;

    protected AuthModule(ServiceBuilderOAuth20 serviceBuilder, String unique)
	{
		service = serviceBuilder.build(this);
		
		this.unique = unique;
	}
}
```

|      구분      |       데이터 형식       |                                  내용                                   |
| :------------: | :---------------------: | :---------------------------------------------------------------------: |
| serviceBuilder | `ServiceBuilderOAuth20` |                      `OAuth20Service` 객체의 빌더                       |
|     unique     |        `String`         | 인증 모듈의 고유값. 플랫폼의 소문자 표기와 동일 (ex. NAVER -> naver 등) |

생성자와 멤버 변수를 위와 같이 지정한다. 전부 `protected` 접근 제어자를 가지므로, `AuthModule`을 상속받은 객체에서만 생성자를 사용할 수 있으며, `service`, `unique` 파라미터 역시 마찬가지다.

`ServiceBuilderOAuth20`를 인수로 할당받아 생성자에서 `OAuth20Service`로 빌드하여 멤버 변수 `service`에 할당한다. `AuthModule` 상속받은 객체의 어느 곳에서든 `service`와 `unique`에 접근할 수 있다.

이 모듈에 기본적인 로직을 작성하고, 플랫폼마다 구현이 모두 다를 경우, 추상 메서드를 선언하여 이를 상속받는 객체가 이를 직접 구현하도록 위임한다.


### 인증 URL 반환 메서드

scribeJAVA를 통해 인증 URL 반환 메서드를 구현해보자. 예를 들어, 네이버 아이디로 로그인 버튼을 클릭하면 네이버 로그인 창이 뜰 것이다. 이 과정은 앞선 예시와 같은 플랫폼 로그인 창의 URL을 생성하는 것이다.

`service`의 `getAuthorizationUrl` 메서드를 사용하는 것만으로 간단히 구현할 수 있다. `ServiceBuilderOAuth20`에 입력했던 API Key, Secret Key, Callback URL을 토대로 플랫폼 인증 URL을 생성하여 반환한다.

``` java
public String getAuthorizationUrl(String state)
{
	return service.getAuthorizationUrl(state);
}
```

`getAuthorizationBaseUrl`의 반환 URL을 기준으로 생성한다.

인수인 `state`는 고유 상태값으로, 서버에서 임의의 UUID를 하나 생성해서 사용한다. 이는 보안을 위한 세션 체크용으로 사용하는 값이다.


### 접근 토큰 반환 메서드

이번엔 `OAuth2AccessToken` 접근 토큰 객체를 반환하는 메서드를 구현해보자. `OAuth2AccessToken`는 Access, Refresh Token. 토큰 종류, 유효시간을 가지는 scribeJAVA의 객체다.

``` java
public OAuth2AccessToken getAccessToken(String code) throws IOException, ExecutionException, InterruptedException
{
    return service.getAccessToken(code);
}
```

마찬가지로 `service`의 `getAccessToken` 메서드를 사용하여 간단히 구현할 수 있다. 인수인 `code`를 Service Provider에 전달하면, Access, Refresh Token을 제공한다.


### 접근 토큰 갱신 및 반환 메서드

Access Token은 보안을 위해 만료시간이 굉장히 짧거나 세션 만료 시 같이 만료되는 것이 보통이다. 이 경우 원래대로라면 다시 인증을 받아야하고, 경우에 따라 사용자에게 플랫폼 로그인 수행을 다시 요구할 수도 있다.

대부분의 OAuth 플랫폼은 인증 시 Access Token과 함께 Refresh Token을 같이 제공한다.

|     구분      |   만료시간    | 인증 가능 여부 |                                               내용                                               |
| :-----------: | :-----------: | :------------: | :----------------------------------------------------------------------------------------------: |
| Access Token  | 짧거나 일시적 |      가능      |   인증을 담당하는 토큰. Access Token 존재 자체만으로 사용자가 인증 정보를 제공한다고 가정한다.   |
| Refresh Token | 길거나 영구적 |     불가능     | Access Token을 재발급하는 토큰. Refresh Token 자체만으론 재발급 외의 유의미한 작업이 불가능하다. |

두 토큰의 차이는 위와 같다.

scribeJAVA에서 Refresh Token으로 Access Token을 재발급 받아보자.

``` java
public OAuth2AccessToken getRefreshAccessToken(String refresh) throws IOException
{
	HashMap<String, String> params = new HashMap<>();
	params.put("client_id", service.getApiKey());
	params.put("client_secret", service.getApiSecret());
	params.put("refresh_token", refresh);
	
	StringBuilder builder = new StringBuilder();
	
	for (Map.Entry<String, String> param : params.entrySet())
	{
		builder.append("&").append(URLEncoder.encode(param.getKey(), StandardCharsets.UTF_8)).append("=").append(URLEncoder.encode(param.getValue(), StandardCharsets.UTF_8));
	}
	
	byte[] paramBytes = builder.toString().getBytes(StandardCharsets.UTF_8);
	
	URL url = new URL(getRefreshTokenEndpoint());
	
	HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	connection.setRequestMethod("POST");
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
	
	ObjectMapper mapper = new ObjectMapper();
	
	JsonNode node = mapper.readTree(responseBuilder.toString());
	
	String access_token = node.get("access_token").textValue();
	String token_type = node.get("token_type").textValue();
	int expires_in = node.get("expires_in").intValue();
	
	return new OAuth2AccessToken(access_token, token_type, expires_in, null, null, responseBuilder.toString());
}

@Override
public String getRefreshTokenEndpoint()
{
	return Util.builder(getAccessTokenEndpoint(), "?grant_type=refresh_token");
}
```

Access Token 재발급 코드는 위와 같다. 원래 `service.refreshAccessToken()` 메서드가 있긴 한데, `getRefreshTokenEndpoint` 처리가 플랫폼별로 다른건지, 제대로 동작이 안 되는 것 같다. 필자는 그냥 `HttpURLConnection`을 활용하여 OAuth2.0 스펙에 맞게끔 요청을 설계했다.

`getRefreshTokenEndpoint` 메서드는 Refresh Token 관련 작업을 수행할 때 베이스가 되는 URL을 반환하는 메서드다. `getAccessTokenEndpoint` URL 뒤에 `?grant_type=refresh_token` 파라미터를 붙여 반환한다.

`getRefreshTokenEndpoint`이 반환하는 URL을 기준삼아 `client_id`, `client_secret`, `refresh_token`을 파라미터로 담아 전송하여 응답을 받고, 여기서 필요한 내용을 추출하여 `OAuth2AccessToken` 객체를 생성하여 반환한다.


### 사용자 정보 응답 반환 메서드

Access Token을 성공적으로 받아왔다면, 이를 통해 사용자 정보를 불러올 수 있다.

``` java
public Response getUserInfo(String access) throws IOException, ExecutionException, InterruptedException
{
	OAuthRequest oAuthRequest = new OAuthRequest(Verb.GET, getUserInfoEndPoint());
	service.signRequest(access, oAuthRequest);
	
	return service.execute(oAuthRequest);
}

abstract protected String getUserInfoEndPoint();
	
abstract public UserInfoBean getUserInfoBean(String body) throws JsonProcessingException;
```

총 세 가지 메서드를 정의해야하는데, 하나는 직접 구현이고 나머지 두 개는 추상 메서드다.

`getUserInfo` 메서드는 Access Token을 활용하여 해당 플랫폼의 UserInfo API로 요청을 보내 응답을 반환한다.

`OAuthRequest` 객체를 선언하여 요청 메서드와 대상 URL을 지정한다. 이후 `service.signRequest`를 통해 `service`에 요청을 등록하고, `service.execute`로 해당 요청을 수행한다.

`getUserInfoEndPoint` 메서드는 각 플랫폼의 UserInfo API URL을 반환하는 추상 메서드로, 플랫폼마다 URL이 다르기 때문에 추상 객체로 선언하여 하위 플랫폼 인증 모듈에게 구현 책임을 위임한다.

`getUserInfoBean`는 `getUserInfo`의 응답을 받아 `UserInfoBean` DTO로 변환하여 이를 반환하는 추상 메서드다. 참고로 `UserInfoBean`은 scribeJAVA에 포함된 것이 아니라, 직접 작성한 DTO 객체다.

플랫폼마다 사용자 정보의 응답값이 다르기 때문에, 이를 적절히 대응하고 값을 반환하고자 설계된 메서드다. 이 역시 하위 플랫폼 인증 모듈에게 구현을 위임한다.


### 연동 해제 결과 반환 메서드

플랫폼으로부터 완전히 연동을 해제하는 메서드가 필요하다.

이는 단순히 로그아웃이 아니라, 플랫폼과 해당 사용자의 연결을 완전히 파기한다. 이 과정에서 사용자의 관련 데이터 및 정보 제공 동의 이력 역시 같이 파기된다.

연동 해제 후 다시 로그인을 하게 되면, 처음 로그인을 수행하는 것 처럼 약관과 정보 제공 동의를 다시 선택해야한다.

``` java
abstract public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException;
```

연동 해제의 경우 OAuth의 범주에선 살짝 벗어나있어서, 이 역시도 동일한 인터페이스를 가지진 않는다. 각 플랫폼마다의 구현이 천차만별이므로 추상 메서드로 정의한다.


### 정보 제공 동의 갱신 URL 반환 메서드

서비스를 운영하다보면 사용자에게 요구할 정보가 변경되기도 한다.

만약 한참 잘 운영하다가 사용자에게 추가적인 정보를 받아야만 한다면? 정보를 호출해도 동의 내역 자체가 없으니 관련 정보는 얻을 수조차 없다.

이러한 상황에 대비해 정보 제공 동의를 갱신하는 기능이 필요하다.

``` java
abstract public String getUpdateAuthorizationUrl(String state);
```

정보 제공 동의 갱신 역시 플랫폼마다 천차만별로 조금씩 다른 것 같다. 마찬가지로 추상 메서드로 정의하자.


### API 객체 반환 메서드

마지막으로 scribeJAVA와 직접적인 관련은 없지만, API 관련 요소를 불러오기위한 메서드가 필요하다.

OAuth2.0을 사용하기 위해 필요한 3가지 요소는 API Key, API Secret Key, Callback URL이 필요하다. 이를 하드코딩해서 코드 안에 녹이는 건 그리 좋은 방법은 아니다.

플랫폼별 API 요소를 `.properties` 파일로 관리하여 `WEB-INF/` 아래에서 관리할 것이다.

> <b class="orange-400">WEB-INF의 특별함</b>  
> Tomcat의 `WEB-INF`는 조금 특별하다. 기본적으로 대상 경로 아래의 모든 폴더 및 파일은 웹 형태로 접근이 가능하지만, `WEB-INF` 아래에 위치하는 폴더 및 파일은 배포 대상에서 제외되므로 접근할 수 없다. 하지만 파일 시스템엔 여전히 존재하고 있으므로, 이에 구애받지 않는 JAVA 등 Backend에서의 접근엔 지장이 없다.  
> API 키, 암호화 키 등 보안에 웹 서버 운영에 필요하면서도 각별한 보안이 요구되는 파일은 `WEB-INF` 아래에 관리하는 것이 좋다.

이렇게 관리하고 `gitignore`에서 각 플랫폼의 설정파일을 제외하면 GitHub에 올려도 해당 파일을 제외하고 올린다. 따라서 이렇게 코드를 오픈해도 API 유출을 막을 수 있다.

코드는 아래와 같다.

``` java
protected static ApiKeyBean getApiKeyBean(String platform)
{
	ApiKeyBean apiKeyBean;
	apiKeyBean = new ApiKeyBean();
	
	// API 키 획득 시도
	try
	{
		HashMap<String, String> map = Util.getProperties(platform);
		
		apiKeyBean.setApi(map.get("api"));
		apiKeyBean.setSecret(map.get("secret"));
		apiKeyBean.setCallback(map.get("callback"));
	}
	
	// 예외
	catch (Exception e)
	{
		e.printStackTrace();
	}
	
	return apiKeyBean;
}
```

``` java
@Getter
@Setter
public class ApiKeyBean
{
	// API 키
	private String api;
	
	// API SECRET 키
	private String secret;
	
	// 콜백 URL
	private String callback;
}
```

`ApiKeyBean`은 직접 설계한 객체로, 위 코드와 같다. `lombok`이 적용되어 있다.

JAVA는 `.properties` 파일을 읽어 key-value 형태의 HashMap으로 변환해주는 기능이 있다.

``` properties
api={API_KEY}
secret={SECRET_KEY}
callback={CALLBACK_URL}
```

설정 파일은 위와 같다. 이 메서드를 활용하여 각 플랫폼별 API 설정파일을 불러오도록 구성한다.



## AuthModule 전체 코드

``` java
package oauth.account.module;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.scribejava.core.builder.ServiceBuilderOAuth20;
import com.github.scribejava.core.builder.api.DefaultApi20;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.AccessTokenRequestParams;
import com.github.scribejava.core.oauth.OAuth20Service;
import global.module.Util;
import lombok.Getter;
import oauth.account.bean.ApiKeyBean;
import oauth.account.bean.UserInfoBean;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * 인증 모듈 추상 클래스
 *
 * @author RWB
 * @since 2021.09.29 Wed 23:30:47
 */
abstract public class AuthModule extends DefaultApi20
{
	protected OAuth20Service service;
	
	@Getter
	protected String unique;
	
	/**
	 * 생성자 메서드
	 *
	 * @param serviceBuilder: [ServiceBuilderOAuth20] API 서비스 빌더
	 * @param unique: [String] 유니크 키
	 */
	protected AuthModule(ServiceBuilderOAuth20 serviceBuilder, String unique)
	{
		service = serviceBuilder.build(this);
		
		this.unique = unique;
	}
	
	abstract protected String getUserInfoEndPoint();
	
	abstract public UserInfoBean getUserInfoBean(String body) throws JsonProcessingException;
	
	abstract public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException;
	
	abstract public String getUpdateAuthorizationUrl(String state);
	
	/**
	 * 인증 URL 반환 메서드
	 *
	 * @param state: [String] 고유 상태값
	 *
	 * @return [String] 인증 URL
	 */
	public String getAuthorizationUrl(String state)
	{
		return service.getAuthorizationUrl(state);
	}
	
	/**
	 * 접근 토큰 반환 메서드
	 *
	 * @param code: [String] 인증 코드
	 *
	 * @return [OAuth2AccessToken] 접근 토큰
	 *
	 * @throws IOException 데이터 입출력 예외
	 * @throws ExecutionException 실행 예외
	 * @throws InterruptedException 인터럽트 예외
	 */
	public OAuth2AccessToken getAccessToken(String code) throws IOException, ExecutionException, InterruptedException
	{
		return service.getAccessToken(code);
	}
	
	/**
	 * 접근 토큰 반환 메서드
	 *
	 * @param params: [AccessTokenRequestParams] AccessTokenRequestParams 객체
	 *
	 * @return [OAuth2AccessToken] 접근 토큰
	 *
	 * @throws IOException 데이터 입출력 예외
	 * @throws ExecutionException 실행 예외
	 * @throws InterruptedException 인터럽트 예외
	 */
	public OAuth2AccessToken getAccessToken(AccessTokenRequestParams params) throws IOException, ExecutionException, InterruptedException
	{
		return service.getAccessToken(params);
	}
	
	/**
	 * 접근 토큰 갱신 및 반환 메서드
	 *
	 * @param refresh: [String] 리프레쉬 토큰
	 *
	 * @return [OAuth2AccessToken] 접근 토큰
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public OAuth2AccessToken getRefreshAccessToken(String refresh) throws IOException
	{
		HashMap<String, String> params = new HashMap<>();
		params.put("client_id", service.getApiKey());
		params.put("client_secret", service.getApiSecret());
		params.put("refresh_token", refresh);
		
		StringBuilder builder = new StringBuilder();
		
		for (Map.Entry<String, String> param : params.entrySet())
		{
			builder.append("&").append(URLEncoder.encode(param.getKey(), StandardCharsets.UTF_8)).append("=").append(URLEncoder.encode(param.getValue(), StandardCharsets.UTF_8));
		}
		
		byte[] paramBytes = builder.toString().getBytes(StandardCharsets.UTF_8);
		
		URL url = new URL(getRefreshTokenEndpoint());
		
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
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
		
		ObjectMapper mapper = new ObjectMapper();
		
		JsonNode node = mapper.readTree(responseBuilder.toString());
		
		String access_token = node.get("access_token").textValue();
		String token_type = node.get("token_type").textValue();
		int expires_in = node.get("expires_in").intValue();
		
		return new OAuth2AccessToken(access_token, token_type, expires_in, refresh, null, responseBuilder.toString());
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
	public Response getUserInfo(String access) throws IOException, ExecutionException, InterruptedException
	{
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.GET, getUserInfoEndPoint());
		service.signRequest(access, oAuthRequest);
		
		return service.execute(oAuthRequest);
	}
	
	/**
	 * 접근 토큰 재발급 요청 URL 반환 메서드
	 *
	 * @return [String] 접근 토큰 재발급 요청 URL
	 */
	@Override
	public String getRefreshTokenEndpoint()
	{
		return Util.builder(getAccessTokenEndpoint(), "?grant_type=refresh_token");
	}
	
	/**
	 * API 키 객체 반환 메서드
	 *
	 * @param platform: [String] 플랫폼
	 *
	 * @return [ApiKeyBean] API 키 객체
	 */
	protected static ApiKeyBean getApiKeyBean(String platform)
	{
		ApiKeyBean apiKeyBean;
		apiKeyBean = new ApiKeyBean();
		
		// API 키 획득 시도
		try
		{
			HashMap<String, String> map = Util.getProperties(platform);
			
			apiKeyBean.setApi(map.get("api"));
			apiKeyBean.setSecret(map.get("secret"));
			apiKeyBean.setCallback(map.get("callback"));
		}
		
		// 예외
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return apiKeyBean;
	}
}
```

전체 소스는 위와 같다.

중간에 한 번씩 사용되는 `Util` 객체는 해당 프로젝트에서 범용적으로 사용되는 메서드를 모아놓은 공통 모듈이다.





# 정리

scribeJAVA를 통해 인증 모듈의 원형이되는 추상 객체를 구현했다. 해당 모듈을 토대로 각 플랫폼별 인증 모듈을 확장하여 개발할 수 있을 것이다.

다음 장에서는 본격적으로 플랫폼별 OAuth 서비스 신청과 인증 모듈 구현에 대해 다룬다.