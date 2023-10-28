---
title: "[GitHub Actions] 삼가 수동배포의 명복을 GitHub Actions빔 - 2. GitHub Actions 알아보기"
excerpt: "우리는 이전 장에서 CI/CD가 무엇인지와, 이를 제공하는 대표적인 서비스 중 하나로 GitHub Actions이 있음을 확인했다.
그럼 GitHub Actions은 정확히 어떻게 CI/CD 서비스를 제공한다는걸까?
GitHub Actions에 대해 알아보자."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/094a4fa5-f336-4c54-9df3-b5791d48de21"
date: 1698250814682
type: "posts"
category: "GitHub"
tag: [ "GitHub", "GitHub Actions", "Workflows", "Events", "Jobs", "Runners", "Steps", "YAML" ]
group: "삼가 수동배포의 명복을 GitHub Actions빔"
comment: true
publish: true
---

# 개요

우리는 이전 장에서 CI/CD가 무엇인지와, 이를 제공하는 대표적인 서비스 중 하나로 GitHub Actions이 있음을 확인했다.

그럼 GitHub Actions은 정확히 어떻게 CI/CD 서비스를 제공한다는걸까?

GitHub Actions에 대해 알아보자.



## GitHub Actions이란?

GitHub Actions는 빌드나 테스트, 배포를 자동화하기 위한 파이프라인을 구축할 수 있는 CI/CD 서비스다.

다양한 OS의 가상머신을 제공한다. 일종의 CI/CD 전용 서버가 생기는 것이다. 사용자는 스크립트를 통해 원하는 동작을 구성할 수 있고, 그 동작은 해당 서버에서 수행하게 된다.

워크플로우가 수행되는 기준 또한 유연하게 지정할 수 있다. 이를테면, GitHub의 특정 브랜치에 push가 발생한다던가, 특정 시간에 맞춰 자동으로 동작을 수행하는 것이다.

이러한 방식으로 사용자는 CI/CD 파이프라인을 구축할 수 있다. 물론 서버긴 하지만, AWS나 Azure 같이 터미널에 직접 명령어를 치는 건 아니고, `yaml` 스크립트로 동작을 기술하는 방식이 정해져있다. 자세한 구조는 후술한다.



## GitHub Actions 구조

GitHub Actions는 일종의 서버고, 사용자는 이 서버를 스크립트 형태로 기술하여 동작을 지정할 수 있다.

GitHub Actions의 구조는 크게 `Workflows`, `Runners`, `Events`, `Jobs`, `Steps`, `Actions`로 나눌 수 있다. 각 요소에 대해 간략하게 알아보자.



### Workflows

워크플로우(Workflows)는 하나 이상의 작업을 실행할 프로세스로, GitHub Actions의 가장 최상위 단위다.

`yaml` 스크립트로 워크플로우를 작성할 수 있다. GitHub 레포지토리의 Actions 탭에서 원하는 템플릿을 선택할 수도 있다.

``` yaml
name: CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run a one-line script
        run: echo Hello, world!

      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

위 스크립트는 GitHub Actions에서 제공하는 `Simple workflow` 템플릿이다.

모든 워크플로우는 `.github/workflows` 경로 하위에 관리된다. 해당 경로에 `yaml` 스크립트를 두면 GitHub에서 인식하는 구조다.

`yaml` 스크립트 하나가 하나의 워크플로우라고 생각하면 된다.

어떻게 설정하냐에 따라 다른 워크플로우에서 재사용이 가능하도록 구성할 수도 있다.



### Events

이벤트(Events)는 워크플로우 실행을 트리거하는 요소다. 특정 브랜치에 push 작업이 수행되거나, PR이 올라올경우와 같이 GitHub 내에서 할 수 있는 여러 활동에 이벤트를 적용할 수 있다. 수동으로도 가능하다.

GitHub 내의 활동 뿐만 아니라, 특정 시간마다 이벤트를 적용할 수도 있다.

``` yaml
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:
```

위 코드는 전체 스크립트 중 이벤트 부분에 해당하는 코드다.

스크립트에서 `on` 키워드를 사용하여 이벤트를 표현할 수 있다.



### Jobs

작업(Jobs)은 하나의 러너에서 실행되는 `Steps`들의 집합이다. 할당된 모든 `Steps`이 실행되면 작업이 종료되는 셈이다.

작업은 기본적으로 병렬로 수행된다. 별도의 설정이 없으면 모든 작업이 동시에 수행된다.

빌드 -> 테스트 -> 배포와 각각 작업을 나누고 이를 순차적으로 수행할 필요가 있는 경우, 작업에 의존성을 추가하여 특정 작업이 완료될때만 수행하도록 구성할 수 있다.

이러한 구성을 활용하여, 주요 작업은 순차적으로 진행하고, 각 작업이 끝날 때마다 슬랙 알림을 보내는 병렬 작업을 추가하는 등 다양한 응용이 가능하다.

``` yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run a one-line script
        run: echo Hello, world!

      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

