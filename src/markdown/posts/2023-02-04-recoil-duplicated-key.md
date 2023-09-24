---
title: "[recoil] Duplicate atom key 오류 해결하기"
excerpt: "React와 상태관리는 떼놓을 수 없는 존재다. 좀 더 효율적이고 스마트한 상태관리를 위한 많은 시도가 있어왔는데, recoil도 그 중 하나다. recoil은 선발주자인 Redux, mobx와 달리 간편하면서도 강력한 기능 덕분에 많은 사랑을 받는 라이브러리다. 나 또한 React 개발 시 애용하기도 하고."
coverImage: "https://user-images.githubusercontent.com/50317129/216662084-69f29d33-1956-42a1-90d6-80d311949d10.png"
date: "2023-02-04T01:56:31+09:00"
type: "posts"
category: "React"
tag: [ "React", "Web", "recoil" ]
comment: true
publish: true
---

# 개요

React와 상태관리는 떼놓을 수 없는 존재다. 좀 더 효율적이고 스마트한 상태관리를 위한 많은 시도가 있어왔는데, `recoil`도 그 중 하나다.

`recoil`은 선발주자인 `Redux`, `mobx`와 달리 간편하면서도 강력한 기능 덕분에 많은 사랑을 받는 라이브러리다. 나 또한 React 개발 시 애용하기도 하고.

<br />

NextJS 같은 SSR 프레임워크와 `recoil`을 쓰다보면 콘솔에 이런 오류를 자주 볼 수 있다.

``` txt
Expectation Violation: Duplicate atom key [KEY_NAME].

This is a FATAL ERROR in production.
But it is safe to ignore this warning if it occurred because of hot module replacement.
```

직역하자면, `atom`의 키가 중복되었다는 뜻인데, 분명 중복된 키를 가진 `atom`이 없음에도 이런 오류가 발생한다.

다행히도 기능 상의 문제는 없으며, 빌드 시 사라지긴 한다. 그러나 명목상으로나마 <span class='red-600'>오류</span>인 이 현상을 그냥 두기엔 꽤나 거슬린다.

이 문서에서는 이러한 현상이 발생하는 이유와, 이를 어떻게 해결하는지에 대해 다루고자 한다.










# 왜?

이 현상은 보통 개발환경에서만 발생하며, 빌드 후 배포한 운영환경에선 잡히지 않는 경우가 대부분이다. 반대였다면 꽤나 골치아팠을텐데.

개발환경에서만 발생하며, 기능에 별다른 문제도 일어나지 않는 이 오류같지 않은 오류는 왜 발생하는걸까?

<br />

``` tsx
const stringAtom = atom<string | undefined>({
  key: 'stringAtom',
  default: undefined
});
```

위 코드는 기초적인 `atom` 선언 방법이다. `key`는 `atom`을 내부적으로 구분하기 위한 고유값을 입력한다. 분명 `stringAtom`은 다른 `atom`에 쓰지 않았음에도, 오류가 발생할 것이다.

그 이유는 React 개발환경만의 특징과 밀접한 연관이 있다.. React 개발 시, 편의를 위해 핫 로드 기법을 사용한다. 코드가 변경될 경우, 개발 서버가 이를 감지하여 변경분을 실시간으로 교체해준다. 이 과정에서, 일부 코드가 다시 렌더링되며 `recoil`의 `atom` 까지 다시 할당해버린다.

때문에 `recoil` 입장에서는, 이미 할당된 `stringAtom`을 다시 할당하는 것이므로, `atom`의 고유값 훼손을 막기 위해 오류를 발생시켜 개발자에게 이를 알려주는 것이다. 하지만 개발자 입장에서는 본인의 의지가 전혀 개입되지 않은 현상이므로, 서로의 입장 차이가 발생하는 셈이다.

물론 일반적인 서비스라면 이러한 형태로 구동되지 않는다. 위에서 언급했듯이 핫 로드라는 환경으로 인해 개발환경에서만 발생하는 것이다. 운영환경의 경우, 당연히 빌드된 결과물만 갖고 구동하므로 이런 일이 발생하지 않는다.










# 해결 방법

이 오류의 해결방법은 그리 어렵지 않다. 간혹 여러 자료에서 `node_modules`의 `recoil` 라이브러리 파일을 찾아 이를 유발하는 `console.error()`를 주석 처리하라고 알려주기도 한다. 하지만 대부분 알다시피, 이렇게 라이브러리를 임의로 수정해서 사용하는 건 그리 좋은 방법은 아니다. 물론 방법이 정 없다면? 이렇게라도 하는 게 맞겠지만, 이 경우 라이브러리를 욕해도 라이브러리 개발자는 할 말이 없을 것이다.

