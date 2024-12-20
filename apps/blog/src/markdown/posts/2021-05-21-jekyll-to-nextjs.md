---
title: "Jekyll에서 Next.js로"
excerpt: "Jekyll에서 Next.js로의 블로그 이동기"
coverImage: "https://user-images.githubusercontent.com/50317129/119211732-cf6de280-baee-11eb-8539-f2f5344fecb1.png"
date: 1621577373000
type: "posts"
category: "잡담"
tag: [ "React(리액트)", "Next.js", "개발 블로그", "Jekyll" ]
comment: true
publish: true
---

# Bye, Jekyll!

<div>
	<img src="https://user-images.githubusercontent.com/50317129/119211743-e44a7600-baee-11eb-85d0-f21c1f68debc.png" />
</div>

기존에 <a href="http://jekyllrb-ko.github.io/" target="_blank" class="pink-500">Jekyll</a>로 운영하던 블로그를 버리고 React 기반의 <span class="blue-500">Next.js</span>를 통해 블로그를 새로 개발했다.

Github Pages를 처음 접했을 때, 호스팅을 반드시 <span class="pink-500">Jekyll</span> 기반으로 해야한다고 착각하고있었다. 사실 조금만 생각해보면 상관 없던건데.

최근에 React를 접했는데, 생각보다 꽤나 매력적인 프레임워크라 소소하게나마 뭔가 만들어보고 싶었다.  
블로그가 적절한 프로젝트(?)가 될 것 같았다. 명색이 개발자인데 블로그 하나 정도는 직접 개발해야 할 것 같기도 하고....

# 굳이 멀쩡한 블로그 놔두고?

