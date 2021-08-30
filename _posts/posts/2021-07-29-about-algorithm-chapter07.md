---
title: "해시 테이블로 매우 빠른 룩업"
excerpt: "현재까지 다룬 데이터 형식 중 다수의 데이터를 다루는 데 가장 효과적인 형식은 배열일 것이다. 하지만 배열의 경우, 요소별로 단 하나의 값이 들어가는 데 특화되어 있다. 만약 하나의 요소에 두 값을 넣고자 한다면 어떻게 될까? [[A, 1], [B, 2], [C, 3]]과 같은 형태로 나타낼 것이다. 배열의 단점 중 하나는, 값을 빠르게 찾기 위해선 반드시 정렬을 수행해야 한다는 것이다. 하지만 저렇게 배열 안에 또다른 배열이 포함되는 것처럼 배열의 depth가 심해질 경우 구조가 복잡해서 배열을 다루기 점점 난해해진다. 더군다나 배열의 경우 원하는 요소를 탐색하기 위해선 적어도 O(logN) 이상의 시간복잡도를 필요로 한다. 만약, 배열과 같이 특정 데이터의 모음에서 내가 원하는 데이터를 O(1)과 같이 상수 시간으로 탐색할 수 있는 데이터가 있다면 어떨까? 왠지 이 장에서 그 해답을 찾을 수 있을 것 같다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: "2021-07-29T23:02:27"
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "해시 테이블" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 7장 해시 테이블로 매우 빠른 룩업

현재까지 다룬 데이터 형식 중 다수의 데이터를 다루는 데 가장 효과적인 형식은 <span class="primary">배열</span>일 것이다. 하지만 배열의 경우, 요소별로 단 하나의 값이 들어가는 데 특화되어 있다. 만약 하나의 요소에 두 값을 넣고자 한다면 어떻게 될까? $[ [ "A", 1 ], [ "B", 2 ], [ "C", 3 ] ]$과 같은 형태로 나타낼 것이다.

배열의 단점 중 하나는, 값을 빠르게 찾기 위해선 반드시 정렬을 수행해야 한다는 것이다. 하지만 저렇게 배열 안에 또다른 배열이 포함되는 것처럼 배열의 depth가 심해질 경우 구조가 복잡해서 배열을 다루기 점점 난해해진다.

더군다나 배열의 경우 원하는 요소를 탐색하기 위해선 적어도 $O(\log N)$ 이상의 시간복잡도를 필요로 한다. 만약, 배열과 같이 특정 데이터의 모음에서 내가 원하는 데이터를 $O(1)$과 같이 상수 시간으로 탐색할 수 있는 데이터가 있다면 어떨까? 왠지 이 장에서 그 해답을 찾을 수 있을 것 같다.

## 7-1. 해시 테이블 소개

<span class="orange-A400">JAVA</span>를 포함한 대부분의 프로그래밍 언어에선 <span class="teal-400">Hash Table</span>(해시 테이블)이란 개념이 존재한다. 언어에 따라 부르는 용어는 해시나 맵, 해시 맵 등으로 불리지만 궁극적인 개념은 해시 테이블이다.

``` java
HashMap<String, String> map = new HashMap<>();
map.put("A", "1");
map.put("B", "2");
map.put("C", "3");
map.put("D", "4");
```

자바는 이를 `HashMap` 클래스로 관리한다. <span class="yellow-700">JavaScript</span>와 다르게 미리 선언된 데이터 형식만 입력 가능하다는 특징이 있다. `A: 1`, `B: 2`와 같이 하나의 쌍으로 이루어진 데이터를 흔히 <span class="blue-400">key-value</span> 데이터라고 한다. 해시 테이블은 이러한 key-value 데이터를 관리하는데 매우 효과적이다.

``` java
HashMap<String, String> map = new HashMap<>();
map.put("A", "1");
map.put("B", "2");
map.put("C", "3");
map.put("D", "4");

System.out.println(map.get("A"));
```

