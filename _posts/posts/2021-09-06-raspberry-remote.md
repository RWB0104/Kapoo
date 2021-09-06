---
title: "[라즈베리파이 4] 원격 환경 구축하기 (SSH, RDP)"
excerpt: "이전 장에서 Google Domains를 통해 dev 도메인을 발급받았다. 이 블로그의 주소는 실제로 구입한 https://blog.itcode.dev 도메인이 적용되어있다. dev 도메인은 강화된 보안정책이 적용되어있다. 해당 도메인으로의 모든 HTTP 통신은 반드시 HTTPS 보안 통신으로만 제공된다. 네트워크 계층에서 https 프로토콜로 라우팅하므로 좋든 싫든 HTTPS 서비스를 제공해야만 한다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-09-06T16:50:40"
type: "posts"
category: "RaspberryPi"
tag: [ "라즈베리파이", "Ubuntu", "SSH", "RDP" ]
comment: true
publish: true
---

# 개요

이제 얼추 라즈베리파이에 그럴듯한 웹서버 환경이 구축됐다. 하지만 라즈베리파이를 다루기 위해서 기기에 직접 모니터랑 키보드, 마우스를 연결해서 쓰긴 좀 번거롭다.

이 주제에서의 라즈베리파이는 어디까지나 서브로 운영되는 웹서버이므로, 메인 컴퓨터가 될 수 없다. 즉, 개발같은 대부분의 작업은 메인 컴퓨터에서 진행하고, 배포만 서버가 담당하는 방식이다. 이렇게 디바이스가 서로 나뉠 경우, 두 디바이스의 접근이 서로 원활해야한다.

한 마디로, 원격 환경이 필요하다. 이 장에서는 라즈베리파이에 원격 환경을 구축한다. SSH, RDP 통신을 구축함으로써 SSH 혹은 윈도우 PC 어디에서나 라즈베리파이에 접근할 수 있도록 구성한다.

# Ubuntu에서의 SSH

비록 우리가 Ubuntu Desktop을 설치해서 윈도우에 가깝게 보이지만, 사실 뜯어보면 결국 콘솔 기반의 Linux다. Ubuntu Desktop의 UI는 GNOME을 통해 CLI를 GUI로 포팅한 것이다.

Linux의 이러한 CLI 환경은 SSH