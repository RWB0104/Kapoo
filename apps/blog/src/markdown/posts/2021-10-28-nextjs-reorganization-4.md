---
title: "[NextJS] 블로그 개편기 - 4. marked를 활용한 마크다운 변환기 구현하기"
excerpt: "정적 블로그는 마크다운을 적극적으로 사용한다. 일반적인 텍스트 기반에 매우 친숙하면서도 HTML과의 호환성 또한 매우 뛰어나기 때문이다. 기존의 블로그는 Remark, Rehype 플러그인을 사용했다. 여러 플러그인이 있어서 그냥저냥 사용하는덴 매우 편했지만, 사용자가 직접 변환과정을 커스터마이징하는 것이 매우 어려웠다. TOC, 코드블럭, 링크에 추가적인 기능, 디자인을 입히기 위해 HTML 태그를 입히고 싶은데, 관련 API가 없다보니 속절없이 주어진 태그만 그대로 사용할 수 밖에 없었다. 관련 정보를 찾아보던 중 marked 플러그인은 내가 원하는 요소를 충족시켜주는 것 같아, 블로그 개편 과정에서 마크다운 플러그인에도 많은 변화를 주었다. 이 장에서는 marked를 통해 마크다운을 HTML로 변환하는 과정에 대해 다룬다."
coverImage: "https://user-images.githubusercontent.com/50317129/134931033-89954c3d-5e00-4b3b-85aa-54a1dfa29e46.png"
date: 1635399406000
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React", "Markdown" ]
group: "블로그 개편기"
comment: true
publish: true
---

# 개요

정적 블로그는 마크다운을 적극적으로 사용한다. 일반적인 텍스트 기반에 매우 친숙하면서도 HTML과의 호환성 또한 매우 뛰어나기 때문이다.

기존의 블로그는 `Remark`, `Rehype` 플러그인을 사용했다. 여러 플러그인이 있어서 그냥저냥 사용하는덴 매우 편했지만, 사용자가 직접 변환과정을 커스터마이징하는 것이 매우 어려웠다.

TOC, 코드블럭, 링크에 추가적인 기능, 디자인을 입히기 위해 HTML 태그를 입히고 싶은데, 관련 API가 없다보니 속절없이 주어진 태그만 그대로 사용할 수 밖에 없었다.

관련 정보를 찾아보던 중 `marked` 플러그인은 내가 원하는 요소를 충족시켜주는 것 같아, 블로그 개편 과정에서 마크다운 플러그인에도 많은 변화를 주었다.

이 장에서는 `marked`를 통해 마크다운을 HTML로 변환하는 과정에 대해 다룬다.










# 왜 하필 마크다운인가?

그런데 우리가 보통 웹 상에서 글을 쓸 때를 생각해보면 익숙하지 않은 개념이다. 웹에서 게시글을 쓸 상황. 이를 테면 게시판이나 메일을 작성할 때를 생각해봐도 마크다운은 들어보질 못 했을 것이다.

그럼에도 불구하고 마크다운을 사용하는 이유가 뭘까? 마크다운을 사용하면 아래와 같은 장점이 있다.

* HTML과의 호환성이 매우 뛰어나다.
* 텍스트 기반이므로 HTML 방식에 비해 작성하기 용이하다.
* HTML 지식이 없는 사람도 쉽게 HTML 문서를 작성할 수 있다.
* HTML 주요 태그와 매칭되는 마크다운의 문법이 있으며, HTML에 비해 매우 쉽다.
* 필요할 경우, 마크다운과 HTML 태그를 병행해서 입력할 수 있다.
* 별도의 에디터(ex. 네이버 스마트 에디터)가 필요하지 않아 접근성이 뛰어나다.

마크다운은 HTML과의 호환성이 매우 뛰어나며, 상호간의 변환이 매우 쉽다. 어찌됐든 웹 페이지에 적용하기 위해선 최종 결과물은 반드시 HTML 형태를 취하고 있어야한다.