HashMap의 데이터에 접근하기 위해선 위처럼 원하는 value의 key를 입력하여 접근할 수 있다. 그런데 재밌는 점은, 해시 테이블의 경우 이렇게 탐색하는 데 필요한 작업량이 1이다. 즉, $O(1)$의 시간 복잡도를 가진다. 우리가 배열에서 갖가지 정렬을 배워가면서 탐색 속도를 향상시키기 위해 노력했는데, 이 친구는 뭐길래 이런 작업량이 가능한걸까?

## 7-2. 해시 함수로 해싱

<span class="primary">해싱</span>이라는 개념에 대해 들어본 적이 있는가? 데이터를 고유한 값으로 반환하는 것을 해싱이라고 한다. 간단한 예를 들자면, 아래와 같이 매칭되는 표가 있다고 가정하자.

|    키    |    값    |
| :------: | :------: |
|    A     |    1     |
|    B     |    2     |
|    C     |    3     |
| $\dotsb$ | $\dotsb$ |
|    Y     |    25    |
|    Z     |    26    |

위 표에 의거하면, `ABC = 123`, `EAD = 514`와 같이 변환될 것이다. 매우 허술하지만, 이러한 변환도 일종의 해싱이라고 할 수 있다. 위 표와 같이 변환해주는 알고리즘을 <span class="primary">해시 함수</span>라 부른다.

만약, 우리가 사용하려는 해시 함수가 A-Z의 키를 위 표에 매칭되는 숫자로 변경하고, 이를 다 더하는 알고리즘이라고 가정해보자. `FAD`를 변환하면 아래의 순서로 변환이 진행된다.

1. 해시 함수에 의해 FAD가 614로 변환된다.
2. 각 숫자를 더하여 6 + 1 + 4를 연산한다.
3. 11이라는 해시값을 얻는다.

이렇게 `FAD = 11`이라는 해싱을 얻을 수 있다. 해싱에는 아래와 같은 조건이 중요하다.

* 정해진 값을 해싱하면 항상 동일한 결과를 반환한다. (FAD는 언제나 11을 반환해야 함)
* 서로 다른 값이 동일한 해시값을 가질 수 없다.

> 🔒 **해시 함수**  
> 위의 예제와 달리, 해싱 함수는 대부분 복호화가 불가능한 비대칭 암호화 방식을 취한다. 또한 보안을 위해 Salt라는 임의의 난수를 포함하여 해싱함으로써, Brute Force를 방지하기도 한다.  
> 이러한 특성으로 해싱은 사용자 이외에 그 누구도 알아서는 안 되는 비밀번호, 개인정보 등을 암호화하는데 쓰이며, 그 종류는 MD5, SHA-1, SHA-256, SHA-512 등이 있다.

하지만 예제의 해싱 함수는 단순 이해를 돕기 위한 예시로, 실제 해싱과는 맞지 않다. 위 해시 함수에 의하면 `FAD`와 `ADF`, `DAF` 모두 동일한 값 11을 가진다. 이는 해시의 요건 중 하나인 <span class="red-500">서로 다른 값이 동일한 해시값을 가질 수 없다</span>는 조건을 정면으로 위반한다.

이러한 문제점에 대한 얘기는 후에 다룬다.

## 7-3. 재미와 이익, 특히 이익을 남길 유의어 사전 만들기

책에서 표현한 대로, 특정 단어를 입력하면 가장 핫한 유의어를 반환해주는 키치한 사전을 만든다고 가정해보자.

해시는 이전 문단에서 사용한 표를 기준으로 하며, 변환된 숫자를 각각 곱한 값이 해싱 결과가 된다.

|  키   |  값   |
| :---: | :---: |
|   1   |       |
|   2   |       |
|   3   |       |
|   4   |       |
|   5   |       |
|   6   |       |
|   7   |       |
|   8   |       |
|   9   |       |
|  10   |       |
|  11   |       |
|  12   |       |
|  13   |       |
|  14   |       |
|  15   |       |
|  16   |       |

