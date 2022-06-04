---
title: "블로그 3차 리뉴얼"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-05-21T03:04:59+09:00"
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

Next.js로 블로그를 다시 만든 뒤에, 새로운 글 작성 이외에 별다른 유지보수는 하지 않았었다. 나름의 이유는 있었던 것이, 일단 당장 쓰는 데 큰 문제가 없었고, 귀찮기도 했다. 적절한 컴포넌트를 구상하고 배치하는 게 여간 귀찮은 일이 아니기도 했고.

내 블로그에 몇 가지 문제점이 있었는데, 그 중 하나가 About 페이지에 아무 것도 없다는 점이다. 뭔가 나름의 블로그 소개를 작성하려고 했는데, 마땅한 아이디어가 없었기 때문. 그러다 문득, 괜찮은 아이디어가 하나 떠올랐는데, "About 페이지에 커밋 리스트를 표시해주면 괜찮지 않을까?"란 생각이였다. 나쁘지 않은 생각이였으므로 개발에 들어갔으나, 갑자기 블로그의 못난 부분들이 거슬리기 시작했다.

갑자기 못난 부분들이 보이는 게 너무나도 참을 수 없던 나는, 그렇게 예정에도 없던 블로그 리뉴얼 작업을 시작했다.

<br />
<br />
<br />










# 문제점

내가 생각한 블로그가 가진 문제점은 다음과 같다.

* 어색한 다크테마 색상
* 아직도 사라지지 않은 페이지 간 이동 로딩
* <b class="red-600">느린 빌드 시간</b>
* About 페이지 컨텐츠 미흡
* 조잡한 모바일 네비게이션
* Material-UI의 유명무실함

그 밖에 리뉴얼 과정에서 블로그의 많은 부분을 뜯어 고쳤다.

<br />
<br />
<br />










# 개편 내용

개편된 내용은 아래와 같다.

<br />
<br />





## 1. 테마 색상 정립

원래의 다크 테마는 약간 블루블랙같은 남색 계열을 사용했었다. 아마 Upbit나 Material-UI 다크 테마에 영향을 받지 않았나 실다.

그 당시엔 독특한 색감이라 좋았는데, 어느 순간 보기가 싫어졌다. 하지만 안타깝게도 색감 같은 순수 디자인에 조예가 전혀 없던 나는, 고민 끝에 기존에 잘 운영 중인 다크테마의 색상을 참고하기로 했다.

그 대상은 개발자의 영혼의 단짝인 GitHub.

-- 사진

GitHub 다크 테마의 색상을 참고하여 색상을 다시 잡았다. 헤더의 그라데이션도 그냥 없애버렸다. 색감을 잘 맞추면 모를까, 테마랑 색감이 어울리지 않다보니 너무 촌스러웠다. 다시 말하지만, 난 색상에 전혀 감이 없다.

<br />
<br />





## 2. classnames 라이브러리 적용

React에서 SCSS 모듈을 사용하는 방법은 통상 아래와 같다.

``` scss
.root {
	background-color: gainsboro;
}
```

``` tsx
import styles from './App.module.scss';

function App(): JSX.Element
{
	return (
		<div className={styles.root}>Lorem ipsum</div>
	);
}
```

기본적으로 위와 같이 객체 형태로 사용한다. React에서 `*.module.scss`는 빌드 과정에서 고유 클래스명으로 변환하여 SCSS와 JSX에 적용한다. 이러한 이유로 SCSS 파일마다 같은 class를 사용함에도 다른 컴포넌트에 영향을 미치지 않는다.

내 블로그에선 Light, Dark로 모드가 나눠져있으므로, 두 모드를 변갈아 사용하기 위해선 아래와 같은 동작이 필요했다.

``` scss
.root-dark {
	background-color: black;
	color: white;
}

.root-light {
	background-color: gainsboro;
	color: black;
}
```