한동안 안 하긴 했지만, 지금까진 <span class="pink-500">Jekyll</span> 블로그를 운영하고 있었다. [Moon Theme](http://taylantatli.github.io/Moon/)를 적용해서 사용했었는데, 크고작은 불편함이 있었다.

<br />

1. <b class="green-500">Jekyll이라는 생소한 환경</b>

	Github의 개발언어는 <span class="red-500">Ruby</span>다. 그래서일까, Github Pages의 기본 배포는 <span class="red-500">Ruby</span> 기반 프레임워크인 <span class="pink-500">Jekyll</span>을 따라간다.  
	문제는 한국엔 <span class="pink-500">Jekyll</span>은 물론, <span class="red-500">Ruby</span>라는 언어 자체의 수요가 많지 않다. 단순 블로그 하나 운영하기 위해 생판 모르는 언어를 접해야 한다는 점은 무시할 수 없는 디메리트.

	물론 <span class="red-500">Ruby</span>를 직접적으로 개발하진 않지만 <span class="pink-500">Jekyll</span> 생태계 또한 그리 친숙한 형태는 아니였다.

2. <b class="green-500">타인이 개발한 소스의 이해</b>

	1번과 같은 문제로, 밑바닥부터 <span class="pink-500">Jekyll</span>을 개발할 수 없었다.  
	특정 기능에 대한 소요가 발생할 경우, 현재 테마에 어울리도록 "**잘 디자인**"하는 것이 중요하다. 하지만 사용자의 입장에서 테마 개발자의 디자인 철학을 이해하는 것은 단순 디자인과는 또 다른 문제. 구조 파악은 덤  
	더군다나 내 경우 모자란 실력에 이상한 강박증까지 있어서, 내 스타일로 작성되지 않은 코드의 리딩을 못 한다. 또한, 프로젝트의 블랙박스를 싫어한다. 실력은 없는 주제에 프로젝트 내에 내가 모르는 코드 덩어리가 있는 걸 굉장히 싫어한다. 디자인 감각이 좋지도 못 해서 결과물도 기존 테마와 이질적인 무언가가 나온다.

3. <b class="green-500">편리한 사용자 확장성, 불편한 개발자 확장성</b>

	블로그나, 웹 페이지, PPT 같은 환경에서 <span class="grenn-500">테마</span>를 사용하는 이유는 뭘까? 귀찮지만 중요한 디자인에 대한 투자를 과감히 패스하면서도 준수한 디자인 퍼포먼스를 내기 위함이다. 물론 취지는 좋다. 어디까지나 **단순히 해당 테마가 의도한 방향에 맞을 때만.**

	다들 비슷한 경험이 있었을 것이다. 테마 혹은 템플릿을 사용하면서 필요에 따라 커스터마이징이 필요할 경우가 그렇다.  
	대부분의 테마는 결과물이 테마가 추구하는 디자인 철학과 상통할 때 그 빛을 발한다. 다시 말해, 그 의도가 손상될 경우 결과물의 퀄리티는 급락한다.  
	이 뿐만 아니라, <span class="red-500">필요에 따라 기존의 요소(소스코드, 플러그인 등)을 제거할 경우 그 의존성을 파악하기 힘들어 리스크</span>가 크다.

	일례로, 위에서 언급한 <span class="lightBlue-500">Moon Theme</span>의 경우, JQuery에 의존성을 갖고 있다.  
	근래 웹 개발의 JQuery에 대한 비관적인 평을 생각한다면, 이는 큰 디메리트로 다가온다. 제거 작업으로 인한 공수 또한 무시할 수 없을 것이고.  
	물론 당시의 개발 트렌드를 무시할 수 없으며, **개발**은 그 중에서도 트렌드의 주기가 매우 빠른 편이다. 이로 미루어 볼 때, 결과론적인 얘기다. 그럼에도 불구하고, **사용자가 의도하지 않은 결함**이라는 사실은 불변하다.

4. <b class="green-500">개발 욕구</b>

	정적 블로그의 경우 백엔드 영역이 거의 전무한데다, 복잡한 비즈니스 로직도 필요 없기 때문에 개발 난이도가 상대적으로 낮다고 판단했다. 즉, 원한다면 내가 직접 개발한 블로그를 사용하는게 그리 어렵지 않다.  
	위에서 언급했듯이, 직접 개발한 블로그를 사용하는 것이 좀 더 개발자스럽다. 난이도 또한 공부 중인 React를 적용하기도 적합하고.

# Hello, Next.js!

React로 블로그를 만들 땐 주로 <a href="https://nextjs.org/" target="_blank" class="blue-500">Next.js</a> 혹은 <a href="https://www.gatsbyjs.com/" target="_blank" class="deepPurple-400">Gatsby.js</a>를 사용한다. 이번에 개발한 블로그는 <span class="blue-500">Next.js</span>를 활용했다.

<span class="blue-500">Next.js</span>는 <span class="red-500">Ruby</span>의 <span class="pink-500">Jekyll</span> 프레임워크와 그 결이 비슷하다. <span class="pink-500">Jekyll</span>는 **프레임워크 자체에 구조 스키마를 정함으로써 React의 Component와 유사하게 동작**한다. 그 당시의 난 React라는 걸 접하지도 않은 상황에서, React의 Component 방식으로 블로그를 구성했던 것이다. 말 그대로 낫 놓고 기역자도 모른 셈.

<span class="blue-500">Next.js</span> 역시 라이브러리 자체에 정적 웹을 구성하고 빌드할 수 있는 환경이 구축되어 있어, 쉽게 사용이 가능하다. 여러 사용자들이 개발한 다수의 플러그인은 덤.  
덕분에 정적 블로그를 밑바닥에서부터 개발할 수 있었다. 나름대로 디자인 한다고 하긴 했는데, 역시 디자인은 어렵다.  
<span class="blue-500">Next.js</span>와 <span class="deepPurple-500">Gatsby.js</span>에 대한 내용은 나중에 따로 다룰 예정이다.

아직 해야할 것들이 남아있다. sitemap 생성기도 붙여야 하고, 연관 게시물 기능도 필요하다. 아직 다듬어지지 않은 자잘한 요소들도 있고. 역시 규모에 상관없이 무언가를 퍼블리싱하는건 정말 힘든 것 같다.  
적어도 이번 블로그는 내 노력으로 내가 개발한 거니, 꾸준히 운영할 수 있었음 한다.