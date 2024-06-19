---
title: "[Observer API 파헤치기] 3. ResizeObserver"
excerpt: "ResizeObserver API는 DOM과 사이즈 변화를 다루는 데 특화된 옵저버다. 이 옵저버의 사용법을 알아보고, React에서 커스텀 훅을 통해 간편하게 사용해보자."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c472262e-0b99-4a6f-836f-fc797bcf26d9"
date: 1718813680692
type: "posts"
category: "TypeScript"
tag: [ "JavaScript", "TypeScript", "React", "Observer API", "ResizeObserver" ]
group: "Observer API 파헤치기"
comment: true
publish: true
---

# ResizeObserver

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/0fb47820-99c4-4079-afbf-e69742b88914)


`ResizeObserver`는 요소의 크기 변화를 감지하는 옵저버다. 요소의 `width`, `height`가 변할 경우, 이를 감지하여 원하는 동작을 수행할 수 있다.

``` typescript
const ro = new ResizeObserver(callback);

ro.observe(tag, options)
```

이전 장의 `IntersectionObserver`와 다르게 옵션을 API에서 할당하지 않는다. `observe` 메서드를 통해 요소를 등록할 때, `options`를 같이 지정할 수 있다.





## options

요소 등록 시 `options`를 전달하여 세부 옵션을 조정할 수 있다. `ResizeObserverOptions` 타입을 가진다.



### 박스 종류 (box)

요소의 종류를 지정한다. 

- `content-box` - CSS에 정의된 컨텐츠 영역의 크기
- `border-box` - CSS에 정의된 박스 전체 영역의 크기 (`margin`, `padding`, `border` 포함)
- `device-pixel-content-box` - 기기의 픽셀 단위 기준으로 정의된 컨텐츠 영역의 크기





## callback

`ResizeObserver`의 콜백 메서드는 요소의 크기가 변할 경우 동작하는 이벤트 메서드다.

`ResizeObserverCallback` 타입으로 선언되어 있으며, 이를 코드로 표기하면 아래와 같다.

``` typescript
const ro = new ResizeObserver((entries, observer) => {});
```



### ResizeObserverEntry

`entries`는 `ResizeObserverEntry[]` 타입을 갖는다. `ResizeObserverEntry`에 등록된 요소의 이벤트 정보를 배열 형태로 반환한다.

`ResizeObserverEntry`에 여러 DOM을 등록하여, 여러 객체에 옵저버를 적용할 수 있다.

![기본 박스](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c9b00149-2e24-42a5-af3e-6987982dd91e)

각 요소의 의미는 위 박스를 기준으로 설명한다.


#### 전체 영역의 크기 정보 (borderBoxSize)

![border-box](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/e0d53da6-ee28-4d7d-84ba-02ede064065f)

CSS에서 컨텐츠의 크기를 구성하는 요소는 여러가지가 있다.

각각 `border`, `padding`으로 레이아웃이 구성되며, 내부의 컨텐츠에 따라 크기가 정해진다.

`borderBoxSize`는 이 모든 요소를 아우르는 박스의 크기를 제공한다. 배열로 이루어져 있으며, 각 아이템은 `blockSize`, `inlineSize`를 가진다.

- `blockSize` - 높이 (`height`)
- `inlineSize` - 너비 (`width`)



#### 순수 컨텐츠 영역의 크기 정보 (contentBoxSize)

![content-box](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/2144862e-e53e-4732-88d9-92eba982e9c2)

CSS에서 박스 레이아웃을 구성하는 `border`, `padding`을 제외한 순수 컨텐츠의 크기 정보를 반환한다.

`borderBoxSize`와 마찬가지로 배열로 이루어져 있으며, 각 아이템의 정보 역시 동일하다.

- `blockSize` - 높이 (`height`)
- `inlineSize` - 너비 (`width`)



#### 기기 픽셀 기준 컨텐츠 영역의 크기 정보 (devicePixelContentBoxSize)

기기 픽셀 기준의 컨텐츠 영역 크기 정보를 반환한다.

`borderBoxSize`와 마찬가지로 배열로 이루어져 있으며, 각 아이템의 정보 역시 동일하다.

- `blockSize` - 높이 (`height`)
- `inlineSize` - 너비 (`width`)



#### 요소의 크기 정보 (contentRect)

![contentRect](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c0a5b7ea-e8d9-407e-892e-65069a35085f)

요소들의 다양한 크기 정보를 반환하는 객체로, 다른 객체에서 제공하는 정보가 일부 중복되어 있다.

해당 객체는 레거시 속성으로, 호환성 유지로 인해 지원되고 있으며, 언젠가 지원 종료될 가능성이 있다. [(참고)](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect)

- `width` - 순수 컨텐츠 영역의 너비 (`contentBoxSize`와 동일)
- `height` - 순수 컨텐츠 영역의 높이 (`contentBoxSize`와 동일)
- `x` - 박스를 기준으로 위치한 컨텐츠의 `x` 좌표
- `y` - 박스를 기준으로 위치한 컨텐츠의 `y` 좌표
- `left` - 컨텐츠의 좌측 기준 위치. 통상 `x`와 동일
- `top` - 컨텐츠의 상단 기준 위치. 통상 `y`와 동일
- `right` - 컨텐츠 우측 기준 위치.
- `bottom` - 컨텐츠 하단 기준 위치.



#### 이벤트 대상 (target)

