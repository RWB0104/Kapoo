---
title : "EasyReport"
author: "RWB"
subtitle:
 - "일일업무 보내기 귀찮아서 만든 일일업무 보고서 자동화 프로그램"
 - "귀찮아서 움직인다는 이 아이러니함."
icon: "https://user-images.githubusercontent.com/50317129/258585529-9415fa4b-335f-4294-9000-40d733f28fef.png"
languages:
 - "C#"
links:
 - type: "github"
   name: "레포지토리"
   url: "https://github.com/RWB0104/EasyReport"
images:
 - "https://user-images.githubusercontent.com/50317129/258585535-e55151cf-9c8f-427e-b670-64885b39b21b.png"
 - "https://user-images.githubusercontent.com/50317129/90201533-1ae3b980-de16-11ea-96e3-8c9c8250ff66.png"
 - "https://user-images.githubusercontent.com/50317129/90473450-ea758580-e15d-11ea-8dd9-1735627ddfd9.png"
created: 1560643200000
completed: 1597968000000
---

# EasyReport 개발 일지

## 배경

당시 다녔던 회사의 대표님은 사내 직원들의 업무 현황을 일 단위로 파악하길 원하셨던 걸로 기억한다.  
이를 위해, 엑셀로 일일업무 보고서라는 걸 작성하여 대표님에게 메일로 송부했었다.

하지만 이런 단순반복 업무가 그렇듯이, 성취감은 작고, 귀찮음은 컸다.  
사회 초년생의 마음으로 자기 어필을 위해 열심히 작성한 마음가짐도, 성취감과 함께 점점 작아져만 갔다. 보고서를 제 때 작성해서 보내는 빈도와 함께.

며칠 빼먹어도, 때론 장기적으로 보내질 않아도 평상시엔 큰 문제가 없었다. 하지만 이런 누락들은 때때로 약점이 되어 돌아오기도 했었다.

어쨌든 회사 차원의 정당한 요구를 따르지 않는 것은 엄연히 문제다. 다행히 그 당시의 나는 개발 실력은 전무했어도, 쓸데없이 의지만 많았을 때였다. 내가 배운 ~~고작 3개월 짜리~~ 지식으로 이를 해결해보고자 했다.

## 분석

업무 자체는 간단했다. 엑셀로 오늘 한 일을 적고, 이를 간략하게 내용을 작성하여 메일로 보내는 것. 이게 전부다.

내가 달성해야할 목표는 아래와 같았다.

1. 오늘자 엑셀에 내용을 기입한다.
2. 엑셀의 내용을 분석한다.
   1. 엑셀의 내용을 토대로 메일 본문을 작성하므로, 정해진 양식이 요구됐다.
3. 메일을 작성하고, 보고서를 파일로 첨부하여 보낸다.

다행히 목표는 많지 않았고, 명확했다.

## 구현

가장 걸림돌이 되는건 역시 엑셀을 읽는 작업이였다. 지금이야 "엑셀 읽는 것 쯤이야 간단하지!"라고 생각하지만, 전술했듯이 그 당시의 나는 그렇게 생각할만한 여유가 없는 사람이였다.

이러한 제약으로 `Visual Basic`이라는 언어를 선택했다. 엑셀과 밀접한 연관이 있다는 이유 때문이였다.  
엑셀은 `Visual Basic`을 자체 지원하기 때문에, 문제가 훨씬 적을거라 판단했었다. 지금 생각해봐도 이건 미스였던 것 같다.

그나마 위안이였던 점은 입사 후 3개월 동안 `C#`을 배웠었는데, 운 좋게도 `Visual Studio`와 상호 변환이 굉장이 잘 되는 언어였다.

그 당시 낫 놓고 ㄱ자도 모르는 내 실력을 놓고 보자면 `Visual Basic`이 제격이였던 셈이다.

