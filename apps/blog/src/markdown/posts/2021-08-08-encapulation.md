---
title: "[OOP] 객체지향의 특징 - 캡슐화(Encapsulation)와 정보 은닉"
excerpt: "객체. 즉, 클래스의 내부 변수와 메소드를 하나로 패키징하는 특징이다. 객체에 선언된 변수나 메소드가 구분없이 중구난방으로 접근할 수 있다면 정상적인 객체로 보기 어렵다. 캡슐화와 비슷한 개념으로 정보 은닉이라는 개념이 있다. 정보 은닉은 객체의 내부 구현을 숨김으로써 객체가 반드시 정해진 메소드를 통해 상호작용하도록 유도한다. 이 두 개념은 객체의 응집도와 독립성을 높임으로써 객체의 모듈화를 지향한다. 객체의 모듈화가 잘 이루어져있을 경우 모듈 단위의 재사용이 매우 용이하다. 여러 로직에서 중복되는 코드를 모듈로 대체하면 모듈 내부의 소스만 수정하는 것으로 수정사항을 반영할 수 있다. 이는 곧 간편한 유지보수와 직결된다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: 1628388305000
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "캡슐화", "정보 은닉", "접근제어자" ]
group: "객체지향"
comment: true
publish: true
---

# 캡슐화 (Encapsulation)

객체. 즉, <span class="blue-400">클래스의 내부 변수와 메소드를 하나로 패키징</span>하는 특징이다.

객체에 선언된 변수나 메소드가 구분없이 중구난방으로 접근할 수 있다면 정상적인 객체로 보기 어렵다.

<span class="blue-400">캡슐화</span>와 비슷한 개념으로 <span class="blue-400">정보 은닉</span>이라는 개념이 있다.

정보 은닉은 객체의 내부 구현을 숨김으로써 객체가 반드시 정해진 메소드를 통해 상호작용하도록 유도한다.

이 두 개념은 객체의 응집도와 독립성을 높임으로써 객체의 모듈화를 지향한다. 객체의 모듈화가 잘 이루어져있을 경우 모듈 단위의 재사용이 매우 용이하다. 여러 로직에서 중복되는 코드를 모듈로 대체하면 모듈 내부의 소스만 수정하는 것으로 수정사항을 반영할 수 있다. 이는 곧 간편한 유지보수와 직결된다.

# 캡슐화의 예제

JAVA의 경우 <span class="orange-700">접근제어자</span>를 통해 객체의 캡슐화, 은닉화를 구현한다.

* `public`: 다른 객체에서 해당 객체의 인스턴스를 생성하여 접근할 수 있다.
* `protected`: 해당 객체를 상속받은 객체 내부에서 접근할 수 있다. 단순 인스턴스에선 접근할 수 없다.
* `default`: 동일한 패키지 내의 객체에서 인스턴스를 생성하여 접근할 수 있다.
* `private`: 선언된 객체 내부에서만 사용 가능하며, 외부에선 어떠한 방법으로든 해당 지시자를 가진 변수 혹은 메소드를 사용할 수 없다.

대표적인 접근제어자는 위와 같으며, 이를 통해 <span class="red-400">객체 내부의 상태와 동작의 접근 방법을 강제</span>할 수 있다.

``` java
public class A
{
	public void run()
	{
		// 동작
	}
}
```

``` java
public class B
{
	private void publicMethod()
	{
		System.out.println("public 메소드 접근");
	}

	default void defaultMethod()
	{
		System.out.println("default 메소드 접근");
	}

	protected void protectedMethod()
	{
		System.out.println("protected 메소드 접근");
	}

	private void privateMethod()
	{
		System.out.println("private 메소드 접근");
	}
}
```

## public 요소의 접근 방법

`public`은 접근제어자 중 <span class="orange-400">가장 개방적인 접근제어자</span>다. 이름부터가 공공(public)이니 말 다했다.

별다른 조건 없이 객체 `A`에서 객체 `B`의 새로운 인스턴스를 생성하면 `A`에서 `B`의 `public` 요소에 접근할 수 있는 권한이 생긴다.

``` java
public class A
{
	public void run()
	{
		B b = new B();
		b.publicMethod();
	}
}
```

