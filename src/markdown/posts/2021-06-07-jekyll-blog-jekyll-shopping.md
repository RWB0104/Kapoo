---
title: "[Jekyll] GitHub Pages를 이용해 나만의 블로그 만들기 - 4. Jekyll 쇼핑하기"
excerpt: "GitHub는 각 프로젝트를 하나의 Repository로 관리한다. 생성한 Repository는 Git을 이용하여 관리할 수 있다. GitHub 페이지 자체로도 Repository 내부의 파일 생성, 수정, 삭제가 가능하지만 매우 번거로우므로 대부분 Git을 활용하는 것이 권장된다."
coverImage: "https://user-images.githubusercontent.com/50317129/90983201-582f1080-e5a7-11ea-970b-8d7d82cb2084.png"
date: "2021-06-07T23:42:11"
type: "posts"
category: "Jekyll"
tag: [ "GitHub Pages(깃허브 페이지)", "Jekyll(지킬)", "Blog(블로그)" ]
group: "Jekyll Blog"
comment: true
publish: true
---

<p class="red-A400 center">※ 본 게시물은 Jekyll 시절의 게시글을 토대로 복원한 게시물입니다.</p>

# 개요

<span class="blue-400">GitHub Pages</span>는 꼭 <span class="blue-400">Jekyll</span>로만 호스팅해야하는 것은 아니다. 해당 Repository에 전통적인 HTML, CSS, JavaScript 파일을 저장해도 호스팅엔 무리가 없다. 하지만 이 경우, 자신이 직접 모든 페이지를 디자인해야하고, 코딩 이상의 깊은 미적 감각이 요구된다. 디자인은 상황에 따라 코딩보다도 더욱 고난이도의 지식과 정교한 작업을 요구하기 때문.

다행히 <span class="blue-400">Jekyll</span> 기반 테마를 사용하면 이러한 문제를 해소할 수 있다.

# Jekyll 쇼핑

아래의 사이트들에서 <span class="blue-400">Jekyll</span> 테마를 다운로드 받거나 데모 페이지를 확인해볼 수 있다. 기본적으로 무료이며, 테마에 따라 일부는 비용 청구를 통해 더욱 향상된 테마를 제공해주기도 한다.

* [Jekyll Themes](http://jekyllthemes.org/)
* [Free Jekyll Themes](https://jekyllthemes.io/free)
* [Jekyllrc](http://themes.jekyllrc.org/)

찾아보면 이 밖에도 여러 사이트가 존재한다. [Jekyll Themes](http://jekyllthemes.org/)를 예시로 확인해보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90974202-ec778400-e563-11ea-83c6-b3456a678e27.png" width="820px" />
</p>

이렇게 수 많은 테마들이 준비되어있다. 테마별로 적합한 용도가 있기 때문에, 제공하는 기능을 잘 확인해야한다. 오로지 디자이너 개인의 의도와 가치관이 담겨있기 때문에, 내가 원하는 블로그와 테마의 방향이 일치한지 확인하자.

> 어떤 테마는 블로그에 적합하고, 어떤 테마는 포트폴리오에 적합하다.

내가 <span class="blue-400">Jekyll</span> 시절 사용했던 테마는 [Moon Theme](http://taylantatli.github.io/Moon/)다. 깔끔하면서도 편안한 느낌이라 마음에 들었다. 대부분의 테마는 위와 같이 직접 체험이 가능한 데모 페이지를 제공하고 있으므로, 이를 활용하면 테마 선택에 도움이 된다.

원하는 테마를 선택했다면, `clone` 작업을 진행하자. 거의 모든 테마는 해당하는 Repository URL을 제공한다. `cline` 작업을 위해 테마 Repository의 URL를 알아야 한다. URL은 아래와 같이 확인할 수 있다.

> clone은 공개된 GitHub Repository를 내 로컬 PC에 복사하는 작업이다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90974184-b4704100-e563-11ea-8463-54495387cd70.png" width="820px" />
</p>

해당 Repository의 주소나 사진처럼 <span class="blue-400">Code</span> 버튼을 클릭하여 URL을 확인할 수 있다.

프로젝트를 복사할 폴더에서 Git Bash를 띄우자. 콘솔에 아래의 명령어를 입력한다.

`git clone {Theme URL} {username}.github.io`

위 명령어는 입력한 URL의 소스를 대상 경로의 {username}.github.io 폴더로 복사하는 명령어다. 명령어가 정상적으로 실행되면 대상 경로에 {username}.github.io 폴더가 생기고, 소스를 직접 확인할 수 있다.

하지만 아직 소스를 받았을 뿐, 내가 만든 Repository와 연동하지 못 했다. 아래의 작업을 통해 연동을 진행하자.

1. clone된 프로젝트 폴더로 들어가서 Git Bash를 띄운다.
2. `git remote set-url origin https://github.com:{username}/{username}.github.io.git` 명령어를 실행한다.
3. `git push`를 통해 변경사항을 기록한다.

이 과정을 끝마치고 <span class="blue-400">GitHub</span>의 Repository를 보면, 텅 비어있던 예전과 달리 테마 소스들이 들어가있음을 확인할 수 있다.

빌드에 약간의 시간이 걸리므로(~ 1분) 조금 기다렸다가 **https://{username}.github.io** 주소로 접속해보자. 테마가 적용되어있다면 성공이다. 물론 아직 어떠한 커스터마이징도 이루어지지 않았으므로, 데모 페이지와 큰 차이는 없다. 앞으로 여기다가 게시글을 작성하고 블로그를 꾸미면 된다.