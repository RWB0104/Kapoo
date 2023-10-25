---
title: "[GitHub Actions] 삼가 수동배포의 명복을 GitHub Actions빔 - 2. GitHub Actions 이벤트 트리거링"
excerpt: "GitHub. Git 호스팅 관리 서비스의 대표주자라 할 수 있으며, 대부분의 개발자들이 사용하는 글로벌한 서비스다.
오픈소스 진영에서 시작한 GitHub는 2018년, MicroSoft에 인수되기까지한다.
이러한 GitHub의 성공에는 소스코드 저장소 관리 기능을 기반으로 다양한 서비를 제공했기 때문일 것이다. 그 중에서는 GitHub Actions이라는 기능도 있으며, 별다른 비용 없이 CI/CD 파이프라인을 구축할 수 있다."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/094a4fa5-f336-4c54-9df3-b5791d48de21"
date: 1698250814682
type: "posts"
category: "TypeScript"
tag: [ "GitHub", "GitHub Actions", "yaml", "crontab" ]
group: "삼가 수동배포의 명복을 GitHub Actions빔"
comment: true
publish: true
---

# GitHub Actions

GitHub. Git 호스팅 관리 서비스의 대표주자라 할 수 있으며, 대부분의 개발자들이 사용하는 글로벌한 서비스다.

오픈소스 진영에서 시작한 GitHub는 2018년, MicroSoft에 인수되기까지한다.

이러한 GitHub의 성공에는 소스코드 저장소 관리 기능을 기반으로 다양한 서비를 제공했기 때문일 것이다. 그 중에서는 GitHub Actions이라는 기능도 있으며, 별다른 비용 없이 CI/CD 파이프라인을 구축할 수 있다.

<br />

GitHub에서는 CI/CD를 위해 레포지토리마다 CI/CD 전용 서버를 제공한다. 이 서버는 AWS처럼 직접 들어가서 조작할 수 있는 건 아니고, 서버에서 할 작업을 스크립트로 기술해야한다. 이러한 작업을 기술하고 서버를 동작시켜 CI/CD 파이프라인을 구축하는 것이 GitHub Actions다.

우리가 쉽게 접할 수 있는 Linux와 같은 서버이므로, 일반적인 쉘 명령어부터 node 등, 서버에서 할 수 있는 대부분의 동작을 할 수 있다고 생각하면 된다.



## YAML 스크립트로 GitHub Actions 사용하기

GitHub의 CI/CD 서버는 YAML 스크립트에 의해 동작한다. 해당 스크립트는 `.github/workflows` 하위에 위치하며, 여러개의 스크립트를 넣을 수도 있다. `.github` 폴더는 프로젝트의 루트 경로에 위치한다.

``` yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

위 스크립트는 `main` 브랜치에 코드를 푸시할 경우, 프로젝트를 빌드하는 스크립트의 예시다.

위는 간단한 예시지만, 여러가지 트리거와 동작 명세를 통해 원하는 때 원하는 로직을 추가할 수 있다.



## 동작 트리거링

자주 사용하는 GitHub Actions의 이벤트를 알아보자. 원하는 때, 원하는 곳의 변경이 감지될 경우, 스크립트를 구동할 수 있다.

트리거링은 `on`을 사용하며, 해당 키워드의 하위로 원하는 이벤트를 기술한다.

트리거 종류는 GitHub Docs의 [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)에서 확인할 수 있다.



### 단일 이벤트 트리거링

간단한 단일 동작에 대한 이벤트 트리거링 방법은 아래와 같다.

``` yaml
# push할 경우 동작 시 이벤트 수행
on: push

