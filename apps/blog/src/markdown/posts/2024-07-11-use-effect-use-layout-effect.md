---
title: "useEffect & useLayoutEffect"
excerpt: "React의 렌더링을 다루는 대표적인 훅으로 useEffect와 useLayoutEffect가 있다. 비슷하면서도 다른 것 같은 각각의 훅에 대한 특징을 다뤄본다."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/1865e448-684c-4967-9a58-013bb1ef30df"
date: 1720630066921
type: "posts"
category: "TypeScript"
tag: [ "TypeScript", "React", "useEffect", "useLayoutEffect" ]
comment: true
publish: true
---

# 개요

React는 클래스형(Class Component)과 함수형(Function Cmpoonent) 두 종류로 나뉜다. 함수형 React가 트렌드가 된 이후로, Hook과 Context 등, 함수형 컴포넌트를 위한 다양한 요소가 추가됐다.

그 중 React의 라이프사이클과 연관되는 Hook은 컴포넌트 개발에 있어 중요한 요소다. 개발자가 자체적으로 다양한 훅을 만들 수 있지만, React 또한 개발자가 React를 좀 더 간편하고 효율적으로 활용할 수 있도록 라이브러리 단계에서 다양한 Hook을 제공하고 있다.

그 중 많이 렌더링을 제어하는데 사용하는 훅으로 `useEffect`와, 비슷하면서도 다소 생소한 `useLayoutEffect`가 존재한다.

이 문서에서는 `useEffect`와 `useLayoutEffect` 훅의 내용과 사용법을 알아봄으로써, 렌더링 작업을 적절히 제어해본다.





## useEffect

React 개발자라면 `useEffect`를 반드시 한 번쯤 사용했을 것이다. `useEffect` 훅은, 함수형 컴포넌트에서 React 외부의 코드를 동작하기 위해 사용하는 훅이라 정의된다.

여기서 React 외부의 코드란, API 데이터를 가져온다거나, 특정 DOM을 조작한다거나, 브라우저 영역의 코드를 사용하는 등의 코드를 의미한다.

`useEffect`의 가장 큰 특징은, `useEffect`에 선언된 코드는 반드시 **렌더링 작업이 완료된 이후에 실행**된다는 것이다. 즉, 반드시 클라이언트 사이드에서의 동작을 의미한다.

> **Client Side**  
> 모던 React에서는 코드의 동작 영역을 서버 사이드(Server Side)와 클라이언트 사이드(Client Side)로 구분한다.  
> 각각의 영역에서만 동작 가능한 코드들이 있다. 예를 들어, 클라이언트 사이드는 쿠키나 로컬 스토리지, DOM 등, 브라우저와 연관된 코드를 수행할 수 있다.

일반적인 웹 프론트 개발과 달리, React 혹은 그와 비슷한 프론트엔드 프레임워크의 경우, 컴포넌트가 렌더링된다는 개념이 생기며, 올바르지 않은 단계에서 로직을 수행할 경우, 문제가 발생할 수 있다. 예를 들어, 컴포넌트가 아직 렌더링되지 않았음에도, DOM에 접근한다거나, 쿠키를 사용하는 등의 클라이언트 코드를 수행할 경우, 렌더링 실패 혹은 그에 준하는 오류가 발생하며, 렌더링에 실패하게 된다.

렌더링이 완전히 끝난 이후엔 클라이언트 사이드 로직을 수행할 수 있으므로, `useEffect`를 통해, 클라이언트 사이드에서만 동작하는 코드를 명시할 수 있다.



### 사용법

아래는 `useEffect`의 기초적인 사용법이다.

``` tsx
useEffect(callback, arr);
```

`callback`에 원하는 콜백 메서드를 지정할 수 있다. 별도의 파라미터를 받을 수는 없다. 이 콜백 메서드는 렌더링 작업이 끝난 이후, 비동기적으로 수행될 것이다.

`arr`은 의존성 배열이다. 해당 배열에는 어떤 변수든 할당할 수 있으며, 할당한 변수가 변경되면, `useEffect`의 콜백 메서드가 다시 수행된다.

이러한 특징으로 특정 변수 변경 시, 의도적으로 특정 동작을 수행하여, 변수의 변경에 대응하여 적절한 렌더링을 수행할 수 있다.



### return을 통한 훅 초기화

`useEffect`는 기본적으로 `void`를 반환하지만, `return`을 활용하여 콜백 메서드를 반환할 수 있다. 이를테면 아래와 같은 방식이다.

``` tsx
useEffect(() => {
	const handle = () => {
		console.log(`just resized at ${Date.now()}`)
	}

	document.addEventListener('resize', handle);

	return () => {
		document.removeEventListener('resize', handle);
	}
}, []);
```

`return`으로 콜백 메서드를 다시 반환했다. 이 `return`은 훅을 초기화하는 코드로, `return`의 콜백 메서드가 수행되는 조건은 아래와 같다.

1. 컴포넌트가 언마운트 될 때.
2. 디펜던시 배열의 값이 변경되어 리렌더링 될 때.

위와 같이, 컴포넌트 언마운트 및 리렌더링 시, 초기화하거나, 제거해야할 동작이 있을 경우 사용한다.

위 코드를 예로 들자면, 컴포넌트가 렌더링되면서, `document` 전역에 리사이즈 이벤트를 추가했다. 만약, `return`으로 이벤트를 제거하지 않을 경우, 컴포넌트가 마운트되거나, 렌더링이 다시 일어날 때마다 리사이즈 이벤트가 누적되어 복수로 수행된다.




### 예시 코드

