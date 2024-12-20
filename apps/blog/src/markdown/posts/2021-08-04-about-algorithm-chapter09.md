---
title: "재귀를 사용한 재귀적 반복"
excerpt: "컴퓨터 언어에서의 재귀란 자기 자신을 호출함을 의미한다. 알고리즘에서의 재귀는 매우 중요한 개념 중 하나로써, 그 특성 상 복잡한 연산 및 연산에 걸리는 소요 시간을 효과적으로 개선할 수 있다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: 1628004386000
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "재귀" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 9장 재귀를 사용한 재귀적 반복

컴퓨터 언어에서의 <span class="blue-400">재귀</span>란 자기 자신을 호출함을 의미한다. 알고리즘에서의 재귀는 매우 중요한 개념 중 하나로써, 그 특성 상 복잡한 연산 및 연산에 걸리는 소요 시간을 효과적으로 개선할 수 있다.

``` javascript
/**
 * 재귀 함수
 */
function recursive()
{
	console.log('recursive');

	recursive();
}
```

``` output
recursive
recursive
recursive
recursive
recursive
recursive
...
```

위 소스는 재귀의 특성을 간단하게 구현한 예제다. 위 함수를 호출하면 <span class="teal-400">"recursive"</span>라는 단어가 끝없이 출력된다.

`recursive` 함수 내에서 자기 자신을 끝없이 호출하기 때문에 이러한 현상이 일어난다. 겉보기엔 쓸데없는 장난처럼 보이기도 하지만, 재귀의 특징을 잘 활용하면 매우 강력한 도구가 된다.

## 9-1. 루프 대신 재귀

지금껏 코드에서 어떤 동작을 반복하기 위해 우리는 루프를 사용한다. `for`, `while` 등과 같은 반복문을 통해 원하는 만큼 동작을 반복한다.

10부터 0까지 카운트다운을 하는 소스를 설계해보면 아래와 같다.

``` javascript
/**
 * 루프를 활용한 카운트다운 함수
 * 
 * @param {number} start: 시작 숫자
 */
function countdown(start)
{
	for (let i = start; i >= 0; i--)
	{
		console.log(i);
	}
}
```

``` input
10
```

``` output
10
9
8
7
6
5
4
3
2
1
0
```

위 소스는 javascript로 루프를 사용해 작성한 카운트다운 소스다. 하지만, 루프 대신 재귀를 사용하면 아래처럼 구성할 수도 있다.

``` javascript
/**
 * 재귀를 활용한 카운트다운 함수
 * 
 * @param {number} start: 시작 숫자
 */
function countdown(start)
{
	console.log(start);

	countdown(start - 1);
}
```

``` input
10
```

``` output
10
9
8
7
6
5
4
3
2
1
0
-1
-2
...
```

반대로 위 소스는 루프 대신 재귀를 활용하여 카운트다운을 수행한다. `start`를 출력하고 1을 뺀 값을 다시 자기 자신인 `countdown`에 전달한다.

대부분의 루프는 재귀로 대체할 수 있다. 단순히 대체되는 것 이상으로 재귀는 루프와 달리 유의미한 성능 향상도 기대할 수 있다.

그 이전에, 위 소스의 출력을 살펴보자. 통상 카운트다운은 정해진 숫자부터 1 혹은 0까지를 센다. 그런데 위 소스, 0을 넘어서 -1, -2... 한 없이 내려간다. 왜 이러는 걸까?

## 9-2. 기저 조건

이전 문단에서 기술한 재귀 함수는 카운트다운이라고 볼 수 없다. 그냥 입력한 숫자부터 끊임없이 숫자를 나열하는 것이나 다름없다. 이런 현상이 발생하는 이유는, 이 재귀 함수에 일종의 브레이크라고 할만한 것이 없기 때문이다.

우리가 원하는 것은 0까지의 카운트다운이므로, `start`의 값이 0일 경우 더 이상 자기 자신을 호출하지 않도록 바꿔줄 필요가 있다.

