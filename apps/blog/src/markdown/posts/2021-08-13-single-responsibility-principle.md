---
title: "[OOP] 객체지향 5원칙(SOLID) - 단일 책임 원칙 SRP(Single Responsibility Principle)"
excerpt: "올바른 객체지향 설계를 위해 수립한 원칙이 있으며, 이 다섯 가지 원칙을 통틀어 객체지향 5원칙(SOLID)이라 명명한다. 필수로 적용하지는 않지만, 적어도 이 규칙을 준수하면 준수할 수록 올바르게 설계된 객체지향이라 할 수 있다. 이 다섯가지 원칙은 아래와 같다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: 1628786268000
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "객체지향 5원칙", "단일 책임 원칙", "SRP" ]
group: "객체지향"
comment: true
publish: true
---

# 객체지향 5원칙

올바른 객체지향 설계를 위해 수립한 원칙이 있으며, 이 다섯 가지 원칙을 통틀어 <span class="amber-600">객체지향 5원칙</span>(SOLID)이라 명명한다. 필수로 적용하지는 않지만, 적어도 이 규칙을 준수하면 준수할 수록 올바르게 설계된 객체지향이라 할 수 있다.

이 다섯가지 원칙은 아래와 같다.

1. 단일 책임 원칙 (Single Responsibility Principle)
2. 개방-폐쇄 원칙 (Open-Closed Principle)
3. 리스코프 치환 원칙 (Liskov Substitution Principle)
4. 인터페이스 분리 원칙 (Interface Segregation Principle)
5. 의존성 역전 원칙 (Dependency Inversion Principle)

각 원칙의 영어 앞글자를 따 <span class="blue-400">SOLID</span>원칙이라고도 한다.

# 단일 책임 원칙 SRP (Single Responsibility Principle)

<span class="orange-400">단일 책임 원칙</span>이란 <span class="orange-400">하나의 객체는 반드시 하나의 동작만의 책임을 갖는다</span>는 원칙이다.

모듈화가 강해질수록 다른 객체와의 의존/연관성이 줄어든다. 반대로 이야기하면 모듈화가 약해질수록 다른 객체와의 의존/연관성은 크게 늘어나며, 최악의 경우 어떠한 은닉화 정책도 존재하지 않아 모듈의 메소드에 무분별하게 접근할 수도 있게된다.

객체가 담당하는 동작. 즉, 책임이 많아질 수록 해당 객체의 변경에 따른 영향도의 양과 범위가 매우 커진다. 단일 책임 원칙은 특정 객체의 책임 의존성 과중을 최대한 지양하기 위한 원칙이다.

# 코드로 보는 단일 책임 원칙

자동차는 휠의 구동 특성에 따라 전륜(FWD), 후륜(RWD), 사륜(AWD)로 나뉘며, 그 특성은 아래와 같다.

* 전륜 구동인 경우 앞의 두 바퀴에만 동력을 전달한다.
* 후륜 구동인 경우 뒤의 두 바퀴에만 동력을 전달한다.
* 사륜 구동인 경우 전체 바퀴에 동력을 전달한다.

이를 객체로 구현해보자.

``` java
/**
 * 자동차 객체
 *
 * @author RWB
 * @since 2021.08.13 Fri 00:14:14
 */
public class Car
{
	private final String WD;
	
	private final int[] WHEEL = { 0, 0, 0, 0 };
	
	/**
	 * Car 생성자 함수
	 *
	 * @param wd: [String] 휠 구동 방식
	 */
	public Car(String wd)
	{
		WD = wd;
	}
	
	/**
	 * 주행 함수
	 *
	 * @param power: [int] 동력
	 */
	public void run(int power)
	{
		switch (WD.toUpperCase())
		{
			case "FWD" -> {
				WHEEL[0] = power;
				WHEEL[1] = power;
			}
			
			case "RWD" -> {
				WHEEL[2] = power;
				WHEEL[3] = power;
			}
			
			case "AWD" -> {
				WHEEL[0] = power;
				WHEEL[1] = power;
				WHEEL[2] = power;
				WHEEL[3] = power;
			}
		}
		
		System.out.println("휠 동력 상태: " + WHEEL[0] + ", " + WHEEL[1] + ", " + WHEEL[2] + ", " + WHEEL[3]);
	}
}
```

여기 `Car` 객체가 있다. `Car`는 생성 시 파라미터로 <span class="orange-400">휠 구동 방식</span>을 받는다.

`Car`에는 주행 동작을 구현하는 `run()`메소드가 있으며, 이 메소드는 파라미터로 <span class="orange-400">동력</span>을 받는다. 이후 휠 구동 방식에 따라 올바른 휠에 동력을 할당하고 휠의 상태를 출력한다.

휠의 구동 방식 별 동작이 하나의 책임으로 본다면 이 객체가 짊어지는 책임은 무려 세 가지나 된다. 이렇게 하나의 객체에 너무 많은 책임이 몰려있을 경우, 프로젝트에서 해당 객체의 의존성이 높아지게된다. 이러한 현상은 객체지향의 주요 특징 중 하나인 캡슐화를 정면으로 부정한다. 그 뿐만 아니라, 각자의 코드가 서로 의존될 경우, 코드 수정에 따른 영향도 역시 높아지고, 범위 또한 넓어진다.

