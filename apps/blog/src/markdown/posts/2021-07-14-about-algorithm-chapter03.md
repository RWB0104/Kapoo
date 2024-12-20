---
title: "빅 오 표기법"
excerpt: "하나의 문제가 있어도, 이를 해결하는 수 많은 알고리즘이 존재할 수 있다. 어떠한 방법으로든 문제를 해결할 수 있다면 그 자체로 알고리즘이라 불러도 손색이 없지만, 알고리즘이라고 해서 다 같진 않다. 바로 문제를 해결하는 효율성의 차이 때문. 결과적으로 문제를 해결한다고 해도 그냥 무식하게 해결하는 알고리즘이 있는가 하면, 정말 효율적으로 문제를 해결하는 알고리즘도 있다. 그리고 우리는 통상 후자를 알고리즘이라는 명칭에 더 어울린다고 생각할 것이다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: 1626204097000
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "빅 오 표기법" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 3장 빅 오 표기법

하나의 문제가 있어도, 이를 해결하는 수 많은 알고리즘이 존재할 수 있다. 어떠한 방법으로든 문제를 해결할 수 있다면 그 자체로 알고리즘이라 불러도 손색이 없지만, 알고리즘이라고 해서 다 같진 않다. 바로 <span class="orange-A400">문제를 해결하는 효율성의 차이</span> 때문. 결과적으로 문제를 해결한다고 해도 그냥 무식하게 해결하는 알고리즘이 있는가 하면, 정말 효율적으로 문제를 해결하는 알고리즘도 있다. 그리고 우리는 통상 후자를 알고리즘이라는 명칭에 더 어울린다고 생각할 것이다.

이러한 알고리즘의 성능을 하나의 규칙으로 표기한 것이 <span class="blue-400">빅 오 표기법</span>이다. 이 장에서는 알고리즘의 빅 오 표기법에 대해 설명한다.

## 3-1. 빅 오: 단계 수 계산

보통 알고리즘의 성능을 측정한다고 하면 소요시간을 생각하겠지만, 의외로 소요시간은 객관적인 성능 지표가 되지 못 한다. 그 이유는 컴퓨터마다 성능이 제각각이기 때문. 똑같은 게임을 구동해도 어떤 컴퓨터는 울트라옵으로 165 프레임을 뽑는다고 하면, 다른 컴퓨터는 최하옵으로도 버벅일 수 있다. <span class="teal-400">동일한 작업을 수행해도 컴퓨터의 성능에 따라 그 소요시간이 천차만별</span>로 달라진다.

때문에 <span class="green-A400">알고리즘의 성능을 측정하는 적절한 지표는 처리 단계</span>라 할 수 있다. 이전 장의 <span class="blue-400">읽기 연산</span>과 <span class="blue-400">선형 검색</span>을 통해 예를 들어보자.

읽기 연산의 경우, 배열이 10개가 있던 1억개가 있던 관계없이 인덱스 i의 요소를 읽는데 필요한 단계는 하나다. 반대로 선형 검색의 경우, 요소가 많아지면 많아질 수록 연산에 요구되는 단계가 늘어난다. 배열 $N$개가 있을 때, 찾는 요소가 배열 맨 끝에 있는 최악의 경우 $N$개의 단계가 필요하다.

즉, 읽기 연산의 경우 언제나 한 단계만 필요하므로 $O(1)$로 표기할 수 있으머, 선형 검색의 경우 $O(N)$으로 표기할 수 있다. 이러한 표기를 <span class="amber-400">시간 복잡도</span>라 한다.

## 3-2. 상수 시간과 선형 시간

읽기 연산처럼 요소의 갯수에 상관없이 일정한 단계만을 필요로하는 연산이 있는가 하면, 선형 검색처럼 요소의 크기에 따라 단계가 가변하는 연산도 존재한다. 이전 문단에서 언급했듯이 읽기 연산의 시간 복잡도는 $O(1)$, 선형 검색의 시간 복잡도는 $O(N)$으로 표기할 수 있다. 이를 그래프로 비교하면 아래와 같다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125599099-db099ea5-e3e9-4b79-ad19-700870b07891.png" width="600px" />
</p>

