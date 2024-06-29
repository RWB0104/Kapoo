---
title: "[Observer API 파헤치기] 5. PerformanceObserver"
excerpt: "PerformanceObserver API는 페이지의 성능 지표를 측정하는데 특화된 옵저버다. 해당 옵저버의 간략한 내용과 사용법에 대해 알아보자"
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c472262e-0b99-4a6f-836f-fc797bcf26d9"
date: 1719455234453
type: "posts"
category: "TypeScript"
tag: [ "JavaScript", "TypeScript", "React", "Observer API", "PerformanceObserver" ]
group: "Observer API 파헤치기"
comment: true
publish: true
---

# PerformanceObserver

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/eeba516f-ba4d-4693-ad9b-c7b076e1a974)

`PerformanceObserver`는 성능 이벤트를 관측하는 옵저버 API다. F12를 누르면 나오는 개발자도구의 성능 탭과 연관된다.

``` typescript
const po = new PerformanceObserver(callback);

po.observer(options);
```

페이지 성능과 관련된 옵저버라는 특징으로인해, 타 옵저버와 달리 태그를 등록하는 과정이 없다.





## options

옵저버 등록 시 `options`를 전달하여 세부 옵션을 조정할 수 있다. `PerformanceObserverInit` 타입을 가진다.



### 관찰 대상 (type)

옵저버가 관찰할 성능 요소를 지정한다. 각 요소는 아래와 같다.

1. `navigation` - 페이지 로드와 연관된 성능 지표. 페이지 첫 로드 시의 타이밍 정보 등을 수집할 수 있다.
2. `resource` - 페이지에 로드된 리소스와 연관된 성능 지표. 이미지, `js`, `css` 등이 대상에 해당된다.
3. `mark` - 개발자가 지정한 임의의 타이밍 정보.
4. `measure` - 지정한 두 `mark` 사이의 시간 측정.
5. `paint` - 페이지의 렌더링 및 페인트와 관련된 성능 지표. 첫 페이지 페인팅(FP), 최초의 유의미한 페인팅(FMP) 등이 해당한다.
6. `longtask` - 50ms 이상의 긴 프로세스 식별
7. `element` - DOM 요소 렌더링과 연관된 성능 지표.
8. `frame` - 애니메이션 프레임과 련관된 성능 지표. 애니메이션 및 스크롤 성능 분석과 관련된 정보를 제공한다.
9. `event` - 이벤트 발생과 연관된 성능 지표.
10. `first-input` - 사용자의 액션과 관련된 성능 지표.
11. `largest-contentful-paint` - 대용량 요소의 렌더링 성능 지표.
12. `layout-shift` - 페이지의 요소 이동 성능 지표.

`type`은 후술할 `entryTypes`와 병행하여 사용할 수 없다.



### 관찰 대상 목록 (entryTypes)

옵저버가 관찰할 성능 요소를 배열로 지정한다. 여러 성능 지표를 측정할 때 용이하다.



### 기존 성능 항목 포함 여부 (buffered)

기존 성능 지표 포함 여부를 지정하는 옵션이다. 기본적으로 `false`로 선언되어있다.





## callback

콜백 메서드를 통해 성능 관련 지표를 다룰 수 있다. `PerformanceObserverCallback` 타입을 가진다.



### entries

성능 지표 객체 `PerformanceObserverEntryList`를 반환한다. `getEntries`, `getEntriesByName`, `getEntriesByType` 메서드를 통해 원하는 목록을 뽑아낼 수 있다.

각 요소는 `type` 혹은 `entryTypes`에 지정한 요소에 따른 성능 개체다. 측정된 성능 요소에 따라 상이한 객체를 가지고 있다.



### observer

`PerformanceObserver` 객체를 반환해준다. 이를 통해 콜백 메서드 내에서도 `PerformanceObserver`를 연쇄적으로 다룰 수 있다.





# React에서 커스텀 훅으로 간편하게 사용하기

`PerformanceObserver`를 커스텀 훅을 통해 간편하게 사용해보자.

