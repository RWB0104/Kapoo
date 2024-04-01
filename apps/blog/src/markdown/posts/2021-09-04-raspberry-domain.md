---
title: "[라즈베리파이 4] 라즈베리파이에 도메인 입히기"
excerpt: "지금까지 과정을 거치면서 라즈베리파이에 OS를 설치하고, Tomcat을 구동하여 웹 서버로 동작할 수 있도록 환경을 구축했다. 이제 우리는 라즈베리파이의 IP로 접속하여 웹 사이트를 호스팅할 수 있다. 하지만 정상적인 페이지라면 IP를 입력하여 접속하지 않는다. Domain을 발급받아 IP에 연동하고, 이를 URL 주소로 사용할 것이다. 이 장에서는 Domain을 직접 구입하고 라즈베리파이 서버에 이를 연동한다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: 1630724944000
type: "posts"
category: "RaspberryPi"
tag: [ "라즈베리파이", "Ubuntu", "도메인" ]
group: "라즈베리파이"
comment: true
publish: true
---

# 개요

지금까지 과정을 거치면서 라즈베리파이에 OS를 설치하고, Tomcat을 구동하여 웹 서버로 동작할 수 있도록 환경을 구축했다.

이제 우리는 라즈베리파이의 IP로 접속하여 웹 사이트를 호스팅할 수 있다.

하지만 정상적인 페이지라면 IP를 입력하여 접속하지 않는다. Domain을 발급받아 IP에 연동하고, 이를 URL 주소로 사용할 것이다.

이 장에서는 Domain을 직접 구입하고 라즈베리파이 서버에 이를 연동한다.

# 무슨 도메인을 쓰지?

일전 [게시글](/posts/2021/08/18/freenom-domain)에서 Freenom을 통해 무료로 도메인을 받는 과정에 대해 다룬적이 있다.

무료도 상관없지만, Freenom은 실 서비스에 사용하기에 매우 부적합하다.

TLD 중 어떤 걸 사용할까 고민했다. 개인적으론 `io` 도메인의 트렌디함에 끌렸지만, 가비아 기준 도메인 비용이 무려 연 20만원... 반드시 `io`가 필요하지도 않은 마당에 연에 20을 태우는 건 너무 비효율적이라 생각했다.

원랜 대중적인 `com`으로 하려했으나, 조사 중 `dev`라는 개발자스러운 도메인이 있음을 확인하여 이를 선택하기로 했다.

