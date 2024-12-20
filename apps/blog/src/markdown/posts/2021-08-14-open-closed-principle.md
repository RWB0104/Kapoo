---
title: "[OOP] 객체지향 5원칙(SOLID) - 개방-폐쇄 원칙 OCP (Open-Closed Principle)"
excerpt: "개방 폐쇄 원칙이란 객체를 다룸에 있어서 객체의 확장은 개방적으로, 객체의 수정은 폐쇄적으로 대하는 원칙이다. 한 마디로, 보여줄 건 보여주고, 숨길 건 숨긴다는 의미. 좀 더 쉽게 말하자면, 기능이 변하거나 확장 가능하지만, 해당 기능의 코드는 수정하면 안 된다는 뜻이다. 그런데 이 원칙, 말이 좀 이상하다. 기능이 변하는 거 OK. 확장되는 거 OK. 근데 코드를 수정하면 안 된다?? 다소 이해가 되지 않는 요구사항이다. 만약, 객체 하나를 수정한다고 가정하자. 이 때 단순히 해당 객체만 수정하는 것 뿐만 아니라 해당 객체에 의존하는 다른 객체들의 코드까지 줄줄이 고쳐야한다면 좋은 설계로 보기 힘들다. 대표적으로 라이브러리를 생각해보자. 라이브러리를 사용하는 객체의 코드가 변경된다고 해서 라이브러리 코드까지 변경하지 않는다. 이처럼 개방-폐쇄 원칙은 각 객체의 모듈화와 정보 은닉의 올바른 구현을 추구하며, 이를 통해 객체 간의 의존성을 최소화하여 코드 변경에 따른 영향력을 낮추기 위한 원칙이다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: 1628881480000
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "객체지향 5원칙", "개방-폐쇄 원칙", "OCP" ]
group: "객체지향"
comment: true
publish: true
---

# 개방-폐쇄 원칙 OCP (Open-Closed Principle)

<span class="orange-400">개방 폐쇄 원칙</span>이란 객체를 다룸에 있어서 <span class="red-600">객체의 확장은 개방적으로, 객체의 수정은 폐쇄적</span>으로 대하는 원칙이다. 한 마디로, 보여줄 건 보여주고, 숨길 건 숨긴다는 의미.

좀 더 쉽게 말하자면, 기능이 변하거나 확장 가능하지만, 해당 기능의 코드는 수정하면 안 된다는 뜻이다. 그런데 이 원칙, 말이 좀 이상하다. 기능이 변하는 거 OK. 확장되는 거 OK. 근데 코드를 수정하면 안 된다?? 다소 이해가 되지 않는 요구사항이다.

만약, 객체 하나를 수정한다고 가정하자. 이 때 단순히 해당 객체만 수정하는 것 뿐만 아니라 해당 객체에 의존하는 다른 객체들의 코드까지 줄줄이 고쳐야한다면 좋은 설계로 보기 힘들다. 대표적으로 라이브러리를 생각해보자. 라이브러리를 사용하는 객체의 코드가 변경된다고 해서 라이브러리 코드까지 변경하지 않는다.

이처럼 개방-폐쇄 원칙은 각 객체의 모듈화와 정보 은닉의 올바른 구현을 추구하며, 이를 통해 객체 간의 의존성을 최소화하여 코드 변경에 따른 영향력을 낮추기 위한 원칙이다.

# 코드로 보는 개방-폐쇄 원칙

<br />
<p class="large grey-600" align="center"><i>If...</i></p>
<br />

저명한 IT업체에서 일하는 당신. 어느덧 정년을 바라보고 있다. 노후 대비를 위해 작은 편의점의 점주로 새로운 시작을 하는 당신. 예전부터 봐뒀던 곳에 적지 않은 비용을 지불하기까지 했다.

다행히 안목이 틀리지 않았는지, 아침은 아침대로, 새벽은 새벽대로 끊임없는 유동인구 덕분에 생각했던 것 이상으로 수입이 들어오고 있다. 좀 더 일찍 시작했어도 됐으려나...

여기저기 신경쓰다보니 초기 비용이 여의치 않아, POS기기는 저렴한 걸 선택했다. 영업사원이 사용 카드가 어쩌네 넌지시 얘기한 거 같은데, 그래봐야 POS가 거기서 거기겠지 뭐.

<br />

요즘 들어 매체에 신생 카드 업체에 대한 주제가 끊이질 않는다. 공격적인 혜택과 이전 카드에선 찾아볼 수 없었던 아기자기한 디자인이 그렇게 인기랜다. 이름이 초콜릿뱅크였나..? 혜택은 좋은데, 카드에 저런 디자인이 무슨 소용이람.

