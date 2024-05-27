---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 14. 지도에 사용자의 위치 표시하기"
excerpt: "사용자의 위치를 기반으로 다양한 서비스를 제공할 수 있겠지만, 그 중에서 가장 기본적인 기능은 사용자의 위치를 지도 상에 직접 표시하는 것이다. 이전 장에서 설명한 지오로케이션을 토대로, OpenLayers를 활용하여 위치를 지도에 표시한다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1649004963000
type: "projects"
category: "GIS"
tag: [ "GIS", "OpenLayers" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# 지오로케이션 응용하기

사용자의 위치를 기반으로 다양한 서비스를 제공할 수 있겠지만, 그 중에서 가장 기본적인 기능은 사용자의 위치를 지도 상에 직접 표시하는 것이다.

이전 장에서 설명한 지오로케이션을 토대로, OpenLayers를 활용하여 위치를 지도에 표시한다.

<br />

지도에 사용자의 위치를 표시한다는 것은 곧 피쳐(Feature)를 하나 추가한다는 의미다. 피쳐를 관리하는 1차적인 주체는 소스고, 소스는 레이어가 관리하므로, 피쳐를 추가할 레이어를 선택하는 것이 우선이다.

이를 위해, 사용자의 위치 표시용 레이어를 추가하는 작업이 선행되야한다. 이후 해당 레이어에 피쳐를 추가하면 된다. 따라서 아래와 같은 동작 흐름을 가진다.

1. 버튼 컴포넌트의 렌더링 과정에서, 전용 레이어로 사용할 `VectorLayer`를 하나 추가한다.
2. 버튼 클릭 시, 지오로케이션을 수행하여 사용자의 위치를 구한다.
3. `VectorSource`를 생성하여 레이어에 추가한다.
4. 사용자의 위치를 활용하여 `Feature`를 생성한다.
5. 생성한 피쳐를 `VectorSource`에 추가한다.

"기존에 이미 추가된 레이어를 활용하면 되지 않나?"라고 생각할 수도 있겠지만, 전용 레이어를 하나 두는 것이 관리 측면에서 훨씬 유용하다.

기존의 레이어를 활용할 경우, 해당 레이어가 원래 지니고있던 `Source` 객체에 원치않는 영향을 줄수도 있으며, 레이어들 중 `VectorLayer`가 없을 경우 결국 하나 추가해줘야한다.

<br />
<br />
<br />










# 현재 위치 이동 및 표시 버튼 컴포넌트 만들기

``` tsx
/**
 * 위치 마커 추가 버튼 Element 반환 메서드
 *
 * @param {SubProps} props: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
export function LocationWithMarker({ map }: SubProps)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		// 드래그 할 경우, 레이어의 Feature를 전부 초기화
		map.on('pointerdrag', () =>
		{
			map.getAllLayers().filter(layer => layer.get('name') === 'location')[0].getSource().clear();
		});

		// location 벡터 레이어가 없을 경우
		if (map.getAllLayers().filter(layer => layer.get('name') === 'location').length === 0)
		{
			// 전용 레이어를 하나 추가함
			map.addLayer(new VectorLayer({
				source: new VectorSource(),
				properties: {
					name: 'location'
				},
				style: new Style({
					image: new Icon({
						src: 'https://tsauerwein.github.io/ol3/animation-flights/examples/data/icon.png'
					})
				}),
				minZoom: 15,
				zIndex: 10
			}));
		}

		const onClick = () =>
		{
			// 지오로케이션 사용이 가능할 경우
			if ('geolocation' in navigator)
			{
				const tag = document.querySelector('button.location') as HTMLButtonElement;

				navigator.geolocation.getCurrentPosition(position =>
				{
					const { latitude, longitude } = position.coords;

					// 지도 이동
					map.getView().setCenter([ longitude, latitude ]);

					// location 레이어의 Source에 Feature를 추가
					map.getAllLayers().filter(layer => layer.get('name') === 'location')[0].getSource().addFeature(new Feature({
						geometry: new Point([ longitude, latitude ])
					}));
				}, () => alert('실패'), { enableHighAccuracy: true });
			}

			// 아닐 경우
			else
			{
				alert('사용자 위치를 확인할 수 없습니다.');
			}
		};

		return (
			<button className='location' title='현재 위치 이동' onClick={onClick}><BiCurrentLocation size={25} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}
```

큰 틀은 이전 장의 `Location` 컴포넌트와 동일하지만, 몇 가지 차이점이 존재한다.

<br />

* 드래그 이벤트

``` typescript
// 드래그 할 경우, 레이어의 Feature를 전부 초기화
map.on('pointerdrag', () =>
{
	map.getAllLayers().filter(layer => layer.get('name') === 'location')[0].getSource().clear();
});
```

드래그 이벤트를 추가하여, 지도를 드래그할 때마다 location 레이어의 Feature를 전부 초기화하도록 구성한다.

즉, 사용자가 지도를 드래그할 경우, 지도에 표시된 사용자의 현재 위치는 삭제된다.

<br />

* 전용 레이어 추가

``` typescript
// location 벡터 레이어가 없을 경우
if (map.getAllLayers().filter(layer => layer.get('name') === 'location').length === 0)
{
	// 전용 레이어를 하나 추가함
	map.addLayer(new VectorLayer({
		source: new VectorSource(),
		properties: {
			name: 'location'
		},
		style: new Style({
			image: new Icon({
				src: 'https://tsauerwein.github.io/ol3/animation-flights/examples/data/icon.png'
			})
		}),
		minZoom: 15,
		zIndex: 10
	}));
}
```

전용 레이어가 없을 경우, 해당 레이어를 하나 추가해준다. 이러한 구성으로 `LocationWithMarker` 컴포넌트를 단순히 사용하는 것만으로 전용 레이어 추가가 가능하다.

<br />

* Feature 추가

``` typescript
// location 레이어의 Source에 Feature를 추가
map.getAllLayers().filter(layer => layer.get('name') === 'location')[0].getSource().addFeature(new Feature({
	geometry: new Point([ longitude, latitude ])
}));
```

Geolocation을 통해 수집한 위치 정보로 `Feature`를 생성하여 추가한다.

<br />

``` tsx
<LocationWithMarker map={mapState} />
```

사용법은 위와 같다. 만약, `map`을 프로퍼티로 지정하지 않을 경우 `null`을 반환하도록 구성하여 버튼이 표시되지 않도록한다.

<br />

이러한 기능은 해당 프로젝트의 `MapInteraction` 컴포넌트의 하위 `LocationWithMarker` 컴포넌트로 구현되어있다.

<br />
<br />
<br />










# 예제 확인하기

![null](https://user-images.githubusercontent.com/50317129/164761803-940e951e-3ae7-448a-af94-b4857f68c368.png)

[OpenLayers6 Sandbox - Feature](https://project.itcode.dev/gis-dev/feature)에서 이를 구현한 예제를 확인할 수 있다.

좌측 하단의 녹색 버튼을 클릭하여 사용자의 위치로 이동되며, 위치를 파란색 원으로 표시해준다.

인터넷 회선 구성에 따라, 사용자의 실제 위치가 아닌 회선 서버의 물리적 위치가 뜨는 경우도 있으니 참고할 것.

LTE나 5G 같은 모바일 인터넷은 이러한 문제가 발생하지 않으나, LAN 같은 유선 인터넷 중에선 간혹 자신의 위치가 아닌 서버 위치가 뜨는 경우가 왕왕 있다.