이 때 내부적으로 동작하는 해시 테이블을 도식화하면 위와 같을 것이다. `bad: evil`이라는 key-value가 있을 경우, 해시 함수에 의해 아래와 같이 변환된다.

1. `bad: evil`의 키 `bad`를 변환한다.
2. 변환값 214를 얻는다.
3. 각 숫자를 곱하여 해시값 $2 \times 1 \times 4 = 8$을 얻는다.

|  키   |  값   |
| :---: | :---: |
|   1   |       |
|   2   |       |
|   3   |       |
|   4   |       |
|   5   |       |
|   6   |       |
|   7   |       |
|   8   | evil  |
|   9   |       |
|  10   |       |
|  11   |       |
|  12   |       |
|  13   |       |
|  14   |       |
|  15   |       |
|  16   |       |

위와 같이 8에 evil 데이터가 삽입된다. 추가로 `cab: taxi`를 해싱해보자. 해시값이 6이다, 또한 `ace: star`의 경우 해시값이 15다.

|  키   |  값   |
| :---: | :---: |
|   1   |       |
|   2   |       |
|   3   |       |
|   4   |       |
|   5   |       |
|   6   | taxi  |
|   7   |       |
|   8   | evil  |
|   9   |       |
|  10   |       |
|  11   |       |
|  12   |       |
|  13   |       |
|  14   |       |
|  15   | star  |
|  16   |       |

해시 테이블의 현황은 위와 같을 것이다. 여기서 만약 이전에 저장된 값을 호출하려면 어떻게 될까?

사용했던 키 중 하나dls `cab`의 데이터를 호출해보자. 해싱 알고리즘에 의해 6으로 변환된다.

해시값을 구했으므로, 인덱스 6의 요소 `taxi`에 접근하면 된다. 별다른 탐색 없이도 간단하게 원하는 값에 접근한 것이다.

이러한 방식으로 해시 테이블은 $O(1)$의 시간복잡도를 가진다.

## 7-4. 충돌 해결

이전에 잠깐 언급했던 해시의 요건이 있다.

* 서로 다른 값이 동일한 해시값을 가질 수 없다.

이전 문단의 해시 테이블에 `dab: pat`을 추가한다고 생각해보자. `dab`의 해시값은 8이다. 이제 테이블에 넣어주기만 하면 되는데, 문제가 있다.

|  키   |                  값                   |
| :---: | :-----------------------------------: |
|   8   | evil <span class="red-400">pat</span> |

이미 8번 인덱스에 evil이 들어가있다. 이렇게 서로 다른 값의 해시값이 동일한 현상을 <span class="primary">충돌</span>이라고 한다.

가장 전통적이고 간단하 방법은, 동일한 위치에 값이 할당될 경우, 배열과 같이 이중 구조를 추가하는 것이다.

|  키   |        값         |
| :---: | :---------------: |
|   8   | [ "evil", "pat" ] |

즉, 위와 같이 배치하면 된다. 그렇다면 이 경우 검색은 어떻게 진행될까? 키가 `dab`인 테이터를 탐색해보자.

1. `dab`의 해시값 8을 구한다.
2. 8번 인덱스에 충돌로 인해 배열이 있음을 확인한다.
3. 각 배열의 key를 확인하여 일치 여부를 반한다.

이 경우 검색은 잘 될지 모르나, $O(N)$이라는 시간 복잡도를 가진다. $O(1)$의 시간 복잡도를 가질 정도로 빠른 데이터 형식이 순식간에 일반적인 배열와 동급이 되어버렸다. 아무리 봐도 좋은 현상은 아니다.

결론적으론 해싱은 최대한 충돌이 일어나지 않도록 설계해야한다.

## 7-5. 훌륭한 충돌 조정

책에서는 해시 테이블의 효율성은 아래의 세 가지 요인에 좌우된다고 설명한다.

