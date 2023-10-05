---
title: "자료구조가 중요한 까닭"
excerpt: "혼자 공부하는건 다 좋은데 효율이 떨어진다. 컴퓨터 앞에 앉아있는 시간은 거의 대부분이라 할 수 있지만, 순수하게 공부하는 시간이 얼마나 되냐고 물어보면 눈치보기 바쁘다. 마침 블로그도 새로 개발해서 쓰고 있고, 공부도 할 겸 적절한 스터디에 하나 참가했다. 노트북 팔아버린 뒤로 스터디에 가입하고 싶어도 할 수가 없었던 차에, 노트북 없이도 할 수 있다는 말에 바로 들어갔다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: "2021-07-10T01:30:56"
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "배열" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 개요

혼자 공부하는건 다 좋은데 효율이 떨어진다. 컴퓨터 앞에 앉아있는 시간은 거의 대부분이라 할 수 있지만, 순수하게 공부하는 시간이 얼마나 되냐고 물어보면 눈치보기 바쁘다.

마침 블로그도 새로 개발해서 쓰고 있고, 공부도 할 겸 적절한 스터디에 하나 참가했다. 노트북 팔아버린 뒤로 스터디에 가입하고 싶어도 할 수가 없었던 차에, 노트북 없이도 할 수 있다는 말에 바로 들어갔다.

비전공자가 자료구조같은 기초지식이 항상 아킬레스건이였다. 특히 백준 풀 때 뼈저리게 느끼지만. 이 스터디가 끝나면 자료구조에 대해 기초정도는 알 수 있었음 한다.

언어는 가급적 <span class="orange-400">JAVA</span>로 진행한다.

# 1장 자료 구조가 중요한 까닭

이 장에서는 배열의 기초와 그에 해당하는 연산들에 대한 내용을 소개하면서 사용자에게 배열에 관한 러프한 개념을 설명해준다.

배열과 <span class="blue-400">집합</span>이라는 개념에 대한 내용을 기술한다. 저자에 의하면 챕터가 진행될 수록 연산 성능에 대한 점진적인 비교를 한다고 하니, 알고리즘 적용에 따른 성능 향상의 차이를 확인해 볼 수 있을 것이다.

## 1-1. 배열: 기초 자료 구조

<span class="blue-400">배열</span>은 거의 모든 언어에 존재하는 매우 기초적인 자료구조다.

JAVA에는 `int`, `boolean`과 같은 <span class="green-A400">기본형 타입(Primitive Type)</span>과 `String`, `HashMap`과 같은 <span class="green-A400">참조형 타입(Reference Type)</span>으로 구분된다.

이와 같은 데이터들은 각각 단일로 사용할 수도 있지만, 다수의 데이터를 동시에 다뤄야하는 경우가 심심치않게 발생한다. 이러한 데이터들이 모여 하나의 배열이 될 수 있다.

`String` 데이터가 모여 `String[]`이라는 <span class="blue-400">문자열 배열</span>이 되며, `int` 데이터가 모여 `int[]`라는 <span class="blue-400">정수 배열</span>이 된다.

JAVA에서의 배열은 이처럼 특정한 데이터가 여러개 모인 자료 구조이며, 반드시 <span class="red-A400">지정된 데이터만을 요소로 받아들일 수 있다.</span>

예를 들어, `boolean`은 `true`, `false`로 이루어진 데이터 형식이다. `boolean[]`은 `boolean` 데이터가 여러개 모인 배열이며, 이렇게 선언된 배열은 `boolean`에 해당하는 `true`, `false`만 받아들일 수 있다. 즉, 1이나 "A"와 같은 문자열은 배열에 삽입할 수 없다.

또한 <span class="red-A400">배열은 고정 길이를 가진다.</span> 한 번 할당된 배열의 길이는 재할당되지 않는 이상 절대로 길이가 변경되지 않는다.

> **⚠잠깐! 이건 어디까지나 JAVA 얘기에요!**  
> 지금 설명하는 배열의 특징은 JAVA에 국한되는 예시다. 당장 JavaScript만 봐도, 배열에 별다른 제약이 존재하지 않는다. 길이는 필요에 따라 증축할 수 있으며, 요소에 아무 데이터 타입이나 할당 가능하다.

JAVA에서 배열은 <span class="green-A400">참조형 타입(Reference Type)</span>에 해당한다.

