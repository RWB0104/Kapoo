---
title: "객체지향 프로그래밍(Object Oriented Programming)이란?"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-07T12:06:45"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향" ]
group: "객체지향"
comment: true
publish: false
---

# OOP

IT 업계에 종사하게 된다면 십중팔구 <span class="amber-400">JAVA</span>, <span class="amber-400">C++</span>, <span class="amber-400">C#</span> 중 하나는 다루게 된다. 국내 IT의 최다 공급이자 수요인 JAVA를 위시한 위 세 가지 언어의 공통점은 전부 <span class="primary">객체지향</span>언어라는 점이다.

물론 지금에 이르러서는 함수형이라는 개념도 나왔지만, <span class="amber-400">C</span>의 단순한 절차지향 이래로 나온 객체지향은 프로그래밍의 새로운 관점을 제시했고, 크고 작은 언어들이 알게 모르게 영향을 받았다. 이렇게 영향력이 큰 개념임에도 불구하고 막상 이와 관련된 질문을 받으면 명확하게 답을 내지 못 하기도 한다.

# 객체지향에 대해 설명해보세요.

제목 그대로 위와 같은 질문을 받았다고 가정해보자. 난 이 질문의 명확한 답을 주지 못 한다. 자바 경험이 없지 않음에도 불구하고, 이론에는 크게 관심이 없기도 했고, 비전공자인 난 구태여 찾아보지 않는 이상 이와 같은 내용을 실무에서 습득하긴 어려웠다.

내가 쓰는 언어가 어떤 방식으로 동작하는지 모른다면 그건 제대로 쓴다고 보긴 어렵다. 이 주제를 통해 객체지향의 개념에 대해 정리해보고자 한다.

## 객체

**객체**지향. 말 그대로 <span class="teal-400">객체</span>를 지향하는 언어다. 객체지향에 대해 이해하기 위해선, 일단 이 방법론이 궁극적으로 지향하는 **객체**란 개념에 대해 이해할 필요가 있다.

객체지향이 말하는 <span class="teal-400">객체</span>란 프로그램 동작의 주체가 되는 요소를 의미한다. 이 객체는 유/무형을 가리지 않는다. 실체가 명확한 것일 수도 있고, 무형의 개념일 수도 있다.

모든 객체는 상태와 동작을 가진다. 예를 들어, **TV**를 구매한다고 생각해보자. 대부분의 사람들은 TV의 디자인, 성능, 가격 등을 적절히 고려하여 TV를 구매할 것이다.

TV의 색, 인치, 가격 등은 TV가 가진 상태라고 볼 수 있다. TV 채널 이동, 다시 보기, 넷플릭스 연결 등은 TV의 기능이라고 볼 수 있다.

이렇게 모든 객체에는 <span class="green-400">상태</span>와 <span class="green-400">동작</span>이 존재한다.

국내 객체지향 언어의 대표격인 <span class="amber-400">JAVA</span>는 이러한 개념을 아래와 같이 접근한다.

| 객체지향 |     JAVA      |
| :------: | :-----------: |
|   객체   |    클래스     |
|   상태   |   멤버 변수   |
|   동작   | 메소드 (함수) |

여기 **자동차**라는 현실의 객체를 JAVA가 어떻게 클래스로 다루는지 예제를 통해 알아보자.

