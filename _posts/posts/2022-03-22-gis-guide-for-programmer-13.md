---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 13. 브라우저에서 사용자 위치정보 수집하기"
excerpt: "이전 장에서 OSM을 통해 지도를 표시해봤다. 하지만, OSM의 지도는 디테일함이 떨어진다는 무시할 수 없는 단점이 존재한다. OSM은 사용하기 쉬운 세계지도라는 큰 장점이 있음에도, 저 단점 하나로 인해 국내 서비스용 지도로 사용하기 어렵다. 즉, 예제 이상의 실질적인 서비스에 사용하려면 국내 지리에 특화된 지도가 필요하다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-03-22T22:37:21+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "GeoServer" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 너의 위치는.

지도 서비스 중에서는 사용자의 위치를 분석하고, 위치에 더욱 적절한 컨텐츠를 제시하기도 한다.

일례로, 배달 어플은 사용자의 위치에 따라 일정 범위 내의 음식점만을 우선으로 보여준다던가 하는 방식이다.

어플리케이션의 경우, 주 구동 기기인 스마트폰의 GPS를 활용할 수 있다. 비슷하게 브라우저는 브라우저 자체적으로 사용자의 동의에 따라 위치정보를 수집하여 활용할 수 있다. 당연하게도 인터넷이 반드시 연결되어야 한다.

> 🔐 <b class="teal-500">사용자의 보안을 위하여!</b>  
> 사용자의 보안을 위해, 개인정보나, 알림 같이 사용자의 동작 없이 발생할 수 있는 요소는 반드시 사용자의 권한을 받아야한다. 만약 권한이 없다면 동작하지 않는다.

브라우저에서 사용자의 위치를 수집하는 기능을 Geolocation(지오 로케이션)이라 명명한다.

지오 로케이션은 사용자의 인터넷 정보에서 위치를 수집하고, 이를 경위도 좌표(EPSG:4326)로 반환한다. 좌표값에 대해선 다른 선택지가 없으므로, 만약 다른 좌표계로의 사용을 원한다면 적절히 변환해야한다.

<br />
<br />





## 지오 로케이션 사용하기

브라우저마다 차이가 발생할 가능성이 있다. 이 문서에서는 Chrome을 기준으로 작성한다.

``` typescript
import { Map } from 'ol';

/**
 * 지오로케이션 호출 메서드
 * 
 * @param {Map} map: 맵 객체
 */
function callGeolocation(map: Map)
{
	// 지오로케이션 사용이 가능할 경우
	if ('geolocation' in navigator)
	{
		navigator.geolocation.getCurrentPosition(position =>
		{
			const { latitude, longitude } = position.coords;

			map.getView().setCenter([ longitude, latitude ])
		}, () => alert('실패'), { enableHighAccuracy: true });
	}

	// 아닐 경우
	else
	{
		alert('사용자 위치를 확인할 수 없습니다.');
	}
}
```

* `getCurrentPosition(success, error, options)`: Geolocation 객체에서 현재 위치를 반환하는 메서드
  * `success`: 성공 콜백
  * `error`: 에러 콜백 (생략 가능)
  * `options`: 옵션 객체 (생략 가능)
* `setCenter(coord)`: 현재 보고있는 맵의 중앙을 지정하는 메서드
  * `coord`: $x$, $y$ 좌표 (경위도는 long, lat)

위와 같이 사용할 수 있다. `navigator` 객체에서 `geolocation`을 사용할 수 있는지 확인하고, 가능하다면 이를 활용하여 위치를 표시하는 방식이다.

