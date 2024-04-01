---
title: "[NextJS] 블로그 개편기 - 3. SCSS 입히기"
excerpt: "원래 내 블로그는 JS-in-CSS 스타일 방식을 사용하고 있었다. 그 이유는 Material-UI 때문. Material-UI의 공식 예제에서 대놓고 JS-in-CSS 방식으로 설명하기 때문에, React 기초 수준이였던 난 당연히 이렇게 해야하는 줄 알고 있었다. 하지만 개발을 거듭하며, 그 중 몇몇은 복잡한 스타일을 강요받기도 하며 점점 스타일 구문이 비대해지는 컴포넌트가 생겨나기 시작했다. 이에 따라 JS-in-CSS의 단점이 점점 대두되기 시작했다. 대표적인 문제점으로 FOCU(Flash Of Unstyled Content). 스타일 렌더링에 시간이 소요되어, 사용자가 렌더링 이전의 페이지를 보게 되는 현상이다. 내 페이지의 경우 약 1초가 조금 안 되게 FOUC가 발생했는데, 사용자 경험을 극도로 해치는 일이였다. 블로그 개편을 마음먹게 된 가장 큰 이유 역시 이 FOCU 현상 때문이였으며, 관련 정보 조사 결과 CSS-in-CSS의 성능이 월등히 뛰어나다는 점을 확인했다."
coverImage: "https://user-images.githubusercontent.com/50317129/134931033-89954c3d-5e00-4b3b-85aa-54a1dfa29e46.png"
date: 1632457044000
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React", "SCSS", "CSS" ]
group: "블로그 개편기"
comment: true
publish: true
---

# 개요

원래 내 블로그는 JS-in-CSS 스타일 방식을 사용하고 있었다. 그 이유는 Material-UI 때문. Material-UI의 공식 예제에서 대놓고 JS-in-CSS 방식으로 설명하기 때문에, React 기초 수준이였던 난 당연히 이렇게 해야하는 줄 알고 있었다.

하지만 개발을 거듭하며, 그 중 몇몇은 복잡한 스타일을 강요받기도 하며 점점 스타일 구문이 비대해지는 컴포넌트가 생겨나기 시작했다. 이에 따라 JS-in-CSS의 단점이 점점 대두되기 시작했다. 대표적인 문제점으로 FOCU(Flash Of Unstyled Content). 스타일 렌더링에 시간이 소요되어, 사용자가 렌더링 이전의 페이지를 보게 되는 현상이다. 내 페이지의 경우 약 1초가 조금 안 되게 FOUC가 발생했는데, 사용자 경험을 극도로 해치는 일이였다.

블로그 개편을 마음먹게 된 가장 큰 이유 역시 이 FOCU 현상 때문이였으며, 관련 정보 조사 결과 CSS-in-CSS의 성능이 월등히 뛰어나다는 점을 확인했다.

``` javascript
/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		fab_bright: {
			position: "fixed",
			bottom: 50,
			right: 50,
			backgroundColor: grey[800],
			color: grey[200],
			"&:hover": {
				backgroundColor: grey[700]
			},
			"& svg": {
				color: orange[600]
			},
			[theme.breakpoints.up("md")]: {
				"& span": {
					marginLeft: theme.spacing(1)
				}
			},
			[theme.breakpoints.down("sm")]: {
				bottom: 70,
				right: 20
			}
		},
		fab_dark: {
			position: "fixed",
			bottom: 50,
			right: 50,
			backgroundColor: grey[200],
			color: grey[900],
			"&:hover": {
				backgroundColor: grey[300]
			},
			"& svg": {
				color: blue[600]
			},
			[theme.breakpoints.up("md")]: {
				"& span": {
					marginLeft: theme.spacing(1)
				}
			},
			[theme.breakpoints.down("sm")]: {
				bottom: 70,
				right: 20
			}
		},
		div: {
			height: 24
		}
	}))();
}
```

