---
title: "OpenLayers를 여행하는 개발자를 위한 안내서 - 16. WMS GetImage를 사용하여 지도에 이미지 표시하기"
excerpt: "이 장에선 WFS를 통해 지도에 이미지를 표시하는 방법에 대해 다룬다. 이전 장의 WFS는 공간정보 데이터를 GeoJSON으로 받아 직접 객체로 표시하지만, WMS는 객체를 GeoServer에서 이미지로 렌더링한 이미지를 받아 표시한다. 즉, GeoServer로 부터 직접 Tile Map을 받아 표현한다고 생각하면 된다."
coverImage: "https://user-images.githubusercontent.com/50317129/156607880-c5abad92-1991-4c01-b85f-7153bf89cb64.png"
date: 1652634790000
type: "projects"
category: "GIS"
tag: [ "GIS", "GeoServer", "OpenLayers", "OGC", "WMS" ]
group: "OpenLayers를 여행하는 개발자를 위한 안내서"
comment: true
publish: true
---

# WMS

이 장에선 <span class="blue-400">WFS</span>를 통해 지도에 이미지를 표시하는 방법에 대해 다룬다.

이전 장의 WFS는 공간정보 데이터를 GeoJSON으로 받아 직접 객체로 표시하지만, WMS는 객체를 GeoServer에서 이미지로 렌더링한 이미지를 받아 표시한다.

즉, GeoServer로 부터 직접 Tile Map을 받아 표현한다고 생각하면 된다.

<br />
<br />
<br />










# WMS를 활용하여 지도에 표시하기

WMS를 표시하기 위해, 총 4개 객체가 필요하다. WMS는 이미지를 받아 표시하므로, 이 이미지를 담을 `ImageWMS`, 이를 활용하여 지도에 렌더링하는 `ImageLayer`. 나머지 `View`와 `Map` 객체가 필요하다

이 4가지 요소를 구현하는 방법을 차례로 설명하여, 최종적으로 WMS를 활용한 지도를 만든다.

<br />
<br />





## 1. GetImage URL 구성하기

GeoServer를 통해 데이터를 구축했던 데이터를 통해 WMS 이미지를 호출한다.

WMS 중에서도, 속성정보를 제공하는 `GetImage`를 사용한다. `GetImage`의 요청방법은 아래와 같다.

``` txt
GET https://example.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&layers=test:building&exceptions=application%2Fjson&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=14168061.814827133%2C4367306.048101831%2C14168367.562940273%2C4367611.796214972
```

|  Parameter  |              Example              | Require |                                      Description                                      |
| :---------: | :-------------------------------: | :-----: | :-----------------------------------------------------------------------------------: |
|   service   |            WMS (고정)             |    Y    |                                       서비스명                                        |
|   version   | 1.3.0 (고정), 1.1.1, 1.1.0, 1.0.0 |    Y    |                                         버전                                          |
|   request   |           GetMap (고정)           |    Y    |                                        요청명                                         |
|   layers    |       repo_name:layer_name        |    Y    |                             레이어명 (다수는 쉼표로 구분)                             |
|   styles    |              style1               |         | 적용할 스타일명 (비울 경우 GeoServer에서 설정한 기본 스타일 적용, 다수는 쉼표로 구분) |
| srs(or crs) |             EPSG:4326             |         |                  기준 좌표계 (비울 경우 레이어의 기본 좌표계로 인식)                  |
|    bbox     | $x_{min},y_{min},x_{max},y_{max}$ |    Y    |                                   이미지 영역 좌표                                    |
|    width    |                256                |    Y    |                                      이미지 넓이                                      |
|   height    |                256                |    Y    |                                      이미지 높이                                      |
|   format    |             image/png             |    Y    |                                        요청명                                         |
| transparent |           false (기본)            |         |                                    배경 투명 여부                                     |
|   bgcolor   |           FFFFFF (기본)           |         |                                RRGGBB 형태의 배경 색상                                |
| exceptions  | application/vnd.ogc.se_xml (기본) |         |                                    예외 응답 형식                                     |
|    time     |   2022-03-14T22:30.27.520+09:00   |         |                 시계열 데이터를 위한 시간 (yyyy-MM-ddThh:mm:ss.SSSZ)                  |
|     sld     |    https://example.com/sld.xml    |         |                                     XML 파일 경로                                     |
|  sld_body   |            <sld></sld>            |         |                                        SLD XML                                        |

