---
title: "메모이제이션을 활용한 조합 알고리즘"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/120028591-d5ece480-c02f-11eb-88f0-e14fc647dd81.png"
date: "2021-06-12T00:00:00"
type: "posts"
category: "알고리즘"
tag: [ "알고리즘", "JAVA(자바)", "조합(Combination)", "Memoization(메모이제이션)" ]
comment: true
publish: false
---

# 조합 알고리즘

당신에게 3개의 사탕이 있다고 가정하자. 이 중 2개만 골라 먹을 수 있다. 사탕을 고르는 경우의 수는 몇 가지나 될지 생각해보자. 머릿속으로도 어렵지않게 3개임을 계산할 수 있다.

하지만 만약 그 가짓수가 많아진다면 어떨까? 이를테면 100명의 학생 중 30명을 선별한다고 해보자. 그 경우의 수는 과연 얼마나 될까? 당신이 수학 혹은 암산의 천재가 아닌 이상 바로 대답할 순 없을 것이다.

<span class="primary">Combination(조합)</span>은 요소 $n$개가 포함된 그룹에서 $r$개를 선택하는 경우의 수를 수학적으로 나타낸다. 알고리즘에서 <span class="amber-A400">경우의 수</span>라는 키워드가 언급될 경우 우선해서 고려해봄직한 알고리즘이다.

백준 알고리즘 중 조합 알고리즘을 통해 풀어야할 수 많은 문제들이 있을 거라 생각한다. 앞으로의 문제를 좀 더 효율적으로 해결할 수 있도록 <span class="primary">조합 알고리즘</span>에 대해 다뤄보고자 한다. 더 나아가, 효율적인 알고리즘 설계를 위해 <span class="primary">조합 알고리즘</span>을 어떻게 최적화시킬 수 있는지도 살펴보자.

| 구분  |      내용       |
| :---: | :-------------: |
| 대상  |    선형 조합    |
| 언어  |     JAVA 15     |
|  CPU  | Intel i7-10700K |
|  RAM  |      32GB       |

테스트 환경은 위 표와 같다.

# 표현에 따라 구분하기

다시 처음에 언급했던 사탕 문제로 돌아가보자. 사탕 $A$, $B$, $C$ 3개가 있다고 가정하자. 이 중 2개만 골라 먹을 수 있다면? 그 경우의 수는 3가지일 것이고, 선택한 사탕은 $[ A, B ]$, $[ A, C ]$, $[ B, C ]$로 표현할 수 있을 것이다.

이처럼 <span class="primary">조합</span>은 단순히 경우의 <span class="amber-A400">수</span>를 표현하는 방법과 선택한 <span class="amber-A400">요소</span>를 표현하는 방법으로 나눌 수 있다.

제시되는 알고리즘의 동작에 따라 경우의 수를 요구할 수도, 요소들을 요구하기도 한다.

## 경우의 수 알고리즘 for Dummy

경우의 수를 계산해보자. 이를 코드로 표현하기 위해선 수학적 지식을 알고 있어야 한다. <span class="primary">조합</span>$_nC_r$의 경우 아래의 식으로 표현할 수 있다.

$$
\frac{n!}{r!(n - r)!} \qquad (0 \le r \le n)
$$

느낌표(!)연산자는 <span class="secondary">Factorial</span> 연산자로 $n!$은 1부터 $n$까지 순차적으로 곱하는 연산이다.

$$
n! = n \times (n - 1) \times (n - 2) \times \dotsb \times 1
$$

명확한 이해를 위해 위 식을 자연수에 대입해보자. $_3C_2$를 계산하면 아래와 같다.

$$
\frac{3!}{2!(3 - 2)!} = \frac{3 \times 2 \times 1}{2 \times 1} = \frac{3 \times \cancel{2 \times 1}}{\cancel{2 \times 1}} = 3
$$

눈여겨볼 점은, $_nC_r$과 $_nC_{n - r}$의 식이 같다는 점이다. 생각해보면 이유는 간단하다. <span class="green-A400">3개 중에서 2개를 선택하라는 말은, 반대로 3개 중에서 1개를 선택해서 제외하는 것과 결과적으로 동일</span>하기 때문.

<span class="primary">조합</span> 공식도 구했으니, 이를 코드로 옮겨서 표현해보자.

