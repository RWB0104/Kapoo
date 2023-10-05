---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 4. NAVER OAuth 서비스 신청 및 모듈 구현하기"
excerpt: "첫 번째 플랫폼으로, NAVER에 OAuth 서비스를 신청하고 인증 모듈을 구현한다."
coverImage: "https://user-images.githubusercontent.com/50317129/137171016-99af1db1-a346-4def-9329-6072b927bdc0.png"
date: "2021-10-22T22:25:16"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0", "scribeJAVA" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

첫 번째 플랫폼으로, NAVER에 OAuth 서비스를 신청하고 인증 모듈을 구현한다.





# NAVER OAuth 서비스 신청하기

API 정보를 얻기 위해 NAVER OAuth 서비스를 신청하자.



## 1. 네이버 개발자 센터 접속하기

로그인 후 [네이버 개발자 센터](https://developers.naver.com/main/)에 접속하자.

NAVER의 OAuth는 네이버 아이디로 로그인. 속칭 네아로라는 명칭으로 서비스를 제공하고 있다.

네이버 개발자 센터에서 해당 서비스를 사용하는 애플리케이션을 등록하면 된다.

<br />

상단 헤더의 [<span class="lightBlue-600">Application</span> - <span class="lightBlue-600">애플리케이션 등록</span>] 메뉴로 접속하자.



## 2. 애플리케이션 등록

OAuth 정보를 관리하게 될 애플리케이션을 등록하자.

아래의 항목을 모두 입력해야하며, 해당 항목들은 심사 후에도 언제든지 변경이 가능하다.



### 애플리케이션 이름

해당 애플리케이션의 이름이다. 이 이름은 네이버 로그인 창에도 표시가 된다.

![image](https://user-images.githubusercontent.com/50317129/138466274-8c7dff01-7aaf-4911-a2c6-874caa418122.png)

필자의 네아로 창 예시. 필자의 애플리케이션 이름은 OAuth2로, 위 창의 OAuth2 부분에 지정한 이름이 표시된다.



### 사용 API

사용할 API를 선택한다.

네이버와 관련된 여러 API를 제공하지만, 지금은 프로젝트의 목적에 맞게 <span class="blue-400">네아로 서비스</span>를 선택한다.

<br />

네아로 서비스를 선택하면 제공 정보를 선택하는 폼이 추가된다.

이는 사용자의 인증 정보로 얻을 수 있는 정보를 선별하는 것으로, 필수와 추가로 구분하여 선택할 수 있다.

필수 혹은 추가로 지정된 정보는 추후 사용자의 정보 호출 시 접근이 가능하다.

<br />

> <b class="red-600">🛑 주의!!</b>  
> 네이버는 필수 정보조차도 사용자가 임의로 거부할 수 있다. 즉, 서비스 운영에 있어서 이 정보가 필수라는 사항은 사용자에게 고지하더라도, 사용자가 이를 거부해버리면 서비스 입장에선 방법이 없다.  
> 상기한 이유로, 네이버는 사용자 정보 검증의 중요도가 타 플랫폼보다 높다. 필수와 추가의 차이점은 체크박스의 기본값이 체크냐 해제냐로 갈린다. 필수의 경우 기본적으로 체크하나, 추가의 경우 기본적으로 해제된 채 사용자에게 제공된다.

원하는 정보를 선택하자. 반드시 필요하다면 필수를, 그렇지 않다면 추가로 두자. 혹시 모른답시고 전체 데이터를 체크하지 말자. 물론 불가능한 건 아니지만, 추후 OAuth 키 배포 활성화 심사에서 불필요하거나 과도한 데이터 접근 허가를 요구할 경우 심사를 반려할 수도 있다. 반드시 필요한 최소한의 정보만을 요구하자.



### 로그인 오픈 API 서비스 환경

OAuth를 사용할 환경에 대해 입력한다.

해당 프로젝트는 웹을 대상으로 구축되었으므로, PC 웹으로 선택한다. Android나 iOS를 추가할 수도 있다. 여러 환경을 동시에 추가하여 하나의 키로 여러 플랫폼에 접근하는 식의 통합 관리도 가능하다.

<br />

서비스 URL은 네아로를 적용하려는 서비스의 URL이다.

Callback URL은 로그인 후 결과를 전달할 URL이다. 최대 5개까지 지정할 수 있으며, 추후 설정할 `naver.properties` 파일의 `callback`은 이 Callback URL 중 하나가 입력되어야 한다. 플랫폼 로그인 과정에서 등록되지 않은 Callback URL이 감지될 경우 오류를 출력한다.

`https://example.com/oauth2` 같은 URL의 영식을 입력하며, `https://example.com/oauth2?key=value`와 같이 임의의 URL 파라미터를 붙여도 된다.

모든 항목에 이상이 없으면 애플리케이션을 만들자.



### API 정보 확인

![image](https://user-images.githubusercontent.com/50317129/138097785-f918f5b3-2d9f-49c0-82b6-09f95c64242c.png)

애플리케이션을 만들면 API와 Secret을 확인할 수 있다. Secret은 기본적으로 마스킹되어있으며, 별도의 버튼을 눌러 확인할 수 있다. Secret이 유출되었다고 판단될 경우, 재발급을 할 수도 있다. 이 경우 당연히도 인증 서버에 변경된 Secret을 적용해야한다.





# NAVER 인증 모듈 구현하기

필요한 모든 준비가 갖춰졌으니, NAVER 인증 모듈을 구현해보자. 이전에 구현한 `AuthModule`을 상속받아 구현할 것이다.

``` java
public class NaverAuthModule extends AuthModule
{
	// NAVER 인증 모듈
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

NAVER 모듈이 구현해야하는 대상은 위와 같다.



## properties 파일 생성하기

`WEB-INF` 아래 `naver.properties` 파일을 생성한다. 기 생성된 `sample.properties`를 복사해서 사용해도 된다.

``` properties
api=API_KEY
secret=SECRET_KEY
callback=CALLBACK_URL
```

기본적인 형식은 위와 같으며, 각 항목에 해당하는 값을 입력하면 된다.



## 인증 모듈 기본 메서드 및 변수 할당하기

인증 모듈이 정상적으로 동작하기 위해선 기본적으로 지정해줘야할 메서드와 변수들이 존재한다. API 정보 설정, 인스턴스 반환같은 것들이다.

``` java
private static final String MODULE_NAME = "naver";

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

private static final NaverAuthModule INSTANCE = new NaverAuthModule(SERVICE_BUILDER);

private NaverAuthModule(ServiceBuilderOAuth20 serviceBuilder)
{
	super(serviceBuilder);
}

public static NaverAuthModule getInstance()
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
|    `INSTANCE`     |    `NaverAuthModule`    |       인스턴스       |

정의된 변수는 전부 `static final`로 선언되어 있어서, <span class="red-400">인스턴스 생성 시 한 번만 선언되며 재할당이 불가능</span>하도록 관리한다.

`static{ }` 구문을 통해 인스턴스 생성 시 API 정보를 할당하도록 구성했다.

API 할당 시 `getApiKeyBean()` 메서드를 통해 제공된 이름을 갖는 properties를 분석하여 `ApiKeyBean` 객체를 반환받아 사용한다.



## API URL 할당하기

각 API 별 요청 URL을 반환하는 메서드를 구현하자.

``` java
@Override
public String getAccessTokenEndpoint()
{
	return "https://nid.naver.com/oauth2.0/token";
}

@Override
protected String getAuthorizationBaseUrl()
{
	return "https://nid.naver.com/oauth2.0/authorize";
}

@Override
protected String getUserInfoEndPoint()
{
	return "https://openapi.naver.com/v1/nid/me";
}
```

* `getAccessTokenEndpoint()` - 토큰과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getAuthorizationBaseUrl()` - 인증과 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.
* `getUserInfoEndPoint()` - 사용자 정보와 관련된 API는 해당 메소드가 반환하는 URL을 토대로 사용한다.

OAuth2.0 서비스를 수행함에 있어서 필요한 URL은 위와 같다. 이 중 `getAccessTokenEndpoint()`과 `getAuthorizationBaseUrl()`는 scribeJAVA 라이브러리의 객체인 `DefaultApi20`의 추상 메서드고 나머지 하나가 `AuthModule`의 추상 메서드다.

`DefaultApi20`는 사용자 계정 API에 관련된 메서드를 별도로 제공하지 않는다. 하지만 `AuthModule`에서 사용자 정보 확인 공통 메서드를 사용할 때 사용자 계정 API가 반드시 필요하므로 `AuthModule`의 추상 메서드로 관리한다.



## 인증 URL 반환 메서드

<span class="blue-500">네이버 플랫폼 로그인 URL을 반환하는 기능</span>을 구현한다.

우선 API를 살펴보자.

<br />

* 요청

``` txt
GET/POST https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={:client_id}&redirect_uri={:redirect_uri}&state={:state}
```

|    parameter     | type  |   data   | required |           description           |
| :--------------: | :---: | :------: | :------: | :-----------------------------: |
| {:response_type} | path  | `String` |    Y     |    응답 타입. `code`로 고정     |
|   {:client_id}   | path  | `String` |    Y     |              API키              |
| {:redirect_uri}  | path  | `String` |    Y     |          Callback URL           |
|     {:state}     | path  | `String` |    Y     |           고유 상태값           |
|     {:scope}     | path  | `String` |          | 접근 허용 범위로, 사용하지 않음 |

<br />

* 응답

네이버 플랫폼 로그인 페이지

<br />

네이버 플랫폼 로그인 API는 위와 같다. 메서드가 요청의 URL을 반환하도록 설계하면 된다.

문자열 연산으로 URL을 직접 설계할 수도 있지만, `service.getAuthorizationUrl()` 메서드를 통해 URL을 간편하게 생성할 수 있다.

이미 `AuthModule`에 공통 메서드로 선언된 게 있으므로, <span class="red-400">따로 구현하지 않아도 된다.</span>



## 접근 토큰 반환 메서드

로그인 결과로 Code를 전달받으므로 <span class="blue-500">Access Token으로 교환하는 기능</span>을 구현한다.

네이버 API는 아래와 같다.

<br />

* 요청

``` txt
GET/POST https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={:client_id}&client_secret={:client_secret}&code={:code}&state={:state}
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
	"access_token": "AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg",
	"refresh_token": "c8ceMEJisO4Se7uGisHoX0f5JEii7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY",
	"token_type": "bearer",
	"expires_in": "3600"
}
```

|   parameter   |   data   |    description     |
| :-----------: | :------: | :----------------: |
| access_token  | `String` |     인증 토큰      |
| refresh_token | `String` |   리프레쉬 토큰    |
|  token_type   | `String` |     토큰 타입      |
|  expires_in   | `String` | 만료일자 (초 단위) |

<br />

`service.getAccessToken()` 메서드의 응답으로 위 JSON 응답의 DTO 객체인 `OAuth2AccessToken`를 얻을 수 있다.

마찬가지로 `AuthModule`에 선언된 공통 메서드를 활용하면 되므로, 굳이 <span class="red-400">구현할 필요 없다.</span>



## 접근 토큰 갱신 및 반환 메서드

Access Token은 만료시간이 한시간 정도로 매우 짧다. Access Token이 만료될 경우, 사용자에게 플랫폼 로그인을 통해 인증 정보를 다시 요구해야하지만 Refresh Token이 있다면 별도의 절차 없이 서비스 내부에서 <span class="blue-500">Access Token을 재발급</span> 받을 수 있다.

이 Refresh Token은 인증 권한은 없지만, Access Token을 재발급받는 권한을 가진다.

이를 구현한 네이버 API는 아래와 같다.

<br />

* 요청

``` txt
GET/POST https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id={:client_id}&client_secret={:client_secret}&refresh_token=${:refresh_token}
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
    "access_token":"AAAAQjbRkysCNmMdQ7kmowPrjyRNIRYKG2iGHhbGawP0xfuYwjrE2WTI3p44SNepkFXME/NlxfamcJKPmUU4dSUhz+R2CmUqnN0lGuOcbEw6iexg",
    "token_type":"bearer",
    "expires_in":"3600"
}
```

|  parameter   |   data   |    description     |
| :----------: | :------: | :----------------: |
| access_token | `String` |     인증 토큰      |
|  token_type  | `String` |     토큰 타입      |
|  expires_in  | `String` | 만료일자 (초 단위) |

<br />

`AuthModule`의 공통 메서드로 대체 가능하므로 <span class="red-400">별도로 구현하지 않는다.</span>



## 사용자 정보 응답 반환 메서드

<span class="blue-500">Access Token으로 유저 정보를 호출하는 기능</span>을 구현한다. 발급받은 Access Token을 실제로 유의미하게 쓰는 부분이다.

네이버 API는 아래와 같다.

<br />

* 요청

``` txt
GET https://openapi.naver.com/v1/nid/me
Authorization: Bearer {:access_token}
```

|    parameter    |  type  |   data   | required | description |
| :-------------: | :----: | :------: | :------: | :---------: |
| {:access_token} | header | `String` |    Y     |  접근 토큰  |

<br />

* 응답

``` json
{
	"resultcode": "00",
	"message": "success",
	"response": {
		"email": "openapi@naver.com",
		"nickname": "OpenAPI",
		"profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
		"age": "40-49",
		"gender": "F",
		"id": "32742776",
		"name": "오픈 API",
		"birthday": "10-01",
		"birthyear": "1900",
		"mobile": "010-0000-0000"
	}
}
```

|       parameter        |   data   |                                       description                                        |
| :--------------------: | :------: | :--------------------------------------------------------------------------------------: |
|       resultcode       | `String` | [API 호출 결과 코드](https://developers.naver.com/docs/common/openapiguide/errorcode.md) |
|        message         | `String` |                                     호출 결과 메시지                                     |
|      response.id       | `String` |                              동일인 식별 정보 (고유 해쉬값)                              |
|   response.nickname    | `String` |                              사용자 별명 (없을 경우 id***)                               |
|     response.name      | `String` |                                       사용자 이름                                        |
|     response.email     | `String` |                      사용자 메일 주소 (내 정보의 이메일 주소 기준)                       |
|    response.gender     | `String` |                         성별 (F - 여성, M - 남성, U - 확인불가)                          |
|      response.age      | `String` |                                          연령대                                          |
|   response.birthday    | `String` |                                       생일 (MM-DD)                                       |
| response.profile_image | `String` |                                  사용자 프로필 사진 URL                                  |
|   response.birthyear   | `String` |                                         출생연도                                         |
|    response.mobile     | `String` |                                       휴대전화번호                                       |

<br />

id는 우리가 생각하는 `xxx@naver.com` 형태의 아이디가 아니라 아이디별로 부여받는 고유 해쉬값이다.

네이버 아이디는 `response.email`로 얻을 수 있지만, 제한적이다. 만약 [<span class="lightBlue-600">내 정보</span> - <span class="lightBlue-600">연락처 이메일</span>]을 다른 메일로 변경했다면 네이버 메일이 아닌 해당 메일이 표시된다. <span class="red-400">공식적으로 프로필 API에서 네이버 메일을 확정적으로 얻을 수 있는 방법은 없다.</span>

`AuthModule`의 공통 메서드로 대체 가능하므로 <span class="red-400">별도로 구현하지 않는다.</span>



## 유저 정보 객체 반환 메서드

<span class="blue-500">네이버의 유저 정보 호출 API 응답 형식에 맞게끔 응답을 파싱</span>하여 `UserInfoBean`로 반환하는 메서드를 구현한다.

이 프로젝트에선 이름, 이메일, 프로필사진 URL만을 사용하므로, 응답에서 해당 값을 빼내어 객체에 담는다.

<br />

* 코드

``` java
@Override
public UserInfoBean getUserInfoBean(String body) throws JsonProcessingException
{
	ObjectMapper mapper = new ObjectMapper();
	
	JsonNode node = mapper.readTree(body);
	
	String email = node.get("response").get("email") == null ? "미동의" : node.get("response").get("email").textValue();
	String name = node.get("response").get("name") == null ? "미동의" : node.get("response").get("name").textValue();
	String profile_image = node.get("response").get("profile_image") == null ? "/oauth2/assets/images/logo.png" : node.get("response").get("profile_image").textValue();
	
	return new UserInfoBean(email, name, profile_image, MODULE_NAME);
}
```

<br />

응답 형식에 맞추어 필요한 값을 추출한다. 만약, 사용자가 정보 제공에 동의하지 않았을 경우 대상 객체가 `null`을 반환한다. <span class="red-600">네이버는 필수/추가에 상관없이 동의/거부를 할 수 있기 때문</span>에 데이터에 대한 `null` 처리를 반드시 해야한다.



## 연동 해제 결과 반환 메서드

네이버 아이디로 처음 로그인을 하면 정보 제공 동의를 수행하는데, 나중에 다시 로그인을 하면 이러한 동의 과정이 생략된다. 즉, 플랫폼에서 첫 로그인 시 정보 제공 동의를 받아 어딘가로부터 저장한다는 뜻이다. 만약 사용자가 서비스로부터 회원 탈퇴를 수행한다면 <span class="blue-500">네이버와의 연동을 해제하여 정보를 완전히 삭제</span>할 필요가 있다.

네이버 API는 아래와 같다.

<br />

* 요청

``` txt
GET/POST https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id={:client_id}&client_secret={:client_secret}&access_token={:access_token}&service_provider=NAVER
```

|      parameter      | type  |   data   | required |          description          |
| :-----------------: | :---: | :------: | :------: | :---------------------------: |
|    {:grant_type}    | path  | `String` |    Y     |  인증 타입. `delete`로 고정   |
|    {:client_id}     | path  | `String` |    Y     |             API키             |
|  {:client_secret}   | path  | `String` |    Y     |           Secret키            |
|   {:access_token}   | path  | `String` |    Y     |           접근 토큰           |
| {:service_provider} | path  | `String` |    Y     | 서비스 제공자. `NAVER`로 고정 |

<br />

* 응답

``` json
{
	"access_token": "c8ceMEjfnorlQwEisqemfpM1Wzw7aGp7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY",
	"result": "success"
}
```

|  parameter   |   data   |            description             |
| :----------: | :------: | :--------------------------------: |
| access_token | `String` |      삭제 처리된 접근 토큰값       |
|    result    | `String` | 처리결과. 성공일 경우 success 반환 |

<br />

* 코드

``` java
@Override
public boolean deleteInfo(String access) throws IOException, ExecutionException, InterruptedException
{
	OAuthRequest oAuthRequest = new OAuthRequest(Verb.GET, getAccessTokenEndpoint());
	oAuthRequest.addQuerystringParameter("client_id", API_KEY);
	oAuthRequest.addQuerystringParameter("client_secret", SECRET_KEY);
	oAuthRequest.addQuerystringParameter("access_token", access);
	oAuthRequest.addQuerystringParameter("grant_type", "delete");
	oAuthRequest.addQuerystringParameter("service_provider", "NAVER");
	
	service.signRequest(access, oAuthRequest);
	
	Response response = service.execute(oAuthRequest);
	
	return response.isSuccessful();
}
```

<br />

구현은 간단하다. `OAuthRequest` 객체를 활용하면 요청을 쉽게 생성할 수 있다. 응답 자체는 중요하지 않으므로 `response.isSuccessful()` 메서드로 응답이 정상적인지 여부만 판단하여 `boolean`으로 반환한다.



## 정보 제공 동의 갱신 URL 반환 메서드

서비스 운영 중 추가적인 사용자 정보가 필요하거나 필요 없을 때, <span class="blue-500">사용자 정보 동의 갱신을 통해 동의 정보를 다시 지정</span>할 수 있다.

API는 아래와 같다.

<br />

* 요청

``` txt
GET/POST https://nid.naver.com/oauth2.0/authorize?auth_type=reprompt&state=${:state}&response_type=code&client_id=${:client_id}&redirect_uri=${:redirect_uri}
```

|    parameter     | type  |   data   | required |         description          |
| :--------------: | :---: | :------: | :------: | :--------------------------: |
| {:response_type} | path  | `String` |    Y     |   응답 타입. `code`로 고정   |
|   {:client_id}   | path  | `String` |    Y     |            API키             |
| {:redirect_uri}  | path  | `String` |    Y     |         Callback URL         |
|     {:state}     | path  | `String` |    Y     |         고유 상태값          |
|   {:auth_type}   | path  | `String` |          | 인증 타입. `reprompt`로 고정 |

<br />

* 응답

네이버 플랫폼 정보 제공 동의 페이지

<br />

해당 페이지에서 정보 제공 동의여부를 재선택할 수 있다. 이후 로그인과 동일하게 `code`와 `state`를 리다이렉션 URL로 보낸다. 이후 동작은 로그인과 동일하다.



## 전체 코드

``` java
package oauth.account.module;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.builder.ServiceBuilderOAuth20;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import oauth.account.bean.ApiKeyBean;
import oauth.account.bean.UserInfoBean;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

/**
 * Naver 인증 모듈 클래스
 *
 * @author RWB
 * @since 2021.09.29 Wed 23:45:49
 */
public class NaverAuthModule extends AuthModule
{
	private static final String MODULE_NAME = "naver";
	
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
	
	private static final NaverAuthModule INSTANCE = new NaverAuthModule(SERVICE_BUILDER);
	
	/**
	 * 생성자 메서드
	 *
	 * @param serviceBuilder: [ServiceBuilderOAuth20] API 서비스 빌더
	 */
	private NaverAuthModule(ServiceBuilderOAuth20 serviceBuilder)
	{
		super(serviceBuilder);
	}
	
	/**
	 * 인스턴스 반환 메서드
	 *
	 * @return [NaverAuthModule] 인스턴스
	 */
	public static NaverAuthModule getInstance()
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
		
		String email = node.get("response").get("email") == null ? "미동의" : node.get("response").get("email").textValue();
		String name = node.get("response").get("name") == null ? "미동의" : node.get("response").get("name").textValue();
		String profile_image = node.get("response").get("profile_image") == null ? "/oauth2/assets/images/logo.png" : node.get("response").get("profile_image").textValue();
		
		return new UserInfoBean(email, name, profile_image, MODULE_NAME);
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
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.GET, getAccessTokenEndpoint());
		oAuthRequest.addQuerystringParameter("client_id", API_KEY);
		oAuthRequest.addQuerystringParameter("client_secret", SECRET_KEY);
		oAuthRequest.addQuerystringParameter("access_token", access);
		oAuthRequest.addQuerystringParameter("grant_type", "delete");
		oAuthRequest.addQuerystringParameter("service_provider", "NAVER");
		
		service.signRequest(access, oAuthRequest);
		
		Response response = service.execute(oAuthRequest);
		
		return response.isSuccessful();
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
		params.put("auth_type", "reprompt");
		
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
		return "https://nid.naver.com/oauth2.0/token";
	}
	
	/**
	 * 인증 API 요청 URL 반환 메서드
	 *
	 * @return [String] 인증 API 요청 URL
	 */
	@Override
	protected String getAuthorizationBaseUrl()
	{
		return "https://nid.naver.com/oauth2.0/authorize";
	}
	
	/**
	 * 사용자 정보 요청 URL 반환 메서드
	 *
	 * @return [String] 사용자 정보 요청 URL
	 */
	@Override
	protected String getUserInfoEndPoint()
	{
		return "https://openapi.naver.com/v1/nid/me";
	}
}
```

정리한 전체 코드는 위와 같다.





# 정리

이로써 네이버 인증 모듈 구현이 완료됐다. 현재까지는 개발 중 단계라 정해진 아이디로만 사용할 수 있다. API 설정에서 테스트 계정을 등록해야 해당 계정으로 로그인 테스트가 가능하다. 심사 이후 애플리케이션이 승인되면 모든 아이디에서 로그인이 가능하다.