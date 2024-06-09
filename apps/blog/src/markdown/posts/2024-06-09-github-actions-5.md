---
title: "[GitHub Actions] 삼가 수동배포의 명복을 GitHub Actions빔 - 5. 일해라 GitHub Actions! Steps(단계) & Actions(액션)"
excerpt: "GitHub Actions 워크플로의 목적과 동작이 정해지는 Steps와 Actions에 대해 알아본다."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/094a4fa5-f336-4c54-9df3-b5791d48de21"
date: 1717941842725
type: "posts"
category: "GitHub"
tag: [ "GitHub", "GitHub Actions", "Workflows", "Events", "Jobs", "Runners", "Steps", "Actions", "YAML" ]
group: "삼가 수동배포의 명복을 GitHub Actions빔"
comment: true
publish: true
---

# 개요

이 장에서는 GitHub Actions에게 실제 작업을 명령하는 단계(Steps)와 액션(Actions)에 대해 알아본다.

GitHub Actions의 동작이 직접 기술되는 영역으로, 액션을 어떻게 구성하느냐에 따라 해당 워크플로의 목적이 정해지는 셈이다.





## Steps(단계) 사용하기

단계는 `Jobs` 하위에 기술되며, 여러개의 액션으로 구성된 집합체다.

워크플로가 실행되는 동안, 단계는 하위에 기술된 액션을 순차적으로 실행한다.

``` yaml
name: jobs test
on: workflow_dispatch
jobs:
  jobs_test1:
    runs-on: ubuntu-latest
    steps:
	  # actions
```

원하는 작업 하위에 `steps`라는 지시어로 정의할 수 있다.

위 예시는 `jobs_test1` 작업에 적용한 예시다.





## Actions(액션) 정의하기

워크플로의 동작을 기술하는 소단위 요소로, 기본적으로 Linux 쉘 명령어를 사용할 수 있다.

``` yaml
name: jobs test
on: workflow_dispatch

jobs:
  jobs_test1:
    runs-on: ubuntu-latest

    steps:
	    - run: echo "Hello, World!"

	    - run: |
        echo "This is for"
        echo "multi line"
```

위 워크플로는 실행 시, `Hello, World` 텍스트를 출력하는 워크플로다.

워크플로를 직접 작성하는 것 이외에도, 마켓에 배포된 액션을 활용하여 원하는 스크립트를 간편하게 사용할 수 있다.

스크립트의 경우 첫 라인에 `|`를 입력하여 여러줄을 간편하게 사용할 수 있다.



### Actions에 이름 지정하기

액션에 `name`을 지정해줄 수 있다. 이 이름은 GitHub Actions 구동 시 표현되며, 액션의 동작이나 목적을 표현할 수 있다.

지정된 `name`은 GitHub Actions에 표현된다.

``` yaml
name: name test
on: workflow_dispatch

jobs:
  job:
    runs-on: ubuntu-latest

    steps:
      - name: name test
        run: echo include name

      - run: echo exclude name
```

위 스크립트는 두 개의 액션을 포함하며, 하나는 `name`이 선언되어 있고, 다른 하나는 선언되지 않았다.

GitHub Actions에선 아래와 같이 표현된다.

![GitHub Actions의 액션 표현](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/e1b2483a-6f7f-4e84-96f9-efed4b0957af)

`name`이 기입된 경우, 해당 텍스트를 표현해주며, 없을 경우 기본 텍스트를 표현한다.

이를 통해 각 액션의 특성을 직관적으로 나타낼 수 있다.

`name` 속성은 optional이며, 동작에 어떠한 영향을 미치지 않는다.



### Actions에 ID 지정하기

`id`는 액션을 타깃할 수 있는 고윳값이다.

``` yaml
name: name test
on: workflow_dispatch

jobs:
  job:
    runs-on: ubuntu-latest

    steps:
      - name: name test
        id: name
        run: echo include name
```

`id`는 위와 같이 선언할 수 있으며, 원하는 텍스트를 기입하면 된다. 이 고윳값을 가진 특정 액션을 참조할 수 있게된다.



### Actions에 출력값 지정하기

