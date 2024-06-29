---
title: "[Observer API 파헤치기] 4. MutationObserver"
excerpt: "MutationObserver API는 DOM의 변화를 감지하는데 특화된 옵저버다. width나 height 같은 사이즈는 물론, class 같은 속성의 변화도 감지할 수 있다. 이 옵저버의 사용법을 알아보고, React에서 커스텀 훅을 통해 간편하게 사용해보자."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c472262e-0b99-4a6f-836f-fc797bcf26d9"
date: 1719163112909
type: "posts"
category: "TypeScript"
tag: [ "JavaScript", "TypeScript", "React", "Observer API", "MutationObserver" ]
group: "Observer API 파헤치기"
comment: true
publish: true
---

# MutationObserver

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/c3a01a7f-d732-40c2-9768-557b04b58b2f)

`MutationObserver`는 DOM의 변화를 감지하는 옵저버다. DOM과 관련된 어떤 요소가 변하든지 감지할 수 있다. 이를테면, `width` 혹은 `padding` 같은 `style` 태그는 물론, `class`나 `id`, 자식 노드의 추가 등이 있다.

DOM의 변화를 감지한다는 특징으로 인해, DOM의 사이즈 변화를 감지하는 `ResizeObserver`를 대체할 수 있다.

``` typescript
const mo = new MutationObserver(callback);

mo.observe(tag, options);
```





## options

요소 등록 시 `options`를 전달하여 세부 옵션을 조정할 수 있다. `MutationObserverInit` 타입을 가진다.



### 속성 필터 (attributeFilter)

`attributeFilter`에 원하는 속성명을 배열로 지정하면, 해당 이름을 가진 속성의 변화만을 필터링하여 감지한다.

``` typescript
{
	// ...
	attributeFilter: [ 'id', 'class' ]
}
```

위와 같이 지정할 경우, `id` 및 `class`가 변할때만 옵저버가 감지한다. 만약 아무 값도 할당하지 않은 `undefined`일 경우, 모든 변화를 감지한다.



### 이전 속성값 (attributeOldValue)

`MutationObserver`는 DOM이 변화됐을 때 동작한다. 이 때, 상황에 따라 변화 이전의 값을 기반으로 로직을 구성하기도 하는데, 이 때 `attributeOldValue` 설정이 유용할 것이다.

``` typescript
{
	// ...
	attributeOldValue: true
}
```

위와 같이 지정할 경우, 속성 변화를 감지할 시, 변화 이전의 값도 같이 제공해준다. 이전 속성이 존재할 수 없는 첫 변화거나, 속성이 아닌 변화(자식 노드의 추가 등)일 경우 `null`이 반환된다.



### 속성 변화 감지 여부 (attributes)

DOM 속성 변화의 감지 여부를 지정한다.

``` typescript
{
	// ...
	attributes: true
}
```

`id`, `class`, `style` 같은 DOM의 속성 변화를 감지하고 싶을 경우, 해당 설정을 `true`로 지정해준다.

`attributeFilter` 혹은 `attributeOldValue`에 값이 지정된 경우, 해당 옵션을 생략할 수 있다.




### 텍스트 노드 변화 감지 여부 (characterData)

DOM의 텍스트 노드 변화(`node.value`)의 감지 여부를 지정한다.

``` typescript
{
	// ...
	characterData: true
}
```

DOM의 `textContent` 값이 바뀔 경우, 이를 감지한다.

``` typescript
function handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
	const tag = document.getElementById('target');

	if (tag?.firstChild?.textContent) {
		tag.firstChild.textContent = e.currentTarget.value;
	}
}
```

위와 같이 `tag.firstChild.textContent` 값이 변할 경우, `characterData` 이벤트가 감지된다.



### 이전 텍스트 노드 값 (characterDataOldValue)

`true`로 지정할 경우, `attributeOldValue`와 비슷하게 텍스트 노드 값 변화 시, 변화 이전의 값을 같이 반환해준다.

``` typescript
{
	// ...
	characterDataOldValue: true
}
```

이전 속성이 존재할 수 없는 첫 변화거나, 속성이 아닌 변화(자식 노드의 추가 등)일 경우 `null`이 반환된다.



### 자식 노드 변화 감지 여부 (childList)

대상 DOM에 자식 노드가 추가되거나 삭제될 경우를 감지한다.

``` typescript
{
	// ...
	childList: true
}
```

위와 같은 설정을 통해, 특정 DOM의 구조 변화를 능동적으로 감지할 수 있다.



### 하위 노드 변화 감지 여부 (subtree)

