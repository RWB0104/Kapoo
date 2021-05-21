---
title: "Jekyll에서 Next.js로"
excerpt: "Jekyll에서 Next.js로의 블로그 이동기"
coverImage: "https://miro.medium.com/max/3840/1*0SQ-iEEbL9LcrFx_KbTroA.png"
date: "2021-05-21 15:09:33"
type: "posts"
category: "잡담"
tag: [ "React", "Next.js", "개발 블로그" ]
comment: true
publish: true
---

# Bye, Jekyll!

기존에 Jekyll로 운영하던 블로그를 버리고 React 기반의 Next.js를 통해 블로그를 새로 개발했다.

Github Pages를 처음 접했을 때, 호스팅을 반드시 Jekyll 기반으로 해야한다고 착각하고있었다. 사실 조금만 생각해보면 상관 없던건데.

최근에 React를 접했는데, 생각보다 꽤나 매력적인 프레임워크라 소소하게나마 뭔가 만들어보고 싶었다.  
블로그가 적절한 프로젝트(?)가 될 것 같았다. 명색이 개발자인데 블로그 하나 정도는 직접 개발해야 할 것 같기도 하고....

# 굳이 멀쩡한 블로그 놔두고?

한동안 안 하긴 했지만, 지금까진 Jekyll 블로그를 운영하고 있었다. [Moon Theme](http://taylantatli.github.io/Moon/)를 적용해서 사용했었는데, 사용하면서 크고작은 불편함이 있었다.

<br />

1. **Jekyll이라는 생소한 환경**

	Github의 개발언어는 Ruby다. 그래서일까, Github Pages의 기본 배포는 Ruby 기반 프레임워크인 Jekyll을 따라간다.  
	문제는 한국은 Jekyll은 물론, Ruby라는 언어 자체의 수요가 많지 않다. 단순 블로그 하나 운영하기 위해 생판 모르는 언어를 접해야 한다는 점은 무시할 수 없는 디메리트.

	물론 Ruby를 직접적으로 개발하진 않지만 Jekyll 생태계 또한 그리 친숙한 형태는 아니였다.

2. **타인이 개발한 소스의 이해**

	1번과 같은 문제로, 밑바닥부터 Jekyll을 개발할 수 없었다.