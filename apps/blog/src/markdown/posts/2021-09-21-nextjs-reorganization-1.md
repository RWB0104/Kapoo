---
title: "[NextJS] 블로그 개편기 - 1. Record One"
excerpt: "인터넷으로 알음알음 React를 배워, 뭣도 모르고 호기롭게 블로그를 개발한지가 5월이였다. 그 때만 해도 이 재밌는 걸 가지고 뭐라도 만들어보고 싶다는 강한 열망에 사로잡혔었는데, 그 때 눈에 보였던 게 개발 블로그였다. 그 때 내가 사용하던 블로그는 Jekyll 기반의 GitHub 블로그였는데, 재밌어보여서 시작했다가 며칠 안 가 관둔지가 1년이 넘었었다. 블로그에 흥미가 떨어진 이유 중 하나가 뭐 좀 할라치면 남이 작성한 코드를 일일히 분석한다는 스트레스였다. 개발 블로그를 보자마자 떠오른 내 머릿속의 흐름은 대충 저랬다."
coverImage: "https://user-images.githubusercontent.com/50317129/134931033-89954c3d-5e00-4b3b-85aa-54a1dfa29e46.png"
date: 1632162155000
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React" ]
group: "블로그 개편기"
comment: true
publish: true
---

# 개요

인터넷으로 알음알음 <span class="lightBlue-600">React</span>를 배워, 뭣도 모르고 호기롭게 블로그를 개발한지가 5월이였다. 그 때만 해도 이 재밌는 걸 가지고 뭐라도 만들어보고 싶다는 강한 열망에 사로잡혔었는데, 그 때 눈에 보였던 게 개발 블로그였다.

그 때 내가 사용하던 블로그는 <span class="pink-600">Jekyll</span> 기반의 GitHub 블로그였는데, 재밌어보여서 시작했다가 며칠 안 가 관둔지가 1년이 넘었었다. 블로그에 흥미가 떨어진 이유 중 하나가 뭐 좀 할라치면 남이 작성한 코드를 일일히 분석한다는 스트레스였다. 개발 블로그를 보자마자 떠오른 내 머릿속의 흐름은 대충 저랬다.

1. 나 빼고 다 하는 개발 블로그 나도 다시 해야하지 않나?
2. 저번에 테마 받아서 만들어둔거, 여기서기 수정해서 소스도 개판이라 다시 쳐다보기 싫은데....
3. 정적 블로그는 백엔드 롤도 없어서 간단하니 내 React 지식 정도로도 만들 수 있지 않을까?
4. 내 개발 블로그를 내가 직접 만들면 개발자로써의 보람도 있을 것 같은데..
5. 내가 만들었으니 꾸준히 관리할 수 있지 않을까? 어차피 다 내가 짠거잖아?

거기까지 생각이 미친 난 블로그 개발을 시작했고, 퇴근 후 틈틈히 만들다보니 기간은 한 두달? 정도 걸리지 않았나 싶다.

나름 머릿속에 구상한 디자인은 얼추 잘 나온 것 같았는데, 문제가 생겼다. <span class="red-600">블로그가 느려도 너무 느렸다.</span> HTML 레이아웃이 뜨고 난 뒤, CSS가 입혀 렌더링되기까지 과정이 눈에 보일 정도였다. 더군다나 정적임에도 불구하고 라우팅엔 뭐가 그리 시간이 필요한지...

참고 쓰다가, 이렇게 놔뒀다가는 <span class="blue-500">"내가 직접 개발했어요!"</span>라는 말이 <span class="blue-500">"내가 이렇게 실력이 병x신 같습니다 엌ㅋㅋㅋㅋㅋ"</span>이나 마찬가질거란 생각이 들었다. 더군다나 구글이나 네이버에 검색 등록도 해야하는데 이러면 전세계 사람들에게까지 광고하는 꼴이니 이대로는 안 됐다.

그렇게 난 첫 배포 두 달만에 대대적인 개편을 시작했다. 개편 과정에서 처음 접해보는 언어나 여러 시행착오가 있었기에, 혹시 나와 비슷한 문제로 고통받는 영혼들이 조금이나마 쉴 수 있도록 개발기를 작성한다.

<br />
<br />
<br />
<br />
<br />

<del class="grey-500">사실 추석이라 심심하다.</del>