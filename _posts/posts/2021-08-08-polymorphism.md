---
title: "[OOP] 캡슐화(Encapsulation)와 정보 은닉"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-08T11:05:05"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "캡슐화", "정보 은닉", "접근제어자" ]
group: "객체지향"
comment: true
publish: false
---

# 다형성 (Polymorphism)

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