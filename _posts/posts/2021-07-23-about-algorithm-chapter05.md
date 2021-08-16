---
title: "빅 오를 사용하거나 사용하지 않는 코드 최적화"
excerpt: "지금까지 알고리즘의 퍼포먼스를 비교하면서 빅 오 표기법을 통해 수치화했다. 하지만 빅 오 표기법도 알고리즘의 퍼포먼스를 측정함에 있어서 완벽함을 보여주진 않는다. 이전 장에서 N(O^2)이나 N(N^2 - N) 모두 빅 오 표기법에선 N(O^2)로 간주한다고 설명했다. 이러한 특성으로 인해, 실제로는 명백한 차이를 보이는 알고리즘임에도 불구하고 빅 오 표기법으론 성능이 거의 동일하게 측정되기도 한다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: "2021-07-23T23:42:33"
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "선택 정렬" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 5장 빅 오를 사용하거나 사용하지 않는 코드 최적화

지금까지 알고리즘의 퍼포먼스를 비교하면서 <span class="primary">빅 오 표기법</span>을 통해 수치화했다. 하지만 빅 오 표기법도 알고리즘의 퍼포먼스를 측정함에 있어서 완벽함을 보여주진 않는다.

이전 장에서 $N(O^2)$이나 $N(N^2 - N)$ 모두 빅 오 표기법에선 $N(O^2)$로 간주한다고 설명했다. 이러한 특성으로 인해, 실제로는 명백한 차이를 보이는 알고리즘임에도 불구하고 빅 오 표기법으론 성능이 거의 동일하게 측정되기도 한다.

알고리즘의 속도는 알고리즘을 선택하는 데 있어서 매우 중요한 척도이므로, 이를 정확비 측정하는 것은 매우 중요하다. 이 장에서는 앞서 설명한 것과 같이 대체로 성능이 <span class="pink-400">비슷해</span>보이는 알고리즘을 구별하여 더욱 빠른 알고리즘을 판별해본다.

## 5-1. 선택 정렬

이전 장에서는 <span class="orange-400">버블 정렬</span> 알고리즘을 통해 내용을 서술했다. 이번 장에서는 다른 정렬 알고리즘인 <span class="orange-400">선택 정렬</span> 알고리즘을 통해 서술해본다.

선택 정렬 알고리즘은 패스스루마다 요소를 탐색하여 최소값을 탐지하고, 이를 앞으로 보내어 정렬하는 방식이다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793171-d9677021-0ff9-414c-b83b-165dc037222f.png" width="600px" />
</p>

정렬에 사용할 배열은 위와 같으며, 과정은 아래의 순서대로 진행된다.

1. 맨 첫 번째 값을 탐색한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793179-854c05e3-04cc-420a-8a42-22fe0145c4cb.png" width="600px" />
</p>

한 패스스루에서 가장 작은 요소를 찾는 것이 핵심이다. 아직 첫 단계이므로, 첫 요소는 그 자체로 최소값이 된다.

2. 탐색 포인터를 한 칸 이동하여 패스스루 최소값과 비교한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793193-d865b162-9c02-44a0-a59c-d2e1674f4e5f.png" width="600px" />
</p>

* 최소값: 5
* 탐색값: 3

패스스루 최소값을 3으로 갱신한다.

3. 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793202-90a4dfc3-d40c-4073-9127-763781156693.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 9

패스스루 최소값이 더 작으므로 갱신되지 않는다.

4. 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793209-88b076db-fe26-4cee-9a0c-1f0540beb0c8.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 2

패스스루 최소값을 2로 갱신한다.

5. 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793215-a5a7dde7-8fbf-42a4-b585-5b5778297cc3.png" width="600px" />
</p>

* 최소값: 2
* 탐색값: 6

패스스루 최소값이 더 작으므로 갱신되지 않는다. 마지막 요소이므로, 탐색이 종료되고 요소 하나를 정렬한다.