`subtree` 옵션으로 감지 범위를 하위 노드까지 확장할 수 있다.

``` typescript
{
	// ...
	subtree: true
}
```

위 옵션을 활성화하면, 하위 노드의 `attributes`, `characterData`, `childList` 변화까지 감지해준다. 감지 기준은 옵션에 할당한 부모의 기준과 동일하다.

예를들어, `attributes` 감지만 활성화하고 `subtree`를 적용하면, 자신 및 하위 노드 전체의 속성 변화 여부를 감지할 수 있다.





## callback

콜백 메서드를 통해 DOM 변화 시 동작할 로직을 지정할 수 있다. `MutationRecord` 타입을 가진다. 이를 코드로 표기하면 아래와 같다.

``` typescript
const mo = new MutationObserver((record) => {});
```



### 추가된 노드 (addedNodes)

`addedNodes`는 추가된 노드가 있을 경우, 이를 배열 형태로 반환한다. 노드 추가, 삭제와 관련된 `childList` 옵션이 활성화된 경우 반환된다.

``` html
<!-- 초기값 -->
<div id="target">
	
</div>

<!-- addedNodes 반환됨 -->
<div id="target">
	<p>just added!</p>
</div>
```

위 예시의 경우, `#target` 하위에 추가된 노드 `p`의 정보가 담긴다.

### 삭제된 노드 (removedNodes)

`removedNodes`는 삭제된 노드가 있을 경우, 이를 배열 형태로 반환한다. 조건은 `addedNodes`와 같다.

``` html
<!-- 초기값 -->
<div id="target">
	<p>just added!</p>
</div>

<!-- removedNodes 반환됨 -->
<div id="target">
	
</div>
```



### 변경된 속성명 (attributeName)

`attributeName`는 속성이 변경된 경우, 변경된 속성의 이름을 반환한다. 속성의 변화와 관련된 `attributes` 옵션이 활성화 된 경우 반환된다.

``` html
<!-- 초기값 -->
<div id="target">
	
</div>

<!-- attributeName 반환됨 -->
<div id="target" class="hi">
	
</div>
```

위 예시의 경우, `#target` 속성으로 추가된 속성명 `class`가 반환된다.



### 변경된 속성 네임스페이스 (attributeNamespace)

`attributeNamespace` 속성 네임스페이스가 변경된 경우, 변경된 속성 네임스페이스를 반환한다. 마찬가지로, `attributes` 옵션이 활성화 된 경우 반환된다.

변경된 속성이 네임스페이스를 가지고 있을 경우, 네임스페이스를 같이 반환한다고 이해하면 된다.

``` html
<!-- 초기값 -->
<div id="target">
	
</div>

<!-- attributeName 반환됨 -->
<div id="target" class="hi">
	
</div>
```

만약 `class` 생성 시 `setAttributeNS`를 통해 `ns`라는 네임스페이스로 묶어 생성한다면, 코드는 아래와 같이 구성된다.

``` typescript
tag.setAttributeNS("ns", "class", "hi");
```

위와 같은 예시에서, `attributeName`은 `class`를, `attributeNamespace`은 `ns`를 반환하게 된다.



### 변경된 태그의 다음 형제 태그 (nextSibling)

추가 혹은 제거된 노드의 다음 형제 DOM을 반환한다. 노드 추가, 삭제와 관련된 `childList` 옵션이 활성화된 경우 반환된다.



### 변경된 태그의 이전 형제 태그 (previousSibling)

추가 혹은 제거된 노드의 이전 형제 DOM을 반환한다.



### 변경 이전의 값 (oldValue)

변경 이벤트가 감지된 경우, 변경 이전의 값을 반환한다. `attributeOldValue` 및 `characterDataOldValue` 옵션이 `true`일 경우에만 값을 반환한다.



### 이벤트 대상 (target)

이벤트가 발생한 태그를 반환한다.



### 이벤트 타입 (type)

발생한 이벤트의 타입을 반환한다. 아래의 값 중, 발생한 이벤트의 이름을 반환한다.

- `attributes`
- `characterData`
- `childList`



### observer

`MutationObserver` 객체를 반환해준다. 이를 통해 콜백 메서드 내에서도 `MutationObserver`를 연쇄적으로 다룰 수 있다.





# React에서 커스텀 훅으로 간편하게 사용하기

`MutationObserver`를 커스텀 훅을 통해 간편하게 사용해보자.

``` typescript
export function useMutationObserver(): void
{
  //
}
```

위와 같이 `useMutationObserver` 메서드를 정의한다.

