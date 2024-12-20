---
title: "긍정적인 시나리오 최적화"
excerpt: "지금까지는 항상 알고리즘을 비관적인 관점으로 바라봤다. 이 경우의 장점은 명확하다. 어떠한 경우에도 최악을 대비하면 문제가 없다. 하지만 모든 데이터가 항상 최악의 경우는 아닐 뿐더러, 대부분의 케이스는 평범한 영역에 위치할 것이다. 이 장에서는 모든 시나리오를 고려하여 상황에 따른 적절한 알고리즘을 판단한다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: 1627070080000
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "삽입 정렬" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 6장 긍정적인 시나리오 최적화

지금까지는 항상 알고리즘을 <span class="orange-400">비관적인 관점</span>으로 바라봤다. 이 경우의 장점은 명확하다. 어떠한 경우에도 최악을 대비하면 문제가 없다. 하지만 모든 데이터가 항상 최악의 경우는 아닐 뿐더러, 대부분의 케이스는 평범한 영역에 위치할 것이다.

이 장에서는 모든 시나리오를 고려하여 상황에 따른 적절한 알고리즘을 판단한다.

## 6-1. 삽입 정렬

이 장에서는 <span class="blue-400">삽입 정렬</span> 알고리즘을 토대로 전개한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834021-dcb0625e-80fb-4567-bd8d-982ae60a04c0.png" width="600px" />
</p>

정렬할 배열은 위와 같으며, 원리는 아래와 같다.

1. 요소의 두 번째 값을 임시 변수에 저장하고 배열에서 제거한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834029-9a32e551-f1ef-4751-b0b1-46942455e737.png" width="600px" />
</p>

삽입 정렬은 배열의 두 번째 인덱스를 기준으로 시작한다.

* 임시 변수: 3
* 비교값: -

첫 동작이므로, 임시 변수에 3을 할당한다.

2. 기준 인덱스 왼쪽의 요소를 비교하고, 조건에 따라 시프트를 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834036-d0c0cc1b-a968-4e79-a1b6-4957440c9a1b.png" width="600px" />
</p>

현재 기준 인덱스의 왼쪽에 위치한 요소들을 비교하고, 임시 변수의 값보다 클 경우 해당 값을 오른쪽으로 한 칸 시프트한다.

* 임시 변수: 3
* 비교값: 7

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834043-3cee3312-ff41-475d-93e3-482ac2849577.png" width="600px" />
</p>

임시 변수보다 비교값이 크므로, 해당 값을 오른쪽으로 한 칸 시프트한다.

이 비교는 임시 변수보다 작은 값을 만나거나, 배열의 처음으로 갈때 까지 반복한다.

3. 현재 공백에 임시 변수의 값을 삽입한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834049-06874e63-e166-4d43-a40f-bb9e59c0a4cf.png" width="600px" />
</p>

요소의 맨 처음에 도달했으므로 비교를 종료하고, 현재 공백에 임시 변수의 값 3을 삽입한다. 3은 아직 완전히 정렬된 것이 아니며, 다음 패스스루의 작업에 제외되지 않는다.

## 6-2. 삽입 정렬해보기

이전 문단의 원리를 토대로 삽입 정렬을 수행한다.

1. 패스스루 1: 요소의 두 번째 값을 임시 변수에 저장하고 배열에서 제거한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834029-9a32e551-f1ef-4751-b0b1-46942455e737.png" width="600px" />
</p>

삽입 정렬은 배열의 두 번째 인덱스를 기준으로 시작한다.

* 임시 변수: 3
* 비교값: -

첫 동작이므로, 임시 변수에 3을 할당한다.

2. 패스스루 1: 기준 인덱스 왼쪽의 요소를 비교하고, 조건에 따라 시프트를 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834036-d0c0cc1b-a968-4e79-a1b6-4957440c9a1b.png" width="600px" />
</p>

현재 기준 인덱스의 왼쪽에 위치한 요소들을 비교하고, 임시 변수의 값보다 클 경우 해당 값을 오른쪽으로 한 칸 시프트한다.

* 임시 변수: 3
* 비교값: 7

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834043-3cee3312-ff41-475d-93e3-482ac2849577.png" width="600px" />
</p>

임시 변수보다 비교값이 크므로, 해당 값을 오른쪽으로 한 칸 시프트한다.

이 비교는 임시 변수보다 작은 값을 만나거나, 배열의 처음으로 갈때 까지 반복한다.

