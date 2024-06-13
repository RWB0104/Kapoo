---
title: "[Observer API 파헤치기] 2. IntersectionObserver"
excerpt: "IntersectionObserver API은 DOM과 뷰포트를 다루는 데 특화된 옵저버다. 이 옵저버의 사용법을 알아보고, React에서 커스텀 훅을 통해 간편하게 사용해보자."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c472262e-0b99-4a6f-836f-fc797bcf26d9"
date: 1718296649288
type: "posts"
category: "TypeScript"
tag: [ "JavaScript", "TypeScript", "React", "Observer API", "IntersectionObserver" ]
group: "Observer API 파헤치기"
comment: true
publish: true
---

# IntersectionObserver

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/3d24f152-508a-4c9b-a373-b83e8d5405ac)

`IntersectionObserver`는 DOM과 뷰포트를 다루는 데 특화된 옵저버다. DOM이 뷰포트와 교차하는지 여부를 감지하여 DOM이 실제 사용자 화면에 보여지는지, 아니면 숨겨졌는지 구분할 수 있다.

``` typescript
const io = new IntersectionObserver(callback, options);
```

위 코드로 사용할 수 있으며, `callback`, `options` 두 가지 파라미터를 받는다.





## callback

`IntersectionObserver`의 콜백 파라미터는 요소가 뷰포트에 보이거나, 보이지 않을 때 동작하는 이벤트 메서드다.

`IntersectionObserverCallback` 타입으로 선언되어 있으며, 코드로 표현하면 아래와 같다.

``` typescript
const io = new IntersectionObserver((entries, observer) => {});
```



### IntersectionObserverEntry

`entries`는 `IntersectionObserverEntry[]` 타입을 갖는다. `IntersectionObserver`에 등록된 요소의 이벤트 정보를 배열 형태로 반환한다.

배열 타입인 이유는 `IntersectionObserver`에 여러 DOM을 등록할 수 있기 때문이다.



#### 교차 여부 (isIntersecting)

![isIntersecting](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/a7a3fd96-e1e6-4056-816f-7d314cb0b720)

`isIntersecting` 속성은 교차 여부를 `boolean` 값으로 반환해준다. 지정된 옵션에 따라 DOM에 보여질 경우 `true`, 아닐 경우 `false`를 반환한다.



#### 대상 DOM (target)

![target](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/a5ccfaf1-a153-4c4d-b7e1-fb24ca95aca1)

이벤트 속성에서 흔히 보는 `target` 속성과 동일하게, 이벤트가 발생한 자신을 반환한다.



#### 교차 비율 (intersectionRatio)

![intersectionRatio](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/b326fef0-4576-4a64-9663-a7a71868ccc3)

DOM이 교차된 비율을 `number`로 반환해준다. 추후 설명할 `options`에서 지정하는 `threshold`와 밀접한 연관이 있다.

`threshold`에 배열을 지정하여 다수의 비율을 지정했을 경우, 이 값을 통해 비율을 특정할 수 있다.



#### 루트 DOM (rootBounds)

![rootBounds](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/f3e5cd7d-6540-490d-a93d-f73e9b85bb78)

뷰포트의 기준인 DOM을 `Element` 형태로 반환해준다. `options`에서 `root` 속성을 지정하지 않았다면 `null`을 반환한다.



#### 이벤트 발생 시간 (time)

이벤트가 발생한 시간을 `number` 값으로 반환해준다.



#### 대상 DOM의 바운더리 (boundingClientRect)

![time](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/359ed66a-deb4-4551-9c1f-d094000eaa39)

대상 DOM의 바운더리 정보를 반환해준다. `x`, `y`, `width`, `height` 정보를 얻을 수 있다.



#### 대상 DOM의 교차 바운더리 (intersectionRect)

![intersectionRect](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/7a669bf1-6be0-485b-bb83-ea5ab6fb9720)

대상 DOM과 뷰포트의 교차 영역에 대한 바운더리 정보를 반환해준다. `boundingClientRect`와 마찬가지로 `x`, `y`, `width`, `height` 정보를 얻을 수 있지만, 뷰포트와 교차된 영역에 한정된다는 차이점이 있다.



### observer

`IntersectionObserver` 객체를 반환해준다. 이를 통해 콜백 메서드 내에서도 `IntersectionObserver`를 연쇄적으로 다룰 수 있다.



## options

`options` 속성을 전달하여 `IntersectionObserver`의 세부 동작을 제어할 수 있다.



### 루트 DOM (root)

![root](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/b9cd1166-b4f3-498a-a79a-380aff2016f6)

뷰포트의 기준이 되는 루트 DOM을 지정할 수 있다. 만약 지정하지 않을 경우 현재 보고있는 브라우저의 뷰포트가 지정된다.



