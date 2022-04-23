---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 13. 브라우저에서 사용자 위치정보 수집하기"
excerpt: "지도 서비스 중에서는 사용자의 위치를 분석하고, 위치에 더욱 적절한 컨텐츠를 제시하기도 한다. 일례로, 배달 어플은 사용자의 위치에 따라 일정 범위 내의 음식점만을 우선으로 보여준다던가 하는 방식이다. 어플리케이션의 경우, 주 구동 기기인 스마트폰의 GPS를 활용할 수 있다. 비슷하게 브라우저는 브라우저 자체적으로 사용자의 동의에 따라 위치정보를 수집하여 활용할 수 있다. 당연하게도 인터넷이 반드시 연결되어야 한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: "2022-04-03T02:50:05+09:00"
type: "posts"
category: "GIS"
tag: [ "GIS", "OpenLayers" ]
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

<br />
<br />
<br />










# 현재 위치 이동 버튼 컴포넌트 만들기

현재 위치로 이동하는 버튼 컴포넌트를 만들어보자. 지도 상의 적절한 위치에 버튼을 만들고, 버튼을 클릭할 경우 지오로케이션을 사용하여 해당 위치로 이동하도록 구성하면 될 것이다.

``` tsx
interface SubProps
{
	map?: Map
}

/**
 * 위치 버튼 JSX 반환 메서드
 *
 * @param {SubProps} props: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export function Location({ map }: SubProps)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		const onClick = () =>
		{
			// 지오로케이션 사용이 가능할 경우
			if ('geolocation' in navigator)
			{
				navigator.geolocation.getCurrentPosition(position =>
				{
					const { latitude, longitude } = position.coords;

					map.getView().setCenter([ longitude, latitude ]);
				}, () => alert('실패'), { enableHighAccuracy: true });
			}

			// 아닐 경우
			else
			{
				alert('사용자 위치를 확인할 수 없습니다.');
			}
		};

		return (
			<button className='location' onClick={onClick}>현재 위치</button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}
```

본 프로젝트에선 위와 비슷한 형식으로 구성했다.

``` tsx
<Location map={mapState} />
```

사용법은 위와 같다. 만약, `map`을 프로퍼티로 지정하지 않을 경우 `null`을 반환하도록 구성하여 버튼이 표시되지 않도록한다. 어차피 `Map` 객체가 없다면, 지도를 이동시킬 수 없기 때문에 무용지물이다.

<br />

이러한 기능은 해당 프로젝트의 `MapInteraction` 컴포넌트의 하위 `Location` 컴포넌트로 구현되어있다.

<br />
<br />
<br />










# 예제 확인하기

![image](https://user-images.githubusercontent.com/50317129/164761620-8d521f09-59c0-47bc-a2cc-4ac2a2dd8042.png)

[OpenLayers6 Sandbox - Geolocation](https://project.itcode.dev/gis-dev/geolocation)에서 이를 구현한 예제를 확인할 수 있다.

좌측 하단의 녹색 버튼을 클릭하여 사용자의 위치로 이동할 수 있다.

인터넷 회선 구성에 따라, 사용자의 실제 위치가 아닌 회선 서버의 물리적 위치가 뜨는 경우도 있으니 참고할 것.

LTE나 5G 같은 모바일 인터넷은 이러한 문제가 발생하지 않으나, LAN 같은 유선 인터넷 중에선 간혹 자신의 위치가 아닌 서버 위치가 뜨는 경우가 왕왕 있다.