---
title: "[OOP] 객체지향 5원칙(SOLID) - 인터페이스 분리 원칙 ISP (Interface Segregation Principle)"
excerpt: "인터페이스 분리 원칙이란 객체는 자신이 호출하지 않는 메소드에 의존하지 않아야한다는 원칙이다. 구현할 객체에게 무의미한 메소드의 구현을 방지하기 위해 반드시 필요한 메소드만을 상속/구현하도록 권고한다. 만약 상속할 객체의 규모가 너무 크다면, 해당 객체의 메소드를 작은 인터페이스로 나누는 것이 좋다. 위 그림은 규모가 너무 큰 객체를 상속했을 때 발생하는 문제와, 이를 인터페이스로 분리하여 해결하는 방법을 도식한 것이다. 왼쪽과 오른쪽 객체가 가운데 객체를 각각 상속할 경우, 왼쪽 객체는 필요한 메소드가 모두 구현되기 때문에 아무런 문제가 없다. 그러나 오른쪽 객체의 경우, Method1을 제외한 나머지 메소드는 필요가 없다. 하지만 이를 상속했기 때문에, 좋든 싫든 해당 메소드를 가지고 있거나, 최악의 경우 필요 없는 메소드를 구현까지 해야만한다. 하지만 상속 대상인 객체의 메소드를 각 동작별로 구분해 인터페이스를 만들어보자. 각 객체가 필요한 인터페이스만을 상속하여 구현하면 되므로 각자가 필요한 메소드만을 가지게 된다. 이 것이 인터페이스 분리 원칙이 지향하는 바다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: 1629109497000
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "객체지향 5원칙" ]
group: "객체지향"
comment: true
publish: true
---

# 인터페이스 분리 원칙 ISP (Interface Segregation Principle)

<span class="orange-400">인터페이스 분리 원칙</span>이란 <span class="red-600">객체는 자신이 호출하지 않는 메소드에 의존하지 않아야한다</span>는 원칙이다.

구현할 객체에게 무의미한 메소드의 구현을 방지하기 위해 반드시 필요한 메소드만을 상속/구현하도록 권고한다. 만약 상속할 객체의 규모가 너무 크다면, 해당 객체의 메소드를 작은 인터페이스로 나누는 것이 좋다.