``` tsx
import { useEffect } from 'react';

function Component(): JSX.Element {
	useEffect(() => {
		const tag = document.getElementById('target');

		if (tag) {
			tag.innerHTML = `in client side at ${Date.now()}`
		}
	}, [ deps ])

	return (
		<div>
			<h1>title</h1>

			<p id="target">initial</p>
		</div>
	)
}
```

`useEffect`의 코드는 렌더링 작업이 끝난 이후 동작한다. `#target`의 HTML 내용을 변경하며, 사용자는 렌더링 된 직후, `useEffect`의 코드가 수행되기 전까지의 짧은 시간동안 `initial`이라는 초기 텍스트를 관측할 수 있다.

`deps` 변수가 변할 때마다, 콜백 메서드가 다시 실행되며, 그 때마다 `Date.now()`에 의해 표시된 값이 바뀌는 걸 확인할 수 있다.



## useLayoutEffect

`useEffect`는 위에서도 다뤘다시피, 렌더링 후 코드를 비동기적으로 수행한다. 대다수의 React 개발자들이 많이 접하므로, 이 글을 보고 있는 당신 역시 React 개발자라면, 별다른 설명이 필요 없을 정도로 익숙할 것이다.

그렇다면 `useLayoutEffect`란 무엇이고, 어떻게 다룰까?



### 사용법

아래는 `useLayoutEffect`의 기초적인 사용법이다.

``` tsx
useLayoutEffect(callback, arr);
```

결론부터 얘기하자면 `useEffect`와 사용 방법이 완전히 동일하다. 별다른 설명이 필요 없을 정도.



### 예시 코드

``` tsx
import { useLayoutEffect } from 'react';

function Component(): JSX.Element {
	useLayoutEffect(() => {
		const tag = document.getElementById('target');

		if (tag) {
			tag.innerHTML = `in client side at ${Date.now()}`
		}
	}, [ deps ])

	return (
		<div>
			<h1>title</h1>

			<p id="target">initial</p>
		</div>
	)
}
```

이는 예시 코드에서도 나타나있는데, `useEffect`와 `useLayoutEffect`의 키워드만 변경해도 정상적으로 동작함은 물론, 최종 결과물마저 동일하다.

그렇다면 `useEffect`와 `useLayoutEffect` 단순히 알 수 없는 내부적인 이유로 갈라졌지만, 동작은 같은 숨겨진 쌍둥이였던걸까?





## useEffect와 useLayoutEffect의 차이

앞서 말했듯이, `useEffect`와 `useLayoutEffect`의 동작 방식은 동일하다. 차이는 다른 곳에 있는데, 바로 동작의 시점이다.

React 페이지가 실제 우리 눈에 표현되는 과정은 크게 두 가지로 나뉜다. 흔히 말하는 <span class="orange-600">렌더링(rendering)</span> 단계와 <span class="green-600">페인팅(painting)</span> 단계가 존재한다.

- <span class="orange-600">렌더링(rendering)</span>: DOM 트리를 구성하기 위해, 레이아웃 및 스타일을 연산하는 과정
- <span class="green-600">페인팅(painting)</span>: DOM 트리를 실제로 표현하는 과정

보편적으로 렌더링이라 뭉뚱그려 표현하지만, 실제로 페이지가 완전히 표현되는 시점은 페인팅 작업이 끝난 이후이다. 스크립트의 양이 크거나 복잡하여, 연산이 오래걸릴 경우, 사용자는 장시간 흰 화면을 보게 된다.

`useLayoutEffect`는 렌더링 이후, 페인팅이 시작되기 이전에 동기적으로 동작하는 훅이다. 반대로 `useEffect`는 페인팅 이후 비동기적으로 동작한다.

[그림]

간단하게 도식화하면 위와 같은 방식이다. `useLayoutEffect`는 사용자가 페이지를 보기 전에 연산이 일어나므로, 초기값 연산에 유용하다.

`useEffect`로 이를 구현하면, 기본값이 잠깐 표시된 이후, `useEffect`의 동작으로 약간의 시간차를 두고 반영되는걸 볼 수 있다. `useLayoutEffect`는 사용자가 페이지를 볼 수 있는 페인팅 이전에 동작하므로, 초기 연산 과정에서 나타나는 헛점을 숨길 수 있다.

단, `useEffect`와 달리 동기적으로 동작하므로, 너무 복잡한 연산을 할당할 경우 렌더링 시간이 길어지므로 주의해야한다.





## CodeSandbox로 차이 비교하기

<iframe src="https://codesandbox.io/embed/wxx3vh?view=split
&module=%2Fsrc%2FApp.tsx"
     style="width:100%; height: 1000px; border:0; border-radius: 4px; overflow:hidden;"
     title="useeffect-uselayouteffect"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

CodeSandbox를 통해 `useEffect`와 `useLayoutEffect`를 비교해보자. 완전히 동일한 동작을 수행하는 두 훅을 작성했다.

각 훅은 반복문을 5000번 수행하여, DOM에 텍스트를 표현한다.

`useLayoutEffect`로 인해 초기 렌더링 시간이 소요되며, 페인팅이 완료되어 페이지가 표시된 직후, `useEffect`가 동작한다.

때문에 사용자는 `useEffect`의 동작이 끝나기 전까지 약간의 빈 공간을 보게 된다.





# 결론

`useLayoutEffect`와 `useEffect`의 사용법은 동일하지만, 동작 시점의 상이함으로 인해 차이가 발생한다.

`useLayoutEffect`은 작고 간단한 초기 연산에 용이하며, `useEffect`는 데이터 fetch, 이벤트 훅 등 다양한 로직을 수행하는 데 용이하다.

용도에 맞는 훅을 사용함으로써, 페이지의 렌더링을 효과적으로 관리해보자.