* 해시 테이블에 얼마나 많은 데이터를 저장하는가
* 해시 테이블에서 얼마나 많은 셀을 쓸 수 있는가
* 어떤 해시 함수를 사용하는가

이전에 사용한 표의 매칭을 기준으로, 이번엔 변환된 각각의 숫자를 1의 자리가 될 때까지 더하는 함수를 사용한다고 가정하자.

`put`의 경우 16 + 21 + 20 = 57의 변환값을 가지며, 다시 이 57을 각각 더하 5 + 7 = 12, 1 + 2 = 3으로 최종적으로 `put = 3`이 된다.

|  키   |  값   |
| :---: | :---: |
|   1   |       |
|   2   |       |
|   3   |       |
|   4   |       |
|   5   |       |
|   6   |       |
|   7   |       |
|   8   |       |
|   9   |       |
|  10   |       |
|  11   |       |
|  12   |       |
|  13   |       |
|  14   |       |
|  15   |       |
|  16   |       |

위와 같은 해시 테이블이 있다고 가정하자. 16개의 할당 가능한 공간이 있지만, 해시 함수의 특성 상 언제나 1 ~ 9 사이의 해시값을 가지므로 10 ~ 16은 언제나 비어있다.

즉, 해싱 테이블의 크기는 최소한 예상되는 해시값의 범위만큼 가지고 있어야한다. 만약 해시 범위가 1 ~ 10인데, 해시 테이블의 크기는 100이라고 한다면 충돌이 일어날 가능성은 매우 적겠지만 메모리 낭비가 너무 심하다.

즉, <span class="red-400">너무 많은 메모리를 낭비하지 않으면서 해시값을 전부 수용</span>할 수 있도록 적절히 충돌 조정을 수행해야한다.

연구에 의하면 데이터가 7개일 때, 10개의 테이블 행이 있는 것이 이상적이다. 이를 <span class="primary">부하율</span>이라고 하며, 부하율이 70%일 때가 최적이다. 다행히도 해시 테이블의 세부적인 사항은 컴파일러 단계에서 관리하니, 디테일한 튜닝을 하지 않는 이상 개발자가 신경쓸 부분은 없다.

## 7-6. 실제 예제

해시의 특성 덕분에 해시 테이블은 많은 곳에서 많은 용도로 사용되지만, 이 책에서는 해시 테이블을 통해 알고리즘의 속도를 높이는 데 초점을 맞추었다.

1장에서 모든 요소가 중복되지 않는 <span class="primary">집합</span>에 대해 다뤘다. 집합 알고리즘을 배열로 구성하면 탐색과 삽입 작업이 필요하며, 이 작업은 $O(N)$의 시간 복잡도를 가진다.

모든 요소가 중복되지 않는 고유한 값을 가지는 집합의 특성은 여러 곳에서 굉장히 유용하게 쓸 수 있지만, $O(N)$이라는 선형적 시간 복잡도가 걸린다. 만약 여기서 탐색의 시간 복잡도가 $O(1)$을 가지는 해시 테이블을 적용한다면 어떨까?

| 작업  |  집합  | 해시 테이블 |
| :---: | :----: | :---------: |
| 탐색  | $O(N)$ |   $O(1)$    |
| 삽입  | $O(1)$ |   $O(1)$    |
| 총합  | $O(N)$ |   $O(1)$    |

위와 같이 작업량을 획기적으로 줄일 수 있을 것이다. 우리는 이미 4장에서 배열의 중복 요소를 체크하는 로직을 작성한 바 있다. 처음 설계한 알고리즘의 시간 복잡도는 $O(N^2)$였지만, 이후 개선을 통해 $O(N)$으로 단축할 수 있었다.

