---
title: "[GitHub Actions] 삼가 수동배포의 명복을 GitHub Actions빔 - 4. 일해라 GitHub Actions! Jobs(작업)"
excerpt: "워크플로우를 실행하는 방법에 대해서 다뤄봤으니, 이젠 워크플로우에게 작업을 시켜보는 방법에 대해 다룬다.
Jobs(작업)과 Steps(단계)에 대해 다루며, Runners(러너)도 잠깐이나마 언급된다."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/094a4fa5-f336-4c54-9df3-b5791d48de21"
date: 1699378487516
type: "posts"
category: "GitHub"
tag: [ "GitHub", "GitHub Actions", "Workflows", "Events", "Jobs", "Runners", "Steps", "YAML" ]
group: "삼가 수동배포의 명복을 GitHub Actions빔"
comment: true
publish: true
---

# 개요

워크플로우를 실행하는 방법에 대해서 다뤄봤으니, 이젠 워크플로우에게 작업을 시켜보는 방법에 대해 다룬다.

그 중 스크립트의 큰 단위인 Jobs(작업)에 대해 먼저 다루며, 필연적으로 작업 하위에 기술되어 동작하는 Runners(러너)도 잠깐이나마 언급된다.



## Jobs 사용하기

작업은 각 Steps의 집합이다. `jobs` 키워드를 통해 기술할 수 있으며, 고유의 이름을 가진다.

하나 이상의 작업을 생성할 수 있어서, 기능별로 작업을 따로 분리하여 활용할 수도 있다.

``` yaml
name: jobs test
on: workflow_dispatch
jobs:
  jobs_test1:
    runs-on: ubuntu-latest
    steps:
      - name: test steps
        run: echo Hello, jobs_test1

  jobs_test2:
    runs-on: ubuntu-latest
    steps:
      - name: test steps
        run: echo Hello, jobs_test2
```

위 스크립트의 워크플로우는 `jobs_test1`과 `jobs_test2` 두 가지 작업을 가진다. 이와 같이 작업의 이름을 원하는대로 지정해줄 수 있다.



### 작업의 순차적 수행

이전 글에서도 언급했듯이, **작업은 기본적으로 병렬로 실행**된다. 즉, `jobs_test1`과 `jobs_test2`이 동시에 실행된다는 뜻이다.

만약, 순차적으로 실행하고 싶다면 `needs` 키워드를 사용해야한다. `needs`에 작업을 지정하면, 해당 작업은 그 작업이 끝난 이후에 실행된다.

``` yaml
name: jobs test
on: workflow_dispatch
jobs:
  jobs_test1:
    runs-on: ubuntu-latest
    steps:
      - name: test steps
        run: echo Hello, jobs_test1

  jobs_test2:
    needs: jobs_test1
    runs-on: ubuntu-latest
    steps:
      - name: test steps
        run: echo Hello, jobs_test2
```

`jobs_test1` -> `jobs_test2` 순서로 수행하고 싶다면, `jobs_test2`의 `needs`에 `jobs_test1`을 지정하면 된다.

`jobs_test2`는 `jobs_test1`이 끝나기 이전까지 실행되지 않는다.



## Runners 사용하기

러너는 각 작업이 구동될 가상머신이다. 작업 하위에 기술되며, `runs-on`로 러너를 특정할 수 있다.

각각의 작업은 하나의 러너를 가진다.

``` yaml
name: runner test
on: workflow_dispatch
jobs:
  runner_test:
    runs-on: ubuntu-latest
    steps:
      - name: test steps
        run: echo Hello World
```

위 스크립트는 최신 우분투 OS에서 워크플로우가 실행된다. `ubuntu-latest`는 우분투 최신버전으로, 현재 기준 `22.04` 버전이 실행된다.

|OS|CPU|RAM|SSD|목록|
|------|---|---|---|---|
| Linux | 2 | 7GB | 14GB | `ubuntu-latest`, `ubuntu-22.04`, `ubuntu-20.04` |
| Windows | 2 | 7GB | 14GB | `windows-latest`, `windows-2022`, `windows-2019` |
| macOS | 3 | 14GB | 14GB | `macos-latest`, `macos-12`, `macos-11` |
| macOS (Beta) | 4 | 14GB | 14GB | `macos-13` |