## PR 동작 시 이벤트 수행
on: pull_request
```

위와 같이 대상 이벤트를 지정한다. 이를 통해 브랜치에 커밋이 푸시되거나, PR이 올라올 경우 등, 원하는 시점에 GitHub Actions를 구동할 수 있다.



### 다중 이벤트 트리거링

간단한 다중 동작에 대한 이벤트 트리거링 방법은 아래와 같다.

``` yaml
# push, PR 동작 시 이벤트 수행
on: [ push, pull_request ]
```

배열의 형태로 원하는 이벤트를 지정한다.



### 활동 타입 트리거링

일부 이벤트의 경우, `activity types` 옵션을 제공한다. 이벤트가 가질 수 있는 동작을 세분화하여, 특정 이벤트 중에서도 특정 활동에서만 GitHub Actions를 동작하고자 할 때 활용할 수 있다.

``` yaml
# PR 생성, 수정, 닫기가 수행될 경우 이벤트 수행
on:
  pull_request:
    types:
      - opened
      - edited
      - closed
```

예를 들자면, PR 이벤트인 `pull_request`의 경우 `opened (PR 생성)`, `edited (PR 수정)`, `closed (PR 닫기)` 등, 다양한 활동을 가질 수 있다.

이 중 PR 생성 등, 특정 활동에서만 GitHub Actions을 트리거링 할 수 있다. 만약, 이전의 예시처럼 `pull_request`에 별다른 활동을 지정하지 않을 경우, 모든 활동에 동작한다.

`pull_request`의 모든 `activity types`은 [GitHub Docs - Pull Request](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)를 확인하자.



### 이벤트 필터

이벤트에 필터를 적용하여 이벤트의 동작을 필터링할 수 있다. 필터의 종류엔 브랜치명, 태그명, 파일 등 다양한 항목을 적용할 수 있다.

필터는 다중 적용이 가능하며, glob 패턴을 사용할 수 있다. 이를테면 `release/**`은 `release/`로 시작하는 모든 브랜치명과 같은 형식이다.



#### 브랜치 필터

특정 브랜치에 필터링을 걸어 원하는 브랜치에서만 이벤트를 실행할 수 있다.



##### 브랜치 포함 필터

아래의 스크립트는 지정한 특정 브랜치만을 트리거 대상에 포함한다.

``` yaml
# 대상 브랜치에 push할 경우 이벤트 수행
on:
  push:
    branches:
      - main
      - features/231024
      - 'release/**'
```

이벤트 대상에 해당하는 브랜치는 아래와 같다.

- `main` 브랜치
- `features/231024` 브랜치
- `release/`로 시작하는 모든 브랜치
  - `release/development`
  - `release/test`
  - `release/development/231024`



##### 브랜치 제외 필터

아래의 스크립트는 지정한 특정 브랜치만을 트리거 대상에서 제외한다.

``` yaml
# 대상 브랜치가 아닌 브랜치에 push할 경우 이벤트 수행
on:
  push:
    branches-ignore:
      - test
      - 'feature/**-temp'

# glob pattern의 부정연산자인 !를 활용하여 표현할 수도 있다.
on:
  push:
    branches:
      - '!test'
      - '!feature/**-temp
```

이벤트 대상에서 제외되는 브랜치는 아래와 같다.

- `test` 브랜치
- `feature/`로 시작하고 `-temp`로 끝나는 모든 브랜치
  - `feature/alpha-test-temp`
  - `feature/textarea-temp`
  - `feature/java/code-temp`

> 문자열 앞에 `!`가 붙으면 glob pattern에서 부정(NOT)을 의미한다.



##### 브랜치 혼합 필터

아래와 같이 브랜치 포함/제외 필터를 혼합하여 사용할 수 있다.

``` yaml
# 아래 조건에 맞는 브랜치일 경우
on:
  push:
    branches:
      - 'release/**'
      - '!release/**-test'

# 위의 필터는 아래와 동일하다.
on:
  push:
    branches:
      - 'release/**'
    branches-ignore:
      - 'release/**-test'
```

이벤트 대상에 해당하는 브랜치는 아래와 같다.

- `release/`로 시작하며, `-test`로 끝나지 않는 모든 브랜치

위의 두 스크립트와 같이, glob pattern의 `!`를 활용하여 한 번에 표기하거나, `branches`, `branches-ignore`를 혼합하여 사용하는 것 모두 활용 가능하다. 둘 중 더 편한걸로 취사선택하여 사용하면 된다.



#### 태그 필터

GitHub에선 태그를 생성하여 형상관리가 가능하다. 브랜치 뿐만 아니라, 태그에 필터를 적용하여 이벤트를 실행할 수도 있다.

태그 필터는 `tags`, `tags-ignore`를 활용하며, 브랜치 필터와 매우 유사하다.



##### 태그 포함 필터

아래의 스크립트는 지정한 특정 태그만 트리거 대상에 포함한다.

``` yaml
# 대상 태그에 push할 경우 이벤트 수행
on:
  push:
    tags:
      - v1.0.2
      - 'v2*'
```

이벤트 대상에 해당하는 태그는 아래와 같다.

- `v1.0.2` 태그
- `v2`로 시작하는 태그
  - `v2.1.0`
  - `v2.3.1-alpha`



##### 태그 제외 필터

아래의 스크립트는 지정한 특정 태그만을 트리거 대상에서 제외한다.

``` yaml
# 대상 태그가 아닌 태그에 push할 경우 이벤트 수행
on:
  push:
    tags-ignore:
      - v1.0.0
      - 'v0*'
      - 'v**-alpha'

# glob pattern의 부정연산자인 !를 활용하여 표현할 수도 있다.
on:
  push:
    tags:
      - '!v1.0.0'
      - '!v0*'
      - '!v**-alpha'
```

이벤트 대상에서 제외되는 브랜치는 아래와 같다.

- `v1.0.0` 태그
- `v0`으로 시작하는 모든 태그
  - `v2.1.0`
  - `v2.3.1-alpha`
- `v`로 시작하고 `-alpha`로 끝나는 모든 태그
  - `v3.0.1-alpha`
  - `v1.0.5-a460b53c-alpha`



##### 태그 혼합 필터

아래의 스크립트는 지정한 특정 태그만을 트리거 대상에서 제외한다.

``` yaml
# 아래 조건에 맞는 태그일 경우
on:
  push:
    tags:
      - 'v*'
      - '!v**-test'

# 위의 필터는 아래와 동일하다.
on:
  push:
    tags:
      - 'v*'
    tags-ignore:
      - 'v**-test'
```

이벤트 대상에 해당하는 태그는 아래와 같다.

- `v`로 시작하는 모든 태그
- `v`로 시작하면서, `-test`로 끝나지 않는 모든 태그



#### 경로 필터

Git의 브랜치나 태그 뿐만 아니라, 소스코드의 경로의 파일 추가, 삭제. 특정 파일의 변경을 감지하고 이벤트를 수행할 수 있다.

브랜치나 태그 필터와 유사하게 `paths`, `paths-ignore` 키워드를 사용한다.



##### 경로 포함 필터

아래의 스크립트는 지정한 특정 경로만 트리거 대상에 포함한다.

``` yaml
# 대상 경로에 push할 경우
on:
  push:
    paths:
      - version.json
      - '**.tsx'
      - 'build/docs/**'
```

이벤트 대상에 해당하는 경로는 아래와 같다.

- `version.json` 파일
- 모든 `tsx` 파일
  - `src/apps/App.tsx`
  - `src/components/Header.tsx`
  - `template.tsx`
- `build/docs` 폴더 하위의 모든 폴더/파일
  - `build/docs/index.html`
  - `build/docs/images/favicon.ico`
  - `build/docs/css/index.css`



##### 경로 제외 필터

아래의 스크립트는 지정한 특정 경로만을 트리거 대상에서 제외한다.

``` yaml
# 대상 경로가 아닌 경로에 push할 경우 이벤트 수행
on:
  push:
    paths-ignore:
      - hash.txt
      - 'test/**'
      - '**.md'

# glob pattern의 부정연산자인 !를 활용하여 표현할 수도 있다.
on:
  push:
    paths:
      - '!hash.txt'
      - '!test/**'
      - '!**.md'
```

이벤트 대상에서 제외되는 경로는 아래와 같다.

- `hash.txt` 파일
- `test` 폴더 아래의 모든 폴더/파일
  - `test/index.json`
  - `test/api-test.java`
  - `test/assets/thumb.png`
- 모든 `md` 파일
  - `README.md`
  - `src/code/index.md`



##### 경로 혼합 필터

아래의 스크립트는 지정한 특정 경로만을 트리거 대상에서 제외한다.

``` yaml
# 아래 조건에 맞는 경로일 경우
on:
  push:
    paths:
      - 'src/**'
      - '!src/generated/**'

# 위의 필터는 아래와 동일하다.
on:
  push:
    paths:
      - 'src/**'
    paths-ignore:
      - 'src/generated/**'
```

이벤트 대상에 해당하는 태그는 아래와 같다.

- `src` 폴더 하위 중 `src/generated` 하위에 있지 않은 모든 폴더/파일



### 일정 필터 (crontab)

위에서 언급한 필터들은 모두 특정 요소에 특정 동작이 발생할 경우에만 이벤트가 발생한다. 사용자가 레포지토리에 무언가를 할 때만 동작하는 수동적인 구조다.

다행히, GitHub Actions에선 crontab을 활용하여 레포지토리의 변경이 없어도 지정한 일정마다 이벤트를 실행할 수 있다.

``` yaml
on:
  schedule:
    # 매주 월요일 ~ 금요일 0시 0분에 이벤트 실행
    - cron: '0 0 * * 1-5'
```

`cron` 키워드를 사용한다. 위 일정은 월요일(1) 부터 금요일(5)까지 매 0시 0분마다 이벤트를 수행한다.



#### crontab 활용방법

크론탭의 간략할 설정 방법은 아래와 같다.

``` txt
*         *          *         *         *
분(0-59)  시간(0-23)  일(1-31)  월(1-12)  요일(0-7)
```

다른건 직관적이나, 요일이 조금 모호한데, 아래와 같다.

|  요일  | 숫자  |
| :----: | :---: |
| 일요일 |   0   |
| 월요일 |   1   |
| 화요일 |   2   |
| 수요일 |   3   |
| 목요일 |   4   |
| 금요일 |   5   |
| 토요일 |   6   |
| 일요일 |   7   |

또한 쉼표(`,`)와 대쉬(`-`), 슬래시(`/`)를 사용할 수 있으며, 예시를 들자면 아래와 같다.

``` bash
# 매일 0시, 6시, 12시 18시 0분에 이벤트 수행
0 0,6,12,18 * * *

# 월요일 ~ 금요일 매시 0분에 이벤트 수행
0 * * * 1-5

# 매일 3시간마다 이벤트 수행
0 */3 * * *

