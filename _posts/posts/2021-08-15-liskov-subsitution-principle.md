---
title: "[OOP] 객체지향 5원칙(SOLID) - 인터페이스 분리 원칙 (Interface Segregation Principle)"
excerpt: "리스코프 치환 원칙은 부모 객체와 이를 상속한 자식 객체가 있을 때 부모 객체를 호출하는 동작에서 자식 객체가 부모 객체를 완전히 대체할 수 있다는 원칙이다. 객체지향 언어에선 객체의 상속이 일어난다. 이 과정에서 부모/자식 관계가 정의된다. 자식 객체는 부모 객체의 특성을 가지며, 이를 토대로 확장할 수 있다. 하지만 이 과정에서 무리하거나 객체의 의의와 어긋나는 확장으로 인해 잘못된 방향으로 상속되는 경우가 생긴다. 리스코프 치환 원칙은 올바른 상속을 위해 자식 객체의 확장이 부모 객체의 방향을 온전히 따르도록 권고하는 원칙이다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-15T13:42:11"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "객체지향 5원칙" ]
group: "객체지향"
comment: true
publish: true
---

# 리스코프 치환 원칙 (Liskov Subsitution Principle)

<span class="orange-400">리스코프 치환 원칙</span>은 부모 객체와 이를 상속한 자식 객체가 있을 때 <span class="red-600">부모 객체를 호출하는 동작에서 자식 객체가 부모 객체를 완전히 대체할 수 있다</span>는 원칙이다.

객체지향 언어에선 객체의 상속이 일어난다. 이 과정에서 부모/자식 관계가 정의된다. 자식 객체는 부모 객체의 특성을 가지며, 이를 토대로 확장할 수 있다. 하지만 이 과정에서 무리하거나 객체의 의의와 어긋나는 확장으로 인해 잘못된 방향으로 상속되는 경우가 생긴다.

리스코프 치환 원칙은 올바른 상속을 위해 자식 객체의 확장이 부모 객체의 방향을 온전히 따르도록 권고하는 원칙이다.

# 코드로 보는 리스코프 치환 원칙

리스코프 치환 원칙을 설명할 때 많이 사용하는 예제로 직사각형과 정사각형의 관계가 있다.

## 리스코프 치환 원칙을 위배한 코드

``` java
/**
 * 직사각형 클래스
 *
 * @author RWB
 * @since 2021.08.14 Sat 11:12:44
 */
public class Rectangle
{
	protected int width;
	protected int height;
	
	/**
	 * 너비 반환 함수
	 *
	 * @return [int] 너비
	 */
	public int getWidth()
	{
		return width;
	}
	
	/**
	 * 높이 반환 함수
	 *
	 * @return [int] 높이
	 */
	public int getHeight()
	{
		return height;
	}
	
	/**
	 * 너비 할당 함수
	 *
	 * @param width: [int] 너비
	 */
	public void setWidth(int width)
	{
		this.width = width;
	}
	
	/**
	 * 높이 할당 함수
	 *
	 * @param height: [int] 높이
	 */
	public void setHeight(int height)
	{
		this.height = height;
	}
	
	/**
	 * 넓이 반환 함수
	 *
	 * @return [int] 넓이
	 */
	public int getArea()
	{
		return width * height;
	}
}
```

`Rectangle`은 직사각형을 구현한 객체다. 너비와 높이를 지정, 반환할 수 있으며, 지정된 값을 통해 자신의 넓이를 계산할 수 있다.

정사각형 역시 넓게 보면 직사각형의 한 종류이니, <span class="red-400">직사각형을 상속하여 정사각형 객체를 빠르게 만들 수 있을 것이라 생각했다.</span>

``` java
/**
 * 정사각형 클래스
 *
 * @author RWB
 * @since 2021.08.14 Sat 11:19:07
 */
public class Square extends Rectangle
{
	/**
	 * 너비 할당 함수
	 *
	 * @param width: [int] 너비
	 */
	@Override
	public void setWidth(int width)
	{
		super.setWidth(width);
		super.setHeight(getWidth());
	}
	
	/**
	 * 높이 할당 함수
	 *
	 * @param height: [int] 높이
	 */
	@Override
	public void setHeight(int height)
	{
		super.setHeight(height);
		super.setWidth(getHeight());
	}
}
```

위 처럼 정사각형 객체 `Square`를 `Rectangle`의 상속을 통해 쉽게 구현할 수 있었다.

정사각형의 경우 직사각형과 달리 너비와 높이가 같으니, 너비나 높이를 지정하면 그에 맞게 너비와 높이를 모두 일치시켜주도록 오버라이딩을 수행했다.

구현한 `Rectangle`의 넓이를 구해보자.

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
		Rectangle rectangle = new Rectangle();
		rectangle.setWidth(10);
		rectangle.setHeight(5);
		
		System.out.println(rectangle.getArea());
	}
}
```

``` output
50
```

`Rectangle`의 넓이를 구하는 소스는 이와 같다. 너비가 10, 높이가 5로 할당됐으므로 넓이 50이 정상적으로 반환된다.

리스코프 치환 원칙에 의하면, 자식 객체는 부모 객체를 완전히 대체할 수 있다고 했으므로, `Rectangle`을 상속받은 `Square`로 대체하여 넓이를 구해보자.

`Square`가 `Rectangle`을 완전히 대체했다면 동일한 결과인 50이 반환되어야 한다.

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
		Rectangle rectangle = new Square();
		rectangle.setWidth(10);
		rectangle.setHeight(5);
		
		System.out.println(rectangle.getArea());
	}
}
```