작업에서 원하는 출력값을 지정할 수 있듯이, 액션에서도 원하는 출력값을 지정하여 활용할 수 있다.

``` yaml
name: actions output test
on: workflow_dispatch

jobs:
  job:
    runs-on: ubuntu-latest

    steps:
      - name: output test
        id: key
        run: echo "VAR=action output" >> $GITHUB_OUTPUT

      - name: output check
        run: echo ${{ steps.key.outputs.VAR }}
```

액션 내에서 출력값은 아래의 코드로 지정할 수 있다.

``` bash
echo "key=value" >> $GITHUB_OUTPUT
```

> 관련 정보를 찾다보면 `echo "::set-output name=SELECTED_COLOR::green"` 명령어로 할당하라는 자료를 볼 수 있는데, 해당 코드는 deprecated된 명령어다. 물론 사용하는데 지장은 없지만, GitHub Actions 콘솔에서 경고를 볼 수 있다. 자세한 내용은 [공식문서 참조](https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/)

`key`에 원하는 키 값을, `value`에 할당할 값을 지정하면 출력값이 정의된다.

출력값은 `${{ steps.[ID].outputs.[KEY] }}`의 형태로 사용할 수 있다.

위 스크립트는 `VAR`라는 키에 `action output`이라는 값을 출력으로 할당했으며, 결과는 아래와 같다.

``` bash
action output
```

명령어를 여러개 사용하여 여러 출력값을 지정해줄 수도 있다.



### Actions에 지정한 출력값을 타 Jobs에서 사용하기

간혹, 여러 작업으로 나뉜 탓에, 현재 선언된 출력값을 다른 작업에서 참조해야할 일이 생길 수 있다.

이 경우, 불가능하진 않지만, 선언 방식을 조금 바꿔줘야한다.

``` yaml
name: actions output test
on: workflow_dispatch

jobs:
  var:
    runs-on: ubuntu-latest

    outputs:
      VAR: ${{ steps.key.outputs.VAR }}

    steps:
      - name: output test
        id: key
        run: echo "VAR=action output" >> $GITHUB_OUTPUT

  check:
    runs-on: ubuntu-latest
    needs: var

    steps:
      - name: output check in other job
        run: echo ${{ needs.var.outputs.VAR }}
```

아까와 반대로 작업에 출력값을 지정한 것을 볼 수 있다. 특이한 점은, 출력값에 액션의 출력값을 매핑했다는 것이다.

위와 같은 형태로, 작업에 출력값에 매핑시켜, 타 작업에서 이를 참조하도록 구성할 수 있다. 단, 참조 대상인 작업의 매핑이 완료됐다는 전제가 따른다. `check` 작업이 `var` 작업을 참조하고 있으므로, `needs` 키워드를 통해 `var` 작업이 종료된 이후에 실행하도록 흐름을 구성하고 있다.



### Actions에 환경변수 지정하기

워크플로에 환경변수를 지정했듯이, 액션에도 원하는 환경변수를 지정할 수 있다.

``` yaml
name: env test
on: workflow_dispatch

jobs:
  var:
    runs-on: ubuntu-latest

    steps:
      - id: key
        run: echo "VAR=action env" >> $GITHUB_ENV

      - run: echo ${{ env.VAR }}
```

액션 내에서 환경변수는 아래의 코드로 지정할 수 있다.

``` bash
echo "key=value" >> $GITHUB_ENV
```

위에서 언급한 출력값 지정 코드와 매우 유사하다. 마찬가지로 `echo "::set-env`로 시작하는 deprecated 코드가 존재한다.

환경변수는 `${{ env.[KEY] }}` 코드로 호출이 가능하며, 선언된 스코프 내에서만 사용이 가능하다. 워크플로 어디서든 활용 가능한 워크플로 환경변수와 달리, 작업 환경변수는 해당 작업 내에서만 활용이 가능하다.

> 만약 작업 내에서 선언한 환경변수를 다른 작업 내에서도 참조해야한다면, 그건 환경변수가 아닌 출력값으로 관리해야한다.

``` bash
action env
```

출력 결과는 위와 같다.



#### 환경변수 오버라이딩

