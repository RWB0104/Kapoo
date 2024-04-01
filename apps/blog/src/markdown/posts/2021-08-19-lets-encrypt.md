---
title: "[SSL] Windows 10에서 Let's Encrypt로 SSL 인증서 무료 발급받기"
excerpt: "도메인도 있겠다. 이제 이 도메인을 가지고 SSL 인증서를 발급받아보자. 물론 SSL 인증서 또한 발급받는데 비용이 든다. 대부분의 운영 중인 도메인 업체는 SSL 발급도 병행한다. 테스트 목적이라면 도메인과 마찬가지로 SSL 발급도 부담스러울 것이다. SSL 역시 무료로 발급받을 수 있는 방법이 있으며, 도메인보다 그 방법이 훨씬 많다."
coverImage: "https://user-images.githubusercontent.com/50317129/129755999-c5d6c474-d5c0-442a-b7c5-37b3cdf703a9.png"
date: 1629383841000
type: "posts"
category: "WEB"
tag: [ "CS", "객체지향", "SSL" ]
group: "SSL"
comment: true
publish: true
---

# 개요

도메인도 있겠다. 이제 이 도메인을 가지고 SSL 인증서를 발급받아보자. 물론 SSL 인증서 또한 발급받는데 비용이 든다. 대부분의 운영 중인 도메인 업체는 SSL 발급도 병행한다.

테스트 목적이라면 도메인과 마찬가지로 SSL 발급도 부담스러울 것이다. SSL 역시 무료로 발급받을 수 있는 방법이 있으며, 도메인보다 그 방법이 훨씬 많다.

하지만 무료 답게 제약사항이 존재하기도 한다. 유효기간이 매우 짧다던가, 등록할 수 있는 도메인에 한계가 있다던가, 하지만 <span class="green-600">Let's Encrypt</span>를 활용하면 별다른 제약 없이 SSL을 발급받을 수 있다. 이전에 설명했던 <span class="lightBlue-600">Freenom</span>과 달리, 이쪽은 실서버에 적용해도 아무런 문제없이 사용할 수 있다. 덕분에 소규모 사이트의 인증서를 잘 살펴보면 심심치않게 발급기관이 <span class="green-600">Let's Encrypt</span>임을 확인할 수 있다.

# Let's Encrypt!

<span class="green-600">Let's Encrypt</span>를 통해 SSL을 발급받아보자. 환경은 아래와 같다. <span class="blue-600">Windows 10</span>을 기준으로 진행한다.

사실 Let's Encrypt는 SSL을 발급해주는 기관으로, Let's Encrypt에서 회원가입하고 뭐 제출하고 이런 방식이 아니다. Let's Encrypt와 통신하여 SSL을 발급해주는 프로그램들이 많이 있으니 이걸 다운로드 받으면 된다.

