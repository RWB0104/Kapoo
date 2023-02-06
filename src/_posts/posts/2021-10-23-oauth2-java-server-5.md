---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 5. Google OAuth 서비스 신청 및 모듈 구현하기"
excerpt: "두 번째 플랫폼으로, Google에 OAuth 서비스를 신청하고 인증 모듈을 구현한다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-23T01:51:53"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "scribeJAVA" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

두 번째 플랫폼으로, Google에 OAuth 서비스를 신청하고 인증 모듈을 구현한다.





# Google OAuth 서비스 신청하기

API 정보를 얻기 위해 Google OAuth 서비스를 신청하자.



## 1. Google Cloud Platform 접속하기

로그인 후 [Google Cloud Platform](https://console.cloud.google.com/home/dashboard)에 접속하자.

Google은 <span class="lightBlue-600">Google Cloud Platform(GCP)</span>에서 OAuth 서비스를 신청할 수 있다.

<br />

좌측 사이드바의 [<span class="lightBlue-600">API 및 서비스</span>]를 클릭하여 관련 메뉴에 접근할 수 있다.



## 2. 프로젝트 만들기

![image](https://user-images.githubusercontent.com/50317129/138465442-6c4691b1-e5a3-4920-98fa-16bcf80c178a.png)

OAuth 정보를 관리하게 될 프로젝트를 생성하자. 이름은 아무렇게나 지어도 상관없다.



## 3. 동의 화면 구성하기

OAuth API를 생성하기 위해선 먼저 동의 화면을 구성해야한다. 정보 제공 동의 그거 맞다.

좌측 사이드바의 [<span class="lightBlue-600">OAuth 동의 화면</span>] 메뉴에서 구성 가능하다.



### 3-1. UserType 설정

* 내부 - <span class="teal-500">정해진 그룹에서만 사용</span> 가능. 폐쇄적이므로 앱 심사 과정을 생략할 수 있음.
* 외부 - <span class="teal-500">모든 사용자가 사용</span> 가능. 개방적이므로 앱 심사 과정이 필요함.

원하는 타입으로 선택한다. 이 프로젝트에선 [<span class="lightBlue-600">외부</span>]로 선택한다.



### 3-2. 애플리케이션 정보 작성

애플리케이션에 대한 정보를 작성한다.

필수 정보를 작성하고 넘어가자.



### 3-3. 범위 지정

Access Token이 가지는 범위를 지정한다.

![image](https://user-images.githubusercontent.com/50317129/138469867-30c70149-a919-4583-9105-5817e7ba5dd4.png)

이 프로젝트에선 프로필 정보 정도만 사용할 계획이므로 `/auth/userinfo.email`, `/auth/userinfo.profile`을 선택한다.

위 두 정보는 매우 기본적인 정보라 [<span class="red-300">민감하지 않은 범위</span>]로 표시된다. 다른 범위를 추가할 수도 있지만, [<span class="red-500">민감한 범위</span>] 혹은 [<span class="red-700">제한된 범위</span>]를 선택할 경우 앱 심사 시 추가 자료를 제출해야할 수도 있다는 점을 감안하자.



### 3-4. 테스트 사용자

개발 단계에서 해당 OAuth API를 사용할 수 있는 계정을 등록한다. 애플리케이션 소유자는 관리자이므로, 별도로 등록할 필요 없다. 협업 등의 이유로 다수의 계정이 사용해야한다면 등록하자.



### 3-5. 요약

작성한 정보를 확인할 수 있다. 작성한 내용은 추후 동일한 메뉴에서 얼마든지 동일한 절차를 통해 수정이 가능하다.



## 4. API 생성하기

좌측 사이드바에서 [<span class="lightBlue-600">사용자 인증 정보</span>] 메뉴로 들어가자.

![image](https://user-images.githubusercontent.com/50317129/138471904-75045dc5-9a8b-4323-8af9-01c41d1292f0.png)

[<span class="lightBlue-600">OAuth 클라이언트 ID</span>]를 선택하여 API키를 하나 생성하자.

<br />

애플리케이션의 유형을 선택하자. 여기서는 [웹 애플리케이션]을 선택한다.

이름은 원하는대로 입력한다.

* <span class="teal-500">승인된 자바스크립트 원본</span> - `Implicit Grant` 전용. Google API SDK로 JavaScript에서 API를 직접 호출할 경우, 호출을 수행하는 URL을 입력한다.
* <span class="teal-500">승인된 리디렉션 URI</span> - `Authorization Code Grant` 전용. 인증 후 리다이렉션할 URI를 입력한다.

이 프로젝트는 `Authorization Code Grant`를 차용하므로 [<span class="lightBlue-600">승인된 리디렉션 URI</span>]를 선택하고 리다이렉션할 URI를 지정한다.

플랫폼 로그인 창 호출 시 등록된 URI가 아니라면 오류를 표시하니 정확하게 입력할 것.

저장을 완료하면 API키가 생성된다.



## 5. API 확인

생성된 API 리스트를 클릭하여 API를 확인할 수 있다.

![image](https://user-images.githubusercontent.com/50317129/138473426-3429bf2b-0c5b-49a2-a7cc-b209cf9f126f.png)

상단의 [<span class="lightBlue-600">보안 비밀 재설정</span>]을 통해 클라이언트 보안 비밀키를 갱신할 수 있다.





# Google 인증 모듈 구현하기

필요한 모든 준비가 갖춰졌으니, Google 인증 모듈을 구현해보자. 이전에 구현한 `AuthModule`을 상속받아 구현할 것이다.

``` java
public class GoogleAuthModule extends AuthModule
{
	// Google 인증 모듈
}
```

객체의 기본 형식은 위와 같다.

|           메서드            | 메서드 타입 |                 내용                  | 구현 필요 여부 |
| :-------------------------: | :---------: | :-----------------------------------: | :------------: |
|    `getAuthorizationUrl`    |    추상     |         인증 URL 반환 메서드          |       Y        |
|      `getAccessToken`       |             |         접근 토큰 반환 메서드         |                |
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

Google 모듈이 구현해야하는 대상은 위와 같으며, 네이버와 동일하다.



## properties 파일 생성하기

`WEB-INF` 아래 `google.properties` 파일을 생성한다. 기 생성된 `sample.properties`를 복사해서 사용해도 된다.

``` properties
api=API_KEY
secret=SECRET_KEY
callback=CALLBACK_URL
```

기본적인 형식은 위와 같으며, 각 항목에 해당하는 값을 입력하면 된다.



## 인증 모듈 기본 메서드 및 변수 할당하기

인증 모듈이 정상적으로 동작하기 위해선 기본적으로 지정해줘야할 메서드와 변수들이 존재한다. API 정보 설정, 인스턴스 반환같은 것들이다.

``` java
private static final String MODULE_NAME = "google";

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

private static final ServiceBuilderOAuth20 SERVICE_BUILDER = new ServiceBuilder(API_KEY).apiSecret(SECRET_KEY).callback(CALLBACK_URL).defaultScope("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");

private static final GoogleAuthModule INSTANCE = new GoogleAuthModule(SERVICE_BUILDER);

private GoogleAuthModule(ServiceBuilderOAuth20 serviceBuilder)
{
	super(serviceBuilder);
}

public static GoogleAuthModule getInstance()
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
|    `INSTANCE`     |   `GoogleAuthModule`    |       인스턴스       |

정의된 변수는 전부 `static final`로 선언되어 있어서, 인스턴스 생성 시 한 번만 선언되며 재할당이 불가능하도록 관리한다.

`static{ }` 구문을 통해 인스턴스 생성 시 API 정보를 할당하도록 구성했다.

API 할당 시 `getApiKeyBean()` 메서드를 통해 제공된 이름을 갖는 properties를 분석하여 `ApiKeyBean` 객체를 반환받아 사용한다.



## API URL 할당하기

각 API 별 요청 URL을 반환하는 메서드를 구현하자.

``` java
@Override
public String getAccessTokenEndpoint()
{
	return "https://oauth2.googleapis.com/token";
}

@Override
protected String getAuthorizationBaseUrl()
{
	return "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent";
}

@Override
protected String getUserInfoEndPoint()
{
	return "https://www.googleapis.com/oauth2/v2/userinfo";
}
```

* `getAccessTokenEndpoint()` - 토큰과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getAuthorizationBaseUrl()` - 인증과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getUserInfoEndPoint()` - 사용자 정보와 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.

OAuth2.0 서비스를 수행함에 있어서 필요한 URL은 위와 같다. 이 중 `getAccessTokenEndpoint()`과 `getAuthorizationBaseUrl()`는 scribeJAVA 라이브러리의 객체인 `DefaultApi20`의 추상 메서드고 나머지 하나가 `AuthModule`의 추상 메서드다.

`DefaultApi20`는 사용자 계정 API에 관련된 메서드를 별도로 제공하지 않는다. 하지만 `AuthModule`에서 사용자 정보 확인 공통 메서드를 사용할 때 사용자 계정 API가 반드시 필요하므로 `AuthModule`의 추상 메서드로 관리한다.



## 인증 URL 반환 메서드

<span class="blue-500">Google 플랫폼 로그인 URL을 반환하는 기능</span>을 구현한다.

우선 API를 살펴보자.

<br />

* 요청

``` txt
GET/POST https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&response_type=code&client_id=${:client_id}&redirect_uri={:redirect_uri}&scope={:scope}&state={:state}
```

|    parameter     | type  |   data   | required |                     description                      |
| :--------------: | :---: | :------: | :------: | :--------------------------------------------------: |
| {:response_type} | path  | `String` |    Y     |               응답 타입. `code`로 고정               |
|   {:client_id}   | path  | `String` |    Y     |                        API키                         |
| {:redirect_uri}  | path  | `String` |    Y     |                     Callback URL                     |
|     {:state}     | path  | `String` |    Y     |                     고유 상태값                      |
|     {:scope}     | path  | `String` |          | 접근 허용 범위. 선택한 범위를 공백으로 구분하여 입력 |
|  {:access_type}  | path  | `String` |          |        브라우저 환경 여부. `offline`으로 고정        |
|    {:prompt}     | path  | `String` |          |           프롬프트 모드. `consent`로 고정            |

<br />

* 응답

Google 플랫폼 로그인 페이지

<br />

Google 플랫폼 로그인 API는 위와 같다. 메서드가 요청의 URL을 반환하도록 설계하면 된다.

문자열 연산으로 URL을 직접 설계할 수도 있지만, `service.getAuthorizationUrl()` 메서드를 통해 URL을 간편하게 생성할 수 있다.

<br />

여기서 다른 플랫폼과 Google만의 차이가 하나 있는데, 바로 `access_type`과 `prompt`의 존재다.

Google은 일반적인 URL로 로그인을 수행하면 첫 로그인 시에만 Refresh Token을 제공한다. 즉, 첫 로그인 시 Refresh Token을 어딘가에 저장해야만한다.

이 정보는 손실되면 안 되므로 쿠키나 로컬 스토리지가 아닌 DB에 저장하는 것이 적합하다. 하지만 이 프로젝트는 사용자의 정보를 따로 저장하지 않는다.

이 때 <span class="orange-500">로그인 URL에 위 파라미터를 붙이면 항상 새로 인증을 수행하므로 Refresh Token을 로그인 시마다 제공</span>한다.

<br />

이미 `AuthModule`에 공통 메서드로 선언된 게 있으므로, <span class="red-400">따로 구현하지 않아도 된다.</span>



## 접근 토큰 반환 메서드

로그인 결과로 Code를 전달받으므로 <span class="blue-500">Access Token으로 교환하는 기능</span>을 구현한다.

Google API는 아래와 같다.

<br />

* 요청

``` txt
POST https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id={:client_id}&client_secret={:client_secret}&code={:code}&state={:state}
```

|    parameter     | type  |   data   | required |              description               |
| :--------------: | :---: | :------: | :------: | :------------------------------------: |
|  {:grant_type}   | path  | `String` |    Y     | 인증 타입. `authorization_code`로 고정 |
|   {:client_id}   | path  | `String` |    Y     |                 API키                  |
| {:client_secret} | path  | `String` |    Y     |                Secret키                |
|     {:code}      | path  | `String` |    Y     |               인가 코드                |
|     {:state}     | path  | `String` |          |              고유 상태값               |

<br />

* 응답

``` json
{
	"access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
	"expires_in": 3920,
	"token_type": "Bearer",
	"scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
	"refresh_token": "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
}
```

|   parameter   |   data   |    description     |
| :-----------: | :------: | :----------------: |
| access_token  | `String` |     인증 토큰      |
| refresh_token | `String` |   리프레쉬 토큰    |
|  token_type   | `String` |     토큰 타입      |
|  expires_in   |  `int`   | 만료일자 (초 단위) |
|     scope     | `String` |     접근 권한      |

<br />

`service.getAccessToken()` 메서드의 응답으로 위 JSON 응답의 DTO 객체인 `OAuth2AccessToken`를 얻을 수 있다.

마찬가지로 `AuthModule`에 선언된 공통 메서드를 활용하면 되므로, 굳이 <span class="red-400">구현할 필요 없다.</span>



## 접근 토큰 갱신 및 반환 메서드

Access Token은 만료시간이 한시간 정도로 매우 짧다. Access Token이 만료될 경우, 사용자에게 플랫폼 로그인을 통해 인증 정보를 다시 요구해야하지만 Refresh Token이 있다면 별도의 절차 없이 서비스 내부에서 <span class="blue-500">Access Token을 재발급</span> 받을 수 있다.

이 Refresh Token은 인증 권한은 없지만, Access Token을 재발급받는 권한을 가진다.

이를 구현한 Google API는 아래와 같다.

<br />

* 요청

``` txt
POST https://oauth2.googleapis.com/token?grant_type=refresh_token&client_id={:client_id}&client_secret={:client_secret}&refresh_token=${:refresh_token}
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
	"access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
	"expires_in": 3920,
	"scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
	"token_type": "Bearer"
}
```

|  parameter   |   data   |    description     |
| :----------: | :------: | :----------------: |
| access_token | `String` |     인증 토큰      |
|  token_type  | `String` |     토큰 타입      |
|  expires_in  | `String` | 만료일자 (초 단위) |
|    scope     | `String` |     접근 권한      |

<br />

`AuthModule`의 공통 메서드로 대체 가능하므로 <span class="red-400">별도로 구현하지 않는다.</span>



## 사용자 정보 응답 반환 메서드

<span class="blue-500">Access Token으로 유저 정보를 호출하는 기능</span>을 구현한다. 발급받은 Access Token을 실제로 유의미하게 쓰는 부분이다.

Google API는 아래와 같다.

<br />

* 요청

``` txt
GET https://www.googleapis.com/oauth2/v3/userinfo
Authorization: Bearer {:access_token}
```

|    parameter    |  type  |   data   | required | description |
| :-------------: | :----: | :------: | :------: | :---------: |
| {:access_token} | header | `String` |    Y     |  접근 토큰  |

<br />

* 응답

``` json
{
	"sub": "90234582532742",
	"name": "First Last",
	"given_name": "First",
	"family_name": "Last",
	"picture": "https://lh3.googleusercontent.com/a-/hash",
	"email": "example@gmail.com",
	"email_verified": true,
	"locale": "ko"
}
```

|   parameter    |   data    |          description           |
| :------------: | :-------: | :----------------------------: |
|      sub       | `String`  | 동일인 식별 정보 (고유 해쉬값) |
|      name      | `String`  |           전체 이름            |
|   given_name   | `String`  |              이름              |
|  family_name   | `String`  |               성               |
|    picture     | `String`  |        프로필 사진 URL         |
|     email      | `String`  |        사용자 메일 주소        |
| email_verified | `boolean` |        이메일 인증 여부        |
|     locale     | `String`  |              언어              |

<br />

구글 Profile 응답은 명확하게 제공된 docs를 찾을 수 없어서, 필자의 Access Token을 요청하여 얻은 응답을 기준으로 작성한다. 위 표 외에도 `scope`에 따라 더욱 많은 데이터가 전송될 수 있으니 참고하기 바란다.

id는 우리가 생각하는 `xxx@google.com` 형태의 아이디가 아니라 아이디별로 부여받는 고유 해쉬값이다.

`AuthModule`의 공통 메서드로 대체 가능하므로 <span class="red-400">별도로 구현하지 않는다.</span>



## 유저 정보 객체 반환 메서드

<span class="blue-500">Google의 유저 정보 호출 API 응답 형식에 맞게끔 응답을 파싱</span>하여 `UserInfoBean`로 반환하는 메서드를 구현한다.

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
	String picture = node.get("picture") == null ? "/oauth2/assets/images/logo.png" : node.get("picture").textValue();
	
	return new UserInfoBean(email, name, picture, MODULE_NAME);
}
```

<br />

응답 형식에 맞추어 필요한 값을 추출한다. 만약, 사용자가 정보 제공에 동의하지 않았을 경우 대상 객체가 `null`을 반환한다. 데이터의 누락 시 오류를 방지하기 위해 데이터에 대한 `null` 처리를 반드시 해야한다.



## 연동 해제 결과 반환 메서드

Google 아이디로 처음 로그인을 하면 정보 제공 동의를 수행하는데, 나중에 다시 로그인을 하면 이러한 동의 과정이 생략된다. 즉, 플랫폼에서 첫 로그인 시 정보 제공 동의를 받아 어딘가로부터 저장한다는 뜻이다. 만약 사용자가 서비스로부터 회원 탈퇴를 수행한다면 <span class="blue-500">Google과의 연동을 해제하여 정보를 완전히 삭제</span>할 필요가 있다.

Google API는 아래와 같다.

<br />

* 요청

``` txt
POST https://oauth2.googleapis.com/revoke?token={:token}
```

| parameter | type  |   data   | required | description |
| :-------: | :---: | :------: | :------: | :---------: |
| {:token}  | path  | `String` |    Y     |  접근 토큰  |

<br />

* 응답

``` json
{}
```

<br />

* 코드

``` java
@Override
public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException
{
	OAuthRequest oAuthRequest = new OAuthRequest(Verb.POST, "https://oauth2.googleapis.com/revoke");
	oAuthRequest.addBodyParameter("token", access);
	
	service.signRequest(access, oAuthRequest);
	
	return service.execute(oAuthRequest).isSuccessful();
}
```

<br />

구현은 간단하다. `OAuthRequest` 객체를 활용하면 요청을 쉽게 생성할 수 있다. 응답 자체는 중요하지 않은데다, Google의 경우 응답코드 200은 내용이 아예 없는 204와 동일하다. `response.isSuccessful()` 메서드로 응답이 정상적인지 여부만 판단하여 `boolean`으로 반환한다.



## 정보 제공 동의 갱신 URL 반환 메서드

Google의 경우, 프로필 정보는 별도의 동의를 요구하지 않는다. 따라서 해당 기능은 <span class="red-400">구현에서 제외</span>한다.

<br />

* 코드


``` java
@Override
public String getUpdateAuthorizationUrl(String state)
{
	return null;
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
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Verb;
import oauth.account.bean.ApiKeyBean;
import oauth.account.bean.UserInfoBean;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

/**
 * Google 인증 모듈 클래스
 *
 * @author RWB
 * @since 2021.09.29 Wed 23:45:27
 */
public class GoogleAuthModule extends AuthModule
{
	private static final String MODULE_NAME = "google";
	
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
	
	private static final ServiceBuilderOAuth20 SERVICE_BUILDER = new ServiceBuilder(API_KEY).apiSecret(SECRET_KEY).callback(CALLBACK_URL).defaultScope("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
	
	private static final GoogleAuthModule INSTANCE = new GoogleAuthModule(SERVICE_BUILDER);
	
	/**
	 * 생성자 메서드
	 *
	 * @param serviceBuilder: [ServiceBuilderOAuth20] API 서비스 빌더
	 */
	private GoogleAuthModule(ServiceBuilderOAuth20 serviceBuilder)
	{
		super(serviceBuilder);
	}
	
	/**
	 * 인스턴스 반환 메서드
	 *
	 * @return [GoogleAuthModule] 인스턴스
	 */
	public static GoogleAuthModule getInstance()
	{
		return INSTANCE;
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
		String picture = node.get("picture") == null ? "/oauth2/assets/images/logo.png" : node.get("picture").textValue();
		
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
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.POST, "https://oauth2.googleapis.com/revoke");
		oAuthRequest.addBodyParameter("token", access);
		
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
		return "https://oauth2.googleapis.com/token";
	}
	
	/**
	 * 인증 API 요청 URL 반환 메서드
	 *
	 * @return [String] 인증 API 요청 URL
	 */
	@Override
	protected String getAuthorizationBaseUrl()
	{
		return "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent";
	}
	
	/**
	 * 사용자 정보 요청 URL 반환 메서드
	 *
	 * @return [String] 사용자 정보 요청 URL
	 */
	@Override
	protected String getUserInfoEndPoint()
	{
		return "https://www.googleapis.com/oauth2/v3/userinfo";
	}
}
```

정리한 전체 코드는 위와 같다.



# 정리

네이버의 인증 모듈 구현과 매우 흡사하다. 구현, 오버라이딩해야하는 메서드 모두 동일하다. `AuthModule`을 통해 공통 모듈로 대체함과 필요 시 오버라이딩을 함으로써 여러 플랫폼에 효과적으로 대응이 가능함을 느낄 수 있다. 객체지향이 왜 유지보수에 유용한지 새삼 깨달을 수 있었다.

이로써 Google 인증 모듈 구현이 완료됐다. 현재까지는 개발 중 단계라 정해진 아이디로만 사용할 수 있다. API 설정에서 테스트 계정을 등록해야 해당 계정으로 로그인 테스트가 가능하다. 심사 이후 애플리케이션이 승인되면 모든 아이디에서 로그인이 가능하다.

구글은 개발하는데 살짝 난감했다. 구글이 워낙 제공하는 서비스가 많다보니, 문서도 방대한데다 간단명료하게 설명해주는 문서도 없어서 여기저기 많이 찾아다녀야했다.