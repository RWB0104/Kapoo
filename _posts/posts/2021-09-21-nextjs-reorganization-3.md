---
title: "[NextJS] 블로그 개편기 - 3. SCSS 입히기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/133300948-2ee9b77a-1589-4afc-8489-fb402a13520f.png"
date: "2021-09-21T05:30:21"
type: "posts"
category: "NextJS"
tag: [ "NextJS", "React", "Typescript" ]
group: "블로그 개편기"
comment: true
publish: true
---

# 개요

타입스크립트도 입혔겠다. CSS도 좀 최신 트렌드를 반영해보고 싶었다. CSS는 단순히 스타일만을 입히는 스크립트라 미디어쿼리를 제외하면 HTML과 마찬가지로 동적 요소가 거의 없는 편이다. 하지만 SCSS 같은 전처리기를 활용하면 CSS의 개발 편의성을 높일 수 있다.

이 장에서는 SCSS를 적용하여 좀 더 나은 CSS 코딩 환경을 만든다.

# CSS의 전처리기

