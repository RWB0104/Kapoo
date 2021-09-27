---
title: "[NextJS] 블로그 개편기 - 3. SCSS 입히기"
excerpt: "원래 내 블로그는 JS-in-CSS 스타일 방식을 사용하고 있었다. 그 이유는 Material-UI 때문. Material-UI의 공식 예제에서 대놓고 JS-in-CSS 방식으로 설명하기 때문에, React 기초 수준이였던 난 당연히 이렇게 해야하는 줄 알고 있었다. 하지만 개발을 거듭하며, 그 중 몇몇은 복잡한 스타일을 강요받기도 하며 점점 스타일 구문이 비대해지는 컴포넌트가 생겨나기 시작했다. 이에 따라 JS-in-CSS의 단점이 점점 대두되기 시작했다. 대표적인 문제점으로 FOCU(Flash Of Unstyled Content). 스타일 렌더링에 시간이 소요되어, 사용자가 렌더링 이전의 페이지를 보게 되는 현상이다. 내 페이지의 경우 약 1초가 조금 안 되게 FOUC가 발생했는데, 사용자 경험을 극도로 해치는 일이였다. 블로그 개편을 마음먹게 된 가장 큰 이유 역시 이 FOCU 현상 때문이였으며, 관련 정보 조사 결과 CSS-in-CSS의 성능이 월등히 뛰어나다는 점을 확인했다."
coverImage: "https://user-images.githubusercontent.com/50317129/134931033-89954c3d-5e00-4b3b-85aa-54a1dfa29e46.png"
date: "2021-09-24T13:17:24"
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
@import "./fonts/apple.module.scss";
@import "./fonts/blacksword.module.scss";

@import "./common/color.module.scss";
@import "./common/icons.scss";

@import "./components/global/markdown.scss";
```

`@import`로 다른 SCSS 파일을 삽입할 수 있다. 이러한 패턴으로 SCSS을 컴포넌트별로 관리할 수 있었으며, 코드의 길이가 늘어남을 방지하여 더 나은 유지보수 용이성을 제공했다.

# 정리

큰 장점과 동반되는 여러 자잘한 단점들이 있었던 Typescript와 다르게, SCSS의 많은 장점에도 불구하고 그 단점은 거의 체감되지 않았다.

앞으로의 모든 프로젝트에 SCSS를 적용시키고 싶을 정도로 개발 편의성이나 생산성을 향상시켜주지 않았나 싶다.

SCSS의 개발환경 구축 필요성도, 어차피 내 블로그는 NextJS로 구성됐기 때문에 설정에서 몇 줄 추가하는 것 만으로 해결. 여러모로 만족스러운 경험이였다.