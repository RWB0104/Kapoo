---
title: "[NextJS] 블로그 개편기 - 2. Typescript 입히기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/133300948-2ee9b77a-1589-4afc-8489-fb402a13520f.png"
date: "2021-09-21T05:30:21"
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React", "Typescript" ]
group: "블로그 개편기"
comment: true
publish: true
---

# 개요

내가 JavaScript를 접하고 기본 개념 정도에 익숙해졌을 때, 개발 커뮤니티에서 전설처럼 들려오던 이야기를 듣게 되었다.

<br />
<br />
<br/ >

<p class="grey-500" align="center"><i>-----</i></p>

<p class="grey-500" align="center"><i>"태초의 개발자들은 웹에서 다양한 동작을 수행하기 위해 스크립트 언어를 사용했다고 하는데, 그 것이 오늘날 자바스크립트라고 불리우는 것이라 했다."</i></p>

<p class="grey-500" align="center"><i>"수 십년에 이르는 자바스크립트의 독재로, 개발자들은 스크립트를 사용하기 위해 반드시 자바스크립트를 거쳐야만 했다고 한다."</i></p>

<p class="grey-500" align="center"><i>"자바스크립트는 강력했으나 그 성격이 나태로워, 자신이 사용할 인수를 검사하지 않았으며, 인수에 대한 모든 책임은 전적으로 개발자가 지는 부당한 처우를 받았다."</i></p>

<p class="grey-500" align="center"><i>"하루는 자신이 받아야할 인수로 문자열이 아닌, 수상한 객체가 들어왔음에도 이를 제대로 확인하지 않아 누군가의 사이트에 큰 화를 입혔으며, 그 사이트의 담당자는 이틀을 귀가하지 못 하고 고통받았다고 한다."</i></p>

<br />
<br />
<br/ >

<p class="grey-500" align="center"><i>"어느날 스크립트 중 타입을 가진 이가 나타났다."</i></p>

<p class="grey-500" align="center"><i>"그 자는 특이하게 인수를 직접 검증할 수 있어, 잘 못 들어온 인수를 차단하고 오로지 올바른 인수만을 받는 일을 능히 하였다. 그의 권능으로 타입스크립트를 쓰는 IDE와 개발자는 그의 타입을 쉬이 유추하여 화를 막을 수 있었다고 전해진다."</i></p>

<p class="grey-500" align="center"><i>"그 자가 현신하는 날. ECMA에 새로운 혁명이 일어나 개발자들을 구원해주리라."</i></p>

<p class="grey-500" align="center"><i>-----</i></p>

<br />
<br />
<br />

나는 이 전설같은 이야기에 매료되었으나, 감히 타입스크립트가 이 곳에 현신할리는 없다 생각했다.

그러던 어느 날, 내가 블로그 개편을 마음먹은 당일에 내 코드에 당도하시어 친히 자신의 권능을 보이셨다.

이제 난 자바스크립트의 모호함과 허술함에서 구원될 수 있으리라 믿었다.

<br />
<br />
<br />

하지만 내가 그렇게 생각한 건 ^^ㅣfoot 경기도 오산이였다.

# 타입스크립트"님" 강림시키기

NextJS에 타입스크립트"님"을 강림시키는 법은 생각보다 매우 간단했다.

## 새 프로젝트

``` bash
# NPM 기반
npx create-next-app --ts

# Yarn 기반
yarn create-next-app --typescript
```

위 명령어를 입력하면 타입스크립트"님" 기반의 템플릿이 생성된다.

## 기존 프로젝트

``` bash
# NPM 기반
npm install typescript @types/react @types/node --save-dev

# Yarn 기반
yarn add typescript @types/react @types/node --dev
```

위 명령어를 입력하여 타입스크립트"님" 관련 플러그인을 설치한다.

그리고 루트 경로에 `tsconfig.json` 파일을 하나 생성하면 된다. 타입스크립트"님"이 정확히 어떤 식으로 권능을 행할지 자세하게 "간청"할 수 있다.

