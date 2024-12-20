---
title: "[라즈베리파이 4] 라즈베리파이에 Unbuntu 설치하기"
excerpt: "목요일을 기점으로 모든 준비물의 배송이 완료됐다. 클린 상태의 라즈베리파이는 OS가 별도로 깔려있지 않은 FreeDOS 상태이므로, 직접 OS를 설치해야한다. 컴퓨터도 주기적으로 포맷하고, 가상머신도 몇 개 돌려본 나로썬 크게 문제될 건 없지만, 이건 내가 지금까지 다루던 컴퓨터와는 좀 다르다는점이 흠. 한 번도 다뤄보지 않은 장비인데다, 일반적인 데스크탑에 비해 여러 차이점과 제약사항이 있어 그리 순탄하진 않았다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: 1630342299000
type: "posts"
category: "RaspberryPi"
tag: [ "라즈베리파이", "Ubuntu" ]
group: "라즈베리파이"
comment: true
publish: true
---

# 개요

목요일을 기점으로 모든 준비물의 배송이 완료됐다. 클린 상태의 라즈베리파이는 OS가 별도로 깔려있지 않은 FreeDOS 상태이므로, 직접 OS를 설치해야한다. 컴퓨터도 주기적으로 포맷하고, 가상머신도 몇 개 돌려본 나로썬 크게 문제될 건 없지만, 이건 내가 지금까지 다루던 컴퓨터와는 좀 다르다는점이 흠.

한 번도 다뤄보지 않은 장비인데다, 일반적인 데스크탑에 비해 여러 차이점과 제약사항이 있어 그리 순탄하진 않았다.

# Rasbian? Ubuntu?

라즈베리파이는 전용 OS인 <span class="pink-600">Raspbian</span>이 존재한다. Raspbian은 라즈베리파이에 가장 최적화된 OS이므로 라즈베리파이의 네이티브한 영역을 쉽게 다룰 수 있을 것이다.

하지만 난 라즈베리파이를 다룬다기보단 라즈베리파이를 통해 서버를 구축할 예정이므로, Raspbian보단 훨씬 범용적인 OS가 알맞다. 이를테면 CentOS 같은 거 말이다.

그 중에서 내가 선택한 OS는 Ubuntu. CentOS는 RHEL에서 인수한 뒤 CentOS의 가장 큰 장점인 RHEL과의 동일성을 아작내놨다. 굳이 쓸 필요가 없어진 셈.

때문에 이전부터 써보고 싶기도 했고, 한국인에게 가장 친숙한 Linux인 Ubuntu를 설치하고자 한다.

익숙하지 않은 라즈베리파이로의 설치는 물론 관련 정보들을 쉽게 얻을 수 있을 것이다.

# 라즈베이파이에 Ubuntu 설치하기

본격적으로 라즈베리파이에 Ubuntu를 설치해보자.

## 준비물

* Raspberry Pi 4 Model B
* 전원 케이블 (5V 3A 이상)
* MicroSD, 리더기 (구형 펌웨어일 경우)
* Micro HDMI, 혹은 HDMI 케이블 (모니터 쓸 경우)

준비물은 위와 같다.

원래 기본적으로 라즈베리파이는 MicroSD 이외에는 인식하지 않는다. USB같은 외장 디스크를 인식하려면 펌웨어의 업데이트가 필요하다.

<span class="red-600">2020년 8월 이후 출시된 보드의 경우 펌웨어가 기본적으로 업데이트</span>된다고 한다. 난 중고로 샀는데, 8월 이전 출시된 보드인지 USB를 바로 인식하지 않았었다.

펌웨어 업데이트는 OS설치 후 가능하므로, 만약 <span class="red-600">구형 보드라면 얄쨜없이 MicroSD가 필요</span>하니 참고할 것.

<br />

라즈베리파이는 기본적으로 Micro HDMI라고 하는 작은 단자를 제공한다.