$O(N)$의 경우 우리가 흔히 접한 1차원 그래프 $y = x$와 패턴이 동일하다. 요소의 수가 1씩 증가할 수록 단계 또한 1씩 정직하게 증가한다. 이러한 패턴을 <span class="blue-400">선형 시간</span>이라고 표현한다. 그러나 $O(1)$의 경우 단계에 관계없이 일정한 상수 그래프 $y = 1$와 패턴이 동일하다. 이러한 패턴을 <span class="blue-400">상수 시간</span>이라고 표현한다.

$O(1)$의 경우 조금 특이한데, 아래의 모든 그래프는 $O(1)$의 시간 복잡도를 가진다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125599889-72b5cbb9-ca20-4b19-9f49-6d363b8ebec5.png" width="600px" />
</p>

요소의 수에 관계 없이 두 단계를 요구하면 $O(2)$, 100 단계를 요구하면 $O(100)$일 것 같지만, 빅 오 표기법은 단계가 일정할 경우 이를 크게 신경쓰지 않는다. 즉, 설령 단계가 1억개가 된다 하더라도 시간 복잡도는 $O(1)$이 된다.

<span class="red-400">상수 시간의 경우 기본적으로 선형 시간보다 효율적</span>이라고 판단한다. 그 이유는 아래 그래프와 같다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125599827-0f58c448-9ab5-44dc-9bca-80d3ffd49d64.png" width="600px" />
</p>

<small class="red-400">※ $O(1)$의 경우 값이 너무 작아 표시가 잘 안 되므로 우측의 보조축을 기준으로 표시한다.</small>

깊게 생각하지 않더라도, 선형적으로 증가하는 그래프는 언젠가 상수 그래프를 넘어서게 된다. 즉, 요소가 무수히 많아지는 거시적 관점으로 보면 <span class="red-400">언젠가 선형 시간의 효율이 상수 시간보다 떨어지는 시점에 도달</span>한다. 예제를 보면 요소가 10개 이상일 경우 선형 시간의 효율성이 점점 떨어진다.

그런데 선형 시간의 경우를 생각해보자. 분명히 단계가 최대 $N$개가 소요될 수 있다는 뜻이지, 항상 $N$개가 소요된다는 것은 아니다. 예를 들어, 1부터 오름차순으로 정렬된 1억개의 배열에서 5를 검색한다고 가정하면, 필요한 단계는 5밖에 안 된다. 그럼에도 책에서는 선형 시간보다 상수 시간이 비교적 효율적이라고 설명하고 있다. 그 이유는 뭘까? 다음 문단에서 그 해답을 찾을 수 있다.

## 3-3. 같은 알고리즘, 다른 시나리오

선형 검색은 검색하려는 요소의 위치에 따라서 생각보다 많은 시간이 소요되지 않을 수도 있다. 최선의 경우 요소가 맨 앞에 있으므로 단계가 하나만 필요하여 $O(1)$과 동일한 시간 복잡도를 가질 수도 있다. 그러나 최악의 경우 요소가 맨 끝에 있으므로 온전히 $N$개의 단계가 필요하여 $O(N)$의 시간 복잡도를 가진다.

통상 알고리즘이 어떤 데이터를 얼마나 많이 처리할지 미리 알 수 없다. $O(N)$의 시간 복잡도를 가지는 임의의 알고리즘에 최선의 케이스를 적용하여 처리하면 $O(1)$에 가깝게 동작할 것이고, 최악의 케이스를 적용하여 처리하면 $O(N)$에 가깝게 동작할 것이다. <span class="orange-A400">알고리즘은 기본적으로 가장 비관적인 접근</span>으로 바라본다.

우리가 어떤 물건을 온라인으로 주문한다고 생각해보자. 내가 원하는 물건을 여러 업체에서 동일한 가격에 팔고 있지만, 택배 도착에 걸리는 시간이 다르다. 이는 업체의 페이지에 각각 아래와 같이 써있으며, 택배 도착은 이 시간을 절대로 벗어나지 않는다고 가정하자.

* A업체: 빠르면 오늘, 늦으면 일주일 뒤
* B업체: 빠르면 내일, 늦으면 3일 뒤
* C업체: 빠르면 3일, 늦으면 5일 뒤

우리가 3일 안으로 물건을 반드시 받아야 한다면 B업체가 가장 안전할 것이다. 물론 A업체에 주문하면 오늘 당장이라도 올 가능성이 있지만, 최악의 경우 일주일을 꼬박 기다려야 받게 될 수도 있기 때문에 3일을 넘어버릴 가능성 또한 무시할 수 없다. 빠르게 오면 단순히 좋은 정도지만, 3일을 넘어서면 안 되므로 A업체 또한 적절하지 않은 것이다. C업체는 말할 필요도 없고.

