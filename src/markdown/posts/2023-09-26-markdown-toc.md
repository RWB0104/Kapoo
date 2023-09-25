---
title: "[TypeScript] 마크다운 TOC 만들기"
excerpt: "글의 요소 중엔 목차라는 개념이 존재한다. TOC(Table Of Content)라고도 한다. 목차를 통해 독자는 글의 전반적인 내용과 짜임새를 파악할 수 있으며, 원할 경우 필요한 부분만 취사선택을 하도록 유도할 수도 있다. 독자를 위해서도, 글을 위해서도 좋은 장치인 셈이다."
coverImage: "https://user-images.githubusercontent.com/50317129/270418234-c6951309-6bad-4e82-82a8-244585f54735.jpg"
date: "2023-09-26T01:53:00"
type: "posts"
category: "TypeScript"
tag: [ "React", "TypeScript", "Markdown", "Regexp", "Table Of Content" ]
comment: true
publish: true
---

![null](https://user-images.githubusercontent.com/50317129/270418234-c6951309-6bad-4e82-82a8-244585f54735.jpg)

# 마크다운 TOC 만들기

글의 요소 중엔 목차라는 개념이 존재한다. TOC(Table Of Content)라고도 한다. 목차를 통해 독자는 글의 전반적인 내용과 짜임새를 파악할 수 있으며, 원할 경우 필요한 부분만 취사선택을 하도록 유도할 수도 있다. 독자를 위해서도, 글을 위해서도 좋은 장치인 셈이다.

마크다운엔 `h1`, `h2`와 같은 heading 텍스트를 표현할 때, 아래와 같은 문법을 사용한다.

``` md
# h1

## h2

### h3

#### h4

##### h5

###### h6
```

heading 텍스트를 표현하기 위해 `#`을 사용하며, `h1` ~ `h6`까지 `#`의 갯수로 표현한다. 이 heading 텍스트를만을 추출하여 목차를 만들 수 있다.



## TOC는 갑자기 왜?

이 블로그에서도 알 수 있듯이, TOC가 제공되고 있다. 이 TOC는 `react-toc`라는 디펜던시를 사용하여 표현해주는데, 아래와 같은 문제가 있었다.

1. `ul` 기반의 완성된 태그로 반환해준다. 때문에 레이아웃을 변경하기 제한적이다.
2. 코드블럭 내의 `#` 주석까지 TOC 대상으로 잡아버린다.
3. 빌드 과정에서 TOC 목록이 만들어지다가 마는 경우가 있다. 이유도 없이 중간에 끊겨있는데, 개발서버에서 보면 문제가 없는 걸로 보아, 빌드 중 문제가 발생하는 것 같다.

이 때문에 TOC를 직접 구현하기로 했다. 목표는 아래와 같다.

1. TOC 구현에 필요한 정보가 담긴 객체 형태로 반환한다.
2. 코드블럭 내의 `#` 주석은 제외한다.
3. 빌드 과정에서의 오류를 제거한다.

정규식을 통해 비교적 간단히 해결할 수 있었다.



## 마크다운 heading 텍스트 추출하기

마크다운에서 heading 텍스트만 추출하는 건 매우 쉽다. 규칙이 명확하기 때문. `#`이 1 ~ 6개 사이로 시작하며, `#`과 텍스트 사이에 공백이 존재하며, 공백 뒤로 제목이 될 텍스트가 입력된다.

이를 정규식으로 표현하면 아래와 같다.

``` regex
/^(#{1,6}) (.+)$/gm
```

간단한 정규식이지만, 이를 그대로 적용하기엔 난감한 점이 있다. 바로 코드블럭인데, 일단 아래의 예시들을 보자.

``` md
# h1

## h2

### h3

#### h4

##### h5

###### h6
```

``` bash
# 주석
echo yahooo
```

코드블럭에서 마크다운을 표현하거나, `#`을 주석 기호로 사용하는 언어들이 존재한다. 문제는 정규식이 저 텍스트들까지 잡아버린다는 것이다. 하지만 정규식에 조건을 추가해서 이를 제외하기엔 조금 까다롭다.

곰곰히 생각해보면, 사실 코드블럭과 그 내부의 텍스트들은 TOC 목록을 구성하는 데 아무 필요도 없다. 코드블럭의 문법 또한 매우 특징적이기 때문에, 정규식을 통해 이를 제거하는 것 또한 어렵지않다.

문법은 \`\`\`으로 시작하며, 끝난다. 코드블럭의 정규식은 아래와 같다.

``` regex
/```[^]*?```/gm
```

이 정규식을 통해 코드블럭을 제거할 수 있다. 이후 코드블럭이 제거된 텍스트에서 TOC를 뽑아내면 된다.



## 코드로 보기

일련의 과정을 코드로 확인해보자. 아래와 같은 마크다운 텍스트가 있다고 가정하자.

``` md
# Lorem Ipsum

Lorem Ipsum is simply dummy text of the printing and typesetting industry.

Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

\`\`\` bash
# comments

echo Lorem Ipsum
\`\`\`

## Lorem Ipsum 2

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

\`\`\` bash
# comments

echo Lorem Ipsum
\`\`\`

It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
```

> 마크다운의 코드블럭 문법 \`을 코드블럭 내에서 표현하기 어렵기 때문에 \\`로 대체한다.
이를 `text`라는 변수에 담아, 정규식을 활용하여 코드블럭을 제거한다.

``` ts
let text = `# Lorem Ipsum

Lorem Ipsum is simply dummy text of the printing and typesetting industry.

Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

\`\`\` bash
# comments

echo Lorem Ipsum
\`\`\`

## Lorem Ipsum 2

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

\`\`\` bash
# comments

echo Lorem Ipsum
\`\`\`

It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

text = text.replace(/```[^]*?```/gm, '');
```

이제 변수 `text`에는 코드블럭이 제거된 마크다운 텍스트가 할당된다. 이를 콘솔로 찍어보면 아래와 같을 것이다.

``` md
# Lorem Ipsum

Lorem Ipsum is simply dummy text of the printing and typesetting industry.

Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.


## Lorem Ipsum 2

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.


It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
```

이 텍스트와 정규식을 활용하여 TOC를 추출하면 아래와 같다.

``` ts

let text = '{...}';

let list = [];

while (flag)
{
    const match = /^(#{1,6}) (.+)$/gm.exec(temp);

    // 일치하는 정규식이 없을 경우
    if (match === null)
    {
        break;
    }

    list.push({
        level: match[1].trim().length,
        text: match[2].trim()
    });
}
```

`while`문을 활용하여, 정규식과 매치되는 텍스트가 없을 때까지 반복문을 돌려 heading 텍스트를 추출한다. 결과는 아래와 같다.

``` json
[
    {
        "level": 1,
        "text": "Lorem Ipsum"
    },
    {
        "level": 2,
        "text": "Lorem Ipsum 2"
    },
]
```

위 결과는 로직의 결과를 보여주기 위한 예시로, 원한다면 로직을 변경하여 자신이 필요한 형식으로 반환시키면 된다.



## 정리

위 코드를 종합하여 하나의 메서드로 표현하면 아래와 같다.

``` ts
export interface TocProps
{
    /**
     * 텍스트
     */
    text: string;

    /**
     * 깊이
     */
    level: number;
}

/**
 * 마크다운 TOC 리스트 반환 메서드
 *
 * @param {string} text: 텍스트
 *
 * @returns {TocProps[]} 마크다운 TOC 리스트
 */
export function getMarkdownToc(text: string): TocProps[]
{
    const list: TocProps[] = [];

    const temp = text.replace(/```[^]*?```/gm, '');

    const regex = /^(#{1,6}) (.+)$/gm;

    while (true)
    {
        const match = regex.exec(temp);

        // 이유는 모르겠는데, 변수를 선언하지 않고 정규식을 아래처럼 바로 쓰면 반복문을 벗어나지 못한다.
        // const match = /^(#{1,6}) (.+)$/gm.exec(temp);

        // 일치하는 정규식이 없을 경우
        if (match === null)
        {
            break;
        }

        list.push({
            level: match[1].trim().length,
            text: match[2].trim()
        });
    }

    return list;
}
```

위 메서드의 파라미터로 마크다운 텍스트를 넣으면, TOC 객체의 배열을 반환한다.

이를 토대로 원하는 형태의 TOC를 구현하면 될 것이다.



## 마치며

블로그에서 TOC 부분은 마음에 안 드는 구석이 꽤 있었다. 그래도 돌리는 데 큰 문제는 없어서 냅두고 있었는데, 무슨 이유에서인지 빌드 과정에서 TOC 일부가 누락되는 문제가 발생하는 걸 관측했다.

빌드 과정에서 라이브러리의 동작에 문제가 발생하는 것 같아서, 그냥 직접 만들어봤는데, 생각한대로 잘 나와서 마음에 든다.

이렇게 또 하나 마음에 안 드는 부분을 개선했다.