배열에서 수행 가능한 연산에는 4가지가 존재한다.

* 읽기
* 검색
* 삽입
* 삭제

위 4가지 연산은 배열의 가장 기초적인 연산이다. 이 4가지 연산을 JAVA로 직접 구현하며 어떤 단계를 거치는지 확인해보자.

## 1-2 읽기

<span class="blue-400">읽기</span>연산은 배열의 특정 인덱스에 어떠한 값이 있는지 읽는 연산이다.

대부분 모든 언어의 런타임에서 할당되는 데이터들은 메모리에 기록된다. 많은 양의 데이터가 할당될수록 프로그램이 요구하는 메모리, 즉 RAM의 요구사항이 높아진다. 배틀그라운드나, 스타크래프트2와 같은 게임들은 많은 양의 메모리를 요구한다. 그 만큼 기록되고 처리되는 데이터의 양이 매우 방대하기 때문이다.

데이터가 메모리에 할당될 때, 가용한 임의의 메모리 주소에 저장된다. 해당 메모리 주소에 원하는 값이 존재할 것이므로, 값을 호출하기 위해선 해당 값이 저장된 메모리 주소에 접근하여 값을 조회한다. JAVA를 포함한 대부분의 언어들은 이러한 과정이 개발자에게까지 노출되지 않는 내부의 영역에 존재한다. 이걸 직접 다루는 것이 C언어의 그 악명높은 포인터다.

JAVA의 메모리는 JVM(Java Virtual Machine, 자바 가상머신)이 관리한다. JVM의 메모리 구조부터 시작하면 한도끝도 없이 브랜치가 뻗어나가니, 핵심만 찝어보자.

위에서 언급했듯이, 배열은 참조형 타입이며, 이 참조형 타입은 JVM의 Heap 영역에서 관리한다. 메모리를 간략하게 도식화하면 아래와 같이 표현할 수 있다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111131-7dc1fb80-e120-11eb-8a75-0cf615c9c020.png" width="600px" />
</p>

네모 한 칸에 하나의 데이터를 할당할 수 있다고 해보자. 만약 6, 43, 14, 9, 94 5개의 정수로 이루어진 정수형 배열을 메모리에 할당한다고 가정하자. JVM이 해당 배열의 크기를 메모리에 기록할 수 있는지 확인하고, 가능하다면 기록한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111294-b2ce4e00-e120-11eb-8a6e-d5fc241db0ee.png" width="600px" />
</p>

위 처럼 메모리 상의 적절한 위치에 배열이 기록될 것이다. 여기서 배열의 4번째 데이터를 읽어보자.

프로그램은 해당 배열의 주소를 알고있다. 자기가 직접 할당했으니 당연하다. 배열의 주소를 0x0404라고 가정하면 아래와 같이 도식할 수 있다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111152-86b2cd00-e120-11eb-9abe-477f4ec60f29.png" width="600px" />
</p>

0x0404에서 4번째 데이터를 호출하므로 0x0407의 데이터를 조회하면 된다.

> **😒아니 4번째 데이터라면서요...**  
> 거의 대부분의 컴퓨터 언어는 시작 인덱스를 0으로 지정한다. 그 이유는 메모리에 있는데, 메모리를 기준으로 배열의 첫 번째 데이터는 주소의 이동이 없다.  
> 만약 주소가 0x0101이라면, 첫 번째 데이터는 0x0101이 되기 때문에 주소의 이동이 없으므로 0번째 데이터라고 정의하는 것이다. 이는 관점의 차이로, 초대 프로그램의 언어가 이와 같은 방식을 차용했다. 이후 이를 기반으로 생겨난 수 많은 언어들이 이 영향을 받았다.

이처럼 배열의 주소에서 해당 인덱스만큼 주소에 더해 데이터를 읽는 것이므로, 동작은 아래와 같다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111156-887c9080-e120-11eb-94db-46545b8a5e9c.png" width="600px" />
</p>

주소 0x0404를 시작으로 4번째 데이터인 0x0407인 주소에 접근한다. 배열의 주소와 배열의 인덱스를 알고 있으므로 별도의 연산 없이 바로 접근 가능하다. 이로써 0x0407의 값 9에 접근할 수 있다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 배열 읽기 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/10/about-algorithm-chapter01/">자료구조가 중요한 까닭</a>
 * @since 2021.07.09 Fri 22:53:39
 */