위 코드는 전체 스크립트 중 작업 부분에 해당하는 코드다.

`build`라는 이름의 작업 하나가 선언되어있는 것을 확인할 수 있다.



### Runners

러너(Runners)는 워크플로우를 실행하는 서버다. `yaml` 스크립트에서 원하는 OS를 지정할 수 있으며, GitHub에서는 Linux는 물론, Windows와 MacOS까지 선택할 수 있다.

후술할 `Jobs` 하나당 러너 하나가 할당된다. 물론 OS도 `Jobs`마다 지정할 수 있다.

``` yaml
runs-on: ubuntu-latest
```

위 코드는 전체 스크립트 중 러너에 해당하는 코드다.

각 작업 하위에 선언되며, `ubuntu-latest`라는 우분투 최신버전이 OS로 지정되어 있음을 확인할 수 있다.



### Steps

단계(Steps)는 작업에서 수행될 명령이다. 작업 하위에 하나 이상의 단계가 선언될 수 있다.

각 단계는 터미널 명령어나 스크립트를 수행할 수 있으며, 후술할 `Actions`을 실행할 수도 있다.

터미널 명령어 혹은 스크립트를 수행할 땐, `run` 키워드를 사용하며, `Actions`를 실행할 땐 `use` 키워드를 사용한다.

추가로 `name`이란 키워드를 사용할 수 있는데, 각 단계의 타이틀을 명시하여 각 작업에 부가설명을 더해줄수도 있다.

``` yaml
- name: Run a multi-line script
  run: |
    echo Add other actions to build,
    echo test, and deploy your project.
```

위 코드는 전체 스크립트 중 단계에 해당하는 코드다.

`echo`를 활용한 기본적인 터미널 명령어를 수행한다.

``` txt
Add other actions to build,
test, and deploy your project.
```

해당 단계의 결과는 위와 같다.

또한 각 단계는 성공 혹은 실패 중 하나의 결과를 가질 수 있으며, 분기를 통해 성공/실패인 경우에만 동작하도록 구성할 수도 있다.



## 마치며

이 장에서는 GitHub Actions에 대해 간략하게 다뤄봤다. 각 요소 중에는 비교적 간단한 요소들이 있는가 하면, 복잡한 요소들도 존재한다.

하나의 게시글에 각 요소의 주요 내용을 담기엔 너무 길어지기 때문에, 주요 요소를 나눠 각각의 게시글로 설명할 예정이다.

다음 장에서는 GitHub Actions 스크립트의 Events에 대해 다룬다.

<br />

사실 원래 이벤트가 2번 째고 이 글이 3번 째 게시글이였는데, 쓰다보니, GitHub Actions의 구조에 어떠한 언급도 없이 워크플로우니 이벤트니 하고 있다는 걸 깨달았다.

순서 상 전체적인 요소를 설명한 후, 각각의 세부 요소를 설명하는 것이 맞는 것 같아, 순서를 바꿨다.

어차피 읽은 사람도 많지 않고, 인용된 곳도 없을 것 같아서 별 문제는 없을거야...