6. 패스스루 최소값의 요소를 맨 앞으로 정렬한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793223-3580ae05-867b-464d-9d58-831e93b6142b.png" width="600px" />
</p>

맨 앞의 요소 5와 최소값 2의 자리를 서로 교환한다. 2는 완전히 매칭되었으므로, 앞으로의 패스스루에서 제외된다.

## 5-2. 선택 정렬 실제로 해보기

이전 문단에서 선택 정렬의 원리에 대해 알았으니, 전체 배열에 대한 선택 정렬을 수행해보자.

<small class="red-A400">패스스루 1은 이전 문단의 과정과 동일하다.</small>

1. 패스스루 1: 맨 첫 번째 요소를 탐색한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793179-854c05e3-04cc-420a-8a42-22fe0145c4cb.png" width="600px" />
</p>

* 최소값: -
* 탐색값: 5

한 패스스루에서 가장 작은 요소를 찾는 것이 핵심이다. 아직 첫 단계이므로, 첫 요소는 그 자체로 최소값이 된다.

2. 패스스루 1: 탐색 포인터를 한 칸 이동하여 패스스루 최소값과 비교한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793193-d865b162-9c02-44a0-a59c-d2e1674f4e5f.png" width="600px" />
</p>

* 최소값: 5
* 탐색값: 3

패스스루 최소값을 3으로 갱신한다.

3. 패스스루 1: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793202-90a4dfc3-d40c-4073-9127-763781156693.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 9

패스스루 최소값이 더 작으므로 갱신되지 않는다.

4. 패스스루 1: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793209-88b076db-fe26-4cee-9a0c-1f0540beb0c8.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 2

패스스루 최소값을 2로 갱신한다.

5. 패스스루 1: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793215-a5a7dde7-8fbf-42a4-b585-5b5778297cc3.png" width="600px" />
</p>

* 최소값: 2
* 탐색값: 6

패스스루 최소값이 더 작으므로 갱신되지 않는다. 마지막 요소이므로, 탐색이 종료되고 요소 하나를 정렬한다.

6. 패스스루 1: 패스스루 최소값의 요소를 맨 앞으로 정렬한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793223-3580ae05-867b-464d-9d58-831e93b6142b.png" width="600px" />
</p>

맨 앞의 요소 5와 최소값 2의 자리를 서로 교환한다. 2는 완전히 매칭되었으므로, **앞으로의 패스스루에서 제외**된다.

7. 패스스루 2: 두 번째 요소를 탐색한다.

* 최소값: -
* 탐색값: 3

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793231-7c8448af-29e1-4d65-9c37-630dcec47e24.png" width="600px" />
</p>

해당 요소를 최소값으로 지정한다.

8. 패스스루 2: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793239-cefccd38-954e-4c49-85be-a007698d072b.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 9

패스스루 최소값이 더 작으므로 갱신되지 않는다.

9. 패스스루 2: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793255-354bc82f-0c65-4a75-bfde-c192f97344dc.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 5

패스스루 최소값이 더 작으므로 갱신되지 않는다.

10. 패스스루 2: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793276-bd4020c4-fcda-4b45-b993-2575ff7c1b69.png" width="600px" />
</p>

* 최소값: 3
* 탐색값: 6

패스스루 최소값이 더 작으므로 갱신되지 않는다.

11. 패스스루 2: 패스스루 최소값의 요소를 두 번째 위치로 정렬한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793282-277dc152-91d4-47a8-bdcb-3f5280593040.png" width="600px" />
</p>

최소값 3이 우연히도 올바른 자리에 위치하고 있어서 자리 교환이 일어나지 않는다. 두 번째 요소까지 정렬되었으므로, 마찬가지로 다음 패스스루부터 제외된다.

12. 패스스루 3: 세 번째 요소를 탐색한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793296-8e9c6a9b-8aff-4634-86cc-684338c990dc.png" width="600px" />
</p>

* 최소값: -
* 탐색값: 9

해당 요소를 최소값으로 지정한다.