``` javascript
/**
 * 재귀를 활용한 완전한 카운트다운 함수
 * 
 * @param {number} start: 시작 숫자
 */
function countdown(start)
{
	console.log(start);

	// 값이 0보다 클 경우
	if (start > 0)
	{
		countdown(start - 1);
	}
}
```

``` input
10
```

``` output
10
9
8
7
6
5
4
3
2
1
0
...
```

위 소스는 이러한 문제를 개선한 소스다. `start`가 0보다 클 경우에만 자기 자신을 다시 호출한다. 0보다 작거나 같을 경우, 재귀가 더 이상 일어나지 않아 동작이 종료된다. 동작에 브레이크가 걸리는 것이다.

우리가 `for`나 `while`에 특정 조건을 삽입해서 원하는 만큼만 반복문을 수행하는 것처럼 재귀도 이러한 조건을 달아서 원하는 만큼만 반복하게끔 구성해야한다.

물론 위의 두 반복문은 조건을 어디에 어떤 식으로 입력해야하는지 명확하게 기술되어있다면, 재귀는 코드 내에서 조건을 구성하므로 그 방식이 명확하지 않다. 때문에 재귀를 처음 접하거나, 경험이 없을 경우 이런 방식의 조건 설정이 익숙하지 않아 무한히 동작하는 재귀 함수를 만들기도 한다.

이렇게 재귀를 멈추는 조건을 <span class="blue-400">기저 조건</span>이라 한다. 앞서 설명한 예제 `countdown`의 기저 조건은 `start > 0`이라 할 수 있다.

## 9-3. 재귀 코드 읽기

앞서 말했듯이, 재귀는 그 조건이 명확하게 보이지 않다. 때문에 경우에 따라선 재귀 코드를 읽는 것초자 어렵기도 하다. 간단한 예제를 통해서 재귀 코드를 읽어보자.

고등학교 수학에서 배운 내용 중 팩토리얼(Factorial) 연산이 있다. 팩토리얼은 $5!$과 같이 표기하며, 연산 결과는 $5 \times 4 \times 3 \times 2 \times 1 = 120$이 된다. 즉, 일반식으로 표기하면 아래와 같다.

$$
n! = n \times (n - 1) \times (n - 2) \times \dotsb \times 2 \times 1
$$

팩토리얼 연산을 단축하면 $n! = n \times (n - 1)!$와 같이 표기할 수 있다. 이러한 패턴은 재귀를 적용시키기 매우 용이한 패턴이다.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 * 누구나 자료 구조와 알고리즘 팩토리얼 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/31/about-algorithm-chapter09/">재귀를 사용한 재귀적 반복</a>
 * @since 2021.08.02 Mon 22:57:53
 */
public class Factorial
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
		
		int index = Integer.parseInt(reader.readLine());
		
		writer.write(String.valueOf(factorial(index)));
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 팩토리열 연산 결과 반환 함수
	 *
	 * @param index: [int] 인덱스
	 *
	 * @return [int] 팩토리얼 연산 결과
	 */
	private static int factorial(int index)
	{
		// 인덱스가 1일 경우
		if (index == 1)
		{
			return 1;
		}
		
		// 인덱스가 1이 아닐 경우
		else
		{
			return index * factorial(index - 1);
		}
	}
}
```

``` input
10
```

``` output
3628800
```

책에서 설명하는 재귀 코드를 읽는 방법은 아래와 같다.

1. 기저 조건이 무엇인지 찾는다.
2. 기저 조건을 다룬다는 가정하에 함수를 살펴본다.
3. 기저 조건 바로 **전** 조건을 다룬다는 가정하에 함수를 살펴본다.
4. 한 번에 한 조건씩 올라가면서 계속 분석한다.

``` java
// 인덱스가 1일 경우
if (index == 1)
{
	return 1;
}

