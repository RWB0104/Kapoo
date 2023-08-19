---
title: "[OOP] 객체지향의 특징 - 다형성(Polymorphism)"
excerpt: "객체지향 언어는 동일한 이름을 가진 메소드를 허용하지 않는다. 예를 들어, \"먹는다\"는 동작이 구현된 메소드가 있다고 가정하자. 먹는다는 동일한 동작이 구태여 두 개나 구현될 필요는 없다. 이러한 관점에서 본다면 메소드의 고유 아이덴티티라고도 불릴 수 있는 메소드명의 유니크화는 어쩌면 당연하다. 하지만 조금 생각해보면 좀 이상하다. JAVA는 타입에 죽고 타입에 산다. JavaScript와 달리 파라미터에 아무 타입이나 넣을 수 없기 때문에, 정해진 타입 이외의 무언가를 넣으면 컴파일 단계에서 가차없이 컷한다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-12T00:32:42"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "다형성" ]
group: "객체지향"
comment: true
publish: true
---

# 다형성 (Polymorphism)

객체지향 언어는 동일한 이름을 가진 메소드를 허용하지 않는다. 예를 들어, "먹는다"는 동작이 구현된 메소드가 있다고 가정하자. 먹는다는 동일한 동작이 구태여 두 개나 구현될 필요는 없다. 이러한 관점에서 본다면 메소드의 고유 아이덴티티라고도 불릴 수 있는 메소드명의 유니크화는 어쩌면 당연하다.

하지만 조금 생각해보면 좀 이상하다. JAVA는 타입에 죽고 타입에 산다. JavaScript와 달리 파라미터에 아무 타입이나 넣을 수 없기 때문에, 정해진 타입 이외의 무언가를 넣으면 컴파일 단계에서 가차없이 컷한다.

> **One for One!**  
> 하나의 파라미터는 반드시 하나의 타입만을 가진다. `public void run(String param)`은 반드시 문자열 타입만을 파라미터로 받는다.

그말인즉슨, 동일한 메소드는 존재할 수 없으니, 해당 메소드에 입력할 수 있는 각각의 파라미터 타입도 하나로 고정된다. 하지만 `System.out.println()` 메소드를 보자. CLI 콘솔에 데이터를 출력하는 메소드로, JAVA를 다룬다면 안 써본 사람은 없는 메소드다.

``` java
public class Main
{
	public static void main(String[] args)
	{
		System.out.println("문자열 데이터");
		System.out.println(123456);
		System.out.println(true);
	}
}
```

``` out
문자열 데이터
123456
true
```

<br />
<p class="grey-600" align="center"><i>아니 아깐 동일한 메소드는 존재할 수 없다매요;;</i></p>
<br />

분명히 아까 <span class="pink-400">동일한 이름을 가진 메소드는 동일한 객체에서 존재할 수 없다</span>고 했었다. 그럼에도 불구하고 `System.out.println()`의 경우, 메소드명은 동일한데 여러 타입을 보란듯이 받아서 처리하고 있다. 어떻게 된걸까? 유명한 메소드는 예외사항이라도 적용되는걸까?

`System.out.println()`이 여러 타입을 처리할 수 있는 이유는 해당 메소드에 <span class="teal-400">다형성</span>이 적용되어있기 때문이다. 다형성이란, 하나의 객체 혹은 메소드가 여러 타입을 참조할 수 있음을 의미한다. 다형성은 크게 <span class="amber-400">객체의 다형성</span>과, <span class="amber-400">메소드의 다형성</span>으로 구분된다.

## 다형성의 예제

코드를 통해 다형성을 알아보자.

### 객체의 다형성

먼저, 객체에 적용되는 다형성이다. 객체의 경우 상속된 객체의 인스턴스 생성 시, 다형성을 적용할 수 있다.

객체의 다형성은 <span class="red-400">객체가 상속된 부모 객체의 인스턴스로 할당</span>될 수 있음을 의미한다.