13. 패스스루 3: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793310-19358a00-e527-405d-8033-1eef2c11060b.png" width="600px" />
</p>

* 최소값: 9
* 탐색값: 5

패스스루 최소값을 5로 갱신한다.

14. 패스스루 3: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793315-ca00a872-d867-40e5-95c3-c9de2b7c7851.png" width="600px" />
</p>

* 최소값: 5
* 탐색값: 6

패스스루 최소값이 더 작으므로 갱신되지 않는다.

15. 패스스루 3: 패스스루 최소값의 요소를 세 번째 위치로 정렬한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793330-af0a7836-5bfd-477c-b614-c8c2fc8f108f.png" width="600px" />
</p>

세 번째 요소 9와 최소값 5와의 자리를 서로 교환한다.

16. 패스스루 4: 네 번째 요소를 탐색한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793337-f90959c9-c798-46f5-b64a-68807621edad.png" width="600px" />
</p>

* 최소값: -
* 탐색값: 9

해당 요소를 최소값으로 지정한다.

17. 패스스루 4: 2번 과정을 반복한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793345-4f6a2819-4dac-4c81-b9c6-4ca7fd4c8749.png" width="600px" />
</p>

* 최소값: 9
* 탐색값: 6

패스스루 최소값을 6으로 갱신한다.

18. 패스스루 4: 패스스루 최소값의 요소를 네 번째 위치로 정렬한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793357-e0e62399-9d03-48a8-8f23-721e43022a65.png" width="600px" />
</p>

네 번째 요소 9와 최소값 6와의 자리를 서로 교환한다.

19. 패스스루 5: 마지막 요소를 탐색한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793365-b658adfc-df4b-4e56-b130-e78e81826d54.png" width="600px" />
</p>

* 최소값: -
* 탐색값: 9

패스스루 최소값을 9로 갱신한다.

마지막 요소이므로 그 자체로 정렬된 위치에 있으며, 패스스루가 종료된다.

이로써 선택 정렬을 통해 최종적으로 정렬된 배열의 형태는 아래와 같다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793370-a6ec0819-47c7-49c6-8f30-b953d9311336.png" width="600px" />
</p>

## 5-3. 선택 정렬 구현

선택 정렬의 과정을 토대로 이를 <span class="orange-400">JAVA</span>로 구현해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 선택 정렬 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/23/about-algorithm-chapter05/">빅 오를 사용하거나 사용하지 않는 코드 최적화</a>
 * @since 2021.07.23 Fri 01:12:20
 */
public class SelectionSort
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
		
		writer.write("중복 확인할 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		// 배열
		int[] array = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		int[] processes = selectionSort(array);
		
		writer.write(Arrays.toString(array));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 비교 작업량: ");
		writer.write(String.valueOf(processes[0]));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 스왑 작업량: ");
		writer.write(String.valueOf(processes[1]));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 총 작업량: ");
		writer.write(String.valueOf(processes[0] + processes[1]));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 선택 정렬 함수
	 *
	 * @param array : [int[]] 대상 배열
	 *
	 * @return [int[]] 작업 갯수 배열
	 */
	private static int[] selectionSort(int[] array)
	{
		int compareCount = 0;
		int swapCount = 0;
		
		for (int i = 0; i < array.length; i++)
		{
			// 패스스루의 최소값 인덱스
			int min = i;
			
			for (int j = i + 1; j < array.length; j++)
			{
				compareCount++;
				
				// 현재 요소의 값이 패스스루의 최소값보다 작을 경우
				if (array[j] < array[min])
				{
					min = j;
				}
			}
			
			// 최소 인덱스에 변화가 있었을 경우
			if (min != i)
			{
				int temp = array[min];
				
				array[min] = array[i];
				array[i] = temp;
				
				swapCount++;
			}
		}
		
		return new int[] { compareCount, swapCount };
	}
}
```

* 입력

``` tc
5 3 4 1 2
```

* 출력

``` tc
[1, 2, 3, 4, 5]
 - 비교 작업량: 10
 - 스왑 작업량: 4
 - 총 작업량: 14
