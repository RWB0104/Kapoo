---
title: "[NextJS] 블로그 개편기 - 3. SCSS 입히기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/133300948-2ee9b77a-1589-4afc-8489-fb402a13520f.png"
date: "2021-09-21T05:30:21"
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React", "Typescript" ]
group: "블로그 개편기"
comment: true
publish: false
---

# 개요

원래 내 블로그는 JS-in-JS 스타일 방식을 사용하고 있었다. 그 이유는 Material-UI 때문. Material-UI의 공식 예제에서 대놓고 JS-in-JS 방식으로 설명하기 때문에, React 기초 수준이였던 난 당연히 이렇게 해야하는 줄 알고 있었다.

하지만 개발을 거듭하며, 그 중 몇몇은 복잡한 스타일을 강요받기도 하며 점점 스타일 구문이 비대해지는 컴포넌트가 생겨나기 시작했다. 이에 따라 JS-in-JS의 단점이 점점 대두되기 시작했다. 대표적인 문제점으로 FOCU(Flash Of Unstyled Content). 스타일 렌더링에 시간이 소요되어, 사용자가 렌더링 이전의 페이지를 보게 되는 현상이다. 내 페이지의 경우 약 1초가 조금 안 되게 FOUC가 발생했는데, 사용자 경험을 극도로 해치는 일이였다.



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

# SCSS 문법

`@`가 붙는 예약어를 제외하면 일반적인 문법은 CSS와 매우 흡사하다.

## 기본 문법

CSS와 동일하게 사용한다.

``` scss
div {
	color: white;
	background-color: black;
}

#id-modal {
	width: 80px;
}

.class-modal {
	height: 80px;
}
```

## 중첩

하위 요소를 중첩하여 표기할 수 있다. 동일한 동작의 CSS, SCSS 구문을 비교해보자.

``` css
#id-modal {
	width: 80px;
}

#id-modal > h2 {
	font-weight: bolder;
	color: gold;
}

#id-modal li {
	font-size: 14px;
	color: gainsboro;
}

#id-modal li span {
	cursor: pointer;
}

#id-modal:hover {
	border: 1px solid dodgerblue;
	transition: 0.5s;
}
```

``` scss
#id-modal {
	width: 80px;

	& > h2 {
		font-weight: bolder;
		color: gold;
	}

	li {
		font-size: 14px;
		color: gainsboro;

		span {
			cursor: pointer;
		}
	}

	&:hover {
		border: 1px solid dodgerblue;
		transition: 0.5s;
	}
}
```

CSS에 비해 SCSS가 압도적으로 가독성이 높은 것을 확인할 수 있다. CSS는 하위 요소를 직접 개별적으로 작성하는 반면, SCSS는 하위 요소를 요소 내부에 작성하는 방식이다.

SCSS의 하위 요소 방식은 반복된 요소 선택을 방지하고, 코드의 가독성이 높아진다. CSS와 같은 형식의 코드는 블록 단위로 인식하는 경우가 많기 때문에, 같은 코드라도 SCSS는 하나의 코드로 인식하는 반면, CSS는 다수의 개별적인 코드로 인식하기 때문에 스타일 코드가 한 눈에 들어오지 않게된다.

하위 요소의 `&`은 자기 자신을 의미한다. 즉, 위 코드의 `&`는 `#id-modal`을 의미한다.

## Variable

SCSS는 전처리기답게 변수를 사용할 수 있다.

``` css
.font-1 {
	font-size: 16px;
}

.font-2 {
	font-size: 18px;
}

.font-3 {
	font-size: 20px;
}
```

``` scss
$base-size: 16px;

.font-1 {
	font-size: $base-size;
}

.font-2 {
	font-size: $base-size + 2px;
}

.font-3 {
	font-size: $base-size + 4px;
}
```

변수는 ${key}: {value}같이 사용하면 된다. 변수를 활용하면 위 코드처럼 요소의 일괄적인 변경이 가능하다.

또한 리스트나 key, value 형식의 맵 변수도 선언할 수 있다.