# 3월 6월 9월 12월일 경우, 매주 월요일 ~ 금요일 매 3시간마다 이벤트 수행
0 */3 * 3,6,9,12 1-5
```

각 내용과 연산자를 조합하여 복잡한 일정을 지정할 수도 있다.

위 내용을 토대로 크론탭을 작성하면 된다. 본 문서는 크론탭에 대한 주제가 아니므로, 이 정도로 마무리한다.



### workflow_dispatch를 통한 수동 이벤트 수행

지금까지 여러 이벤트 필터에 대해 살펴봤다. 하나같이 특정 요소에 무언가 작업을 해야하거나, 특정 시간까지 기다려야만 한다. 즉, 당신이 원할 때 이벤트를 실행하고 싶다면 무의미한 커밋이라도 하나 올려야한다는 셈이다.

만약 Git History에 민감한 환경이나 사람이라면 상당이 난감한 셈.

다행히도, GitHub Actions에선 `workflow_dispatch`라는 키워드를 통해, 사용자가 직접 원할 때 수동으로 실행할 수 있도록 구성이 가능하다. 심지어, `input`이나 `select`를 지정하여 원하는 값을 직접 입력할 수도 있다!



#### 기본 형태

가장 간단한 형태는 아래와 같다.

``` yaml
on:
  workflow_dispatch:
