---
title: "[라즈베리파이 4] 원격 환경 구축하기 (SSH, RDP)"
excerpt: "이제 얼추 라즈베리파이에 그럴듯한 웹서버 환경이 구축됐다. 하지만 라즈베리파이를 다루기 위해서 기기에 직접 모니터랑 키보드, 마우스를 연결해서 쓰긴 좀 번거롭다. 이 주제에서의 라즈베리파이는 어디까지나 서브로 운영되는 웹서버이므로, 메인 컴퓨터가 될 수 없다. 즉, 개발같은 대부분의 작업은 메인 컴퓨터에서 진행하고, 배포만 서버가 담당하는 방식이다. 이렇게 디바이스가 서로 나뉠 경우, 두 디바이스의 접근이 서로 원활해야한다. 한 마디로, 원격 환경이 필요하다. 이 장에서는 라즈베리파이에 원격 환경을 구축한다. SSH, RDP 통신을 구축함으로써 SSH 혹은 윈도우 PC 어디에서나 라즈베리파이에 접근할 수 있도록 구성한다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-09-08T22:40:38"
type: "posts"
category: "RaspberryPi"
tag: [ "라즈베리파이", "Ubuntu", "SSH", "RDP" ]
comment: true
publish: true
---

# 개요

이제 얼추 라즈베리파이에 그럴듯한 웹서버 환경이 구축됐다. 하지만 라즈베리파이를 다루기 위해서 기기에 직접 모니터랑 키보드, 마우스를 연결해서 쓰긴 좀 번거롭다.

이 주제에서의 라즈베리파이는 어디까지나 서브로 운영되는 웹서버이므로, 메인 컴퓨터가 될 수 없다. 즉, 개발같은 대부분의 작업은 메인 컴퓨터에서 진행하고, 배포만 서버가 담당하는 방식이다. 이렇게 디바이스가 서로 나뉠 경우, 두 디바이스의 접근이 서로 원활해야한다.

한 마디로, 원격 환경이 필요하다. 이 장에서는 <span class="amber-600">라즈베리파이에 원격 환경을 구축</span>한다. <span class="primary">SSH</span>, <span class="primary">RDP</span> 통신을 구축함으로써 SSH 혹은 윈도우 PC 어디에서나 라즈베리파이에 접근할 수 있도록 구성한다.

# SSH 환경 구축하기

<span class="primary">SSH(Secure SHell)</span>는 네트워크에 연결된 PC에 로그인하여 원격 PC에서 해당 PC로 명령어를 실행하는 등의 Shell 통신을 수행하는 프로토콜이다.

SSH 환경을 구축하여 원격으로 Ubuntu Shell에 접근할 수 있다. 이를 통해 원격으로 명령어를 입력하여 Ubuntu를 다룰 수 있다. Windows와 달리 Linux는 거의 모든 프로그램이 명령어 기반으로 동작하므로 어려움없이 Ubuntu를 다룰 수 있다.

## 준비물

* openssh-server 패키지
* SSH(22) 서비스 포트 개방

## OpenSSH Server 패키지 설치

OpenSSH 패키지는 크게 두 가지가 있는데, 하나는 OpenSSH Client, 다른 하나는 OpenSSH Server다.

* <span class="teal-500">OpenSSH Server</span> - 해당 OS에 SSH 서비스 환경을 구축함
* <span class="teal-500">OpenSSH Client</span> - 타 PC의 SSH 접속 기능을 추가함

OpenSSH Server를 설치하여 Ubuntu에 SSH에 접근할 수 있도록 환경을 구성하자.

``` bash
sudo apt-get install -y openssh-server
```

설치후 추가로 해야할 작업은 없다.

## 포트 개방

SSH가 서비스되는 포트를 개방한다. 기본적으로 22번 포트를 사용한다.

``` bash
sudo ufw allow 22
```

ufw를 통해 22번 포트를 개방한다.

## SSH 접속하기

다른 PC에서 Ubuntu로 접속해보자. Windows 혹은 다른 Linux 기반 OS 등, SSH 프로토콜을 사용할 수 있는 모든 OS 및 프로그램이라면 가능하다.

``` bash
ssh username@xxx.xxx.xxx.xxx
```

위 명령어를 통해 입력한 IP와 계정명으로 접근을 시도할 수 있다. IP는 라즈베리파이의 IP를, 계정명은 라즈베리파이의 계정명을 입력하면 된다. IP 대신 도메인을 입력해도 된다.