![null](https://user-images.githubusercontent.com/50317129/132054483-01b3e988-376d-444f-9d5e-8415368e0822.png)

[Google Domains](https://domains.google/)에서 구매하기로 했으며, Google Domains 기준 일반가는 12$다.

<br />

뭐든지 네이밍이 제일 어렵다. 게임 캐릭터 닉네임을 정하는 것도 그렇고, 변수명을 짓는 것도 그렇다.

유명한 도메인인 `socket.io`처럼 뭔가 `dev`를 적절히 이용하여 하나의 문장처럼 보이는 도메인을 생성하고 싶었다.

![null](https://user-images.githubusercontent.com/50317129/132054569-31a96ab2-652f-4631-849f-759d3c82f823.png)

<br />

<p class="orange-600" align="center">단어에 따라 프리미엄가가 붙기도 하며, 단어의 고유화 정도에 따라 같은 프리미엄이라도 가격이 다르게 적용된다.</p>

<br />

그렇다고 너무 <span class="amber-600">범용적인 단어를 사용하면 프리미엄</span>이랍시고 가격을 매우 비싸게 받는다.... 일례로 `unix.dev`는 unix라는 보통명사가 들어갔음에도 아직 발급되지 않았는데, 프리미엄 가격이 무려 1,000$가 넘어간다. `webapps.dev`도 매우 비싸긴 마찬가지.

하지만 여러 단어를 조합해서 만드는 문장은 인식을 잘 못하는지, 찾다보면 꽤 괜찮은 도메인임에도 프리미엄이 붙지 않기도 하다.

고민끝에 선정한 후보는 아래와 같다.

* itcode.dev
* mustdo.dev
* imnow.dev

셋 다 프리미엄이 붙지 않으며, 최대한 도메인에 개발자스러움을 담았다. 원랜 `mustdo.dev`로 하려 했으나, `itcode.dev`의 깔끔함 때문에 막판에 이 쪽으로 선회했다.

# Google Domains에서 도메인 발급받기

도메인을 발급받을 수 있는 사이트는 여러군데가 있으나, 이 장에서는 Google Domains를 기준으로 설명한다.

이유는 그냥 구글이라서.

## 준비물

* 서버
* 해외결제를 지원하는 결제수단

필자가 도메인을 발급받을 때 필요했던 준비물은 위와 같다.

만약 Google Domains가 아닌 국내 사이트에서 결제한다면 해외결제는 신경쓰지 않아도 된다. Google의 경우 해외 서비스이므로 해외결제가 지원되야 한다.

## 1. 도메인 결정하기

![null](https://user-images.githubusercontent.com/50317129/132057934-b103e4ef-157d-46e1-b9aa-52a9b8f273c1.png)

원하는 도메인을 검색하자.

도메인을 골랐다면 우측 가운데 [카트] 버튼을 클릭하여 장바구니에 담는다.

`dev` 도메인과 같이 몇몇 일부 도메인은 <span class="red-400">More secure</span> 정책이 적용되어 SSL을 강제한다.

이러한 정책이 적용된 도메인은 <span class="red-600">HTTP 서비스가 불가능하며, 반드시 HTTPS 서비스만을 제공</span>함에 유의하자.

## 2. 화폐 단위 선택하기

첫 결제라면 결제할 화폐 단위를 선택해야한다.

![null](https://user-images.githubusercontent.com/50317129/132058739-2766fbd9-791c-4e19-971f-7520e46de5b2.png)

아쉽게도 원화는 지원되지 않으므로, 지원되는 화폐 중 하나를 선택한다.

이 장에서는 달러($)를 기준으로 수행한다.

> <span class="yellow-600">해외결제의 경우 달러가 수수료 측면에서 이득이다</span>  
> 필자는 군대 전역 후 카드사 콜센터에서 잠깐 일을 한 적이 있었다. 거기서 얻은 지식 중 하나로, <span class="orange-600">해외결제는 달러를 기준으로 환전</span>한다. 만약 원화 -> 유로로 결제한다면, 실제론 <span class="blue-600">원화 -> 달러 -> 유로</span>로 두 차례 환전이 일어나 수수료 역시 이중으로 나간다.  
> 이는 해외에서 원화를 결제할때도 마찬가지. 해외에서 국내 카드로 원화결제를 수행할 경우 <span class="blue-600">원화 -> 달러 -> 원화</span>라는 해괴한 매커니즘으로 결제되니, 해외결제는 그냥 속편하게 달러로 하자.

## 3. 사용자 정보 입력

첫 결재라면 도메인 소유주 정보를 입력받는다. 적절히 입력하자.

우편번호의 경우 <span class="red-600">미국 우편번호만을 입력</span>받으니, 구글에 그냥 미국 주소 아무거나 쳐서 우편번호 하나 확인하여 입력하자.

## 4. 도메인 구매

도메인 구매를 수행한다.

![null](https://user-images.githubusercontent.com/50317129/132058813-3eb136bc-d801-40ac-a1c3-83a68478f6e4.png)

<span class="red-600">[Read trademark notice]</span>는 starcraft라는 브랜드명을 도메인으로 사용함에 따라 관련 약관의 동의를 받는 것이다.

일반적인 도메인엔 해당 과정이 존재하지 않다.

* <span class="amber-600">Registration</span> - 소유 기간 선택 (최소 1년)
* <span class="amber-600">Privacy protection is on</span> - 도메인 소유주 정보를 숨긴다. 후이즈(WHOIS) 등에서 도메인 정보를 조회할 경우, 소유주에 대한 정보를 숨긴 채 제공한다.
* <span class="amber-600">Auto-renew is on</span> - 도메인 자동 갱신 활성화
* <span class="grey-600">Custom email</span> - 도메인 이메일계정 활성화

Custom email은 자신의 도메인으로 된 구글 이메일을 만드는 것이다. 즉, `example@starcraft.dev`와 같이 <span class="orange-500">자신이 구입한 도메인으로 이메일 아이디를 생성</span>해주는 서비스다.

물론 무료는 아니고, 유저당 월 12$ 비용이 청구된다. 도메인 유지 비용이 연 12$임을 감안하면 10배에 달하는 비용이다. 비즈니스 등 반드시 필요한 서비스가 아니라면 해당 서비스는 체크를 해제하자.

# IP와 도메인 연결하기

도메인 구입이 완료되면 소유주 정보에 입력한 이메일로 구매 영수증과 함께 안내 메일이 수신된다.

구입 이후 도메인은 즉시 사용이 가능하다. 이 도메인을 라즈베리파이에 연동하기 위해선 DNS 설정을 통해 <span class="green-600">라즈베이파이의 IP와 도메인을 연결</span>해주면 된다.

![null](https://user-images.githubusercontent.com/50317129/132080600-d1083686-ceb4-4046-a6ab-c4a0c7a83f90.png)

Google Domains의 DNS 메뉴에서 DNS 설정을 관리할 수 있다.

![null](https://user-images.githubusercontent.com/50317129/132080643-7a92c2ec-8b8a-4428-b4c3-4ba149bb6875.png)

[맞춤 레코드 관리]를 클릭하여 DNS Record를 추가한다.

<span class="green-600">A Record를 하나 추가하여 데이터에 라즈베리파이의 IP를 입력</span>하고 저장한다. 수 분 이내로 반영이 완료된다.

> <b class="teal-A400">사설 IP 입력? 멈춰!</b>  
> 공유기 환경을 사용한다면 IP 확인 시 <span class="pink-600">192.168.0.xxx</span>와 같은 사설 IP가 출력될 것이다. A Record엔 사설 IP가 아닌 실제 IP를 입력해야한다. 공유기 설정이나 [findIP](https://www.findip.kr/)에서 확인할 수 있다.

# 도메인 연동 확인

``` bash
nslookup [도메인]
```

윈도우든 Ubuntu든 위 명령어를 입력하여 도메인과 연동된 IP를 확인할 수 있다.

내가 입력한 IP가 정상적으로 나온다면 성공이다.

라즈베리파이에서 Tomcat을 기동하고 `example.com:8080`에 접속하여 페이지가 잘 출력되는지 확인하자.

## 연결이 되지 않아요!

* `xxx.xxx.xxx.xxx:8080`으로 접속되는지 확인
* 접속이 될 경우 외부에서 문제없이 접속되므로, 도메인에 연결한 IP가 올바른지 확인
* 접속되지 않을 경우 애초에 외부에서 접속되지 않는 것이므로 방화벽이나 포트 통신에 문제가 없는지 확인
* 공유기 환경일 경우 IP주소의 포트포워딩이 설정되어있는지 확인

# 목표

* <del class="grey-400">라즈베리파이에 Ubuntu 서버를 구축한다.</del>
* <del class="grey-400">Tomcat을 구동하여 페이지를 호스팅한다.</del>
* <del class="grey-400">도메인을 입힌다.</del>
* SSL 인증서를 발급하여 HTTPS 통신을 제공한다.
* SSH, RDP 등의 원격 통신환경을 구축한다.
* MariaDB를 설치하여 DB 통신을 수행한다.

`dev` 도메인은 반드시 SSL이 필요하다. 더군다나 현재에 배포되는 모든 웹 페이지엔 HTTPS 적용을 거의 강제하다시피 함으로 HTTPS 적용을 목표에 추가한다.