```

사용자로부터 공백으로 구분된 숫자 배열을 입력받아 선택 정렬을 수행하고, 작업량을 구분에 따라 표시한다. 핵심 동작은 `selectionSort` 메소드에서 수행한다.

* 첫 번째 `for`: 패스스루
* 두 번째 `for`: 비교 작업
* `if`문: 스왑 작업

``` java
for (int i = 0; i < array.length; i++)
{
	// 패스스루의 최소값 인덱스
	int min = i;
	
	for (int j = i + 1; j < array.length; j++)
	{
		compareCount++;
		
		// 현재 요소의 값이 패스스루의 최소값보다 작을 경우
		if (array[j] < array[min])
		{
			min = j;
		}
	}
	
	// 최소 인덱스에 변화가 있었을 경우
	if (min != i)
	{
		int temp = array[min];
		
		array[min] = array[i];
		array[i] = temp;
		
		swapCount++;
	}
}
```

패스스루마다 첫 요소를 최소값 `min`에 할당한다. 이후 다음 요소부터 마지막 요소까지 순차적으로 `min`과 비교한다.

`min`보다 더 작은 요소가 탐색될 경우 이를 교체한다. 최종적으로 `min`에는 검색한 요소들 중 가장 최소값이 할당된다.

`if`문에서 `min`에 변화가 있었는지를 확인한다. 패스스루의 첫 요소의 인덱스가 아닐 경우, `min`이 변경된 것이므로 스왑을 진행한다.


## 5-4. 선택 정렬의 효율성

선택 정렬의 효율성을 따져보자. 위에서 언급했듯이, 선택 정렬은 <span class="blue-400">비교</span>, <span class="blue-400">교환</span> 작업으로 이루어진다. 비교는 항상 일어나고, 교환의 경우 조건부로 일어난다.

요소가 5개인 배열을 선택 정렬할 경우 발생하는 비교 작업량은 아래와 같다.

| 패스스루 | 작업량 |
| :------: | :----: |
|    1     |   4    |
|    2     |   3    |
|    3     |   2    |
|    4     |   1    |

$4 + 3 + 2 + 1 = 10$으로 총 10번의 비교 작업이 수행된다. 일반화하면 $(N - 1) + (N - 2) + \dots + 1$와 같이 정의할 수 있다.

교환의 경우, 비교와 달리 패스스루 당 최대 한 번만 발생하며, 이 또한 조건에 따라 아예 일어나지 않기도 한다.

가장 최악의 경우, 각 패스스루마다 교환이 발생하므로 요소가 5개 일 때, 최대 4번의 교환 작업을 예상할 수 있다.

예시로, $[ 5, 3, 4, 1, 2 ]$의 경우 모든 패스스루에서 스왑이 일어난다.

> **책에서는 역순일 때가 최악의 경우라는데요??**  
> 역순 배열일 경우 오히려 교환이 두 번 밖에 일어나지 않는다. 반만 정렬하면 나머지 뒤쪽은 알아서 정렬하기 때문.

버블 정렬과 선택 정렬을 비교하면 아래와 같다.

|  $N$  | 버블 정렬 | 선택 정렬 | 차이  |
| :---: | :-------: | :-------: | :---: |
|   5   |    20     |    14     |  30%  |
|  10   |    90     |    54     |  40%  |
|  20   |    380    |    199    | 52.4% |
|  40   |   1560    |    819    | 52.5% |
|  80   |   6320    |   3229    | 51.1% |
|  100  |   9900    |   5049    |  51%  |

버블 정렬 대비 선택 정렬의 속도가 50%로 수렴한다. 즉, 최악의 경우에도 선택 정렬이 두 배 가량 빠르다는 걸 알 수 있다.

## 5-5. 상수 무시하기

이전 문단에서의 디테일한 비교로 버블 정렬과 선택 정렬 간의 유의미한 차이가 있음을 확인했다. 선택 정렬을 빅 오 표기법으로 나타내면 $O(N^2 / 2)$가 된다.

|  $N$  | $N^2 / 2$ | 선택 정렬의 작업량 |
| :---: | :-------: | :----------------: |
|   5   |   12.5    |         14         |
|  10   |    50     |         54         |
|  20   |    200    |        199         |
|  40   |    800    |        819         |
|  80   |   3200    |        3229        |
|  100  |   5000    |        5049        |

위 표가 이를 뒷받침해준다. 하지만 실제 버블 정렬과 선택 정렬의 빅 오 표기법은 둘 다 동일하게 $O(N^2)$이다. 실제로 선택 정렬 또한 <span class="red-400">반복문이 두 번 중첩</span>되어있다. $O(N^2)$의 특징이 그대로 나타나있는 것이다. 이는 빅 오 표기법이 처음 소개된 3장부터 꾸준히 언급되었던 특징으로, <span class="teal-400">빅 오 표기법은 상수를 무시</span>한다.

분명히 상수도 유의미한 수인데, 명색이 **성능**을 측정한다는 기법이 왜 이렇게 느슨한 형태를 가지는 걸까?

## 5-6. 빅 오의 역할

빅 오 표기법은 왜 상수를 무시할까? 이는 빅 오 표기법이 가지는 관점 때문이라고 설명할 수 있다. $O(N)$과 $O(N^2)$, $O(100N)$과 $O(N^2)$의 작업량을 비교하면서 빅 오 표기법이 알고리즘을 어떤 관점으로 바라보는지 확인해보자.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126793374-db4248af-daf1-4e02-8622-c16d2a2c9f69.png" width="800px" />
</p>

$O(N^2)$의 경우, 어떠한 경우에든 $O(N)$보다 같거나 느리다. 하지만 $O(100N)$의 경우는 살짝 다르다. 데이터가 적은 앞 구간에선 오히려 $O(N^2)$이 더 빠르지만, 충분히 데이터가 많아진 이후로는 $O(100N)$이 더 빠르다.

빅 오 표기법이 상수에 크게 미련을 갖지 않는 이유다. $O(N)$, $O(N^2)$과 같이 구간이 완전히 다를 경우 항상 빠르거나, 반대로 느리다.

그러나 $O(100N)$, $O(N^2)$의 경우 데이터의 양에 따라 상대적으로 빠르기도 하고, 느리기도 하다. 이런 경우의 알고리즘을 서로 구분하기 위해 빅 오 표기법은 상수를 무시한다. 어차피 $O(N)$이나 $O(100N)$이나 장기적으론 $O(N^2)$보다는 빨라지기 때문이다.

빅 오 표기법은 여전히 구간이 전혀 다른 알고리즘을 상대로는 유효한 성능 판단의 척도다. 시간 복잡도가 동일하더라도, 실제로 보여주는 알고리즘의 성능은 차이가 있을 수 있다는 점을 감안하자.

## 5-7. 실제 예제

요소 $N$개를 가진 배열에서 두 요소 중 하나만 선택하여 $N \div 2$의 요소를 가지는 새로운 배열을 만드는 알고리즘을 설계해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 배열 선택 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/23/about-algorithm-chapter05/">빅 오를 사용하거나 사용하지 않는 코드 최적화</a>
 * @since 2021.07.23 Fri 22:32:54
 */
public class HalfArray
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
		
		writer.write("정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		// 배열
		int[] array = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		int[] result = solve(array);
		
		writer.write(Arrays.toString(result));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 알고리즘 결과 반환 함수
	 *
	 * @param array: [int[]] 대상 배열
	 *
	 * @return [int[]] 결과 배열
	 */
	private static int[] solve(int[] array)
	{
		int length = (int) Math.ceil(array.length / 2D);
		
		int[] result = new int[length];
		
		int count = 0;
		
		for (int i = 0; i < array.length; i++)
		{
			// 인덱스가 짝수일 경우
			if (i % 2 == 0)
			{
				result[count] = array[i];
				
				count++;
			}
		}
		
		return result;
	}
}
```