`useMutationObserver`를 사용하기 위해선 아래의 세 요소가 필요하다.

1. 대상 DOM
2. 콜백 메서드
3. 옵션

위 세 요소를 파라미터로 정의하자. 1번의 경우, 일반적으로 `HTMLElement`가 필요하지만, 해당 훅에서는 `HTMLElement` 타입 뿐만 아니라, `string`을 받아 `#id`, `.class`와 같은 선택자로 태그를 활용할 수 있도록 만들 것이다.

``` typescript
import { useEffect } from "react";

export type UseMutationObserverCallback = (entry: MutationRecord) => void;

/**
 * MutationObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseMutationObserverCallback} callback: 콜백 메서드
 * @param {MutationObserverInit} options: 옵션
 */
export function useMutationObserver(ref: Element | string | null, callback: UseMutationObserverCallback, options: MutationObserverInit): void
{
	useEffect(() =>
	{
		const ro = new MutationObserver((entries) =>
		{
			entries.forEach(callback);
		});
	}, [ ref, callback, options ]);
}
```

`MutationObserver`를 초기화하여 `mo` 변수로 할당한다.

이후 `ref`로 지정한 DOM을 할당한다.

`ref`는 세 가지 상태에 따라 아래와 같은 분기를 거친다.

- `null`일 경우 -> 패스한다.
- `string`일 경우 -> `document.querySelector` 메서드로 태그를 선택한 뒤, 해당 태그를 등록한다.
- `HTMLElement`일 경우 -> 이미 `Element`이므로, 즉시 등록한다.

`typeof ref === "string"` 구문을 통해 `ref`가 문자열인지를 판별하여 구현했다.

`mo.observe()` 메서드를 통해 태그를 등록할 수 있다.

``` typescript
import { useEffect } from "react";

export type UseMutationObserverCallback = (entry: MutationRecord) => void;

/**
 * MutationObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseMutationObserverCallback} callback: 콜백 메서드
 * @param {MutationObserverInit} options: 옵션
 */
export function useMutationObserver(ref: Element | string | null, callback: UseMutationObserverCallback, options: MutationObserverInit): void
{
	useEffect(() =>
	{
		const mo = new MutationObserver((entries) =>
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
					mo.observe(tag, options);
				}
			}

			// DOM일 경우
			else
			{
				mo.observe(ref, options);
			}
		}
	}, [ ref, callback, options ]);
}
```

마지막으로, 컴포넌트가 렌더링 될 때마다 `MutationObserver`의 등록이 중첩되지 않도록, 초기화 코드를 넣어준다.

`mo.disconnect()` 메서드를 통해 `MutationObserver`를 제거할 수 있다.





## 전체 코드

``` typescript
import { useEffect } from "react";

export type UseMutationObserverCallback = (entry: MutationRecord) => void;

/**
 * MutationObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseMutationObserverCallback} callback: 콜백 메서드
 * @param {MutationObserverInit} options: 옵션
 */
export function useMutationObserver(ref: Element | string | null, callback: UseMutationObserverCallback, options: MutationObserverInit): void
{
	useEffect(() =>
	{
		const mo = new MutationObserver((entries) =>
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
					mo.observe(tag, options);
				}
			}

			// DOM일 경우
			else
			{
				mo.observe(ref, options);
			}
		}

		return () =>
		{
			mo.disconnect();
		};
	}, [ ref, callback, options ]);
}
```

전체 코드는 위와 같다.



## CodeSandbox를 통한 예시

CodeSandbox로 간단한 예시를 구현했다.

<iframe src="https://codesandbox.io/embed/99dw64?view=split&module=%2Fsrc%2FApp.tsx&expanddevtools=1"
     style="width:100%; height: 1000px; border:0; border-radius: 4px; overflow:hidden;"
     title="MutationObserver"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





# 마치며

이와 같이 `MutationObserver`를 활용하면 DOM의 변화를 능동적으로 감지할 수 있다.

간혹, React 컴포넌트에서 요소를 변경할 경우, 이를 타 컴포넌트에서 연관지어 추가적인 코드를 실행할 필요가 생기기도 한다. 이를 해결하기 위해 컴포넌트에 불필요한 타 컴포넌트 로직을 넣기도 한다.

`MutationObserver`를 활용하면 이를 분리하여 간단하게 구현할 수 있다.

남은 옵저버는 상대적으로 사용성이 낮은 것들이다. 그 중, 성능과 관련된 `PerformanceObserver`에 대해 다룰 예정이다.