하지만 WMS의 URL, WFS에 비해 요구하는 파라미터의 갯수가 많아 다소 복잡하다. WFS에선, `VectorSource`에 직접 URL을 입력했지만, WMS의 소스 객체인 `ImageWMS`의 경우 몇 가지 필요한 값을 입력하면 알아서 URL을 만들어 호출해준다.

그냥 WMS는 이런 방식으로 직접 호출한다고만 알고 넘어가자.

<br />
<br />





## 2. ImageWMS 생성하기

OpenLayers의 `ImageWMS` 객체는 주어진 값을 통해 WMS URL을 생성해 호출한다.

``` typescript
import { ImageWMS } from 'ol/source';

const source = new ImageWMS({
	url: 'https://example.com/geoserver/wms',
	params: {
		layers: 'test:building',
		exceptions: 'application/json'
	},
	serverType: 'geoserver'
});
```

`ImageWMS`에 대한 전체 정보는 [공식 문서](https://openlayers.org/en/latest/apidoc/module-ol_source_ImageWMS-ImageWMS.html)에서 확인할 수 있다.

설정의 세부 내용은 아래와 같다.

|        Name        |                                                                     Type                                                                     | Default |                                                                                                    Description                                                                                                    |
| :----------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    attributions    | [ol/source/Source-AttributionLike](https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike) &#124; `undefined` |         |                                                                                            기여 문구 (지도 우측 하단)                                                                                             |
|    crossOrigin     |                                                  `null` &#124; `string` &#124; `undefined`                                                   |         |                                                         이미지의 CORS 속성 ([참조](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image))                                                         |
|       hidpi        |                                                                  `boolean`                                                                   | `true`  |                                                                         원격 서버에 WMS를 요청할 때, `Map` 객체의 `pixelRatio` 값을 사용                                                                          |
|     serverType     |  [ol/source/WMSServerType](https://openlayers.org/en/latest/apidoc/module-ol_source_WMSServerType.html) &#124; `string` &#124; `undefined`   |         |                                                              WMS 서버의 타입 (`mapserver`, `geoserver`, `qgis` 등)<br />`hidpi`가 `true`일 때만 필요                                                              |
| imageLoadFunction  |            [ol/Image-LoadFunction](https://openlayers.org/en/latest/apidoc/module-ol_Image.html#~LoadFunction) &#124; `undefined`            | `true`  |                                                                   WMS URL의 이미지를 로드 메서드<br />WMS 호출 메서드를 오버라이딩할 때 사용함                                                                    |
| ~~imageSmoothing~~ |                                                                  `boolean`                                                                   | `true`  |                                                                              Deprecated된 속성으로, `interpolate`를 사용하길 권고함                                                                               |
|    interpolate     |                                                                  `boolean`                                                                   | `true`  |                                                                                           리샘플링 시 보간 값 사용 여부                                                                                           |
|       params       |                                                                   `object`                                                                   |         | WMS 요청 파라미터. 반드시 하나 이상의 `LAYERS`를 입력해야 함<br />`STYLES`는 기본적으로 `''`로 빈 값을 가짐<br/>`VERSION`은 `1.3.0`을 기본값으로 가짐<br />`WIDTH`, `HEIGHT`, `BOX`, `CRS(SRS)`는 동적으로 설정됨 |
|     projection     |           [ol/proj-ProjectionLike](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#~ProjectionLike) &#124; `undefined`           |         |                                                                     프로젝션 객체. `Map`의 `View` 객체에 선언된 `projection`을 기본값으로 함                                                                      |
|       ratio        |                                                                   `number`                                                                   |  `1.5`  |                                  이미지 요청 시 사용할 뷰포트의 크기. 1은 맵 뷰포트와 동일하며, 2는 맵 뷰포트가 가진 폭, 높이의 두배를 의미함<br />반드시 1 이상의 값을 가져야함                                  |
|    resolutions     |                                                      `Array<number>` &#124; `undefined`                                                      |         |                                                                       해상도. 특정 해상도를 지정할 경우, 지정된 해상도에서만 호출이 발생함                                                                        |
|        url         |                                                                   `string`                                                                   |         |                                                                                                      WMS URL                                                                                                      |

`url`, `params.layers`는 반드시 입력해야 정상적인 WMS 호출을 수행할 수 있다. 위 두 값만 입력하면, WMS에 필요한 나머지 파라미터는 `ImageWMS`에서 알아서 계산해 넣어준다.

<br />
<br />





## 3. TileLayer 생성하기

OpenLayers의 `TileLayer` 객체는 `ImageWMS`로 호출한 이미지를 통해 지도를 렌더링한다. 이 지도는 배경지도와 같은 이미지로 이루어져있다.

``` typescript
import ImageLayer from 'ol/layer/Image';

const layer = new TileLayer({
	source: source,
	minZoom: 15,
	properties: { name: 'wms' },
	zIndex: 5
});
```

|     Name      |                                                                                                                               Type                                                                                                                                |  Default   |                            Description                            |
| :-----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :---------------------------------------------------------------: |
|   className   |                                                                                                                             `string`                                                                                                                              | `ol-layer` |                             클래스명                              |
|    opacity    |                                                                                                                             `number`                                                                                                                              |    `1`     |                          투명도 (0 ~ 1)                           |
|    visible    |                                                                                                                             `boolean`                                                                                                                             |   `true`   |                             표시 여부                             |
|    extent     |                                                                           [ol/extent-Extent](https://openlayers.org/en/latest/apidoc/module-ol_extent.html#~Extent) &#124; `undefined`                                                                            |            | 레이어의 렌더링 범위. 해당 범위를 넘어가면 데이터를 표시하지 않음 |
|    zIndex     |                                                                                                                    `number` &#124; `undefined`                                                                                                                    |            |                  우선 순위 (높을수록 위에 표시)                   |
| minResolution |                                                                                                                    `number` &#124; `undefined`                                                                                                                    |            |                         최소 표시 해상도                          |
| maxResolution |                                                                                                                    `number` &#124; `undefined`                                                                                                                    |            |                         최대 표시 해상도                          |
|    minZoom    |                                                                                                                    `number` &#124; `undefined`                                                                                                                    |            |                         최소 표시 줌 레벨                         |
|    maxZoom    |                                                                                                                    `number` &#124; `undefined`                                                                                                                    |            |                         최대 표시 줌 레벨                         |
|      map      |                                                                [ol/PluggableMap-PluggableMap](https://openlayers.org/en/latest/apidoc/module-ol_PluggableMap-PluggableMap.html) &#124; `undefined`                                                                |            |        지정한 `Map` 객체에서 해당 레이어를 오버레이로 사용        |
|    source     | ([ol/source/Image-ImageSource](https://openlayers.org/en/latest/apidoc/module-ol_source_Image-ImageSource.html) &#124; [ol/source/VectorTile-VectorTile](https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html)) &#124; `undefined` |            |                           레이어의 소스                           |
|  properties   |                                                                                                                    `object` &#124; `undefined`                                                                                                                    |            |             임의 속성. `get()`, `set()`으로 조작 가능             |

`ImageLayer`에 대한 전체 정보는 [ol/layer/Image-ImageLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Image-ImageLayer.html)에서 확인할 수 있다.

<br />
<br />





## 4. View 만들기

지도의 뷰잉 정보를 선언할 View 객체를 생성한다.

``` typescript
import View from 'ol/View';
import proj4 from 'proj4';

const view = new View({
	projection: 'EPSG:3857',
	center: proj4('EPSG:4326', 'EPSG:3857', [ 127.28923267492068, 36.48024986578043 ]),
	zoom: 17
});
```

|            Name            |                                                             Type                                                             |     Default      |                                            Description                                            |
| :------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------: | :-----------------------------------------------------------------------------------------------: |
|           center           | [ol/coordinate-Coordinate](https://openlayers.org/en/latest/apidoc/module-ol_coordinate.html#~Coordinate) &#124; `undefined` |                  |                                            지도의 중심                                            |
|     constrainRotation      |                                                  `boolean` &#124; `number`                                                   |      `true`      |          회전 구속 여부. 숫자일 경우 회전 가능 갯수를 의미 (0일 경우, 90, 180, 270, 360)          |
|       enableRotation       |                                                          `boolean`                                                           |      `true`      |                                          회전 가능 여부                                           |
|           extent           |         [ol/extent-Extent](https://openlayers.org/en/latest/apidoc/module-ol_extent.html#~Extent) &#124; `undefined`         |                  |                         지도의 뷰잉 범위. 지정된 범위 밖을 벗어날 수 없음                         |
|    constrainOnlyCenter     |                                                          `boolean`                                                           |     `false`      |          `true`일 경우 extent 제한이 View 중심에만 적용되며, 전체 extent에 적용되지 않음          |
|   smoothExtentConstraint   |                                                          `boolean`                                                           |      `true`      |                          View가 extent 범위를 약간 벗어날 수 있는지 여부                          |
|       maxResolution        |                                                 `number` &#124; `undefined`                                                  |                  |                          최대 뷰잉 해상도. 지정 해상도 이상 확대 불가능.                          |
|       minResolution        |                                                 `number` &#124; `undefined`                                                  |                  |                          최소 뷰잉 해상도. 지정 해상도 이상 축소 불가능.                          |
|          maxZoom           |                                                           `number`                                                           |       `28`       |                         최대 뷰잉 줌 레벨. 지정 줌 레벨 이상 확대 불가능.                         |
|          minZoom           |                                                           `number`                                                           |       `0`        |                         최소 뷰잉 줌 레벨. 지정 줌 레벨 이상 축소 불가능.                         |
|         multiWorld         |                                                          `boolean`                                                           |     `false`      |                                        다중 월드 사용 여부                                        |
|    constrainResolution     |                                                          `boolean`                                                           |     `false`      |                                     줌 레벨 정수만 허용 여부                                      |
| smoothResolutionConstraint |                                                          `boolean`                                                           |      `true`      |                                  느슨한 확대/축소 규칙 사용 여부                                  |
|       showFullExtent       |                                                          `boolean`                                                           |     `false`      |                                   전체 구성된 extent 표시 여부                                    |
|         projection         |            [ol/proj-ProjectionLike](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#~ProjectionLike)             |   `EPSG:3857`    |                                              좌표계                                               |
|         resolution         |                                                 `number` &#124; `undefined`                                                  |                  |                                            초기 해상도                                            |
|        resolutions         |                                              `Array<number>` &#124; `undefined`                                              |                  | 사용 가능한 해상도 목록 (내림차순) `max/minResolution`, `max/minZoom`, `zoomFactor` 옵션이 무시됨 |
|          rotation          |                                                           `number`                                                           |       `0`        |                                            기본 회전값                                            |
|            zoom            |                                                 `number` &#124; `undefined`                                                  |                  |                                           기본 줌 레벨                                            |
|         zoomFactor         |                                                           `number`                                                           |       `2`        |                                              줌 배율                                              |
|          padding           |                                                       `Array<number>`                                                        | `[ 0, 0, 0, 0 ]` |                                               패딩                                                |

<br />
<br />





## 5. Style 정의하기

WMS 역시 이미지에 그려지는 요소를 스타일링할 수 있다.

WFS는 스타일 객체를 코드 내부에서 기술할 수 있었지만, WMS는 기본적으로 GeoServer와 같은 백엔드 영역에서 이루어지므로, 해당 서버에서 직접 스타일을 기술해준다.

보통 XML 형태로 기술하며, 이를 `SLD`라 부른다.

<br />

GeoServer의 경우, [스타일] 메뉴에서 관리할 수 있다. 별다른 조작을 하지 않았다면, 즉시 사용 가능한 몇 가지 SLD가 기본으로 탑재된다.

레이어 추가 시 [발행] 단계에서 스타일 설정을 할 수 있는데, 이 때 설정하는 것이 WMS에 사용할 SLD다.

여러개를 등록할 수도 있으며, 이 경우 `STYLES`에 명시된 이름으로 원하는 스타일을 호출할 수 있다. `STYLES`의 기본값은 `''`로 비어있으며, 이 경우 지정된 기본 스타일을 사용하여 이미지를 렌더링한다.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
 xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
 xmlns="http://www.opengis.net/sld" 
 xmlns:ogc="http://www.opengis.net/ogc" 
 xmlns:xlink="http://www.w3.org/1999/xlink" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- a Named Layer is the basic building block of an SLD document -->
  <NamedLayer>
    <Name>default_polygon</Name>
    <UserStyle>
    <!-- Styles can have names, titles and abstracts -->
      <Title>Default Polygon</Title>
      <Abstract>A sample style that draws a polygon</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- A FeatureTypeStyle for rendering polygons -->
      <FeatureTypeStyle>
        <Rule>
          <Name>rule1</Name>
          <Title>Gray Polygon with Black Outline</Title>
          <Abstract>A polygon with a gray fill and a 1 pixel black outline</Abstract>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ED143D</CssParameter>
              <CssParameter name="opacity">0.6</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#ED143d</CssParameter>
              <CssParameter name="stroke-width">2</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
          <TextSymbolizer>
            	  <Geometry>
	    <ogc:Function name="centroid">
	      <ogc:PropertyName>SHAPE</ogc:PropertyName>
	    </ogc:Function>
	  </Geometry>
            <Label>
              <ogc:PropertyName>buld_nm</ogc:PropertyName>
            </Label>
            <Font>
              <CssParameter name="font-family">sans-serif</CssParameter>
              <CssParameter name="font-size">16</CssParameter>
            </Font>
            <LabelPlacement>
              <PointPlacement>
                <AnchorPoint>
                  <AnchorPointX>0.5</AnchorPointX>
                  <AnchorPointY>0.5</AnchorPointY>
                </AnchorPoint>
                <Displacement>
                  <DisplacementX>0</DisplacementX>
                  <DisplacementY>0</DisplacementY>
                </Displacement>
              </PointPlacement>
            </LabelPlacement>
            <Halo>
              <Radius>
                <ogc:Literal>2</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#000000</CssParameter>
              </Fill>
            </Halo>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
            </Fill>
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
```

위 SLD는 실제로 프로젝트의 WMS 요청에서 사용하는 SLD다. WFS에서 스타일 기술에 대한 문단을 읽어봤다면 이해가 더욱 쉬울 것이다. XML의 특성 상 복잡해보이지만, 잘 뜯어보면 별거 없다.

마찬가지로 `Point`와 `Polygon` 등, 데이터 형식에 따라 기술되는 형태가 조금씩 다르다.

<br />

굳이 GeoServer에 SLD를 기술하지 않아도 원하는 디자인을 사용할 수 있는 방법이 있는데, WMS의 요청 파라미터 중 `sld_body`를 활용하면 가능하다.

`sld_body`에 SLD를 직접 입력하면, 해당 SLD를 우선으로 적용한다. 파라미터의 내용은 SLD 그대로를 입력한다.

<br />
<br />





## 6. Map 만들기

모든 정보를 종합하여 지도를 만드는 Map 객체를 생성한다.

``` typescript
import Map from 'ol/Map';
import { ImageWMS } from 'ol/source';
import ImageLayer from 'ol/layer/Image';
import View from 'ol/View';
import proj4 from 'proj4';

// WMS 소스 객체
const source = new ImageWMS({
	url: 'https://example.com/geoserver/wms',
	params: {
		layers: 'test:building',
		exceptions: 'application/json'
	},
	serverType: 'geoserver'
});

// WMS 레이어 객체
const layer = new ImageLayer({
	source: source,
	minZoom: 15,
	properties: { name: 'wms' },
	zIndex: 5
});

// 뷰 객체
const view = new View({
	projection: 'EPSG:3857',
	center: proj4('EPSG:4326', 'EPSG:3857', [ 127.28923267492068, 36.48024986578043 ]),
	zoom: 17
});

// 맵 객체
const map = new Map({
	layers: [ vworldBaseLayer, vworldHybridLayer, wfsLayer ],
	target: 'map',
	view: view
});
```

|        Name         |                                                                                                                                                                                                                                    Type                                                                                                                                                                                                                                    |                                             Default                                             |                          Description                           |
| :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------: |
|      controls       |                                                    [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/control/Control-Control](https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html)> &#124; Array<[ol/control/Control-Control](https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html)> &#124; `undefined`                                                    | [ol/control/defaults](https://openlayers.org/en/latest/apidoc/module-ol_control.html#.defaults) |                        지도 컨트롤 객체                        |
|     pixelRatio      |                                                                                                                                                                                                                                  `number`                                                                                                                                                                                                                                  |                                    `window.devicePixelRatio`                                    |                         기기 픽셀 비율                         |
|    interactions     |                            [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/interaction/Interaction-Interaction](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html)> &#124; Array<[ol/interaction/Interaction-Interaction](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html)> &#124; `undefined`                            |                                                                                                 |                                                                |
| keyboardEventTarget |                                                                                                                                                                                                     `HTMLElement` &#124; `Document` &#124; `string` &#124; `undefined`                                                                                                                                                                                                     |                                                                                                 |                    키보드 이벤트 대상 요소                     |
|       layers        | Array<[ol/layer/Base-BaseLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html)> &#124; [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/layer/Base-BaseLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html)> &#124; [ol/layer/Group-LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) &#124; `undefined` |                                                                                                 |       레이어 목록. 배열 뒤에 있을 수록 우선순위가 높아짐       |
|   maxTilesLoading   |                                                                                                                                                                                                                                  `number`                                                                                                                                                                                                                                  |                                              `16`                                               |                 동시 로드 가능한 최대 타일 수                  |
|    moveTolerance    |                                                                                                                                                                                                                                  `number`                                                                                                                                                                                                                                  |                                               `1`                                               | 지도 이동 이벤트로 인식하기 위해 마우스가 움직여야할 최소 픽셀 |
|      overlays       |                                                                    [ol/Collection-Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html)<[ol/Overlay-Overlay](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html)> &#124; Array<[ol/Overlay-Overlay](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html)> &#124; `undefined`                                                                    |                                                                                                 |                       지도 오버레이 객체                       |
|       target        |                                                                                                                                                                                                              `HTMLElement` &#124; `string` &#124; `undefined`                                                                                                                                                                                                              |                                                                                                 |               지도를 표시할 DOM 혹은 DOM 아이디                |
|        view         |                                                                                                                                    [ol/View-View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html) &#124; Promise<[ol/View-View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html)> &#124; `undefined`                                                                                                                                    |                                                                                                 |                          지도 뷰 객체                          |

`Map` 객체에 지금까지 선언한 객체들을 할당한다. `target`에 지정된 DOM에 선언된 지도가 표시된다.

`target: map`은 아이디가 `map`인 DOM에 지도를 표시한다는 뜻이다. 꼭 아이디가 아니더라도 `HTMLElement`를 할당할 수도 있다.

WMS로 호출한 이미지가 지도에 표시되는 것을 확인할 수 있다.

<br />
<br />



## 6-1. WMS 호출 방식

OpenLayers에서 제공하는 WMS 호출 방식에는 두 가지가 존재한다. 현재 영역의 전체 이미지를 불러오는 `Image` 방식과, 여러 격자로 쪼개서 불러오는 `Tile` 방식이 있다.

이 장에서는 현재 영역의 전체 이미지를 호출하는 `Image` 방식을 기술했다.

만약, 타일 형태로 WMS를 호출하고 싶다면, `TileWMS`와 `TileLayer`를 사용하면 된다. 사용법은 동일하다. 이 장에서 설명한 코드를 기준으로 `ImageWMS`를 `TileWMS`로 바꾸기만 해도 이상이 없는 수준. `TileLayer`도 마찬가지.

<br />

![null](https://user-images.githubusercontent.com/50317129/168485084-f83cabf6-1bc7-4bd1-9b35-0b94c0c634e3.png)

두 방식의 차이를 도식화하면 위 그림과 같다. 배경지도 또한 `TileWMS` 방식을 사용한다.

* <span class="teal-600">Image 방식</span>
  * WMS 호출이 한 번만 가므로, 요청 수를 줄일 수 있다.
  * 응답 하나의 용량이 상대적으로 크며, 속도가 느리다.

* <span class="teal-600">Tile 방식</span>
  * Image 방식 대비 WMS 호출 요청이 훨씬 많아진다.
  * 작은 이미지를 여러개 호출하므로, 상대적으로 속도가 빠르다.

차이를 확인하고, 자신의 서비스에 더 적합한 방식을 채택하면 된다.

배경 지도 또한 일종의 `TileWMS`와 같다.

<br />
<br />
<br />










# 예제 확인하기

![null](https://user-images.githubusercontent.com/50317129/168484353-f85aee8e-922c-453e-877b-d14f757c095b.png)

[OpenLayers6 Sandbox - WMS](https://project.itcode.dev/gis-dev/wms)에서 이를 구현한 예제를 확인할 수 있다.

<br />

GeoServer를 통해 공간정보 데이터를 호출하여, OpenLayers가 지도에 렌더링하는 걸 확인할 수 있다.