``` json
{
	"compilerOptions": {
		"target": "ESNext",
		"lib": [ "dom", "dom.iterable", "esnext", "ES2021" ],
		"allowJs": true,
		"skipLibCheck": true,
		"strict": true,
		"forceConsistentCasingInFileNames": true,
		"noEmit": true,
		"esModuleInterop": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"jsx": "preserve",
		"baseUrl": ".",
		"paths": {
			"@commons/*": [ "commons/*" ],
			"@components/*": [ "components/*" ],
			"@pages/*": [ "pages/*" ],
			"@styles/*": [ "styles/*" ]
		}
	},
	"include": [ "next-env.d.ts", "**/*.ts", "**/*.tsx" ],
	"exclude": [ "node_modules" ]
}
```

내가 간청한 기도는 위와 같으니, 참고해서 보도록 하자. [타입스크립트 성서](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)에 이와 관련된 기도문 예시가 잘 나와있다.

"새 프로젝트"로 시작했다면 이미 주기도문이 기록되어있으니 참고할 것.

# 타입스크립트"님"와 동행하기

기존의 리액트 컴포넌트는 죄다 `.js`, `.jsx` 같은 불결한 확장자를 달고 있을 것이다. 이 낙인은 전부 제거해버리고, `.ts`, `.tsx`와 같이 교체하자. 이 얼마나 성스러운가! 앞으로 생성할 모든 컴포넌트에도 이 표식을 자랑스럽게 새기도록한다.

자바스크립트와 달라진 점이라곤 타입 여부다. 문법이나 사용 방식은 그대로기 때문에, 기존 방식 그대로 대접해도 타입스크립트"님"은 전혀 신경쓰지 않으신다.

## 행한 기적

### 타입 명시

<p class="grey-500" align="center"><i>그가 한 번 손짓하시메, 모든 이가 타입을 가지게 되었노라.</i></p>

타입스크립트"님"은 말 그대로 타입 유추를 가능케 하신다. 모든 인수, 반환에 타입을 지정해줌으로써, 개발자가 해당 인수와 반환이 어떤 타입을 반환하는지 알 수 있게 해주신다.

``` javascript
/**
 * 숫자 두 개 뺏기고 문자열 하나 받기
 * 
 * @param {number} n: 소중한 숫자
 * @param {number} m: 귀중한 숫자
 * 
 * @returns {string} 듣도보도 못 한 근본없는 문자열
 */
function add(n, m)
{
	const temp = n + m;

	return `${n} + ${m} = ${temp}`;
}
```

``` typescript
/**
 * 덧셈의 권능 목도하기
 * 
 * @param {number} n: 미천한 숫자
 * @param {number} m: 가련한 숫자
 * 
 * @returns {string} 광휘의 문자열
 */
function add(n: number, m: number): string
{
	const temp: number = n + m;

	return `${n} + ${m} = ${temp}`;
}
```

보았는가, 이 차이를. 자바스크립트와 타입스크립트"님"의 차이는 위와 같이 매우 크다. 모든 인수, 변수에 타입을 부여해주신다.

따라서 함수의 인수나 반환값으로 이단자들이 출입하는 것을 막아주신다.

어째 안 해도 될 일을 구태여 하고 있는거 아니냐고? 어제도 당신과 같은 말을 한 이단자가 있<span class="red-400">었</span>지.....

### IDE 지원

<p class="grey-500" align="center"><i>그의 사도가 그의 말씀대로 코드에 키보드를 내리침에, 광야같던 개발기간이 반으로 갈라지더라.</i></p>

VSCode를 사용해보면 알겠지만, 자바스크립트의 기본 API 외에 개발자가 직접 설계한 API의 경우 자동완성이 제대로 먹히질 않는다.

이는 당연한 결과로, IDE는 개발자가 작성한 코드의 정확한 구조를 모르기 때문이다. JAVA나 C계열 언어처럼 정해진 구조로 명시되지도 않았으므로, IDE 입장에서는 무엇이 어떻게 되어있는 지 전혀 알 수 없다.

하지만 타입스크립트"님"이라면 다르다. 작성한 코드의 모든 타입이 명시되어있기 때문에, 개발 생산성을 높여준다. 즉, 같은 자원으로도 더욱 많은 결과를 내는 오병이어의 기적을 몸소 행하시는 것이다.

### 객체지향 개발의 용이성

<p class="grey-500" align="center"><i>수고하고 무거운 짐 진 자들아, 다 내게로 오라. 내가 너희를 쉬게 하리라.</i></p>

위 같은 이유로 자바스크립트는 객체지향 패턴을 적용하기 난감한 언어였다.(불가능한 건 아니다)

