---
title: "[OOP] 객체지향 5원칙(SOLID) - 의존성 역전 원칙 (Dependency Inversion Principle)"
excerpt: "의존성 역전 원칙이란 객체는 저수준 모듈보다 고수준 모듈에 의존해야한다는 원칙이다. 말이 좀 어렵다. 고수준 모듈은 뭐고, 저수준 모듈은 또 뭐란 말인가? 고/저수준 모델의 정의는 위와 같다. 위 정의를 의존성 역전 원칙에 대입하면, 객체는 객체보다 인터페이스에 의존해야한다로 치환할 수 있다. 즉, 가급적 객체의 상속은 인터페이스를 통해 이루어져야 한다는 의미로 해석할 수 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-17T03:06:35"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "객체지향 5원칙" ]
group: "객체지향"
comment: true
publish: true
---

# 의존성 역전 원칙 (Dependency Inversion Principle)

<span class="orange-400">의존성 역전 원칙</span>이란 <span class="red-600">객체는 저수준 모듈보다 고수준 모듈에 의존해야한다</span>는 원칙이다.

말이 좀 어렵다. 고수준 모듈은 뭐고, 저수준 모듈은 또 뭐란 말인가?

* <span class="primary">고수준 모듈</span>: 인터페이스와 같은 객체의 형태나 추상적 개념
* <span class="primary">저수준 모듈</span>: 구현된 객체

고/저수준 모델의 정의는 위와 같다. 위 정의를 의존성 역전 원칙에 대입하면, <span class="red-600">객체는 객체보다 인터페이스에 의존해야한다</span>로 치환할 수 있다. 즉, 가급적 객체의 상속은 인터페이스를 통해 이루어져야 한다는 의미로 해석할 수 있다.

# 코드로 보는 의존성 역전 원칙

예시를 통해 의존성 역전 원칙을 준수하지 않은 경우와 준수한 경우 어떠한 차이가 있는지 코드를 통해 알아보자.

## 의존성 역전 원칙을 준수하지 않은 코드

어렸을 적 누구나 한 번씩 단풍에 대한 이야기를 다룬 게임을 해본적이 있을 것이다. 비록 이젠 죽어버렸지만 필자도 매우 좋아했었고, 성인이 된 후에도 방학시즌 이벤트만 되면 으레 복귀해서 게임을 즐기곤 했었다.

그 게임은 RPG 장르로, RPG가 그렇듯 다양한 직업군과 그에 맞는 스킬/무기 시스템이 갖춰져있다.

``` java
import java.util.Random;

/**
 * 한손검 객체
 *
 * @author RWB
 * @since 2021.08.17 Tue 01:36:44
 */
public class OneHandSword
{
	private final String NAME;
	private final int DAMAGE;
	
	/**
	 * OneHandSword 생성자 함수
	 *
	 * @param name: [String] 무기 이름
	 * @param damage: [int] 데미지
	 */
	public OneHandSword(String name, int damage)
	{
		NAME = name;
		DAMAGE = damage;
	}
	
	/**
	 * 공격 데미지 반환 함수
	 *
	 * @return [int] 공격 데미지 (데미지 +-5)
	 */
	public int attack()
	{
		return DAMAGE + new Random().nextInt(10) - 5;
	}
	
	/**
	 * 객체 문자열 반환 함수
	 *
	 * @return [String] 이름
	 */
	@Override
	public String toString()
	{
		return NAME;
	}
}
```

수 많은 무기 가운데 하나인 한손검을 구현한 `OneHandSword` 객체가 있다. 캐릭터는 위와 같은 무기를 장비할 수 있을 것이다. 인스턴스 생성 시 무기의 이름과 데미지를 입력하여 생성한다.

``` java
/**
 * 캐릭터 객체
 *
 * @author RWB
 * @since 2021.08.17 Tue 00:46:15
 */
public class Character
{
	private final String NAME;
	private int health;
	private OneHandSword weapon;
	
	/**
	 * Character 생성자 함수
	 *
	 * @param name: [String] 이름
	 * @param health: [int] 체력
	 * @param weapon: [OneHandSword] 무기
	 */
	public Character(String name, int health, OneHandSword weapon)
	{
		NAME = name;
		this.health = health;
		this.weapon = weapon;
	}
	
	/**
	 * 공격 데미지 반환 함수
	 *
	 * @return [int] 공격 데미지
	 */
	public int attack()
	{
		return weapon.attack();
	}
	
	/**
	 * 피격 함수
	 *
	 * @param amount: [int] 피격 데미지
	 */
	public void damaged(int amount)
	{
		health -= amount;
	}
	
	/**
	 * 무기 교체 함수
	 *
	 * @param weapon: [OneHandSword] 무기
	 */
	public void chageWeapon(OneHandSword weapon)
	{
		this.weapon = weapon;
	}
	
	/**
	 * 캐릭터 정보 출력 함수
	 */
	public void getInfo()
	{
		System.out.println("이름: " + NAME);
		System.out.println("체력: " + health);
		System.out.println("무기: " + weapon);
	}
}
```