![image](https://user-images.githubusercontent.com/50317129/132518427-796d71c2-7331-4a99-8d7f-65eef29344bb.png)

접속정보가 유효하다면 비밀번호를 입력하여 로그인을 수행해야한다. 로그인이 완료되면 Shell에 명령어를 입력할 수 있으며, 이를 통해 원격지에서도 Ubuntu를 다룰 수 있게된다.

# RDP 환경 구축하기

<p class="red-500" align="center">※ Ubuntu에 UI가 존재하는 Ubuntu Desktop 혹은 이에 준하는 UI 패키지가 설치된 OS에만 적용 가능합니다.</p>

비록 Ubuntu가 대부분의 동작을 명령어로만 처리할 수 있긴 하지만, 간혹 몇몇 작업들은 반드시 UI가 필요하기도 하다. 이를테면 브라우저로 리눅스에서의 웹 페이지를 디버깅한다던가, 동영상을 본다던가. 혹시 Oracle DBMS를 설치하고자 한다면 반드시 UI를 사용할 수 있는 환경이 필요하다.

심지어 우리가 설치한 Ubuntu도 UI가 있는데, 기껏 설치한 UI는 놀리고 SSH만 쓰기도 난감하다. 물론 라즈베리파이에 HDMI를 연결해서 쓰면 된다지만, 그 것도 번거롭긴 마찬가지다.

내 경우 듀얼모니터를 사용하고 있어서 여건이 나쁘진 않다. 그러나 모니터가 하나라면 라즈베리파이를 연결한 순간 원래 PC는 사용이 제한되버린다.

<br />

![image](https://user-images.githubusercontent.com/50317129/132518566-fb8858ce-0b0c-4483-9a84-c3dc718f3e5f.png)

Windows에는 <span class="primary">원격 데스크톱 연결</span>이라는 기능이 존재한다. Windows 간 원격이 가능한 기능으로써, 팀뷰어나 AnyDesk를 생각하면 된다. 일종의 내장 원격 프로그램.

말로만 들어보면 왠지 Windows 간 통신만 지원할 것 같다. 필자도 그렇게 생각했었다. 하지만 Ubuntu는 내 생각 이상으로 잡다한게 많았다. xrdp 패키지를 설치하면 Windows의 RDP와 통신이 가능하다.

## 준비물

* xrdp 패키지
* RDP(3389) 서비스 포트 개방

## xrdp 패키지 설치

``` bash
sudo apt-get install -y xrdp
```

위 명령어를 입력하여 설치한다.

## 포트 개방

RDP가 서비스되는 포트를 개방한다. 기본적으로 3389번 포트를 사용한다.

``` bash
sudo ufw allow 3389
```

ufw를 통해 3389번 포트를 개방한다.

## RDP 접속하기

다른 Windows PC에서 Ubuntu로 접속해보자. 시작 프로그램에서 <span class="blue-400">[원격 데스크톱 연결]</span>을 입력하여 프로그램을 실행하자.

![image](https://user-images.githubusercontent.com/50317129/132518999-0293653c-ccef-4181-a084-71022f83fc47.png)

Ubuntu IP를 입력하여 연결한다. 정상적으로 연결되면 Ubuntu의 접속정보를 통해 로그인을 수행한다.

![image](https://user-images.githubusercontent.com/50317129/132519253-e4ec536d-d6a4-4fea-8905-50451a892a5b.png)

접속에 성공하면 원격으로 Ununtu UI를 다룰 수 있게 된다. 하지만 여러 기술적 한계와 효용성으로 인해 성능이 그리 좋지는 않은 것 같다. 끊김 현상이 좀 심한 것으로 보인다.

## 검은 화면만 나와요!

분명히 정상적으로 잘 접속했는데, <span class="red-500">검은화면만 뜨는 경우가 발생</span>하기도 한다.

꽤 유명한 이슈로, 설정 몇 개만 수정하면 해결된다.

``` bash
sudo vi /etc/xrdp/startwm.sh

# 파일의 맨 아랫 줄에 아래 내용 추가
unset DBUS_SESSION_BUS_ADDRESS
unset XDG_RUNTIME_DIR

test -x /etc/X11/Xsession && exec /etc/X11/Xsession
exec /bin/sh /etc/X11/Xsession

# 파일 저장
:wq
```

`/etc/xrdp/startwm.sh` 파일에 위 내용을 추가하고 저장하면 된다.

``` bash
service xrdp restart
```

이후 서비스를 재시작하고 시도하면 정상적으로 접속될 것이다.

# 목표

* <del class="grey-400">라즈베리파이에 Ubuntu 서버를 구축한다.</del>
* <del class="grey-400">Tomcat을 구동하여 페이지를 호스팅한다.</del>
* <del class="grey-400">도메인을 입힌다.</del>
* <del class="grey-400">SSL 인증서를 발급하여 HTTPS 통신을 제공한다.</del>
* <del class="grey-400">SSH, RDP 등의 원격 통신환경을 구축한다.</del>
* MariaDB를 설치하여 DB 통신을 수행한다.

이로써 어디에서나 라즈베리파이의 Ubuntu에 접속하여 조작할 수 있다. Shell과 UI 둘 다 조작이 가능하므로 필요에 따라 원하는 방식으로 접근하면 될 것이다.