```

레포지토리의 Actions 탭에서 `Run workflow` 버튼을 통해 구동이 가능하다.

![구동 방법](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/9e1d2fd0-395f-4ad5-9bba-5ce7c7020c68)

1. 레포지토리의 Actions 탭에 들어간다.
2. 좌측 사이드바에서 대상 스크립트를 클릭한다.
3. `Run workflow`를 클릭하고, 구동하기 원하는 브랜치를 선택 후 구동한다.
  1. `input`, `select` 설정을 하면 해당 탭에 추가된다.



#### 심화 형태

앞서 언급했듯이, 원하는 값을 입력받아 스크립트에서 활용할 수 있다. 이 항목들은 `required` 설정도 가능하여, 구동 시 필수값을 입력받도록 구성할 수도 있다.

`inputs` 키워드를 활용하며, 각 컴포넌트의 변수명을 지정한뒤, 옵션을 설정하면 된다. 스크립트에서 활용 시, 해당 변수명을 통해 호출이 가능하다.



##### choice 타입

`select` 형태의 입력을 받을 수 있다. 지정된 값 중 하나를 선택할 수 있다.

``` yaml
workflow_dispatch:
  inputs:
    choice_component:
      description: '지정값 선택'
      required: true
      default: 'level1'
      type: choice
      options:
        - level1
        - level2
        - level3