public class ArrayRead
{
	// 배열
	private static final int[] ARRAY = { 6, 43, 14, 9, 94 };
	
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		// 읽을 인덱스
		int index = 4;
		
		int result = read(index);
		
		StringBuilder builder = new StringBuilder();
		builder.append("4번 째 아이템: ");
		builder.append(result);
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 배열 읽기 결과 반환 함수
	 *
	 * @param index: [int] 인덱스
	 *
	 * @return [int] 인덱스에 해당하는 값
	 */
	private static int read(int index)
	{
		return ARRAY[index];
	}
}
```

``` tc
4번 째 아이템: 9
```

JAVA 소스는 위와 같다. 배열 `array`을 선언하고, `array[3]`을 호출하면 배열의 4번째 값인 94가 변수 `four`에 할당된다. 목표에 바로 접근하므로 작업에 필요한 단계는 단 하나다.

## 1-3. 검색

이처럼 주소의 값이나 인덱스를 정확히 알고 있다면, 별도의 연산 없이 바로 해당하는 값을 갖고올 수 있다. 하지만 실제로 배열을 다루다보면 꼭 이렇게 간단한 케이스만 있지는 않다.

우리가 구조를 알지 못하는 배열이 있다고 가정할 때, 해당 배열에서 우리가 원하는 값을 찾아야할 경우가 적지않게 발생한다. 이 경우 원하는 값의 인덱스를 가지고 있지도 않으며, 심지어 배열 내부에 원하는 값이 존재하는지조차 알 수 없다. 이 경우 <span class="blue-400">검색</span>연산을 통해 배열의 값을 찾아야 한다.

위에서 선언했던 배열을 다시 가져와보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111152-86b2cd00-e120-11eb-9abe-477f4ec60f29.png" width="600px" />
</p>

이번엔 우리가 이 배열에 대한 정확한 정보를 가지고있지 않다고 가정해보자. 현재 우리는 이 배열의 어떤 인덱스에 어떤 값이 있는지 전혀 모르는 상태다.

이 상황에서 14라는 값을 검색해보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111164-8a465400-e120-11eb-9432-8c127bfed9b2.png" width="600px" />
</p>

검색은 읽기 작업의 반복이라고 봐도 무방하다. 위 그림은 이러한 검색의 특성을 여실히 보여준다. 목표값인 14를 찾기 위해 `array[0]` 부터 순차적으로 읽음으로써 14를 찾는다.

만약 어떠한 방법으로든 읽기과정을 줄이면서도 정상적인 검색이 가능하다면 소요시간이 효과적으로 감소할 것이다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 배열 검색 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/10/about-algorithm-chapter01/">자료구조가 중요한 까닭</a>
 * @since 2021.07.09 Fri 23:47:03
 */
public class ArrayFind
{
	private static final int[] ARRAY = { 6, 43, 14, 9, 94 };
	
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		// 목표 숫자
		int target = 14;
		
		int result = find(target);
		
		StringBuilder builder = new StringBuilder();
		builder.append(target);
		builder.append("이 포함된 인덱스: ");
		builder.append(result);
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 요소 검색 및 인덱스 반환 함수
	 *
	 * @param target: [int] 목표 숫자
	 *
	 * @return [int] 인덱스
	 */
	private static int find(int target)
	{
		// 인덱스
		int result = -1;
		
		for (int i = 0; i < ARRAY.length; i++)
		{
			// 목표 숫자와 배열의 값이 일치할 경우
			if (target == ARRAY[i])
			{
				result = i;
				break;
			}
		}
		
		return result;
	}
}
```

``` tc
14이 포함된 인덱스: 2
```

하지만 위는 가장 기초적인 검색 알고리즘을 적용한 것이다. 3번째 요소를 찾기 위해선 3개 과정이 필요하고, 5484번째 요소를 찾기 위해선 5484개 과정이 필요하다.

그러나, 요소가 맨 끝에 있거나, 불행히도 배열 내에 존재하지 않을 경우 배열 전체를 검색해야할 수도 있다. 즉 배열에 $N$개의 요소가 있다면, 검색의 최대 작업 갯수는 $N$개가 된다.

## 1-4. 삽입

배열에 새로운 요소를 넣는 작업을 <span class="blue-400">삽입</span> 연산이라 한다. 배열에서 55를 삽입하는 과정을 통해 삽입 연산에 대해 알아보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111179-8d414480-e120-11eb-9c36-965d4506fd8c.png" width="600px" />
</p>

