---
title: "[라즈베리파이 4] MariaDB 구축하기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-09-08T22:40:38"
type: "posts"
category: "RaspberryPi"
tag: [ "라즈베리파이", "Ubuntu", "MariaDB", "RDBMS" ]
comment: true
publish: true
---

# 개요

드디어 라즈베리파이 개발환경 구축의 마지막 장이다. 라즈베리파이에 DBMS를 구축한다.

DBMS는 다양한 데이터를 저장하는 저장소 역할을 한다. HTTP 통신은 연결이 끊기는 순간 대부분의 데이터가 소실된다. 물론 쿠키나 Local/Session Storage를 활용하면 어느정도 데이터를 보존할 수 있지만, 상당히 제한적으로 동작한다.