같은 내용을 직접 HTML로 작성한다면 HTML 특유의 태그 중심 문법으로 인해 작성 효율이 매우 떨어지게 된다. 당장 문장을 작성하는 것만 해도, 문장마다 `p` 태그로 감싸주는 행위를 해야만 한다.

그에 비해 일반적인 텍스트를 작성하는 것과 거의 차이가 없는 마크다운은 사용자가 비교적 편하게 글을 작성할 수 있으면서도, HTML로 쉽게 변환할 수 있어 웹에 사용하기 매우 적합하다.

또한 마크다운은 단순한 개념이 아닌, 파일 시스템에 확장자가 정의된 파일 형식이므로, 별다른 도구 없이 오프라인 환경에서도 메모장이나 vi 편집기만으로도 쉽게 작성할 수 있다.

그 뿐만 아니라, 마크다운에 HTML 태그를 그대로 작성해도 알아서 변환을 해준다! 그말인즉슨, 작성자가 HTML에 대한 지식이 있다면 HTML 태그를 직접 입력하여 단순 텍스트에서 그치지 않고 더욱 다채로운 게시글을 작성할 수 있다.

이러한 장점과 개발자 친화적인 특징으로 인해 개발 관련 플랫폼이나 정적 블로그에서 주로 사용한다.










# marked 적용하기

아래와 같은 과정을 통해 `marked` 플러그인을 적용한다.





## marked 설치

``` bash
npm install marked --save-dev

yarn add marked -dev
```

위 명령어를 통해 `marked`를 설치한다.





## marked로 HTML 변환하기

``` typescript
const marked = require('marked');
const body = `
# h1 header

Loren ipsum **test** area

