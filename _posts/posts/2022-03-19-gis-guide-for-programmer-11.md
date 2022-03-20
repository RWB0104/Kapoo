---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 10. Open Street Map(OSM) 맵 만들기"
excerpt: "OSM이란, 전세계 지도 종사자들이 자율적으로 관리하는 세계지도다. 즉, 지도 분야의 오픈 소스라고 생각하면 이해하기 쉽다. 각 국의 기여자들이 지도를 관리하고 있으며, 각 국가의 영역은 해당하는 국가의 언어로 표시된다. 전세계를 대상으로 하는 서비스에도 무리없이 적용 가능하다는 장점이 있다. 단, 한국 기준으로 지도의 퀄리티가 그리 뛰어나진 않다. OpenLayers는 라이브러리 단계에서 OSM을 기본 제공한다. 즉, 별다른 API 호출이나 설정 없이 간단한 코드 몇 줄 만으로도 웹 상에 세계지도를 띄울 수 있다. 이 장에서는 OpenLayers6를 활용하여 웹 상에 OSM을 띄우는 매우 기초적인 방법에 대해 다룬다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-15T04:53:00+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# OSM만으로 괜찮을까?

이전 장에서 OSM을 통해 지도를 표시해봤다. 하지만, OSM의 지도는 디테일함이 떨어진다는 무시할 수 없는 단점이 존재한다.