``` java
/**
 * 자동차 클래스
 *
 * @author RWB
 * @since 2021.08.05 22:06:24
 */
public class Car
{
	// 시동 여부
	private final boolean IS_STARTED = false;
	
	// 최대 속력
	private final int MAX_SPEED;
	
	// 현재 속력
	private int speed;
	
	/**
	 * Car 생성자 함수
	 *
	 * @param maxSpeed: [int] 최대 속도
	 */
	public Car(int maxSpeed)
	{
		MAX_SPEED = maxSpeed;
	}
	
	/**
	 * 시동 결과 반환 함수
	 *
	 * @return [boolean] 시동 결과
	 */
	public boolean startUp()
	{
		return !IS_STARTED;
	}
	
	/**
	 * 시동 종료 결과 반환 함수
	 *
	 * @return [boolean] 시동 종료 결과
	 */
	public boolean shutdown()
	{
		return IS_STARTED;
	}
	
	/**
	 * 현재 속도 반환 함수
	 *
	 * @return [int] 현재 속도
	 */
	public int getSpeed()
	{
		return speed;
	}
	
	/**
	 * 가속 함수
	 *
	 * @param amount: [int] 속도
	 */
	public void upSpeed(int amount)
	{
		// 시동이 걸렸을 경우
		if (IS_STARTED)
		{
			// 가속된 값이 최대 속도를 넘지 않을 경우
			if (MAX_SPEED >= speed + amount)
			{
				speed += amount;
			}
			
			// 가속된 값이 최대 속도를 넘을 경우
			else
			{
				speed = MAX_SPEED;
			}
		}
	}
	
	/**
	 * 감속 함수
	 *
	 * @param amount: [int] 속도
	 */
	public void downSpeed(int amount)
	{
		// 시동이 걸렸을 경우
		if (IS_STARTED)
		{
			// 감속된 값이 0보다 클 경우
			if (0 <= speed - amount)
			{
				speed -= amount;
			}
			
			// 감속된 값이 0보다 작을 경우
			else
			{
				speed = 0;
			}
		}
	}
}
```

위의 코드 Car 클래스는 자동차라는 현실의 객체를 매우 간단한 형태로 구현한 클래스다.

<br />

* **멤버 변수** (상태)
  * `IS_STARTED` 자동차 시동 여부
  * `MAX_SPEED`: 최대 속도
  * `speed`: 현재 속도

<br />

* **메소드** (동작)
  * `startUp`: 엔진 시동
  * `shutdown`: 엔진 정지
  * `getSpeed`: 현재 속도 표시
  * `upSpeed`: 가속
  * `downSpeed`: 감속

<br />

Car 클래스의 요소는 위와 같이 구분된다. JAVA에서 이 객체를 사용하려면 메모리에 할당해야하고, 이렇게 할당된 객체를 <span class="teal-400">인스턴스</span>(Instance)라 칭한다.

Car 클래스를 메모리에 할당하여 새로운 인스턴스를 만드는 것은 현실에서 자동차 하나를 뽑는 것과 동일한 개념이다.

## 객체지향

객체**지향**이므로, 앞서 언급했듯이 이를 이해하기 위해선 객체를 이해해야한다. 이미 이전 문단에서 객체에 대해 장황하게 설명했으므로, <span class="teal-400">객체지향</span>은 이러한 객체를 통해 코드를 구성하는 방법론이라 정의할 수 있다.

모든 객체는 각 객체의 특성에 부합하는 상태와 동작을 가지며, 이를 통해 객체 간의 상호작용을 코드로 나타낼 수 있다. 객체지향은 이러한 객체의 상호작용을 코드로 나타낸다.

일례로 JAVA는 `String`, `HashMap` 등, 모든 요소를 객체(Object)로 다룬다. 우리는 JAVA로 필요한 객체를 메모리에 할당하고, 객체가 가진 변수나 메소드를 사용하여 코딩한다. 이러한 JAVA의 프로그래밍 방식은 지금껏 설명한 객체지향의 그 것과 동일함을 알 수 있다.

# 그래서 이걸 왜 쓰는데?

객체지향을 차용한 언어는 매우 많다. 대표격인 JAVA 이외에도 C++, C#, Visual Basic, Swift, Python 등이 있다. 또한 이 언어들은 우리에게 매우 익숙한 이름일 뿐만 아니라, 프로그래밍 언어에서 다들 한 자리씩은 차지하는 매우 비중있는 언어들이다.

그렇다면 객체지향 언어가 개발자들에게 그토록 널리 쓰이며, 사랑받을 수 있었던 이유는 무엇일까?

