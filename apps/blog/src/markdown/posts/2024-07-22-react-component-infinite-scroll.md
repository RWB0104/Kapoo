---
title: "[React Component] 무한 스크롤(Infinite Scroll) 컴포넌트 만들어보기"
excerpt: "바닐라 React.js 환경에서 무한 스크롤(Infinite Scroll) 컴포넌트를 직접 구현해보자"
coverImage: "https://github.com/user-attachments/assets/48516902-3d5e-4d9d-bb75-617638c9b440"
date: 1721652183828
type: "posts"
category: "React"
tag: [ "TypeScript", "React" ]
group: "React Component"
comment: true
publish: true
---

# 개요

적지 않은 기간동안 블로그가 휴지기에 들어갔었다. 물론 그 기간에도 일을 쉬거나 한 건 아니여서, 개발을 안 하진 않았다.

덕분에 크고작은 컴포넌트를 개발할 수 있었는데, 그 중 사용성이 높은 컴포넌트들을 추려서 이 시리즈에 정리해보고자 한다.

그 중 첫 번째로, 게시판이나 목록 등에 많이 사용하는 무한 스크롤(Infinite Scroll)에 대해 다뤄보고자 한다.





## 요구사항

컴포넌트를 만들기 전에, 컴포넌트의 요구사항을 정리해본다.

1. 컴포넌트가 스크롤하여 마지막 위치까지 내려올 경우, 이를 감지하여 원하는 동작을 수행한다.

요구사항은 위와 같이 심플하다. 핵심 키워드는 <span class="blue-600">마지막 위치 감지</span>로, 이를 구현하는 것이 관건이다.





## InfiniteScroll 컴포넌트 구현

개발할 컴포넌트를 `InfiniteScroll`이라 명명하고, 위의 요구사항으로 토대로 `InfiniteScroll` 컴포넌트를 구현한다.



### 레이아웃 구현

`InfiniteScroll`의 기본 레이아웃을 구현한다.

``` tsx
export default function InfiniteScroll(): JSX.Element
{
	return (
		<div />
	)
}
```

기본적인 토대가 되는 레이아웃 `div`를 선언한다.



### 인터페이스 구현

`InfiniteScroll` 컴포넌트가 받을 인터페이스를 구현한다.

``` tsx
export type InfiniteScrollEndHandler = () => void;

export interface InfiniteScrollProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
	/**
	 * 비활성화 여부
	 */
	disabled?: boolean;

	/**
	 * 스크롤 끝 이벤트 메서드
	 */
	onEnd?: InfiniteScrollEndHandler;
}

export default function InfiniteScroll({ disabled, onEnd, children, ...props }: InfiniteScrollProps): JSX.Element
{
	return (
		<div {...props}>
			{children}
		</div>
	)
}
```

`InfiniteScroll` 컴포넌트가 받을 커스텀 프로퍼티는 `disabled`와 `onEnd` 메서드다. 각 프로퍼티의 역할은 주석의 내용과 동일하다.

그 밖에, `DetailedHTMLProps` 인터페이스를 확장함으로써, `InfiniteScroll`가 기본 `div` 프로퍼티를 모두 수용할 수 있도록 구성했다.

스크롤이 컴포넌트 마지막에 도달한 시점에, `onEnd`를 수행하도록 구성할 것이다. 만약 `disabled`가 `true`일 경우, 비활성화로 인식하여 동작을 막는다.



### 스크롤 감지 로직 구현

핵심 로직인 스크롤 감지 로직을 구현한다.

일반적으로 `document.addEventListener` 기반의 스크롤 이벤트를 떠올리겠지만, 이 방법은 작업의 오버헤드가 너무 크다.

`document`에 이벤트를 붙임으로써, 스코프가 컴포넌트 바깥으로 벗어나는 문제가 있으며, 스크롤을 하는 족족 이벤트 로직이 수행되므로 최적화 면에서도 좋지 못하다.

