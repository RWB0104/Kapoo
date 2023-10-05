---
title: "[GitHub Actions] 삼가 수동배포의 명복을 GitHub Actions빔 - 1. CI/CD"
excerpt: "하나의 프로그램이 나오기 위해선 여러 과정을 거친다. 프로그램의 규모에 따라 더 많은 인력, 더 많은 과정과 일정이 동반된다.
하지만 그 어떤 프로그램이라도 결과는 빌드와 배포 하나로 귀속된다. 한낮 텍스트들과 에셋들이 빌드를 거쳐 하나의 프로그램으로 완성되고, 배포를 통해 사람들에게 쓰여진다. 모든 프로그램의 목표인 셈이다. 그에 걸맞게 빌드와 배포에 대한 중요성 역시 매우 크다.
그에 맞게 빌드/배포는 마냥 쉬운 일이 아니다. 프로그램의 규모가 커질수록, 시간은 그 이상으로 걸리게 된다."
coverImage: "https://github.com/RWB0104/blog.itcode.dev/assets/50317129/094a4fa5-f336-4c54-9df3-b5791d48de21"
date: "2023-09-28T03:54:54"
type: "posts"
category: "TypeScript"
tag: [ "GitHub", "GitHub Actions", "CI", "CD", "지속적 통합", "지속적 제공", "지속적 배포" ]
group: "삼가 수동배포의 명복을 GitHub Actions빔"
comment: true
publish: true
---

![null](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/094a4fa5-f336-4c54-9df3-b5791d48de21)

# 삼가 수동배포의 명복을 GitHub Actions빔

하나의 프로그램이 나오기 위해선 여러 과정을 거친다. 프로그램의 규모에 따라 더 많은 인력, 더 많은 과정과 일정이 동반된다.

하지만 그 어떤 프로그램이라도 결과는 빌드와 배포 하나로 귀속된다. 한낮 텍스트들과 에셋들이 빌드를 거쳐 하나의 프로그램으로 완성되고, 배포를 통해 사람들에게 쓰여진다. 모든 프로그램의 목표인 셈이다. 그에 걸맞게 빌드와 배포에 대한 중요성 역시 매우 크다.

그에 맞게 빌드/배포는 마냥 쉬운 일이 아니다. 프로그램의 규모가 커질수록, 시간은 그 이상으로 걸리게 된다.

<br />

분명 누군가는 생각한다. "이렇게 귀찮은 일, 누가 대신할 수 없나?" 난 순수히 개발만 하고싶은데, 이런건 사람 좀 쓰지...

![흔한 개발자의 푸념](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/e7926bbe-44a6-4c79-87c8-3bc21a93e632)

이렇게 생각하는 당신에게 좋은 소식과 나쁜 소식이 있다.

좋은 소식은, 회사에서도 당신의 생각에 적극 공감하여 사람을 쓰기로 했다.

나쁜 소식은, 그 사람이 바로 당신이라는 것이다.



## CI/CD

![자동화...?](https://github.com/RWB0104/blog.itcode.dev/assets/50317129/95b26ac1-47c6-4b11-950e-eef65a420eb0)

사실 생각해보면, 일반적인 상황에서 빌드나 배포가 진행되는 동안 개발자가 붙어서 실시간으로 뭔가 해줄건 많지 않다. 모든게 컴퓨터 상에서 이뤄지는 특성 상, 자동화하기 굉장히 편하다는 의미다.

이러한 빌드/배포의 자동화 개념을 <span class="blue-400">CI/CD</span>라 한다. 각각 빌드와 배포에 대한 의미를 갖는다.



### 지속적 통합, CI(Continuous Integration)

CI를 한 문장으로 표현하자면, <span class="red-400">프로그램의 코드 변경사항이 감지될 경우, 이를 자동으 빌드/테스트하고 통합하는 것</span>을 말한다.

지속적 통합 파이프라인을 구축하면, 아래와 같은 이점이 있다.

- 다수의 개발자가 같은 서비스를 개발할 때 발생할 수 있는 코드의 충돌을 방지
- 어떤 환경에서도 동일한 개발환경의 기틀을 제공
- 코드의 안정성 확보를 위한 공통 통합 파이프라인 적용 용이

흔히 접하게 되는 Git이나 SVN을 써봤다면 CI에 대한 경험이 있는 것이다.



### 지속적 제공, CD(Continuous Delivery)

CD는 특이하게 두 가지 의미를 갖는다. 그 중 하나가 해당 문단의 주제인 지속적 제공이다.

지속적 제공을 한 문장으로 표현하자면, <span class="red-400">CI 파이프라인을 통과하여 검증된 코드를 레포지포리로 릴리즈하는 것</span>을 말한다.

지속적 제공이 그 의미를 십분 발휘하기 위해선 CI 파이프라인이 사전에 구축되어 있어야한다. CI 파이프라인에서 미흡하거나, 코드 검증 수준이 낮을 경우, 배포될 코드의 품질 저하로 이어질 확률이 높다.

지속적 제공 파이프라인을 구축하면 아래와 같은 이점이 있다.

- 배포 대상 코드의 안정성 강화
- 리포지토리 릴리스 비용 단축

> 여기서 말하는 릴리즈 비용은 금액이 아닌, 해당 작업으로 인해 발생하는 인건비, 일정 등과 같은 유/무형의 공수를 의미함.



### 지속적 배포, CD(Continuous Deployment)

또 다른 CD로는 지속적 배포가 있다. 지속적 배포란, <span class="red-400">릴리즈 대상 코드를 자동으로 릴리즈하여 하나의 프로덕션을 만드는 것</span>을 말한다. 즉, 실제 프로그램을 만드는 것이다.

개발을 하는 것과, 이를 프로그램으로 배포하는 것은 전혀 다른 얘기다. 개발 과정에서 잘못된 부분은 필요한 시점에 적절히 수정하면 되지만, 배포된 프로그램의 잘못된 부분은 수정이 어렵거나, 불가능하기 때문이다.

배포된 프로그램에서 발생하는 버그 및 미흡한 마감은 프로그램, 더 나아가 프로그램의 개발 주체의 신뢰성을 해치는 요인이 될 수 있다. 즉, 이전 단계의 CI/CD(제공) 파이프라인의 신뢰성이 매우 중요하다.

지속적 배포 파이프라인은 아래와 같은 이점이 있다.

- 신속하고 간편한 프로덕션 배포
- 개발자의 불필요한 공수 절약

신뢰할 수 있는 CI/CD 파이프라인이 구축되면 고품질의 프로그램을 빠르고 쉽게 배포하는 것도 무리가 아니게 된다.

빌드 및 배포로 인해 소요되는 시간, 컴퓨팅 자원은 CI/CD 서버에 이관하고, 개발자는 온전히 개발에 집중할 수 있으므로 개발 효율의 향상을 기대할 수 있을 것이다.



## 마치며

이 장에선 빌드 및 배포의 자동화 개념인 CI/CD에 대해 다뤘다.

자동화라는 개념 때문에 진입장벽이 있을 것 같지만, 사실 CI/CD 환경을 구축할 수 있는 서비스나 솔루션은 굉장히 다양하다. Jenkins나 GitHub, GitLat, Travis 등, 한 번씩은 들어봤을 것이다.

다음 장에선 위 서비스 중에서도 대표격인 GitHub, 그 중에서도 CI/CD 기능인 GitHub Actions에 대해 다뤄본다.