---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 1. 머릿말"
excerpt: "공간정보, 지리쪽에 업이 있거나 관심있는 사람이 아니라면, GIS라는 단어는 다소 생소한 단어다. 혹자는 GIS가 아니라 GPS 아니냐고 반문하기도 한다. GPS(Global Positioning System)는 3개 이상의 위성 신호를 통해 수신기의 위치를 계산할 수 있는 기법이다. GPS라 하면 흔히 네비게이션을 연상하기 쉽지만, 알게 모르게 GPS는 일상생활에 깊게 녹아들어 있다. 네비게이션, 스마트폰 지도, 배달 플랫폼의 라이더 위치 추적, 드론 군집비행, 군사학 등. GPS는 다양한 영역에 스며들어 그 이로움을 전해준다. 우리는 GPS를 통해, 공간정보라는 디지털 시대에서 공간을 디지털화한다는 것이 어떤 능력을 발휘하는 지 엿볼 수 있다. GIS(Global Information System)는 GPS와 같이 공간정보를 다루는 모든 기술에 대한 포괄적인 기술을 의미한다. GPS 뿐만 아니라, 지도, 좌표계와 같이 공간과 엮이는 모든 기술은 GIS라는 커다란 범주로 묶을 수 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1646316335000
type: "projects"
category: "GIS"
tag: [ "GIS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 개요

공간정보, 지리쪽에 업이 있거나 관심있는 사람이 아니라면, GIS라는 단어는 다소 생소한 단어다. 혹자는 GIS가 아니라 GPS 아니냐고 반문하기도 한다.

GPS(Global Positioning System)는 3개 이상의 위성 신호를 통해 수신기의 위치를 계산할 수 있는 기법이다. GPS라 하면 흔히 네비게이션을 연상하기 쉽지만, 알게 모르게 GPS는 일상생활에 깊게 녹아들어 있다. 네비게이션, 스마트폰 지도, 배달 플랫폼의 라이더 위치 추적, 드론 군집비행, 군사학 등. GPS는 다양한 영역에 스며들어 그 이로움을 전해준다. 우리는 GPS를 통해, 공간정보라는 디지털 시대에서 공간을 디지털화한다는 것이 어떤 능력을 발휘하는 지 엿볼 수 있다.

GIS(Global Information System)는 GPS와 같이 공간정보를 다루는 모든 기술에 대한 포괄적인 기술을 의미한다. GPS 뿐만 아니라, 지도, 좌표계와 같이 공간과 엮이는 모든 기술은 GIS라는 커다란 범주로 묶을 수 있다.

![null](https://user-images.githubusercontent.com/50317129/156580872-dfd08787-3416-4595-b224-a12156075ffb.png)

컴퓨터의 발전이래, 인류는 현실세계의 모든 것을 디지털화하고 있다. 이미 인류는 보고 듣는 모든 것들을 디지털화했다. 찰나의 순간, 기억을 저장한다는 욕구 이후로, 이젠 이러한 자료를 관리하고 제공하는 자들이 막대한 돈을 벌어들이고 있다.

![null](https://user-images.githubusercontent.com/50317129/156581103-fd79ade7-ab3e-424e-852c-8bfd3d4382b7.png)

시청각의 디지털화는 시청각을 마음대로 다룰 수 있다는 뜻이나 다름없다. 정적 데이터인 사진의 합성은 이젠 애들 장난 수준이다. 발전된 영상 편집 기술은 물론 논란의 중심인 딥 페이크 기술을 보고 있자면 인식의 개념을 부정당하는 느낌이 들기도 한다.

<br />
<p align="center" class="large grey-400"><i>고도로 발달한 기술은 마법과 구별할 수 없다.</i></p>
<br />

동영상, 사진이 시청각을 다룬다면, GIS는 현실에서의 공간을 디지털화하고, 이를 다룰 수 있는 매우 멋진 기술이다. 지금은 지도나 위치정보 같은 데이터류를 다루는 것이 일반적이지만, 현재 각광받고 있는 메타버스 기술, 가상현실과 같이 '공간'이 주가 되는 기술에서 GIS는 그 핵심이 될 것이다.

시청각 디지털이 시청각에 마법을 일으킨다면, GIS는 디지털 속 공간이라는 개념에 마법을 부릴 수 있다 하겠다.

<br />
<br />
<br />

...라고 말은 거창하게 적었지만 내가 무슨 GIS의 대가도 아니고, 그냥 GIS 살짝 담궈본 일개 프로그래머일 뿐이다.

이직한 회사에서 GIS에 대한 소요가 좀 있는 거 같길래, 이전 회사에서 배웠던 기술도 좀 되살려볼 겸, 토이 프로젝트 식으로 GIS 서비스를 만들며 관련 기술에 대해 기록해볼까 한다.

사실 한국에서의 GIS는 다른 기술에 비해 찬밥 신세를 면치 못 한다. 이런 원천기술류가 으레 그렇듯이, 깊게 들어가면 측량, 토목 쪽으로 빠져버리니 GIS라는 분야에 뜻을 가진 사람이 아니라면 깊게 들어가기도 애매하다. 당장 이 글을 읽는 당신 조차 그렇다. 당신은 개발자이기를 원하지, 절대 GIS 연구자이고 싶지 않을 테니.

<br />

사람들은 여행을 떠날 때 GIS로 이루어진 지도라는 걸 보고 여행하겠지만, 막상 GIS를 여행하려는 사람들은 한국에서 볼 게 적은 것이 현실이다. 남들은 여행길이 고생길이라고 할 때, GIS 여행자들은 여행 준비부터가 고생인 셈이다.

<br />
<p align="center" class="large grey-400"><i>우리 모두는 한 때 초심자였다.</i></p>
<br />

"수학을 잘하고 싶어요!"라고 말하는 초등학생에게 다짜고짜 수학의 정석을 풀라고 할 수 없다.

"프로그래밍 잘하고 싶어요!"라고 말하는 국비 3일차 개발자에게 "음 그래? 그럼 프로그래머스 5단계 풀어"라고 할 수 없다.

모든 것엔 입문이 있고, 순서라는 게 존재한다. 아이의 생각은 아이의 눈높이에서 봐야 가장 잘 이해할 수 있다.

내 비록 꼬꼬마 프로그래머지만, 내 경험과 글, 시야를 통해 이제 막 OpenLayers 여행을 시작한 개발자들에게 작은 안내서라도 되어주길 바란다.

<br />
<br />
<br />










# 부록

## 준비물

* OpenLayers 6
* React
* GeoServer

## 우리는 커서...

* 프로그래밍에서 GIS를 어떤 식으로 다루는 지 알아봐요!
* GeoServer로 GIS 서비스 환경을 만들어요!
* React + OpenLayers 6로 GIS 서비스를 제공해요!
  * OpenLayers 6는 ESNext를 지향하므로, React가 적합하답니다.