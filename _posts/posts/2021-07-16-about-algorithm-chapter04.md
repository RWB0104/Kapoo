---
title: "빅 오로 코드 속도 올리기"
excerpt: "이전 장에서 빅 오 코드 표기법을 배웠으니, 이를 통해 시간 복잡도를 비교함으로써 알고리즘을 서로 비교할 수 있음을 확인했다. 이 장에서는 버블 정렬 알고리즘을 설계하고, 이를 빅 오 표기법을 통해 어떻게 개선할 수 있는지 확인해본다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: "2021-07-16T21:39:54"
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "버블 정렬" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 4장 빅 오로 코드 속도 올리기

이전 장에서 빅 오 코드 표기법을 배웠으니, 이를 통해 시간 복잡도를 비교함으로써 알고리즘을 서로 비교할 수 있음을 확인했다. 이 장에서는 버블 정렬 알고리즘을 설계하고, 이를 빅 오 표기법을 통해 어떻게 개선할 수 있는지 확인해본다.

## 4-1 버블 정렬

배열을 효과적으로 다루기 위해 <span class="primary">정렬</span> 기법이 폭넓게 이용된다. <span class="orange-A400">이진 검색</span>에서도 겪었듯이, 정렬된 배열은 배열의 요소를 어느정도 **예측**할 수 있도록 규칙성을 부여한다. 이러한 이유로 배열을 정렬하는 다양한 기법이 고안되었으며, 이 문단에서는 정렬 중 가장 기본적이면서 상대적으로 비효율적인 <span class="orange-A400">버블 정렬</span>에 대해 알아본다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947608-e434441d-f735-44d6-8634-32431c152333.png" width="600px" />
</p>

위와 같은 배열이 존재할 때, 버블 정렬은 이를 어떻게 오름차순으로 정렬하는 지 알아보자.

1. 우선 맨 첫 요소와 그 다음 요소를 비교한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947619-042289cc-2740-445f-9b53-40f35bda9ba9.png" width="600px" />
</p>

2. 앞의 요소가 뒤의 요소보다 클 경우 서로 교환(swap)한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947623-68067599-90d6-458d-b8ec-6590f88e7b81.png" width="600px" />
</p>

3. 각각 한 칸씩 이동하여 다음 요소를 비교한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947629-459f452d-713d-443d-bf1d-d4d2a28db97f.png" width="600px" />
</p>

4. 1 ~ 3의 과정을 반복한다.

더 이상 교환이 이루어지지 않을 때까지 1 ~ 3의 과정을 반복한다. 이러한 반복을 <span class="primary">패스스루(passthrough)</span>라 명칭한다.

## 4-2. 버블 정렬 실제로 해보기

이전 문단에서 <span class="orange-A400">버블 정렬</span>의 원리를 알았으니 실제로 적용하여 배열을 완전히 정렬해보자.

대상 배열은 이전 문단에서 사용된 배열과 동일하다.

1. 패스스루 1: 8과 4 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947619-042289cc-2740-445f-9b53-40f35bda9ba9.png" width="600px" />
</p>

8과 4를 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947623-68067599-90d6-458d-b8ec-6590f88e7b81.png" width="600px" />
</p>

2. 패스스루 1: 8과 6 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947629-459f452d-713d-443d-bf1d-d4d2a28db97f.png" width="600px" />
</p>

8과 6을 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947635-b30df0e3-2b2b-4bee-b727-8bf070c82c73.png" width="600px" />
</p>

3. 패스스루 1: 8과 7 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947646-ce35e2d1-0428-4e84-b8da-c2b17a13485c.png" width="600px" />
</p>

8과 7을 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947652-f53b26ef-f291-4c64-9719-e4886aff91b6.png" width="600px" />
</p>

4. 패스스루 1: 8과 3 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947657-a374227c-855e-4b88-aba0-a8eb9ee881ca.png" width="600px" />
</p>

8과 3을 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947666-5574d74d-9d9a-4ff3-b145-9e9b341df0c3.png" width="600px" />
</p>

가장 마지막 배열의 요소까지 도달했으므로, 가장 마지막 요소인 8은 올바른 위치에 정렬되어 있다. 오름차순에서 배열의 가장 마지막 요소에는 가장 큰 값이 와야하므로, 배열의 요소 중 가장 큰 값인 8이 오는 것이 적절하다.