[지원하는 프로그램 목록](https://letsencrypt.org/ko/docs/client-options/)을 확인해보자. 그 중 우리는 Windows 10용으로 빌드된 <span class="blue-400">win-acme</span>를 사용한다.

필요한 준비물은 아래와 같다.

* Windows 10
* 자신의 아이피와 연결된 도메인
* 80포트가 접속 가능한 네트워크 환경
  * 불가능하다면 DNS 설정이 가능함
* WAS (여기선 Tomcat을 사용)

위 준비물이 없으면 SSL 발급을 진행하기 어렵다.

## 1. win-acme 다운로드

아래의 사이트에서 win-acme를 다운로드 받는다.

<br />

<p align="center"><a href="https://www.win-acme.com/" target="_blank">다운로드</a></p>

<br />

압축을 해제한다. `wacs.exe`를 실행하면 아래와 같은 창이 뜰 것이다.

![null](https://user-images.githubusercontent.com/50317129/130079131-3eb9c5de-c1bc-4919-a921-e4c7c7f28a3d.png)

## 2. 발급 방법 선택

명령어를 입력하여 발급을 진행할 것이다.

* <span class="green-300">Create certificate (default settings)</span>: 기본 옵션으로 SSL 발급 (N)
* <span class="green-A400">Create certificate (full settings)</span>: 직접 옵션을 선택하여 SSL 발급 (M)
* <span class="green-300">Run renewals</span>: 갱신 (R)
* <span class="green-300">Manage renewals</span>: 갱신 관리 (A)
* <span class="green-300">More options...</span>: 더 많은 옵션 (O)
* <span class="green-300">Quit</span>: 종료 (Q)

[M]을 입력하여 직접 옵션을 선택하여 SSL을 발급한다. 대소문자는 따로 구분하지 않으니 그냥 입력해도 된다.

## 3. 도메인 입력 방법 선택

![null](https://user-images.githubusercontent.com/50317129/130080688-2bbbc350-399a-4bc3-b619-732d4b25ae58.png)

* <span class="grey-600">Read site bindings from IIS</span>: IIS에서 바인딩 (1)
* <span class="green-A400">Manual input</span>: 직접 입력 (2)
* <span class="green-300">CSR created by another program</span>: 다른 프로그램에서 만든 CSR (3)
* <span class="green-300">Abort</span>: 중단 (C)

우리는 [2]를 입력하여 직접 도메인을 입력한다.

## 4. 도메인 입력

![null](https://user-images.githubusercontent.com/50317129/130080746-f57c8f5f-6243-4c9d-b5ca-a6859fcb30ec.png)

인증받을 도메인을 입력한다. 다수의 도메인을 하나의 인증서로 만들 수도 있으며, 이 경우 쉼표(,)로 구분하면 된다.

``` batch
example.com
```

하나의 도메인을 인증받는다면 위와 같이 입력한다.

``` batch
example.com,www.example.com,admin.example.com
```

여러 도메인을 인증받는다면 위와 같이 쉼표로 구분하여 입력한다.

입력한 모든 도메인이 인증되어야하니 참고할 것. 도메인을 입력하면 도메인에 대한 별칭을 입력하라고 하는데, 그냥 아무것도 입력하지 말고 [Enter] 눌러서 다음으로 넘어가자.

## 5. 인증 방법 선택

![null](https://user-images.githubusercontent.com/50317129/130081483-11eef349-d3e7-4e81-9498-67355eb2632f.png)

* <span class="green-A400">Save verification files on (network) path</span>: 네트워크 경로에 인증 파일 저장 (1)
* <span class="grey-600">Serve verification files from memory</span>: 메모리에 인증 파일 저장 (2)
* <span class="green-300">Upload verification files via FTP(S)</span>: FTP를 통한 인증 파일 업로드 (3)
* <span class="green-300">Upload verification files via SSH-FTP</span>: SSH-FTP를 통한 인증 파일 업로드 (4)
* <span class="green-300">Upload verification files via WebDav</span>: WebDav를 통한 인증 파일 업로드 (5)
* <span class="green-300">Create verification records manually (auto-renew not possible)</span>: 수동으로 인증 레코드 생성 (자동 갱신 불가능) (6)
* <span class="green-300">Create verification records acme-dns</span>: acme-dns를 통한 인증 레코드 생성 (7)
* <span class="green-300">Create verification records with your own script</span>: 본인 소유의 스크립트를 통해 인증 레코드 생성 (8)
* <span class="grey-600">Answer TLS verification request from win-acme</span>: win-acme의 TLS 인증요청 응답 (9)

1번은 이후 입력할 웹루트 경로에 인증파일을 생성해주고, 3 ~ 5번은 제공해주는 파일을 직접 업로드한다. 6 ~ 8번은 DNS 레코드 설정이 필요하다.

통상 1번이 가장 쉬우니, 본 문서에는 1번으로 진행한다.

## 6. 웹루트 경로 입력

![null](https://user-images.githubusercontent.com/50317129/130083363-c4e34aeb-6041-4895-9e4c-71085514f51f.png)

웹루트 경로를 입력한다. 예를 들어, `https://example.com` 도메인이 있다면, 이 도메인의 파일들이 위치한 경로를 입력해야한다.

만약 순정 <span class="amber-400">Tomcat</span>이라면 `%TOMCAT_HOME%/webapps/ROOT`가 될 것이다.

환경마다 다르니, 적절히 입력해주면 된다. 이 때 반드시 <span class="red-600">80포트로 접속이 가능해야함에 주의</span>한다.

만약 80포트 사용이 불가능하다면 DNS 설정으로 인증하는 6 ~ 8번을 시도하자. 이메일 인증은 지원하지 않는다.

웹 설정을 복사할거냐고 물어보는데, 하지말자.

## 7. CSR 유형 선택

![null](https://user-images.githubusercontent.com/50317129/130084201-636a0f36-ac1a-4aaa-b17d-948248b2600c.png)

* <span class="green-300">Elliptic Curve key</span>: 타원곡선 암호화 (1)
* <span class="green-A400">RSA Key</span>: 비대칭 암호화 (2)

[2]를 선택한다.

## 8. 인증서 저장 방식 선택

![null](https://user-images.githubusercontent.com/50317129/130084595-c96c3c33-ddde-4b95-b395-5e073d6b4eba.png)

* <span class="green-300">IIS Central Certificate Store</span>: IIS용 인증서 (.pfx) (1)
* <span class="green-A400">PEM encoded files</span>: 아파치 계열용 인증서 (.pem) (2)
* <span class="green-300">PFX archive</span>: .pfx 파일 (3)
* <span class="grey-600">Windows Certificate Store</span>: 윈도우 인증서 저장소 (4)
* <span class="green-300">No (additional) store steps</span>: (추가적인) 인증서 미저장 (5)

본 문서에선 Tomcat을 기준으로 설명하므로 [2]를 선택한다.

## 9. 저장경로 입력

![null](https://user-images.githubusercontent.com/50317129/130085226-7f89895e-ad04-4851-9b6f-5922eb749f36.png)

원하는 저장경로를 입력한다. 편한 경로로 입력하자.

## 10. 키파일 암호 입력 방식

![null](https://user-images.githubusercontent.com/50317129/130085398-cc5e9c1e-6b1c-4b20-ba3d-d62caf3b02e3.png)

* <span class="green-300">None</span>: 안 함 (1)
* <span class="green-A400">Type/paste in console</span>: 콘솔에서 입력/붙여넣기 (2)
* <span class="green-300">Search in vault</span>: vault에서 검색 (3)

[2]를 선택한다.

원하는 비밀번호를 입력한다. 입력하면 해당 비밀번호를 추후 사용하도록 valut에 저장할 것이냐고 묻는다. 원하는대로 하자.

저장하게 되면 아마 [3]을 통해 이전의 암호를 사용할 수 있을 것 같다.

## 11. 추가 인증서 저장 방식 선택

8번과 같은 과정. 추가로 다른 확장자의 인증서가 필요하면 더 하면 된다.

이 문서에선 필요 없으므로, [5]를 눌러 더 생성하지 않고 넘어간다.

## 12. 추가 옵션

![null](https://user-images.githubusercontent.com/50317129/130086251-6744a758-1f4a-44b3-9bc1-ed260fac4d67.png)

* <span class="grey-300">Create or update https bindings in IIS</span>: IIS에 HTTPS 바인딩 생성 혹은 갱신 (1)
* <span class="grey-300">Create or update ftps bindings in IIS</span>: IIS에 FTPS(보안 FTP) 바인딩 생성 혹은 갱신 (2)
* <span class="green-300">Start external scripts or program</span>: 외부 스크립트 실행 (3)
* <span class="green-A400">No (additional) installation steps</span>: 추가적인 설치 과정 없음 (4)

[4] 별도로 할게 없으므로 넘어가자.

## 13. 도메인 인증

![null](https://user-images.githubusercontent.com/50317129/130086813-01c8e143-e2dd-4b3b-ad41-d89292d07607.png)

아까 입력했던 도메인에 대한 인증을 수행한다. 도메인의 유효성만 검증하므로 DV 인증서라고 할 수 있다.

아까 입력했던 웹루트에 `.well-known` 폴더가 생성됐을 것이다.

`http://www.kapoo.ga/.well-known/{hash}/{file}`로 접근해서 실제 자신이 랜덤으로 생성한 파일의 정보와 일치한지 확인한다. 맞다면 해당 도메인이 유효하다고 판단한다.

나중에 특정 작업 수행할 거냐고 물어보는 대답엔 아니라고 하자.

## 14. 인증서 확인

9번 과정에서 입력한 저장 경로로 가보면 `pem` 파일이 생성되었을 것이다.

* example.com-chain.pem: 서명과 CA 중간 인증서를 통합한 인증서
* example.com-chain-only.pem: CA의 중간 인증서
* example.com-crt.pem: 서명된 인증서
* example.com-key.pem: 인증서 개인키

위 네 파일이 생성되면 정상적으로 SSL을 발급받은 것이다. 이를 웹서버, WAS 등에 적용하면 된다.

# 정리

Let's Encrypt를 통해 SSL을 무료로 발급받았다. 무료지만 무려 1년의 유효기간을 가지며, 발급 시 자동갱신 스크립트도 자동으로 추가된다.

무료임에도 불구하고 환경만 잘 구축해두면, SSL은 거의 신경쓰지 않아도 된다. 이러한 편의성 때문에 무료임에도 많은 곳에서 Let's Encrypt를 사용한다.

다음 장에서는 이 인증서를 직접 Tomcat에 적용해본다.