객체지향은 절차지향의 후발주자다. 보통 이런 경우의 후발주자는 선발의 단점 혹은 니즈들을 개선하여 출시하므로 기능 혹은 편의성에서 많은 이점을 가진다. 객체지향은 특히 생산성과 유지보수 용이성을 높이는 데 포커스를 두었으며, 덕분에 객체지향 언어를 구사하는 개발자는 개발을 비교적 쉽고 빠르게 수행할 수 있었다. 이를 가능케한 객체지향의 특징은 크게 세 가지가 존재한다.

## 캡슐화 (Encapulation)

객체. 즉, <span class="blue-400">클래스의 내부 변수와 메소드를 하나로 패키징</span>하는 특징이다.

객체에 선언된 변수나 메소드가 구분없이 중구난방으로 접근할 수 있다면 정상적인 객체로 보기 어렵다.

<span class="primary">캡슐화</span>와 비슷한 개념으로 <span class="primary">정보 은닉</span>이라는 개념이 있다.

정보 은닉은 객체의 내부 구현을 숨김으로써 객체가 반드시 정해진 메소드를 통해 상호작용하도록 유도한다.

JAVA의 경우 <span class="orange-700">접근 제어자</span>를 통해 객체의 캡슐화, 은닉화를 구현한다.

* `public`: 다른 객체에서 해당 객체의 인스턴스를 생성하여 접근할 수 있다.
* `protected`: 해당 객체를 상속받은 객체 내부에서 접근할 수 있다. 단순 인스턴스에선 접근할 수 없다.
* `private`: 선언된 객체 내부에서만 사용 가능하며, 외부에선 어떠한 방법으로든 해당 지시자를 가진 변수 혹은 메소드를 사용할 수 없다.

이 두 개념은 객체의 응집도와 독립성을 높임으로써 객체의 모듈화를 지향한다. 객체지향은 객체의 모듈화를 추구하는데, 객체의 모듈화가 잘 이루어져있을 경우 모듈 단위의 재사용이 매우 용이하고, 모듈의 사용을 통해 중복되는 코드를 제거함으로써 유지보수의 용이성을 높인다.

## 상속 (Inheritance)

<span class="teal-400">상속</span>이란 <span class="blue-400">객체가 다른 객체를 상속받아 상속받은 객체의 요소를 사용</span>하는 것을 의미한다.

이 때 객체를 상속받은 객체는 <span class="teal-400">자식</span>, 상속된 객체는 <span class="teal-400">부모</span>라 칭한다.

자식 객체는 상속된 부모 객체의 은닉화 구성에 따라 정해진 변수, 메소드에 접근할 수 있다. 그 뿐만 아니라 자식 객체의 특성에 따라 부모 객체에 기술된 메소드를 변경할 수 있으며, 이를 <span class="teal-400">오버라이딩</span>(Overriding)이라 한다.

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

## 다형성 (Polymorphism)

<span class="teal-400">다형성</span>은 동일한 이름을 가진 메소드가 다양한 형태로 표현되는 것을 의미한다.

일반적으로, 한 객체에 동일한 메소드는 존재할 수 없다. 그러나 동일한 이름을 가진 메소드라도 받는 매개변수가 다르다면, 별개의 메소드로 취급한다.

``` java
/**
 * 컨버터 클래스
 *
 * @author RWB
 * @since 2021.08.06 Fri 23:46:44
 */
public class Converter
{
	/**
	 * 변환 함수
	 *
	 * @param num: [int] 숫자
	 */
	public void convert(int num)
	{
		System.out.println(new StringBuilder().append("int: ").append(num));
	}
	
	/**
	 * 변환 함수
	 *
	 * @param text: [String] 문자열
	 */
	public void convert(String text)
	{
		System.out.println(new StringBuilder().append("String: ").append(text));
	}
	
	/**
	 * 변환 함수
	 *
	 * @param flag: [boolean] T/F
	 */
	public void convert(boolean flag)
	{
		System.out.println(new StringBuilder().append("boolean: ").append(flag));
	}
	
	/**
	 * 변환 함수
	 *
	 * @param c: [char] 문자
	 */
	public void convert(char c)
	{
		System.out.println(new StringBuilder().append("char: ").append(c));
	}
}
```