![null](https://user-images.githubusercontent.com/50317129/131310544-4fc47a26-b541-45e1-ac8c-4586bcbdc978.png)

위 사진의 좌측 단자가 일반적으로 알고있는 HDMI, 우측의 작은 단자가 Micro HDMI다. Argon M2 케이스의 경우 Micro HDMI와 연결된 HDMI 단자를 제공해주므로 상관없었으나, 별도의 케이스나 커넥터 없이 모니터를 연결할 경우 위 사진과 같은 <span class="amber-500">Micro HDMI to HDMI</span> 케이블이 필요하니 주의할 것.

## Ubuntu 설치파일 다운로드

디스크에 Ubuntu를 설치하기위해 아래 두 파일을 다운로드하자.

* [이미지 레코더 BalenaEtcher 다운로드](https://www.balena.io/etcher/)
* [Ubuntu ISO 다운로드](https://ubuntu.com/download/raspberry-pi)

이미지 레코더는 부팅 디스크를 만들어준다. Windows 포맷 USB를 만드는 과정이라고 생각하면 된다.

Ubuntu는 Linux이므로, 위 경로에서 쉽게 다운로드 받을 수 있다.

* <span class="orange-600">Ubuntu Server</span> - CLI 기반 (GUI 없음)
* <span class="orange-600">Ubuntu Desktop</span> - GUI 기반 (설치 시 모니터 필요)

페이지에 접속하면 두 버전을 다운로드 받을 수 있다. Desktop은 우리가 일반적으로 알고있는 GUI 기반의 OS다. Server는 DOS같은 명령어 기반의 CLI OS다. 어떤 걸 설치해도 상관없으나 Linux에 익숙하지 않다면 Desktop을 추천한다. 하지만 <span class="red-500">GUI 기반이므로 설치 후 OS 셋팅 시 모니터가 필요함</span>에 유의하자.

이 문서에서는 Ubuntu Desktop을 설치한다. Electron 같은 UI 프로그램이나 Ubuntu에서의 웹 페이지 테스트를 위해선 GUI 환경이 필요하다. CLI에선 브라우저를 띄우는 등의 행위가 불가능하기 때문. Ubuntu Server도 추후 관련 프로그램을 설치하여 GUI 환경으로 구동할 수 있다.

## Ubuntu 부팅 디스크 만들기

아래의 과정을 통해 부팅 디스크를 만든다. 본문에서는 MicroSD로 진행한다. 디스크 종류가 달라진다고 해서 과정이 달라지지 않으니 걱정하지 않아도 된다.

### 1. BalenaEtcher 실행

![null](https://user-images.githubusercontent.com/50317129/131342380-c9c0d006-e4cf-457a-9cbf-66ffcfbf8e4f.png)

USB를 꽂고 다운로드받은 <span class="green-400">BalenaEtcher를 실행</span>한다.

### 2. Ubuntu ISO 선택

![null](https://user-images.githubusercontent.com/50317129/131342500-b406e9e9-c72f-41f6-aedb-1e1d88f678f7.png)

다운로드받은 <span class="green-400">Ubuntu ISO를 선택</span>한다. 선택한 ISO가 디스크에 기록될 것이다.

Ubuntu Desktop ISO는 용량이 많음에 유의하자.

### 3. 디스크 드라이브 선택

![null](https://user-images.githubusercontent.com/50317129/131343798-ae4caaa3-5b39-42cc-8d87-362bde5ad5eb.png)

ISO가 기록될 디스크 드라이브를 선택한다.

<span class="blue-400">[Show hidden]</span>을 클릭하면 USB 형태의 외장 드라이브 뿐만 아니라, M2 혹은 SATA와 연결된 D드라이브 등도 선택 가능하다. 물론 그럴일은 없겠지만, 시스템 드라이브는 선택 불가능하다.

### 4. 디스크 기록

![null](https://user-images.githubusercontent.com/50317129/131343897-2ab71120-ba0e-4a10-9e20-85b7f562f25c.png)

모든 선택이 완료되면 <span class="blue-400">[Flash!]</span> 버튼을 클릭하여 부팅 디스크를 만든다.

![null](https://user-images.githubusercontent.com/50317129/131344037-dd53f8e7-4a66-4e3e-90d5-dd06bdf79904.png)

SSD같이 Disk I/O가 빠르면 금방 끝나지만, 느리면 수 분의 시간이 걸린다.

![null](https://user-images.githubusercontent.com/50317129/131344661-ef5737a7-e2b8-483b-88af-9f79318c6661.png)

완료되면 위와 같은 화면이 뜬다.

디스크를 뺐다 껴서 다시 인식시키면 아래 두 디스크가 인식된다.

* `system-boot` 혹은 `boot` - 부팅 디스크
* 메인 디스크

이 부팅 디스크를 라즈베리파이에 연결하면 Ubuntu를 사용할 수 있다.

## 라즈베리파이 연결

부팅 디스크를 라즈베리파이에 연결하자. MicroSD라면 칩 아래쪽에, USB라면 USB 단자 등 맞는 방식으로 연결하면 된다.

정상적으로 부팅되면 빨간불과 함께 녹색불이 점멸한다. <span class="red-500">빨간불만 뜨면 부팅 중 문제가 있다는 뜻</span>이다. 이 경우 모니터를 연결해야 자세한 문제를 확인할 수 있다.

이후 셋팅은 일반적인 Ubuntu 사용과 동일하다. 사용자 생성하고 설정값 지정하고 그런 것들.

본인이 MicroSD가 아닌 USB로 부팅디스크를 만들었는데, 화면에서 <span class="red-500">USB Stop</span>이라는 문구가 뜨며 반복적으로 Fail이 뜨면 USB를 인식할 수 없는 구형보드라는 뜻이다. 

MicroSD 정도로 만족하거나, 신형 보드라서 애초에 USB나 SSD를 부팅 디스크로 사용했다면 그냥 쓰면 된다. 하지만 본인의 라즈베리파이의 펌웨어가 구형이고, MicroSD로는 만족할 수 없다면 아래의 과정을 통해 펌웨어 업데이트를 진행해야한다.

# 펌웨어 업데이트

<p class="red-600" align="center">USB가 인식되는 신형 펌웨어는 수행할 필요 없음</p>

라즈베리파이가 USB나 SSD를 부팅 디스크로 인식할 수 있도록 펌웨어를 업데이트한다.

펌웨어 업데이트는 반드시 라즈베리파이에 OS가 설치된 후에 진행할 수 있다. 즉, 구형 보드에서 SSD로 부팅하려면 MicroSD로 부팅 한 번, 펌웨어 업데이트 후 SSD로 부팅 한 번으로 총 두 개의 부팅 디스크를 만들어야 한다.

## 1. 패키지 최신화

먼저, 터미널을 열어 아래 두 명령어를 입력한다.

``` bash
sudo apt-get update
sudo apt-get upgrade
```

패키지 저장소 및 설치된 패키지를 최신화한다.

## 2. 설정값 변경

업데이트가 완료되면 아래의 명령어를 입력하여 해당 파일의 내용을 변경한다.

``` bash
sudo vim /etc/default/rpi-eeprom-update
```

`FIRMWARE_RELEASE_STATUS="critical"` 설정값에서 `critical`을 `stable`로 변경한다.

즉, `FIRMWARE_RELEASE_STATUS="stable"`로 변경해주면 된다.

## 3. 부트로더 업데이트

이제 부트로더를 업데이트한다.

``` bash
sudo rpi-eeprom-update -d -f /lib/firmware/raspberrypi/bootloader/stable/pieeprom-2020-06-15.bin
```

해당 경로에 가보면 `2020-06-15` 버전 말고도 `2020-07-16`, `2020-12-11` 등 다양한 버전이 있는데, 대부분 위 버전을 추천하는 것 같다.

필자는 최신버전을 좋아해서, 버전 중 가장 최신이였던 `2020-12-11`로 업데이트했으나 설정값이 이상하여 결국 상기한 `2020-06-15` 버전으로 다시 업데이트했다. 업데이트는 금방되니 부담가질 필요는 없다.

## 4. 확인

``` bash
sudo reboot
```

부트로더 업데이트가 완료되면 기기를 재부팅한다.

재부팅이 완료되면 아래의 명령어를 입력하여 USB를 인식할 수 있는지 확인하자.

``` bash
sudo vcgencmd bootloader_config
```

``` output
[all]
BOOT_UART=0
WAKE_ON_GPIO=1
POWER_OFF_ON_HALT=0
DHCP_TIMEOUT=45000
DHCP_REQ_TIMEOUT=4000
TFTP_FILE_TIMEOUT=30000
ENABLE_SELF_UPDATE=1
DISABLE_HDMI=0
BOOT_ORDER=0xf41
```

위 명령어를 입력하면 이와 같은 형식의 설정값이 출력된다. 다른건 상관없고, `BOOT_ORDER`의 값이 `0xf41`라면 정상적으로 업데이트가 완료된 것이다.

이제 라즈베리파이가 USB를 부팅 디스크로 인식할 수 있다.

디스크의 값이 아닌 라즈베리파이 기기 자체의 펌웨어가 업데이트된 것이므로, MicroSD에서 USB로 디스크가 바뀌어도 업데이트는 유지된다. 필자는 이걸 몰라서 쓸데없는 고민을 했었다.

## 5. 부팅 디스크 재생성

이제 MicroSD의 역할은 모두 끝났다. 나중을 대비해 MicroSD는 고이 모셔두자. 아주 간간히 쓸 일이 생기기도 하고 그런다.

USB, SSD 등 원하는 디스크에다 본문의 [부팅 디스크 만들기](#Ubuntu-부팅%20디스크%20만들기) 과정을 다시 수행한다.

# 설정

Ubuntu 설치가 완료되면, 이후는 우리가 아는 일반적인 OS 셋팅이 진행된다.

Ubuntu Desktop의 경우, 언어, 계정 등의 설정이 추가로 진행된다.

Ubuntu Server의 경우, CLI 환경이므로 별도의 설정이 필요하지 않다. 기본 계정이 생성되며, 아이디와 비밀번호 모두 동일하게 ubuntu다. 로그인 후 바꿔주자. 

# 목표

* <del class="grey-400">라즈베리파이에 Ubuntu 서버를 구축한다.</del>
* 도메인을 입힌다.
* SSH, RDP 등의 원격 통신환경을 구축한다.
* Tomcat을 구동하여 페이지를 호스팅한다
* MariaDB를 설치하여 DB 통신을 수행한다.