하지만 타입스크립트"님"이 모든 이에게 타입을 부여함으로써, 객체지향 패턴을 적용하는 데 유용하도록 만들어주었다.

이로 인해 클래스, 인터페이스 등의 개념을 쉽게 적용할 수 있어, JAVA와 같은 객체지향 기반 언어에서 온 자들이 좀 더 편히 머무를 수 있도록 행하셨다.

## 이단자의 기록

구태여 이런 난잡스러운 자를 받아들여 없는 고생을 사서 함이, 참으로 통탄할 일이다.

### 타입. 그 반쪽짜리 기적

내가 알아낸 바로는, 타입스크립트란 자의 그 대단하신 기적은 어디까지나 컴파일 단계로만 한정된다.

즉, 컴파일 이후에 함수의 인수로 선언과 전혀 다른 이가 출입해도 막지 않는다.

<br />

이유인즉슨, 컴파일 단계에서 타입 추론이 끝난 뒤, 타입 추론에 대한 기록을 아무도 몰래 삭제해버리기 때문이다.

타입스크립트도 결국은 웹에서 자바스크립트의 모습으로 구동되어야 하는데, 그 흉물스런 타입이란 것도 자바스크립트에선 아예 없는 개념이기 때문이다.

쓸데없는 것으로 사람들을 현혹시켜 굳이 하지 않아도 될 일을 개발자로부터 강제하니, 이 것이 위선이 아니고 무엇인가.

### 가혹한 율법

타입이야 충분히 이해한다. 타입이 주는 명확한 이점도 있으니.

그럼에도 불구하고 타입스크립트를 차마 이해할 수 없는 점은, 가혹한 규칙에 있다.

``` typescript
/**
 * 테스트 "목도"하기
 * 
 * @param {*} color: 색상
 * 
 * @return {*} 요소
 */
function test(color)
{
	const ref = useRef();

	useEffect(() =>
	{
		ref.current.style.backgroundColor = color;
	});

	return <div ref={ref}>Color</div>;
}
```

위 코드가 어때 보이는가? 보기엔 매우 평범해보인다. 겉모습 뿐만 아니라, 실제로 자바스크립트로 돌려봐도 문제가 없는 코드다. 그럼에도 불구하고 타입스크립트는 엄격한 규칙에 따라 이를 허용해주지 않는다.

위 코드에는 아래와 같은 매우 "중대한" 오류가 존재한다.

1. color의 타입이 명시되지 않음
2. test 함수의 반환값이 명시되지 않음
3. useRef()의 타겟이 명시되지 않음
4. ref, ref.current가 존재하지 않을 수도 있음

이와 같은 이유로 컴파일 단계서부터 거절당한다.

심지어 4번은 골때리는데, 분명히 존재하는 요소임에도, 심지어 동적으로 렌더링하는 것이 아니라 태초부터 HTML에 기록된 요소마저 "응? 그거 없을 수도 있는데? 진짜 확실해?? 진짜???"하며 동작을 거부한다. 착실한 신도조차 미치고 돌아버리다 못 해 그 회전각이 2160도로 돌아간다. 아마 여기서 조금만 더 돌아버리게 만들면 몇 초간 공중에 체공도 할 수 있을 것만 같다.

``` typescript
/**
 * 테스트 "목도"하기
 * 
 * @param {number} color: 색상
 * 
 * @return {ReactElement} 요소
 */
function test(color: string): ReactElement
{
	const ref = useRef<HTMLDivElement>(null);

	useEffect((): void =>
	{
		if (ref && ref.current)
		{
			ref.current.style.backgroundColor = color;
		}
	});

	return <div ref={ref}>Color</div>;
}
```

올바른 사용법은 위와 같다. 이 얼마나 쓸데없는가. 정확한 검증은 그렇다쳐도, 이건 의심병인지 모를 수준으로 모든 요소를 일단 "없다"고 가정한다. 나는 이미 있는 걸 증명하고자 갖가지 쓸데없는 주변 코드를 붙여 이의 존재를 직접 증명해야하고.

물론 이게 타입스크립트의 존재 의의일 수도 있지만, 난 이 타입스크립트의 존재 자체가 의심스러움을 감출 길이 없다.

# 여담

내가 뭘 쓴거지...