``` typescript
export function usePerformanceObserver(): void
{
  //
}
```

위와 같이 `usePerformanceObserver` 메서드를 정의한다.

`useMutationObserver`를 사용하기 위해선 아래의 두 요소가 필요하다.

1. 콜백 메서드
2. 옵션

지금까지의 옵저버와 달리 DOM이 필요하지 않다.

``` typescript
import { useEffect } from "react";

export type UsePerformanceObserverCallback = (entry: PerformanceEntry) => void;

/**
 * PerformanceObserver 적용 훅 메서드
 *
 * @param {UsePerformanceObserverCallback} callback: 콜백 메서드
 * @param {PerformanceObserverInit} options: 옵션
 */
export function usePerformanceObserver(
  callback: UsePerformanceObserverCallback,
  options?: PerformanceObserverInit
): void {
  useEffect(() => {
    const po = new PerformanceObserver((entries) => {
      entries.getEntries().forEach(callback);
    });
  }, [callback, options]);
}
```

`PerformanceObserver`를 초기화하여 `po` 변수로 할당한다.

`po.observe()` 메서드를 통해 태그를 등록할 수 있다.

``` typescript
import { useEffect } from "react";

export type UsePerformanceObserverCallback = (entry: PerformanceEntry) => void;

/**
 * PerformanceObserver 적용 훅 메서드
 *
 * @param {UsePerformanceObserverCallback} callback: 콜백 메서드
 * @param {PerformanceObserverInit} options: 옵션
 */
export function usePerformanceObserver(
  callback: UsePerformanceObserverCallback,
  options?: PerformanceObserverInit
): void {
  useEffect(() => {
    const po = new PerformanceObserver((entries) => {
      entries.getEntries().forEach(callback);
    });

    po.observe(options);
  }, [callback, options]);
}
```

마지막으로, 컴포넌트가 렌더링 될 때마다 `PerformanceObserver`의 등록이 중첩되지 않도록, 초기화 코드를 넣어준다.

`po.disconnect()` 메서드를 통해 `PerformanceObserver`를 제거할 수 있다.



## 전체 코드

``` typescript
import { useEffect } from "react";

export type UsePerformanceObserverCallback = (entry: PerformanceEntry) => void;

/**
 * PerformanceObserver 적용 훅 메서드
 *
 * @param {UsePerformanceObserverCallback} callback: 콜백 메서드
 * @param {PerformanceObserverInit} options: 옵션
 */
export function usePerformanceObserver(
  callback: UsePerformanceObserverCallback,
  options?: PerformanceObserverInit
): void {
  useEffect(() => {
    const po = new PerformanceObserver((entries) => {
      entries.getEntries().forEach(callback);
    });

    po.observe(options);

    return () => {
      po.disconnect();
    };
  }, [callback, options]);
}
```

전체 코드는 위와 같다.





## CodeSandbox로 통한 예시

CodeSandbox로 간단한 예시를 구현했다.

<iframe src="https://codesandbox.io/embed/ph5nyc?view=split&module=%2Fsrc%2FApp.tsx&expanddevtools=1"
     style="width:100%; height: 1000px; border:0; border-radius: 4px; overflow:hidden;"
     title="PerformanceObserver"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





# 마치며

![Lighthouse 성능 측정](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/44890cb5-13ab-49b6-8727-3bbee3622661)

`PerformanceObserver`를 통해 페이지의 성능 지표를 측정할 수 있다. 이를 적절히 구성하면 Lighthouse와 같은 웹 성능 측정 서비스를 유사하게 구현할 수 있을 것이다.

<br />

하지만 이미 비슷하거나, 더 우수한 기능을 제공하는 여러 오픈/상용 도구들이 많은 것이 현실이다. 또한 앞서 다룬 세 옵저버와 달리, 기능 개발에 있어 범용성이 많이 떨어지는 탓에, 관련 정보가 많이 없다는 것이 단점이다.

마지막으로 다룰 옵저버는 `ReportingObserver`다.