`-latest`는 버전 목록의 가장 최신버전이 자동으로 선택된다.

단 macOS의 경우, 13은 아직 베타이므로, `macos-latest`는 `macos-12`가 지정된다.



### Self-Hosted Runners

GitHub에서 제공하는 러너 뿐만 아니라, 본인이 소유한 서버를 GitHub Actions Runners에 등록하여 CI/CD 서버로 사용할 수 있다. 이를 Self-Hosted Runners라 한다. GitHub에서 제공하는 서버가 아닌, 자신의 서버를 호스팅하여 사용하는 것이다.

자신의 서버를 직접 사용하는 것이니만큼, GitHub Actions 비용 정책에 영향을 받지 않는다. 또한, 자신의 서버가 위 표보다 높을 경우 성능적인 이점도 얻어갈 수 있다.

![Self-Hosting Runners 생성](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/240e219e-038e-4118-bf93-784f0f90fbf5)

원하는 레포지토리의 Setting 메뉴 -> 좌측 사이드바의 Actions -> 하위 트리의 Runners 메뉴에서 등록 가능하다.

자신의 서버에 맞는 OS를 선택하여 연결을 수행할 수 있다. 연결 방법은 해당 페이지에서 친절히 알려주니, 순서대로 따라하기만 하면 된다.

이후 위 사진의 목록에서 추가된 Runners를 확인할 수 있다. 다수의 Runners를 추가할 수도 있다.

당연하지만, 반드시 연결된 서버가 온라인 상태여야하며, 해당 페이지에서 서버의 상태 또한 확인할 수 있다.

``` yaml
name: runner test
on: workflow_dispatch
jobs:
  runner_test:
    runs-on: self-hosted
    steps:
      - name: test steps
        run: echo Hello World
```

위와 같이 `self-hosted` 키워드를 적용하여 지정할 수 있다.

해당 스크립트는 자신의 서버에서 수행하게 된다.

``` yaml
name: runner test
on: workflow_dispatch
jobs:
  runner_test:
    runs-on: [ self-hosted, linux, x64 ]
    steps:
      - name: test steps
        run: echo Hello World
```

방금 전에 잠깐 언급했는데, Runners는 여러개일 수 있다. 이 경우 배열을 통해 자신이 원하는 OS를 특정할 수 있다.

위 스크립트는 Self-Hosted Runners 중, OS가 Linux이고, 아키텍쳐가 x64인 OS를 선택하여 구동한다.

이러한 방식으로, 자신이 소유한 서버를 Github Actions과 연동하고 사용할 수 있다.



## 특정 조건에서만 작업 수행하기

작업에 조건문을 적용하여, 원하는 조건에서만 작업이 수행되도록 구성할 수 있다.

당연하게도, `if` 키워드를 사용하며, 방법은 아래와 같다.

``` yaml
name: if test
on: workflow_dispatch
jobs:
  if_test:
    runs-on: ubuntu-latest
    if: github.repository == 'RWB0104/github-acitons-test'
    steps:
      - name: test steps
        run: echo Hello World
```

위와 같이 `if` 키워드에 `true`가 할당될 경우에만 작업을 수행할 수 있다.



## Matrix 지정하기

`matrix`라는 개념이 처음으로 나온다. GitHub Actions에서는 `matrix`라는 일종의 행렬을 구성할 수 있으며, 이를 통해 여러 환경에 대한 반복적인 동작을 간편하게 구현할 수 있다.

예를 들어, 윈도우, 맥, 리눅스 환경에서의 코드 테스트를 각각 수행하는 스크립트를 구성할 수 있는 것이다.

``` yaml
name: matrix test
on: workflow_dispatch
jobs:
  matrix_test:
    strategy:
      matrix:
        os: [ ubuntu-latest, windows-latest, macos-latest ]
    runs-on: ${{ matrix.os }}
    steps:
      - name: test steps
        run: echo Hello World in ${{ matrix.os }}
```