심지어 JS-in-CSS 시절의 스타일 구현 코드를 보면, 요소의 중첩이 적용되어있어 일반적인 CSS로는 그대로 옮기기 어려운 형태였다. 또한 CSS의 중첩을 접하게 되면서, 중첩이 주는 편의성에 익숙해진 터라 스타일만 CSS로 옳기면서 그 편의성만 그대로 유지하고 싶었다.

결국 프로젝트에 CSS 전처리기를 적용하기로 결정했다.

# CSS의 전처리기

CSS의 전처리기는 여러 종류가 있다.

* [SASS/SCSS](https://sass-lang.com)
* [LESS](https://lesscss.org)
* [Stylus](https://www.stylus.com)
* [PostCSS](https://postcss.org)

CSS 전처리기의 궁극적인 목표는 CSS의 확장성을 통해 개발에서의 여러 이점을 확보하는 것이다.

CSS 전처리기를 사용하면 무려 파일에서 `@for`나 `@mixin`, 변수와 같은 동적 코딩이 가능해진다. 아쉽게도 전처리기 파일을 그대로 브라우저에서 사용할 순 없다. 역시나 이런 류의 다른 언어와 마찬가지로 컴파일이 필요하며, 컴파일의 결과물은 CSS 파일로 출력된다.

즉, 컴파일 단계에서 CSS 전처리기 파일에 선언된 명령문이 동작하여 평범한 CSS로 출력되는 것이다.

## 장점

1. 반복적인 CSS 구문 축소
2. 변수를 통한 일괄 관리
3. 중첩을 통한 CSS 구문 가독성 확보
4. 파일 분리를 통한 컴포넌트화 용이

## 단점

1. 전처리기별로 학습곡선 존재
2. 별도의 개발환경 구축 필요

# SCSS

이 블로그에서 나는 SCSS를 차용했다. CSS 전처리기에 걸맞는 다양한 확장 구문을 사용할 수 있으면서도, 기존의 CSS 문법과 거의 차이가 없기 때문이다.

원래 SCSS의 전신은 SASS로, Syntactically Awesome Style Sheets의 약자다. 한글로 직역하면 대충 문법적으로 개쩌는 스타일 시트 정도로 표현할 수 있다.

SASS는 가장 처음으로 나온 전처리기로, Ruby 언어에 기반한 문법을 가지고 있어 CSS에서 바로 선회하기 어려운 부분이 많았다. 표현식이 달랐고, 문법에도 차이가 있었다.

이후 SASS의 단점을 해소한 SCSS(Sassy CSS)나 나왔는데, CSS 전처리기의 확장성을 지니면서도 CSS의 문법과 매우 유사하다. 덕분에 전처리기 중에서도 러닝커브가 상당히 낮은 편이다.

<br />
<br />

SCSS와 SASS의 차이는 아래의 예시에서 극명하게 드러난다.

``` css
div {
	color: grey;

	width: 80px;
	height: 160px;
}

div h1 {
	color: dodgerblue;
}
```

``` sass
$length: 80px

div
	color: grey

	width: $length
	height: $length * 2

	h1
		color: dodgerblue
```

``` scss
$length: 80px;

div {
	color: grey;

	width: $length;
	height: $length * 2;

	h1 {
		color: dodgerblue;
	}
}
```

위 차이에서 알 수 있듯이, SASS는 CSS와 SCSS에 비해 표현식이 좀 다르다. 모티브로 삼은 언어가 서로 달라서 생긴 차이다.

다행히도 후에 나온 SCSS는 SASS의 장점과 CSS의 문법을 그대로 흡수하여 흡사 CSS를 작성하는 것과 별반 차이가 없기에, 대부분 SCSS를 많이 차용하는 편이다. 실제로 SASS로 구현 가능한 건 SCSS로 전부 구현할 수 있으며, 심지어 공식 홈페이지에서도 SCSS를 권장하고 있다. 또한 SASS와 SCSS의 개발환경 역시 동일하다.

SASS가 CSS 전처리기의 선두주자지만, 여러 이유로 후발주자인 SCSS가 더 많이 사용되고 있다. 하지만 이러한 상징성 및 이름의 유사성으로 인해 SASS와 SCSS를 구분없이 혼용하거나 그냥 둘 다 뭉뚱그려 SASS라고 표현하기도 한다.

즉, `SASS = SCSS`라 봐도 무방하다.

이렇게 다양한 장점들로 인해 SCSS를 차용하기로 결정했다.

# 프로젝트에 SCSS 적용하기

SCSS는 Typescript와 같이 별도의 템플릿은 없으므로, 직접 설정해야한다. 매우 쉬우니 겁먹지 않아도 된다.

## SCSS Loader 설치하기

``` bash
 # NPM 기반
npm install @zeit/next-sass --save-dev

 # Yarn 기반
yarn add @zeit/next-sass --dev
```

위 명령어를 이용하여 SASS Loader를 설치한다. 내가 쓴 건 SCSS 아니냐고? 위에 언급했다시피 SASS와 SCSS의 개발환경이 동일하다. 컴파일러 역시 동일하므로, SASS Loader를 설치해도 아무 문제가 없다.

## SCSS Loader 설정하기

``` javascript
const withSass = require('@zeit/next-sass');

module.exports = withSass();

// 기존 next.config.js 내용 ...
```

NextJS의 설정파일인 `next.config.js`에 위 구문을 추가한다. `withSass()` 안엔 JSON 형태로 추가적인 옵션을 지정할 수 있다. 예를 들어, `@zeit/next-sass` 로더를 적용하면 CSS 파일들은 전부 SASS/SCSS로 변경하라는 문구와 함께 오류를 띄운다. 이 때, 아래와 같이 옵션을 주면 CSS도 병행해서 사용할 수 있다.

``` javascript
module.exports = withSass({
	cssModules: true
});
```

[@zeit/next-sass NPM 저장소](https://www.npmjs.com/package/@zeit/next-sass)에서 자세한 옵션을 확인할 수 있다.

이후 프로젝트에서의 사용은 CSS와 동일하다.

# ScSS 톺아보기

SCSS는 CSS의 전처리기로써 CSS에 없던 강력한 기능들을 제공한다. 보다보면 CSS 코딩하다 느낀 불편함을 해소해주거나, CSS에는 이런거 안 되나? 싶었던 기능들이 많다.

## 변수 선언하기

프로그래밍에서의 변수는 다양한 의미를 갖지만, 그 중에서도 특정 값을 하나의 변수에 할당하여 관리할 수 있다는 장점이 있다. 만약 해당 값을 바꿔야 할 경우, 변수가 없다면 해당 값을 쓰는 모든 코드를 변경했어야 한다.

하지만 변수를 사용한다면 다 필요없이 변수에 할당된 값만 변경해주는 것으로 끝난다.

CSS에는 본디 이런 기능이 없었으나, SCSS에선 변수의 존재로 인해 CSS를 좀 더 프로그래밍적인 측면에서 다가갈 수 있다.

``` scss
$base: 16px;

.font-1 {
	font-size: $base;
}

.font-2 {
	font-size: $base + 2px;
}

.font-3 {
	$color: dodgerblue;

	font-size: $base + 4px;

	background-color: $color;
	border: 1px solid $color;
}
```

``` css
.font-1 {
	font-size: 16px;
}

.font-2 {
	font-size: 18px;
}

.font-3 {
	font-size: 20px;
	background-color: dodgerblue;
	border: 1px solid dodgerblue;
}
```

이와 같이 $ 기호를 통해 변수를 사용할 수 있다. 일반적인 할당은 물론, 사칙연산도 가능하다. 변수의 값은 CSS에서 사용할 수 있는 모든 값(#05A46B, skyblue, "나눔고딕", 38px 등)을 할당할 수 있다.

SCSS의 `base`는 전역변수로 어디서나 호출할 수 있다. `color`는 지역변수로 `.font-3` 블럭과 중첩된 하위 블럭에서만 호출할 수 있다.

> <b class="orange-400">🔍변수의 범위(scope)</b>  
> SCSS의 변수는 자신만의 범위를 가진다. 블럭 내부에 선언된 변수는 중첩된 하위 블럭에서 호출할 수 있다. 반대로 하위 블럭에서 선언된 변수는 상위 블럭에서 호출할 수 없다. 블럭이 아닌 파일 자체에 선언될 경우 <span class="blue-400">전역변수</span>로 지정되어 파일에 선언된 모든 곳에서 호출할 수 있다.

### 전역변수 선언하기

``` scss
.font-1 {
    $base: 16px !global;
	font-size: $base;
}

.font-2 {
	font-size: $base + 2px;
}

.font-3 {
	$color: dodgerblue;

	font-size: $base + 4px;

	background-color: $color;
	border: 1px solid $color;
}
```

파일 외부에서 쓰는 것 외에도, `!global` 지시어를 사용하면 어디서나 전역변수를 선언할 수 있다. 단, 이렇게 블럭 내부에서 `!global`로 선언된 전역변수는 <span class="red-400">해당 블럭 이후의 코드에서만 접근 가능</span>하다.

만약 `base` 변수가 `.font-2`에서 전역변수로 선언되었다면, `.font-1` 블럭에서는 접근할 수 없다.

## 리스트 선언하기

단순 값 뿐만 아니라 리스트도 선언할 수 있다.

``` scss
$bright: #000000, #444444, #888888, #BBBBBB, #FFFFFF;

$list: red, #FF00FF, "Arial", 16px;
```

리스트는 쉼표로 구분한다. 리스트 데이터의 타입이 동일할 필요는 없다.

### 리스트 다루기

``` scss
$bright: #000000, #444444, #888888, #BBBBBB, #FFFFFF;

// => #888888
nth($bright, 3);

// => #888888이 #777777로 교체됨
set-nth($bright, 3, #777777);

// => bright에 #EEEEEE가 추가됨
append($bright, #EEEEEE);
```

리스트의 기초적인 문법은 위와 같다. 또한 `@each`를 통해 타 언어의 `foreach`를 구현할 수 있다.

``` scss
$color: white, red, green, blue, black;

@each $item in $color {
	.font-#{$item} {
		color: $item;
	}
}
```

``` css
.font-white {
	color: white;
}

.font-red {
	color: red;
}

.font-green {
	color: green;
}

.font-blue {
	color: blue;
}

.font-black {
	color: black;
}
```

`@each`를 이용하면 반복적인 구문을 쉽게 만들 수 있다.

## Map 선언하기

위의 리스트가 단순한 요소만으로 이루어졌다면, Map은 우리가 흔히 아는 key-value 형태의 변수다.

``` scss
$map: (shorter: 20px, short: 40px, normal: 60px, long: 80px, longer: 100px);

$map: (a: 20px, b: red, c: #00DE00, d: "Arial", e: center);
```

Map의 key-value는 위와 같이 표기한다. 리스트와 마찬가지로 요소의 타입은 자유롭게 선언 가능하다.

### Map 다루기

``` scss
$map: (shorter: 20px, short: 40px, normal: 60px, long: 80px, longer: 100px);

// => 20px
map-get($map, shorter);

// => longer의 100px가 120px로 교체됨
map-set($bright, longer, 120px);

// => shorter, short, ..., longer 순으로 맵의 키 리스트 배열 반환
map-keys($bright);

// => 20px, 40px, ..., 100px 순으로 맵의 값 리스트 배열 반환
map-values($bright);
```

위와 같이 Map을 다룰 수 있다.

## @if, @else if, @else 사용하기

익숙한 조건문이다. SCSS는 위와 같은 지시어로 조건문을 구현할 수 있으며, 우리가 흔히 아는 방식과 매우 유사하다.

``` scss
@mixin box($size, $platform) {
	width: $size;
	height: $size;

	@if $platform == "naver" {
		background-color: #03C75A;
		color: white;
	}

	@else if $platform == "kakao" {
		background-color: #FEE500;
		color: black;
	}

	@else {
		background-color: white;
		color: black;
	}
}

$box-size: 50px;

.auth[data-platform=naver] {
	@include box($box-size, "naver");
}

.auth[data-platform=kakao] {
	@include box($box-size, "kakao");
}

.auth[data-platform=google] {
	@include box($box-size, "google");
}
```

``` css
.auth[data-platform=naver] {
  width: 50px;
  height: 50px;
  background-color: #03C75A;
  color: white;
}

.auth[data-platform=kakao] {
  width: 50px;
  height: 50px;
  background-color: #FEE500;
  color: black;
}

.auth[data-platform=google] {
  width: 50px;
  height: 50px;
  background-color: white;
  color: black;
}
```

이와 같이 값에 따라 SCSS를 다르게 적용할 수 있다. 이를 응용하여 특정 조건에서는 추가적인 스타일을 지정하거나 제외하는 방식도 구성할 수 있다.

사용법은 우리가 흔히 아는 조건문과 매우 유사하니 어렵지 않을 것이다.

## @for 사용하기

무릇 프로그래밍 언어라면 하나쯤은 제공하는 반복문이다. SCSS는 `@for`의 형태로 제공한다.

``` scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

``` css
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```

위와 같이 사용 가능하다. `$i`는 임의로 지정하는 키 인덱스 변수이며, 1 부터 3까지 반복한다.

## @mixin와 @include

CSS를 쓰다보면 한 번 쯤 타 언어의 함수 개념을 적용하고 싶다는 생각이 들 것이다.

기존의 CSS는 함수 개념이 존재하지 않아, 동일한 코드를 쓰기 위해선 동일한 선택자를 사용하거나, 어쩔 수 없이 중복 코드를 사용해야만 했다.

하지만 SCSS에선 `@mixin` 문법을 통해 코드의 스니펫을 저장하고 이를 적재적소에 사용할 수 있다.

``` scss
@mixin square($size, $color) {
	width: $size;
	height: $size;

	background-color: $color;

	&:hover {
		background-color: transparent;

		border: 1px solid $color;
	}
}

.box {
	@include square(20px, red);
	
	box-shadow: 1px 1px 10px grey;
}
```

``` css
.box {
	width: 20px;
	height: 20px;
	background-color: red;
	box-shadow: 1px 1px 10px grey;
}

.box:hover {
	background-color: transparent;
	border: 1px solid red;
}
```

위와 같이 `@mixin`으로 `square()`라는 스니펫을 선언했다. 이 스니펫은 `size`, `color`라는 인수를 받는다.

원하는 블럭에서 `@include`를 통해 해당 스니펫을 호출하면 그 블럭에 호출한 스니펫이 포함된다. 코드의 중복을 효과적으로 없애주어 유지보수의 난이도를 낮출 수 있으며, 이러한 패턴은 컴포넌트별로 스타일을 관리하기에도 매우 용이하다.

`@include` 사용 시 `@mixin`이 별도의 인수를 받지 않을 경우 괄호를 생략해도 무관하다.

## @import로 파일 합치기

`@import`는 다른 SCSS 파일을 삽입하여 해당 파일의 내용에 덧대어 SCSS를 작성할 수 있다.

공통 혹은 모듈화된 SCSS를 별도의 파일로 관리하며, 해당 모듈이 필요한 SCSS에 `@import`를 통해 삽입함으로써 SCSS의 모듈화를 구현할 수 있다.

``` scss
// box.scss
@mixin square($size, $color) {
	width: $size;
	height: $size;

	background-color: $color;

	&:hover {
		background-color: transparent;

		border: 1px solid $color;
	}
}

.box {
	@include square(20px, red);
	
	box-shadow: 1px 1px 10px grey;
}
```

``` scss
@import "./box.scss";

// require-box.scss
.require-box {
	@include square(20px, dodgerblue);
	
	background-color: grey;
}
```

``` css
/* require-box.css */
.box {
	width: 20px;
	height: 20px;
	background-color: red;
	box-shadow: 1px 1px 10px grey;
}

.box:hover {
	background-color: transparent;
	border: 1px solid red;
}

.require-box {
	width: 20px;
	height: 20px;
	background-color: dodgerblue;
	box-shadow: 1px 1px 10px grey;
}

.require-box:hover {
	background-color: transparent;
	border: 1px solid dodgerblue;
}
```

`@import` 지시어 뒤에 삽입할 파일의 경로를 입력하면 된다.

임의의 SCSS인 `box.scss`와 이를 삽입하여 작성한 `require-box.scss`가 있다고 가정하자. 컴파일 결과물인 `require-box.css`에는 위와 같이 `box.scss`와 `require-box.scss`의 내용이 합쳐진 결과물이 컴파일된다.

`require-box.scss`는 `box.scss`를 삽입함으로써 `box.scss`에 선언된 전역 변수 혹은 스니펫 등을 사용할 수 있다. 그러나 `box.scss`에 선언된 내용으로 인해 원하지 않는 영향을 받을 가능성이 있으니 설계시 유의하자.

# 예시

``` scss
@mixin oneline {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: 0.5s;
}

.category {
	@include oneline;

	width: 50%;
	font-size: 20px !important;
	margin-bottom: 0px !important;

	transition: 0.5s;

	color: map-get($map: $amber, $key: "700");

	@media (max-width: 960px) {
		font-size: 16px !important;

		transition: 0.5s;
	}
}
```

컨텐츠의 카테고리를 표시하는 SCSS의 일부다. `@mixin`, `@include` 구문을 통해 코드를 함수화하여 필요한 곳에서 호출하여 사용할 수 있었다.

``` scss
@mixin genColor($map, $str) {
	@each $key, $val in $map {
		.#{$str}-#{$key} {
			color: $val;
		}
	}
}

@include genColor($red, red);
@include genColor($pink, pink);
@include genColor($purple, purple);
@include genColor($deepPurple, deepPurple);
@include genColor($indigo, indigo);
@include genColor($blue, blue);
@include genColor($lightBlue, lightBlue);
@include genColor($cyan, cyan);
@include genColor($teal, teal);
@include genColor($green, green);
@include genColor($lightGreen, lightGreen);
@include genColor($lime, lime);
@include genColor($yellow, yellow);
@include genColor($amber, amber);
@include genColor($orange, orange);
@include genColor($deepOrange, deepOrange);
@include genColor($brown, brown);
@include genColor($grey, grey);
@include genColor($blueGrey, blueGrey);
```

`@mixin`은 타 언어의 메소드와 개념이 매우 유사하여, 코드의 중복을 효과적으로 방지할 수 있는 매력적인 예약어다.

``` scss
@import "./fonts/apple.scss";
@import "./fonts/blacksword.scss";

@import "./common/color.scss";
@import "./common/icons.scss";
```

`@import`로 다른 SCSS 파일을 삽입할 수 있다. 이러한 패턴으로 SCSS을 컴포넌트별로 관리할 수 있었으며, 코드의 길이가 늘어남을 방지하여 더 나은 유지보수 용이성을 제공했다.

더 자세한 정보는 [SASS 공식 Document](https://sass-lang.com/documentation)에서 자세히 확인할 수 있다.

# 정리

큰 장점과 동반되는 여러 자잘한 단점들이 있었던 Typescript와 다르게, SCSS의 많은 장점에도 불구하고 그 단점은 거의 체감되지 않았다.

앞으로의 모든 프로젝트에 SCSS를 적용시키고 싶을 정도로 개발 편의성이나 생산성을 향상시켜주지 않았나 싶다.

SCSS의 개발환경 구축 필요성도, 어차피 내 블로그는 NextJS로 구성됐기 때문에 설정에서 몇 줄 추가하는 것 만으로 해결. 여러모로 만족스러운 경험이였다.