### 루트 DOM의 margin (rootMargin)

![rootMargin](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/a4f0f796-4c32-4ade-8a3a-d5c9ba1fcd14)

루트 DOM을 기준으로 교차 이벤트가 발생하는데, `rootMargin`을 통해 감지 영역을 조절할 수 있다.

예를 들면, `root`가 뷰포트일 때, `rootMargin`을 `100px`로 지정하면 뷰포트보다 `100px` 먼 곳에서부터 교차 이벤트가 발생한다.

이를 통해, 미리 이벤트를 발생시키는 식의 활용이 가능하다.

CSS의 `margin` 속성과 동일하게 `y x` 혹은 `top right bottom left` 방식으로 지정하는 것도 가능하다.



### 대상 DOM의 교차 비율 (threshold)

![threshold](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/70745076-6c41-4955-9385-7818b6ad34f3)

교차 이벤트가 발생하기 위한 교차 비율을 `number` 혹은 `number[]`로 지정하며, 요소는 `0` ~ `1` 사이의 실수를 가진다. 예를들어, `0.2`는 교차비율이 `20%`일 경우 교차 이벤트를 발생시킨다.

배열로 지정할 경우, 지정한 비율마다 이벤트가 발생한다. 즉 `[ 0.2, 0.5, 0.8 ]`일 경우, `20%`, `50%`, `80%` 교차 시 각각 이벤트가 발생하는 식이다.





# React에서 커스텀 훅으로 간편하게 사용하기

`IntersectionObserver`를 사용하다보면, 적절한 생명주기에 맞춰 DOM을 등록하는 것이 생각보다 번거로움을 알 수 있다.

커스텀 훅을 통해 `IntersectionObserver`를 더욱 쉽게 사용해보자.

``` typescript
export function useIntersectionObserver(): void
{
  //
}
```

위와 같이 `useIntersectionObserver`라는 메서드를 정의해보자.

`useIntersectionObserver`를 사용하기 위해선 아래와 같은 세 가지 요소가 필요하다.

1. 대상 DOM
2. 콜백 메서드
3. 옵션

위 세 요소를 파라미터로 정의하자. 1번의 경우, 일반적으로 `HTMLElement`가 필요하지만, 해당 훅에서는 `HTMLElement` 타입 뿐만 아니라, `string`을 받아 `#id`, `.class`와 같은 선택자로 태그를 활용할 수 있도록 만들 것이다.

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
  //
}
```

파라미터의 정의는 위와 같다. 이후 `IntersectionObserver`을 선언하고 콜백 메서드와 옵션을 할당한다.

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
  }, [ref, callback, options]);
}
```

위와 같이 `IntersectionObserver`을 초기화하여 `io` 변수로 할당한다.

이후 `ref`로 지정한 DOM을 할당한다.

`ref`는 세 가지 상태에 따라 아래와 같은 분기를 거친다.

- `null`일 경우 -> 패스한다.
- `string`일 경우 -> `document.querySelector` 메서드로 태그를 선택한 뒤, 해당 태그를 등록한다.
- `HTMLElement`일 경우 -> 이미 `Element`이므로, 즉시 등록한다.

`typeof ref === "string"` 구문을 통해 `ref`가 문자열인지를 판별하여 구현했다.

`io.observe()` 메서드를 통해 태그를 등록할 수 있다.

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
  }, [ref, callback, options]);
}
```

마지막으로, 컴포넌트가 렌더링 될 때마다 `IntersectionObserver`의 등록이 중첩되지 않도록, 초기화 코드를 넣어준다.

`io.disconnect()` 메서드를 통해 `IntersectionObserver`를 제거할 수 있다.





## 전체 코드

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



## CodeSandbox를 통한 예시

CodeSandbox로 간단한 예시를 구현했다. CodeSandbox의 렌더링 방식 때문인지, `rootMargin`은 제대로 동작하지 않는 듯하다.

<iframe src="https://codesandbox.io/embed/rqm4zk?&module=%2Fsrc%2Fobserver-hook.ts&expanddevtools=1&editorsize=50&fontsize=14"
     style="width:100%; height: 1000px; border:0; border-radius: 4px; overflow:hidden;"
     title="IntersectionObserver"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





# 마치며

이와 같이 `IntersectionObserver`를 활용하면 DOM의 뷰포트 관련 요소를 쉽게 다룰 수 있다.

이 API는 인피니티 스크롤, 애니매이션 동작 트리거 등, 기존의 Event Driven으로 구현하기 복잡한 기능을 쉽게 개발할 수 있다.

다음 장에선 `ResizeObserver`에 대해 다뤄보자.