<br />

요즘들어 그 초코 뭐시긴가 하는 카드를 쓰는 사람이 많아졌다. 문제는 저 놈의 POS기가 새로운 카드는 전혀 인식을 못 한다. 이 문제 때문에 이번 주에만 반 이상이 넘는 고객을 돌려보냈다. 매출도 문제지만, 손님한테 아쉬운 소리하면서 사과하는 게 더 고역이다.

POS 업체에 전화해봤는데, 구조 상 그런거라며 계약 이전에 다 설명하고 서명받은 내용이란다. 난 그런 기억이 없는데....? 어쨌든 내게 남은 선택지라곤 지금 유지비용의 두 배 가까이 되는 신규 POS로 교체하던가, 위약금을 물고 새로운 POS 업체로 갈아타는 것 뿐이다. 이 문제 때문에 잠을 통 잘 수가 없다.

<br />

그래도 명색이 개발자인 당신. 어쩌면 내가 해결할 수도 있지 않을까? 수 십년 간의 경험을 토대로 기억을 되짚어가며 기기를 분석해보기 시작했다.

``` java
/**
 * 포스 클래스
 *
 * @author RWB
 * @since 2021.08.14 Sat 02:10:12
 */
public class Pos
{
	/**
	 * 결제 및 결과 반환 함수
	 *
	 * @param card : [Object] 카드 객체
	 * @param name : [String] 카드사명
	 * @param price: [int] 금액
	 *
	 * @return [boolean] 결제 결과
	 */
	public boolean purchase(Object card, String name, int price)
	{
		boolean result;
		
		switch (card.toUpperCase())
		{
			case "A" -> result = ((CardA) card).send(price);
			case "B" -> result = ((CardB) card).send(price);
			case "C" -> result = ((CardC) card).send(price);
			
			default -> {
				System.out.println("유효하지 않은 카드사");
				result = false;
			}
		}
		
		return result;
	}
}
```

다행히 아직 감이 죽진 않았는지, 어렵지 않게 관련 모듈을 특정할 수 있었다. 카드 리더기에서 카드 인식 시 카드 정보가 담긴 객체를 `Object`로 캐스팅하여 전송한다. 정보 구분을 위해 카드사명까지 같이 전송하는 모양이다.

딱 봐도 난감하기 그지없는 구조다. 실제로 초콜릿뱅크의 카드 정보는 리더기에서 잘 전달되고 있으나, `purchase` 메소드에서 초콜릿뱅크 카드를 구분하는 로직이 없어서 결제가 되지 않는다.

``` java
public boolean purchase(String card, int price)
{
	boolean result;
	
	switch (card.toUpperCase())
	{
		// 신생 업체가 생길 때마다 해당 업체를 구분하는 로직을 추가한다.
		case "A" -> result = ((CardA) card).send(price);
		case "B" -> result = ((CardB) card).send(price);
		case "C" -> result = ((CardC) card).send(price);
		case "D" -> result = ((CardD) card).send(price);
		case "E" -> result = ((CardE) card).send(price);
		case "F" -> result = ((CardF) card).send(price);
		
		default -> {
			System.out.println("유효하지 않은 카드사");
			result = false;
		}
	}
	
	return result;
}
```
그렇다면 `case` 구문에서 초콜릿뱅크를 구분하여 결제 정보를 전송하면 해결되지 않을까? 이 방식을 쓴다면 급한 불은 끌 수 있겠지만, 후에 또 다른 신생업체가 생기면 같은 문제가 반복될 게 뻔하다.

이 방법은 매우 비효율적이다. 동작의 범위만 넓혔을 뿐, 근본적인 문제는 전혀 해결되지 않는다.

당신은 이 코드를 좀 더 객체지향의 관점으로 접근하여 리팩토링을 실시한다.

``` java
/**
 * 결제 인터페이스
 *
 * @author RWB
 * @since 2021.08.14 Sat 02:28:22
 */
public interface Purchasable
{
	/**
	 * 카드사 정보 전송 및 결과 반환 함수
	 *
	 * @param price: [int] 금액
	 *
	 * @return [boolean] 전송 결과
	 */
	boolean send(int price);
}
```

공통된 형태로 로직을 수행하기 위해 `Purchasable` 인터페이스를 구현했다. 또한 리더기에서 전송하는 모든 카드 객체는 `Purchasable`를 상속받도록 강제했다.

