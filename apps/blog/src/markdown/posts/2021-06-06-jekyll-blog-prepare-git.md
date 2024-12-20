---
title: "[Jekyll] GitHub Pages를 이용해 나만의 블로그 만들기 - 3. Git 설치하기"
excerpt: "GitHub는 각 프로젝트를 하나의 Repository로 관리한다. 생성한 Repository는 Git을 이용하여 관리할 수 있다. GitHub 페이지 자체로도 Repository 내부의 파일 생성, 수정, 삭제가 가능하지만 매우 번거로우므로 대부분 Git을 활용하는 것이 권장된다."
coverImage: "https://user-images.githubusercontent.com/50317129/90983201-582f1080-e5a7-11ea-970b-8d7d82cb2084.png"
date: 1622990531000
type: "posts"
category: "Jekyll"
tag: [ "GitHub Pages(깃허브 페이지)", "Jekyll(지킬)", "Blog(블로그)", "Git" ]
group: "Jekyll Blog"
comment: true
publish: true
---

<p class="red-A400 center">※ 본 게시물은 Jekyll 시절의 게시글을 토대로 복원한 게시물입니다.</p>

# 개요

<span class="blue-400">GitHub</span>는 각 프로젝트를 하나의 Repository로 관리한다. 생성한 Repository는 <span class="orange-A400">Git</span>을 이용하여 관리할 수 있다. <span class="blue-400">GitHub</span> 페이지 자체로도 Repository 내부의 파일 생성, 수정, 삭제가 가능하지만 매우 번거로우므로 대부분 <span class="orange-A400">Git</span>을 활용하는 것이 권장된다.

# GitHub Repository 생성하기

이전 장에서 <span class="blue-400">GitHub</span> 계정을 만들었다. <a href="https://github.com">GitHub 홈페이지</a>로 이동하여 로그인을 해보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90412420-0b9b8f00-e0e8-11ea-80a5-d28ff329a020.png" width="820px" />
</p>

해당 계정에서 관리하는 Repository의 전체 리스트를 보여준다. 아직 별다른 활동을 하지 않았다면 위 사진처럼 심플하게 보여준다. <span class="lightBlue-A400">Create Repository</span> 버튼을 눌러 새로운 Repository를 생성하자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90422505-eada3600-e0f5-11ea-92f1-695a58f7f783.png" width="820px" />
</p>

* Owner: 소유주. 본인이 기본으로 지정되어 있다.
* Repository name: Repository 이름. 블로그 호스팅을 위해 **{username}.github.io로 설정**하자.
* Public / Private: Repository의 공개여부. 호스팅용 Repository는 반드시 **Public**이어야 한다.

이 때, 주의할 점이 한가지 있는데, <span class="red-A400">Repository의 이름을 {username}.github.io</span>으로 지정한다. 만약, username이 <span class="teal-A400">test</span>라면, Repository의 이름은 <span class="teal-A400">test</span>.github.io이 된다. 아이디가 아닌 username임에 주의하자. username은 프로필에서 확인할 수 있다.

> GitHub Pages는 {username}.github.io 형식의 Repository를 Root(/)로 호스팅해준다. 즉, https://{username}.github.io가 된다. 만약 이와 같은 형식이 아닌 일반적인 Repository의 경우 https://{username}.github.io/{Repository Name}과 같이 하위 경로로 호스팅한다.

한 계정이 관리하는 Repository의 이름은 중복될 수 없으므로, Root 경로의 호스팅은 계정 당 하나만 가능하다. 계정을 많이 만들어서 운용하면 어느정도 해소할 수 있긴 하다.

나머지 옵션은 호스팅에 영향을 미치지 않으므로 무시하고 넘어가도 된다. 입력한 내용을 확인한 뒤 <span class="lightBlue-A400">Create Repository</span>를 클릭하여 생성한다. Repository 목록에 생성한 Repository가 추가됐음을 확인할 수 있다.

앞으로 이 Repository에 Jekyll 블로그 소스를 올릴 것이다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90917728-6bfb3b00-e41e-11ea-8313-0251fba0659f.png" width="820px" />
</p>

생성된 저장소로 접근하면 위와 같은 화면이 나온다. 위 내용은 <span class="orange-A400">Git</span> 명령어를 이용하여 사용자의 PC에 저장소를 생성하고, 이를 <span class="blue-400">GitHub</span>의 원격 저장소와 연결하여 소스관리를 하는 절차를 안내하는 내용이다.

# Git 설치하기

이제 생성한 Repository를 관리할 <span class="orange-A400">Git</span>을 설치해보자. <span class="orange-A400">Git</span>은 소스코드를 효율적으로 관리할 수 있는 강력한 형상관리 툴로, Linux의 아버지 리누스 토르발스(Linus Benedict Torvalds)가 개발했다. 넓은 의미로 우리가 흔히 하는 복사 및 백업과 동일하지만, <span class="orange-A400">Git</span>은 그것 보다는 더욱 강력하다.

