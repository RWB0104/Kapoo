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

DBMS는 다양한 데이터를 저장하는 저장소 역할을 한다. 필요한 데이터를 DBMS에 저장하고, 이를 적재적소에 꺼내어 데이터를 다룰 수 있다. 웹 서버와 DBMS를 연동하면 사용자의 계정 정보, 설정 등을 저장하고 활용할 수 있다.

HTTP 소켓 통신은 기본적으로 요청이 끝나는 순간 모든 데이터가 소멸된다. 즉, 내 브라우저와 웹 사이에서 일어나는 모든 상호작용은 해당 페이지가 닫히는 순간 사라진다는 뜻이다. 