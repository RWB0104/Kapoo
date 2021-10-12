---
title: "[OAuth2.0] ScribeJAVA로 OAuth2.0 인증서버 구축하기 - 1. OAuth2.0이란?"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/134931033-89954c3d-5e00-4b3b-85aa-54a1dfa29e46.png"
date: "2021-10-12T13:17:24"
type: "posts"
category: "JAVA"
tag: [ "JAVA", "OAuth2.0" ]
group: "OAuth2.0 인증서버 구축기"
comment: true
publish: true
---

# 개요

사이트를 돌아다니다보면 로그인이 필요한 사이트를 심심치않게 만나볼 수 있다. 그리고 이런 사이트들은 대부분 "네이버로 로그인하기"와 같은 플랫폼 로그인을 제공한다. 사이트 뿐만 아니라 근래 들어 출시되는 앱 역시 대부분 플랫폼을 통한 인증 서비스를 제공한다.

-- 사진 --

이를 활용하면 매우 간단한 절차를 통해 회원가입 또는 로그인을 수행할 수 있게 된다. 이러한 서비스는 네이버 뿐만 아니라 Google, 카카오 등 어느정도 규모있는 플랫폼의 대부분은 이러한 "플랫폼으로 로그인하기"와 같은 기능을 제공한다.

이렇게 플랫폼의 정보를 활용하여 타 사이트에서 인증을 수행하는 것을 OAuth 프로토콜이라 한다.

# OAuth

OAuth는 Open Authentication의 약자로, 인증을 위한 표준 프로토콜이다.

이전의 인증 방식은 사이트 혹은 애플리케이션에 직접 회원가입을 수행하여 내 정보를 제공하고, 비밀번호를 통해 인증하는 비밀번호 인증 방식을 취한다. 물론 이 비밀번호 인증 방식은 인터넷의 초창기부터 지금까지 사용하는 기법이지만, 그렇다고 문제가 아주 없는 것은 아니였다.

* 서비스마다 운영되는 중구난방적인 인증 시스템
* 사이트의 신뢰성 문제
* 인터넷을 사용할수록 과적되는 인증 정보

OAuth 이전에는 이렇다할 인증 표준이 존재하지 않았다. 표준이 없다보니 인증 시스템은 서비스마다 개성이 넘처흘렀다. 사이트마다 요구하는 정보, 방식이 천차만별로 다르니 사용자 입장에서는 매우 혼란스러울 것이다.

그래도 이 점은 나름 사이트를 구분할 수 있는 일종의 척도(?)가 되기도 한다만, 더 큰 문제는 해당 사이트를 신뢰할만한 지표가 전혀 없다는 것이다. 내 정보를 왜 가져가는지, 어떻게 보관하는지 알 길이 없는 사용자들은 울며 겨자먹기로 서비스에게 내 정보를 제공하게 된다.

이런 사이트들을 조금만 돌아다니면서 상호작용을 하다보면, 나도 모르는 새에 계정정보가 쌓여있을 것이다. 인증의 주체가 되는 "나"는 하나인데, 인증 표준의 부재로 인해 각 서비스마다 나 자신을 인증하기 위한 여러 방법을 소유하게되는 것이다.

<br />

이러한 비효율성을 타파하기 위해 Twitter 주도하에 인증 표준이 설립되었고, 이 것이 OAuth의 시초다.

OAuth는 1.0을 시작으로, 1.0에 세션 고정 공격이라는 보안 취약점이 발견됨에 따라 현재는 2.0을 사용하고 있다.

# OAuth Workflow

OAuth2.0은 그 방식에 따라 4가지 방식으로 구분한다.

이를 설명하기 앞서 OAuth에서 사용하는 키워드에 대해 알아보자

|      키워드      |                             의미                             |
| :--------------: | :----------------------------------------------------------: |
|       User       |                            사용자                            |
|     Consumer     |               OAuth를 제공하는 서비스 (웹 등)                |
| Service Provider |                OAuth 서비스 제공자 (NAVER 등)                |
|   Access Token   | Consumer가 Service Provider의 자원에 접근하기 위한 인증 코드 |
|  Refresh Token   |             Access Token을 재발급하기 위한 코드              |

아마 대부분 User의 범주에 속해있을 것이다. 우리는 OAuth를 활용해 궁극적으로 Consumer가 되는 웹 서비스를 만들 계획이다.

## Authorization Code Grant

OAuth2.0을 구현하는데 있어 가장 보편적인 방식이다. 사용자가 직접 

## Implicit Grant

## Resource Owner Password Credentials Grant

## Client Credentials Grant