* 명령어 입력만으로 소스코드 백업이 가능하다.
* <span class="orange-A400">Git</span> 저장소와 통신이 가능한 환경이면 어디서나 저장된 소스코드를 받아오거나, 수정, 반영할 수 있다.
* 커밋 시 해당 내역이 관리되며, 원할 경우 해당 커밋 이전으로 되돌릴 수 있다.
* 커밋 별로 변경점을 비교할 수 있다.

> Commit(커밋): Git의 변경사항(파일 생성, 수정, 삭제)을 저장소에 기록하는 작업

Jekyll 블로그는 <span class="blue-400">GitHub</span>를 통해 관리하므로, 이와 연계된 <span class="orange-A400">Git</span>의 사용은 필수다. 물론 <span class="orange-A400">Git</span>을 사용하지 않고 <span class="blue-400">GitHub</span>의 Repository에서 파일 추가, 삭제, 수정이 가능하다. 그러나 이 방법은 다수의 파일을 관리하는데 매우 비효율적이며, 파일 갱신 즉시 블로그에 내용이 반영되므로 오류가 있을 경우에도 블로그에 그대로 반영된다. 또한, 어찌됐든 Jekyll 사용하면서 코드를 만지게 될텐데, VSCode같은 에디터라도 쓰는게 개발환경에 여러모로 도움이 된다.

## 설치파일 다운로드

<a href="https://git-scm.com/">Git 홈페이지</a>에서 Git를 설치하자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90918409-90a3e280-e41f-11ea-846f-68332ffecdbe.png" width="820px" />
</p>

<span class="orange-A400">Git</span> 홈페이지는 위와 같다. 놀랍게도 홈페이지에서 자체적으로 **접속한 OS의 정보를 확인하고 해당 OS에 가장 적합한 Git을 추천**한다. 페이지 우측 상단의 모니터 그림에서 적합한 버전을 제공받을 수 있다.

## 라이센스 동의

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90949816-b0222600-e486-11ea-95d7-7ee7150d4f4f.png" width="820px" />
</p>

<span class="orange-A400">Git</span> 사용 라이센스에 동의한다. 당연하게도 동의 안 하면 설치가 불가능하다.

## 설치경로 선택

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90949836-f6778500-e486-11ea-8568-94fd7e13f358.png" width="820px" />
</p>

특별한 문제가 없다면 설치경로는 기본값으로 지정한다.

## 설치 옵션

설치 시 적용할 옵션을 선택한다.

* On the Desktop: 바탕화면 바로가기 생성
* <span class="blue-400">Git Bash Here</span>: 바탕화면에서 오른쪽 마우스 클릭 시 Git Bash 실행 메뉴 추가
* Git GUI Here: 바탕화면에서 오른쪽 마우스 클릭 시 Git GUI 실행 메뉴 추가
* Git LFS: 대용량 파일 지원
* Associate .git* configuration files with the default text editor: git 설정파일을 기본 텍스트 편집기와 연결
* Associate .sh files to be run with Bash: [.sh] 파일을 Bash로 실행함.
* Use a TrueType font in console windows: 콘솔창의 폰트를 TrueType으로 사용
* Check daily for Git for Windows updates: 매일 Git 업데이트 확인

원하는 옵션을 추가/제외하고 다음으로 넘어간다. 파란색으로 하이라이팅된 옵션은 반드시 추가하는 것이 좋다.

## 시작 프로그램 추가

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90952465-b6240100-e49e-11ea-9784-cb5a1695ffeb.png" width="820px" />
</p>

시작 프로그램에 추가할 이름을 지정한다.

* Don't create a Start Menu folder: 시작 메뉴를 생성하지 않는다.

## Git 편집기 선택(Choosing the default editor used by Git)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90952499-f97e6f80-e49e-11ea-95a0-818471fd3417.png" width="820px" />
</p>

<span class="orange-A400">Git</span>을 사용하기 위한 기본 편집기를 선택한다. 기본 권장옵션은 Vim이며, 원하는 편집기로 변경이 가능하다. 지원하는 편집기는 아래와 같다.

* Nano Editor
* <span class="blue-400">Vim</span>
* Notepad++
* Visual Studio Code
* Visual Studio Code Insider
* Sublime
* Atom
* other

## 환경변수 지정(Adjusting your PATH environment)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90952606-f6d04a00-e49f-11ea-85d0-204d305f8f9b.png" width="820px" />
</p>

환경변수를 지정하는 옵션을 선택한다.

* Use Git from Git Bash Only: Bash 환경에서만 Git 사용 가능 (환경변수 미변경)
* <span class="blue-400">Use Git from Windows Command Prompt</span>: 윈도우 프롬프트에서 Git 사용 가능
* Use Git abnd optional Unix tools from the Windows Command Prompt: 윈도우 프롬프트에 Git 및 Linux 명령어 사용 가능

## HTTPS 전송 방법 설정(Choosing HTTPS tranport backend)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90952734-0e5c0280-e4a1-11ea-8a9f-08a164f05b5e.png" width="820px" />
</p>

