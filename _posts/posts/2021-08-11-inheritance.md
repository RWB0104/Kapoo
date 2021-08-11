---
title: "[OOP] 객체지향의 특징 - 상속(Inheritance)"
excerpt: "나른한 주말, 느긋하게 영화를 보고 있는 A씨. 영화에선 천대받으며 살던 주인공 소녀가 어느날 누군가로부터 거액의 유산을 받았다. 알고보니 그는 어렸을 적 실종된 재벌집 가문의 손녀딸이였던 것! 이후 그녀는 받은 유산을 통해 고마웠던 주변인에게 은혜를 갚고, 무시하던 이들에게 통쾌한 복수를 돌려준다는 내용이였다. 나름 통쾌했던 A씨지만, 어차피 현실에선 일어날 수 없는 일이라는 걸 이내 떠올린 A씨. 우리는 이걸 상속이라 부른다. 이처럼 상속이라는 개념은 영화나 드라마와 같은 창작물에서나 볼 수 있었다. 사전에서나 찾아볼 수 있었던 허구의 개념인 셈이다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-11T20:32:33"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "상속", "추상" ]
group: "객체지향"
comment: true
publish: true
---

# 상속 (Inheritance)

나른한 주말, 느긋하게 영화를 보고 있는 A씨. 영화에선 천대받으며 살던 주인공 소녀가 어느날 누군가로부터 거액의 유산을 받았다. 알고보니 그는 어렸을 적 실종된 재벌집 가문의 손녀딸이였던 것! 이후 그녀는 받은 유산을 통해 고마웠던 주변인에게 은혜를 갚고, 무시하던 이들에게 통쾌한 복수를 돌려준다는 내용이였다.

나름 통쾌했던 A씨지만, 어차피 현실에선 일어날 수 없는 일이라는 걸 이내 떠올린 A씨. 우리는 이걸 **상속**이라 부른다. 이처럼 상속이라는 개념은 영화나 드라마와 같은 창작물에서나 볼 수 있었다. 사전에서나 찾아볼 수 있었던 허구의 개념인 셈이다.

<p align="center"><i><del>평범하게 살던 내가 콤퓨타 이세카이에선 상속자???!!?!?!</del></i></p>

하지만 객체지향 언어에서는 누구나 필요에 의해 쉽게 상속받을 수 있다!

객체지향 역시 동일한 개념이 존재한다. 객체지향에서의 <span class="teal-400">상속</span>이란 <span class="blue-400">객체가 다른 객체를 상속받아 상속받은 객체의 요소를 사용</span>하는 것을 의미한다.

이 때 객체를 상속받은 객체는 <span class="teal-400">자식</span>, 상속된 객체는 <span class="teal-400">부모</span>라 칭한다.

자식 객체는 상속된 부모 객체의 은닉화 구성에 따라 정해진 변수, 메소드에 접근할 수 있다. 또한 부모 객체가 <span class="teal-400">추상 객체</span>일 경우 <span class="teal-400">추상 메소드</span>와 <span class="teal-400">오버라이딩</span>(Overriding)을 통해 부모 객체의 메소드를 구현하거나 다룰 수 있다.

## 추상 객체

<span class="teal-400">추상 객체</span>는 하나 이상의 추상 메소드를 포함하는 객체다.

``` java
abstract public class Main
{
	// 메소드
}
```

JAVA로 표현한 추상 클래스는 위와 같으며, 클래스의 맨 앞에 `abstract` 키워드를 적어 해당 객체가 추상 객체임을 표현할 수 있다.

## 추상 메소드

<span class="teal-400">추상 메소드</span>는 자식 객체에서 구현해야하는 메소드다.

``` java
abstract public class Main
{
	public void normalMethod()
	{
		System.out.println("일반 메소드");
	}

	abstract public void abstractMethod();
}
```

위는 JAVA로 표현한 추상 객체다. `normalMethod()`은 일반적인 메소드고, `abstractMethod()`는 추상 메소드다. 추상 메소드는 일반적인 메소드와 큰 차이가 있는데, 메소드의 동작이 기술되어있지 않다.

추상 메소드의 구현은 자식 객체가 담당하며, 아래 단계에서 이루어진다.

* 추상 객체의 인스턴스 생성 시
* 추상 객체를 상속받을 시

일반적인 메소드는 자신의 객체에서 선언되어있다. 하지만 추상 메소드의 경우, 추상 객체를 할당받으려는 객체에서 선언이 이루어진다. 이 경우 어떤 메리트가 있을까?

예를 들어, 부모 객체 `Main`과 이를 상속받은 자식 객체 `Sub`가 있다고 가정하자. 만약 동작 구조 상 `abstractMethod()`에서 자식 객체의 변수나 메소드를 사용해야만 한다면?