``` java
class TV
{
	// 메소드
}

class SmartTV extends TV
{
	// 메소드
}
```

위와 같은 두 객체가 있다고 가정하자. `SmartTV`는 `TV`를 상속받아 구현된 객체다. 이 경우 `SmartTV`는 다형성을 적용할 수 있다.

``` java
public class Main
{
	public static void main(String[] args)
	{
		// 객체와 인스턴스 타입 일치
		TV tv = new TV();

		// 객체와 인스턴스 타입 일치
		SmartTV smart = new SmartTV();

		// SmartTV는 TV의 자식 객체이므로 다형성이 적용되어 허용
		TV tv2 = new SmartTV();

		// 불가능
		SmartTV smart2 = new TV();
	}
}
```

다른건 명확하므로 필요없고, 12번째 줄을 자세히 보자. `TV`와 `SmartTV`는 엄연히 다른 객체임에도 불구하고 인스턴스가 정상적으로 생성된다.

이는 객체의 다형성이 적용된 결과로, `SmartTV`는 `TV`를 상속받아 만들어진 객체다. 즉 `SmartTV`는 `TV`를 온전히 포함하고 있으므로 `TV`의 인스턴스로 생성이 가능하다. 이러한 객체의 다형성은 객체를 상속했을 때 뿐만 아니라, 인터페이스를 상속할때도 가능하다.

#### 다형성이 적용된 인스턴스

객체의 다형성을 다룰 때 주의할 점이 한 가지 있다. 우리는 위에서 `SmartTV` 객체를 `TV`로 생성했다. 뭐 다형성 어쩌고로 인해 인스턴스가 정상적으로 생성됨은 알겠는데, 이 `TV`인듯 `SmartTV`인듯한 인스턴스는 어떻게 동작할까?

이렇게 생성된 인스턴스 `tv2`는 `SmartTV`에 선언된 메소드들 중 `TV`에 선언된 메소드와 일치하는 메소드만 사용 가능하다.

``` java
interface Movable
{
	void move(boolean direction);
}

class Unit implements Movable
{
	@Override
	public void move(boolean direction)
	{
		// 동작
	}

	public void work(String act)
	{
		// 동작
	}
}
```

이번엔 인터페이스를 예시로 들어보자. 움직임에 대한 동작이 기술되어있는 인터페이스 `Movable`과 이를 상속받은 `Unit` 객체가 있다.

``` java
public class Main
{
	public static void main(String[] args)
	{
		Movable movable = new Unit();

		// Movable에 존재하는 메소드이므로 호출 가능
		movable.move(true);

		// Movable엔 없는 Unit만의 고유 메소드이므로 호출 불가능
		movable.work("run");
	}
}
```

객체의 다형성으로 인해 `Unit` 객체를 `Movable`로 생성할 수 있음은 잘 알 것이다. `movable`이라는 인스턴스를 만들고 `move()`, `work()` 메소드를 각각 호출해보자.

`move()`의 경우 `Movable` 인터페이스에서 상속받아 구현한 메소드고, `work()`는 `Unit`에서 직접 생성한 메소드다. 이 경우 `Unit`의 메소드를 호출할 수 있지만, `Movable`에 선언된 메소드만 호출 가능하다. 즉, `Unit`과 `Movable` 객체 간에 겹치는 메소드만 사용이 호출이 가능하다. 이 때 메소드의 동작은 `Unit`의 메소드로 동작한다.

객체의 다형성을 사용하면 동일한 객체를 상속받은 여러 객체들을 다루기 매우 편리하다.

