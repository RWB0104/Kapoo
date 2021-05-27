---
title: "URI? URL? URN? 리소스 식별자 구분하기"
excerpt: ""
coverImage: "https://media.vlpt.us/images/hanblueblue/post/0261303c-2557-4673-9d91-24b08c6dde16/Tomcat-logo.png"
date: "2021-05-27T15:52:51"
type: "posts"
category: "WEB"
tag: [ "WEB(웹)", "URI", "URL", "URN" ]
comment: true
publish: true
---

## Table of Contents

# URL! URI... URN??

우리가 인터넷 상에서 **특정한 데이터**에 접근할 때 <span class="primary">URL</span>이라는 것을 활용하여 접근한다.  
원하는 자료의 <span class="primary">URL</span>을 얻으면, 브라우저 같은 HTTP 통신 프로그램에 해당 <span class="primary">URL</span>을 호출하여 응답을 얻는 것이다.

개발자나, 굳이 개발자가 아니더라도 관련 정보를 찾다보면 심심치않게 <span class="primary">URI</span>라는 용어를 접하게 된다.  
I와 L의 오묘한 유사성 때문에 아예 <span class="primary">URI</span>를 <span class="primary">URL</span>로 오독하는가 하면, 오타라고 생각하는 사람도 더러 있을 것이다.  
하지만 <span class="primary">URL</span>과 <span class="primary">URI</span>는 그 의미가 비슷하면서도 살짝 다르다.

누구나 알고있는 <span class="primary">URL</span>과 아리까리한 <span class="primary">URI</span>, 생소한 <span class="primary">URN</span>. 이들에 대해 알아보자

# UR* 톱아보기

<span class="primary">URI</span>, <span class="primary">URL</span>, <span class="primary">URN</span>은 구조상 서로 연관이 있다.

## URI(Uniform Resource Identifier, 통합 자원 식별자)

<span class="primary">URI</span>는 우리말로 **통합 자원 식별자**라고 한다. <span class="primary">URI</span>는 앞서 말한 <span class="primary">URL</span>, <span class="primary">URN</span>을 포함하는 상위 개념으로, <span class="orange-400">인터넷 상에 존재하는 **자원을 구분**하는 식별자</span>라 할 수 있다. 웹 상에서 자원을 식별하는 모든 수단이 곧 <span class="primary">URI</span>이라 할 수 있다.

## URL(Uniform Resource Locater, 통합 자원 지시자)

<span class="primary">URL</span>은 굳이 우리말로 하자면 **통합 자원 지시자**라고 할 수 있겠지만, 흔히 인터넷 상에서 **주소**라 함은 99% 이 <span class="primary">URL</span>을 의미한다.  
<span class="primary">URL</span>은 **Locater**라는 키워드에 걸맞게 <span class="orange-400">인터넷 상에 존재하는 자원의 **위치**를 나타내는 식별자</span>라 할 수 있다. 여기서 **위치**라는 키워드에 주목하자. <span class="primary">URL</span>은 자원의 위치정보를 가지므로, 어떠한 이유로든 자원의 위치가 변경되면 <span class="primary">URL</span>은 자원을 찾을 수 없으며, 변경된 위치를 추적할 수도 없다. 이 때 맞이하게 되는 HTTP 오류가 누구나 알고있는 404 Not Found다.

## URN(Uniform Resource Name, 통합 자원 이름)

<span class="primary">URN</span>은 **통합 자원 이름**이다. 위 두 용어에 비해 생소하게 생각하는 분들도 많을 것이다. 그도 그럴 것이, <span class="primary">URN</span>은 위 두 개념보다 훨씬 뒤에 나온 개념이기 때문이다.  
눈치가 빠른 분들은 아시겠지만, <span class="primary">URN</span>은 <span class="orange-400">인터넷 상에 존재하는 자원의 **이름**을 나타내는 식별자</span>다.  
<span class="primary">URN</span>이 나오게 된 계기는 <span class="primary">URL</span>의 