---
title: "[OOP] 객체지향의 특징 - 상속(Inheritance)"
excerpt: "나른한 주말, 느긋하게 영화를 보고 있는 A씨. 영화에선 천대받으며 살던 주인공 소녀가 어느날 누군가로부터 거액의 유산을 받았다. 알고보니 그는 어렸을 적 실종된 재벌집 가문의 손녀딸이였던 것! 이후 그녀는 받은 유산을 통해 고마웠던 주변인에게 은혜를 갚고, 무시하던 이들에게 통쾌한 복수를 돌려준다는 내용이였다. 나름 통쾌했던 A씨지만, 어차피 현실에선 일어날 수 없는 일이라는 걸 이내 떠올린 A씨. 우리는 이걸 상속이라 부른다. 이처럼 상속이라는 개념은 영화나 드라마와 같은 창작물에서나 볼 수 있었다. 사전에서나 찾아볼 수 있었던 허구의 개념인 셈이다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-08T11:05:05"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "캡슐화", "정보 은닉", "접근제어자" ]
group: "객체지향"
comment: true
publish: false
---

# 상속 (Inheritance)

나른한 주말, 느긋하게 영화를 보고 있는 A씨. 영화에선 천대받으며 살던 주인공 소녀가 어느날 누군가로부터 거액의 유산을 받았다. 알고보니 그는 어렸을 적 실종된 재벌집 가문의 손녀딸이였던 것! 이후 그녀는 받은 유산을 통해 고마웠던 주변인에게 은혜를 갚고, 무시하던 이들에게 통쾌한 복수를 돌려준다는 내용이였다.

나름 통쾌했던 A씨지만, 어차피 현실에선 일어날 수 없는 일이라는 걸 이내 떠올린 A씨. 우리는 이걸 **상속**이라 부른다. 이처럼 상속이라는 개념은 영화나 드라마와 같은 창작물에서나 볼 수 있었다. 사전에서나 찾아볼 수 있었던 허구의 개념인 셈이다.

<p align="center"><i><del>평범하게 살던 내가 콤퓨타 이세카이에선 상속자???!!?!?!</del></i></p>

하지만 객체지향 언어에서는 누구나 필요에 의해 쉽게 상속받을 수 있다!

위에서 얘기한 <span class="teal-400">상속</span>이란 <span class="blue-400">객체가 다른 객체를 상속받아 상속받은 객체의 요소를 사용</span>하는 것을 의미한다.

이 때 객체를 상속받은 객체는 <span class="teal-400">자식</span>, 상속된 객체는 <span class="teal-400">부모</span>라 칭한다.

자식 객체는 상속된 부모 객체의 은닉화 구성에 따라 정해진 변수, 메소드에 접근할 수 있다. 그 뿐만 아니라 자식 객체의 특성에 따라 부모 객체에 기술된 메소드를 변경할 수 있으며, 이를 <span class="teal-400">오버라이딩</span>(Overriding)이라 한다.

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

객체가 정형화되고, 모듈화되는 것도 나름의 장점이 있지만, 너무 정형화될 경우 유연성이 떨어져 재사용성을 오히려 저해할 수도 있다. 상속은 객체가 <span class="amber-400">확장</span>, <span class="amber-400">구현</span>을 가능케하는 개념으로, 이러한 특징 덕분에 이미 구현된 객체가 유연하게 변할 수 있도록 해준다. 이러한 특징은 객체의 재사용성을 높여준다.