``` java
/**
 * 요소의 중복 여부 반환 함수
 *
 * @param array: [int[]] 배열
 *
 * @return [boolean] 중복 여부
 */
private static boolean isDuplicated(int[] array)
{
	for (int i = 0; i < array.length; i++)
	{
		for (int j = 0; j < array.length; j++)
		{
			count++;
			
			// 서로 다른 요소가 동일한 값을 가질 경우
			if (i != j && array[i] == array[j])
			{
				return true;
			}
		}
	}
	
	return false;
}
```

위 소스는 4장에서 다룬 중복 요소 체크 알고리즘 중 $O(N^2)$를 가지는 알고리즘이다. 

``` java
/**
 * 요소의 중복 여부 반환 함수
 *
 * @param array: [int[]] 배열
 *
 * @return [boolean] 중복 여부
 */
private static boolean isDuplicated(int[] array)
{
	ArrayList<Integer> list = new ArrayList<>();
	
	for (int item : array)
	{
		count++;
		
		// 중복되지 않았을 경우
		if (!list.contains(item))
		{
			list.add(item);
		}
		
		// 중복된 경우
		else
		{
			return true;
		}
	}
	
	return false;
}
```

위 소스는 4장에서 다룬 중복 요소 체크 알고리즘 중 $O(N)$을 가지는 알고리즘이다. 이러한 종류의 알고리즘을 해시 테이블을 활용하여 $O(1)$의 시간 복잡도를 가지게끔 줄여보자.

책에서 제시한 주제대로, 투표자가 후보자 목록 중 하나를 고르거나, 임의의 후보를 추가할 수 있는 전자 투표 기계를 설계해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;

/**
 * 누구나 자료 구조와 알고리즘 전자 투표 기계 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/29/about-algorithm-chapter07/">해시 테이블로 매우 빠른 룩업</a>
 * @since 2021.07.29 Thu 22:15:32
 */
public class Vote
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		ArrayList<String> list = new ArrayList<>();
		
		while (true)
		{
			writer.write("후보 이름 입력 (x: 종료) >> ");
			writer.flush();
			
			String name = reader.readLine().trim();
			
			// x가 입력되었을 경우
			if (name.equalsIgnoreCase("x"))
			{
				break;
			}
			
			// 빈 문자가 입력되었을 경우
			else if (name.equals("") || name.isEmpty())
			{
				writer.newLine();
				writer.write("올바른 이름을 입력하세요.");
			}
			
			// 일반적인 이름이 입력되었을 경우
			else
			{
				list.add(name);
			}
		}
		
		writer.write(list.toString());
		writer.flush();
		
		writer.close();
		reader.close();
	}
}
```

``` input
Jay
Park
Kim
Park
Kim
Jay
Jay
Jay
Park
Kim
x
```

``` output
[Jay, Park, Kim, Park, Kim, Jay, Jay, Jay, Park, Kim]
```

소스와 입력, 출력은 위와 같다. 단순히 입력을 받아서 중복 여부 상관없이 배열에 이어 붙이므로, 시간 복잡도는 삽입 과정 하나만 있으며 $O(1)$이다.

빠르기야 하다만, 후보자가 많거나, 투표자가 많아지면 정리하기 매우 힘들다. 전자는 분류할 케이스가 많아지고, 후자는 분류할 데이터가 많아지기 때문

해시 테이블을 활용하여 후보의 이름과 후보의 투표수를 서로 매칭해서 심플하게 보여주면 어떨까?

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * 누구나 자료 구조와 알고리즘 해시 테이블을 적용한 전자 투표 기계 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/29/about-algorithm-chapter07/">해시 테이블로 매우 빠른 룩업</a>
 * @since 2021.07.29 Thu 22:27:23
 */
public class HashVote
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		ArrayList<String> list = new ArrayList<>();
		HashMap<String, Integer> map = new HashMap<>();
		
		while (true)
		{
			writer.write("후보 이름 입력 (x: 종료) >> ");
			writer.flush();
			
			String name = reader.readLine().trim();
			
			// x가 입력되었을 경우
			if (name.equalsIgnoreCase("x"))
			{
				break;
			}
			
			// 빈 문자가 입력되었을 경우
			else if (name.equals("") || name.isEmpty())
			{
				writer.newLine();
				writer.write("올바른 이름을 입력하세요.");
			}
			
			// 일반적인 이름이 입력되었을 경우
			else
			{
				list.add(name);
			}
		}
		
		for (String name : list)
		{
			// 이미 등록된 이름일 경우
			if (map.containsKey(name))
			{
				map.put(name, map.get(name) + 1);
			}
			
			// 등록되지 않은 이름일 경우
			else
			{
				map.put(name, 1);
			}
		}
		
		writer.write(map.toString());
		writer.flush();
		
		writer.close();
		reader.close();
	}
}
```