![image](https://user-images.githubusercontent.com/50317129/159114894-ea855a99-8989-4979-adda-72ad93bd0e70.png)

OSM은 사용하기 쉬운 세계지도라는 큰 장점이 있음에도, 저 단점 하나로 인해 국내 서비스용 지도로 사용하기 어렵다.

즉, 예제 이상의 실질적인 서비스에 사용하려면 국내 지리에 특화된 지도가 필요하다.

<br />
<br />
<br />










# VWorld

이 때 고려해볼만한 것이 VWorld 지도다. VWorld는 국가기관인 공간정보산업진흥원에서 제공하는 지도다. 국가기관에서 제공하는 지도인 만큼. OSM보다 국내 지리에 좀 더 특화되어 있다.

VWorld는 API 서비스를 제공하며, URL의 형태로 배경지도를 제공하므로, OpenLayers와 호환성이 좋다.

<br />

VWorld는 여러 타입의 배경지도를 제공하므로, 필요에 맞게 활용할 수 있다.

* 기본지도: 우리가 흔히 사용하는 지도
* 백지도: 일반지도의 흑백버전
* 야간지도: 어두운 배색을 사용하여 야간 가시성을 높인 지도
* 위성지도: 실사지도
* 하이브리드 지도: 도로, 지명만을 강조한 확장용 지도. 단독으로 사용하긴 어렵다.

이 장에서는 OpenLayers를 통해 VWorld를 지도에 띄워본다.

<br />
<br />





## VWorld API Key 발급하기

* [VWorld 홈페이지](https://www.vworld.kr/)

API키를 발급하기 위해선 회원가입이 필요하다. 위 링크에 접속하여 회원가입을 수행하자.

[인증키] - [인증키 발급] 메뉴에서 API 발급을 신청할 수 있다. 발급은 신청 즉시 이루어진다.

-- 사진

요구하는 항목을 작성하고 신청하면 된다.

[브이월드 활용API]는 반드시 [WMTS/TMS API]가 체크되어야 한다.

처음 지급되는 키는 개발키로, 개발키는 3개월 간 유효하며, 최대 3번 연장 가능하다.

안정적인 서비스를 원한다면 운영키 신청을 하면 된다. 최대 10일 정도의 심사기간이 있다. 예제 페이지 같은 사이트는 발급해주지 않는 것 같다.

운영키 역시 무제한은 아니고, 1년 주기로 갱신이 필요하며, 갱신을 요청할 때마다 재심사를 거치는 것 같다.

<br />
<br />





## VWorld API 사용하기

VWorld를 요청하는 방법은 아래와 같다.

``` txt
http://api.vworld.kr/req/wmts/1.0.0/{key}/{layer}/{tileMatrix}/{tileRow}/{tileCol}.{tileType}
```

|    Name    |   Description    |                           Value                            |
| :--------: | :--------------: | :--------------------------------------------------------: |
|    key     | 발급받은 API Key |                                                            |
|   layer    |  요청 지도 타입  |     `Base`, `gray`, `midnight`, `Hybrid`, `Satellite`      |
| tileMatrix |    지도 레벨     | 6 ~ 18 (gray, midnight) / 6 ~ 19 (Base, Hybrid, Satellite) |
|  tileRow   |      y좌표       |                                                            |
|  tileCol   |      x좌표       |                                                            |
|  tileType  |      확장자      |               jpeg (Satellite) / png (other)               |

자세한 정보는 [VWorld WMTS/TMS API 레퍼런스](https://www.vworld.kr/dev/v4dv_wmtsguide_s001.do)에서 확인할 수 있다.

<br />
<br />
<br />










# 웹 사이트에 VWorld 띄우기

## 1. VWorld Source 만들기

OSM의 경우, OpenLayers에서 자체적으로 `OSM`이라는 객체를 제공했으므로 매우 쉽게 사용이 가능했지만, VWorld의 경우 직접 소스를 구성해줄 필요가 있다.

`XYZ`객체를 통해 VWorld 소스를 만들 수 있다.

``` typescript
import XYZ from 'ol/source/XYZ';

const source = new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/API_KEY/Base/{z}/{y}/{x}.png' });
```

위 URL은 VWorld의 기본지도를 호출하는 URL이다.

|            Name            |                                                                     Type                                                                     |    Default     |                                     Description                                      |
| :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------------: | :----------------------------------------------------------------------------------: |
|        attributions        | [ol/source/Source-AttributionLike](https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike) &#124; `undefined` |                |                              기여 문구 (지도 우측 하단)                              |
|  attributionsCollapsible   |                                                                  `boolean`                                                                   |     `true`     |                                 기여 문구 축소 여부                                  |
|         cacheSize          |                                                         `number` &#124; `undefined`                                                          |                |                                    타일 캐시 크기                                    |
|        crossOrigin         |                                                            `string` &#124; `null`                                                            |  `anonymous`   |                                      CORS 속성                                       |
|     ~~imageSmoothing~~     |                                                                  `boolean`                                                                   |     `true`     |                           Deprecated 속성. 보간 사용 여부                            |
|        interpolate         |                                                                  `boolean`                                                                   |     `true`     |                                    보간 사용 여부                                    |
|           opaque           |                                                                  `boolean`                                                                   |     `true`     |                                     불투명 여부                                      |
|         projection         |                    [ol/proj-ProjectionLike](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#~ProjectionLike)                     |  `EPSG:3857`   |                                        좌표계                                        |
| reprojectionErrorThreshold |                                                                   `number`                                                                   |     `0.5`      |                            최대 재투영 오류 픽셀 (0 ~ 1)                             |
|          maxZoom           |                                                                   `number`                                                                   |      `42`      |               최대 줌 레벨. 지정된 줌레벨을 초과할 경우 데이터 미출력                |
|          minZoom           |                                                                   `number`                                                                   |      `0`       |              최소 줌 레벨. 지정된 줌레벨 보다 미만일 경우 데이터 미출력              |
|       maxResolution        |                                                         `number` &#124; `undefined`                                                          |      `0`       |                  줌 레벨 0의 해상도 (`tileGrid`가 있을 경우 미적용)                  |
|          tileGrid          |                           [ol/tilegrid/TileGrid-TileGrid](module:ol/tilegrid/TileGrid~TileGrid) &#124; `undefined`                           |      `0`       |                                     타일 그리드                                      |
|      tileLoadFunction      |             [ol/Tile-LoadFunction](https://openlayers.org/en/latest/apidoc/module-ol_Tile.html#~LoadFunction) &#124; `undefined`             |                |                                    타일 로드 함수                                    |
|       tilePixelRatio       |                                                                   `number`                                                                   |      `1`       |                 타일 픽셀 비율 (값이 2일 경우, 타일 픽셀은 512x512)                  |
|          tileSize          |                      `number` &#124; [ol/size-Size](https://openlayers.org/en/latest/apidoc/module-ol_size.html#~Size)                       | `[ 256, 256 ]` |                     타일 사이즈 (`tileGrid`가 있을 경우 미적용)                      |
|      tileUrlFunction       |              [ol/Tile-UrlFunction](https://openlayers.org/en/latest/apidoc/module-ol_Tile.html#~UrlFunction) &#124; `undefined`              |                |                                    URL 반환 함수                                     |
|            url             |                                                         `string` &#124; `undefined`                                                          |                |               URL 양식. `{x}`, `{y}` 혹은 `{-y}`, `{z}`를 포함해야 함                |
|            urls            |                                                      `Array<string>` &#124; `undefined`                                                      |                |                                    URL 양식 배열                                     |
|           wrapX            |                                                                  `boolean`                                                                   |     `true`     |                                   수직 감싸기 여부                                   |
|         transition         |                                                                   `number`                                                                   |     `250`      |                             렌더링 출력 애니메이션 시간                              |
|         zDirection         | [ol/array-NearestDirectionFunction](https://openlayers.org/en/latest/apidoc/module-ol_array.html#~NearestDirectionFunction) &#124; `number`  |      `0`       | 줌 레벨이 실수(ex. 12.552)일 경우 더 높은 타일을 사용할지, 낮은 타일을 사용할지 여부 |

다른 옵션은 몰라도, 자원의 위치를 제공하는 `url` 혹은 `urls`, `tileUrlFunction`은 반드시 명시해야한다.

`url`의 경우 URL에 리터럴 패턴으로 `{x}`, `{y}`, `{-y}`, `{z}` 등을 입력할 수 있는데, 현재 지도의 x, y, z좌표를 URL에 자동으로 반영해준다.

그 밖의 동적인 URL 생성이 필요하다면 `tileUrlFunction`을 활용하는 것이 좋다.

그 외 사용할 수 있는 옵션과 메서드의 종류는 [ol/source/XYZ](https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html)에서 확인하자.

<br />
<br />





## 2. Layer 만들기

XYZ Source를 담을 Layer 객체를 생성한다. 이 Layer는 할당된 XYZ Source를 통해 VWorld 지도를 표출해줄 것이다.

``` typescript
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

// 기본지도
const vworldBaseLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-base' },
	minZoom: 6,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

// 백지도
const vworldGrayLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/gray/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-gray' },
	minZoom: 6,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

// 야간지도
const vworldMidnightLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/midnight/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-midnight' },
	minZoom: 6,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

// 하이브리드 지도
const vworldHybridLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png' }),
	properties: { name: 'ext-vworld-hybrid' },
	minZoom: 6,
	maxZoom: 19,
	zIndex: 3,
	preload: Infinity
});

// 위성지도
const vworldSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg' }),
	properties: { name: 'base-vworld-satellite' },
	minZoom: 6,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});
```