![null](https://user-images.githubusercontent.com/50317129/128585790-a761f795-b4da-4a52-865d-d2dd4b858f20.png)

위 그림은 규모가 너무 큰 객체를 상속했을 때 발생하는 문제와, 이를 인터페이스로 분리하여 해결하는 방법을 도식한 것이다.

왼쪽과 오른쪽 객체가 가운데 객체를 각각 상속할 경우, 왼쪽 객체는 필요한 메소드가 모두 구현되기 때문에 아무런 문제가 없다. 그러나 오른쪽 객체의 경우, `Method1`을 제외한 나머지 메소드는 필요가 없다. 하지만 이를 상속했기 때문에, 좋든 싫든 해당 메소드를 가지고 있거나, 최악의 경우 필요 없는 메소드를 구현까지 해야만한다.

하지만 상속 대상인 객체의 메소드를 각 동작별로 구분해 인터페이스를 만들어보자. 각 객체가 필요한 인터페이스만을 상속하여 구현하면 되므로 각자가 필요한 메소드만을 가지게 된다. 이 것이 인터페이스 분리 원칙이 지향하는 바다.

# 코드로 보는 인터페이스 분리 원칙

예시를 통해 인터페이스 분리 원칙을 준수하지 않은 경우와 준수한 경우 어떠한 차이가 있는지 코드를 통해 알아보자.

## 인터페이스 분리 원칙을 준수하지 않은 코드

예를 들어, 스마트폰이라는 객체가 있다고 가정하자. 이 스마트폰 객체는 비교적 최신에 나온 덕분에 일반적인 스마트폰 기능 외에도 무선 충전, AR 뷰어, 생체인식 등의 다채로운 기능을 포함하고 있다.

이를 가지고 S20을 구현하면 스마트폰 객체의 동작 모두가 필요하므로 ISP를 만족한다. 그러나 S2를 구현할 경우, 무선 충전, 생체인식과 같은 기능을 제공하지 않는다. 그럼에도 불구하고 부모 객체인 스마트폰에 이러한 인터페이스가 포함되어 있으므로, S2 입장에서는 필요하지도 않은 기능을 구현해야하는 낭비가 발생한다.

``` java
/**
 * 스마트폰 추상 객체
 *
 * @author RWB
 * @since 2021.08.16 Mon 16:48:03
 */
abstract public class SmartPhone
{
	/**
	 * 통화 함수
	 *
	 * @param number: [String] 번호
	 */
	public void call(String number)
	{
		System.out.println(number + " 통화 연결");
	}
	
	/**
	 * 문자 메시지 전송 함수
	 *
	 * @param number: [String] 번호
	 * @param text: [String] 내용
	 */
	public void message(String number, String text)
	{
		System.out.println(number + ": " + text);
	}
	
	/**
	 * 무선충전 함수
	 */
	public void wirelessCharge()
	{
		System.out.println("무선 충전");
	}
	
	/**
	 * AR 함수
	 */
	public void ar()
	{
		System.out.println("AR 기능");
	}
	
	/**
	 * 생체인식 추상 함수
	 */
	abstract public void biometrics();
}
```

위와 같이 구현된 `SmartPhone` 객체가 있다. 생체인식을 담당하는 `biometrics()` 메소드의 경우, 기기에 등록된 생체정보를 활용해야 하므로 추상 메소드로 선언되어있다. 이 객체를 상속하여 `S20`과 `S2`를 구현할 수 있을 것이다.

``` java
/**
 * S20 객체
 *
 * @author RWB
 * @since 2021.08.16 Mon 17:12:23
 */
public class S20 extends SmartPhone
{
	/**
	 * 생체인식 함수
	 */
	@Override
	public void biometrics()
	{
		System.out.println("S20 생체인식 기능");
	}
}
```

`S20`은 모든 기능이 필요하기 때문에, `SmartPhone`의 모든 메소드를 사용해야하므로, 불필요한 메소드가 없는 상태다.

``` java
/**
 * S2 객체
 *
 * @author RWB
 * @since 2021.08.16 Mon 17:13:27
 */
public class S2 extends SmartPhone
{
	/**
	 * 무선충전 함수
	 */
	@Override
	public void wirelessCharge()
	{
		System.out.println("지원 불가능한 기기");
	}
	
	/**
	 * AR 함수
	 */
	@Override
	public void ar()
	{
		System.out.println("지원 불가능한 기기");
	}
	
	/**
	 * 생체인식 추상 함수
	 */
	@Override
	public void biometrics()
	{
		System.out.println("지원 불가능한 기기");
	}
}
```

`S2`는 무선충전, AR, 생체인식이 지원되지 않는 기기다. 그럼에도 불구하고 `SmartPhone`의 상속으로 인해 해당 기능의 메소드를 강제로 상속받게 된다. 더군다나 `biometrics()`의 경우 추상 메소드이므로 필요하지도 않은 기능을 구현까지 해야한다. 이러한 상속의 특징은 부모 객체의 규모가 매우 클 경우, 개발 편의성의 극심한 저하로 이뤄진다. 필요하지도 않은 수십개의 메소드를 일일히 오버라이딩하여 적절한 처리를 해준다고 생각해보자.

## 인터페이스 분리 원칙을 준수한 코드

객체의 특성을 확장을 통해 다른 객체를 편하게 구현하기 위한 것이 상속인데, 위와 같은 상황은 전혀 편하지 않다. 이는 부모 객체의 설계가 잘 못 됐을 수도 있고, 취지에 맞지 않는 객체를 상속했을 수도 있다. 이유야 어찌됐든 해결해야한다는 사실엔 변함이 없다.

그렇다면 이 현상은 어떻게 해결할 수 있을까? 객체의 메소드를 각각 인터페이스로 만들면 된다. 각 객체는 필요한 인스턴스만 상속하면 되므로 필요한 동작만을 상속/구현할 수 있을 것이다.

``` java
/**
 * 스마트폰 객체
 *
 * @author RWB
 * @since 2021.08.16 Mon 16:48:03
 */
public class SmartPhone
{
	/**
	 * 통화 함수
	 *
	 * @param number: [String] 번호
	 */
	public void call(String number)
	{
		System.out.println(number + " 통화 연결");
	}
	
	/**
	 * 문자 메시지 전송 함수
	 *
	 * @param number: [String] 번호
	 * @param text: [String] 내용
	 */
	public void message(String number, String text)
	{
		System.out.println(number + ": " + text);
	}
}
```

`SmartPhone` 객체는 모든 스마트폰에 적용되는 보편적인 동작만을 가지도록 변경했다.

``` java
/**
 * 무선충전 인터페이스
 *
 * @author RWB
 * @since 2021.08.16 Mon 18:23:33
 */
public interface WirelessChargable
{
	/**
	 * 무선충전 추상 함수
	 */
	void wirelessCharge();
}

/**
 * AR 인터페이스
 *
 * @author RWB
 * @since 2021.08.16 Mon 18:24:29
 */
public interface ARable
{
	/**
	 * AR 추상 함수
	 */
	void ar();
}

/**
 * 생체인식 인터페이스
 *
 * @author RWB
 * @since 2021.08.16 Mon 18:25:08
 */
public interface Biometricsable
{
	/**
	 * 생체인식 추상 함수
	 */
	void biometrics();
}
```

각 기능의 인터페이스는 위와 같다. 원래 `SmartPhone`의 객체의 메소드였던 각 기능은 인터페이스 단위로 나뉘어졌음에 주목하자.

이를 통해 `S20`과 `S2` 모두 필요한 객체만을 상속받아 구현할 수 있을 것이다.

``` java
/**
 * S20 객체
 *
 * @author RWB
 * @since 2021.08.16 Mon 17:12:23
 */
public class S20 extends SmartPhone implements WirelessChargable, ARable, Biometricsable
{
	/**
	 * 무선충전 함수
	 */
	@Override
	public void wirelessCharge()
	{
		System.out.println("무선충전 기능");
	}
	
	/**
	 * AR 함수
	 */
	@Override
	public void ar()
	{
		System.out.println("AR 기능");
	}
	
	/**
	 * 생체인식 함수
	 */
	@Override
	public void biometrics()
	{
		System.out.println("생체인식 기능");
	}
}
```

`S20` 객체의 코드다. `SmartPhone`을 상속받았으며, 인터페이스로 `WirelessChargable`, `ARable`, `Biometricsable`을 모두 상속받아 구현하고 있다.

``` java
/**
 * S2 객체
 *
 * @author RWB
 * @since 2021.08.16 Mon 17:13:27
 */
public class S2 extends SmartPhone
{
	/**
	 * 문자 메시지 전송 함수
	 *
	 * @param number: [String] 번호
	 * @param text: [String] 내용
	 */
	@Override
	public void message(String number, String text)
	{
		System.out.println("In S2");
		
		super.message(number, text);
	}
}
```

`S2`는 특수 기능이 구현되어있지 않으므로, 기본적인 `SmartPhone` 객체만을 상속받아 구현된다.

인터페이스는 다중 상속을 지원하므로, 필요한 기능을 인터페이스로 나누면 해당 기능만을 상속받을 수 있다. 그 밖에 추후 업데이트 등을 통해 추가적인 기능이 탑재된다면, 같은 원리로 인터페이스를 설계해서 사용하면 필요한 객체에 필요한 기능을 쉽게 추가할 수 있다.

# 정리

인터페이스 분리 원칙은 객체가 반드시 필요한 기능만을 가지도록 제한하는 원칙이다. 불필요한 기능의 상속/구현을 최대한 방지함으로써 객체의 불필요한 책임을 제가한다. 큰 규모의 객체는 필요에 따라 인터페이스로 잘게 나누어 확장성을 향상시킨다.

객체를 상속할 땐 해당 객체가 상속 받는 객체에 적합한 객체인지, 의존적인 기능이 없는 지 판단하여 올바른 객체를 구현, 상속하도록 하자.