런타임 시 배열을 할당했다면 우리는 배열의 주소를 알고 있을 것이다. 배열의 맨 끝에 요소를 추가한다면 그냥 이어붙이면 된다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111188-8fa39e80-e120-11eb-8576-aee6d30ae3a7.png" width="600px" />
</p>

하지만 배열의 중간에 삽입한다면 이야기가 조금 달라진다. 삽입하려는 위치 이후의 요소를 한 칸씩 뒤로 미루고, 해당 위치에 값을 삽입하게 된다.

최악의 경우, 배열의 가장 첫 인덱스인 0의 위치에 요소를 삽입한다면 모든 배열의 요소를 한 칸씩 뒤로 미룬뒤 55를 삽입해야한다. 즉, 배열에 $N$개의 요소가 있을 경우 삽입에 필요한 작업량은 $N$개의 요소를 하나씩 이동하는 작업 $N$개, 해당 인덱스에 요소를 삽입하는 작업 1개로 최대 $N + 1$의 작업량이 발생할 수 있다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 배열 삽입 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/10/about-algorithm-chapter01/">자료구조가 중요한 까닭</a>
 * @since 2021.07.09 Sat 00:27:47
 */
public class ArrayInsert
{
	// 배열
	private static final int[] ARRAY = { 6, 43, 14, 9, 94, -1, -1, -1, -1, -1 };
	
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		// 삽입할 인덱스
		int index = 2;
		
		// 삽입할 요소
		int item = 55;
		
		insert(index, item);
		
		StringBuilder builder = new StringBuilder();
		builder.append(index);
		builder.append("번 째 요소에 ");
		builder.append(item);
		builder.append(" 삽입: ");
		builder.append(Arrays.toString(ARRAY));
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 배열 삽입 함수
	 *
	 * @param index: [int] 삽입 위치
	 * @param item: [int] 삽입할 요소
	 */
	@SuppressWarnings("ManualArrayCopy")
	private static void insert(int index, int item)
	{
		// 배열의 값이 -1(빈 요소)가 아닐 경우
		if (ARRAY[index] != -1)
		{
			for (int i = ARRAY.length - 1; i > index; i--)
			{
				ARRAY[i] = ARRAY[i - 1];
			}
		}
		
		ARRAY[index] = item;
	}
}
```

``` tc
2번 째 요소에 55 삽입: [6, 43, 55, 14, 9, 94, -1, -1, -1, -1]
```

삽입 소스는 위와 같다.

> **@SuppressWarnings는 뭔가요?**  
> Eclipse, IntelliJ와 같은 IDE는 코드를 분석하는 과정에서 오류 또는 경고를 개발자에게 알려줌으로써 잠재적 위험을 제거할 수 있도록 유도한다. 간혹 의도된 동작임에도, IDE의 최적화 설정과 맞지 않아 경고를 띄우기도 한다. 이 경우 @SuppressWarnings 애노테이션을 쓰면 해당 경고를 무시할 수 있다. @@SuppressWarnings를 지워도 소스 동작엔 아무런 문제가 없다.

위에서도 언급했지만, JAVA의 배열은 고정길이를 가진다. 삽입 연산을 하기 위해선 필연적으로 현재 배열의 크기보다 하나 이상 커야하므로, 이전과 달이 총 길이가 10인 배열을 선언했다. 배열의 요소가 -1일 경우, 해당 요소는 아직 할당되지 않은 빈 요소로 간주한다.

> **가변 길이를 가지는 List**  
> JAVA에서도 얼마든지 가변길이 배열이 필요한 경우가 생긴다. 이 경우 `ArrayList`와 같은 `List` 데이터를 활용하면 된다. `List`는 가변길이를 가짐으로써 비정형화된 배열 데이터를 다루는데 유리하다.

배열의 가장 끝 요소부터 삽입하려는 인덱스 이전까지 순차적으로 내려오며 현재 요소의 값을 이전 요소의 값으로 할당하여 요소를 이동시킨다. 이후 삽입하려는 인덱스에 요소를 할당함으로써 삽입이 완료된다.

## 1-5. 삭제

삽입을 했으니, 반대로 <span class="blue-400">삭제</span>도 필요할 수 있다. 삭제 연산은 원하는 인덱스의 요소를 삭제하는 것이다. 간단히 말하자면, 삽입과 정 반대의 프로세스를 가진다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111198-93372580-e120-11eb-9949-aa21aef11dfa.png" width="600px" />
</p>

마찬가지로, 배열의 맨 끝에 요소를 삭제한다면 그냥 끝의 요소를 삭제하면 그만이다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111204-9500e900-e120-11eb-8c44-c45faeb459fd.png" width="600px" />
</p>

하지만 배열의 중간을 삭제한다면 동일한 작업이 필요하다. 삭제하려는 위치의 요소를 삭제하고, 요소를 한 칸씩 당겨야 한다.

최악의 경우, 배열의 가장 첫 인덱스인 0의 위치의 요소를 삭제한다면 해당 요소를 삭제한 뒤 모든 배열의 요소를 한 칸씩 앞으로 당길 것이다. 즉, 배열에 $N$개의 요소가 있을 경우 삭제에 필요한 작업량은 해당 인덱스의 요소를 삭제하는 작업 1개, $N - 1$개의 요소를 하나씩 이동하는 작업 $N - 1$개로 최대 $N$의 작업량이 발생할 수 있다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 배열 삭제 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/10/about-algorithm-chapter01/">자료구조가 중요한 까닭</a>
 * @since 2021.07.09 Sat 00:59:02
 */
public class ArrayDelete
{
	// 배열
	private static final int[] ARRAY = { 6, 43, 14, 9, 94 };
	
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		// 삭제할 인덱스
		int index = 2;
		
		remove(index);
		
		StringBuilder builder = new StringBuilder();
		builder.append(index);
		builder.append("번째 요소 삭제 ");
		builder.append(Arrays.toString(ARRAY));
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 배열 삭제 함수
	 *
	 * @param index: [int] 삭제 위치
	 */
	@SuppressWarnings("ManualArrayCopy")
	private static void remove(int index)
	{
		// 배열의 값이 -1(빈 요소)가 아닐 경우
		if (ARRAY[index] != -1)
		{
			for (int i = index; i < ARRAY.length - 1; i++)
			{
				ARRAY[i] = ARRAY[i + 1];
			}
			
			ARRAY[ARRAY.length - 1] = -1;
		}
	}
}
```