이미 정렬되어있으므로, 다음 패스스루에선 마지막 요소는 비교하지 않아도 된다. 즉, <span class="teal-400">패스스루가 진행될 수록 비교할 요소의 범위가 작아진다.</span>

정렬이 완료된 요소는 <span class="yellow-400">노란색</span>으로 표시한다.

5. 패스스루 2: 4와 6 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947681-5b8ec91b-9da1-41da-9906-6d9e99c4fdd8.png" width="600px" />
</p>

4와 6을 비교한다. 뒤의 요소가 더 크므로, 스왑하지 않는다.

6. 패스스루 2: 6과 7 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947698-af6eae59-b9e5-4075-a7e5-e433c8888a6b.png" width="600px" />
</p>

6과 7을 비교한다. 뒤의 요소가 더 크므로, 스왑하지 않는다.

7. 패스스루 2: 7과 3 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947709-19eefa54-e834-41cc-9ba2-f57d23424e9c.png" width="600px" />
</p>

7과 3을 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947720-2fca7b88-3f84-422b-af78-77e57779270f.png" width="600px" />
</p>

요소 7이 완전히 정렬됐다. 다음 패스스루를 시작한다.

8. 패스스루 3: 4와 6 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947722-d73f88f3-3c12-4c19-9c85-0feb6bd4b3a9.png" width="600px" />
</p>

4와 6을 비교한다. 뒤의 요소가 더 크므로, 스왑하지 않는다.

9. 패스스루 3: 6과 3 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947729-b420b29e-3c9b-42c2-8fe2-88d509da6b91.png" width="600px" />
</p>

6과 3을 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947744-2d71db3b-e35b-457f-ba35-84d05e2a6088.png" width="600px" />
</p>

요소 6이 완전히 정렬됐다. 다음 패스스루를 시작한다.

10. 패스스루 4: 4와 3 비교

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947755-4833cd65-a86e-48c7-8413-d5e8df9c624c.png" width="600px" />
</p>

4와 3을 비교한다. 앞의 요소가 더 크므로, 스왑한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947767-d8163c94-8fbc-43ec-9b17-5567b9714eb5.png" width="600px" />
</p>

가장 마지막 패스스루이므로, 모든 요소가 정렬됐다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947774-a376dc47-0102-4ff1-8b08-d65cb8175cf0.png" width="600px" />
</p>

정렬된 배열은 위와 같으며, 총 10번의 작업이 이루어졌다.

## 4-3. 버블 정렬 구현

<span class="orange-A400">버블 정렬</span>을 직접 코드로 구현해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 버블 정렬 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/16/about-algorithm-chapter04/">빅 오로 코드 속도 올리기</a>
 * @since 2021.07.16 Fri 19:11:19
 */
public class BubbleSort
{
	// 배열
	private static int[] array;
	
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
		
		writer.write("버블 정렬할 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		array = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		int[] count = bubbleSort();
		
		writer.newLine();
		writer.write(Arrays.toString(array));
		writer.newLine();
		writer.newLine();
		writer.flush();
		
		writer.write(" - 비교 작업량: ");
		writer.write(String.valueOf(count[0]));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 스왑 작업량: ");
		writer.write(String.valueOf(count[1]));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 총 작업량: ");
		writer.write(String.valueOf(count[0] + count[1]));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 버블 정렬 및 작업량 반환 함수
	 *
	 * @return [int[]] 비교 작업량과 스왑 작업량
	 */
	private static int[] bubbleSort()
	{
		// 비교 작업량
		int compareCount = 0;
		
		// 스왑 작업량
		int swapCount = 0;
		
		// 스왑 여부
		boolean isSwaped = true;
		
		// 비교 인덱스
		int index = array.length - 1;
		
		// 스왑이 일어나지 않을 때까지
		while (isSwaped)
		{
			isSwaped = false;
			
			for (int i = 0; i < index; i++)
			{
				compareCount++;
				
				// 현재 요소가 다음 요소보다 클 경우
				if (array[i] > array[i + 1])
				{
					// 스왑 발생
					isSwaped = true;
					swapCount++;
					
					int temp = array[i];
					
					array[i] = array[i + 1];
					array[i + 1] = temp;
				}
			}
			
			index--;
		}
		
		return new int[] { compareCount, swapCount };
	}
}
```

위 소스는 사용자로부터 공백으로 구분된 숫자를 입력받아 버블 정렬을 수행하는 알고리즘이다.

* 입력

``` tc
5 4 12 6 77 32 1 9 11 59
```

* 출력

``` tc
[1, 4, 5, 6, 9, 11, 12, 32, 59, 77]

