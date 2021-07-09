---
title: "알고리즘이 중요한 까닭"
excerpt: "IT영역에서의 알고리즘이란, 어떤 문제를 해결하는 방법을 형상화한 코드를 의미한다. 알고리즘을 잘 설계한다면, 단순한 로직으로 접근할 때보다 훨씬 빠르게 문제를 처리할 수 있다. 개발에는 정말 다양한 문제와 그보다 더욱 다양한 해결방법이 존재하기 때문에, 복잡한 문제일수록 정교한 알고리즘의 설계가 요구된다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: "2021-07-10T04:21:37"
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "배열", "정렬", "이진 검색" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 2장 알고리즘이 중요한 까닭

IT영역에서의 <span class="primary">알고리즘</span>이란, 어떤 문제를 해결하는 방법을 형상화한 코드를 의미한다. 알고리즘을 잘 설계한다면, 단순한 로직으로 접근할 때보다 훨씬 빠르게 문제를 처리할 수 있다. <span class="teal-400">개발에는 정말 다양한 문제와 그보다 더욱 다양한 해결방법이 존재하기 때문에, 복잡한 문제일수록 정교한 알고리즘의 설계가 요구</span>된다.

이러한 특징으로 알고리즘은 뛰어난 문제 해결력과 수학적 사고 능력을 요한다. 때문에 많은 사람들이 어려워하는 분야 중 하나지만, 그 강력함과 효율로 인해 개발 역량의 척도를 확인하는데 사용하기도 한다. 흔히 기업에서 보는 <span class="teal-400">코딩 테스트</span>가 좋은 예시다.

이 장에서는 <span class="primary">알고리즘</span>을 통해 검색 연산을 더욱 효과적으로 개선하는 방법에 대해 설명한다. 이전 장에서 언급했듯이, 검색 연산은 무수히 많은 읽기 연산의 모음이나 다름없다. 알고리즘이 어떻게 읽기 연산을 최적화시키는지 알아보자.

## 2-1. 정렬된 배열

<span class="primary">정렬된 배열</span>이란, 기존의 배열에서 요소들이 특정 조건으로 정렬된 배열을 의미한다. 정렬된 배열은 그 요소들이 항상 정해진 조건에 따라 순서대로 배치된다. 이는 삽입을 할 때도 동일하다. 정렬된 배열이 항상 정렬된 상태를 유지하기 위해선 <span class="red-A400">삽입 시에도 요소의 정렬에 따라 정렬을 훼손하지 않는 올바른 자리에 삽입</span>되어야 한다.

기존의 배열이라면 배열의 크기가 허락하는 한, 원하는 위치 어디에서나 삽입이 가능하다. 배열에 55를 삽입할 때, 일반적인 배열은 아래처럼 삽입에 제한이 없다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125144062-a3b6c280-e157-11eb-88d6-20689d8f05b1.png" width="600px" />
</p>

하지만 정렬된 배열이라면 어떨까? 이번엔 배열이 오름차순으로 정렬된 배열이라고 가정해보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125144070-aa453a00-e157-11eb-9390-1550623a57bd.png" width="600px" />
</p>

정렬된 위 배열에서 55를 삽입한다면 어떨까?

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125144072-aca79400-e157-11eb-8939-cc0beb583b9b.png" width="600px" />
</p>

반드시 44와 94의 사이에 삽입되어야 오름차순 정렬을 유지할 수 있다. 그렇다면 우리는 여기서 정렬된 배열의 삽입은 기존의 삽입 연산에 비해 로직이 추가됨을 유추할 수 있다. 원리는 간단하다. 요소를 순차적으로 읽어서 55보다 큰 수가 나올 때까지 반복한다. 배열이 정렬되어 있으므로, 55보다 큰 수를 만나게 되면 이전의 요소는 모두 55보다 작을 것이다. 이 위치를 기준으로 삽입을 진행하면 된다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125144075-ae715780-e157-11eb-92ed-71ee06140c5f.png" width="600px" />
</p>

위 그림과 같이 순차적으로 요소를 검색하여 55보다 큰 요소를 찾는다. 94는 배열에서 55보다 큰 가장 작은 수다.