[link](https://blog.itcode.dev)

![null](https://blog.itcode.dev/img/)

<span class="red">native html tag</span>
`;

const result = marked(body);

// HTML 내용 표시
console.log(result.toString());
```

`marked`로 마크다운을 HTML로 변환하는 방법은 위와 같다.

결과적으로 아래와 같이 변형된다.

``` markdown
# h1 header

Loren ipsum **test** area

[link](https://blog.itcode.dev)

![null](https://blog.itcode.dev/img/)

<span class="red">native html tag</span>
```

``` html
<h1 id="h1-header">h1 header</h1>
<p>Loren ipsum <strong>test</strong> area</p>
<p><a href="https://blog.itcode.dev">link</a></p>
<p><img src="https://blog.itcode.dev/img/" alt="image"></p>
<p><span class="red">native html tag</span></p>
```

이렇게 마크다운이 HTML로 변환된다. 어떤 변환 플러그인을 사용하냐에 따라 조금씩 다르게 변환될 수 있다.





## marked 심화기능

사실상 `marked`를 사용하게 된 가장 큰 이유. `marked`는 API로 `renderer`와 `tokenizer`를 사용할 수 있다. 이 두 API를 통해 특정 태그의 변환을 커스터마이징할 수 있다. 굳이 쓸데없이 플러그인만 덕지덕지 붙이지 않아도 되며, 내가 직접 변환 과정을 설계할 수 있으니, 기능 개선이나 디자인도 쉽게 추가할 수 있을 것이다.

`marked`의 HTML 변환 과정은 크게 토큰화롸 렌더링으로 나눌 수 있으며, 각각의 API를 통해 해당 과정을 직접 다뤄보자.



### tokenizer

`tokenizer`는 마크다운의 텍스트를 토큰으로 전환하는 방법을 정의한다. tokenizer를 지정하면 기존의 tokenizer와 병합되어 개발자가 작성한 tokenizer로 재정의된다.

대충 기본적으로 설정된 토큰화 과정을 직접 커스터마이징할 수 있다는 것 같은데, 대체 토큰이라는 게 뭐고, 어디에 쓰는 걸까?

마크다운은 자신의 문법을 매칭되는 HTML 태그로 변환한다. `marked`는 이 변환을 미리 정의하기 위해 토큰화 과정을 수행한다. 모든 마크다운 텍스트를 적절한 토큰으로 분류한다. 링크 문법 `[‌link](https://example.com)`은 링크 토큰으로, 이미지 문법 `![null](https://example.com/image.png)`는 이미지 토큰으로 분류하는 식이다. 이를 분류하기 위해 마크다운 문법 패턴을 정의하여 일치하는 문자열을 찾는 방식이다.

만약 개발자가 특정 패턴의 문자열을 이미지 문법으로 추가하고 싶다면, 해당 문법을 가진 문자열을 찾아내어 이미지 토큰으로 치환하면 된다.

``` typescript
// marked 선언
const marked = require('marked');

// tokenizer 재정의
const tokenizer = {
  codespan(src) {
    const match = src.match(/\$+([^\$\n]+?)\$+/);

    // 패턴이 일치할 경우
    if (match) {
      return {
        type: 'codespan',
        raw: match[0],
        text: match[1].trim()
      };
    }

    return false;
  }
};

marked.use({ tokenizer });

// 변환
console.log(marked('$ latex code $\n\n` other code `'));
```

위 코드는 codespan 토큰을 재정의하는 것이다. codespan은 `이 문법`으로, 주로 코드를 표시할 때 사용한다.

수학 수식을 표현하는 LaTeX는 달러를 wrapper로 사용하는데, 이는 마크다운의 공식 문법이 아니다. LaTeX를 사용하기 위해 달러로 감싸진 인라인 텍스트를 감지하여 codespan 토큰으로 지정한다. 이를 통해 $a\sqrt{b^2}$와 같이 수식을 표시할 수 있다.

`codespan(src)`에서 인수 `src`에 마크다운 텍스트가 들어온다. 정규식을 설계해서 원하는 문법의 패턴을 지정하고, 일치할 경우 원하는 토큰으로 재정의하면 된다. 만약 `false`를 반환할 경우, 기본 tokenizer 설정에 따른다.

* type - 토큰 종류
* raw - 토큰의 전체 내용
* text - 토큰의 텍스트 내용

토큰 객체의 내용은 위와 같다.

codespan 이외에도 table, header 같은 다양한 토큰을 재정의할 수 있다. 자세한 내용은 [marked 공식 문서 - tokenizer](https://marked.js.org/using_pro#tokenizer)에서 확인할 수 있다.



### renderer

`renderer`는 각 토큰을 HTML로 변환을 정의한다. 마크다운의 모든 텍스트는 정의된 패턴에 일치하는 토큰을 부여받으며, 렌더러가 해당 토큰을 분석하여 지정된 토큰의 HTML로 변환한다.

즉, 태그를 어떻게 변환할지 개발자가 직접 정의할 수 있다.

``` typescript
// Create reference instance
const marked = require('marked');

// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  }
};

marked.use({ renderer });

// Run marked
console.log(marked('# heading+'));
```

``` html
<h1>
  <a name="heading-" class="anchor" href="#heading-">
    <span class="header-link"></span>
  </a>
  heading+
</h1>
```

위 코드는 `h1`, `h2`와 같은 헤더 태그의 렌더링을 재정의한다. 위 과정은 헤더 태그 안에 링크를 집어넣어 헤더 클릭 시 해당 헤더를 포커싱하도록 프레임을 구성한다.

`heading(text, level)`에서 `text` 인수는 헤더 태그의 내용을, `level` 인수는 헤더 태그의 depth를 의마한다. 만약 `h4`일 경우 `level`에 4가 할당된다.

두 인수를 가지고 적절히 HTML 태그를 만들어서 반환해주면 된다. 헤더 외에도 여러 렌더러를 재정의할 수 있으며, 자세한 내용은 [marked 공식 문서 - renderer](https://marked.js.org/using_pro#renderer)에서 확인할 수 있다.










# 정리

`marked`는 HTML 변환과 관련된 다양하고 유용한 API를 제공한다. API를 잘 활용하면 블로그만의 독특한 마크다운 변환기를 구현할 수 있을 것이다.