[🔗 일일업무 보고서](https://raw.githubusercontent.com/RWB0104/EasyReport/master/Documents/%EC%9D%BC%EC%9D%BC%EC%97%85%EB%AC%B4%EB%B3%B4%EA%B3%A0%EC%84%9C.xlsm)는  엑셀의 매크로에 관심이 좀 있었어서, 버튼을 누르면 오늘 날짜의 보고서 템플릿을 생성해주는 간단한 로직을 추가했다.  
(사용 시 매크로 제한 해제 옵션을 키라고 전달할 것!)

이로써 사용자에게 정형화된 템플릿을 제공할 수 있었다.

그렇게 엑셀을 연동하여 데이터를 분석한 작업 이후, 남은 과제는 그리 어렵지 않았다.  
분석한 내용을 토대로 내용을 작성하고, 이를 원하는 사용자에게 보내면 그만이였다.

### 프로토타입

그렇게 나온 첫 프로토타입. 지금은 그렇다 할 사진조차 남아있지 않지만, 전형적인 기본 형태의 윈도우 프로그램이였다. 무미건조한 그레이톤 기반의 둔탁한 UI.  
첫 연구 결과라는 의미가 무색해질 정도로, 이 프로그램은 정말 맡은 바 임무만을 성실히 이행했다.

결과를 보니 기능이나 특히 디자인에 대한 고민이 많아져서, 그 중 몇 가지를 해결할 수 있었다.

### 개선

당시 사내 업무는 주로 웹 쪽이였다보니, 자연스레 `CSS`를 접하여 디자인과 관련된 지식을 습득하게 됐다. 그러다보니, `Visual Basic`도 `CSS`와 비슷하게 좀 더 다양한 UI를 제공할 수 있지 않을까란 의문이 들었다.

찾다가 발견한 것이 [Metro UI](https://metroui.org.ua/examples.html)로, 기존의 디자인보다 훨씬 나은 UI를 제공할 수 있었다.  
디자인은 이를 적용하는 수준에서 마무리를 지었다.

또한, 막상 사용하다보니 불편한 점이 몇 가지 있었는데, 똑같은 설정을 사용할 때마다 반복해야한다는 불편함이 있었다.  
즉, 수신자를 지정하고, 구글 아이디, 비밀번호를 입력하고, 보고서 파일 경로를 지정하는 일련의 과정을 반복해야만 했다.

이를 해결하기 위해 XML 형태의 설정파일 개념을 도입했다. 흐름은 아래와 같이 구성했다.

1. 프로그램 실행
   1. 해당 경로에 설정파일이 없을 경우, 생성함
   2. 설정파일을 읽음
2. 설정파일의 설정 지정
3. 프로그램 사용

특히 구글 계정을 입력해야하는 문제가 있어서, 암호화가 필요했다. 그 땐 RSA에 대한 개념조차 몰랐던 터라, AES 기반의 대칭 암호화 전략을 채택할 수 밖에 없었다.

그래도 나름 보안에 신경을 쓰고자, 보안키를 사용자 PC의 고유값이 될만한 요소를 지정하여 사용했던 것으로 기억한다.

## 여담

이 연구소가 능동적으로 개발한 실질적인 첫 프로젝트다. 물론 이 연구소가 설립된건 훨씬 미래의 일이였지만..

경험이 많지 않았던 만큼, 모든 면에서 부족한 부분이 눈에 띈다. 지금은 거의 사장된 언어나 다름없는 `Visual Basic`을 차용한 것도 미스포인트고, 구조나 로직 또한 상당히 비효율적이다.

그럼에도 불구하고 굉장히 뜻깊은 프로젝트다. 이 프로젝트를 진행하면서 내가 필요한 프로그램을 만들자는 가치관이 정립되고, 이 이후로 많은 프로젝트들이 진행됐다.  
이 연구소가 지금껏 나아올 수 있었던 요인이 된 소중한 프로젝트.

물론 다시 하라면 이렇게 짜진 않을 것 같다.