1. 패스스루 1: 현재 공백에 임시 변수의 값을 삽입한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834049-06874e63-e166-4d43-a40f-bb9e59c0a4cf.png" width="600px" />
</p>

요소의 맨 처음에 도달했으므로 비교를 종료하고, 현재 공백에 임시 변수의 값 3을 삽입한다. 3은 아직 완전히 정렬된 것이 아니며, 다음 패스스루의 작업에 제외되지 않는다.

4. 패스스루 2: 기준 인덱스를 한 칸 오른쪽으로 이동하여 과정 1을 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834064-d8e10cd3-d825-47d4-9a29-ee3a95b9cb60.png" width="600px" />
</p>

* 임시 변수: 9
* 비교값: -

세 번째 요소의 값인 9를 임시 변수로 할당한다.

5. 패스스루 2: 기준 인덱스 왼쪽의 요소들을 비교하고, 조건에 따라 시프트를 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834073-83c7f417-d7ac-43ce-8421-0119ef5d4712.png" width="600px" />
</p>

* 임시 변수: 9
* 비교값: 7

임시 변수보다 비교값이 작을 경우, 비교를 종료하고 현재 공백에 임시 변수를 삽입한다. 이 케이스의 경우 바로 왼쪽에 위치한 요소가 7로 9보다 작으므로, 그 즉시 비교가 종료되며 삽입을 진행한다.

5. 패스스루 2: 현재 공백에 임시 변수의 값을 삽입한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834078-3e4fda60-79af-4f58-9915-aca42d5babfd.png" width="600px" />
</p>

공교롭게도, 원래의 위치에 임시 변수 9가 삽입된다.

6. 패스스루 3: 기준 인덱스를 한 칸 오른쪽으로 이동하여 과정 1을 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834085-ce09440c-11a9-418c-ac7e-07c307bb16b5.png" width="600px" />
</p>

* 임시 변수: 2
* 비교값: -

네 번째 요소의 값인 2를 임시 변수로 할당한다.

7. 패스스루 3: 기준 인덱스 왼쪽의 요소들을 비교하고, 조건에 따라 시프트를 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834098-f4dbef5a-0a59-4668-aa73-0e98b431895a.png" width="600px" />
</p>

* 임시 변수: 2
* 비교값: 9

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834107-74cc6e75-3a59-4fa3-8c66-56160cdb6913.png" width="600px" />
</p>

비교값 9가 임시 변수 2보다 크므로, 오른쪽으로 시프트한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834113-25e6eac5-d5eb-4380-918f-249eaf9de4d1.png" width="600px" />
</p>

* 임시 변수: 2
* 비교값: 7

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834120-2df440ae-cad4-4f7b-a3fd-708b2ec0b6d3.png" width="600px" />
</p>

비교값 7이 임시 변수 2보다 크므로, 오른쪽으로 시프트한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834129-5ee81114-faf3-43cd-ba96-4e3f46a705a8.png" width="600px" />
</p>

* 임시 변수: 2
* 비교값: 3

비교값 3이 임시 변수 2보다 크므로, 오른쪽으로 시프트한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834134-09db5b58-6c7a-49af-a1e9-b3125e85dd6b.png" width="600px" />
</p>

8. 패스스루 3: 현재 공백에 임시 변수의 값을 삽입한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834141-cc23a70b-f809-4783-affb-cefae7faa2cf.png" width="600px" />
</p>

가장 맨 첫 요소에 임시 변수 2가 삽입된다.

9. 패스스루 4: 기준 인덱스를 한 칸 오른쪽으로 이동하여 과정 1을 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834150-6cd89c4c-6f2a-4360-b4cc-677d073ccd85.png" width="600px" />
</p>

* 임시 변수: 5
* 비교값: -

다섯 번째 요소의 값인 5를 임시 변수로 할당한다.

10. 패스스루 4: 기준 인덱스 왼쪽의 요소들을 비교하고, 조건에 따라 시프트를 수행한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834157-416ea349-6684-496b-bb98-cbd456232e54.png" width="600px" />
</p>

* 임시 변수: 5
* 비교값: 9

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834166-f03e3731-66b8-4b66-95e8-51d176a92bee.png" width="600px" />
</p>

비교값 9가 임시 변수 5보다 크므로, 오른쪽으로 시프트한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/127515837-4e39a0aa-3acb-465d-aede-b6b888d7816a.png" width="600px" />
</p>