위 소스는 `Converter` 클래스로, 메소드의 이름이 모두 `convert`로 동일함을 알 수 있다. 하지만 각각의 메소드 모두 매개변수가 다르다. 이 경우 다형성에 의해 각각의 메소드가 독립적인 메소드로 인정받게된다.

다형성의 존재로 인해 코드의 일관성을 유지할 수 있다. 대표적으로 우리가 콘솔에 출력할 때 사용하는 `System.out.println()` 메소드가 이에 해당한다.

``` java
public void println(float x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void println(double x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void println(char[] x) {
	if (getClass() == PrintStream.class) {
		writeln(x);
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void println(String x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}
```

위 소스는 `System.out.println()`의 내부 소스다. 보다시피 이름이 동일하고, 동작까지도 콘솔에 출력하는 것으로 동일하지만 다형성으로 인해 각각의 메소드가 온전한 하나로 인정된다.

만약 다형성이라는 개념이 없다면 어떨까? 동일한 동작을 함에도 매개변수가 달라진다는 이유만으로 비슷한 이름을 가진 메소드를 만들어야하고, 개발자는 각 매개변수에 맞게 메소드를 사용해야한다.

``` java
public void printlnFloat(float x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void printlnDouble(double x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void printlnChar(char[] x) {
	if (getClass() == PrintStream.class) {
		writeln(x);
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void printlnString(String x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}
```

즉, 위와 같은 설계가 강요된다. 코드를 설계하다보면 동일한 동작에 다양한 종류의 객체가 와야할 수도 있다. JAVA는 하나의 매개변수 = 하나의 타입이라는 원칙을 고수하므로, JavaScript와 같이 다양한 종류의 타입이 매개변수로 올 수 없다.

다형성을 활용하면 이러한 문제를 효과적으로 타개할 수 있다. 동일한 이름으로 다양한 매개변수를 받는 메소드를 작성하면, 개발자는 이를 사용 시 별다른 타입 구분 없이 마치 동일한 메소드를 사용한다는 개발 경험을 제공한다.

``` java
// println(String x)
System.out.println("text");

// println(double x)
System.out.println(1.5D);
```

위와 같이 개발자가 별도로 타입을 구분하지 않고 사용해도, 컴파일 시 해당 매개변수를 받는 메소드로 호출한다.

주의할 점이 하나 있다. 다형성은 반드시 매개변수로 구분한다. 반환값의 경우 다형성이 적용되지 않는다.

``` java
public void println(char[] x) {
	if (getClass() == PrintStream.class) {
		writeln(x);
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public void println(String x) {
	if (getClass() == PrintStream.class) {
		writeln(String.valueOf(x));
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}
```

위 경우, 매개변수가 `char[]`, `String`으로 각각 다르므로 다형성이 적용된다.

``` java
public void println(char[] x) {
	if (getClass() == PrintStream.class) {
		writeln(x);
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}
}

public boolean println(char[] x) {
	if (getClass() == PrintStream.class) {
		writeln(x);
	} else {
		synchronized (this) {
			print(x);
			newLine();
		}
	}

	return true;
}
```

반대로 위 경우는 메소드명과 매개변수는 동일하지만, 반환값이 다르다. 매개변수와 달리 <span class="red-400">반환값은 다형성이 적용되지 않으므로, 중복된 메소드로 취급</span>된다. 따라서 위 소소는 컴파일 오류를 일으킨다.
다형성은 코드의 일관성을 유지하는데 기여하며, 코드의 가독성과 생산성을 높여준다.

# 객체지향 5원칙

올바른 객체지향 설계를 위해 지켜야하는 원칙이 있으며, 이 다섯 가지 원칙을 통틀어 <span class="amber-600">객체지향 5원칙</span>이라 명명한다.

## 단일 책임 원칙 (Single Responsibility Principle)

