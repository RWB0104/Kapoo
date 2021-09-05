---
title: "[라즈베리파이 4] Let's Ecrypt로 Ubuntu 서버에 HTTPS 통신 제공하기"
excerpt: "지금까지 과정을 거치면서 라즈베리파이에 OS를 설치하고, Tomcat을 구동하여 웹 서버로 동작할 수 있도록 환경을 구축했다. 이제 우리는 라즈베리파이의 IP로 접속하여 웹 사이트를 호스팅할 수 있다. 하지만 정상적인 페이지라면 IP를 입력하여 접속하지 않는다. Domain을 발급받아 IP에 연동하고, 이를 URL 주소로 사용할 것이다. 이 장에서는 Domain을 직접 구입하고 라즈베리파이 서버에 이를 연동한다."
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-09-04T12:09:04"
type: "posts"
category: "Ubuntu"
tag: [ "라즈베리파이", "Ubuntu", "Tomcat(톰캣)" ]
comment: true
publish: false
---

# 개요

이전 장에서 Google Domains를 통해 `dev` 도메인을 발급받았다. 이 블로그의 주소는 실제로 구입한 https://blog.itcode.dev 도메인이 적용되어있다.

`dev` 도메인은 강화된 보안정책이 적용되어있다. 해당 도메인으로의 모든 HTTP 통신은 반드시 HTTPS 보안 통신으로만 제공된다. 네트워크 계층에서 https 프로토콜로 라우팅하므로 좋든 싫든 HTTPS 서비스를 제공해야만 한다.

<br />

이 장에서는 Let's Encrypt로 SSL 인증서를 발급받아 라즈베이파이서버의 Tomcat에 적용한다. 기존의 1:1 도메인 매칭 SSL이 아니라, 여러 서브도메인에 전부 대응 가능한 와일드카드 인증서를 받을 것이다.

> <b class="teal-600">와일드카드(Wildcard) 인증서?</b>  
> 프로그래밍에서의 <span class="primary">와일드카드</span>란 무작위 대상의 허용이란 의미를 가진다. 도메인과 1:1 매칭되는 기존의 인증서와 달리, 와일드카드 인증서는 주체가 `*.example.com`로 표기되며, 모든 서브도메인에 적용이 가능하다.

# Cerbot으로 SSL 인증서 발급하기

Ubuntu 서버에서 SSL 인증서를 발급받아보자. 일반적인 SSL 인증서는 인증 과정에서 웹 서버에 특정 파일을 배포한 뒤, 인증 서버에서 해당 파일의 접근 및 유효성 검증을 통해 도메인의 소유권을 확인한다.  
하지만 와일드카드 인증서는 여러 서브도메인에 전부 적용되는 특별한 인증서라 위의 인증방식을 사용하지 않는다. 위의 인증방식은 하나의 도메인의 소유권만 보증하기 때문. 와일드카드 인증서는 DNS 레코드를 통해 소유권을 인증한다. DNS 레코드는 도메인의 소유권자만 설정 가능하기 때문.

만약, 어떠한 이유로든 도메인의 DNS 설정을 변경할 수 없다면 와일드카드 인증서를 발급받을 수 없다.

## 어? 전 윈도우로 하고싶은데....

DNS 레코드 인증으로 진행하기 때문에 Tomcat에 파일을 배포할 필요가 없어서 아무데서나 진행해도 상관 없다.

Windows 환경에서 인증서를 발급받는 방법은 이전에 작성한 게시물 []()을 참고하길 바란다.

## 준비물

* Ubuntu OS
* DNS Record 설정 권한

필자는 Google Domains에서 도메인을 구입했으므로, Google Domains에서 DNS 설정을 관리할 수 있다. 만약, 가비아나 후이즈, 도레지 등 다른 도메인 사이트에서 도메인을 구매했다면 그 사이트에서 DNS 설정을 할 수 있으니 참고할 것.

이 장에서는 Google Domains를 기준으로 진행한다.

## 1. Certbot 설치하기

Ubuntu에서 Certbot을 설치한다.

``` bash
sudo apt-get install certbot
```

## 2. Certbot으로 인증 수행하기

Certbot을 수행하여 인증서 발급을 수행한다.

``` bash
sudo certbot certonly --manual --preferred-challenges dns -d *.itcode.dev
```