// 인덱스가 1이 아닐 경우
else
{
	return index * factorial(index - 1);
}
```

위 소스의 구조는 매우 간단하므로, 어렵지 않게 분기를 찾을 수 있다. `index == 1`인 경우와 아닌 경우가 분기다.

``` java
// 인덱스가 1이 아닐 경우
else
{
	return index * factorial(index - 1);
}
```

재귀는 자기 자신을 호출하는 것이므로, 분기의 `else` 부분이 재귀가 일어나는 영역이라 추측할 수 있다. 따라서 재귀가 일어나지 않는 영역이 <span class="teal-400">기저 조건</span>이라 할 수 있다.

``` java
// 인덱스가 1일 경우
if (index == 1)
{
	return 1;
}
```

즉, 위 재귀 함수의 기저 조건은 `index == 1`이다. `factorial(1)`은 1을 반환한다. 이 기저 조건을 토대로 `factorial(4)`의 동작을 전개하면 아래와 같다.

1. $\text{factorial(4)} = 4 \times \text{factorial(3)}$
2. $\text{factorial(4)} = 4 \times 3 \times \text{factorial(2)}$
3. $\text{factorial(4)} = 4 \times 3 \times 2 \times \text{factorial(1)}$
4. $\text{factorial(4)} = 4 \times 3 \times 2 \times 1 = 12$

이와 같이 순차적으로 자기 자신을 호출하여 연산을 수행한다. 재귀 함수의 <span class="green-400">기저 조건은 재귀를 멈추는 요인</span>이므로, 기저 조건을 바탕으로 전개하면 비교적 쉽게 연산을 이해할 수 있다.

## 9-4. 컴퓨터의 눈으로 바라본 재귀

우리가 재귀함수를 이해하는 것도 중요하지만, 결국 코드의 실행 주체는 어찌됐든 컴퓨터가 담당하게 된다. 즉, 우리가 이를 이해하는 것 만큼 컴퓨터가 이를 어떻게 이해하는지 아는 것 또한 매우 중요하다.

이전 장에서, 우리는 <span class="amber-400">스택</span>에 대해 다뤘었다. 컴퓨터가 재귀를 다룰 때 스택을 활용하여 관리한다. `factorial(4)`를 컴퓨터가 스택으로 어떻게 관리하는 지 알아보자.

1. `factorial(4)`를 호출한다.

<img src="https://user-images.githubusercontent.com/50317129/128024009-1ee1fc5d-ecce-4711-b729-36a70b8592d1.png" width="200px" />

`factorial(4)` 내부에서 `factorial(3)`을 호출하므로, `factorial(4)`를 스택에 삽입하고 `factorial(3)`을 수행한다. 이 때 `factorial(4)`는 종료된 것이 아니라, 재귀 호출로 인해 연산이 중단된 상태다.

<br />
<br />

2. `factorial(3)`을 호출한다.

<img src="https://user-images.githubusercontent.com/50317129/128024019-b76d21a2-24f6-47f6-bf2f-f46350da31e1.png" width="200px" />

마찬가지로 재귀로 인해 연산 과정에서 `factorial(2)`를 호출하므로, 마찬가지로 연산을 중단하고 스택에 삽입한다.

<br />
<br />

3. `factorial(2)`를 호출한다.

<img src="https://user-images.githubusercontent.com/50317129/128024025-f96e2b60-943b-4abc-8200-043ffbb63821.png" width="200px" />

위와 동일하다.

<br />
<br />

4. `factorial(1)`를 호출한다.

`factorial(1)`는 기저 조건이므로 재귀가 호출되지 않는다. 1을 반환하고 연산을 종료한다. 하지만 스택에 데이터가 남아있으므로, 전체 연산이 종료되지 않았음을 알 수 있다.

<br />
<br />

5. `factorial(2)`를 종료한다.

<img src="https://user-images.githubusercontent.com/50317129/128024038-575615fd-5018-4c32-b205-a0fe3b0a34f2.png" width="200px" />

`factorial(2)`의 연산 결과는 `factorial(1)`의 결과와 연관된다. `factorial(1)` 결과가 계산되었으므로, `factorial(2)`를 종료할 수 있다. 연산을 종료하고 스택에서 제거한다.

<br />
<br />

6. `factorial(3)`을 종료한다.

<img src="https://user-images.githubusercontent.com/50317129/128024048-93fcb67e-c73e-4423-ab3f-415f2fa817d4.png" width="200px" />

`factorial(3)`의 연산을 종료하고 스택에서 제거한다.

<br />
<br />

7. `factorial(4)`을 종료한다.

<img src="https://user-images.githubusercontent.com/50317129/128024224-c83b0f90-388c-4264-8543-194c56cea310.png" width="200px" />

`factorial(4)`의 연산을 종료하고 스택에서 제거한다. 스택에 데이터가 남아있지 않으므로 모든 연산이 종료된다.

<br />
<br />

위와 같이 재귀는 스택을 활용하여 연산한다. 만약 기저 조건의 설정을 잘 못 해서 재귀 연산이 끝없이 일어날 수도 있다. 이 경우 스택 역시 끝없이 쌓이게 되서 메모리가 더 이상 감당할 수 없을 때 스택 오버플로우가 발생한다.

## 9-5. 재귀 다뤄보기

지금까지 다룬 팩토리얼 연산의 경우 사실 루프를 사용해도 그리 어렵지 않게 풀 수 있으며, 제시된 코드 역시 재귀를 사용했을 때 크게 이점이 있는 것도 아니였다.

이번엔 좀 더 재귀를 사용했을 때 이점이 있을 법한 주제로 코드를 설계해보자. 재귀는 구조 상 알고리즘 내에서 자기 자신을 호출하는 알고리즘에 가장 적합하다. 즉, 재귀의 사용 여부는 루프의 보다 <span class="red-400">나 자신을 다시 호출해야 하는지 여부</span>에 따라 갈린다.

코드로 파일 리스트를 불러온 적이 있다면 익숙할 것이다. 우리가 생각하는 것처럼 특정 폴더 내의 파일 리스트 전체를 불러오는 것은 생각보다 까다롭다. 단순히 폴더 바로 밑의 파일 리스트만을 가져온다면 쉽겠지만, 그 하위, 하위의 하위 파일까지 가져오려면 그리 간단하지 않기 때문이다.

현재 폴더 및 하위 폴더의 모든 폴더 리스트를 출력하는 코드를 작성해보자. 우선은 가장 간단하게, 하위 폴더는 신경쓰지 말고 현재 폴더에 존재하는 폴더 리스트만을 가져와보자.

폴더 루트 경로는 `D:\root`와 같으며, 구조는 아래와 같다.

![null](https://user-images.githubusercontent.com/50317129/128032026-9ad5c07e-c274-45b2-8865-0164ddd8f618.png)

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.Objects;

/**
 * 누구나 자료 구조와 알고리즘 폴더 리스트 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/08/04/about-algorithm-chapter09/">재귀를 사용한 재귀적 반복</a>
 * @since 2021.08.03 Tue 22:55:59
 */
public class DirectoryList
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
		
		writer.write("폴더 리스트를 출력할 경로를 입력하세요 >> ");
		writer.flush();
		
		String path = reader.readLine();
		
		String[] list = getList(path);
		
		writer.write(Arrays.toString(list));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 폴더 리스트 반환 함수
	 *
	 * @param path: [String] 경로
	 *
	 * @return [String[]] 폴더 리스트
	 */
	private static String[] getList(String path)
	{
		return Arrays.stream(Objects.requireNonNull(new File(path).listFiles(File::isDirectory))).map(File::getName).toArray(String[]::new);
	}
}
```

