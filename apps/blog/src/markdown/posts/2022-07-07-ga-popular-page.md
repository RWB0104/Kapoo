---
title: "Google Analytics API를 활용하여 내 블로그의 인기 게시글 표현하기"
excerpt: ""
coverImage: ""
date: 1655043065000
type: "posts"
category: "WEB"
tag: [ "CSR", "SSR", "SSG" ]
comment: true
publish: false
---

# 개요

게시글이 중심인 사이트를 보면, 대부분 조회수에 기반한 인기 게시글을 보여주는 기능을 제공해준다. 각 게시글마다 조회수를 저장하고, 이를 통해 가장 많은 조회수 혹은 이에 기반한 특정 조건을 만족하는 게시글을 보여주는 방식이다.

하지만, 내 블로그. 조회수 저장같은 건 없다. Serverless 방식이기 때문. GitHub를 통해 정적 호스팅만을 수행할 뿐, 서버에 그 이상의 어떤 연산도 기대할 수 없는 구조다. 때문에 능동적인 방문자수 계산은 불가능한 상황이다.

![null](https://user-images.githubusercontent.com/50317129/178286896-bbe0f6b4-c166-4f85-89e2-baf5e86835c0.png)

이 때문에 언제나 고민만 하고 있었는데, 어느날 평소처럼 Google Analytics 페이지를 보면서 방문자수 추이를 살펴보다 "생각해보니 내가 필요한 데이터가 이미 여기 있는데?"란 생각이 들었다. 아마 Google Analytics 정도 되는 서비스라면 API도 있을거라 판단. 이를 잘만 활용한다면 내가 원하는 인기 게시글 목록을 구현하기에 충분할 것이다.

<br />
<br />
<br />










# 인기 게시글 구현하기

GA 데이터를 통해 인기 게시글을 구현해보자.

<br />
<br />





## 1. GA 호출용 Google OAuth 인증키 발급하기

우리가 호출하려는 데이터는 사용자 기반 데이터다. 즉, 단순히 URL을 호출한다고 아무렇게나 주는 데이터가 아니란 뜻이다. 따라서 API를 호출하기 위해 인증 객체가 필요할 것이다.

Google은 OAuth 2.0 기반의 인증 체계를 구축하고 있으므로, 이를 위해 인증키를 발급받아야 한다. Google 인증키는 [Google Cloud Platform](https://console.cloud.google.com/)에서 발급받을 수 있다.

<br />



### (1) 프로젝트 생성하기

![null](https://user-images.githubusercontent.com/50317129/178294331-21a6203d-6104-416f-9be0-04e57ae2dddd.png)

만약, 아예 처음이라 아무런 절차도 진행하지 않았다면 <span class="blue-400">[새 프로젝트]</span>를 하나 생성하자. 프로젝트는 GCP의 작업 단위다.

<br />



### (2) GA Data API 라이브러리 활성화하기

![null](https://user-images.githubusercontent.com/50317129/178295143-510fb537-8aa7-41ea-9ff9-eb8ed517198e.png)

프로젝트 생성이 완료됐다면, 이제 해당 프로젝트에서 필요한 작업들을 진행할 수 있다. GA를 바로 사용할 수 있는 건 아니고, 생성한 프로젝트에서 GA 라이브러리를 활성화해야한다.

상단의 <span class="blue-400">[+ API 및 서비스 사용 설정]</span>을 클릭하자

<br />

![null](https://user-images.githubusercontent.com/50317129/178295340-21c5d216-5077-441e-9f5b-8f53e5455570.png)

<span class="blue-400">[Google Analytics Data API]</span>를 활성화한다. 해당 행을 클릭해서 사용하면 된다.

<br />



### (3) OAuth 동의 화면 설정하기

OAuth 키를 발급받기 위해선 OAuth 동의 화면을 먼저 설정해야한다. <span class="blue-400">[OAuth 동의 화면]</span> 메뉴에서 설정할 수 있다.

![null](https://user-images.githubusercontent.com/50317129/178296158-b0df1134-41cf-434f-a30e-966c85341982.png)

유저 타입은 <span class="green-600">[내부]</span>로 설정하자. 어디 외부에서 사용할 서비스는 아니기 때문이다.

<br />

![null](https://user-images.githubusercontent.com/50317129/178296496-c63f0186-a86c-48f7-96eb-c0a15a426f58.png)

이후 필요한 정보를 기입한다. Google에 제출해서 심사하고 그럴 필요는 없으므로 그냥 적당히 적으면 된다.

단, 승인된 도메인은 블로그의 루트 도메인을 입력한다. 예를 들어, 현재 이 블로그의 도메인은 **blog.itcode.dev**이므로, 이 도메인의 루트 도메인인 **itcode.dev**를 입력하면 된다. `https://`와 같은 프로토콜은 생략하고 오로지 루트 도메인만 입력한다.

<br />

![null](https://user-images.githubusercontent.com/50317129/178297915-40edd535-b389-400a-8016-5371881ab263.png)

다음으로 OAuth에서 활용할 데이터의 범위를 선택하는데, 필요한 범위는 아래와 같다.

* `/auth/userinfo.email`: 계정 이메일 주소 확인
* `/auth/userinfo.profile`: 개인정보
* `/auth/analytics.readonly`: GA 데이터 (읽기 전용)

GA 데이터를 가져오기만 하면 되므로, readonly로 지정했다.

<br />



### (4) 테스트 사용자 설정하기

![null](https://user-images.githubusercontent.com/50317129/178298453-2fa516b5-af46-4b00-a351-a35aa673193d.png)

테스트 사용자로 내 계정을 추가한다. 해당 리스트에 등록된 계정만 API키 사용이 가능하다.

모든 절차가 완료됐다면, OAuth 클라이언트 ID를 생성할 수 있다.

<br />



### (5) OAuth 클라이언트 ID 생성하기

![null](https://user-images.githubusercontent.com/50317129/178304035-e0193268-089a-4114-940a-3ffaea703456.png)

OAuth 서비스를 사용하기 위한 클라이언트 ID를 생성한다.

<br />

![null](https://user-images.githubusercontent.com/50317129/178304237-81398f92-2e98-493f-bfc5-71fdaaa2cc7a.png)

필요한 정보를 입력한다. <span class="blue-400">[승인된 리디렉션 URI]</span>는 블로그 URL을 입력한다. 예시로 이 블로그의 경우 `https://blog.itcode.dev`와 같이 입력한다.

OAuth 서비스 활용 시 요청 URL을 확인하므로, 등록된 URL에서 온 요청이 아닐 경우 응답을 거부하므로 주의할 것.

키가 생성되면 <span class="red-500">클라이언트 ID</span>와 <span class="red-500">클라이언트 보안 비밀키</span>를 확인할 수 있으며, 이로써 OAuth 클라이언트 ID 발급이 끝난다.

<br />



### (6) 프로덕션 활성화하기

기본적으로 프로젝트를 생성하면 테스트 모드로 생성된다. 테스트 모드는 별다른 심사를 거치지 않지만, 대신 API키를 사용하는 데 있어 여러 부분에 제약이 생긴다. 이를테면 사전에 등록된 테스트 계정만 API키를 사용할 수 있는 식.

문제는 테스트 모드일 경우, 발급받는 Refresh Token의 만료시간이 일주일로 제한된다. 이는 [해당 링크](https://developers.google.com/identity/protocols/oauth2#expiration)에서 확인할 수 있다.

`A Google Cloud Platform project with an OAuth consent screen configured for an external user type and a publishing status of "Testing" is issued a refresh token expiring in 7 days.`

Google은 위와 같이 테스트 모드일 경우, Refresh Token의 만료시간이 7일로 제한된다고 안내하고 있다.

그 말인 즉슨, 테스트 모드의 Refresh Token을 사용할 경우 일주일마다 해당 토큰을 교체해줘야 한다는 문제점이 생긴다. 필자는 이 차이를 몰라서 한 동안 토큰이 만료되어 인기 게시글을 보여주지 못 했다.

<br />

[OAuth 동의 화면] 메뉴에서 [앱 개시] 버튼을 클릭해 게시 상태를 변경한다.

정상적인 사용을 위해선 앱 심사를 거쳐야한다. 하지만 우리가 사용하는 Scope인 `/auth/analytics.readonly`는 Google의 Scope 중 민감한 범위에 해당하므로, API의 활용 시연을 YouTube에 올려야한다...

프로덕션 프로젝트가 심사를 아직 받지 않았을 경우, 위와 같이 경고 페이지가 뜨며, 직접 링크를 눌러 넘어갈 수 있다.

어차피 불특정 다수에게 공개할 것도 아니고, 자신이 직접 Refresh Token을 딱 한 번 발급받아 사용할 예정이므로 심사없이 사용해도 큰 문제는 없다.

<br />
<br />





## 2. 클라이언트 ID를 통해 Refresh Token 발급하기

OAuth의 인증 객체는 보통 **Access Token**과 **Refresh Token**으로 나뉜다.

* Access Token - 실질적인 인증 정보가 담긴 토큰. 만료시간이 짧다.
* Refresh Token - Access Token을 재발급받기 위한 토큰. 만료시간이 길거나, 없다.

정상적이라면 클라이언트 ID를 통해 Access Token을 발급받아 사용할 것이다. 하지만, 해당 키는 내 블로그에서만 하드코딩하여 사용할 예정이므로, 그냥 Refresh Token을 미리 발급받아 사용하는 것이 편하다.

생성한 클라이언트 ID를 통해 Refresh Token을 발급받아보자.

<br />

![null](https://user-images.githubusercontent.com/50317129/178307598-b5e307be-d648-42a9-8f2a-ea0f632452ec.png)

[Google OAuth Playground](https://developers.google.com/oauthplayground/)는 Google API를 테스트할 수 있는 사이트다.

직접 로그인하거나, 기존에 보유하고 있는 클라이언트 ID를 활용해서 API를 테스트할 수 있다. 이 사이트에서 우리가 발급받은 클라이언트 ID를 통해 Refresh Token을 발급받을 수 있을 것이다.

> **잠깐!**  
> 승인된 리디렉션 URL에 [https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)를 추가해야한다.

<br />

![null](https://user-images.githubusercontent.com/50317129/178308027-4bbe1627-bd6c-4927-a1e9-bf96dd60f27c.png)

상단 우측 톱니바퀴 버튼을 통해 보유한 클라이언트 ID를 임의로 지정할 수 있다.

<span class="blue-400">[Use your own OAuth credentials]</span>를 체크하면 입력 폼이 나온다. 여기에 이전 절차에서 발급받은 클라이언트 ID, 비밀키를 입력한다.

이후 우측 목록에서 [Google Analytics API v3]를 클릭하고, 하위 목록 중 [https://www.googleapis.com/auth/analytics.readonly]를 선택한다.

이후 [Authorize APIs]를 클릭하면 Authorization code를 발급받을 수 있다. 이 과정에서 Google 로그인을 수행하는데, 테스트 서비스이므로, 안전하지 않은 환경이라는 경고가 뜬다. [계속] 버튼을 클릭하면 사용이 가능하다.

URI가 허용되지 않았거나, 테스트 대상 계정으로 로그인하지 않았을 경우 관련 오류가 뜨므로 주의할 것.

<br />
<br />





## 3. Refresh Token으로 Access Token 발급받기

이제 Refresh Token을 발급받았으니, 실제 인증 정보가 담겨있는 Access Token을 발급받을 수 있다.

``` txt
POST https://oauth2.googleapis.com/token?
grant_type=refresh_token
&client_id={:client_id}
&client_secret={:client_secret}
&refresh_token={:refresh_token}
```

블로그 게시물 중 OAuth에 대해 다룬 글인 [[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 5. Google OAuth 서비스 신청 및 모듈 구현하기](https://blog.itcode.dev/posts/2021/10/23/oauth2-java-server-5#%EC%A0%91%EA%B7%BC-%ED%86%A0%ED%81%B0%20%EA%B0%B1%EC%8B%A0%20%EB%B0%8F%20%EB%B0%98%ED%99%98%20%EB%A9%94%EC%84%9C%EB%93%9C)에서 API에 대한 자세한 내용을 참고할 수 있다.

``` json
{
    "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
    "expires_in": 3920,
    "scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
    "token_type": "Bearer"
}
```

응답은 위와 같은 형식으로 제공된다. 이 중 우리가 필요한 것은 당연히 `access_token`이다.

<br />
<br />





## 4. Google Analytics 인기 조회수 데이터 호출하기

Access Token이 준비됐으니, 이제 Google Analytics 데이터를 호출해보자. 우리가 필요한 데이터는 게시글 별 조회수 데이터다. 이를 호출하는 API는 아래와 같다.

``` txt
POST https://content-analyticsdata.googleapis.com/v1beta/properties/{:project_id}:runReport?alt=json
Authorization: {:access_token}
```

``` json
{
	"dateRanges": [
		{
			"endDate": "today",
			"startDate": "30daysAgo"
		}
	],
	"dimensionFilter": {
		"filter": {
			"fieldName": "pagePath",
			"stringFilter": {
				"matchType": "BEGINS_WITH",
				"value": "/posts/2"
			}
		}
	},
	"dimensions": [
		{ "name": "pagePath" }
	],
	"limit": "10",
	"metricAggregations": [
		"TOTAL"
	],
	"metrics": [
		{ "name": "active28DayUsers" }
	]
}
```

- `dateRanges`: 데이터의 날짜 구간
- `dimensionFilter`: 데이터의 필터링. 필터에 해당하는 데이터만 호출이 가능하다.
- `dimensions`: 데이터의 요소. 여기서는 `pagePath`라는 페이지의 URL 데이터를 호출한다.
- `limit`: 데이터의 갯수
- `metricAggregations`: metric 집계 방식. 여기서는 `TOTAL`이라는 metric의 전체값을 추가로 호출한다.
- `metrics`: 보고서의 측정값 배열. 여기서는 `active28DayUsers`라는 28일 동안의 고유 활성 유저 수를 호출한다. 최대 10개의 metric을 지원한다.