알고리즘도 이러한 관점과 동일하다. $N$이 최대 100인 $O(N)$ 알고리즘이 있을 때, 성능 상의 이유로 단계가 50이 넘어가면 크래쉬를 유발할 경우 이 알고리즘은 적절하지 않다. 이와 같이 최악의 상황을 알아야 장애를 대비할 수 있다. 이러한 이유로 알고리즘의 성능은 항상 최악을 기준으로 표시한다.

## 3-4 세 번째 유형의 알고리즘

물론 시간 복잡도가 $O(1)$, $O(N)$만 있는 것은 아니다. 우리가 2장에서 다뤘던 이진 검색의 경우, 요소에 따라 단계가 증가하긴 하지만 $O(N)$과 같이 선형적으로 증가하지는 않는다. 즉, $O(1)$도 아니고, $O(N)$도 아닌 그 사이의 시간 복잡도를 가진다.

이진 검색의 시간 복잡도는 기본적으로 $O(\log_2N)$을 가진다. $O(1)$, $O(\log_2N)$, $O(N)$가 요구하는 단계를 표로 표현하면 아래와 같다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125602081-0cc6075b-ba14-43c5-8aa6-52d8561559a3.png" width="600px" />
</p>

<small class="red-400">※ $O(1)$, $O(\log N)$의 경우 값이 너무 작아 표시가 잘 안 되므로 우측의 보조축을 기준으로 표시한다.</small>

## 로가리즘

우리가 흔히 부르는 $\log$. 즉, 로그는 로가리즘(Logarithm)의 줄임말이다. $x^n = y$가 성립할 경우, 이를 로그로 표현하면 $\log_xy = n$과 같다.

예를 들어, $3^2 = 9$가 성립한다. 이를 로그로 표현하면 $\log_39 =  2$가 된다. 이렇게 로그를 통해 수의 제곱수를 구할 수 있다.

## $O(\log N)$의 해석

위 문단에서 로그에 대해 어느정도 이해를 했으니, $O(\log N)$에 대해 논의해보자. 통상 수학에선 $\log_{10}x$을 간략화하여 $\log$로 표현했지만, 빅 오 표기법에서는 $\log_2x$의 간략화다. <span class="orange-A400">현실에선 십진법이 통용</span>되지만, <span class="orange-A400">컴퓨터는 이진법을 사용</span>하기 때문.

$O(N)$과 $O(\log N)$를 비교하면 아래와 같다.

|    $N$    |  $O(N)$   | $O(\log N)$ |
| :-------: | :-------: | :---------: |
|     2     |     2     |      1      |
|     4     |     4     |      2      |
|     8     |     8     |      3      |
|    16     |    16     |      4      |
|    32     |    32     |      5      |
|    64     |    64     |      6      |
|    128    |    128    |      7      |
|    256    |    256    |      8      |
|    512    |    512    |      9      |
|   1024    |   1024    |     10      |
| $2^{100}$ | $2^{100}$ |     100     |

$O(N)$는 $N$이 증가함에 따라 정직하게 같이 증가하지만, $O(\log N)$은 $N$이 정확히 두 배가 될 때 1씩 증가한다.

여담으로, 천문학같은 거시세계에서 로그가 중요한 이유가 위 표만으로도 쉽게 확인할 수 있다. $2^{100}$은 126,7650,6002,2822,9401,4967,0320,5376이다. 약 100양에 육박하는 수치로, 양은 수의 단위인 조를 아득히 뛰어넘는 단위다.

> 거시적 수의 단위  
> 일반적으로 사람이 접할 수 있는 의미 있는 단위는 조 단위로, 1억씩 천 번을 모아야 만들어지는 수치다.  
> 조 단위 뒤로는 경, 해, 자, 양 순으로 나열되며, 현실에서 경 이후로는 그 수의 크기를 논하는게 의미가 없는 정도

현실세계와 달리 수학이나 천문학과 같은 경우 우리에게 의미가 없을 정도로 큰 수를 다루기도 하는데, 이를 로그로 표현하면 이를 효과적으로 다룰 수 있다.

## 3-7. 실제 예제