[2장](/2023/10/26/github-actions-2)에서 워크플로에 환경변수를 지정할 수 있음을 알고 있다.

만약 작업 내에 동일한 키의 환경변수를 다시 선언하면 어떻게 될까?

``` yaml
name: env test
on: workflow_dispatch

env:
  VAR: workflow env

jobs:
  var:
    runs-on: ubuntu-latest

    steps:
      - id: key
        run: echo "VAR=action env" >> $GITHUB_ENV

      - run: echo ${{ env.VAR }}

  check:
    runs-on: ubuntu-latest

    steps:
      - run: echo ${{ env.VAR }}
```

위 코드의 경우 `var`와 `check`라는 작업이 선언되어 있으며, 하위 액션에서 각각 `VAR` 환경변수를 출력하고 있다.

단, `var`의 경우 액션 내부에서 `VAR` 환경변수를 재지정해주고 있다.

이렇게 하위 스코프에서 동일한 키에 환경변수가 할당된 경우, 하위 스코프에서 할당된 값으로 오버라이딩된다.

``` bash
# var
action env

# check
workflow env
```

따라 결과는 각각 위 처럼 나온다. `var` 작업 내에선 오버라이딩한 값을 출력하게 된다.



### 조건부 Actions 구성하기

조건부 액션을 통해, 특정 조건에서만 원하는 액션을 구동하거나 스킵할 수 있다.

``` yaml
name: conditional test
on: workflow_dispatch

jobs:
  job:
    runs-on: ubuntu-latest

    steps:
      - name: always run
        run: echo "always run"

      - name: run on condition
        if: ${{ github.event_name == 'push' }}
        run: echo "run at only push event"
```

액션에 `if` 지시어를 통해 `true` 혹은 `false`를 반환하여 조건을 지정할 수 있다. 위 코드는 GitHub Actions의 이벤트 이름을 호출하여 `push` 이벤트일 경우에만 추가 액션을 수행한다.

``` bash
# push 했을 경우
always run
run at only push event

# push가 아닐 경우
always run
```

작업 혹은 액션의 출력값을 활용하여 조건 분기를 활용하는 방식이 주로 사용된다.



### 작업에 타임아웃 지정하기

간혹, 워크플로의 특성에 따라 수 분 이상의 장시간 로드를 요구하는 워크플로가 있을 수 있다.

이 경우 타임아웃을 지정하여 동작 시간을 제한할 수 있다.

``` yaml
name: timeout test
on: workflow_dispatch

jobs:
  job:
    runs-on: ubuntu-latest
    timeout-minutes: 1

    steps:
      - name: half min test
        run: sleep 120
```

`timeout-minutes` 지시어를 통해 원하는 타임아웃 시간을 분 단위로 지정할 수 있다. 위 코드는 해당 작업의 동작 시간을 1분으로 제한하지만, `sleep` 명령어를 통해 2분의 대기시간을 지정했다.

``` bash
Error: The operation was canceled.
```

타임아웃에 초과될 경우, 위와 같은 에러가 발생한다.



### 다양한 Actions 사용하기

다른사람들이 만든 다양한 액션을 직접 사용할 수도 있다. 길고 복잡한 스크립트를 간편하게 압축하여 사용할 수 있다.

이미 정의된 액션의 경우 `use` 지시어를 통해 해당 액션의 이름을 입력하면 된다.

``` yaml
name: checkout test
on: workflow_dispatch

jobs:
  job:
    runs-on: ubuntu-latest
    timeout-minutes: 1

    steps:
      - uses: actions/checkout@v4
        with:
          repository: RWB0104/itcode.dev
          path: repo
      
      - run: ls -al
```

