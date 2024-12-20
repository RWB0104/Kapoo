---
title: "IntelliJ(인텔리제이) 시작 시 오류(java.net.BindException: Address already in use: bind)"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/121893356-d6d48480-cd58-11eb-80bb-d4611be3bd40.png"
date: 1623675556000
type: "posts"
category: "JAVA"
tag: [ "IntelliJ(인텔리제이)", "Hyper-V", "오류 해결책" ]
comment: true
publish: true
---

# 않이 갑자기 왜요ㅠㅠ

분명히 어제까지만 해도 아무 이상없이 썼던 <span class="blue-400">IntelliJ</span>를 퇴근 후에 키니 오류를 뱉으며 뻗어버렸다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/121893316-c6bca500-cd58-11eb-9c2a-658c604ee6d1.png" width="600px" />
</p>

두 개의 오류창이 떴는데, 하나는 위와 같은 <span class="red-A400">java.net.BindException: Address already in use: bind</span>에러였고 다른 하나는 왠 <span class="red-A400">NullPointerException</span>이 떴었다. 하필 <span class="red-A400">NullPointerException</span>이 맨 위에 뜨는 바람에 엉뚱한걸 찾고 있었는데, 창 옮기니까 뒤에 저 오류창이 숨어있었다.

# 원인?

Windows의 가상 OS머신인 <span class="lightBlue-A400">Hyper-V</span>와 연관이 있는 모양이다. Windows 부팅 시 <span class="lightBlue-A400">Hyper-V</span>에서 자신이 사용할 포트를 지정하는데, 이게 <span class="blue-400">IntelliJ</span>와 겹쳐서 생긴다고 한다. 아니 갑자기 이제와서?

실제로 난 <span class="lightBlue-A400">Hyper-V</span>를 사용한다. CentOS 8과 Windows 10을 구동하고 있다. CentOS 8은 리눅스도 다뤄볼 겸 DB 하나 설치해서, 집에서 코딩할 때 DB 쓸 일 있으면 전부 저기다가 갖다 붙여서 쓰고 있다. Windows 10은 클린 PC가 필요하거나, 내가 극혐해 마지않는 인터넷뱅킹을 할 때 사용 중 ~~(플러그인 ㅂㄷㅂㄷ.....)~~ 이긴 한데, 거의 3개월 가까이 사용한 적이 없다. 간혹 Windows Update가 설정을 지멋대로 변경하기도 한다는데 그 때문인가.. 갑자기 잘 되던게 어떠한 문제로 인해 안 된다고 하는 경우가 왕왕있다. 지금까지 잘 돌아간 이유는 내가 알지 못 하는 어떤 신비의 힘이라도 작용했는 모양이다.

# 해결방법

<span class="green-A400">윈도우 콘솔을 관리자 권한으로 실행</span>한다. <span class="blue-400">cmd</span>, <span class="blue-400">PowerShell</span> 등 어떠한 콘솔이든 명령어만 보낼 수 있으면 상관없다. 콘솔에 아래의 명령어를 입력한다.

``` batch
# Hyper-V 비활성화 (윈도우 재부팅 필요)
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V

# TCPv6 6942 ~ 6952 포트 예약
netsh int ipv6 add excludedportrange protocol=tcp startport=6942 numberofports=10

# Hyper-V 활성화 (윈도우 재부팅 필요)
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
```

<span class="lightBlue-A400">Hyper-V</span> 활성화/비활성화에 각각 재부팅을 요구한다. 이후 <span class="blue-400">IntelliJ</span>는 정상적으로 켜지는데, <span class="lightBlue-A400">Hyper-V</span>가 제대로 안 되는 거 같았다. OS를 켜도 "시작하는 중"에서 넘어가질 않는다. <span class="lightBlue-A400">Hyper-V</span> 기능 재설치하고 재부팅하고 다시 시도했는데 안 된다.... 싶었는데 냅둬놓고 기다리니 잘 되더라. IntelliJ 계열 프로그램 모두에게 발생 가능성이 있다고 한다.

개운하진 않지만, 어쨌든 잘 해결됐으니 다행.