``` input
Jay
Park
Kim
Park
Kim
Jay
Jay
Jay
Park
Kim
x
```

``` output
{Jay=4, Kim=3, Park=3}
```

소스와 입출력은 위와 같다. Jay가 4표, 나머지가 3표를 받았다. 깔끔하게 잘 동작하지만, 투표가 끝난 뒤 일괄적으로 표를 계산하므로, 탐색 $O(N)$ 작업이 추가되어 시간 복잡도가 상수에서 선형으로 늘어나게 됐다.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.HashMap;

/**
 * 누구나 자료 구조와 알고리즘 해시 테이블을 적용한 향상된 전자 투표 기계 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/29/about-algorithm-chapter07/">해시 테이블로 매우 빠른 룩업</a>
 * @since 2021.07.29 Thu 22:31:45
 */
public class ImproveHashVote
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 *
	 * @throws IOException 데이터 입출력 예외
	 */
	public static void main(String[] args) throws IOException
	{
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		HashMap<String, Integer> map = new HashMap<>();
		
		while (true)
		{
			writer.write("후보 이름 입력 (x: 종료) >> ");
			writer.flush();
			
			String name = reader.readLine().trim();
			
			// x가 입력되었을 경우
			if (name.equalsIgnoreCase("x"))
			{
				break;
			}
			
			// 빈 문자가 입력되었을 경우
			else if (name.equals("") || name.isEmpty())
			{
				writer.newLine();
				writer.write("올바른 이름을 입력하세요.");
			}
			
			// 일반적인 이름이 입력되었을 경우
			else
			{
				// 이미 등록된 이름일 경우
				if (map.containsKey(name))
				{
					map.put(name, map.get(name) + 1);
				}
				
				// 등록되지 않은 이름일 경우
				else
				{
					map.put(name, 1);
				}
			}
		}
		
		writer.write(map.toString());
		writer.flush();
		
		writer.close();
		reader.close();
	}
}
```

``` input
Jay
Park
Kim
Park
Kim
Jay
Jay
Jay
Park
Kim
x
```

``` output
{Jay=4, Kim=3, Park=3}
```

표 수를 계산하는 과정을 마지막이 아닌, 투표를 할 때마다 실시간으로 카운팅한다. 기본적인 원리나 결과가 같지만, 그 속도가 다르다.

이미 등록되었는지 아닌지에 따라 탐색 + 삽입 혹은 단순히 삽입으로 나누어지지만, 탐색 또한 $O(1)$의 시간 복잡도를 가지므로 최종적으로는 $O(1)$로 표현할 수 있다.

# 마무리

이 장에서 핵심 내용은 아래와 같다.

* 해시 테이블은 key-value 형태의 값을 저장한다.
* 해시 테이블은 key를 임의의 함수로 해싱하여 관리한다.
* 해시 테이블의 탐색 시간 복잡도는 $O(1)$이다.
* 해시 함수는 충돌이 적어야 한다.

key-value로 데이터를 저장하는 특성, 빠른 탐색 속도는 여러 알고리즘에서 유용하게 쓰일 것이다. 다음 장에서는 이와 더불어 매우 클래식한 자료구조인 <span class="amber-500">스택</span>(Stack)과 <span class="amber-500">큐</span>(Queue)에 대해 다뤄본다.