[actions/checkout@v4](https://github.com/actions/checkout) 액션은 사용자의 현재 레포지토리를 checkout하여 코드를 내려받는 스크립트로, 자주 사용하게 될 액션이다.

위와 같은 사용자 정의 액션은, 역할이나 목적에 따라 다양한 파라미터를 요구하기도 하는데, 이 경우 `with` 지시어로 `key: value` 형태의 파라미터를 지정할 수 있다. 당연히, 필요한 파라미터와 역할은 해당 액션 개발자가 문서로 제공해주니, 참고하여 지정하면 된다.

일례로, 위 코드의 경우, `RWB0104/itcode.dev`라는 레포지토리를 `repo/` 경로에 체크아웃하도록 별도의 옵션을 부여한다.



### ACtions에 캐시 사용하기

보통 GitHub Actions을 사용하는 가장 큰 이유는 CI/CD다. 십중팔구 빌드 관련 작업을 하게 되는데, 모든 컨테이너는 스크립트 동작 마다 각각의 작업 단위로 독립적이다. 따라서, 모든 작업이 항상 초기화 상태에서 이루어짐을 전제로 한다.

빌드 과정 중 디펜던시 및 라이브러리 설치는 많은 시간을 요구한다. 캐시를 적용하여 이 과정을 생략하여 빌드 시간을 대폭 개선할 수 있다.

[actions/cache@v4](https://github.com/actions/cache) 액션으로 원하는 폴더를 캐싱해보자.

프론트엔드에는 `node_module`라는 디펜던시 폴더가 존재한다. 해당 폴더를 캐싱하여, 디펜던시 설치 과정을 건너뛸 수 있다.

``` yaml
name: Caching Primes

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Cache Primes
      id: cache-primes
      uses: actions/cache@v4
      with:
        path: node_modules
        key: cache-${{ hashFiles('./package-lock.json') }}

    - name: Generate Prime Numbers
      if: steps.cache-primes.outputs.cache-hit != 'true'
      run: npm i

    - run: npm build
    
    - run: npm publish
```

위 코드의 액션은 아래와 같다.

1. 레포지토리를 체크아웃하여 코드를 컨테이너로 내려받는다.
2. `node_module/` 폴더를 캐싱한다. 캐싱 키는 `key`에 입력한 값이다.
   1. GitHub Actions은 해당 키로 데이터를 캐싱한다.
   2. `${{ hashFiles('./package-lock.json') }}`은 `package-lock.json`의 해싱값을 반환하는 표현식이다. 디펜던시 변경이 있을 때마다 해당 JSON이 바뀌므로, 캐시 키도 같이 바뀌게 된다. 이 과정에서 새로운 캐시가 필요함을 알려줄 수 있다.
3. `actions/cache@v4` 액션은 출력값으로 `cache-hit`를 반환하여 캐시 여부를 제공한다. 이를 조건문으로 활용하여 캐시되지 않았을 경우에만 디펜던시 설치를 수행한다.
4. 프로젝트를 빌드한다.
5. 프로젝트를 배포한다.

위와 같은 식이다. 액션과 출력값, 분기를 적절히 활용하여 CI/CD를 최적화시켰다. 한 번 데이터가 캐시된 이후 디펜던시의 변경이 없다면, 다음 빌드 땐 디펜던시 설치 과정을 건너 뛰고 캐시된 데이터를 바로 사용할 수 있다.

> 캐시 데이터는 레포지토리에서 [Actions 탭 - 사이드바의 Management 아이템 중 Caches 메뉴]에서 확인할 수 있다. 레포지토리별로 10GB를 제공하며, 용량을 초과할 경우, 가장 오래된 캐시를 제거하여 순차적으로 용량을 확보한다.





# 마치며

처음에 GitHub Actions나 CI/CD 서비스에 대한 개념이 아예 없었을 땐, 직접 로컬에서 빌드하고 배포하느라 흐름을 빈번히 끊었던 기억이 난다.

GitHub Actions을 이해하게 된 후, 많은 자잘한 요소를 자동화시켜 개발 요소를 줄일 수 있었다.

완벽한 글은 아니지만, 이 글을 통해 아직 GitHub Actions 이해하는데 도움이 되길 바란다.

<br />

이 글을 끝으로 GitHub Actions 시리즈를 정리한다. 호기롭게 시작했지만, 도중에 게시글 흐름이 끊기며 장시간 마무리하지 못 한 게시글이다.

쓰고 싶은 글들이 몇 개 생겼는데, 이를 시작하기 전에 시리즈를 끝낼 필요가 있어서, 이 장을 끝으로 시리즈를 끝마친다.