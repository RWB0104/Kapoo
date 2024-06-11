---
title: "[Observer API 파헤치기] 1. Observer API"
excerpt: "Observer API가 무엇인지, 전통적인 Event Driven 기법과 어떤 차이가 있으며, 어떤 강점이 있는지 알아본다."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c472262e-0b99-4a6f-836f-fc797bcf26d9"
date: 1718123160382
type: "posts"
category: "TypeScript"
tag: [ "JavaScript", "TypeScript", "React", "Observer API", "IntersectionObserver", "ResizeObserver", "MutationObserver", "PerformanceObserver", "ReportingObserver" ]
group: "Observer API 파헤치기"
comment: true
publish: true
---

# 개요

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/ce5f9c8f-e3c5-4e96-ada9-572e284793fa)

프론트엔드를 개발하다보면, 수 많은 이벤트들을 다루게 된다.

대부분 사용자의 상호작용에 따른 이벤트를 다루지만, 간혹 스크롤이나, 리사이징같이 DOM의 변화에 밀접하게 연관된 이벤트를 다루기도 한다.

이 경우 일반적인 Event Driven(이하 이벤트 드리븐) 방식보다, 브라우저의 Observer API를 쓰면 훨씬 최적화된 성능의 이벤트 핸들링을 구현할 수 있다.

본 시리즈를 통해 Observer API를 탐구해보고자 한다.





## Observer API

![옵저버](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/8c7ae1f7-7f0b-4be1-8f22-da97c42196c8)

Observer API는 특정 이벤트나, DOM의 상태 변화를 비동기적으로 감지하고, 이에 따라 원하는 동작을 수행할 수 있는 API다.

브라우저의 API이므로, 반드시 클라이언트 사이드에서만 사용할 수 있다.

Observer API의 종류는 5가지가 존재한다.

| API                  | 용도                                           |
| :------------------- | :--------------------------------------------- |
| IntersectionObserver | 요소가 브라우저 뷰포트 간의 교차 여부를 감지함 |
| ResizeObserver       | 요소의 width, height 변화를 감지               |
| MutationObserver     | DOM 트리의 변화를 감지                         |
| PerformanceObserver  | 페이지 성능과 관련된 이벤트를 감지             |
| ReportingObserver    | 브라우저에서 발생하는 경고 및 문제 감지        |

일반적으로 사용자의 상호작용보단, 페이지 요소와의 상호작용과 연관되어있다.

각자가 가진 용도에 맞게 적합한 옵저버를 활용할 경우, 높은 최적화와 신뢰성있는 이벤트 핸들링이 가능하다.

`PerformanceObserver`와 `ReportingObserver`는 용도로 인해 프론트엔드 개발에서 거의 쓸 일이 없다.



### Event Driven과의 차이

이벤트 드리븐보다 훨씬 효과적인 이벤트 관리가 가능하다고 했는데, 과연 어째서 가능한 것일까?

`IntersectionObserver`를 예시로 들어보자. 이 옵저버는 요소가 실제 뷰포트에 보이는지 여부를 감지할 때 많이 쓰인다.

우선, 옵저버 없이 요소가 뷰포트에 표현됐는지 여부를 확인하려면 아래 형태의 코드가 필요하다.

``` typescript
document.addEventListener('scroll', () => {
  console.log('스크롤 위치 확인 및 동작');
});
```

요소가 뷰포트에 포함되기 위해선 반드시 스크롤 작업이 선행되므로, `document`라는 전역 객체에 스크롤 이벤트를 추가하여 감지할 수 있을 것이다.

이 방법의 경우, 아래와 같은 단점이 있다.

1. 스코프에 비해 적용 범위가 너무 넓다. `document`에 적용되었으므로, 해당 DOM의 관심사와 관계없이 스크롤 시 항상 잠재적인 동작이 추가된다.
2. 반드시 **스크롤**이라는 선행 작업을 요구한다. 어떠한 이유로든 스크롤 동작 없이 뷰포트에 DOM이 표현되어도, 스크롤하기 전까진 관련 이벤트 코드가 동작하지 않을 것이다.
3. 불필요한 코드가 지속적으로 실행된다. 단순히 문서를 스크롤할 때마다 이벤트가 과도하게 실행되므로, 불필요한 오버헤드가 발생하기 쉽다.

`IntersectionObserver`을 적용하면 아래와 같이 표현된다.

``` typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Element is in view!');
    }
  });
});

observer.observe(document.getElementById('tag'));
```

위 코드는 이벤트 드리븐과 달리, DOM이 뷰포트와 교차하는 순간에만 이벤트가 동작한다. 불필요한 이벤트 낭비가 사라지는 셈이다. 관련 연산이 줄어듬에 따라 더 나은 퍼포먼스를 기대할 수 있다.





## 마치며

다음 장부터 `IntersectionObserver`를 시작으로 각 옵저버에 대해 자세히 파헤쳐보자.