게임 캐릭터를 구현한 `Character` 객체다. 게임 캐릭터가 취할 수 있는 기본적인 행동 일부가 구현되어있으며, 인스턴스 생성 시 캐릭터 이름, 체력, 무기를 입력하여 생성한다.

하지만 다들 알다시피, 무기엔 한손검만 있는 게 아니다. 근접계열 무기만 하더라도 두손검, 단검, 창, 도끼, 둔기 등 다양한 종류가 존재할 수 있다. 그러나 이 `Character` 객체. 애초에 한손검 외엔 쓸 수가 없는 구조다. `Character`의 인스턴스 생성 시 `OneHandSword`에 의존성을 가지기 때문. 	공격 동작을 담당하는 `attack()` 메소드 역시 `OneHandSword`에 의존성을 가진다.

이 상황에서 한손검을 제외한 다른 무기를 사용하려면 `Character`의 코드를 바꿔야한다. 즉, 이전에 다뤘던 [개방-폐쇄 원칙](/posts/2021/08/14/open-closed-principle)을 위배한다. 더 큰 문제는 무기가 바뀔 때마다 이 짓을 해줘야한다. 

## 의존성 역전 원칙을 준수한 코드

만약 위 코드가 의존성 역전 원칙을 잘 지켰다면 고민할 필요가 없는 문제다. 위 코드의 <span class="red-400">가장 큰 문제는 이미 완전하게 구현된 저수준 모듈을 의존하고 있다는 점</span>이다. 즉, 추상적인 고수준 모듈을 의존하도록 리팩토링해야한다.

``` java
/**
 * 공격 인터페이스
 *
 * @author RWB
 * @since 2021.08.17 Tue 02:07:19
 */
public interface Attackable
{
	/**
	 * 공격 추상 함수
	 *
	 * @return [int] 공격 데미지
	 */
	int attack();
	
	/**
	 * 객체 문자열 반환 추상 함수
	 *
	 * @return [String] 이름
	 */
	@Override
	String toString();
}
```

우선 고수준 모듈인 `Weapon` 인터페이스를 생성한다. 공격 데미지를 반환하는 추상 함수 `attack()`과 무기 이름을 반환하는 추상 함수 `toString()`가 선언되어있다. 앞으로 모든 공격 가능한 무기 객체는 이 인터페이스를 상속받게 될 것이다.

``` java
import java.util.Random;

/**
 * 한손검 객체
 *
 * @author RWB
 * @since 2021.08.17 Tue 01:36:44
 */
public class OneHandSword implements Attackable
{
	private final String NAME;
	private final int DAMAGE;
	
	/**
	 * OneHandSword 생성자 함수
	 *
	 * @param name: [String] 무기 이름
	 * @param damage: [int] 데미지
	 */
	public OneHandSword(String name, int damage)
	{
		NAME = name;
		DAMAGE = damage;
	}
	
	/**
	 * 공격 데미지 반환 함수
	 *
	 * @return [int] 공격 데미지 (데미지 +-5)
	 */
	@Override
	public int attack()
	{
		return DAMAGE + new Random().nextInt(10) - 5;
	}
	
	/**
	 * 객체 문자열 반환 함수
	 *
	 * @return [String] 이름
	 */
	@Override
	public String toString()
	{
		return NAME;
	}
}
```

`Attackable`를 상속받은 한손검 객체 `OneHandSword` 객체다. 상속받은 점 외에 크게 달라진 점은 없다.