``` scss
$list: #000000, #555555, #AAAAAA, #FFFFFF;

$map: ("white": #FFFFFF, "red": #FF0000, "blue": #0000FF, "green": #00FF00);
```

list의 호출은 `nth(list, index)`, map의 호출은 `map-get(map, key)`를 통해 해당하는 요소를 호출할 수 있다.

일반적인 언어와 달리, <span class="red-400">리스트의 인덱스는 1부터 시작</span>함에 유의하자.

또한 `foreach` 처럼 배열이나 맵의 값을 iterator 방식으로 추출할 수도 있는데, 이는 후술한다.

## @for

`@for` 예약어를 사용하면 스타일 시트에서도 반복문을 사용할 수 있다.

``` css
.font-1 {
	font-size: 16px;
}

.font-2 {
	font-size: 18px;
}

.font-3 {
	font-size: 20px;
}
```

``` scss
$base-size: 16px;

@for $i from 1 through 3 {
	.font-#{$i} {
		font-size: $base-size + (($i - 1) * 2px);
	}
}
```

변수를 값이 아닌 선택자에 지정할 경우 `#{}`으로 묶어야한다.

위 코드는 SCSS를 사용해 반복적인 패턴의 코드를 간소화한 것이다. CSS의 경우 반복되는 패턴의 코드를 하나하나 입력해야한다. 다행히 위 케이스는 3개 정도지만, 만약 수십개가 넘어갈 경우 개발 편의성은 심각하게 떨어지게된다.

프로그래밍에서 반복문이 가지는 의미를 생각해본다면, 반복문이 없던 스타일 시트의 `@for`문은 매우 중요한 요소다.

## @each

리스트나 맵과 같은 객체의 iterator 방식 반복문이다.

``` css
.list-1 {
	color: #000000;
}

.list-2 {
	color: #555555;
}

.list-3 {
	color: #AAAAAA;
}

.list-4 {
	color: #FFFFFF;
}

.map-white {
	color: #FFFFFF;
}

.map-red {
	color: #FF0000;
}

.map-blue {
	color: #0000FF;
}

.map-green {
	color: #00FF00;
}
```

``` scss
$list: #000000, #555555, #AAAAAA, #FFFFFF;

$map: ("white": #FFFFFF, "red": #FF0000, "blue": #0000FF, "green": #00FF00);

@each $val in $list {
    $index: index($list, $val);
	.list-#{$index} {
		color: $val;
	}
}

@each $key, $val in $map {
	.map-#{$key} {
		color: $val;
	}
}
```

위와 같이 사용할 수 있다. 리스트에서 `index(리스트, 값)`을 사용하면 해당 값의 인덱스를 반환해준다.

`@each`는 맵 데이터에 적합하며, 리스트는 `@for`를 사용하는 것이 더 편하다.

``` scss
$list: #000000, #555555, #AAAAAA, #FFFFFF;

@for $index from 1 through length($list) {
	.list-#{$index} {
		color: nth($list, $index);
	}
}
```

`length(리스트)`를 사용하면 리스트의 갯수를 반환한다.

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

컨텐츠의 카테고리를 표시하는 SCSS의 일부다. `@mixin` 구문은 텍스트를 한 줄로 표현하며, 지정한 크기를 넘어갈 시 CSS로 말줄임 처리하는 코드다. `@mixin`은 재사용을 위한 코드라 보면 된다. 대부분의 언어에 존재하는 함수/메서드와 그 개념이 매우 유사하다.

`@mixin`으로 선언된 코드는 `@include`를 통해 사용할 수 있으며, `@mixin`에 파라미터를 전달하여 동적 스타일링을 수행할 수도 있다. 위 사진의 예제처럼 별도의 인수가 필요 없을 경우 `@include oneline`와 같이 괄호를 생략하기도 한다.

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

`@mixin`에 인수가 필요할 경우, 위와 같이 `@include`를 통해 함수처럼 사용할 수 있다. `@mixin`은 

``` scss
@import "./fonts/apple.module.scss";
@import "./fonts/blacksword.module.scss";

@import "./common/color.module.scss";
@import "./common/icons.scss";

@import "./components/global/markdown.scss";
```

`@import`로 다른 SCSS 파일을 