* 입력

``` tc
0 1 2 3 4 5 6 7 8 9
```

* 출력

``` tc
[0, 2, 4, 6, 8]
```

위 알고리즘은 배열의 모든 원소를 순회하며, 인덱스가 짝수일 경우 해당 값을 추출하여 새로운 배열로 만들어 반환한다.

해당 알고리즘은 <span class="orange-400">탐색</span>과 <span class="orange-400">삽입</span>으로 이루어져있다.

* 탐색: $N$개
* 삽입: $N / 2$개

즉, 위 알고리즘의 정확한 시간 복잡도는 $O(1.5N)$이며, 위에서 언급했듯이 상수를 무시하므로 $O(N)$으로 표기한다.

위 알고리즘을 조금 더 최적화해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 향상된 배열 선택 클래스
 *
 * @author RWB
 * @see <a href="https://rwb0104.github.io/posts/2021/07/23/about-algorithm-chapter05/">빅 오를 사용하거나 사용하지 않는 코드 최적화</a>
 * @since 2021.07.23 Fri 22:51:52
 */
public class ImproveHalfArray
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
		
		writer.write("요소의 갯수가 짝수개인 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		// 배열
		int[] array = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		int[] result = solve(array);
		
		writer.write(Arrays.toString(result));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 알고리즘 결과 반환 함수
	 *
	 * @param array: [int[]] 대상 배열
	 *
	 * @return [int[]] 결과 배열
	 */
	private static int[] solve(int[] array)
	{
		int length = (int) Math.ceil(array.length / 2D);
		
		int[] result = new int[length];
		
		int count = 0;
		
		for (int i = 0; i < array.length; i += 2)
		{
			result[count] = array[i];
			
			count++;
		}
		
		return result;
	}
}
```

* 입력

``` tc
0 1 2 3 4 5 6 7 8 9
```

* 출력

``` tc
[0, 2, 4, 6, 8]
```

위 알고리즘은 `solve` 메소드의 `for`부분을 향상시킨 알고리즘이다.

``` java
for (int i = 0; i < array.length; i += 2)
{
	result[count] = array[i];
	
	count++;
}
```

요소를 하나한 탐색하여 그 중 짝수인 인덱스를 판별하는 것이 아니라, 애초에 짝수 인덱스만을 탐색하여 삽입한다. 즉, 탐색의 작업이 50% 감소했다.

* 탐색: $N / 2$개
* 삽입: $N / 2$개

이 알고리즘은 정직하게 $O(N)$의 시간 복잡도를 가진다. 엄밀히 따지면 아래의 알고리즘이 더 우수한 성능을 가지지만, 시간 복잡도의 관점에서는 둘 다 동일하다.

같은 시간 복잡도를 가진다고 해도, 데이터의 양이 무수히 많을 경우 아래의 알고리즘이 더 적합할 것이다.

# 마무리

이 장에서 주로 얘기한 내용은 아래와 같다.

* 빅 오 표기법은 비관적인 관점을 가지므로 시간 복잡도의 상수를 무시한다.
* 시간 복잡도가 같아도, 실제 성능은 유의미하게 차이날 수 있다.

간혹 여러 사람을 만나다보면 인생을 항상 부정적인 관점으로 바라보는 사람이 더러 있다. 아마 빅 오 표기법이 의인화된다면 이런 사람이 되지 않을까 싶다.

부정적으로 보는 것이 좋을 때도 있겠지만, **언제나**라는 말이 통용되진 않는다. 세상엔 수 많은 관점이 존재하고, 이는 알고리즘도 예외는 아니다. 다행히, 현실에서 대부분의 일은 평범의 범주 안에서 일어난다.

다음 장에서는 부정적인 관점에서 벗어나, 평균적인 관점으로 바라보는 시간을 가져보자.