<span class="orange-A400">Git</span> 사용 시 HTTPS 전송 방법을 선택한다.

* <span class="blue-400">Use The OpenSSH library</span>: OpenSSH 라이브러리 사용
* Use The native Windows Secure Channel library: Windows 인증서 저장소 사용

## 개행문자 처리방식 지정(Configuring the line ending conversions)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90953593-a4932700-e4a7-11ea-95dd-5c6cb50662ea.png" width="820px" />
</p>

Checkout, Commit 작업 시 파일의 개행문자 처리 방식을 선택한다.

* <span class="blue-400">Checkout Windows-style, commit Unix-style line endings</span>: Checkout 시엔 Windows방식(CRLF), commit 시엔 Unix방식(LF)로 지정
* Checkout as-is, commit Unix-style line endings: Checkout 시엔 변환 없음, commit시엔 Unix방식(LF)로 지정
* Checkout as-is, commit as-is: Checkout, commit 둘 다 변환 없음

## Git Bash 선택(Configuring the terminal emulator to use with Git Bash)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90953681-ba551c00-e4a8-11ea-9fc4-fe1c43e2ef28.png" width="820px" />
</p>

Git Bash 실행 시 사용할 터미널을 선택한다.

* <span class="blue-400">Use MinTTY</span>: MinTTY 터미널 사용
* Use Windows default console window: Windows 기본 터미널 사용

## Pull 기본동작 지정 (Choose the default behavior of 'git pull')

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90953682-bc1edf80-e4a8-11ea-9d0c-d9c0d71afbaf.png" width="820px" />
</p>

`git pull` 명령어 실행 시 수행할 동작을 지정한다.

* <span class="blue-400">Default (fast-forward or merge)</span>: fast-forward 혹은 merge를 이용한 병합
* Rebase: rebase를 이용항 병합
* Only ever fast-forward: fast-forward를 이용한 병합

## Credential helper 지정(Choose a credential helper)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90954457-53873100-e4af-11ea-9a98-ef5131c4ab1a.png" width="820px" />
</p>

Credential helper를 지정한다.

> Credential은 데이터 통신에 HTTP 프로토콜을 사용 시, 매번 입력해야하는 인증정보를 저장하고 자동으로 입력해주는 시스템을 제공한다.

* None: 사용하지 않음
* <span class="blue-400">Git Credential Manager</span>: Windows 전용 Credential Manager 사용
* Git Credential Manager Core: Cross-Platform을 지원하는 Credential Manager 사용

## 실험 옵션 지정(Configuring experimental options)

<p class="red-A400 center small">※ Git을 처음 접하시는 분들은 해당 설정을 기본값으로 지정하시길 권장합니다.</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90954553-225b3080-e4b0-11ea-8930-6b461f966b4c.png" width="820px" />
</p>

<span class="orange-A400">Git</span>에서 제공하는 실험적인 옵션을 선택한다. 해당 옵션은 업데이트에 따라 정식으로 지원되거나, 제외될 수 있다.

* Enable experimental support for pseudo consoles: 가상 터미널 지원

## 설치 완료

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90957778-03b66300-e4cb-11ea-9927-a0efbfc1e921.png" width="820px" />
</p>

컴퓨터의 사양에 따라 약간의 시간이 소요될 수 있다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90957782-0618bd00-e4cb-11ea-9972-7bd3fe1aa45b.png" width="820px" />
</p>

설치가 완료됐다. <span class="blue-400">Launch Git Bash</span>를 체크하면 Git 명령어를 입력할 수 있는 Git Bash가 즉시 실행된다.

## Git Bash 실행하기

설치 후 바탕화면이나 폴더에서 오른쪽 마우스를 클릭해서 컨텍스트 메뉴를 띄우자. [설치 옵션](#설치-옵션)에서 선택했던 내용에 따라 <span class="blue-400">Git Bash Here</span>, <span class="blue-400">Git GUI Here</span>가 생성됨을 확인할 수 있다. 해당 메뉴를 클릭하면 Bash 혹은 GUI를 실행할 수 있다. Bash는 콘솔 형태이며, GUI는 UI가 있는 흔한 프로그램이다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90957788-0913ad80-e4cb-11ea-8627-6ceba19d58b4.png" width="820px" />
</p>

위 사진은 Bash의 사진으로, 본 시리즈에서는 Git Bash를 통한 명령어 입력을 기준으로 서술한다.

> Git GUI는 Git Desktop으로 인해 잘 쓰이지 않는다.

# Git 설정하기

Git Bash를 실행한다. 자신이 만든 Repository와 통신하기 위해서, 내가 나임을 인증할 수 있는 정보를 사전에 입력해야 한다. 아래의 명령어를 통해 인증 정보를 입력하자.

`git config --global user.name "사용자 username"`
`git config --global user.email "사용자 email"`

username과 email은 회원가입시 입력한 정보로 입력해야한다.