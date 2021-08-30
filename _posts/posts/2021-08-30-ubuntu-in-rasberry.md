---
title: "[라즈베리파이 4] 라즈베리파이에 Unbuntu 설치하기"
excerpt: "개발자의 적지않은 수가 클라우드든, 디바이스든 자신만의 서버를 구축하여 다양하게 활용하고 있다. 개발을 하다보면 필연적으로 24시간 언제나 가동되는 서버 비스무리한 것이 필요할 때가 있다. 일례로 GitHub Pages의 경우 정적 페이지만 호스팅해줄 뿐, 백엔드나 DB는 사용할 수가 없어 동적 페이지 호스팅은 불가능하다. 그러나 개인 API 혹은 DB 서버가 존재한다면, 해당 서버와의 통신을 통해 더욱 동적 페이지 호스팅이 가능하다. 웹에서 백엔드가 갖는 역할을 생각해본다면, 개인이 활용 가능한 서버가 있고 없고의 차이는 천지차이가 난다. 나 역시도 개발하는 입장에서 제약없이 사용할 수 있는 서버의 소요가 이전부터 있어왔고, 개인 서버를 구축하기 위한 방안을 모색했다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-08-29T13:41:41"
type: "posts"
category: "알고리즘"
tag: [ "라즈베리파이", "Ubuntu" ]
group: "라즈베리파이"
comment: true
publish: true
---

# 개요

목요일을 기점으로 모든 준비물의 배송이 완료됐다. 클린 상태의 라즈베리파이는 OS가 별도로 깔려있지 않은 FreeDOS 상태이므로, 직접 OS를 설치해야한다. 컴퓨터도 주기적으로 포맷하고, 가상머신도 몇 개 돌려본 나로썬 크게 문제될 건 없지만, 이건 내가 지금까지 다루던 컴퓨터와는 좀 다르다는점이 흠.

한 번도 다뤄보지 않은 장비인데다, 일반적인 데스크탑에 비해 여러 차이점과 제약사항이 있어 그리 순탄하진 않았다.

# Rasbian? Ubuntu?

라즈베리파이는 전용 OS인 <span class="pink-600">Rasbian</span>이 존재한다. Rasbian은 라즈베리파이에 가장 최적화된 OS이므로 라즈베리파이의 네이티브한 영역을 쉽게 다룰 수 있을 것이다.

하지만 난 라즈베리파이를 다룬다기보단 라즈베리파이를 통해 서버를 구축할 예정이므로, Rasbian보단 훨씬 범용적인 OS가 알맞다. 이를테면 CentOS 같은 거 말이다.

그 중에서 내가 선택한 OS는 Ubuntu. CentOS는 RHEL에서 인수한 뒤 CentOS의 가장 큰 장점인 RHEL과의 동일성을 아작내놨다. 굳이 쓸 필요가 없어진 셈.

때문에 이전부터 써보고 싶기도 했고, 한국인에게 가장 친숙한 Linux인 Ubuntu를 설치하고자 한다.

익숙하지 않은 라즈베리파이로의 설치는 물론 관련 정보들을 쉽게 얻을 수 있을 것이다.

# 라즈베이파이에 Ubuntu 설치하기

본격적으로 라즈베리파이에 Ubuntu를 설치해보자.

## 준비물

* Rasberry Pi 4 Model B
* 전원 케이블 (5V 3A 이상)
* MicroSD, 리더기 (구형 펌웨어일 경우)
* Micro HDMI, 혹은 HDMI 케이블 (모니터 쓸 경우)

준비물은 위와 같다.

원래 기본적으로 라즈베리파이는 MicroSD 이외에는 인식하지 않는다. USB같은 외장 디스크를 인식하려면 펌웨어의 업데이트가 필요하다.

<span class="red-600">2020년 8월 이후 출시된 보드의 경우 펌웨어가 기본적으로 업데이트</span>된다고 한다. 난 중고로 샀는데, 8월 이전 출시된 보드인지 USB를 바로 인식하지 않았었다.

펌웨어 업데이트는 OS설치 후 가능하므로, 만약 <span class="red-600">구형 보드라면 얄쨜없이 MicroSD가 필요</span>하니 참고할 것.

<br />

라즈베리파이는 기본적으로 Micro HDMI라고 하는 작은 단자를 제공한다.

![image](https://user-images.githubusercontent.com/50317129/131310544-4fc47a26-b541-45e1-ac8c-4586bcbdc978.png)

위 사진의 좌측 단자가 일반적으로 알고있는 HDMI, 우측의 작은 단자가 Micro HDMI다. Argon M2 케이스의 경우 Micro HDMI와 연결된 HDMI 단자를 제공해주므로 상관없었으나, 별도의 케이스나 커넥터 없이 모니터를 연결할 경우 위 사진과 같은 <span class="amber-500">Micro HDMI to HDMI</span> 케이블이 필요하니 주의할 것.

## Ubuntu 설치파일 다운로드

디스크에 Ubuntu를 설치하기위해 아래 두 파일을 다운로드하자.

* [이미지 레코더 BalenaEtcher 다운로드](https://www.balena.io/etcher/)
* [Ubuntu ISO 다운로드](https://ubuntu.com/download/raspberry-pi)

이미지 레코더는 부팅 디스크를 만들어준다. Windows 포맷 USB를 만드는 과정이라고 생각하면 된다.

Ubuntu는 Linux이므로, 위 경로에서 쉽게 다운로드 받을 수 있다.

* Ubuntu Server: 