``` tsx
import styles from './App.module.scss';

function App(): JSX.Element
{
	const theme = themeState ? 'dark' : 'light';

	return (
		<div className={styles[`root-${themeState}`]}>Lorem ipsum</div>
	);
}
```

위와 같은 방식이다. 테마값을 비교하고, `styles`에서 이에 맞는 코드를 호출한다. 보다시피, 그리 깔끔한 방식은 아니다.

하지만 `classnames`를 사용하면 이런 문제를 깔끔히 해소할 수 있다.

``` scss
.root-dark {
	background-color: black;
	color: white;
}

.root-light {
	background-color: gainsboro;
	color: black;
}
```

``` tsx
import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cn = classNames.bind(styles);

function App(): JSX.Element
{
	return (
		<div className={cn('root', themeState)}>Lorem ipsum</div>
	);
}
```

위와 같이 `cn` 메서드에 파라미터를 순차적으로 집어넣어 클래스명을 결합할 수 있다. 공식 문서에 따르면, 파라미터로는 문자열 뿐만 아니라 숫자나 객체 등의 다양한 타입을 지원하는 것으로 보인다. 물론 내 블로그엔 저 정도면 충분.

이로써 분기에 따른 다양한 클래스를 깔끔하게 호출할 수 있다.

여담으로, `classnames`는 회사 업무 중 한 프로젝트를 뒤적거리다가 알 게 됐다.

<br />
<br />





## 3. 모바일 네비게이션 개선

데스크탑 모드는 화면이 커서 상관없지만, 모바일 모드는 필연적으로 화면이 작아지므로, UI의 배치나 크기에 좀 더 많은 신경을 써야한다.

내 블로그의 경우, 데스크탑 모드에서는 네비게이션을 헤더에 배치하고 있었으므로, 모바일처럼 화면이 작아지면 별도의 메뉴로 빼서 사용할 필요가 있었다.

그래서 대충 모바일 메뉴를 구현하긴 했었는데, 좀 조잡했다. 많이. 좀 보기 싫었지만, 당장 동작이 안 되는 것도 아니였고, 무엇보다 사이드바를 구현하기 귀찮았다. UI도 UI지만, 애니메이션도 구현해야한다는 부담감이 있었기 때문에..

결과적으로 그렇게 쓸 순 없어서, 전형적인 사이드바 형태로 UI를 구성하고 애니메이션은 CSS로 구현했다.

``` scss
@keyframes slide-in {
	from {
		transform: translate(0px, 0px);
	}

	to {
		transform: translate(-200px, 0px);
	}
}

@keyframes slide-out {
	from {
		transform: translate(-200px, 0px);
	}

	to {
		transform: translate(0px, 0px);
	}
}

.header {
	position: fixed;

	top: 0px;
	right: -200px;

	width: 200px;
	height: 100%;

	transition: 0.3s;

	&[data-show=true] {
		@include slide-in-animation();
	}

	&[data-show=false] {
		@include slide-out-animation();
	}
}
```

`data-show` 속성으로 구분하여 메뉴를 on/off 할 수 있도록 구현했다. `width: 200px;`, `right: 200px;`로 지정하여 화면 바깥에 숨어있도록 구성하고, `data-show=true`일 경우, 0.3초 동안 `right: 0px;`로 이동하는 방식이다. `data-show=off`일 경우 그 반대로 동작한다.

-- 사진

대충 이런 방식이다. 지금 만든 것도 엄청 완벽한 건 아니지만, 적어도 이전보단 훨씬 이쁘다.

<br />
<br />






## 3. 태그별 페이지 제거

내 블로그의 게시글엔 카테고리와 태그, 두 가지 구분이 존재한다. 카테고리는 게시글의 주제를, 태그는 해당 게시글이 가지는 주요 키워드를 명시한다. 이를 활용하여 카테고리별 게시글, 태그별 게시글을 보여주는 것이 의도였다.

하지만, Sㄴㅎ