* `--manual` - 수동 설정
* `--preferred-challenges` - 인증방식 지정
* `-d` - 도메인 지정

위 명령어를 사용하면 별다른 명령어 입력 없이 즉시 인증을 수행할 수 있다. `-d`의 인자값으로 구입한 도메인을 입력하되, 서브도메인을 `*`로 지정함을 잊지말자.

certbot에서 서브도메인명 `_acme-challenge`과 랜덤한 문자열을 제공한다. 제시한 서브도메인 `_acme-challenge`의 DNS TXT Record에 제공한 값을 할당하면 된다.

## 3. DNS TXT Record 설정

DNS Record 종류엔 A, CNAME 등 여러 종류가 존재한다. 이 중 TXT 레코드에 값을 할당하면 된다.

Google Domains의 DNS 설정에서 Record 하나를 추가하고, 타입을 TXT로 설정한다. 이후 certbot에서 제시한 값을 입력한다. 설정한 DNS 정보가 전파되기까지 수 분의 시간이 걸릴 수 있다. Google Domains의 경우 전파속도는 빠른 것 같다.

``` bash
nslookup -q=txt _acme-challenge.itcode.dev
```

TXT Record이므로 브라우저에서 해당 도메인에 접근해도 별다른 내용이 출력되지 않는다. `nslookup` 명령어를 통해 Record의 종류를 지정하여 조회해야한다.

``` output
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
_acme-challenge.itcode.dev      text = "1sz-pJgM-3jL7mZacyByOO0S2lclAF0QmxtqujRuRHM"

Authoritative answers can be found from:
```

위 처럼 해당 도메인의 TXT Record에 입력한 문자열이 나오면 성공이다. 만약, 값이 나오지 않는다면 값이 나올 때까지 시간을 두고 기다리자.

### 주의점

DNS TXT Record가 미처 전파되지 않았음에도 불구하고 한국인 특성이 발동하여 certbot에 Enter를 눌러 인증확인 단계로 넘어가는 경우가 왕왕 발생한다.

만약, TXT Record가 확인되지 않는다면, 관련 메시지와 함께 인증과정을 다시 시작한다. 문제는 이 때 <span class="red-600">TXT Record에 등록할 문자열을 새로 갱신</span>한다. 즉, DNS TXT Record을 갱신된 값으로 재지정해야한다.

DNS 전파가 느리다면 대기시간이 많이 늘어나버리니 주의할 것. 반드시 `nslookup` 명령어를 통해 DNS 적용 여부를 확인하자.

## 4. 인증 확인 요청

DNS TXT Record가 정상적으로 전파됐다면, 콘솔에서 Enter를 눌러 다음 단계로 넘어간다. certbot이 인증확인을 시도하며, 인증이 완료되면 인증서를 발급해준다.

``` bash
# itcode.dev는 인증한 도메인 이름
cd /etc/letsencrypt/live/itcode.dev
```

기본적으로 위 경로에 인증서가 생성된다. 마지막 폴더 `itcode.dev`는 도메인 이름이니, 각자가 입력한 도메인으로 변경하여 입력한다.

* `cert.pem` - 도메인의 인증서
* `chain.pem` - 발급기관의 인증서
* `fullchain.pem` - 도메인과 발급기관의 통합 인증서
* `privkey.pem` - 인증서의 개인키

SSL은 도메인의 인증서 뿐만 아니라, 이를 발급해준 CA의 인증서까지 같이 검증한다. 도메인의 인증이 올바르더라도, 이를 발급해준 기관이 이상할 경우 해당 인증서 또한 믿을 수 없기 때문. 일종의 보증서라고 봐도 무방하다.

일례로, 한국의 화폐 만원권이 만원의 가치를 가질 수 있는 이유는 한국은행이 이를 보증하기 때문. 반대로 핫한 가상화폐의 경우, 가상화폐의 가치를 보증해주는 기관이 없다. 때문에 가치가 수시로 변동하며, 언제든 그 가치와 기능을 잃을 수 있다.

> <b class="teal-600">fullchain.pem</b>의 존재의미  
> 어차피 `cert.pem`과 `chain.pem`이 제공되는데, 둘의 통합인증서가 무슨 의미가 있냐고 생각할 수 있다. `fullchain.pem`은 두 인증서를 통합함으로써, `cert.pem`과 `chain.pem`의 매칭여부를 확인할 수 있다.