``` java
import java.util.LinkedList;

/**
 * 조합 클래스
 *
 * @since 2021.06.12 Sat 04:35:43
 */
public class Combination
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 */
	public static void main(String[] args)
	{
		LinkedList<Integer[]> list = getList();
		
		long t = System.currentTimeMillis();
		
		for (Integer[] integers : list)
		{
			int n = integers[0];
			int r = integers[1];
			
			System.out.println(combination(n, r));
		}
		
		System.out.println("소요시간: " + (System.currentTimeMillis() - t) + "ms");
	}
	
	/**
	 * 조합 결과 반환 함수
	 *
	 * @param n: 원소 갯수
	 * @param r: 조합 갯수
	 *
	 * @return [long] 조합
	 */
	private static long combination(int n, int r)
	{
		long a = 1;
		long b = 1;
		long c = 1;
		
		for (int i = 1; i <= n; i++)
		{
			a *= i;
		}
		
		for (int i = 1; i <= r; i++)
		{
			b *= i;
		}
		
		for (int i = 1; i <= (n - r); i++)
		{
			c *= 1;
		}
		
		return a / (b * c);
	}
	
	/**
	 * 데이터 리스트 반환 함수
	 *
	 * @return [LinkedList<Integer [ ]>] 데이터 리스트
	 */
	private static LinkedList<Integer[]> getList()
	{
		LinkedList<Integer[]> list = new LinkedList<>();
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		list.add(new Integer[] { 18, 7 });
		list.add(new Integer[] { 12, 5 });
		list.add(new Integer[] { 15, 4 });
		list.add(new Integer[] { 13, 9 });
		list.add(new Integer[] { 10, 6 });
		list.add(new Integer[] { 5, 3 });
		list.add(new Integer[] { 8, 5 });
		list.add(new Integer[] { 2, 1 });
		list.add(new Integer[] { 7, 4 });
		list.add(new Integer[] { 9, 6 });
		
		return list;
	}
}
```

* 수행시간 약 $1 \backsim 2ms$

위 코드는 100개의 데이터에 대한 <span class="primary">경우의 수</span>를 계산하는 알고리즘이다. 코드 레벨에서 어떠한 최적화도 수행하지 않은 매우 무식한(?)코드라고 봐도 무방하다.

핵심 동작은 아래의 코드다.

``` java
/**
 * 조합 결과 반환 함수
 *
 * @param n: 원소 갯수
 * @param r: 조합 갯수
 *
 * @return [long] 조합
 */
private static long combination(int n, int r)
{
	long a = 1;
	long b = 1;
	long c = 1;
	
	for (int i = 1; i <= n; i++)
	{
		a *= i;
	}
	
	for (int i = 1; i <= r; i++)
	{
		b *= i;
	}
	
	for (int i = 1; i <= (n - r); i++)
	{
		c *= 1;
	}
	
	return a / (b * c);
}
```

$_nC_r = \frac{n!}{r!(n - r)!}$식을 무식하게 다이렉트로 구현한 코드다. 근데 살짝 당황스러웠던 건, 이렇게 무식하게 짰음에도 알고리즘 수행 속도는 $2ms$도 잘 넘지 않는다. 작성일 기준으로 괜찮은 CPU를 써서 그렇거나, 컴파일러 단계에서 최적화를 해주는 것으로 추측된다.

하지만 단순히 동작한다는 사실 자체로 만족해서는 안 된다. 코드리뷰나 리팩토링, 최적화가 괜히 있는게 아니다. 위 코드의 경우 코드리딩의 영역에서는 그리 나쁘지만은 않다. 그도 그럴게 식을 그대로 표현했으니, 오히려 직관적이기까지 하다. 하지만 그 외에 나머지 부분은 문제가 많다.

경우의 수는 그 특성 상 소수가 나올 수 없다. 반개만 고를 순 없으니. 하지만 위 소스의 경우 전통적인 정수형 데이터인 int로 연산했다간 얼마 못가 연산 오류가 발생한다. int의 최대값은 2,147,483,647인데, $13! = 6,227,020,800$이므로 요소의 총합이 13 이상인 조합은 계산이 불가능하다.

때문에 최소 long이나 double로 지정해야 범위 문제를 어느정도 해소할 수 있다. 64bit 환경의 unsigned long는 $20!$까지 커버 가능하다. double 이상은 일반적인 연산 크기는 충분히 커버하고도 남으니 상관없다.

## 조합 요소 for Dummy

