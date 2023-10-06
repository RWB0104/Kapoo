---
title: "[NextJS] 블로그 개편기 - 5. marked를 응용하여 코드블럭 디자인 개선하기"
excerpt: "이전 장에서 marked를 활용하여 이 블로그만의 마크다운 변환기를 구현했다. 이 변환기를 활용하여 밋밋한 코드블럭을 좀 더 IDE 같게 개선해보자."
coverImage: "https://user-images.githubusercontent.com/50317129/134931033-89954c3d-5e00-4b3b-85aa-54a1dfa29e46.png"
date: 1636287237000
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React", "Markdown", "HTML", "SCSS", "TypeScript" ]
group: "블로그 개편기"
comment: true
publish: true
---

# 개요

이전 장에서 marked를 활용하여 이 블로그만의 마크다운 변환기를 구현했다. 이 변환기를 활용하여 밋밋한 코드블럭을 좀 더 IDE 같게 개선해보자.










# 마크다운의 코드블럭

마크다운은 백틱(backtick)을 통해 코드블럭을 작성한다. 코드블럭의 종류는 인라인(inline) 형태와 블럭(block) 형태가 있다.





## 인라인형 코드블럭

인라인형 코드블럭은 백틱을 한 번 사용하여 표기하며, 아래와 같은 특징이 있다.

* 인라인 형태로 글 중간에 삽입하여 이어 쓰는 것이 가능
* 리스트, 표 등 어느 형태에서든 사용이 가능

`inline code block의 예시`는 이와 같다.





## 블럭형 코드블럭

블럭형 코드블럭은 백틱을 세 번 사용하여 표기하며, 아래와 같은 특징이 있다.

* 블럭 형태로 온전히 한 공간을 차지함
* 공간을 차지하므로, 글 중간에 이어 쓰거나, 리스트나 표에 쓰는 것이 불가능
* `html`, `markdown` 등의 언어 지정을 지원하므로, 언어별로 디테일한 코드 표현이 가능

``` javascript
const test = 'block codeblock test';

alert(test);
```

블럭형 코드블럭의 예시는 위와 같다. GitHub와 같이 마크다운을 지원하는 사이트의 경우, 코드블럭을 통해 해당하는 언어의 하이라이팅을 지원하기도 한다.










# 블럭형 코드블럭 디자인 개선하기

인라인형과 코드형 중에서 블럭형 코드블럭의 디자인을 개선해보자. 블럭형의 경우 인라인형과 달리 블럭 형태로 하나의 구역을 차지하며, 코드를 표기하기 때문에 디자인할 요소가 많은 편이다.

개선할 항목은 아래와 같다.