지금까지 기술한 내용을 토대로 실제 코드에 적용해보자. 4개의 요소를 가진 배열이 있고, 배열의 값을 하나씩 출력하는 알고리즘이 있다고 가정해보자.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 빅 오 표기 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/14/about-algorithm-chapter03/">빅 오 표기법</a>
 * @since 2021.07.14 Wed 17:40:00
 */
public class BigO
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
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		// 배열
		String[] things = { "apples", "baboons", "cribs", "delcimers" };
		
		// 배열마다 하나씩 순회
		for (String thing : things)
		{
			StringBuilder builder = new StringBuilder();
			builder.append("Here's a thing: ");
			builder.append(thing);
			
			writer.write(builder.toString());
			writer.newLine();
		}
		
		writer.newLine();
		writer.flush();
		writer.close();
	}
}
```

소스는 위와 같다.

``` tc
Here's a thing: apples
Here's a thing: baboons
Here's a thing: cribs
Here's a thing: delcimers
```

결과는 위와 같다.

요소마다 하나씩 읽어 요소의 내용을 출력한다. 즉, <span class="blue-400">요소가 많아지면 많아질 수록 같이 선형적으로 증가</span>하므로, 이 알고리즘의 시간 복잡도는 $O(N)$으로 표현할 수 있다.

반대로 가장 기본적인 문자열 하나를 출력하는 알고리즘을 살펴보자.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 빅 오 표기 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/14/about-algorithm-chapter03/">빅 오 표기법</a>
 * @since 2021.07.14 Wed 17:56:49
 */
public class BigO2
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
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		
		writer.write("Hello world!");
		writer.newLine();
		writer.flush();
		writer.close();
	}
}
```

소스는 위와 같다.

``` tc
Hello world!
```

결과는 위와 같다.

알고리즘이라 부르기는 조금 뭐하지만, 어쨌든 이 알고리즘을 수행하는 데 <span class="blue-400">필요한 단계는 무조건 하나</span>다. 즉 시간 복잡도는 $O(1)$이다.

좀 더 실속있는 예제를 살펴보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 소수 판별 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/14/about-algorithm-chapter03/">빅 오 표기법</a>
 * @since 2021.07.14 Wed 18:01:20
 */
public class CheckPrime
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
		
		writer.write("소수를 판별할 값 입력 >> ");
		writer.flush();
		
		// 입력값
		int target = Integer.parseInt(reader.readLine());
		
		// 소수일 경우
		if (isPrime(target))
		{
			writer.write("소수로 판별됨");
		}
		
		// 아닐 경우
		else
		{
			writer.write("소수가 아닌 것으로 판별됨");
		}
		
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 소수 여부 반환 함수
	 *
	 * @param num: [int] 대상 값
	 *
	 * @return [boolean] 소수 여부
	 */
	private static boolean isPrime(int num)
	{
		for (int i = 2; i < num; i++)
		{
			// 나누어 떨어지는 수가 있을 경우
			if (num % i == 0)
			{
				return false;
			}
		}
		
		return true;
	}
}
```

소스는 위와 같다.

* 입력값

``` tc
156842101
```

* 출력값

``` tc
소수가 아닌 것으로 판별됨
```

이 소스는 임의의 값을 입력받아 소수인지 아닌지를 판별하는 알고리즘이다. 이 알고리즘을 통해 156842101은 소수가 아님을 쉽게 알 수 있다.

해당 알고리즘은 가장 작은 소수인 2부터 입력값 `target`까지 하나씩 증가시킨 값을 `target`과 나눠서 정확히 나눠떨어지는지 아닌지를 통해 소수를 판별하는 매우 기초적인 알고리즘이다.

최악의 케이스는 판별값이 소수일 경우로,  2부터 `target - 1`까지의 작업 전체를 요구하므로 총 `target - 2`의 작업이 발생한다. $N = target$일 때, -2는 그렇게 의미있는 값이 아니므로 위 알고리즘의 시간 복잡도는 $O(N)$으로 봐도 무방하다.

# 마무리

알고리즘을 정석적으로 공부하지 않아서, 빅 오 표기법과 같은 시간 복잡도를 제대로 이해하지 않았었다. 시간 복잡도의 개념과 그 계산 방식을 알 수 있었던 매우 의미있는 장이였다.

다음 장에선 이 빅 오 표기법을 활용하여 알고리즘을 개선하는 방법에 대해 설명한다.