그러니 아래 두 방법 중 하나를 택하여, 깔끔한 트러블슈팅과 라이브러리 개발자를 향한 리스펙 둘 다 챙겨보자.





## recoil@0.7.6 이상일 경우의 방법

`recoil` 사용자 모두가 이 유사 버그를 거슬려 하다보니, 해당 라이브러리의 레포지토리는 물론, 각종 커뮤니티에서 관련된 토론이 끊이질 않았다.

다행히 `0.7.6` 버전부터 라이브러리에 관련 옵션을 추가하여 오류를 쉽게 컨트롤 할 수 있도록 개선했다.

환경변수를 활용하는 방법 하나, 코드 내에서 활용하는 방법 하나가 있다.



### 환경변수 활용하기

``` properties
 # .env
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
```

환경변수에서 `RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED` 옵션을 꺼주면 된다.

어찌됐든 `atom`의 고유성을 보호하는 로직인데다, 운영환경에서는 진짜 중복된 게 아닌 이상 개발환경처럼 중구난방으로 발생하지 않으므로 덮어놓고 꺼버리는 건 그닥 좋은 선택지는 아닌 것 같아 보인다.

이 경우 아래와 같이 스마트하게 구성할 수도 있다.

<br />

``` properties
 # .env.development
 # 개발환경 환경변수
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false

 # .env.production
 # 운영환경 환경변수
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=true
```

이렇게 환경에 따라 옵션에 차이를 둘 수 있다.



### 코드 활용하기

간혹, 특정 프레임워크는 환경변수의 접두사로 특정 문자열을 반드시 요구하기도 한다. 이 경우 환경변수를 활용하기엔 무리가 있다. 그 외에도 여러 이유로 환경변수를 활용할 수 없는 케이스가 있을 수도 있고.

그렇다고 걱정하지 않아도 된다. 코드 상에서도 동일한 동작을 구현할 수 있으니 말이다.

``` tsx
import { RecoilEnv, RecoilRoot } from 'recoil';

// 중복 체크 해제
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = process.env.NODE_ENV === 'production';

export default function App(): JSX.Element
{
  return (
    <RecoilRoot>
      <Component />
    </RecoilRoot>
  );
}
```

`RecoilEnv`를 통해 코드 상에서 옵션을 컨트롤 할 수 있다. `process.env.NODE_ENV`가 환경값을 담고 있으므로, 이를 활용하면 위처럼 개발환경에서만 옵션을 끌 수 있다.





## 모든 recoil 버전에서의 해결 방법

`0.7.6` 버전 미만에서는 `RecoilEnv`를 제공하지 않는다. 따라서 코드 상에서 다른 방법을 강구해야한다.

이 방법은 코드 내에서 해결하는 범용적인 방식이므로, `recoil` 버전이 `0.7.6` 이상이여도 적용 가능하다.

<br />

원리는 간단하다. 이 오류가 발생하는 이유는 **핫 로드로 인해 재할당되는 과정에서 동일한 key를 가진 atom을 할당하기 때문**이다.

그럼 개발환경에서만 key가 중복 안 되게만 해주면 된다. 어차피 재할당 되면서 해당 `atom`으로 대체되므로, 키가 달라져도 기능 상의 차이는 없다.

<br />

``` tsx
const stringAtom = atom<string | undefined>({
  key: process.env.NODE_ENV === 'development' ? `stringAtom-${Date.now()}` : 'stringAtom' ,
  default: undefined
});
```

`process.env.NODE_ENV`를 통해 개발환경일 때만 키에 시간을 붙여서 할당한다. 굳이 시간이 아니더라도 `Math.random()` 같이 난수 특징을 갖는 것들 중 마음에 드는걸 갖다 붙여도 상관없다.

좀 더 스마트하게 구성하려면 아래와 같이, `key` 생성 부분을 메서드로 빼도 된다.

``` tsx
function getAtomKey(key: string)
{
  return process.env.NODE_ENV === 'development' ? `${key}-${Date.now()}` : key;
}

const stringAtom = atom<string | undefined>({
  key: getAtomKey('stringAtom'),
  default: undefined
});
```

위 처럼 만들면 코드의 중복을 제거할 수 있다.










# 마치며

위에서 언급한 방법 중 마음에 드는 걸 선택하면 된다.

결과에 차이는 없으나, 난 개인적으로 **모든 recoil 버전에서의 해결 방법**을 더 선호한다.

검증 로직을 고의로 꺼서 이미 발생한 에러를 막는 것보다, 에러를 유발하지 않는 게 더 나을 것 같다는 생각 때문이다. 물론 내부를 까보진 않아서 어떻게 동작할진 모르지만.

<br />

이제 거슬리는 오류를 치워버리자.