``` java
/**
 * 캐릭터 객체
 *
 * @author RWB
 * @since 2021.08.17 Tue 00:46:15
 */
public class Character
{
	private final String NAME;
	private int health;
	private Attackable weapon;
	
	/**
	 * Character 생성자 함수
	 *
	 * @param name: [String] 이름
	 * @param health: [int] 체력
	 * @param weapon: [Attackable] 무기
	 */
	public Character(String name, int health, Attackable weapon)
	{
		NAME = name;
		this.health = health;
		this.weapon = weapon;
	}
	
	/**
	 * 공격 데미지 반환 함수
	 *
	 * @return [int] 공격 데미지
	 */
	public int attack()
	{
		return weapon.attack();
	}
	
	/**
	 * 피격 함수
	 *
	 * @param amount: [int] 피격 데미지
	 */
	public void damaged(int amount)
	{
		health -= amount;
	}
	
	/**
	 * 무기 교체 함수
	 *
	 * @param weapon: [Attackable] 무기
	 */
	public void chageWeapon(Attackable weapon)
	{
		this.weapon = weapon;
	}
	
	/**
	 * 캐릭터 정보 출력 함수
	 */
	public void getInfo()
	{
		System.out.println("이름: " + NAME);
		System.out.println("체력: " + health);
		System.out.println("무기: " + weapon);
	}
}
```

게임 캐릭터 `Character` 객체다. 기존의 `OneHandSword`를 파라미터에서 좀 더 고수준 모듈인 `Attackable`을 파라미터로 받는 걸 확인할 수 있다. 그 밖의 무기와 관련된 메소드 전부가 그렇다.

하나의 객체였던 저수준 모듈에서 고수준 모듈로 의존성이 바뀌게 되니, `Attackable`을 상속하는 모든 객체를 다룰 수 있다. 게임 시스템 내부적으로 모든 공격 가능한 무기는 `Attackable`을 상속받기로 가정했으므로, 공격 가능한 모든 무기를 사용할 수 있는 셈이다.

이러한 변경으로 무기의 변경에 따라 `Character`의 <span class="green-600">코드를 변경할 필요가 없으므로, 개방-폐쇄 원칙 또한 준수</span>할 수 있다.

# 정리

의존성 역전 원칙은 코드의 확장성 및 재사용성을 추구하기 위한 원칙이다. 경직된 객체보다 구현되지 않아 유연한 인터페이스가 더욱 확장 가능성이 높을 것이다.

다른 원칙에 비해 <span class="orange-400">의존성 역전 원칙은 중요도가 좀 떨어지는데, 그 이유는 타 원칙의 하위호환 격이기 때문</span>이다. 당장 위에서도 언급했듯이, 의존성 역전 원칙은 개방-폐쇄 원칙을 준수할 경우 자연스레 준수하기이다. 뿐만 아니라 1객체 = 1책임인 단일 책임 원칙, 기능별 인터페이스화를 추구하는 인터페이스 분리 원칙을 준수할 경우 역시 마찬가지다.

객체 생성 시 객체로 구현해야할 것과 인터페이스로 구현해야할 것을 적절히 구분하여 올바른 의존 관계를 가지도록 구현하자. 이왕이면 방금 언급한 원칙들을 준수하여 두 마리 토끼를 잡는 것도 매우 좋은 방법일 것이다.

# 마치며

이 장을 끝으로 객체지향에 대한 글을 마무리한다. 지금껏 JAVA라는 객체지향 언어를 사용하고 있었음에도, 정작 객체지향에 대해 너무 몰랐다는 것을 새삼 느낀다. 내가 얼마나 비객체지향적으로 코딩했는지도....

객체지향에서의 가장 큰 특징이라면 바로 <span class="primary">상속</span>일 것이다. 객체지향의 5원칙 중 대부분이 상속과 직/간접적으로 연관된 것만 봐도, 객체지향의 아이덴티티는 상속이라고 할 수 있을 것이다. 그 만큼 객체지향에서 상속은 중요하면서 동시에 이해하기 어려운 개념이다. 잘 쓰기는 더더욱 어렵다.

물론 객체지향의 의의를 온전히 구현하고, 수립된 원칙들을 전부 지키는 것은 시니어급 개발자라도 매우 어려운 일일 것이다. 당장 나 같아도 "이 많은 걸 다 지켜가며 설계하라고?"라는 생각이 들고, 대부분의 개발은 구현 과정보단 동작 결과에 치중하기 때문이다.

탄탄한 기획과 이에 동반되는 고민은 견고한 설계가 가능하지만, 언제까지나 시간을 낭비할 수 없는 노릇이다. 아무리 탄탄하게 설계 중인 프로젝트라도 개발 기간을 준수하지 못 하면 결과물은 물론, 이 결과물을 내기까지 했던 모든 고민들이 시간낭비로 치부되는 것을 뻔하다.

이러한 원칙을 정해진 시간 내에 구현해야 하므로, 객체지향을 잘 다루기 위해선 많은 노력이 필요할 것이다.