위 처럼 `publicMethod()`에 정상적으로 접근 가능하다. 반드시 외부의 접근이 필요한 멤버 변수나 메소드에만 사용해야한다. 해당 접근제어자를 <span class="red-400">남용할 경우 불필요한 요소를 개방</span>하게 되어 정보 은닉이 이루어지지 않는다.

## protected 요소의 접근 방법

`protected`는 상속과 연관된 접근제어자다. 이 제어자를 가진 요소는 <span class="orange-400">해당 객체를 상속받은 객체만 접근</span>할 수 있다.

객체 `A`에서 객체 `B`를 상속받는다. 이 때 자식 객체는 `A`, 부모 객체는 `B`가 된다. 상속을 받게 되면 `A`에서 `B`의 `protectedMethod` 요소에 접근할 수 있는 권한이 생긴다.

``` java
public class A extends B
{
	public void run()
	{
		protectedMethod();
	}
}
```

위 처럼 `protectedMethod()`에 정상적으로 접근 가능하다. `public`과 달리 별도의 인스턴스는 받지 않아도 된다. 이는 `A`가 `B`를 상속받기 때문에, `B`의 <span class="lightBlue-400">멤버 변수와 메소드의 접근 권한을 일부 승계</span>하기 때문

## default 요소의 접근 방법

`default`는 제한적인 `public` 접근제어자라 할 수 있다. 이 제어자를 가진 요소는 <span class="orange-400">동일한 패키지 내에서만 접근</span>할 수 있다.

객체 `A`와 `B`가 동일한 패키지에 위치할 때, `A`에서 `B`의 새로운 인스턴스를 할당받으면 `defaultMethod()`에 접근할 수 있다.

``` java
public class A
{
	public void run()
	{
		B b = new B();
		b.publicMethod();
	}
}
```

패키지가 같을 경우 `public`을, 패키지가 다를 경우 `private`과 같은 동작을 한다. 동일한 패키지 여부에 따라 개방/폐쇄가 갈린다. 만약 변수나 메소드에 <span class="lightBlue-400">별다른 접근제어자를 지정하지 않았다면 이 제어자가 기본으로 적용</span>된다.

``` java
public class Main
{
	void defaultMethod()
	{
		// 접근제어자를 지정하지 않으면 default로 자동 지정
	}
}
```

## private 요소의 접근 방법

`private`는 반드시 <span class="orange-400">선언된 객체 내부에서만 접근</span>할 수 있다. 즉, `B`가 아닌 어떤 클래스에서도 `privateMethod()`에 접근할 수 없다. 메소드 뿐만 아니라 멤버 변수도 마찬가지다. 은닉화를 위한 접근제어자로, <span class="red-400">해당 접근제어자의 사용을 통해 내부 변수나 메소드를 은닉</span>할 수 있다.

객체는 기본적으로 은닉화가 이루어져야한다. 객체를 구현할 때 개방/폐쇄의 명세를 디테일하게 명세하지 않았다면 일단은 `private`로 만드는 것이 좋다. 이후 설계 과정에서 적절한 개방이 필요할 경우 해당 메소드나 변수를 개방한다. 이와 같은 방식은 필요 시에 요소를 적절히 개방함으로써, 차후 프로젝트나 객체의 규모가 커짐에 따라 놓칠 수 있는 불필요한 개방을 미연에 방지할 수 있다. 즉, 올바른 캡슐화/은닉화를 구현하는데 용이한 방식이다.

# 정리

별다른 생각 없이 모든 메소드를 개방시킨 객체는 모듈이라 보기 어렵다. 반대로 모든 메소드를 은폐시킨 객체 역시 모듈로써의 의미가 전혀 없다. 즉, 객체가 모듈의 의미를 갖기 위해선 적절히 설계된 개방/폐쇄가 필요하다는 뜻이다.

캡슐화와 정보 은닉을 메소드가 모듈로써의 의미를 갖게 헤주는 중요한 요소이다. 사용하는 언어의 접근제어자에 대한 이해를 통해 올바른 캡슐화, 정보 은닉을 지키는 객체를 구현하자.