```

위 컴포넌트의 이름은 `choice_component`다.

|    태그     | 내용                  |
| :---------: | :-------------------- |
| description | 컴포넌트 타이틀       |
|  required   | 필수 여부             |
|   default   | 기본값                |
|    type     | 컴포넌트 타입         |
|   options   | 배열 형태의 선택 옵션 |



##### boolean 타입

`checkbox` 형태의 입력을 받을 수 있다. 값을 선택하여 `true` 혹은 `false` 형태의 값을 입력할 수 있다.

``` yaml
workflow_dispatch:
  inputs:
    check_component:
      description: 'True or False'
      required: true
      default: true
      type: boolean
```

위 컴포넌트의 이름은 `check_component`다.

|    태그     | 내용            |
| :---------: | :-------------- |
| description | 컴포넌트 타이틀 |
|  required   | 필수 여부       |
|   default   | 기본값          |
|    type     | 컴포넌트 타입   |



##### string, number 타입

`input` 형태의 입력을 받을 수 있다. `string`과 `number` 모두 임의의 값을 직접 입력하는 형태다.

의도된 사항인지 모르겠으나, `number` 타입을 지정해도 문자열 입력이 가능하며, 스크립트에서도 정상적으로 문자열이 표현된다. 별다른 차이가 없다고 봐도 무방.

이 문서에선 `string`을 예시로 든다, `number` 타입도 동일하게 사용 가능하다.

``` yaml
workflow_dispatch:
  inputs:
    text_component:
      description: '여기에 값 입력'
      required: true
      default: ''
      type: string
```

위 컴포넌트의 이름은 `text_component`다.

|    태그     | 내용            |
| :---------: | :-------------- |
| description | 컴포넌트 타이틀 |
|  required   | 필수 여부       |
|   default   | 기본값          |
|    type     | 컴포넌트 타입   |



##### 컴포넌트 변수 호출

아직 다루지 않았지만, 실제 워크플로에서 입력한 값을 아래와 같이 호출하여 사용할 수 있다.

``` yaml
- name: Run a multi-line script
  run: |
    echo ${{ inputs.choice_component }}
    echo ${{ inputs.check_component }}
    echo ${{ inputs.text_component }}
```

``` bash
level1
true
text
```

스크립트 상에서 `${{ inputs.변수명 }}`으로 호출 가능하다.



## 마치며

원래 스크립트 전체를 아우르는 사용법에 대해 다루려 했으나, 생각보다 이벤트 및 필터의 분량이 많아진 탓에 이 부분만 설명하고 넘어가기로 했다.

분량이 점점 많아지면서, 어찌나 귀찮던지...

다음 장에선 실제 구동되는 워크플로에 대한 기초적인 구성 방법에 대해 다룬다.

대부분의 내용은 GitHub 공식문서의 내용을 토대로 작성한 것으로, 자세한 내용은 아래의 두 링크를 참조하자.

[이벤트 트리거링 문서](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

[워크플로 문법 문서](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)