위 스크립트는 간단한 예시다. 작업 하위에 `strategy` 키워드를 선언하고, 그 하위에 `matrix` 키워드를 통해 원하는 값을 배열로 입력한다.

위 예시에선 `os` 키를 가진 Runners의 집합이 입력되어 있다. 굳이 `os`가 아닌 원하는 키를 입력해도 무방하다.

따라서 `matrix`의 `os` 항목 갯수에 따라 `matrix_test` 작업은 3번 수행된다. `${{ matrix.on }}` 형태로 스크립트 내에서 변수처럼 활용할 수 있다.

`runs-on` 키워드에 변수를 할당함으로써, 각각의 OS에서 스크립트가 수행되도록 구성됨을 확인할 수 있다.

따라서, `test steps`의 결과는 아래와 같다.

``` bash
Hello World in ubuntu-latest
Hello World in windows-latest
Hello World in macos-latest
```

`matrix`는 하위에 여러 키를 추가할 수도 있다.

``` yaml
name: matrix test
on: workflow_dispatch
jobs:
  matrix_test:
    strategy:
      matrix:
        os: [ ubuntu-latest, windows-latest, macos-latest ]
        version: [ 16, 18 ]
    runs-on: ${{ matrix.os }}
    steps:
      - name: test steps
        run: echo Hello World in ${{ matrix.os }} ${{ matrix.version }}
```

위의 경우, `os`와 `version`의 항목이 모두 조합되는 경우의 수 만큼 동작하며, 총 동작 횟수는 6번이다.

``` bash
Hello World in ubuntu-latest 16
Hello World in ubuntu-latest 18
Hello World in windows-latest 16
Hello World in windows-latest 18
Hello World in macos-latest 16
Hello World in macos-latest 18
```

위와 같은 식이다.



## 작업에 출력값(output) 정의하기

지금까지만 보면, GitHub Actions의 작업은 작업을 수행할 뿐, 다른 작업에 영향을 미치지는 못하는 것 같아보인다. 마치 `void` 메서드와 비슷한 느낌이다.

하지만, 작업이 출력값을 반환함으로써, 작업에게 동작의 결과를 부여하고 이를 다른 작업에서 활용할 수 있도록 구성하는 것이 가능하다.

``` yaml
name: output test
on: workflow_dispatch
jobs:
  output_test:
    runs-on: ubuntu-latest
    outputs:
      result: output1
      call: output2
    steps:
      - name: test steps
        run: echo Hello World

  output_test2:
    needs: output_test
    runs-on: ubuntu-latest
    steps:
      - name: test steps
        run: |
          echo ${{ needs.output_test.outputs.result }}
          echo ${{ needs.output_test.outputs.call }}
```

선언한 작업 하위에 `outputs` 키워드를 사용하여 원하는 출력값을 정의할 수 있다.

이렇게 정의한 작업의 출력값은 다른 작업에서 사용할 수 있다. `output_test` 작업의 `result` 출력값을 호출하기 위해선 `needs.output_test.outputs.result`와 같이 호출할 수 있다.

``` bash
output1
output2
```

`output_test2`의 결과는 위와 같다. `output_test`의 출력값 `result`와 `call`이 정상적으로 찍히는 걸 확인할 수 있다.

이를 적절히 활용하면, `if` 키워드를 활용하여, 이전 작업의 결과에 따라 특정 작업을 추가로 실행하는 등의 영향을 줄 수 있다.

> 위 예시에선 출력값을 하드코딩했지만, `Steps`에서 명령어를 통해 작업의 `outputs`를 임의로 적용할 수 있다. 관련 내용은 다음 장에서 후술한다.



## 마치며

이번 장에서는 GitHub Actions의 큰 틀인 작업에 대해 다뤄봤다.

다음 장에서는 작업의 세부 동작을 기술하는 `Steps`에 대해 다뤄본다.

해당 문서의 자세한 내용은 [GitHub Actions Docs - Using Jobs](https://docs.github.com/en/actions/using-jobs)를 참조하자.