94의 인덱스인 4번째 요소에 55를 삽입하고, 94를 한 칸 뒤로 미룬다. 이 과정을 통해 정렬된 배열의 연산을 수행할 수 있다.

그렇다면 이 고생을 뭐하러 사서하는 것일까? 그 이유는 검색의 최적화에 있다. <span class="orange-A400">정렬된 배열은 그 자체로 순서라는 규칙성을 지니기 때문에 이를 활용한 알고리즘 적용이 가능</span>하기 때문이다. 이를 통해 검색의 작업량을 효과적으로 줄여 더욱 빠른 검색이 가능하다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 정렬된 배열 삽입 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/09/about-algorithm-chapter02/">알고리즘이 중요한 까닭</a>
 * @since 2021.07.10 Sat 02:41:14
 */
public class SortedArrayInsert
{
	// 배열
	private static final int[] ARRAY = { 6, 9, 14, 43, 94, -1, -1, -1, -1, -1 };
	
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
		
		// 삽입할 요소
		int item = 55;
		
		int result = run(item);
		
		StringBuilder builder = new StringBuilder();
		builder.append(result);
		builder.append("번 째 인덱스에 ");
		builder.append(item);
		builder.append(" 삽입: ");
		builder.append(Arrays.toString(ARRAY));
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 집합 배열 삽입 및 삽입된 인덱스 반환 함수
	 *
	 * @param item: [int] 삽입할 요소
	 *
	 * @return [int] 삽입된 인덱스
	 */
	private static int run(int item)
	{
		int result = find(item);
		
		insert(result, item);
		
		return result;
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
			// 목표 숫자보다 배열의 값이 클 경우
			if (target < ARRAY[i])
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
4번 째 인덱스에 55 삽입: [6, 9, 14, 43, 55, 94, -1, -1, -1, -1]
```

`insert` 함수는 이전 장에 나왔던 함수와 동일하지만, `find`의 경우 조금 달라졌다. `target == ARRAY[i]`로 동일한 값을 찾는 것이 아니라, `target < ARRAY[i]`로 삽입할 요소보다 큰 값을 찾도록 변경됐다. `run` 함수는 이를 적절히 구동하여 삽입된 인덱스를 반환한다.

> **JAVA의 정렬 함수**  
> 자바는 `Arrays.sort()`라는 함수가 제공되며, 인수로 정렬할 배열을 전달한다. 기본적으로 오름차순으로 정렬되며, 본인이 직접 정렬 함수를 오버라이딩함으로써 자신만의 조건으로 정렬되도록 설계할 수도 있다.

## 2-3. 이진 검색

우리가 앞에서 배열을 정렬한 이유가 바로 이 것이다. <span class="primary">이진 검색</span>이라는 알고리즘을 적용하면 검색의 속도를 상당부분 개선할 수 있다. 심지어 이진 검색은 알고리즘 축에서는 매우 쉬운 편에 속한다. 심지어 우리는 이미 다른 형태로 이진 검색이라는 알고리즘을 접한 적이 있다.

어렸을 때나, 혹은 술자리에서 Up & Down이라는 게임을 해본적이 있을 것이다. 진행자가 임의의 구간에 해당하는 임의의 수 하나를 머릿속으로 생각하면, 참가자들이 이 수를 맞추는 것이다. 참가자가 수를 말하면 진행자는 그 수가 자신의 수보다 큰 지, 작은 지 알려준다. 이걸 누군가 맞출 때까지 반복한다. 이진 검색의 원리는 이와 정확히 일치한다.

<span class="red-A400">이진 검색은 그 특성 상 정렬된 배열에서만 가능</span>하다. 1 ~ 100의 구간으로 순차적으로 정렬된 배열이 있다고 가정해보자. 찾아야 할 수가 68일 때, 이진 검색은 아래와 같이 이루어진다.

1. 1과 100의 중간인 50과 비교한다. (작업 +1)
2. 50은 68보다 작으로 51 ~ 100의 구간을 검색한다.
3. 51과 100의 중간인 75와 비교한다. (작업 +1)
4. 75는 68보다 크므로 51 ~ 74의 구간을 검색한다.
5. 51과 74의 중간인 62와 비교한다. (작업 +1)
6. 62는 68보다 작으므로 63 ~ 74의 구간을 검색한다.
7. 63과 74의 중간인 68과 비교한다. (작업 +1)
8. 검색이 종료된다.

만약 순차적으로 검색했다면 1 부터 68까지 총 68번의 작업이 발생할 것을 단 4번의 작업으로 검색을 완료했다. 간단한 알고리즘을 적용하는 것으로도 작업량이 17배 줄어든 것이다. 지금은 구간이 작지만, 구간의 끝이 만 단위가 넘어간다면 검색하려는 숫자의 위치에 따라 작업량이 기하급수적으로 감소한다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 이진 검색 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/09/about-algorithm-chapter02/">알고리즘이 중요한 까닭</a>
 * @since 2021.07.10 Sat 03:24:26
 */
public class BinarySearch
{
	// 배열 최대 크기
	private static final int MAX = 100;
	
	// 배열
	private static final int[] ARRAY = initArray(MAX);
	
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
		
		// 검색 대상
		int target = 68;
		
		int result = binarySearch(target);
		
		StringBuilder builder = new StringBuilder();
		builder.append(target);
		builder.append("을 탐색하는데 필요한 프로세스: ");
		builder.append(result);
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 배열 초기화 함수
	 *
	 * @param max: [int] 배열 최대 크기
	 *
	 * @return [int[]] 1 ~ max가 할당된 정수 배열
	 */
	private static int[] initArray(int max)
	{
		int[] temp = new int[max];
		
		for (int i = 0; i < max; i++)
		{
			temp[i] = i + 1;
		}
		
		return temp;
	}
	
	/**
	 * 이진 검색 및 프로세스 소요량 반환 함수
	 *
	 * @param target: [int] 검색 대상
	 *
	 * @return [int] 프로세스 소요량
	 */
	private static int binarySearch(int target)
	{
		// 프로세스 소요량
		int count = 0;
		
		// 중간값
		int mid = -1;
		
		// 구간 시작값
		int start = 1;
		
		// 구간 끝값
		int end = ARRAY.length;
		
		while (target != mid)
		{
			mid = (end + start) / 2;
			
			// 목표가 중간값보다 클 경우
			if (target > mid)
			{
				start = mid + 1;
			}
			
			// 목표가 중간값보다 작거나 같을 경우
			else
			{
				end = mid - 1;
			}
			
			count++;
		}
		
		return count;
	}
}
```

이진 검색을 구현한 소스는 위와 같다. 눈여겨 볼 부분은 `binarySearch` 함수다. 시작값 `start`는 1로 초기화되고, 끝값 `max`는 배열의 크기와 동일하다.

`mid`를 계산하여 `target`과 크기비교를 한다. `target`이 더 클 경우, 중간값을 기준으로 윗 구간이므로 `start`를 `mid + 1`로 보정한다. 반대로 `target`이 더 작을 경우, 중간값을 기준으로 아랫 구간이므로 `end`를 `mid - 1`로 보정한다. 검색 대상값인 `target`과 중간값 `mid`가 동일할 때까지 알고리즘을 반복한다.

1 ~ 100까지 차례대로 배치되어 있으므로, 1은 `ARRAY[0]`, 43은 `ARRAY[42]`로 값 자체로 인덱스나 다름없기 때문에 인덱스는 따로 구하지 않는다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 이진 검색 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/09/about-algorithm-chapter02/">알고리즘이 중요한 까닭</a>
 * @since 2021.07.10 Sat 03:24:26
 */
public class BinarySearch
{
	// 배열 최대 크기
	private static final int MAX = 100;
	
	// 배열
	private static final int[] ARRAY = initArray(MAX);
	
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
		
		// 검색 대상
		int target = 68;
		
		int result = binarySearch(target);
		
		StringBuilder builder = new StringBuilder();
		builder.append(target);
		builder.append("을 탐색하는데 필요한 프로세스: ");
		builder.append(result);
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 배열 초기화 함수
	 *
	 * @param max: [int] 배열 최대 크기
	 *
	 * @return [int[]] 1 ~ max가 할당된 정수 배열
	 */
	private static int[] initArray(int max)
	{
		int[] temp = new int[max];
		
		for (int i = 0; i < max; i++)
		{
			temp[i] = i + 1;
		}
		
		return temp;
	}
	
	/**
	 * 이진 검색 및 프로세스 소요량 반환 함수
	 *
	 * @param target: [int] 검색 대상
	 *
	 * @return [int] 프로세스 소요량
	 */
	private static int binarySearch(int target)
	{
		// 프로세스 소요량
		int count = 0;
		
		// 중간값
		int mid = -1;
		
		// 구간 시작값
		int start = 1;
		
		// 구간 끝값
		int end = ARRAY.length;
		
		while (target != mid)
		{
			count++;
			
			// 목표가 시간 구간 혹은 끝 구간과 일치할 경우
			if (target == start || target == end)
			{
				break;
			}
			
			mid = (end + start) / 2;
			
			// 목표가 중간값보다 클 경우
			if (target > mid)
			{
				start = mid + 1;
			}
			
			// 목표가 중간값보다 작거나 같을 경우
			else
			{
				end = mid - 1;
			}
		}
		
		return count;
	}
}
```

이진 검색의 단점이 있는데, 1 ~ 100의 구간이 있다고 가정하면, 1이나 100과 같은 <span class="orange-A400">구간의 시작과 끝을 검색하는데 시간이 매우 오래 걸린다.</span> 이는 이진 검색이 중간값을 기준으로 검색한다는 특징으로 인한 단점이다. 위의 소스는 구간의 시작과 끝도 비교함으로써 이진 검색을 강화한 소스다.

``` java
// 목표가 시간 구간 혹은 끝 구간과 일치할 경우
if (target == start || target == end)
{
	break;
}
```

눈여겨 볼 부분은 `binarySearch` 함수의 해당 부분이다. 기존에 없던 `start`와 `end`의 비교 로직이 추가되어, <span class="orange-A400">구간의 시작과 끝이 목표일 경우 더욱 빠르게 검색</span>할 수 있도록 보정한 것이다.

| 구분  | 보정 전 | 보정 후 |
| :---: | :-----: | :-----: |
|   1   |    6    |    1    |
|  51   |    6    |    2    |
|  100  |    7    |    1    |

## 2-4. 이진 검색 대 선형 검색

1부터 순차적으로 하나하나 검색하는 알고리즘을 <span class="primary">선형 검색</span>, 구간의 중간값을 기준으로 검색하는 알고리즘을 <span class="primary">이진 검색</span>이라 한다. 우리가 2장까지 진행하면서, 배열의 일반적인 검색과 이진 검색에 대해 설계하고 차이점을 비교했다.

선형 검색의 경우 요소의 갯수 $N$이 늘어나면 늘어날수록 예상되는 최대 작업량도 $N$개로 비례하여 늘어난다. 이에 비해 이진 검색의 경우 $N = 10,000$일 때, 책에 의하면 최대 작업량이 13이라고 한다. $N = 1,000,000$이면 작업량은 20으로, 선형 검색의 작업량이 1,000,000임을 감안하면 <span class="green-A400">데이터가 많아질 수록 이진 검색으로 절약할 수 있는 기대 비용이 더욱 큼</span>을 알 수 있다.

``` java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 검색 퍼포먼스 비교 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/09/about-algorithm-chapter01/">자료구조가 중요한 까닭</a>
 * @since 2021.07.10 Sat 04:21:37
 */
public class SearchCompare
{
	// 배열 최대 크기
	private static final int MAX = 100000000;
	
	// 배열
	private static final int[] ARRAY = initArray(MAX);
	
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
		
		// 검색 대상
		int target = 86421478;
		
		long tic = System.nanoTime();
		
		int linearResult = find(target);
		
		long toc1 = System.nanoTime() - tic;
		
		tic = System.nanoTime();
		
		int binaryResult = binarySearch(target);
		
		long toc2 = System.nanoTime() - tic;
		
		StringBuilder builder = new StringBuilder();
		builder.append(target);
		builder.append("을 탐색하는데 소요된 선형 검색 프로세스: ");
		builder.append(linearResult);
		builder.append("(").append(toc1).append("ns)\n");
		builder.append(target);
		builder.append("을 탐색하는데 소요된 이진 검색 프로세스: ");
		builder.append(binaryResult);
		builder.append("(").append(toc2).append("ns)\n\n");
		builder.append("이진 검색이 약 ").append(toc1 / toc2).append("배 더 빠릅니다.");
		
		writer.write(builder.toString());
		writer.newLine();
		writer.flush();
		writer.close();
	}
	
	/**
	 * 배열 초기화 함수
	 *
	 * @param max: [int] 배열 최대 크기
	 *
	 * @return [int[]] 1 ~ max가 할당된 정수 배열
	 */
	private static int[] initArray(int max)
	{
		int[] temp = new int[max];
		
		for (int i = 0; i < max; i++)
		{
			temp[i] = i + 1;
		}
		
		return temp;
	}
	
	/**
	 * 이진 검색 및 프로세스 소요량 반환 함수
	 *
	 * @param target: [int] 검색 대상
	 *
	 * @return [int] 프로세스 소요량
	 */
	private static int binarySearch(int target)
	{
		// 프로세스 소요량
		int count = 0;
		
		// 중간값
		int mid = -1;
		
		// 구간 시작값
		int start = 1;
		
		// 구간 끝값
		int end = ARRAY.length;
		
		while (target != mid)
		{
			count++;
			
			// 목표가 시간 구간 혹은 끝 구간과 일치할 경우
			if (target == start || target == end)
			{
				break;
			}
			
			mid = (end + start) / 2;
			
			// 목표가 중간값보다 클 경우
			if (target > mid)
			{
				start = mid + 1;
			}
			
			// 목표가 중간값보다 작거나 같을 경우
			else
			{
				end = mid - 1;
			}
		}
		
		return count;
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
86421478을 탐색하는데 소요된 선형 검색 프로세스: 86421477(26936600ns)
86421478을 탐색하는데 소요된 이진 검색 프로세스: 26(5100ns)

이진 검색이 약 5281배 더 빠릅니다.
```

위 소스는 선형 검색과 이진 검색을 통합해 퍼포먼스를 비교할 수 있는 소스다. 100,000,000(1억)의 구간에서 임의의 수 `target`을 검색한다. 해당 소스에서는 86,421,478으로 지정했다.

|    구분     | 선형 검색  | 이진 검색 |    차이    |
| :---------: | :--------: | :-------: | :--------: |
| 프로세스 수 | 86,421,477 |    26     |     -      |
|  테스트 1   | $2.442ms$  |  $5.2us$  | 약 4,699배 |
|  테스트 2   | $2.463ms$  |  $5.3us$  | 약 4,648배 |
|  테스트 3   | $2.434ms$  |  $5.5us$  | 약 4,424배 |
|  테스트 4   | $2.536ms$  |  $5.3us$  | 약 4,785배 |
|  테스트 5   | $2.383ms$  |   $5us$   | 약 4,766배 |
|  테스트 6   | $2.509ms$  |  $5.1us$  | 약 4,919배 |
|  테스트 7   | $2.487ms$  |  $5.4us$  | 약 4,605배 |
|  테스트 8   | $2.394ms$  |  $4.5us$  | 약 5,320배 |
|  테스트 9   | $2.666ms$  |  $5.3us$  | 약 5,030배 |
|  테스트 10  | $2.352ms$  |  $5.3us$  | 약 4,438배 |

<small class="red-400">※ 위 테스트는 CPU i7-10700K, RAM 32GB에서 테스트한 결과물로, 구동 환경에 따라 연산 결과가 달라질 수 있음</small>

이진검색이 선형검색에 비해 약 5000배 까지도 차이가 남을 확인할 수 있다. 단위가 $ms$, $us$니까 사람 입장에선 그게 그거지만, 기계 입장에선 이진 검색으로 5000번 수행할 동안 선형 검색은 한 번 수행하는 셈이니 실로 어마어마한 차이다.

# 마무리

이 장에서는 알고리즘을 적용한 이진 검색을 구현하고 이를 기존의 선형 검색과 비교함으로써 알고리즘의 강력함을 체감할 수 있었다.

현업에서 일하면서 알고리즘이 강력하다는 건 알고있었지만, 이렇게 간단하게 구현해서 직접 비교해보니 역시나 알고리즘이 중요한 이유를 알 것 같다.

원래 오늘같이 내일 쉬는 날이면 새벽 네 다섯시까지 공부하긴 하는데, 포스팅 때문에 풀타임으로 집중하다 보니 유난히 더 피곤하다....