``` java
class UnitA implements Movable
{
	@Override
	public void move(boolean direction)
	{
		work("run");
	}

	private void work(String act)
	{
		System.out.println("work: " + act);
	}
}

class UnitB implements Movable
{
	@Override
	public void move(boolean direction)
	{
		doing(3);
	}

	private void doing(int num)
	{
		System.out.println("doing: " + num);
	}
}

class UnitC implements Movable
{
	@Override
	public void move(boolean direction)
	{
		active(true);
	}

	private void active(boolean flag)
	{
		System.out.println("active: " + flag);
	}
}
```

위 처럼 동일한 인터페이스 `Movable`을 상속받은 여러 객체가 있다고 가정하자. 이 객체들은 각각 개별적인 객체지만, `Movable`을 상속받았으므로, 세 객체 모두 다형성을 통해 `Movable` 인스턴스로 할당할 수 있다.

``` java
public class Main
{
	public static void main(String[] args)
	{
		Movable movable = switch (new Random().nextInt(3))
		{
			case 0 -> new UnitA();
			case 1 -> new UnitB();
			case 2 -> new UnitC();
			default -> null;
		};
		
		movable.move(true);
	}
}
```

``` output
# 실행 시마다 달라짐
work: run
```

실행 시마다 `UnitA`, `UnitB`, `UnitC` 중 무작위로 선택된 객체의 인스턴스를 `Movable`에 할당한다. 서로 같은 객체임에도 `Movable`이라는 부모 객체로 인스턴스를 할당하여 공통된 메소드를 호출할 수 있다. 호출된 공통 메소드인 `move()` 내부에는 `Unit` 고유의 메소드가 포함되어도 상관없다.

이처럼 메소드의 입력으로 여러 타입의 파라미터가 와야할 경우, 이 파라미터들이 동일한 객체를 상속하고 있다면 다형성을 적용하여 공통된 타입으로 다룰 수 있다.

### 메소드의 다형성

메소드 역시 다형성을 적용할 수 있다. 객체의 다형성은 객체 자신의 타입과 연관되지만, 메소드의 다형성은 메소드가 사용하는 파라미터의 타입과 연관된다.

메소드의 다형성은 <span class="red-400">메소드가 서로 동일한 이름을 가지더라도, 입력받는 파라미터가 다르면 각각 개별적인 메소드로 취급</span>함을 의미한다.

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

즉, 위와 같은 설계가 강요된다. 코드를 설계하다보면 동일한 동작에 다양한 종류의 객체가 와야할 수도 있다. JAVA는 <span class="green-400">하나의 매개변수 = 하나의 타입</span>이라는 원칙을 고수하므로, JavaScript와 같이 다양한 종류의 타입이 매개변수로 올 수 없다.

다형성을 활용하면 이러한 문제를 효과적으로 타개할 수 있다. 동일한 이름으로 다양한 매개변수를 받는 메소드를 작성하면, 개발자는 이를 사용 시 별다른 타입 구분 없이 마치 동일한 메소드를 사용한다는 개발 경험을 제공한다.

``` java
// println(String x)
System.out.println("text");

// println(double x)
System.out.println(1.5D);
```

위와 같이 개발자가 별도로 타입을 구분하지 않고 사용해도, 컴파일 시 해당 매개변수를 받는 메소드가 자동으로 호출된다.

#### 반환값이 다른 메소드의 다형성?

호기심이 많다면 이런 케이스를 생각해볼 수 있다. 매개변수에 대한 다형성이 있으면, 메소드의 반환값에 대한 다형성도 있지 않을까? 좋은 발상이지만, 아쉽게도 다형성은 반드시 매개변수로만 구분한다. <span class="red-400">반환값의 경우 다형성이 적용되지 않는다.</span>

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

# 마무리

객체의 다형성은 생산성에 초점이 맞춰져있다. 동일한 메소드로 여러 타입의 데이터를 처리하거나, 공통 상속된 객체를 처리함으로써 중복된 코드 소요를 제거하고 개발 편의성을 높여준다. 다형성을 적극적으로 활용하여 중복된 코드는 줄이고, 데이터 처리의 범위는 넓혀보자.