* 임시 변수: 5
* 비교값: 7

비교값 7이 임시 변수 5보다 크므로, 오른쪽으로 시프트한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/127515847-d1acdce7-805a-4f4a-9f5e-886955836dd7.png" width="600px" />
</p>

네 번째 요소에 임시 변수 5가 삽입된다.

11. 패스스루 4: 현재 공백에 임시 변수의 값을 삽입한다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/127515856-478930c0-b866-4b54-a0d7-13f49dfca11e.png" width="600px" />
</p>

세 번째 요소에 임시 변수 5가 삽입된다.

가장 마지막 요소까지 기준 인덱스가 이동했으므로, 해당 패스스루를 마지막으로 종료한다.

## 6-3. 삽입 정렬 구현

삽입 정렬의 과정을 토대로 이를 <span class="orange-400">JAVA</span>로 구현해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 삽입 정렬 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/24/about-algorithm-chapter06/">긍정적인 시나리오 최적화</a>
 * @since 2021.07.24 Sat 02:40:19
 */
public class InsertionSort
{
	private static int compareCount = 0;
	private static int shiftCount = 0;
	private static int deleteCount = 0;
	private static int insertCount = 0;
	
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
		
		selectionSort(array);
		
		writer.write(Arrays.toString(array));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 비교 작업량: ");
		writer.write(String.valueOf(compareCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 시프트 작업량: ");
		writer.write(String.valueOf(shiftCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 삭제 작업량: ");
		writer.write(String.valueOf(deleteCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 삽입 작업량: ");
		writer.write(String.valueOf(insertCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 총 작업량: ");
		writer.write(String.valueOf(compareCount + shiftCount + deleteCount + insertCount));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 삽입 정렬 알고리즘
	 *
	 * @param array: [int[]] 대상 배열
	 */
	private static void selectionSort(int[] array)
	{
		for (int i = 1; i < array.length; i++)
		{
			// 임시 변수
			int temp = array[i];
			
			// 빈 공간
			int blank = i;
			
			// 삭제 작업 추가
			deleteCount++;
			
			// 공백 표시
			array[i] = Integer.MIN_VALUE;
			
			for (int j = i - 1; j > -1; j--)
			{
				// 비교 작업 추가
				compareCount++;
				
				// 현재 요소가 임시 변수보다 클 경우
				if (array[j] > temp)
				{
					// 시프트 작업 추가
					shiftCount++;
					
					array[blank] = array[j];
					
					blank--;
					
					array[blank] = Integer.MIN_VALUE;
				}
				
				// 아닐 경우
				else
				{
					break;
				}
			}
			
			// 삽입 작업 추가
			insertCount++;
			
			array[blank] = temp;
		}
	}
}
```

* 입력

``` tc
10 9 8 7 6 5 4 3 2 1
```

* 출력

``` tc
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 - 비교 작업량: 45
 - 시프트 작업량: 45
 - 삭제 작업량: 9
 - 삽입 작업량: 9
 - 총 작업량: 108
```

소스와 입력, 출력값은 위와 같다. 사용자로부터 임의의 배열을 입력받아 삽입 정렬을 수행하고, 졍렬 결과와 각 작업량을 구분하여 표시한다.

실제 핵심 동작은 `selectionSort` 메소드에서 이루어진다. 공백은 `Integer.MIN_VALUE`를 삽입하여 표시하며, 삭제됨을 표현하기 위한 것으로 작업량에 포함되지 않는다.

``` java
for (int i = 1; i < array.length; i++)
{
	// 임시 변수
	int temp = array[i];
	
	// 빈 공간
	int blank = i;
	
	// 삭제 작업 추가
	deleteCount++;
	
	// 공백 표시
	array[i] = Integer.MIN_VALUE;
	
	// ...
}
```

첫 번째 `for`문은 각 패스스루를 의미한다. 각 패스스루마다 기준 인덱스 `i`, 임시 변수 `temp`, 삭제된 요소의 인덱스 `blank`가 새로 정의된다. 이 과정에서 삭제 연산이 고정으로 한 번 수행된다.

``` java
for (int j = i - 1; j > -1; j--)
{
	// 비교 작업 추가
	compareCount++;
	
	// 현재 요소가 임시 변수보다 클 경우
	if (array[j] > temp)
	{
		// 시프트 작업 추가
		shiftCount++;
		
		array[blank] = array[j];
		
		blank--;
		
		array[blank] = Integer.MIN_VALUE;
	}
	
	// 아닐 경우
	else
	{
		break;
	}
}
```

두 번째 `for`문은 각 기준 인덱스 `i`의 왼쪽 요소부터 0까지 비교 및 시프트 작업을 의미한다. 각 사이클마다 비교 작업 한 번이 반드시 발생하며, 임시 변수와 현재 요소 간의 크기에 따라 시프트 작업이 발생할 수 있다.

``` java
for (int i = 1; i < array.length; i++)
{
	// ...
	
	// 삽입 작업 추가
	insertCount++;
	
	array[blank] = temp;
}
```

모든 비교가 끝나면 현재 공백인 요소에 임시 변수를 삽입한다. 이 과정에서 삽입 작업 한 번이 반드시 발생한다.

## 6-4. 삽입 정렬의 효율성

삽입 정렬 시 발생하는 작업을 분석하여 그 효율성에 대해 알아보자. 삽입 정렬은 <span class="orange-400">삭제</span>, <span class="orange-400">비교</span>, <span class="orange-400">시프트</span>, <span class="orange-400">삽입</span>의 4개 작업으로 이루어져있다.

삽입 정렬에서 가장 최악의 케이스는 요소가 역순으로 정렬된 배열이다. 모든 요소가 역순으로 정렬될 경우, 발생할 수 있는 모든 작업이 발생한다. 최악의 경우에 발생하는 각 작업량을 일반식으로 정의하면 아래와 같다.

* 삭제: $N - 1$
* 비교: $N^2 \div 2$ (대략적인 값)
* 시프트: $N^2 \div 2$ (대략적인 값)
* 삽입: $N - 1$

이를 토대로 삽입 정렬의 시간 복잡도는 $O(N^2 + 2N - 2)$임을 알 수 있다. 빅 오 표기법은 <span class="blue-400">상수를 무시</span>하므로 $O(N^2 + N)$으로 간략하게 표기할 수 있다. 하지만 빅 오 표기법은 상수만 무시하는 게 아니다. <span class="blue-400">가장 높은 차수를 제외한 나머지 차수 또한 무시</span>한다. 그말인 즉슨, $N^2 + N$에서 가장 높은 차수는 $N^2$이므로, $N$은 무시한다. 따라서 최종적으로 삽입 정렬의 시간 복잡도는 $O(N^2)$이 된다.

|  $N$  |   $N^2$   |     $N^3$     |       $N^4$       |
| :---: | :-------: | :-----------: | :---------------: |
|   2   |     4     |       8       |        16         |
|   5   |    25     |      125      |        625        |
|  10   |    100    |     1,000     |      10,000       |
|  100  |  10,000   |   1,000,000   |    100,000,000    |
| 1,000 | 1,000,000 | 1,000,000,000 | 1,000,000,000,000 |

요소 $N$의 갯수가 100일 때, $N^4$와 $N^3$은 $N$의 값인 100배 차이가 난다. $N^4$ 입장에서는 $N^3$ 작업 한 사이클이 발생해도, 자신의 작업량의 1%밖에 되지 않는다. 차수가 높아질 수록 작업량의 차이가 기하급수적으로 벌어지기 때문에 무시하는 것이다.

지금까지 버블, 선택, 삽입 정렬 세 가지를 다뤄봤다. 각 알고리즘의 시간 복잡도를 정리하면 아래와 같다.

|       구분        | 버블 정렬 |    선택 정렬    |     삽입 정렬     |
| :---------------: | :-------: | :-------------: | :---------------: |
|   빅 오 표기법    | $O(N^2)$  |    $O(N^2)$     |     $O(N^2)$      |
| 실제 빅 오 표기법 | $O(N^2)$  | $O(N^2 \div 2)$ | $O(N^2 + 2N - 2)$ |

4장 부터 6장까지 오면서, 우리는 각 정렬의 빅 오 표기법과 실제 나타나는 빅 오 표기법에 대해 알고있다. 위 표를 토대로 본다면, 세 정렬 기법 중 선택 정렬이 가장 빠르다고 할 수 있을 것이다. 단, 누누히 말했듯이 최악의 경우에 가깝다는 전제가 수반된다.

그렇다면 평균적인 경우는 어떨까?

## 6-5. 평균적인 경우

데이터가 1억, 1조가 넘어간다면 모를까, 대부분의 일반적인 환경에선 그리 많은 데이터를 처리하지 않는다. 즉, 대부분의 경우 최악의 케이스에 도달하지 않는다는 뜻이기도 하다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834185-4dfa70f6-0a15-4069-a7a4-7f3ed43809f4.png" width="600px" />
</p>

대부분의 케이스는 위와 같은 정규 분포도를 따른다. 좌측으로 수렴할 수록 최악의 케이스, 우측으로 수렴할 수록 최선의 케이스, 정 가운데로 수렴할 수록 평균적인 케이스다. <span class="green-400">대다수는 평균적인 영역에 포함</span>되며, 양 옆의 극단적인 케이스는 상대적으로 양이 적다.

지금까지 다룬 정렬 알고리즘의 대부분은 역순으로 정렬될 경우가 최악의 케이스였다. 완전 무작위의 배열이 입력된다고 가정할 때, 정확히 역순으로 나열된 배열이 나올 확률이 얼마나 될지 생각해보자. 대부분의 배열은 어떠한 규칙도 없이 무작위로 나열됐을 것이다. 굳이 위 같은 정규 분포도가 아니더라도 일상 생활에서 비슷한 사례는 많이 있다. 여러 케이스 중 발생하는 특이 케이스는 다른 대다수의 케이스와는 어떠한 방향으로든 다르다는 뜻이다. 최선, 최악의 케이스는 어찌 보면 이러한 특이 케이스의 범주에 속한다.

우리가 이번 장에서 다룬 삽입 정렬을 토대로 확인해보자.

* 최악의 경우, $O(N^2 + 2N - 2)$. 즉, $O(N^2)$를 가진다.
* 최선의 경우, $O(3(N - 1))$. 즉, $O(N)$를 가진다.
* 일반적인 경우, $O(N^2 \div 2)$. 즉, $O(N^2)$를 가진다.

이를 표로 나타내면 아래와 같다.

<p align="center">
	<img src="https://user-images.githubusercontent.com/50317129/126834196-63471f0e-41df-4715-ac15-8c79fd606fae.png" width="600px" />
</p>

삽입 정렬은 케이스에 따라 유의미한 성능의 차이가 존재한다. 반대로 선택 정렬의 경우 꽤 난감한데, 선택 정렬은 어떠한 케이스에서든 $O(N^2)$의 시간 복잡도를 가진다.

``` java
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
```

위 소스는 5장에서 다룬 선택 정렬 소스다. 보시다시피 `for`문이 2개나 존재함으로 $O(N^2)$의 시간 복잡도를 가진다는 것을 어렵지 않게 유추할 수 있다. 더군다나 소스를 자세히 보자. 중간에 반복문을 종료할 수 있는 `break` 또한 존재하지 않는다. 좋든 싫든 항상 $N^2$의 작업을 수행한다는 뜻이다. 실제로 5장의 소스를 구동하면 케이스별로 작업량의 차이가 그리 크지 않다.

만약 사용할 데이터의 대부분이 어느정도 정렬되어있을 경우, 삽입 정렬이 훨씬 유리하다고 판단할 수 있다. 만약 데이터가 완전히 무작위라면 선택 정렬이나 삽입 정렬이나 크게 차이가 없다고 볼 수 있다.

## 6-6. 실제 예제

두 배열이 존재하며, 각 배열에 공통으로 존재하는 요소를 추출하여 반환하는 교집합 알고리즘을 설계해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 교집합 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/24/about-algorithm-chapter06/">긍정적인 시나리오 최적화</a>
 * @since 2021.07.24 Sat 04:21:40
 */
public class InsertionSort
{
	private static int compareCount = 0;
	private static int insertCount = 0;
	
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
		
		writer.write("첫 번째 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		int[] array1 = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		writer.write("두 번째 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		int[] array2 = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		int[] result = intersection(array1, array2);
		
		writer.write(Arrays.toString(result));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 비교 작업량: ");
		writer.write(String.valueOf(compareCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 삽입 작업량: ");
		writer.write(String.valueOf(insertCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 총 작업량: ");
		writer.write(String.valueOf(compareCount + insertCount));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 교집합 배열 반환 함수
	 *
	 * @param array1: [int[]] 첫 번째 배열
	 * @param array2: [int[]] 두 번째 배열
	 *
	 * @return [int[]] 교집합 배열
	 */
	private static int[] intersection(int[] array1, int[] array2)
	{
		ArrayList<Integer> list = new ArrayList<>();
		
		for (int item1 : array1)
		{
			for (int item2 : array2)
			{
				compareCount++;
				
				// 두 배열의 요소가 같을 경우
				if (item1 == item2)
				{
					insertCount++;
					
					list.add(item1);
				}
			}
		}
		
		return list.stream().mapToInt(Integer::intValue).toArray();
	}
}
```

* 입력

``` tc
3 1 9 8 5
2 4 7 5 1
```

* 출력

``` tc
[1, 5]
 - 비교 작업량: 25
 - 삽입 작업량: 2
 - 총 작업량: 27
```

이중 `for` 구조이므로 시간 복잡도는 당연히 $O(N^2)$일 것이다. 두 배열의 요소의 크기가 완전히 동일할 때, 나타날 수 있는 최악의 케이스는 $O(N^2 + N)$이다. 간략히 $O(N^2)$라고 할 수 있다.

위 알고리즘의 경우 불필요한 연산을 수행하기도 한다. 이를 최적화해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * 누구나 자료 구조와 알고리즘 향상된 교집합 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/24/about-algorithm-chapter06/">긍정적인 시나리오 최적화</a>
 * @since 2021.07.24 Sat 04:21:40
 */
public class ImproveIntersection
{
	private static int compareCount = 0;
	private static int insertCount = 0;
	
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
		
		writer.write("첫 번째 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		int[] array1 = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		writer.write("두 번째 정수 배열을 띄어쓰기로 구분하여 입력 >> ");
		writer.flush();
		
		int[] array2 = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
		
		int[] result = intersection(array1, array2);
		
		writer.write(Arrays.toString(result));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 비교 작업량: ");
		writer.write(String.valueOf(compareCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 삽입 작업량: ");
		writer.write(String.valueOf(insertCount));
		writer.newLine();
		writer.flush();
		
		writer.write(" - 총 작업량: ");
		writer.write(String.valueOf(compareCount + insertCount));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 교집합 배열 반환 함수
	 *
	 * @param array1: [int[]] 첫 번째 배열
	 * @param array2: [int[]] 두 번째 배열
	 *
	 * @return [int[]] 교집합 배열
	 */
	private static int[] intersection(int[] array1, int[] array2)
	{
		ArrayList<Integer> list = new ArrayList<>();
		
		for (int item1 : array1)
		{
			for (int item2 : array2)
			{
				compareCount++;
				
				// 두 배열의 요소가 같을 경우
				if (item1 == item2)
				{
					insertCount++;
					
					list.add(item1);
					
					break;
				}
			}
		}
		
		return list.stream().mapToInt(Integer::intValue).toArray();
	}
}
```


* 입력

``` tc
3 1 9 8 5
2 4 7 5 1
```

* 출력

``` tc
[1, 5]
 - 비교 작업량: 24
 - 삽입 작업량: 2
 - 총 작업량: 27
```

차이점은 `for`문 안의 `if` 구문에 있다.

``` java
// 두 배열의 요소가 같을 경우
if (item1 == item2)
{
	insertCount++;
	
	list.add(item1);
	
	break;
}
```

이처럼 동일한 요소가 탐색되었을 경우, `break`를 통해 패스스루 강제 종료 기능을 추가했다. 최악의 시나리오에선 $O(N^2)$로 동일하지만, 최선의 시나리오에선 $O(N)$으로 동작할 것이다. 이전의 알고리즘이 항상 $O(N^2)$임을 감안한다면 적절한 최적화라 할 수 있다.

# 마무리

이 장에서 주로 얘기한 내용은 아래와 같다.

* 알고리즘을 꼭 비관적으로만 바라보는 것은 아니다.
* 오히려 대부분의 케이스는 평균의 범주에 속한다.
* 알고리즘의 로직에 따라 케이스의 양에 따라시간 복잡도가 유의미하게 달라지기도 한다.

이 장에서는 알고리즘의 또 다른 관점에 대해 알아봤다. 대부분의 케이스가 평균의 범주에 속하므로, 평균 시간 복잡도 역시 성능을 측정함에 있어서 중요한 요소 중 하나일 것이다.

다음 장에서는 새로운 개념인 해시 테이블에 대해 알아본다.