`ResizeObserver` 이벤트를 발생시킨 DOM 객체를 반환한다.





# React에서 커스텀 훅으로 간편하게 사용하기

`ResizeObserver`를 커스텀 훅을 통해 간편하게 사용해보자.

``` typescript
export function useResizeObserver(): void
{
  //
}
```

위와 같이 `useResizeObserver` 메서드를 정의한다.

`useResizeObserver`를 사용하기 위해선 아래의 세 요소가 필요하다.

1. 대상 DOM
2. 콜백 메서드
3. 옵션

위 세 요소를 파라미터로 정의하자. 1번의 경우, 일반적으로 `HTMLElement`가 필요하지만, 해당 훅에서는 `HTMLElement` 타입 뿐만 아니라, `string`을 받아 `#id`, `.class`와 같은 선택자로 태그를 활용할 수 있도록 만들 것이다.

``` typescript
import { useEffect } from "react";

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

/**
 * ResizeObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseResizeObserverCallback} callback: 콜백 메서드
 * @param {ResizeObserverOptions} options: 옵션
 */
export function useResizeObserver(ref: Element | string | null, callback: UseResizeObserverCallback, options?: ResizeObserverOptions): void
{
	//
}
```

파라미터는 위와 같다. 이후 `ResizeObserver`를 선언하고 콜백 메서드를 할당한다.

``` typescript
import { useEffect } from "react";

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

/**
 * ResizeObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseResizeObserverCallback} callback: 콜백 메서드
 * @param {ResizeObserverOptions} options: 옵션
 */
export function useResizeObserver(ref: Element | string | null, callback: UseResizeObserverCallback, options?: ResizeObserverOptions): void
{
	useEffect(() =>
	{
		const ro = new ResizeObserver((entries) =>
		{
			entries.forEach(callback);
		});
	}, [ ref, callback, options ]);
}
```

`ResizeObserver`를 초기화하여 `ro` 변수로 할당한다.

이후 `ref`로 지정한 DOM을 할당한다.

`ref`는 세 가지 상태에 따라 아래와 같은 분기를 거친다.

- `null`일 경우 -> 패스한다.
- `string`일 경우 -> `document.querySelector` 메서드로 태그를 선택한 뒤, 해당 태그를 등록한다.
- `HTMLElement`일 경우 -> 이미 `Element`이므로, 즉시 등록한다.

`typeof ref === "string"` 구문을 통해 `ref`가 문자열인지를 판별하여 구현했다.

`io.observe()` 메서드를 통해 태그를 등록할 수 있다.

``` typescript
import { useEffect } from "react";

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

/**
 * ResizeObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseResizeObserverCallback} callback: 콜백 메서드
 * @param {ResizeObserverOptions} options: 옵션
 */
export function useResizeObserver(ref: Element | string | null, callback: UseResizeObserverCallback, options?: ResizeObserverOptions): void
{
	useEffect(() =>
	{
		const ro = new ResizeObserver((entries) =>
		{
			entries.forEach(callback);
		});

		// DOM이 유효할 경우
		if (ref)
		{
			// ref가 문자열일 경우
			if (typeof ref === 'string')
			{
				const tag = document.querySelector(ref);

				// 태그가 유효할 경우
				if (tag)
				{
					ro.observe(tag, options);
				}
			}

			// DOM일 경우
			else
			{
				ro.observe(ref, options);
			}
		}
	}, [ ref, callback, options ]);
}
```

마지막으로, 컴포넌트가 렌더링 될 때마다 `ResizeObserver`의 등록이 중첩되지 않도록, 초기화 코드를 넣어준다.

`ro.disconnect()` 메서드를 통해 `ResizeObserver`를 제거할 수 있다.





## 전체 코드

``` typescript
import { useEffect } from "react";

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

/**
 * ResizeObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseResizeObserverCallback} callback: 콜백 메서드
 * @param {ResizeObserverOptions} options: 옵션
 */
export function useResizeObserver(ref: Element | string | null, callback: UseResizeObserverCallback, options?: ResizeObserverOptions): void
{
	useEffect(() =>
	{
		const ro = new ResizeObserver((entries) =>
		{
			entries.forEach(callback);
		});

		// DOM이 유효할 경우
		if (ref)
		{
			// ref가 문자열일 경우
			if (typeof ref === 'string')
			{
				const tag = document.querySelector(ref);

				// 태그가 유효할 경우
				if (tag)
				{
					ro.observe(tag, options);
				}
			}

			// DOM일 경우
			else
			{
				ro.observe(ref, options);
			}
		}

		return () =>
		{
			ro.disconnect();
		};
	}, [ ref, callback, options ]);
}
```

전체 코드는 위와 같다.



## CodeSandbox를 통한 예시

CodeSandbox로 간단한 예시를 구현했다.

<iframe src="https://codesandbox.io/embed/k3grs6?view=split&module=%2Fsrc%2Foberserver-hook.ts&expanddevtools=1&editorsize=50&fontsize=14"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="ResizeObserver"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





# 마치며

이와 같이 `ResizeObserver`를 활용하면 DOM의 뷰포트 관련 요소를 쉽게 다룰 수 있다.

해당 API는 `resize` 이벤트를 대체하여 좀 더 효율적인 이벤트 동작을 구현할 수 있다.

다음 장에선 `MutationObserver`에 대해 다뤄보자.