* 기본적인 디자인 프레임 변경
* 사용된 언어(JAVA, C# 등) 표시
* 내용 복사 버튼 추가
* 라인 숫자 표시
* 라인별 색상 구분 표시
* 마우스 오버 시 해당 라인 하이라이팅 구현

순차적으로 기능을 추가해보자





## 기본적인 디자인 프레임 변경하기

밋밋한 형태의 코드블럭 디자인을 변경하자. 외국 블로그에서 봤었던 코드블럭 형태 중 이쁘다고 생각했던 디자인을 모티브로 만들었다.

원랜 직접 보면서 디자인하려 했는데, 막상 찾으려고 하니 나오질 않아서 기억속에 어렴풋이 남아있는 디자인을 되짚어보며 구상했다.

![image](https://user-images.githubusercontent.com/50317129/140773168-5d03d708-dfd1-4f96-8aaa-0da1c0ab1a84.png)

위와 같이 창 형태의 디자인을 취하며, 좌측 상단에 매킨토시의 창 컨텍스트가 달려있다.

이미지를 사용할 수도 있겠지만, 태그로 구현할 수 있는건 가급적 태그로 구현하거나 정 여의치 않는다면 SVG로 구현하고자 하는 편이다. 이 디자인의 경우 복잡한 문양이 없으므로 HTML 태그 단계에서 모두 구현할 수 있을 것 같다.

적용할 레이아웃은 위와 같다. 이를 HTML로 나타내면 아래와 같다.

``` html
<div>
	<!-- 헤더 -->
	<div>
		<div><!-- 적색 버튼 --></div>
		<div><!-- 황색 버튼 --></div>
		<div><!-- 녹색 버튼 --></div>
	</div>

	<pre>
		<!-- 코드 내용 -->
	</pre>
</div>
```

렌더러가 코드블럭을 위와 같은 디자인으로 렌더링하도록 변경하자.

`marked`에서 블럭형 코드 블럭의 렌더러는 `renderer.code`로 정의된다. 해당 객체의 함수를 오버라이딩하면 된다.

| 파라미터 |   형식   | 필수  | 내용  |
| :------: | :------: | :---: | :---: |
|  `code`  | `string` |   Y   | 코드  |
|  `lang`  | `string` |   N   | 언어  |

|   형식   |    내용     |
| :------: | :---------: |
| `string` | 렌더링 결과 |

`renderer.code`의 파라미터와 반환값의 정의는 위 표와 같다. 위 정의에 부합하는 함수를 작성하면 된다.

``` typescript
loadLanguage([ 'javascript', 'typescript', 'java', 'html', 'css', 'json', 'scss', 'sass', 'sql', 'batch', 'bash' ]);

const renderer = new marked.Renderer();

// 코드블럭 렌더링
renderer.code = (code: string, lang: string | undefined): string =>
{
	// 유효한 언어가 있을 경우
	if (lang && renderer?.options?.highlight)
	{
		code = renderer.options.highlight(code, lang as string) as string;

		const langClass = 'language-' + lang;

		return `
			<div class="codeblock">
				<div class="top">
					<div></div>
					<div></div>
					<div></div>
				</div>

				<pre class="${langClass}">
					${code}
				</pre>
			</div>
		`;
	}

	// 없을 경우
	else
	{
		lang = 'unknown';

		const langClass = 'language-' + lang;

		return `
			<div class="codeblock">
				<div class="top">
					<div></div>
					<div></div>
					<div></div>
				</div>

				<pre class="${langClass}">
					${code}
				</pre>
			</div>
		`;
	}
};
```

위와 같이 함수를 오버라이딩해서 블럭형 코드 블럭의 렌더링 결과를 변경한다.

만약 언어가 같이 표기될 경우 `PrismJS`로 하이라이팅을 적용하고, 언어가 미표기될 경우 텍스트 그대로 코드 블럭에 지정하는 방식이다.

각 태그가 레이아웃대로 위치하도록 스타일 코드를 지정한다.

``` scss
$fd: 18px;
$fm: 14px;

pre[class*="language-"],
code[class*="language-"] {
	@include gutter;

	background-color: #161d2c;
	padding: 55px 20px 20px 20px !important;

	border-radius: 10px;

	font-family: Hack, AppleSDGothicNeo, sans-serif;
	color: white;

	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;

	overflow: auto;
}

code:not([class*="language-"]) {
	color: white;

	font-family: Hack, AppleSDGothicNeo, sans-serif;
	font-size: $fd - 4px;

	display: inline-block;

	padding: 0px 4px;
	margin: 0px 3px;

	border-radius: 5px;

	@media (max-width: 960px) {
		font-size: $fm - 4px;
	}
}

.codeblock {
	position: relative;

	.top {
		position: absolute;

		top: 0px;
		left: 0px;

		width: 100%;
		padding: 5px 20px;

		background-color: #2b3445;

		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		display: flex;
		flex-direction: row;

		align-items: center;

		div {
			width: 15px;
			height: 15px;

			border-radius: 50%;

			margin: 0px 5px;

			&:nth-child(2) {
				background-color: #fe5f57;
			}

			&:nth-child(3) {
				background-color: #ffbd2e;
			}

			&:nth-child(4) {
				background-color: #29c941;
			}
		}
	}
}
```

레이아웃에 지정된 스타일은 위와 같다.





## 사용된 언어 표시하기

사용된 언어를 표시해주면 사용자가 코드 블럭의 언어를 더욱 쉽게 파악할 수 있을 것이며, 작성자가 일일히 별도로 코드를 안내해주는 수고도 덜 수 있을 것이다.

블럭형 코드 블럭의 렌더러 함수인 `renderer.code`에서 `lang` 파라미터에 사용된 언어가 할당된다. 우리는 이 파라미터를 통해 사용된 언어를 파악하고, 이를 적절히 사용할 수 있다.

위 디자인 기준으로, 헤더 부분에 언어를 표시해주는 것이 좋아보인다.

``` typescript
loadLanguage([ 'javascript', 'typescript', 'java', 'html', 'css', 'json', 'scss', 'sass', 'sql', 'batch', 'bash' ]);

const renderer = new marked.Renderer();

// 코드블럭 렌더링
renderer.code = (code: string, lang: string | undefined): string =>
{
	// 유효한 언어가 있을 경우
	if (lang && renderer?.options?.highlight)
	{
		code = renderer.options.highlight(code, lang as string) as string;

		const langClass = 'language-' + lang;

		return `
			<div class="codeblock">
				<div class="top">
					<p>${lang.toUpperCase()}</p>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<pre class="${langClass}">
					${code}
				</pre>
			</div>
		`;
	}

	// 없을 경우
	else
	{
		lang = 'unknown';

		const langClass = 'language-' + lang;

		return `
			<div class="codeblock">
				<div class="top">
					<p>${lang.toUpperCase()}</p>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<pre class="${langClass}">
					${code}
				</pre>
			</div>
		`;
	}
};
```

`div.top` 영역에 사용된 언어를 대문자로 표시하도록 구성한다.

필요하다면 디자인을 수정해줄 수도 있다. 필자의 경우 폰트 색상 정도만 변경했다.

``` scss
.top {
	/* top scss 생략됨 */

	div {
		width: 15px;
		height: 15px;

		border-radius: 50%;

		margin: 0px 5px;

		p {
			margin: 0px;
			flex-grow: 1;

			color: map-get($yellow, "400");
		}

		&:nth-child(2) {
			background-color: #fe5f57;
		}

		&:nth-child(3) {
			background-color: #ffbd2e;
		}

		&:nth-child(4) {
			background-color: #29c941;
		}
	}
}
```

`p` 태그의 스타일을 추가한다.





## 내용 복사 버튼 추가하기

개발자 친화적인 사이트의 코드블럭 대부분은 코드블럭의 내용을 복사하는 버튼을 제공한다. 이를 통해 사용자는 굳이 내용 전체를 드래그하지 않고도 코드블럭의 내용을 손쉽게 복사할 수 있다.

블럭형 코드블럭 렌더링 시 버튼을 추가하고, 클릭 이벤트에 코드블럭의 내용을 복사하도록 지정하는 스크립트를 추가하면 될 것이다.

``` html
<button onclick="copyCode(this);">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-icon="clipboard" class="i-clipboard">
		<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path>
	</svg>
</button>
```

레이아웃은 위와 같다. 버튼 하나가 추가된다. 버튼 클릭 시, 버튼 레이아웃에 포함된 코드 블럭을 찾아 해당 내용을 클립보드에 저장하는 스크립트가 포함되어있다.

버튼의 아이콘은 SVG로 사용했다.

``` javascript
/**
 * 코드 복사 함수
 *
 * @param {DOMElement} dom: HTML DOM
 */
function copyCode(dom)
{
	window.getSelection().selectAllChildren(dom.parentElement.querySelector('pre'));
	document.execCommand('copy');

	const origin = dom.innerHTML;
	dom.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-icon="check" class="i-check"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';

	setTimeout(() => dom.innerHTML = origin, 1000);
}
```

코드 복사 메서드인 `copyCode`는 위와 같이 구성했다. 복사 버튼 상위의 가장 가까운 `pre` 태그를 찾아서, 해당 내용을 복사한다. 또한 약 1초 간 버튼의 SVG를 체크 아이콘으로 변경한다.

``` scss
button {
	position: absolute;

	top: 50px;
	right: 20px;
	width: 40px;
	height: 40px;

	background-color: #1e2739;
	cursor: pointer;

	border: 1px solid map-get($grey, "600");
	border-radius: 10px;

	opacity: 0;

	transition: 0.5s;

	&:hover {
		transition: 0.5s;
	}
}
```

스타일 코드는 이와 같다. 항상 고정적인 위치에 나타나도록 absolute 기반의 레이아웃을 채택했다.

이를 바탕으로 렌더러가 코드 블럭의 렌더링 과정에 추가하자.

``` typescript
loadLanguage([ 'javascript', 'typescript', 'java', 'html', 'css', 'json', 'scss', 'sass', 'sql', 'batch', 'bash' ]);

const renderer = new marked.Renderer();

// 코드블럭 렌더링
renderer.code = (code: string, lang: string | undefined): string =>
{
	// 유효한 언어가 있을 경우
	if (lang && renderer?.options?.highlight)
	{
		code = renderer.options.highlight(code, lang as string) as string;

		const langClass = 'language-' + lang;

		return `
			<div class="codeblock">
				<div class="top">
					<p>${lang.toUpperCase()}</p>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<button onclick="copyCode(this);">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-icon="clipboard" class="i-clipboard">
						<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path>
					</svg>
				</button>

				<pre class="${langClass}">
					${code}
				</pre>
			</div>
		`;
	}

	// 없을 경우
	else
	{
		lang = 'unknown';

		const langClass = 'language-' + lang;

		return `
			<div class="codeblock">
				<div class="top">
					<p>${lang.toUpperCase()}</p>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<button onclick="copyCode(this);">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-icon="clipboard" class="i-clipboard">
						<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path>
					</svg>
				</button>

				<pre class="${langClass}">
					${code}
				</pre>
			</div>
		`;
	}
};
```

코드블럭에 버튼이 추가된다.





## 라인 숫자 표시하기

간혹 코드를 설명하다보면 코드의 특정 부분을 설명해야할 경우가 생긴다. 이 경우 보통 어느 줄의 코드를 보라는 식으로 안내하지만, 코드 블럭에 라인 숫자가 표시되지 않을 경우, 사용자가 직접 코드의 줄을 찾아 확인해야하는 번거로움이 생긴다. 만약 코드가 페이지를 넘어갈 정도로 길 경우 불편함은 배로 증가하며, 이는 컨텐츠의 질 마저 하락시키는 결과로 이어진다.

사용자가 코드를 읽는데 좀 더 도움을 줄 수 있도록, 라인 숫자를 표시해보자.

``` html
<table>
	<tbody>
		<tr>
			<td><!-- 라인 넘버 --></td>
			<td><!-- 코드 --></td>
		</tr>

		<tr>
			<td><!-- 라인 넘버 --></td>
			<td><!-- 코드 --></td>
		</tr>

		<tr>
			<td><!-- 라인 넘버 --></td>
			<td><!-- 코드 --></td>
		</tr>

		<tr>
			<td><!-- 라인 넘버 --></td>
			<td><!-- 코드 --></td>
		</tr>
	</tbody>
</table>
```

라인 숫자는 코드 라인과 동일한 크기를 가져야한다. 만약 조금이라도 픽셀 차이가 날 경우, 코드 라인이 많아지면 많아질 수록 이격이 발생하게 될 것이다.

이러한 차이를 맞추기 위해서, 테이블 형태의 레이아웃을 채택했다. `tr` 태그를 하나의 라인으로, 아래 두 `td` 태그를 통해 하나는 라인 숫자, 다른 하나는 코드 영역으로 분리한다. 동일한 `tr` 내부의 `td`는 같은 줄에 위치하는 테이블의 특성을 적극 활용하면 레이아웃 CSS에 그리 많은 힘을 들이지 않아도 될 것이다.

``` scss
table {
	border-collapse: collapse;

	& td {
		line-height: $fd + 4px;

		@media (max-width: 960px) {
			line-height: $fm + 4px;
		}
	}

	& td:nth-child(1) {
		color: #455983;
		padding-right: 10px;

		border-right: 1px solid #455983;

		text-align: right;

		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}

	& td:nth-child(2) {
		width: 100%;

		padding: 0px 20px 0px 10px;
	}
}
```

디자인은 위와 같다. 첫 번째 `td`에 숫자를 표시하고, `border-right` 속성을 통해 구분선을 표시한다. 이를 토대로 코드 블럭 렌더러를 변경하자.

``` typescript
loadLanguage([ 'javascript', 'typescript', 'java', 'html', 'css', 'json', 'scss', 'sass', 'sql', 'batch', 'bash' ]);

const renderer = new marked.Renderer();

// 코드블럭 렌더링
renderer.code = (code: string, lang: string | undefined): string =>
{
	// 유효한 언어가 있을 경우
	if (lang && renderer?.options?.highlight)
	{
		code = renderer.options.highlight(code, lang as string) as string;

		const langClass = 'language-' + lang;

		const line = code.split('\n').map((item, index) => `
			<tr data-line=${index + 1}>
				<td class="line-number" data-number="${index + 1}">${index + 1}</td>
				<td class="line-code" data-number=${index + 1}>${item}</td>
			</tr>`).join('\n').replace(/\t|\\n/, '');

		return `
			<div class="codeblock">
				<div class="top">
					<p>${lang.toUpperCase()}</p>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<button onclick="copyCode(this);">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-icon="clipboard" class="i-clipboard">
						<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path>
					</svg>
				</button>

				<pre class="${langClass}">
					<table>
						<tbody>${line}</tbody>
					</table>
				</pre>
			</div>
		`;
	}

	// 없을 경우
	else
	{
		lang = 'unknown';

		const langClass = 'language-' + lang;

		const line = code.split('\n').map((item, index) => `
			<tr data-line=${index + 1}>
				<td class="line-number" data-number="${index + 1}">${index + 1}</td>
				<td class="line-code" data-number=${index + 1}>${item}</td>
			</tr>`).join('\n').replace(/\t|\\n/, '');

		return `
			<div class="codeblock">
				<div class="top">
					<p>${lang.toUpperCase()}</p>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<button onclick="copyCode(this);">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-icon="clipboard" class="i-clipboard">
						<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path>
					</svg>
				</button>

				<pre class="${langClass}">
					<table>
						<tbody>${line}</tbody>
					</table>
				</pre>
			</div>
		`;
	}
};
```

`map`을 통해 하나하나 `tr` 태그를 붙이므로, 이 과정에서 라인 숫자의 수를 파악할 수 있다. 첫 번째 `td`에 `map`의 인덱스 `index`가 지정되도록 구성했다. 태그의 의미론적인 측면을 강화하기 위해서 각 `tr`과 `td`의 `data-number` 속성으로 인덱스를 같이 지정한다. 인덱스의 시작이 0임에 주의하자.

예를 들어, 126번 째 줄은 아래와 같이 렌더링될 것이다.

``` html
<tr data-number="126">
	<td data-number="126">126</td>
	<td data-number="126"><!-- code --></td>
</tr>
```





## 라인별 색상 구분하기

인터넷에서 빼곡히 적힌 글을 읽다보면 가끔 읽던 글의 위치를 헷갈리기도 한다. 특히 코드의 경우 그 특성 상 문장의 의미가 매우 옅으며 복잡하기 때문에 헷갈리는 정도가 더욱 심해진다.

이러한 피로를 줄이기 위하여 라인별로 색상을 다르게 칠해주면 읽는 과정의 피로도를 줄일 수 있을 것이다. 홀수와 짝수 라인의 색상을 서로 다르게 지정하는 전통적인 방법을 사용할 것이다.

다행히도, 우리는 라인 숫자를 표시하기 위해 하나의 라인을 `tr` 태그로 관리하고 있다. 즉, 홀수 `tr`과 짝수 `tr`의 색상을 다르게 지정해주면 된다. `CSS`의 `nth-child` 선택자를 사용하면 매우 간단하게 해결할 수 있을 것이다.

``` scss
table {
	& tr:nth-child(2n) {
		background-color: #1c2335;
	}
}
```

색상은 기존의 코드 블럭의 디자인에 적절히 어울릴 수 있도록, 기존의 배경색에서 살짝 옅은 색을 지정했다. 짝수 라인의 색상이 살짝 옅어지도록 지정될 것이다.





## 마우스 오버 시 해당 라인 하이라이팅하기

코드 블럭에 상호작용 기능을 하나 더 추가해보자. 코드 라인에 마우스를 올렸을 때, 해당 라인에 하이라이팅이 되도록 구현한다. 사용자는 코드 블럭에 마우스를 올림으로써 자신이 읽고 있는 코드의 가독성을 증폭시킬 수 있으며, 코드 블럭과의 상호작용을 통해 컨텐츠의 흥미 또한 이끌어낼 수 있을 것이다.

위와 마찬가지로, `:hover` 선택자를 통해 순수 `CSS` 영역에서 해결할 수 있다.

``` scss
table {
	& tr:hover {
		background-color: #546687;

		& td:first-child {
			color: white;
		}
	}
}
```

이 정도면 될 것이다. `tr` 태그에 호버링을 할 경우, 해당 라인의 배경색과 라인 숫자를 밝은 색으로 변경한다. `transition` 속성을 주어 부드러운 시각효과를 기대할 수 있을 것이다.










# 정리

블로그 개편 과정에서 코드 블럭은 특히 신경을 많이 쓴 부분이였다. 디자인과 기능이 생각한대로 잘 뽑혀줘서 다행이다. `marked`를 적용한 이후로 렌더링 과정을 마음대로 커스터미이징할 수 있는 점을 적극 활용했다.

다음은 수식을 표현하는 LaTeX를 적용해보자.