실제로 구현해보면, 후술할 Observer 방식에 비해 쓸데없는 코드를 상당수 추가해야 할것이다.

<br />

우리는 이 로직을 구현하기 위해, 일전에 다뤘던 `IntersectionObserver`를 활용할 것이다.

> 브라우저의 `Observer API`인 `IntersectionObserver`의 대한 내용은 해당 블로그의 [[Observer API 파헤치기] 2. IntersectionObserver](/posts/2024/06/14/observer-api-2)를 참조하자.

![null](https://github.com/user-attachments/assets/20b481a8-2fc2-450b-9063-c7291b07aa6a)

원리는 이러하다.

1. `InfiniteScroll` 내부에 위치 감지용 더미 컴포넌트를 최하단에 위치시킨다.
2. `IntersectionObserver`를 활용해 더미 컴포넌트가 사용자에게 보여지는 지 여부를 판단한다.
3. 더미 컴포넌트가 보여질 경우, 스크롤 끝에 도달했다는 뜻으로 판단하여, `onEnd` 메서드를 실행한다.
4. 만약, `disabled`가 `true`일 경우, 더미 컴포넌트를 생성하지 않음으로써, 동작을 미연에 방지할 수 있다.

``` tsx
import { useIntersectionObserver } from '@kapoo/common';
import { useState, DetailedHTMLProps, HTMLAttributes } from 'react';

export type InfiniteScrollEndHandler = () => void;

export interface InfiniteScrollProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
	/**
	 * 비활성화 여부
	 */
	disabled?: boolean;

	/**
	 * 스크롤 끝 이벤트 메서드
	 */
	onEnd?: InfiniteScrollEndHandler;
}

export default function InfiniteScroll({ disabled, onEnd, children, ...props }: InfiniteScrollProps): JSX.Element
{
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	useIntersectionObserver(domState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			onEnd?.();
		}
	});

	return (
		<div {...props}>
			{children}

			{children && !disabled ? <div ref={setDomState} style={{ width: '100%' }} /> : null}
		</div>
	)
}
```

`useIntersectionObserver`는 외부 라이브러리가 아닌, 프로젝트 내부에서 직접 구현한 코드로, 아래와 같다.

``` typescript
import { useEffect } from "react";

export type UseIntersectionObserverCallback = (
  entry: IntersectionObserverEntry
) => void;

/**
 * IntersectionObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseIntersectionObserverCallback} callback: 콜백 메서드
 * @param {IntersectionObserverInit} options: 옵션
 */
export function useIntersectionObserver(
  ref: Element | string | null,
  callback: UseIntersectionObserverCallback,
  options?: IntersectionObserverInit
): void
{
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);

    // DOM이 유효할 경우
    if (ref) {
      // ref가 문자열일 경우
      if (typeof ref === "string") {
        const tag = document.querySelector(ref);

        // 태그가 유효할 경우
        if (tag) {
          io.observe(tag);
        }
      }

      // DOM일 경우
      else {
        io.observe(ref);
      }
    }

    return () => {
      io.disconnect();
    };
  }, [ref, callback, options]);
}
```

더미 컴포넌트를 표현하는데 `children`의 유효 여부도 포함되어 있는데, 중복 동작을 막기 위한 조치다.

컴포넌트의 초기 렌더링 시, 데이터가 아직 그려지지 않은 순간에 더미 컴포넌트가 노출되면서, 의도하지 않게 `onEnd` 메서드를 수행한다.

이를 방지하기 위해, 반드시 유효한 컴포넌트가 렌더링 된 이후에 이벤트를 요청하도록 구성하는 장치다.



### IntersectionObserver 옵션 활용하기

위 코드로 충분히 동작하는 코드지만, 경우에 따라 아쉬운 점이 생기기도 한다.

사용자가 페이지 끝에 도달하는 경우, 그 순간 다음 데이터를 호출(일반적으로 API)한다. 이 과정에서 데이터를 호출하고, 가공하여 렌더링하기까지 꽤 적지 않은 시간이 소모된다.

사용자의 UX를 향상시키기 위해, 실제 스크롤이 끝나는 지점보다 살짝 위를 기준으로 잡는다면 어떨까?

마치 사용자 눈에는 로딩 없이 목록을 끊기지 않고 볼 수 있는 것처럼 보일 것이다.

`IntersectionObserver`의 `rootMargin` 옵션을 활용하여 이를 구현할 수 있다.

``` tsx
import { useIntersectionObserver } from '@kapoo/common';
import { useState, DetailedHTMLProps, HTMLAttributes } from 'react';

export type InfiniteScrollEndHandler = () => void;

export interface InfiniteScrollProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
	/**
	 * 비활성화 여부
	 */
	disabled?: boolean;

	/**
	 * 마진
	 */
	rootMargin?: string;

	/**
	 * 스크롤 끝 이벤트 메서드
	 */
	onEnd?: InfiniteScrollEndHandler;
}

export default function InfiniteScroll({ disabled, rootMargin, onEnd, children, ...props }: InfiniteScrollProps): JSX.Element
{
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	useIntersectionObserver(domState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			onEnd?.();
		}
	}, { rootMargin });

	return (
		<div {...props}>
			{children}

			{children && !disabled ? <div ref={setDomState} style={{ width: '100%' }} /> : null}
		</div>
	)
}
```

`rootMargin`을 추가로 받아, `useIntersectionObserver`에 전달했다. CSS의 `margin` 속성과 동일하게 입력하면 된다.




### 전체 코드

``` tsx
import { useIntersectionObserver } from '@kapoo/common';
import { useState, DetailedHTMLProps, HTMLAttributes } from 'react';

export type InfiniteScrollEndHandler = () => void;

export interface InfiniteScrollProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
	/**
	 * 비활성화 여부
	 */
	disabled?: boolean;

	/**
	 * 마진
	 */
	rootMargin?: string;

	/**
	 * 스크롤 끝 이벤트 메서드
	 */
	onEnd?: InfiniteScrollEndHandler;
}

export default function InfiniteScroll({ disabled, rootMargin, onEnd, children, ...props }: InfiniteScrollProps): JSX.Element
{
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	useIntersectionObserver(domState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			onEnd?.();
		}
	}, { rootMargin });

	return (
		<div {...props}>
			{children}

			{children && !disabled ? <div ref={setDomState} style={{ width: '100%' }} /> : null}
		</div>
	)
}
```

``` typescript
import { useEffect } from "react";

export type UseIntersectionObserverCallback = (
  entry: IntersectionObserverEntry
) => void;

/**
 * IntersectionObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseIntersectionObserverCallback} callback: 콜백 메서드
 * @param {IntersectionObserverInit} options: 옵션
 */
export function useIntersectionObserver(
  ref: Element | string | null,
  callback: UseIntersectionObserverCallback,
  options?: IntersectionObserverInit
): void
{
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);

    // DOM이 유효할 경우
    if (ref) {
      // ref가 문자열일 경우
      if (typeof ref === "string") {
        const tag = document.querySelector(ref);

        // 태그가 유효할 경우
        if (tag) {
          io.observe(tag);
        }
      }

      // DOM일 경우
      else {
        io.observe(ref);
      }
    }

    return () => {
      io.disconnect();
    };
  }, [ref, callback, options]);
}
```

전체 코드는 위와 같다.





## CodeSandbox로 보는 컴포넌트

컴포넌트를 CodeSandbox로 직접 확인해보자.

`rootMargin`의 경우, 아래의 미리보기 환경에서는 내부적인 문제 때문인지 동작하지 않으며, 전체화면으로 볼 때만 작동하는 듯 하다.

<iframe src="https://codesandbox.io/embed/qk7wjn?view=split&module=%2Fsrc%2FApp.tsx"
     style="width:100%; height: 1000px; border:0; border-radius: 4px; overflow:hidden;"
     title="InfiniteScroll"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>