 - 읽기 작업량: 42
 - 스왑 작업량: 16
 - 총 작업량: 58
```

실제 버블 정렬이 수행되는 알고리즘은 아래와 같다.

``` java
/**
 * 버블 정렬 및 작업량 반환 함수
 *
 * @return [int[]] 비교 작업량과 스왑 작업량
 */
private static int[] bubbleSort()
{
	// 비교 작업량
	int compareCount = 0;
	
	// 스왑 작업량
	int swapCount = 0;
	
	// 스왑 여부
	boolean isSwaped = true;
	
	// 비교 인덱스
	int index = array.length - 1;
	
	// 스왑이 일어나지 않을 때까지
	while (isSwaped)
	{
		isSwaped = false;
		
		for (int i = 0; i < index; i++)
		{
			compareCount++;
			
			// 현재 요소가 다음 요소보다 클 경우
			if (array[i] > array[i + 1])
			{
				// 스왑 발생
				isSwaped = true;
				swapCount++;
				
				int temp = array[i];
				
				array[i] = array[i + 1];
				array[i + 1] = temp;
			}
		}
		
		index--;
	}
	
	return new int[] { compareCount, swapCount };
}
```

* `compareCount`: 비겨 작업량 카운트
* `swapCount`: 스왑 작업량 카운트
* `isSwaped`: 스왑 여부
* `index`: 정렬 인덱스

`index`는 정렬을 하기위한 배열의 최대 인덱스다. 1을 빼주는 이유는 버블 정렬의 특성 때문이다. $[0, 1, 2]$와 같은 배열의 최대 인덱스는 3이다. 배열의 최대 인덱스가 3일 때 첫 패스스루의 작업 갯수는 0과 1, 1과 2로 2번 일어난다. 최대 인덱스를 하나 빼주지 않으면 0과 1, 1과 2, 2와 무엇인가를 비교하려 하기 때문에 배열 초과 예외인 `ArrayIndexOutOfBoundsException`가 발생한다.

`while`문을 통해 스왑이 일어나지 않을 때까지 반복한다. <span class="pink-A400">패스스루 내에서 스왑이 한 번도 일어나지 않으면 정렬이 완료</span>된 것으로 간주하여 종료한다.

`for`문을 통해 인덱스 크기까지 비교하여 현재 배열보다 다음 배열이 더 클 경우 스왑한다. 이 과정에서 `isSwaped`이 `true`로 할당된다. `isSwaped`가 `true`이므로 다음 프로세스가 패스스루가 진행될 것이다.

해당하는 각 과정은 카운팅된다.

## 4-4. 버블 정렬의 효율성

버블 정렬은 두 가지 작업으로 이루어진다.

* **비교**: 더 큰 수를 찾기위해 비교한다.
* **교환**: 정렬하기 위해 스왑한다.

요소 5개가 있을 때, 아래와 같은 <span class="blue-400">비교</span>작업이 이루어진다.

* 패스스루 1: 총 4번의 비교
* 패스스루 2: 총 3번의 비교
* 패스스루 3: 총 2번의 비교
* 패스스루 4: 총 1번의 비교
* 패스스루 5: 비교 없음 (정렬 완료)

즉, 4 + 3 + 2 + 1로 총 10번의 비교가 일어난다.

그렇다면 <span class="blue-400">스왑</span>작업은 어떨까? 스왑은 상황에 따라 일어날 수도, 일어나지 않을 수도 있다.

이전 장에서 <span class="red-400">알고리즘은 언제나 비관적인 관점</span>으로 접근한다고 했으니, 스왑이 언제나 일어날 경우를 가정하자.

> 가장 최악의 버블 정렬 케이스  
> 버블 정렬은 하나의 요소와 다음 요소를 비교하여 정렬하는 알고리즘이다. 만약 오름차순으로 정렬할 경우, 내림차순으로 정렬된 배열을 입력할 때 가장 최악의 케이스가 된다. 이 경우 모든 요소에 비교와 스왑이 일어난다.

최악의 케이스인 내림차순으로 정렬된 요소 5개가 있을 때, 아래와 같은 <span class="blue-400">스왑</span>작업이 이루어진다.

* 패스스루 1: 총 4번의 스왑
* 패스스루 2: 총 3번의 스왑
* 패스스루 3: 총 2번의 스왑
* 패스스루 4: 총 1번의 스왑
* 패스스루 5: 스왑 없음 (정렬 완료)

비교와 동일한 작업량이 발생한다. 이를 표로 정리하면 아래와 같다.

|  $N$  | 작업 수 | $N^2$ |
| :---: | :-----: | :---: |
|   5   |   20    |  25   |
|  10   |   90    |  100  |
|  20   |   380   |  400  |
|  40   |  1560   | 1600  |
|  80   |  6320   | 6400  |
|  100  |  9900   | 10000 |

요소 $N$개 배열에서 버블 정렬의 최대 작업량은 $N(N - 1)$이다. 이전 장에서도 언급했 듯이, 알고리즘은 $O(N^2)$와 $O(N^2 - N)$과 크게 차이를 두지 않는다. 즉, 버블 정렬의 시간 복잡도는 $O(N^2)$가 된다.

$O(N^2)$은 $O(N)$ 보다도 작업량이 급격히 증가한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/125947786-fb410c06-799f-4041-8827-9a946a8d076e.png" width="600px" />
</p>

이를 비교하면 더욱 한눈에 알 수 있다. 이 $O(N^2)$을 <span class="orange-A400">이차 시간</span>이라고 명칭한다.

## 4-5. 이차 문제

위에서 버블 정렬에 대한 알고리즘을 설계했다. 시간 복잡도는 무려 $O(N^2)$을 가진다. 이전 장에서 선형 검색과 이진 검색을 비교하며 최대한 시간 복잡도를 줄이는게 좋다고 손아프게 적은게 무색할 정도로, 이 알고리즘의 효율은 지면을 뜷고 추락하고있다.

여기 비슷한 이차 시간 알고리즘이 있다. 입력한 요소의 중복 여부를 판별하는 알고리즘이다.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 중복 확인 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/16/about-algorithm-chapter04/">빅 오로 코드 속도 올리기</a>
 * @since 2021.07.16 Fri 20:46:15
 */
public class DuplicateCheck
{
	private static int count = 0;
	
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
		
		writer.write("중복 확인할 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		// 배열
		int[] array = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		boolean result = isDuplicated(array);
		
		// 중복된 요소가 있을 경우
		if (result)
		{
			writer.write("중복된 요소가 존재합니다.");
		}
		
		// 없을 경우
		else
		{
			writer.write("중복된 요소가 존재하지 않습니다.");
		}
		
		writer.newLine();
		writer.flush();
		
		writer.write("작업량: ");
		writer.write(String.valueOf(count));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
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
}
```

소스는 위와 같다.

* 입력

``` java
0 1 2 3 4 5 6 7 8 9
```

* 출력

``` java
중복된 요소가 존재하지 않습니다.
작업량: 100
```

위 알고리즘도 마찬가지로 $N = 10$일 때 최악의 경우 $O(N^2)$의 시간 복잡도를 가진다.

중복을 판별하는 핵심 동작을 보자.

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

버블 정렬과 마찬가지로 중첩 반복문이 존재한다. 중첩 반복문이 있을 경우, 반복문의 갯수만큼 시간 복잡도가 급격히 올라간다.

중첩 반복문은 $N$개의 요소를 $N$번 만큼 작업한다. 반복문의 중첩이 심해지면 심해질 수록 $N$번의 $N$번의 $N$번의... 와 같은 작업을 반복할 것이다. 물론 시간 복잡도의 크기가 하늘 높은줄 모르고 치솟는 것도 포함된다.

즉, 어디가서 중첩 반복문을 사용하는 알고리즘을 봤다면 그 알고리즘의 시간 복잡도는 최소 $O(N^2)$임을 바로 유추할 수 있다.

## 4-6. 선형 해결법

이전 장에서, 선형 검색과 이진 검색의 시간복잡도를 비교하며 $O(N)$이 $O(\log N)$보다 얼마나 비효율적인지 손가락이 아플 정도로 설명했던 걸로 기억한다. 그런데 방금의 두 알고리즘은 아픈 손가락이 무색해질 정도로 미칠듯한 비효율을 선사하고 있다.

<i align="center">아니, 니가 알고리즘을 많이 안 짜봐서 그런가본데, 그렇게 설계할 수 밖에 없는 알고리즘도 있거든??</i>

물론 맞는 말이다. 백준만 해도 로직이 복잡해서 중첩 반복문을 사용하기도 한다. 실무에서도 마찬가지다. 로직이 복잡하거나, 소스 최적화의 비용이 너무 높거나 혹은 효율이 극악이거나. 아니면 컴퓨터 성능이 충분히 좋아서 굳이 그렇게 머리 아픈일에 투자할 필요를 못 느낄 수도 있다.

여담으로, 실제로 큰 기업은 이런 최적화 보다도 컴퓨팅 성능을 극대화시키는 방법을 많이 선택한다고 한다. 로직이야 어차피 한정적으로 적용되고, 차라리 컴퓨터 성능을 올리는게 오히려 싸게 먹히기도 한다. 로직과 달리 컴퓨팅 자원은 다른 곳에 써먹을 수도 있으니 이쪽이 더 범용적이다.

필자의 컴퓨터도 작성일 기준으로 그리 못난 편은 아니지만, 안타깝게도 위에 작성한 중복 판별 알고리즘은 최적화의 비용이 매우 저렴한 편이다. 우리는 공부를 목적으로 하니 한 번 최적화해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 향상된 중복 확인 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/16/about-algorithm-chapter04/">빅 오로 코드 속도 올리기</a>
 * @since 2021.07.16 Fri 21:18:05
 */
public class ImproveDuplicateCheck
{
	private static int count = 0;
	
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
		