``` input
D:\root
```

``` output
[a, b, c]
```

현재 폴더의 직전 하위 폴더 리스트만을 출력한다. 한단계 하위 폴더 리스트를 출력하기 위해 코드를 개선해보자.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;

/**
 * 누구나 자료 구조와 알고리즘 폴더 리스트 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/08/04/about-algorithm-chapter09/">재귀를 사용한 재귀적 반복</a>
 * @since 2021.08.03 Tue 23:32:46
 */
public class MoreDirectoryList
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
		
		writer.write("폴더 리스트를 출력할 경로를 입력하세요 >> ");
		writer.flush();
		
		String path = reader.readLine();
		
		ArrayList<String> list = getList(path);
		
		writer.write(String.valueOf(list));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 폴더 리스트 반환 함수
	 *
	 * @param path: [String] 경로
	 *
	 * @return [ArrayList<String>] 폴더 리스트
	 */
	private static ArrayList<String> getList(String path)
	{
		ArrayList<String> list = new ArrayList<>();
		
		File[] files = new File(path).listFiles(File::isDirectory);
		
		// 파일 배열이 유효할 경우
		if (files != null)
		{
			for (File file : files)
			{
				list.add(file.getName());
				
				File[] files1 = file.listFiles(File::isDirectory);
				
				// 파일 배열이 유효할 경우
				if (files1 != null)
				{
					for (File file1 : files1)
					{
						list.add(file1.getName());
					}
				}
			}
		}
		
		return list;
	}
}
```

``` input
D:\root
```

``` output
[a, a1, a2, b, b1, b2, c, c1, c2]
```

각 폴더의 하위 폴더의 리스트까지 출력해준다. 소스를 봐도 폴더일 경우 동일한 소스가 한 번 더 동작된다. 하지만 이는 매우 제한적이다. 폴더의 깊이가 정해져있다면 이런 식으로 계속 동일한 소스를 반복하면 되겠지만, 이러한 케이스는 거의 존재하지 않아 무의미하다.

이 경우 재귀를 사용하면 매우 손쉽게 모든 폴더의 하위 리스트를 출력할 수 있다.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;

/**
 * 누구나 자료 구조와 알고리즘 재귀 폴더 리스트 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/08/04/about-algorithm-chapter09/">재귀를 사용한 재귀적 반복</a>
 * @since 2021.08.03 Tue 23:36:43
 */
public class RecursiveDirectoryList
{
	private static final ArrayList<String> LIST = new ArrayList<>();
	
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
		
		writer.write("폴더 리스트를 출력할 경로를 입력하세요 >> ");
		writer.flush();
		
		String path = reader.readLine();
		
		getList(path);
		
		writer.write(String.valueOf(LIST));
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 폴더 리스트 산출 함수
	 *
	 * @param path: [String] 경로
	 */
	private static void getList(String path)
	{
		File[] files = new File(path).listFiles(File::isDirectory);
		
		// 파일 배열이 유효할 경우
		if (files != null)
		{
			for (File file : files)
			{
				LIST.add(file.getName());
				
				getList(file.getPath());
			}
		}
	}
}
```

``` input
D:\root
```

``` output
[a, a1, a2, b, b1, b11, b2, c, c1, c11, c12, c2]
```

재귀를 이용하여 하위 폴더의 전체 폴더명을 출력할 수 있다. 동일한 소스를 구태여 반복할 필요도 없고, 하위 깊이가 얼마나 되는지 알 필요 없이 폴더명 전체 리스트를 출력할 수 있다.

탐색 순서는 아래와 같다.

![null](https://user-images.githubusercontent.com/50317129/128036750-4094185e-3e77-4f24-94c7-dd8ccc9428ef.png)

# 마무리

이 장의 핵심 내용은 아래와 같다.

* 재귀는 자기 자신을 호출하는 구조다.
* 대부분의 루프는 재귀로 대체할 수 있다.
* 알고리즘 구조 상 자기 자신을 호출해야할 때 가장 적합하다.

백준 알고리즘을 풀었을 때도, 재귀를 사용해야하는 문제가 적지 않았을 정도로 재귀는 알고리즘에서 그 쓰임새가 매우 높다. 이번 장을 통해 재귀의 특성을 정리함으로써, 앞으로 알고리즘을 푸는데 많은 도움이 될 것 같다.