``` output
25
```

어째서인지 넓이는 50이 아닌 25로 반환됐다. 자세히 살펴보니, 마지막에 수행된 `setHeight(5)`가 객체의 너비/높이를 모두 5로 할당했다. 그러니 넓이도 당연히 25가 출력될 수밖에 없었던 걸로 보인다. 즉, 이 객체는 리스코프 치환 원칙에 위배되는 코드다.

곰곰히 생각해보면, 직사각형과 정사각형은 상속관계가 전혀 될 수 없다. 사각형의 특징을 서로 갖고있긴 하지만, 두 사각형 모두 사각형의 한 종류일 뿐으로, 하나가 다른 하나를 완전히 포함하지 못 하는 구조다.

이렇게 잘못된 객체를 상속하거나, 올바르게 확장하지 못 할 경우 겉으로 보기엔 정상적이지만 올바른 객체는 아니다.

## 리스코프 치환 원칙을 준수한 코드

그렇다면 이 코드를 어떻게 리스코프 치환 원칙에 부합하게끔 구성할 수 있을까?

답은 올바른 상속과 구현에 있다. 앞서 설명했다시피, 직사각형과 정사각형은 상속의 관계가 성립되기 어렵다. 따라서 이보다 더 상위 개념인 사각형 객체를 구현하고 정사각형, 직사각형이 이를 상속받으면 될 것이다.

``` java
/**
 * 사각형 객체
 *
 * @author RWB
 * @since 2021.08.14 Sat 11:39:02
 */
public class Shape
{
	protected int width;
	protected int height;
	
	/**
	 * 너비 반환 함수
	 *
	 * @return [int] 너비
	 */
	public int getWidth()
	{
		return width;
	}
	
	/**
	 * 높이 반환 함수
	 *
	 * @return [int] 높이
	 */
	public int getHeight()
	{
		return height;
	}
	
	/**
	 * 너비 할당 함수
	 *
	 * @param width: [int] 너비
	 */
	public void setWidth(int width)
	{
		this.width = width;
	}
	
	/**
	 * 높이 할당 함수
	 *
	 * @param height: [int] 높이
	 */
	public void setHeight(int height)
	{
		this.height = height;
	}
	
	/**
	 * 넓이 반환 함수
	 *
	 * @return [int] 넓이
	 */
	public int getArea()
	{
		return width * height;
	}
}
```

위와 같이 `Shape`라는 사각형 객체를 구현한다.

``` java
/**
 * 직사각형 클래스
 *
 * @author RWB
 * @since 2021.08.14 Sat 11:12:44
 */
class Rectangle extends Shape
{
	/**
	 * Rectangle 생성자 함수
	 *
	 * @param width: [int] 너비
	 * @param height: [int] 높이
	 */
	public Rectangle(int width, int height)
	{
		setWidth(width);
		setHeight(height);
	}
}

/**
 * 정사각형 클래스
 *
 * @author RWB
 * @since 2021.08.14 Sat 11:19:07
 */
class Square extends Shape
{
	/**
	 * Square 생성자 함수
	 *
	 * @param length: [int] 길이
	 */
	public Square(int length)
	{
		setWidth(length);
		setHeight(length);
	}
}
```

`Shape`를 상속받는 두 사각형 `Rectangle`과 `Square` 객체는 위와 같다. `Rectangle`은 인스턴스 생성 시 `width`와 `height`를 파라미터로 받으며, `Square`는 각 변의 길이가 모두 동일하므로 `length` 하나만을 파라미터로 받는다.

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
		Shape rectangle = new Rectangle(10, 5);
		Shape square = new Square(5);

		System.out.println(rectangle.getArea());
		System.out.println(square.getArea());
	}
}
```

``` output
50
25
```

이제 더 이상 `Rectangle`과 `Square`가 상속 관계가 아니므로, 리스코프 치환 원칙의 영향에서 벗어났다.

# 정리

리스코프 치환 원칙은 상속되는 객체는 반드시 부모 객체를 완전히 대체해도 아무런 문제가 없도록 권고한다. 위의 직사각형과 정사각형의 케이스처럼 올바르지 못한 상속관계는 제거하고, 부모 객체의 동작을 완벽하게 대체할 수 있는 관계만 상속하도록 코드를 설계해야한다.

리스코프 치환 원칙을 지키기 위해선 가급적 부모 객체의 일반 메소드를 그 의도와 다르게 오버라이딩 하지 않는 것이 중요하다.

부모 객체의 오버라이딩은 주로 동일한 메소드를 자식 객체만의 동작을 추가하기 위해 한다는 걸 감안하면 매우 준수하기 까다로운 원칙.
