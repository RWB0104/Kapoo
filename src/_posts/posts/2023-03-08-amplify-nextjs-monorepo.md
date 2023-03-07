---
title: "미정"
excerpt: "React와 상태관리는 떼놓을 수 없는 존재다. 좀 더 효율적이고 스마트한 상태관리를 위한 많은 시도가 있어왔는데, recoil도 그 중 하나다. recoil은 선발주자인 Redux, mobx와 달리 간편하면서도 강력한 기능 덕분에 많은 사랑을 받는 라이브러리다. 나 또한 React 개발 시 애용하기도 하고."
coverImage: "https://user-images.githubusercontent.com/50317129/216662084-69f29d33-1956-42a1-90d6-80d311949d10.png"
date: "2023-02-04T01:56:31+09:00"
type: "posts"
category: "React"
tag: [ "React", "Web", "recoil" ]
comment: true
publish: false
---

# 개요

사내 업무 중에 CI/CD 관련 이슈를 맡았다. 사내 프로젝트가 Next.js 기반에 Monorepo가 적용되어 있는데, 이를 AWS Amplify로 배포할 수 있도록 파이프라인을 구축하는 것이 목표다.

하지만 DevOps 쪽은 많이 약한지라, 거의 두 달 가까이 이슈 처리를 끌었는데, 최근에 이 지긋지긋한 이슈를 해결했다. AWS Amplify의 배포 특성과 Next.js, Monorepo가 서로 엮여 대환장파티를 이루는데다, 관련 지식이 약하니 트러블슈팅이 안 돼 애를 먹었었다.

관련 자료를 찾아봐도 외국 자료가 대부분일 뿐더러, 적어도 내가 찾은 자료 중엔 왜 이런 현상이 발생하는지 정확히 설명해주는 자료가 없었다.

혹시라도 나와 같은 문제를 겪는 불쌍한 영혼들을 위해, 이 문제를 어떻게 해결했는지 기술하고자 한다.

<br />

조건은 아래와 같다.

``` txt
├──app
│ ├──repo1
│ ├──repo2
│ ├──common
└──package.json
```

- Monorepo 구조가 적용됨
- 폴더의 대략적인 구조는 위와 같음
  - `repo1`, `repo2`는 Next.js 프로젝트
  - `common`은 공통 유틸 프로젝트
- `repo1` 프로젝트를 AWS Amplify로 배포하는 것이 목표

# AWS Amplify 적용하기

