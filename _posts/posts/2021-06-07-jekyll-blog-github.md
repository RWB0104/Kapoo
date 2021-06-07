---
title: "[Jekyll] GitHub Pages를 이용해 나만의 블로그 만들기 - 2. GitHub와 친해지기"
excerpt: "초라기는 한국의 비밀국방기지(원타곤)를 습격하라는 임무를 받은 특급요원이다. 원타곤의 건물은 도넛 형태이며, 초라기는 효율적인 타격 포인트를 정하기 위해 구역을 아래와 같이 두 개의 원 모양으로 나누었다. (그림의 숫자는 각 구역의 번호이다.) 초라기는 각각 W명으로 구성된 특수소대를 다수 출동시켜 모든 구역에 침투시킬 예정이며, 각 구역 별로 적이 몇 명씩 배치되어 있는지는 초라기가 모두 알고 있다. 특수소대를 아래 조건에 따라 침투 시킬 수 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/90983201-582f1080-e5a7-11ea-970b-8d7d82cb2084.png"
date: "2021-06-07T22:46:32"
type: "posts"
category: "Jekyll"
tag: [ "GitHub Pages(깃허브 페이지)", "Jekyll(지킬)", "Blog(블로그)", "GitHub(깃허브)" ]
group: "Jekyll Blog"
comment: true
publish: true
---

<p class="red-A400 center">※ 본 게시물은 Jekyll 시절의 게시글을 토대로 복원한 게시물입니다.</p>

# 개요

<span class="primary">Jekyll</span>은 <span class="primary">GitHub</span>를 통해 호스팅한다. 즉, <span class="primary">Jekyll</span>로 블로그를 만들기 위해선 <span class="primary">GitHub</span>를 조금이나마 알고 있어야 한다. 본문에서는 <span class="primary">GitHub</span>의 여러 기능은 제쳐두고, <span class="primary">Jekyll</span> 호스팅을 목적을 기준으로 설명한다.

# GitHub 속으로!

<span class="primary">GitHub</span>는 개발자들을 위한 소스코드 형상관리 서비스를 제공해준다. Git을 저장하고 관리하는 대표적인 저장소로, 수 많은 오픈, 개인 소스가 존재한다. Git과 <span class="primary">GitHub</span>는 그 자체만으로도 커다란 주제가 여러개 튀어나오니, 일단은 우리의 목표인 호스팅만을 알아보자.

<a href="https://github.com/">GitHub 바로가기</a>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90389062-d2512800-e0c3-11ea-8a59-f4980afab7b5.png" width="820px" />
</p>

접속하면 위와 같은 화면을 볼 수 있는데, 상단 우측의 <span class="lightBlue-A400">Sign Up</span>을 클릭하여 회원가입을 진행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90411265-777cf800-e0e6-11ea-95d5-372388b32bd2.png" width="820px" />
</p>

* username: 닉네임
* Email address: 이메일 주소
* Password: 비밀번호

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90412061-96c85500-e0e7-11ea-9a7b-8f71fa52f776.png" width="820px" />
</p>

계정을 생성하면 나오는 설문조사. 무시해도 무방하다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90412232-d42ce280-e0e7-11ea-92e9-dc637cb2c8a9.png" width="820px" />
</p>

계정 생성이 완료되면 회원가입 시 작성한 이메일로 인증 코드를 전송하니 메일을 확인한다.

만약, 이메일이 제대로 오지 않는다면, <span class="lightBlue-A400">Resend verification email</span>을 통해 메일을 재발송할 수 있다. 혹은 이메일 주소를 잘못 입력했다면, <span class="lightBlue-A400">Change your email settings</span>를 클릭하여 인증할 이메일 주소를 변경한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90412375-fde60980-e0e7-11ea-805b-7d4c58ab0b4d.png" width="820px" />
</p>

인증 이메일을 확인하고 <span class="lightBlue-A400">Verify email address</span>를 클릭하여 인증을 완료한다. 계정 생성 과정이 끝난다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/90412420-0b9b8f00-e0e8-11ea-80a5-d28ff329a020.png" width="820px" />
</p>

<span class="primary">GitHub</span>에 접속하여 로그인을한다. 회원가입시 입력한 username이나 email 둘 중 아무거나 사용해도 상관없다. 위 화면이 뜨면 회원가입이 완료된 것이다.