---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 6. KAKAO OAuth 서비스 신청 및 모듈 구현하기"
excerpt: "세 번째 플랫폼으로, KAKAO에 OAuth 서비스를 신청하고 인증 모듈을 구현한다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-23T03:51:04"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "scribeJAVA" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

세 번째 플랫폼으로, KAKAO에 OAuth 서비스를 신청하고 인증 모듈을 구현한다.





# KAKAO OAuth 서비스 신청하기

API 정보를 얻기 위해 KAKAO OAuth 서비스를 신청하자.



## 1. Kakao Developers 접속하기

로그인 후 [Kakao Developers](https://developers.kakao.com/)에 접속하자.

상단 메뉴의 [내 애플리케이션]에서 애플리케이션 목록을 확인할 수 있다.



## 2. 애플리케이션 추가하기

![image](https://user-images.githubusercontent.com/50317129/138494125-ad0ea449-5ebc-4584-a861-54143fefc20a.png)

OAuth 정보를 관리하게 될 애플리케이션을 생성하자. 이름은 아무렇게나 지어도 상관없다. 사업자 정보도 필수사항이므로, 사업자가 아니라면 무작위로 입력하거나 이름과 동일하게 입력하자. 로고는 추후 등록해도 무방하다.



## 3. 동의 화면 구성하기

![image](https://user-images.githubusercontent.com/50317129/138501347-233f8568-5131-46fc-964f-dce0c623cc45.png)

OAuth API를 생성하기 위해선 먼저 동의 화면을 구성해야한다. 정보 제공 동의 그거 맞다.

좌측 사이드바의 [<span class="lightBlue-600">카카오 로그인</span> - <span class="lightBlue-600">동의항목</span>] 메뉴에서 구성 가능하다. 설정 가능한 상태는 아래와 같다.

* <span class="teal-500">필수 동의</span> - 반드시 동의해야하는 항목. 해당 항목을 동의하지 않으면 로그인 불가능.
* <span class="teal-500">선택 동의</span> - 사용자의 선택에 따라 동의하는 항목. 동의 여부가 로그인에 영향을 미치지 않음
* <span class="teal-500">이용 중 동의</span> - 로그인 시에는 표출되지 않음. 추후 API를 통해 필요할 때 별도로 동의 요청
* <span class="teal-500">사용 안함</span> - 사용하지 않음

사용자에게 어떤 항목도 동의를 강제하지 않는 네이버와 달리, 카카오는 필수 사항에 대해선 반드시 동의를 받아야만 로그인이 가능하도록 구성되어있다.

닉네임, 프로필사진, 이메일을 지정한다. 이메일의 경우 비즈니스 앱만 필수로 지정 가능하다.

> <b class="orange-600">비즈니스 앱?</b>  
> KAKAO의 OAuth 애플리케이션 심사와 같은 개념이다. 단, 기본적으로 사업자 등록 번호 등을 요구하는데, 사업자 등록번호가 없는 개인의 경우 별도로 신청해야한다. 이는 차후 심사 단계에서 자세히 다룬다.



## 4. Redirect URI 등록

로그인 후 `code`를 전달할 리다이렉트 URI를 지정한다.

좌측 사이드바의 [<span class="lightBlue-600">카카오 로그인</span>] 메뉴에서 구성 가능하다.

줄바꿈으로 구분하여 여러 URL을 등록할 수 있다.



## 5. 보안 활성화

좌측 사이드바의 [<span class="lightBlue-600">카카오 로그인</span> - <span class="lightBlue-600">보안</span>] 메뉴에서 Client Secret를 활성화한다.

이를 활성화해야 Secret키를 사용할 수 있다.



## 6. 카카오 로그인 활성화

좌측 사이드바의 [<span class="lightBlue-600">카카오 로그인</span>] 메뉴에서 활성화로 체크하여 애플리케이션을 활성화할 수 있다.



## 7. API 키 확인

애플리케이션 메인인 [<span class="lightBlue-600">요약 정보</span>]에서 바로 확인할 수 있다.

![image](https://user-images.githubusercontent.com/50317129/138510821-9bfd446e-3912-4f17-8bc3-8e746818cce7.png)

* 네이티브 앱 키 - 모바일용
* REST API 키 - HTTP 요청용
* JavaScript 키 - SDK용
* Admin 키 - 위 기능을 전부 통합한 관리자용

REST API 키를 사용하면 된다.



# KAKAO 인증 모듈 구현하기

필요한 모든 준비가 갖춰졌으니, 카카오 인증 모듈을 구현해보자. 이전에 구현한 `AuthModule`을 상속받아 구현할 것이다.

``` java
public class KakaoAuthModule extends AuthModule
{
	// KAKAO 인증 모듈
}
```

객체의 기본 형식은 위와 같다.

|           메서드            | 메서드 타입 |                 내용                  | 구현 필요 여부 |
| :-------------------------: | :---------: | :-----------------------------------: | :------------: |
|    `getAuthorizationUrl`    |    추상     |         인증 URL 반환 메서드          |       Y        |
|      `getAccessToken`       |             |         접근 토큰 반환 메서드         |       Y        |
|   `getRefreshAccessToken`   |             |     접근 토큰 갱신 및 반환 메서드     |                |
|        `getUserInfo`        |             |     사용자 정보 응답 반환 메서드      |                |
|  `getRefreshTokenEndpoint`  |             | 접근 토큰 재발급 요청 URL 반환 메서드 |                |
|       `getApiKeyBean`       |             |        API 키 객체 반환 메서드        |                |
|    `getUserInfoEndPoint`    |             |   사용자 정보 요청 URL 반환 메서드    |                |
|      `getUserInfoBean`      |    추상     |      유저 정보 객체 반환 메서드       |       Y        |
|        `deleteInfo`         |    추상     |      연동 해제 결과 반환 메서드       |       Y        |
| `getUpdateAuthorizationUrl` |    추상     |  정보 제공 동의 갱신 URL 반환 메서드  |       Y        |
|  `getAccessTokenEndpoint`   |    추상     |    접근 토큰 요청 URL 반환 메서드     |       Y        |
|  `getAuthorizationBaseUrl`  |    추상     |     인증 API 요청 URL 반환 메서드     |       Y        |

카카오 모듈이 구현해야하는 대상은 위와 같다. 이전 플랫폼과 다르게 `getAccessToken`의 오버라이딩이 필요하다.



## properties 파일 생성하기

`WEB-INF` 아래 `kakao.properties` 파일을 생성한다. 기 생성된 `sample.properties`를 복사해서 사용해도 된다.

``` properties
api=API_KEY
secret=SECRET_KEY
callback=CALLBACK_URL
```

기본적인 형식은 위와 같으며, 각 항목에 해당하는 값을 입력하면 된다.



## 인증 모듈 기본 메서드 및 변수 할당하기

인증 모듈이 정상적으로 동작하기 위해선 기본적으로 지정해줘야할 메서드와 변수들이 존재한다. API 정보 설정, 인스턴스 반환같은 것들이다.

``` java
private static final String MODULE_NAME = "kakao";

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

private static final KakaoAuthModule INSTANCE = new KakaoAuthModule(SERVICE_BUILDER);

private KakaoAuthModule(ServiceBuilderOAuth20 serviceBuilder)
{
	super(serviceBuilder);
}

public static KakaoAuthModule getInstance()
{
	return INSTANCE;
}
```

Google은 반드시 `scope`를 특정해야한다. 사용하는 `scope`는 [3-3. 범위 지정](#3-3-범위-지정)에서 선택한 그 범위를 집어넣으면 된다.

|       구분        |          형식           |         내용         |
| :---------------: | :---------------------: | :------------------: |
|   `MODULE_NAME`   |        `String`         |      모듈 이름       |
|     `API_KEY`     |        `String`         |        API키         |
|   `SECRET_KEY`    |        `String`         |       Secret키       |
|  `CALLBACK_URL`   |        `String`         |       콜백 URL       |
| `SERVICE_BUILDER` | `ServiceBuilderOAuth20` | OAuth2.0 서비스 빌더 |
|    `INSTANCE`     |    `KakaoAuthModule`    |       인스턴스       |

정의된 변수는 전부 `static final`로 선언되어 있어서, 인스턴스 생성 시 한 번만 선언되며 재할당이 불가능하도록 관리한다.

`static{ }` 구문을 통해 인스턴스 생성 시 API 정보를 할당하도록 구성했다.

API 할당 시 `getApiKeyBean()` 메서드를 통해 제공된 이름을 갖는 properties를 분석하여 `ApiKeyBean` 객체를 반환받아 사용한다.



## API URL 할당하기

각 API 별 요청 URL을 반환하는 메서드를 구현하자.

``` java
@Override
public String getAccessTokenEndpoint()
{
	return "https://kauth.kakao.com/oauth/token";
}

@Override
protected String getAuthorizationBaseUrl()
{
	return "https://kauth.kakao.com/oauth/authorize";
}

@Override
protected String getUserInfoEndPoint()
{
	return "https://kapi.kakao.com/v2/user/me";
}
```

* `getAccessTokenEndpoint()` - 토큰과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getAuthorizationBaseUrl()` - 인증과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getUserInfoEndPoint()` - 사용자 정보와 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.

OAuth2.0 서비스를 수행함에 있어서 필요한 URL은 위와 같다. 이 중 `getAccessTokenEndpoint()`과 `getAuthorizationBaseUrl()`는 scribeJAVA 라이브러리의 객체인 `DefaultApi20`의 추상 메서드고 나머지 하나가 `AuthModule`의 추상 메서드다.

`DefaultApi20`는 사용자 계정 API에 관련된 메서드를 별도로 제공하지 않는다. 하지만 `AuthModule`에서 사용자 정보 확인 공통 메서드를 사용할 때 사용자 계정 API가 반드시 필요하므로 `AuthModule`의 추상 메서드로 관리한다.



## 인증 URL 반환 메서드

<span class="blue-500">카카오 플랫폼 로그인 URL을 반환하는 기능</span>을 구현한다.

우선 API를 살펴보자.

<br />

* 요청

``` txt
GET https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={:client_id}&redirect_uri={:redirect_uri}&state={:state}
```

|    parameter     | type  |   data   | required |       description        |
| :--------------: | :---: | :------: | :------: | :----------------------: |
| {:response_type} | path  | `String` |    Y     | 응답 타입. `code`로 고정 |
|   {:client_id}   | path  | `String` |    Y     |          API키           |
| {:redirect_uri}  | path  | `String` |    Y     |       Callback URL       |
|     {:state}     | path  | `String` |    Y     |       고유 상태값        |

<br />

* 응답

카카오 플랫폼 로그인 페이지

<br />

카카오 플랫폼 로그인 API는 위와 같다. 메서드가 요청의 URL을 반환하도록 설계하면 된다.

문자열 연산으로 URL을 직접 설계할 수도 있지만, `service.getAuthorizationUrl()` 메서드를 통해 URL을 간편하게 생성할 수 있다.

<br />

이미 `AuthModule`에 공통 메서드로 선언된 게 있으므로, <span class="red-400">따로 구현하지 않아도 된다.</span>



## 접근 토큰 반환 메서드

로그인 결과로 Code를 전달받으므로 <span class="blue-500">Access Token으로 교환하는 기능</span>을 구현한다.

카카오 API는 아래와 같다. scribeJAVA가 카카오에 대한 처리를 잘 못 하는건지, 동일한 인터페이스를 사용하면 파라미터를 제대로 입력하지 않아 오류가 뜬다. 때문에 어쩔 수 없이 <span class="red-400">직접 요청을 생성하여 사용</span>해야한다.

<br />

* 요청

``` txt
POST https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={:client_id}&client_secret={:client_secret}&redirect_uri={:redirect_uri}&code={:code}
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
	"token_type": "bearer",
	"access_token": "{ACCESS_TOKEN}",
	"expires_in": 43199,
	"refresh_token": "{REFRESH_TOKEN}",
	"refresh_token_expires_in": 25184000,
	"scope": "account_email profile"
}
```

|        parameter         |   data   |           description            |
| :----------------------: | :------: | :------------------------------: |
|       access_token       | `String` |            인증 토큰             |
|      refresh_token       | `String` |          리프레쉬 토큰           |
| refresh_token_expires_in |  `int`   | 리프레쉬 토큰 만료일자 (초 단위) |
|        token_type        | `String` |            토큰 타입             |
|        expires_in        |  `int`   |        만료일자 (초 단위)        |
|          scope           | `String` |            접근 권한             |

<br />

`AccessTokenRequestParams` 객체로 요청을 생성하여 `service.getAccessToken`으로 응답을 받는다.

라이브러리의 처리 문제로 `AuthModule`의 공통 메서드가 아닌, <span class="red-600">별도로 오버라이딩한 메서드를 사용</span>해야한다.



## 접근 토큰 갱신 및 반환 메서드

Access Token은 만료시간이 한시간 정도로 매우 짧다. Access Token이 만료될 경우, 사용자에게 플랫폼 로그인을 통해 인증 정보를 다시 요구해야하지만 Refresh Token이 있다면 별도의 절차 없이 서비스 내부에서 <span class="blue-500">Access Token을 재발급</span> 받을 수 있다.

이 Refresh Token은 인증 권한은 없지만, Access Token을 재발급받는 권한을 가진다.

이를 구현한 카카오 API는 아래와 같다.

<br />

* 요청

``` txt
POST https://kauth.kakao.com/oauth/token?grant_type=refresh_token&client_id={:client_id}&client_secret={:client_secret}&refresh_token=${:refresh_token}
```

|    parameter     | type  |   data   | required |            description            |
| :--------------: | :---: | :------: | :------: | :-------------------------------: |
|  {:grant_type}   | path  | `String` |    Y     | 인증 타입. `refresh_token`로 고정 |
|   {:client_id}   | path  | `String` |    Y     |               API키               |
| {:client_secret} | path  | `String` |    Y     |             Secret키              |
| {:refresh_token} | path  | `String` |    Y     |           리프레쉬 토큰           |

<br />

* 응답

``` json
{
	"access_token": "{ACCESS_TOKEN}",
	"token_type": "bearer",
	"refresh_token": "{REFRESH_TOKEN}",
	"refresh_token_expires_in": 25184000,
	"expires_in": 43199,
}
```

|        parameter         |   data   |           description            |
| :----------------------: | :------: | :------------------------------: |
|       access_token       | `String` |            인증 토큰             |
|        token_type        | `String` |            토큰 타입             |
|      refresh_token       | `String` |          리프레쉬 토큰           |
| refresh_token_expires_in |  `int`   | 리프레쉬 토큰 만료일자 (초 단위) |
|        expires_in        |  `int`   |        만료일자 (초 단위)        |

<br />

`AuthModule`의 공통 메서드로 대체 가능하므로 <span class="red-400">별도로 구현하지 않는다.</span>



## 사용자 정보 응답 반환 메서드

<span class="blue-500">Access Token으로 유저 정보를 호출하는 기능</span>을 구현한다. 발급받은 Access Token을 실제로 유의미하게 쓰는 부분이다.

카카오 API는 아래와 같다.

<br />

* 요청

``` txt
GET/POST https://kapi.kakao.com/v2/user/me
Authorization: Bearer {:access_token}
```

|    parameter    |  type  |   data   | required | description |
| :-------------: | :----: | :------: | :------: | :---------: |
| {:access_token} | header | `String` |    Y     |  접근 토큰  |

<br />

* 응답

``` json
{
	"id":123456789,
	"kakao_account": { 
		"profile_needs_agreement": false,
		"profile": {
			"nickname": "홍길동",
			"thumbnail_image_url": "http://yyy.kakao.com/.../img_110x110.jpg",
			"profile_image_url": "http://yyy.kakao.com/dn/.../img_640x640.jpg",
			"is_default_image": false
		},
		"email_needs_agreement": false, 
		"is_email_valid": true,   
		"is_email_verified": true,   
		"email": "sample@sample.com",
		"age_range_needs_agreement": false,
		"age_range": "20~29",
		"birthday_needs_agreement": false,
		"birthday": "1130",
		"gender_needs_agreement": false,
		"gender": "female"
	},  
	"properties": {
		"nickname": "홍길동카톡",
		"thumbnail_image": "http://xxx.kakao.co.kr/.../aaa.jpg",
		"profile_image": "http://xxx.kakao.co.kr/.../bbb.jpg",
		"custom_field1": "23",
		"custom_field2": "여"
	}
}
```

응답 명세는 길이가 매우 방대한 관계로 생략한다. [카카오 개발자 docs](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info)를 참고하자.

<br />

id는 우리가 생각하는 `xxx@google.com` 형태의 아이디가 아니라 아이디별로 부여받는 고유 해쉬값이다.

`AuthModule`의 공통 메서드로 대체 가능하므로 <span class="red-400">별도로 구현하지 않는다.</span>



## 유저 정보 객체 반환 메서드

<span class="blue-500">카카오의 유저 정보 호출 API 응답 형식에 맞게끔 응답을 파싱</span>하여 `UserInfoBean`로 반환하는 메서드를 구현한다.

이 프로젝트에선 이름, 이메일, 프로필사진 URL만을 사용하므로, 응답에서 해당 값을 빼내어 객체에 담는다.

<br />

* 코드

``` java
@Override
public UserInfoBean getUserInfoBean(String body) throws JsonProcessingException
{
	ObjectMapper mapper = new ObjectMapper();
	
	JsonNode node = mapper.readTree(body);
	
	String email = node.get("kakao_account").get("email") == null ? "미동의" : node.get("kakao_account").get("email").textValue();
	String name = node.get("kakao_account").get("profile").get("nickname") == null ? "미동의" : node.get("kakao_account").get("profile").get("nickname").textValue();
	String picture = node.get("kakao_account").get("profile").get("profile_image_url") == null ? "/oauth2/assets/images/logo.png" : node.get("kakao_account").get("profile").get("profile_image_url").textValue();
	
	return new UserInfoBean(email, name, picture, MODULE_NAME);
}
```

<br />

응답 형식에 맞추어 필요한 값을 추출한다. 만약, 사용자가 정보 제공에 동의하지 않았을 경우 대상 객체가 `null`을 반환한다. 데이터의 누락 시 오류를 방지하기 위해 데이터에 대한 `null` 처리를 반드시 해야한다.



## 연동 해제 결과 반환 메서드

카카오 아이디로 처음 로그인을 하면 정보 제공 동의를 수행하는데, 나중에 다시 로그인을 하면 이러한 동의 과정이 생략된다. 즉, 플랫폼에서 첫 로그인 시 정보 제공 동의를 받아 어딘가로부터 저장한다는 뜻이다. 만약 사용자가 서비스로부터 회원 탈퇴를 수행한다면 <span class="blue-500">카카오와의 연동을 해제하여 정보를 완전히 삭제</span>할 필요가 있다.

카카오 API는 아래와 같다.

<br />

* 요청

``` txt
POST https://kapi.kakao.com/v1/user/unlink
Authorization: Bearer {:access}
Content-Type: application/x-www-form-urlencoded
```

| parameter |  type  |   data   | required | description |
| :-------: | :----: | :------: | :------: | :---------: |
| {:access} | header | `String` |    Y     |  접근 토큰  |

<br />

* 응답

``` json
{
	"id": 123456789
}
```

| parameter |  data  | description |
| :-------: | :----: | :---------: |
|    id     | `long` |  회원 번호  |

<br />

* 코드

``` java
@Override
public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException
{
	OAuthRequest oAuthRequest = new OAuthRequest(Verb.POST, "https://kapi.kakao.com/v1/user/unlink");
	oAuthRequest.addHeader("Content-Type", "application/x-www-form-urlencoded");
	oAuthRequest.addHeader("Authorization", Util.builder("Bearer ", access));
	
	service.signRequest(access, oAuthRequest);
	
	return service.execute(oAuthRequest).isSuccessful();
}
```

구현은 간단하다. `OAuthRequest` 객체를 활용하면 요청을 쉽게 생성할 수 있다. 응답 자체는 중요하지 않다. `response.isSuccessful()` 메서드로 응답이 정상적인지 여부만 판단하여 `boolean`으로 반환한다.



## 정보 제공 동의 갱신 URL 반환 메서드

서비스 운영 중 추가적인 사용자 정보가 필요하거나 필요 없을 때, <span class="blue-500">사용자 정보 동의 갱신을 통해 동의 정보를 다시 지정</span>할 수 있다.

카카오의 경우, 동의하지않은 선택 정보에 대해서만 동의가 가능하며, 이미 동의한 데이터는 별도의 API로 해제해야한다.

<br />

* 요청

``` txt
GET https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={:client_id}&redirect_uri={:redirect_uri}&state={:state}&scope={:scope}
```

|    parameter     | type  |   data   | required |       description        |
| :--------------: | :---: | :------: | :------: | :----------------------: |
| {:response_type} | path  | `String` |    Y     | 응답 타입. `code`로 고정 |
|   {:client_id}   | path  | `String` |    Y     |          API키           |
| {:redirect_uri}  | path  | `String` |    Y     |       Callback URL       |
|     {:state}     | path  | `String` |    Y     |       고유 상태값        |
|     {:scope}     | path  | `String` |    Y     |        접근 권한         |

<br />

* 코드


``` java
@Override
public String getUpdateAuthorizationUrl(String state)
{
	HashMap<String, String> params = new HashMap<>();
	params.put("state", state);
	params.put("scope", "profile_nickname,profile_image,account_email");
	
	return service.getAuthorizationUrl(params);
}
```

<br />

null을 반환하여 동작을 수행하지 않도록 처리한다. 추후 프로세스에서 `null`값이 반환될 경우 별도의 처리를 따른다.



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
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.AccessTokenRequestParams;
import global.module.Util;
import oauth.account.bean.ApiKeyBean;
import oauth.account.bean.UserInfoBean;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

/**
 * 카카오 인증 모듈 클래스
 *
 * @author RWB
 * @since 2021.10.04 Mon 21:30:49
 */
public class KakaoAuthModule extends AuthModule
{
	private static final String MODULE_NAME = "kakao";
	
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
	
	private static final KakaoAuthModule INSTANCE = new KakaoAuthModule(SERVICE_BUILDER);
	
	/**
	 * 생성자 메서드
	 *
	 * @param serviceBuilder: [ServiceBuilderOAuth20] API 서비스 빌더
	 */
	private KakaoAuthModule(ServiceBuilderOAuth20 serviceBuilder)
	{
		super(serviceBuilder);
	}
	
	/**
	 * 인스턴스 반환 메서드
	 *
	 * @return [KakaoAuthModule] 인스턴스
	 */
	public static KakaoAuthModule getInstance()
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
	public OAuth2AccessToken getAccessToken(String code) throws IOException, ExecutionException, InterruptedException
	{
		AccessTokenRequestParams params = new AccessTokenRequestParams(code);
		params.addExtraParameter("client_id", API_KEY);
		params.addExtraParameter("client_secret", SECRET_KEY);
		
		return getAccessToken(params);
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
		
		String email = node.get("kakao_account").get("email") == null ? "미동의" : node.get("kakao_account").get("email").textValue();
		String name = node.get("kakao_account").get("profile").get("nickname") == null ? "미동의" : node.get("kakao_account").get("profile").get("nickname").textValue();
		String picture = node.get("kakao_account").get("profile").get("profile_image_url") == null ? "/oauth2/assets/images/logo.png" : node.get("kakao_account").get("profile").get("profile_image_url").textValue();
		
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
	 * @throws ExecutionException 실행 예외
	 * @throws InterruptedException 인터럽트 예외
	 */
	@Override
	public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException
	{
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.POST, "https://kapi.kakao.com/v1/user/unlink");
		oAuthRequest.addHeader("Content-Type", "application/x-www-form-urlencoded");
		oAuthRequest.addHeader("Authorization", Util.builder("Bearer ", access));
		
		service.signRequest(access, oAuthRequest);
		
		return service.execute(oAuthRequest).isSuccessful();
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
		HashMap<String, String> params = new HashMap<>();
		params.put("state", state);
		params.put("scope", "profile_nickname,profile_image,account_email");
		
		return service.getAuthorizationUrl(params);
	}
	
	/**
	 * 접근 토큰 요청 URL 반환 메서드
	 *
	 * @return [String] 접근 토큰 요청 URL
	 */
	@Override
	public String getAccessTokenEndpoint()
	{
		return "https://kauth.kakao.com/oauth/token";
	}
	
	/**
	 * 인증 API 요청 URL 반환 메서드
	 *
	 * @return [String] 인증 API 요청 URL
	 */
	@Override
	protected String getAuthorizationBaseUrl()
	{
		return "https://kauth.kakao.com/oauth/authorize";
	}
	
	/**
	 * 사용자 정보 요청 URL 반환 메서드
	 *
	 * @return [String] 사용자 정보 요청 URL
	 */
	@Override
	protected String getUserInfoEndPoint()
	{
		return "https://kapi.kakao.com/v2/user/me";
	}
}
```

정리한 전체 코드는 위와 같다.



# 정리

네이버의 인증 모듈 구현과 매우 흡사하다. 구현, 오버라이딩해야하는 메서드 모두 동일하다. `AuthModule`을 통해 공통 모듈로 대체함과 필요 시 오버라이딩을 함으로써 여러 플랫폼에 효과적으로 대응이 가능함을 느낄 수 있다. 객체지향이 왜 유지보수에 유용한지 새삼 깨달을 수 있었다.

이로써 Google 인증 모듈 구현이 완료됐다. 현재까지는 개발 중 단계라 정해진 아이디로만 사용할 수 있다. API 설정에서 테스트 계정을 등록해야 해당 계정으로 로그인 테스트가 가능하다. 심사 이후 애플리케이션이 승인되면 모든 아이디에서 로그인이 가능하다.