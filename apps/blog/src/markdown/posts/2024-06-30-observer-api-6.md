---
title: "[Observer API 파헤치기] 6. ReportingObserver"
excerpt: "PerformanceObserver API는 페이지의 성능 지표를 측정하는데 특화된 옵저버다. 해당 옵저버의 간략한 내용과 사용법에 대해 알아보자"
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c472262e-0b99-4a6f-836f-fc797bcf26d9"
date: 1719680893724
type: "posts"
category: "TypeScript"
tag: [ "JavaScript", "TypeScript", "React", "Observer API", "ReportingObserver" ]
group: "Observer API 파헤치기"
comment: true
publish: true
---

# ReportingObserver

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/dae510dd-8b10-4fcd-961c-67032e33ae39)

`ReportingObserver`는 웹 브라우저의 성능 및 사용성, 안정성 요소를 감지하는 옵저버다. 페이지에서 발생할 수 있는 문제점을 실시간으로 모니터링할 때 유용하게 사용할 수 있다.

``` typescript
const ro = new ReportingObserver(callback, options);

ro.observe();
```





## options

옵저버 선언 시, `options`을 전달하여 세부 사항을 조절할 수 있다. `ReportingObserverOptions` 타입을 가진다.



### 보고서 타입 (types)

옵저버에서 제공할 보고서 타입을 배열로 지정한다. 지정 가능한 값은 `deprecation`, `intervention` 두 가지다.

- `deprecation` (사용 중단 보고서): 브라우저에서 deprecated 되거나, 될 예정인 기능을 사용하고 있을 경우, 관련 보고서를 제공함.
- `intervention` (개입 보고서): 브라우저가 특정 동작에 개입해 동작을 수정하거나, 차단했을 경우, 관련 보고서를 제공함.



### 기존 보고서 포함 여부 (buffered)

`ReportingObserver`가 선언되기 이전의 보고서도 포함하는지 여부를 지정함. 기본적으로 `false`값을 가짐.





## callback

콜백 메서드로 관련 보고서를 다룰 수 있다. `ReportingObserverCallback` 타입을 가진다.



### report

발생한 보고서 배열을 반환한다. `Report` 타입을 가진다.

- `type`: 보고서 타입을 반환한다. `deprecation`, `intervention` 중 하나를 갖는다.
- `url`: 보고서 대상 URL을 반환한다. 일반적으로 현재 페이지 URL이 담겨있다.
- `body`: 보고서 내용을 반환한다. 각 보고서에 따라 내용이 바뀐다.



### observer

옵저버 자기 자신을 반환한다. 이를 통해 콜백 메서드에서 옵저버에 접근할 수 있다.





# React에서 커스텀 훅으로 간편하게 사용하기

`ReportingObserver`를 커스텀 훅을 통해 간편하게 사용해보자.

``` typescript
export function useReportingObserver(): void
{
  //
}
```

위와 같이 `useReportingObserver` 메서드를 정의한다.

`useReportingObserver`를 사용하기 위해선 아래의 두 요소가 필요하다.

1. 콜백 메서드
2. 옵션

`PerformanceObserver`와 마찬가지로 DOM이 필요없다.

``` typescript
import { useEffect } from "react";

export type UseReportingObserverCallback = (entry: Report) => void;

/**
 * ReportingObserver 적용 훅 메서드
 *
 * @param {UseReportingObserverCallback} callback: 콜백 메서드
 * @param {PerformanceObserverInit} options: 옵션
 */
export function useReportingObserver(
  callback: UseReportingObserverCallback,
  options?: ReportingObserverOptions
): void {
  useEffect(() => {
    const ro = new ReportingObserver((reports) => {
      reports.forEach(callback);
    }, options);
  }, [callback, options]);
}
```

`ReportingObserver`를 초기화하여 `ro` 변수로 할당한다.

`ro.observe()` 메서드를 통해 태그를 등록할 수 있다.

``` typescript
import { useEffect } from "react";

export type UseReportingObserverCallback = (entry: Report) => void;

/**
 * ReportingObserver 적용 훅 메서드
 *
 * @param {UseReportingObserverCallback} callback: 콜백 메서드
 * @param {PerformanceObserverInit} options: 옵션
 */
export function useReportingObserver(
  callback: UseReportingObserverCallback,
  options?: ReportingObserverOptions
): void {
  useEffect(() => {
    const ro = new ReportingObserver((reports) => {
      reports.forEach(callback);
    }, options);

    ro.observe();
  }, [callback, options]);
}
```

마지막으로, 컴포넌트가 렌더링 될 때마다 `ReportingObserver`의 등록이 중첩되지 않도록, 초기화 코드를 넣어준다.

`ro.disconnect()` 메서드를 통해 `ReportingObserver`를 제거할 수 있다.



## 전체 코드

``` typescript
import { useEffect } from "react";

export type UseReportingObserverCallback = (entry: Report) => void;

/**
 * ReportingObserver 적용 훅 메서드
 *
 * @param {UseReportingObserverCallback} callback: 콜백 메서드
 * @param {PerformanceObserverInit} options: 옵션
 */
export function useReportingObserver(
  callback: UseReportingObserverCallback,
  options?: ReportingObserverOptions
): void {
  useEffect(() => {
    const ro = new ReportingObserver((reports) => {
      reports.forEach(callback);
    }, options);

    ro.observe();

    return () => {
      ro.disconnect();
    };
  }, [callback, options]);
}
```

전체 코드는 위와 같다.





## CodeSandbox로 통한 예시

CodeSandbox로 간단한 예시를 구현했다.

<iframe src="https://codesandbox.io/embed/w558ks?view=split&module=%2Fsrc%2Fobserver-hook.ts&expanddevtools=1"
     style="width:100%; height: 1000px; border:0; border-radius: 4px; overflow:hidden;"
     title="ReportingObserver"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





# 마치며

`ReportingObserver`는 서비스에서 발생하거나 발생할 수 있는 잠재적인 오류를 모니터링할 수 있는 옵저버다.

이 옵저버를 적절히 활용하면 간단하게 자체적인 오류 모니터링 모듈을 구현할 수 있을 것이다.

<br />

그러나 이미 코드 품질 및 서비스 안정성을 검증하는 여러 오픈/상용 소프트웨어가 존재하기도 하고, 결정적으로 `ReportingObserver`에 대한 정보가 상당히 미흡하다.

이 옵저버 또한 `PerformanceObserver`와 마찬가지로, 이런 게 있다 정도로만 짚고 넘어가도, 개발에 큰 지장은 없을 것이라 생각한다.





# 시리즈를 끝마치며

6편에 걸친 Observer API 시리즈가 완결됐다. 실제로 개발을 진행하면서, 몇몇 Event Driven 기반의 코드를 Observer API로 대체하고 있다. 컴포넌트 및 기능 개발에 있어서 더욱 효율적이고, 간편한 로직을 구현하기 용이했던 것 같다.

특히, 요즘 개발하는 대부분의 개인 프로젝트에, 주요 옵저버를 React 훅으로 만들어 사용하고 있는데, DOM 등록 귀찮은 코드를 간단하게 줄일 수 있는 점이 매력적이였다.

앞으로 종종 React 컴포넌트와 관련된 글을 작성할 예정인데, 이전에 Observer에 관련된 내용을 짚고 넘어가야 몇몇 컴포넌트 설명이 매끄러워질 것이라 판단했다.

앞으로 있을 컴포넌트 설명과 더불어, 컴포넌트와 관계없이 이 글을 읽는 분들이, Observer API를 통해 기능 개발에 더 많은 인사이트를 얻길 바란다.