``` tc
2번째 요소 삭제 [6, 43, 9, 94, -1, -1, -1, -1, -1, -1]
```

삭제 소스는 위와 같다.

삭제는 삽입과 달리 배열의 크기가 증가할 필요가 없다. 마찬가지로 배열의 요소가 -1일 경우, 해당 요소는 삭제된 빈 요소로 간주한다.

삽입과는 반대로, 삭제하려는 인덱스부터 배열의 끝까지 순차적으로 올라가며 현재 요소의 값을 이후 요소의 값으로 할당하여 요소를 이동시킨다. 이후 배열의 끝 요소를 제거함으로써 삭제가 완료된다.

## 1-6. 집합: 단 하나의 규칙이 효율성을 바꾼다

배열의 경우 요소의 타입만 맞다면 별다른 신경을 쓰지 않는다. 이말인즉슨, 중복되는 요소에 대한 처리도 이루어지지 않는다. 하지만 종종 중복되는 값을 허용하지 않는 배열의 필요성이 생기기도 한다. 책에서는 이를 <span class="blue-400">집합</span>이라는 개념으로 설명한다.

배열에 요소를 삽입할 때, 중복여부를 확인하기 위해선 검색 작업이 선행되어야 한다. 검색을 통해 집합에 해당 요소가 없는 것이 확인될 경우에만 삽입이 이루어지는 방식이다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111212-97634300-e120-11eb-8d2e-c024761e23ff.png" width="600px" />
</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125111220-992d0680-e120-11eb-97a2-3e1e8eda7518.png" width="600px" />
</p>

위의 두 그림은 집합 개념이 적용된 배열에서 존재하지 않는 값 55와, 존재하는 값 14를 삽입했을 때 나타나는 결과를 도식화한 것이다.

55의 경우 기존에 존재하지 않았으므로 삽입이 가능하지만, 14의 경우 이미 2번 째 인덱스에 동일한 값이 있으므로 삽입이 불가능하다.

검증이 완료된 이후의 삽입 과정은 기존의 삽입 과정과 동일하다. 단, 작업량은 달라진다. 기존의 삽입 작업량에서 검색의 작업량이 추가되기 때문이다.