`normalMethod()` 처럼 동작이 이미 부모 객체에 선언되는 경우 자식 객체의 요소를 반영하기가 매우 어렵다. 인스턴스를 생성하는 방법도 있겠지만 어떤 객체를 상속받을 지 알 수 없는 경우, 예상되는 객체의 인스턴스를 전부 할당받아놓는 게 아니라면 불가능에 가깝다. 그리고 이 방법의 경우 메모리 낭비가 너무 심해진다.

반면 `abstractMethod()` 같은 추상 메소드의 경우 자식 객체에서 구현되기 때문에 자식 객체의 변수나 메소드에 직접적으로 접근할 수 있다. 때문에 자식 객체의 요소를 활용해서 동작을 구현해야 할 경우, 해당 메소드를 추상으로 정의하면 자식 객체의 특성에 맞게 구현하기 용이하다.

### 추상 메소드 구현 - 인스턴스 생성 시

JAVA를 통해 `Main`의 인스턴스를 `Sub`에서 생성해보자.

``` java
public class Sub
{
	public void run()
	{
		Main main = new Main()
		{
			@Override
			public void abstractMethod()
			{
				System.out.println(text());
			}
		}
	}

	private String text()
	{
		return "Sub 객체의 요소";
	}
}
```

원래대로라면 `abstractMethod()` 메소드는 `Sub` 객체의 `text()`에 접근할 수 없다. `text()`는 `private` 접근제어자를 가지기 때문이다.

하지만 추상 메소드의 경우 구현이 `Sub`에서 이루어지기 때문에 `Sub`의 모든 요소에 직접적으로 접근할 수 있다. 즉, `private` 같은 내부 메소드까지 전부 접근 가능하다.

### 추상 메소드 구현 - 상속 시

JAVA를 통해 `Main`을 `Sub`에 상속시켜보자.

``` java
public class Sub extends Main
{
	@Override
	public void abstractMethod()
	{
		System.out.println(text());
	}

	private String text()
	{
		return "자식 객체 Sub의 요소";
	}
}
```

부모 객체에 추상 메소드가 있을 경우, 자식 객체는 이를 반드시 오버라이딩해야한다. 그러지 않을 경우 컴파일 오류를 일으킨다.

마찬가지로 메소드의 구현이 자식 객체에서 이루어지므로, 자식 객체의 모든 요소에 접근할 수 있다.

추상 메소드는 이처럼 구현의 주체를 자식 객체에게 전가함으로써, 자식 객체의 요소에 제한없이 접근할 수 있다. 원래라면 `public` 등으로 열어줬어야 함에도 자식 객체 내부에서 구현이 이루어지기 때문에 접근제어자를 변경할 필요가 없다.

# 상속의 예제

JAVA를 통해 객체의 상속이 어떤식으로 이루어지고, 어떤식으로 사용되는지 알아보자.

``` java
import java.util.Date;

/**
 * 컴퓨터 추상 클래스
 *
 * @author RWB
 * @since 2021.08.06 Fri 21:19:19
 */
abstract public class Computer
{
	private final String OS;
	
	/**
	 * Computer 생성자 함수
	 *
	 * @param os: [String] OS 이름
	 */
	public Computer(String os)
	{
		this.OS = os;
	}
	
	/**
	 * 시작 함수
	 */
	public void startup()
	{
		System.out.println(new StringBuilder().append(OS).append(" - started at ").append(new Date().toString()));
	}
	
	/**
	 * 종료 함수
	 */
	public void shutdown()
	{
		System.out.println(new StringBuilder().append(OS).append(" - shutdown at ").append(new Date().toString()));
	}
	
	/**
	 * 동작 추상 함수
	 */
	abstract public void run();
}
```

여기 `Computer`라는 추상 객체가 존재한다. 이 객체는 `OS`라는 상태와 `startup`, `shutdown`, `run`이라는 동작을 가진다.

이 중 `run`은 좀 특별한데, 동작은 적혀있으나, 어떤식으로 동작하는지에 대한 명세는 정해져있지 않다.

이는 <span class="teal-400">추상 객체</span>의 특징 중 하나로, 추상 객체는 하나 이상의 <span class="teal-400">추상 메서드</span>를 포함할 수 있다. 추상 메서드는 구현되지 않은 메서드로, **동작의 개념** 정도로만 이해하면 된다. <span class="red-400">추상 메서드의 구현은 해당 객체를 상속받은 자식 객체에서 이루어진다.</span> 즉, `run` 추상 메소드는 자식마다 제각각으로 구현된 동작을 수행한다.

아래의 두 클래스 `Asus`와 `Dell`은 `Computer` 추상 클래스를 상속받은 자식 클래스다.