<span class="red-600">하나의 객체는 단 하나의 책임을 가진다</span>는 원칙이다.

강한 모듈화는 약한 연관성이라고도 할 수 있다. 하나의 객체가 다수의 동작에 책임을 질 경우, 다른 모듈이 수정됨에 따라 그 영향을 받을 확률이 매우 커진다. 여기저기 결합되어 있으니, 그 만큼 영향을 받을 파이프 또한 많아지는 셈이다.

로직을 작성함에 있어서 하나의 객체에 많은 책임이 요구될 경우, 요구되는 책임 별로 객체를 분산하여 각 모듈을 연결하는 것이 바람직하다.

## 개방-폐쇄 원칙 (Open-Closed Principle)

객체를 다룸에 있어서 <span class="red-600">객체의 확장은 개방적으로, 객체의 수정은 폐쇄적</span>으로 대하는 원칙이다.

예를 들어, 자동차라는 부모 객체가 있고, 가속과 감속 두 동작이 정의되어있다고 가정해보자. 자동차 객체를 확장시켜 소형차, 중형차 등을 구현할 수 있다. 즉, 소형차의 부모 객체는 자동차가 된다.

여기서 소형차의 가속 매커니즘이 타 자동차와 다르다면 어떻게 해야할까? 자동차가 가진 공통 동작인 가속 동작을 오버라이딩하여 원하는 동작을 별도로 구현하면 된다.

자식 객체의 매커니즘이 바뀐다고 해서 부모 객체의 메소드를 수정하지는 않는다. 만약 이런 관점으로 접근한다면, 부모 객체의 메소드를 사용하는 모든 자식 객체가 영향을 받게 된다.

때문에 확장은 자유롭게, 수정을 제한적으로 접근한다.

## 리스코프 치환 원칙 (Liskov Substitution Principle)

<span class="red-600">자식 객체는 부모 객체를 대체</span>할 수 있다는 원칙이다.

예를 들어, 자동차 객체를 부모로 하는 소형차 객체가 있다고 가정하자. 객체지향을 잘 지켜 구현했다면 소형차는 부모 객체인 자동차의 특성을 모두 포함한다.

소형차가 자동차의 특징을 모두 포함하고 있으므로, 자동차를 완전히 대체할 수 있다.

## 인터페이스 분리 원칙 (Interface Segregation Principle)

<span class="red-600">클라이언트 자신이 사용하지 않는 메소드에 의존성을 가지면 안된다</span>는 원칙이다.

만약 인터페이스의 규모나 동작이 너무 광범위할 경우 각각의 작은 단위로 분리하여 클라이언트가 필요한 인터페이스만을 사용하도록 한다.

![image](https://user-images.githubusercontent.com/50317129/128585790-a761f795-b4da-4a52-865d-d2dd4b858f20.png)

예를 들어, 스마트폰이라는 객체가 있다고 가정하자. 이 스마트폰 객체는 비교적 최신에 나온 덕분에 일반적인 스마트폰 기능 외에도 무선 충전, AR 뷰어, 생체인식 등의 다채로운 기능을 포함하고 있다.

이를 가지고 S20을 구현하면 스마트폰 객체의 동작 모두가 필요하므로 ISP를 만족한다. 그러나 S2를 구현할 경우, 무선 충전, 생체인식과 같은 기능을 제공하지 않는다. 그럼에도 불구하고 부모 객체인 스마트폰에 이러한 인터페이스가 포함되어 있으므로, S2 입장에서는 필요하지도 않은 기능을 구현해야하는 낭비가 발생한다.

때문에 스마트폰 객체의 기능을 각각의 인터페이스로 분리하여 필요한 모듈만을 연결하면 S20, S2 모두 필요한 인터페이스만을 상속받아 구현할 수 있게 된다.

## 의존성 역전 원칙 (Dependency Inversion Principle)

<span class="red-600">클라이언특 자신이 사용하지 않는 메소드에 의존성을 가지면 안된다</span>