가장 최악의 케이스는 중복되지 않는 임의의 값을 배열의 0번 째 인덱스에 삽입하는 것이다. $N$개의 요소를 가진 배열에서 $N$개 요소를 검색하는 작업량 $N$개, $N$개의 요소를 하나씩 이동하는 작업 $N$개, 해당 인덱스에 요소를 삽입하는 작업 1개로 최대 $2N + 1$개의 작업량이 발생한다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 집합 배열 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/10/about-algorithm-chapter01/">자료구조가 중요한 까닭</a>
 * @since 2021.07.10 Sat 01:30:56
 */
public class UniqueArray
{
	// 배열
	private static final int[] ARRAY = { 6, 43, 14, 9, 94 };
	
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		// 삽입할 인덱스
		int index = 2;
		
		// 삽입할 요소
		int item = 55;
		
		boolean result = hasInserted(index, item);
		
		StringBuilder builder = new StringBuilder();
		builder.append(index);
		builder.append("번 째 인덱스에 ");
		builder.append(item);
		builder.append(" 삽입 결과: ");
		builder.append(result);
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 집합 배열 삽입 결과 반환 함수
	 *
	 * @param index: [int] 삽입 위치
	 * @param item: [int] 삽입할 요소
	 *
	 * @return [boolean] 삽입 결과
	 */
	private static boolean hasInserted(int index, int item)
	{
		int result = find(item);
		
		// 중복되지 않을 경우
		if (result == -1)
		{
			insert(index, item);
			
			return true;
		}
		
		// 중복될 경우
		else
		{
			return false;
		}
	}
	
	/**
	 * 요소 검색 및 인덱스 반환 함수
	 *
	 * @param target: [int] 목표 숫자
	 *
	 * @return [int] 인덱스
	 */
	private static int find(int target)
	{
		// 인덱스
		int result = -1;
		
		for (int i = 0; i < ARRAY.length; i++)
		{
			// 목표 숫자와 배열의 값이 일치할 경우
			if (target == ARRAY[i])
			{
				result = i;
				break;
			}
		}
		
		return result;
	}
	
	/**
	 * 배열 삽입 함수
	 *
	 * @param index: [int] 삽입 위치
	 * @param item: [int] 삽입할 요소
	 */
	@SuppressWarnings("ManualArrayCopy")
	private static void insert(int index, int item)
	{
		// 배열의 값이 -1(빈 요소)가 아닐 경우
		if (ARRAY[index] != -1)
		{
			for (int i = ARRAY.length - 1; i > index; i--)
			{
				ARRAY[i] = ARRAY[i - 1];
			}
		}
		
		ARRAY[index] = item;
	}
}
```

``` tc
2번 째 인덱스에 55 삽입 결과: true
```

집합 배열의 삽입 소스는 위와 같다.

`find`와 `insert` 함수는 검색과 삽입 파트에서 사용한 로직과 동일한 로직이다. 집합 배열은 반드시 고유한 요소만을 삽입해야 하므로, `hasInserted` 함수를 구성하여 중복 여부를 검증한 뒤 삽입을 진행한다.

`find` 함수는 검색되는 요소가 없을 경우 -1을 반환한다. 즉, -1을 반환하는 숫자는 고유한 숫자다. `find`가 -1을 반환할 경우 `insert` 함수로 삽입을 진행한다.

> **Set 객체는 중복을 허용하지 않아요**  
> JAVA의 배열은 기본적으로 요소의 중복같은건 신경쓰지 않는다. 때문에, 요소의 중복을 감지하기 위해선 별도의 검증 로직을 구성해야한다.  
> 하지만 `HashSet`과 같은 `Set` 객체를 활용하면 항상 고유한 값만 삽입할 수 있다.

# 마무리

이 장에서는 최대한 개념 위주로 설명하며, 설명에 어떠한 알고리즘 지식이 들어가지 않은 것으로 보인다. 이러한 저자의 의도를 최대한 반영하여, 내 로직 역시 가능한 기본 데이터 타입을 사용했으며, 복잡한 로직을 최대한 지양했다. 철저히 연산이 동작하는 기본 원리에 입각하도록 소스를 구성했다.

다음 장에서는 알고리즘에 대한 본격적인 내용이 기술될 것이다.