``` java
/**
 * ASUS 컴퓨터 클래스
 *
 * @author RWB
 * @since 2021.08.06 Fri 21:24:50
 */
public class Asus extends Computer
{
	/**
	 * Asus 생성자 함수
	 *
	 * @param os: [String] OS 이름
	 */
	public Asus(String os)
	{
		super(os);
	}
	
	/**
	 * 동작 함수
	 */
	@Override
	public void run()
	{
		System.out.println("ASUS 작업 수행");
	}
}
```

``` java
/**
 * DELL 컴퓨터 클래스
 *
 * @author RWB
 * @since 2021.08.06 Fri 21:26:46
 */
public class Dell extends Computer
{
	/**
	 * Dell 생성자 함수
	 *
	 * @param os: [String] OS 이름
	 */
	public Dell(String os)
	{
		super(os);
	}
	
	/**
	 * 시작 함수
	 */
	@Override
	public void startup()
	{
		super.startup();
		
		System.out.println("시스템 안정화 수행");
	}
	
	/**
	 * 종료 함수
	 */
	@Override
	public void shutdown()
	{
		System.out.println("시스템 프로세스 정리 수행");
		
		super.shutdown();
	}
	
	/**
	 * 동작 함수
	 */
	@Override
	public void run()
	{
		System.out.println("DELL 작업 수행");
	}
}
```

`Asus`와 `Dell` 모두 `Computer`를 상속받았음을 확인할 수 있다. 또한 모두 `run` 함수가 제각각 구현된 것 역시 확인할 수 있다.

그런데 `Asus`와 달리 `Dell`은 부팅 시와 종료 시 각각 시스템의 안정성을 위한 사전/후 작업이 추가됐다.

이러한 사전/후 작업을 구현하기 위해 `startup`, `shutdown`을 오버라이딩한다. 이 과정을 통해 시작과 종료 함수에 각각 원하는 동작을 추가한다.

> **super?**  
> 자식 클래스에서 부모 클래스를 호출할 때 `super` 키워드를 이용해 호출한다. `Dell`의 오버라이딩 메소드 동작에서 활용됨을 알 수 있다. `super.shutdown()`은 부모 클래스 `Computer`의 메소드인 `shutdown()`을 호출한다.

``` java
/**
 * 메인 클래스
 *
 * @author RWB
 * @since 2021.06.14 Mon 00:06:32
 */
public class Main
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 */
	public static void main(String[] args)
	{
		Dell dell = new Dell("Windows 10 Pro");
		Asus asus = new Asus("Ubuntu 21.04");
		
		dell.startup();
		dell.run();
		dell.shutdown();
		
		System.out.println();
		
		asus.startup();
		asus.run();
		asus.shutdown();
	}
}
```

``` output
Windows 10 Pro - started at Fri Aug 06 22:54:39 KST 2021
시스템 안정화 수행
DELL 작업 수행
시스템 프로세스 정리 수행
Windows 10 Pro - shutdown at Fri Aug 06 22:54:39 KST 2021

Ubuntu 21.04 - started at Fri Aug 06 22:54:39 KST 2021
ASUS 작업 수행
Ubuntu 21.04 - shutdown at Fri Aug 06 22:54:39 KST 2021
```

`Asus`와 `Dell`의 메소드를 순서대로 수행하면 위와 같은 결과가 나온다. `Dell`의 시작, 종료 간 시스템 동작이 수행됨을 확인할 수 있다.

# 정리

객체지향은 모든 객체의 모듈화를 추구한다. 좋은 모듈화는 <span class="amber-400">캡슐화</span>, <span class="amber-400">은닉화</span>가 적절히 구현되고 유지되는 것을 지향한다.

하지만 포장이 견고하면 뜯기 어렵듯이, 탄탄한 모듈화는 모듈이 경직된다. 재사용의 범위가 제한되는 것 뿐만 아니라, 이를 이용한 확장 또한 어려울 것이다. 만약 객체지향에 이 두 개념만 있었다면 개발자는 재사용성과 모듈화를 적절히 타협하며 객체를 구현했을 것이다.

하지만 상속이라는 개념의 존재로 인해 객체에 지정된 모듈화를 전혀 해치지 않으면서 재사용성, 확장성을 보장받을 수 있다. 객체지향의 모듈화로 인한 딜레마를 상쇄하는 키치한 개념이 아닐 수 없다. 개인적으로는 객체지향의 특징 중 가장 중요한 특징이라고 생각한다. 물론 객체지향 중에서도 매우 어려운 개념이지만, 이를 잘 이해하면 조금 더 객체지향다운 코드를 짤 수 있을 것이다.