위의 예시는 단일 책임 원칙을 설명하기 위한 단순한 예시로, 만약 코드의 규모가 크거나 복잡성이 심하다면 코드 수정 시 마다 오만가지 오류가 발생할 것이다. 그 뿐만 아니라 코드가 변경되는 과정에서 이미 정해진 코드의 리팩토링도 필요할 수 있다. 리팩토링이 리팩토링을 부르는 참사가 일어날 수도 있다. 여기서부터 코드가 지저분해지기 쉽다.

단일 책임 원칙은 바로 이와 같은 상황을 방지하고자 수립된 원칙으로, <span class="red-400">1객체 = 1책임</span>으로 최대한 객체를 간결하고 명확하게 설계할 것을 요구한다. 위 코드의 책임을 줄여 단일 책임 원칙을 지키려면 어떻게 해야할까?

``` java
/**
 * 자동차 추상 객체
 *
 * @author RWB
 * @since 2021.08.13 Fri 00:14:14
 */
abstract public class Car
{
	protected final String WD;
	
	protected final int[] WHEEL = { 0, 0, 0, 0 };
	
	/**
	 * Car 생성자 함수
	 *
	 * @param wd: [String] 휠 구동 방식
	 */
	public Car(String wd)
	{
		WD = wd;
	}
	
	/**
	 * 주행 함수
	 *
	 * @param power: [int] 동력
	 */
	abstract public void run(int power);
}
```

우선 공통된 인터페이스 내지는 상위 객체를 구현할 필요가 있다. 이 객체의 경우 생성자가 필요하므로 인터페이스 보단 상위 객체가 적합하다.

> **네? 인터페이스 차별이요??**  
> 인터페이스는 일반적인 객체 혹은 추상 객체와 달리 생성자를 강제할 수 없습니다.

객체 `Car`를 상위 객체에 적용될 수 있게끔 구현한다. `run()` 메소드는 훨 구동 타입에 따라 동작이 달라지므로, `abstract` 지시자를 통해 추상 메소드로 선언한다. 해당 객체의 인스턴스를 생성하거나, 상속받는 객체가 직접 구현하게 될 것이다.

``` java
/**
 * 전륜차 객체
 *
 * @author RWB
 * @since 2021.08.13 Fri 01:03:13
 */
class FrontWheelCar extends Car
{
	/**
	 * FrontWheelCar 생성자 함수
	 *
	 * @param wd: [String] 휠 구동 방식
	 */
	public FrontWheelCar(String wd)
	{
		super(wd);
	}
	
	/**
	 * 주행 함수
	 *
	 * @param power: [int] 동력
	 */
	@Override
	public void run(int power)
	{
		WHEEL[0] = power;
		WHEEL[1] = power;
		
		System.out.println("휠 동력 상태: " + WHEEL[0] + ", " + WHEEL[1] + ", " + WHEEL[2] + ", " + WHEEL[3]);
	}
}

/**
 * 후륜차 객체
 *
 * @author RWB
 * @since 2021.08.13 Fri 01:05:57
 */
class RearWheelCar extends Car
{
	/**
	 * RearWheelCar 생성자 함수
	 *
	 * @param wd: [String] 휠 구동 방식
	 */
	public RearWheelCar(String wd)
	{
		super(wd);
	}
	
	/**
	 * 주행 함수
	 *
	 * @param power: [int] 동력
	 */
	@Override
	public void run(int power)
	{
		WHEEL[2] = power;
		WHEEL[3] = power;
		
		System.out.println("휠 동력 상태: " + WHEEL[0] + ", " + WHEEL[1] + ", " + WHEEL[2] + ", " + WHEEL[3]);
	}
}

/**
 * 사륜차 객체
 *
 * @author RWB
 * @since 2021.08.13 Fri 01:05:57
 */
public class AllWheelCar extends Car
{
	/**
	 * AllWheelCar 생성자 함수
	 *
	 * @param wd: [String] 휠 구동 방식
	 */
	public AllWheelCar(String wd)
	{
		super(wd);
	}
	
	/**
	 * 주행 함수
	 *
	 * @param power: [int] 동력
	 */
	@Override
	public void run(int power)
	{
		WHEEL[0] = power;
		WHEEL[1] = power;
		WHEEL[2] = power;
		WHEEL[3] = power;
		
		System.out.println("휠 동력 상태: " + WHEEL[0] + ", " + WHEEL[1] + ", " + WHEEL[2] + ", " + WHEEL[3]);
	}
}
```

전륜, 후륜, 사륜에 해당하는 객체를 생성한다. 이 세 객체는 모두 `Car`에 포함되므로 `Car`를 상속받아 구현한다. 각 객체의 `run()` 메소드에 동작을 구현함으로써, 각각의 객체가 하나의 책임을 가지게 된다.

이렇게 객체별로 책임을 나누면, 코드 변경 시에도 해당하는 객체만 수정하면 되므로, 의존성이 낮아져 올바른 모듈화를 구현할 수 있다. 그 뿐만 아니라 코드가 간결해져 유지보수가 쉬워질 뿐만 아니라 수정에 따른 영향도도 매우 작아진다.

# 정리

코드를 설계하다보면 하나의 객체가 너무 많은 동작을 담당하는 경우가 자주 발생한다. 필자 또한 무의식적으로 하나의 객체/메소드에 너무 많은 책임을 할당하는 일이 비일비재했다. 단일 책임 원칙은 이러한 개발 방향을 올바르게 잡아준다.

가급적 단일 책임 원칙을 고수하여 올바른 객체를 구현할 수 있도록 해보자.