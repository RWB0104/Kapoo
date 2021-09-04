---
title: "[라즈베리파이 4] 라즈베리파이에 HTTPS 통신 제공하기"
excerpt: "지금까지 과정을 거치면서 라즈베리파이에 OS를 설치하고, Tomcat을 구동하여 웹 서버로 동작할 수 있도록 환경을 구축했다. 이제 우리는 라즈베리파이의 IP로 접속하여 웹 사이트를 호스팅할 수 있다. 하지만 정상적인 페이지라면 IP를 입력하여 접속하지 않는다. Domain을 발급받아 IP에 연동하고, 이를 URL 주소로 사용할 것이다. 이 장에서는 Domain을 직접 구입하고 라즈베리파이 서버에 이를 연동한다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-09-04T12:09:04"
type: "posts"
category: "Ubuntu"
tag: [ "라즈베리파이", "Ubuntu", "Tomcat(톰캣)" ]
comment: true
publish: false
---

# 개요

이전 장에서 Google Domains를 통해 `dev` 도메인을 발급받았다. 이 블로그의 주소는 실제로 구입한 https://blog.itcode.dev 도메인이 적용되어있다.

`dev` 도메인은 강화된 보안정책이 적용되어있다. 해당 도메인으로의 모든 HTTP 통신은 반드시 HTTPS 보안 통신으로만 제공된다. 네트워크 계층에서 https 프로토콜로 라우팅하므로 좋든 싫든 HTTPS 서비스를 제공해야만 한다.

<br />

이 장에서는 Let's Encrypt로 SSL 인증서를 발급받아 라즈베이파이서버의 Tomcat에 적용한다. 기존의 1:1 도메인 매칭 SSL이 아니라, 여러 서브도메인에 전부 대응 가능한 와일드카드 인증서를 받을 것이다.

> 