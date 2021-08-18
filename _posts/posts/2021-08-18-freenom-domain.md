---
title: "[SSL] Freenom을 활용한 무료 도메인 발급하기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/129755999-c5d6c474-d5c0-442a-b7c5-37b3cdf703a9.png"
date: "2021-08-18T10:55:24"
type: "posts"
category: "WEB"
tag: [ "CS", "객체지향", "SSL" ]
group: "SSL"
comment: true
publish: true
---

# 개요

이전 글들에서 SSL이 뭔지, 어떤식으로 동작하는지를 다뤘다. 사이트에 SSL을 적용하기 위해선 SSL 인증서를 발급받아야한다.

SSL 인증서를 발급받기 위해선 인증받기 위한 도메인이 필요하다. 국내에서 서비스 중인 도메인 업체에서 쉽게 발급받을 수 있다.

* [가비아](https://www.gabia.com/)
* [후이즈](https://whois.co.kr/)
* [카페24](https://www.cafe24.com/)

위 업체는 도메인 외에도 호스팅 등 다양한 서비스를 제공한다.

이 외에도 여러 업체들이 있으며, 국내 뿐만 아니라 해외에서 서비스 중인 업체들도 있다. 업체마다 가격 및 정책이 다르니 발품팔다보면 좋은 금액으로 구매할 수도 있다.

TLD(Top Level Domain)에 따라 가격이 달라지며, 저렴한 건 연간 몇 천원에서부터 비싸면 수십만원대에 이르기도 한다.

> **TLD?**  
> TLD에 대한 내용은 이전에 작성한 게시글 [URI? URL? URN? 리소스 식별자 구분하기](/2021/05/29/uri-url-urn#TLD(Top-Level Domain, 최상위 도메인))에서 확인 가능하다.

# Freenom으로 무료 도메인 받기

물론 위 방법으로 도메인을 발급받아도 좋지만, 여기엔 돈이 든다. 만약 본인이 실제 웹을 배포할 생각이라면 당연히 도메인을 구입하는 게 맞다.

하지만 도메인 연결, SSL 적용 등 단순 테스트 목적이라면 적은 비용이라도 좀 아깝다는 생각이 들게 된다.

다행히 [Freenom](https://www.freenom.com/)에서 무료 도메인을 발급해주니, 단순 테스트 목적으로 부담없이 사용할 수 있다.

## 주의사항

Frenom을 사용하는 데 몇 가지 주의사항이 있다.

<p class="large amber-600">1. 사용 가능한 TLD가 제한적임</p>

주로 사용하는 TLD는 `com`, `net` 등이 있지만, Freenom은 `ga`, `ml` 등 특정한 ccTLD만 지원한다.

* `tk`(Tokelau): 뉴질랜드령 토켈라우제도
* `ml`(Mali): 말리
* `ga`(Gabon): 가봉
* `gq`(Equatorial Guinea): 적도 기니
* `cf`(Central African Republic): 중앙아프리카 공화국

대중적인 TLD를 선택할 순 없지만, 무료이니 감안하자. 어차피 후술할 이유로 실제 서비스에 적용하기엔 무리가 있다.

<p class="large amber-600">2. 연장 시기를 놓치면 유료화</p>

발급받은 도메인은 최대 1년 단위로 연장해야한다. 연장은 만료일로부터 2주 안에 신청이 가능하다.

연장하는데 비용은 들지 않으나, 문제는 연장 시기를 놓쳐 만료될 경우다. 이렇게 만료된 도메인은 새로 발급받아야하는데, Special Domain으로 분류되어 약 9$ 정도의 비용을 요구한다.

9$이면 괜찮은 TLD의 도메인을 발급받을 수 있을 정도의 금액이므로 메리트 있는 금액도 아니다.