		writer.write("중복 확인할 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		// 배열
		int[] array = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		boolean result = isDuplicated(array);
		
		// 중복된 요소가 있을 경우
		if (result)
		{
			writer.write("중복된 요소가 존재합니다.");
		}
		
		// 없을 경우
		else
		{
			writer.write("중복된 요소가 존재하지 않습니다.");
		}
		
		writer.newLine();
		writer.flush();
		
		writer.write("작업량: ");
		writer.write(String.valueOf(count));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
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
}
```

소스는 위와 같다.

* 입력

``` java
0 1 2 3 4 5 6 7 8 9
```

* 출력

``` java
중복된 요소가 존재하지 않습니다.
작업량: 10
```

JAVA의 가변 배열 `ArrayList` 클래스를 활용하여 구현했다. 요소가 한 번도 나오지 않았을 경우, `list`에 존재하지 않을 것이므로 넣어준다. 이후 동작 중에 이미 `list`에 존재하는 숫자가 발견될 경우, 중복된 요소이므로 종료하고 결과를 반환한다.

$N = 10$일 때 $O(N)$의 시간 복잡도로 대폭 개선됨을 확인할 수 있다. 이전의 결과와 비교하면 무려 <span class="lightBlue-A400">10배의 차이</span>로, 산술적으로 이전 알고리즘이 1번 동작할 동안 개선된 알고리즘은 10번 동작할 수 있다.

지금은 $N = 10$으로 요소 자체가 작아서 체감이 되지 않을 수도 있지만, $N = 10,000$일 경우 무려 <span class="lightBlue-A400">10,000배의 차이</span>가 발생한다.

알고리즘의 최적화가 중요한 이유가 여기에 있다. 처리하는 데이터가 빅데이터에 가까워질수록 그 효율이 미친듯이 상승하기 때문.

# 마무리

이 장에서 배운 점을 정리하면 아래와 같다.

* 반복문의 중첩 여부, 갯수를 통해 시간 복잡도를 유추할 수 있다.
* 시간 복잡도를 통해 알고리즘의 성능 향상을 수치상으로 비교, 표시할 수 있다.

사실 정리해놓고 보니 뭐 별 거 아닌, 당연한 얘기를 가지고 광활하게 설명했나 싶기도 하다. 난 이 당연한 걸 제대로 몰랐던 거고.

이런 알고리즘도 있다. 속도가 비슷해서 빅 오 표기로는 그 차이가 보이지 않을 경우. 하지만 그럼에도 확실히 어떠한 요인으로든 차이가 발생할 것이다. 다음 장에서는 이러한 알고리즘에 대한 최적화에 대해 알아본다.