``` java
/**
 * A 카드 객체
 *
 * @author RWB
 * @since 2021.08.14 Sat 02:36:11
 */
class CardA implements Purchasable
{
	/**
	 * 카드사 정보 전송 및 결과 반환 함수
	 *
	 * @param price: [int] 금액
	 *
	 * @return [boolean] 전송 결과
	 */
	@Override
	public boolean send(int price)
	{
		System.out.println(getClass().getSimpleName() + " " + price + "원 결제 요청");
		return true;
	}
}

/**
 * B 카드 객체
 *
 * @author RWB
 * @since 2021.08.14 Sat 02:38:00
 */
class CardB implements Purchasable
{
	/**
	 * 카드사 정보 전송 및 결과 반환 함수
	 *
	 * @param price: [int] 금액
	 *
	 * @return [boolean] 전송 결과
	 */
	@Override
	public boolean send(int price)
	{
		System.out.println(getClass().getSimpleName() + " " + price + "원 결제 요청");
		return true;
	}
}

/**
 * C 카드 객체
 *
 * @author RWB
 * @since 2021.08.14 Sat 02:39:51
 */
class CardC implements Purchasable
{
	/**
	 * 카드사 정보 전송 및 결과 반환 함수
	 *
	 * @param price: [int] 금액
	 *
	 * @return [boolean] 전송 결과
	 */
	@Override
	public boolean send(int price)
	{
		System.out.println(getClass().getSimpleName() + " " + price + "원 결제 요청");
		return true;
	}
}
```

이제 리더기에서 전달하는 모든 카드 객체는 `Purchasable` 인터페이스를 상속받는다. 카드 객체를 부모 객체인 `Purchasable`로 다룰 수 있을 것이다. 각 카드 객체의 동작에 전송이 각각 구현되어있어, 타 객체의 코드에 의존하지 않는다.

``` java
/**
 * 포스 클래스
 *
 * @author RWB
 * @since 2021.08.14 Sat 02:10:12
 */
public class Pos
{
	/**
	 * 결제 및 결과 반환 함수
	 *
	 * @param purchasable : [Purchasable] Purchasable 인터페이스
	 * @param price: [int] 금액
	 *
	 * @return [boolean] 결제 결과
	 */
	public boolean purchase(Purchasable purchasable, int price)
	{
		return purchasable.send(price);
	}
}
```

이제 결제 함수를 리팩토링 해보자. `CardA`, `CarB`, `CardC` 등 각각 개별적인 객체지만, 이제 `Purchasable`이라는 부모 객체가 있으므로 이를 묶을 수 있다. 우리는 리더기에서 주는 인터페이스 객체만 받아서 해당 객체의 `send`를 호출하면 된다.

성공적으로 리팩토링을 마친 당신. 이제 어떤 카드든 결제가 가능하고 리더기가 정상적으로 인식만 한다면 결제를 진행할 수 있게됐다.

당신이 한 각고의 노력과 빠른 대처로 인해 얼마 안 가 다시금 매출을 정상화시킬 수 있었다.

# 정리

리팩토링 전과 후를 비교해보자.

``` java
public boolean purchase(Object card, String name, int price)
{
	boolean result;
	
	switch (card.toUpperCase())
	{
		case "A" -> result = ((CardA) card).send(price);
		case "B" -> result = ((CardB) card).send(price);
		case "C" -> result = ((CardC) card).send(price);
		
		default -> {
			System.out.println("유효하지 않은 카드사");
			result = false;
		}
	}
	
	return result;
}

public boolean purchase(Purchasable purchasable, int price)
{
	return purchasable.send(price);
}
```

위는 이전 코드, 아래는 리팩토링한 코드다. <span class="amber-600">기능이 변하거나 확장 가능하지만, 해당 기능의 코드는 수정하면 안 된다</span>는 의미를 여기에서 찾을 수 있다.

리팩토링 이전 코드의 경우, 새로운 카드 인식. 즉, 기능 추가를 위해선 코드의 추가가 요구됐다. 다시 말해, <span class="red-600">기능을 확장하기 위해선 코드의 수정이 필요</span>하다는 의미다.

반대로 리팩토링 후의 코드를 보자. `Purchasable`라는 통합된 인터페이스를 사용하기 때문에 카드 추가에 따라 코드 단계에서 대응할 필요가 없다. 즉, <span class="red-600">코드의 변경 없이 기능이 확장</span>된다.

단일 책임 원칙과 마찬가지로, 비슷한 형태의 분기가 반복될 경우 개방-폐쇄 원칙을 준수하지 않았을 가능성이 높다. 이는 곧 높은 리팩토링 비용으로 직결되니, 이를 잘 준수하여 독립적인 모듈을 설계하자.