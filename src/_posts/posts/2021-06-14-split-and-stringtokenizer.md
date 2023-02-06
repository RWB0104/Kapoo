---
title: "[JAVA] split vs StringTokenizer"
excerpt: "알고리즘을 풀다보면, 필연적으로 입력값 처리를 하게된다. 다양한 케이스에 대응하기 위해, 사용자의 값을 직접 입력받아 이를 처리하게 된다. 이 때, 우리는 십중팔구 이와 같은 상황이 발생한다. 데이터셋을 보내기 위해 데이터의 모음을 구분자(공백 혹은 쉼표)를 통해 하나의 문자열로 합쳐 전달한다."
coverImage: "https://www.textrazor.com/img/letters3.png"
date: "2021-06-14T01:56:01"
type: "posts"
category: "JAVA"
tag: [ "JAVA(자바)", "String(문자열)", "split", "StringTokenizer" ]
comment: true
publish: true
---

# 개요

알고리즘을 풀다보면, 필연적으로 입력값 처리를 하게된다. 다양한 케이스에 대응하기 위해, 사용자의 값을 직접 입력받아 이를 처리하게 된다. 이 때, 우리는 십중팔구 이와 같은 상황이 발생한다. 데이터셋을 보내기 위해 데이터의 모음을 구분자(공백 혹은 쉼표)를 통해 하나의 문자열로 합쳐 전달한다.

$$
[ "A", "B", "C", "D" ] -> "A B C D"
$$

이를테면, 위와 같이 $[ "A", "B", "C", "D" ]$와 같은 배열을 전달하기 위해, 각 요소를 공백으로 구분하여 $"A B C D"$와 같이 전달하게 된다. 보통 내 경우 `split` 메소드를 활용하는데, 알고리즘 풀이를 찾아보다보니 `StringTokenizer`이라는 <span class="orange-400">class</span>를 쓰는 코드들이 더러있었다. 처음보는 <span class="orange-400">class</span>인데다, 접근성이 훨씬 뛰어난 `split`를 굳이 대체해서 쓰는 이유가 있을거라 판단. 직접 퍼포먼스를 비교해보기로 했다. 알고리즘은 수행속도 역시 중요한 지표로 작용하기 때문에, 조금이라도 시간을 줄일 필요가 있다. 안타깝게도 나는 코드 최적화 실력이 최악이라, 이런식으로 줄일 수 있는 자잘한 부분은 줄여야한다. 핵심 코드를 최적화할 생각은 안 하고 이런데서 시간을 단축하는게 꼭 다이어트한답시고 피자 먹으면서 제로콜라 마시는 느낌이긴 하나, `StringTokenizer`이 더 성능이 뛰어나다면 앞으로 푸는 알고리즘에 적용할 가치가 있을 것이다.

## 테스트 환경

| 구분  |                                                        내용                                                         |
| :---: | :-----------------------------------------------------------------------------------------------------------------: |
| 언어  | ![JAVA](https://shields.io/badge/java-JDK%2014-lightgray?logo=java&style=plastic&logoColor=white&labelColor=orange) |
|  OS   |                                                  Windows 10 64bit                                                   |
|  CPU  |                                                   Intel i7-10700K                                                   |
|  RAM  |                                                        32GB                                                         |

# split 메소드

`split` 메소드는 특정 <span class="lightBlue-400">구분자</span>로 문자열을 분리하는 전통적인 메소드다. 굳이 JAVA가 아니더라도 C(++, #), JavaScript, Python 등 여러 언어에 존재하는 키워드라 어떤 언어든 문자열을 구분할 때 제일 먼저 시도하는 방법이다.

JAVA의 `split`은 문자열 데이터 형식인 `String` <span class="orange-400">class</span>에 포함된 메소드다. 문자열 데이터라면 `split`를 호출하여 문자열을 구분할 수 있다. 반환값은 `String[]` 객체.

사용법은 아래와 같다.

``` java
import java.util.Arrays;

/**
 * 메인 클래스
 *
 * @author RWB
 * @since 2021.06.13 Sun 22:50:57
 */
public class Main
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 */
	public static void main(String[] args)
	{
		String text = "A B C D";
		
		String[] splited = text.split(" ");
		
		System.out.println(Arrays.toString(splited));
	}
}
```

출력은 아래와 같다.

``` tc
[A, B, C, D]
```

문자열 `A B C D`가 공백을 기준으로 `[A, B, C, D]`로 분리된걸 확인할 수 있다. 그 밖에 한 가지 특이한 점이 있는데, JAVA의 `split` 메소드는 <span class="red-A400">구분자에 정규식을 적용</span>할 수 있다. 이를 잘만 이용하면 복합적인 구분자를 사용할 수도 있다.

# StringTokenizer

이 포스팅을 쓰게 만든 직접적인 원인. `StringTokenizer` 역시 문자열을 구분하는데 특화된 <span class="orange-400">class</span>의 일종이다. `String[]`을 반환하는 `split`과 달리 그 자체로 하나의 개별적인 <span class="orange-400">class</span>라는 차이가 있다.

`StringTokenizer tokenizer = new StringTokenizer("문자열");`과 같은 형태로 초기화해서 사용한다. `StringTokenizer` 인스턴스를 사용하는데 알아두면 좋을법한 메소드는 아래와 같다.

|    메소드     | 반환값  |         내용          |
| :-----------: | :-----: | :-------------------: |
|  countToken   |   int   |      토큰의 갯수      |
|   nextToken   | String  |       다음 토큰       |
| hasMoreTokens | boolean | 다음 토큰의 존재 유무 |

`StringTokenizer tokenizer = new StringTokenizer("문자열", "구분자");`와 같이 생성자의 인수에 구분자를 추가하여 원하는 구분자로 구분하게 할 수도 있다. 별도로 지정하지 않는다면 구분자는 `\t\n\r\t`로, 줄바꿈, 공백, 탭을 구분한다. 여기서 주의할 점이 하나 있는데, 기본 구분자 `\t\n\r\t`는 <span class="red-A400">줄바꿈, 공백, 탭을 전부 포함</span>한다. 즉, `A B C D\nA B C D`와 같이 공백과 줄바꿈이 혼용되어 있을 경우, 공백과 줄바꿈을 전부 구분하여 `[A, B, C, D, A, B, C, D]`와 같이 출력된다. 생성자에 구분자를 강제로 지정해줄 경우, 이를 막을 수 있다. 직접 지정할 경우 공백이나 줄바꿈이 아니더라도 여러 문자열을 사용할 수 있다.

``` java
import java.util.Arrays;
import java.util.StringTokenizer;

/**
 * 메인 클래스
 *
 * @author RWB
 * @since 2021.06.13 Sun 23:48:14
 */
public class Test
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 */
	public static void main(String[] args)
	{
		String text = "A B C D";
		
		StringTokenizer tokenizer = new StringTokenizer(text);
		
		String[] splited = new String[tokenizer.countTokens()];
		
		for (int i = 0; i < splited.length; i++)
		{
			splited[i] = tokenizer.nextToken();
		}
		
		System.out.println(Arrays.toString(splited));
	}
}
```

출력은 동일하다.

``` tc
[A, B, C, D]
```

# 속도 비교

그렇다면 `split`과 `StringTokenizer`의 성능은 어떨까? 이를 비교하기 위해 간단한 테스트 프로그램을 만들었다.

1. 반복횟수 `t`가 할당된다.
2. 케이스마다 5 ~ 20자의 랜덤한 문자열을 생성한다. 각 문자 사이엔 공백이 포함된다.
3. 공백을 구분자로 문자열을 구분한다
   1. `split` 사용
   2. `StringTokenizer` 사용
4. 총 소요 시간 및 평균 소요 시간을 계산한다
5. 결과를 표시한다

소스는 아래와 같다.

``` java
import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.Random;
import java.util.StringTokenizer;

/**
 * 메인 클래스
 *
 * @author RWB
 * @since 2021.06.14 Mon 00:06:32
 */
public class Main
{
	/**
	 * 메인 함수
	 *
	 * @param args: [String[]] 매개변수
	 */
	public static void main(String[] args)
	{
		int t = 10000;
		
		long[] timer = { 0, 0 };
		
		int[] sum = { 0, 0 };
		
		for (int i = 0; i < t; i++)
		{
			int random = (int) ((Math.random() * (20 - 5)) + 5);
			
			String text = getTestString(random);
			
			// split 로직 ----------------------------------------
			long timeStart = System.nanoTime();
			
			String[] a1 = useSplit(text);
			
			long timeEnd = System.nanoTime() - timeStart;
			
			sum[0] += a1.length;
			
			timer[0] += timeEnd;
			
			System.out.println(Arrays.toString(a1) + ": " + addComma(timeEnd) + "ns");
			// split 로직 ----------------------------------------
			
			// StringTokenizer 로직 ----------------------------------------
			timeStart = System.nanoTime();
			
			String[] a2 = useStringTokenizer(text);
			
			timeEnd = System.nanoTime() - timeStart;
			
			sum[1] += a2.length;
			
			timer[1] += timeEnd;
			
			System.out.println(Arrays.toString(a2) + ": " + addComma(timeEnd) + "ns");
			// StringTokenizer 로직 ----------------------------------------
		}
		
		System.out.println(addComma(t) + "개 데이터 그룹 수행");
		
		System.out.println();
		
		System.out.println("split 결과");
		System.out.println(" * 총 소요: " + addComma(timer[0]) + "ns");
		System.out.println(" * 평균 소요: " + addComma((timer[0] / t)) + "ns");
		System.out.println(" * 분해한 요소: " + addComma(sum[0]) + "개");
		
		System.out.println();
		
		System.out.println("StringTokenizer 결과");
		System.out.println(" * 총 소요: " + addComma(timer[1]) + "ns");
		System.out.println(" * 평균 소요: " + addComma((timer[1] / t)) + "ns");
		System.out.println(" * 분해한 요소: " + addComma(sum[1]) + "개");
		
		System.out.println();
		
		System.out.println("split " + (timer[0] == timer[1] ? "==" : (timer[0] > timer[1]) ? "<" : ">") + " StringTokenizer");
	}
	
	/**
	 * 구분된 문자열 반환 함수 (split)
	 *
	 * @param text: [String] 대상 문자열
	 *
	 * @return [String[]] 구분된 문자열
	 */
	private static String[] useSplit(String text)
	{
		return text.split(" ");
	}
	
	/**
	 * 구분된 문자열 반환 함수 (StringTokenizer)
	 *
	 * @param text: [String] 대상 문자열
	 *
	 * @return [String[]] 구분된 문자열
	 */
	private static String[] useStringTokenizer(String text)
	{
		StringTokenizer tokenizer = new StringTokenizer(text, " ");
		
		int count = tokenizer.countTokens();
		
		String[] result = new String[count];
		
		for (int i = 0; i < count; i++)
		{
			result[i] = tokenizer.nextToken();
		}
		
		return result;
	}
	
	/**
	 * 무작위 문자열 반환 함수
	 *
	 * @param n: [int] 문자 갯수
	 *
	 * @return [String] 무작위 문자
	 */
	private static String getTestString(int n)
	{
		Random random = new Random();
		
		StringBuilder builder = new StringBuilder();
		
		for (int i = 0; i < n; i++)
		{
			builder.append((char) ((random.nextInt(26)) + 97)).append(" ");
		}
		
		return builder.toString().trim();
	}
	
	/**
	 * 1000 단위 구분 숫자 반환 함수
	 *
	 * @param num: [long] 대상 숫자
	 *
	 * @return [String] 1000 단위 구분 숫자
	 */
	private static String addComma(long num)
	{
		DecimalFormat format = new DecimalFormat(",###");
		
		return format.format(num);
	}
}
```

횟수별로 10번씩 돌린 결과를 아래의 표로 정리했다.

* $t = 1$

| 테스트 횟수 | split 총 소요 | StringTokenizer 총 소요 |          속도           |
| :---------: | :-----------: | :---------------------: | :---------------------: |
|      1      |    80.3us     |         44.8us          | split < StringTokenizer |
|      2      |    83.7us     |         46.2us          | split < StringTokenizer |
|      3      |    136.6us    |         31.8us          | split < StringTokenizer |
|      4      |    111.3us    |         40.4us          | split < StringTokenizer |
|      5      |    93.4us     |         32.2us          | split < StringTokenizer |
|      6      |    104.5us    |         28.7us          | split < StringTokenizer |
|      7      |    40.1us     |         42.7us          | split > StringTokenizer |
|      8      |    40.1us     |         42.7us          | split > StringTokenizer |
|      9      |    104.7us    |         28.3us          | split < StringTokenizer |
|     10      |    38.3us     |         29.2us          | split < StringTokenizer |

한 번만 반복할 경우, 8:2로 `StringTokenizer`이 압승한다.

* $t = 100$

| 테스트 횟수 | split 총 소요 | StringTokenizer 총 소요 |          속도           |
| :---------: | :-----------: | :---------------------: | :---------------------: |
|      1      |    1.12ms     |         0.602ms         | split < StringTokenizer |
|      2      |    1.11ms     |         0.612ms         | split < StringTokenizer |
|      3      |    1.06ms     |         0.562ms         | split < StringTokenizer |
|      4      |    1.02ms     |         0.595ms         | split < StringTokenizer |
|      5      |     1.ms      |         0.550ms         | split < StringTokenizer |
|      6      |    1.16ms     |         0.651ms         | split < StringTokenizer |
|      7      |     98ms      |         0.558ms         | split < StringTokenizer |
|      8      |    1.11ms     |         0.627ms         | split < StringTokenizer |
|      9      |    0.981ms    |         0.555ms         | split < StringTokenizer |
|     10      |    1.23ms     |         0.666ms         | split < StringTokenizer |

100번을 반복할 때 역시 10:0으로 `StringTokenizer`이 압승한다.

* $t = 1,000$

| 테스트 횟수 | split 총 소요 | StringTokenizer 총 소요 |          속도           |
| :---------: | :-----------: | :---------------------: | :---------------------: |
|      1      |    3.00ms     |         3.17ms          | split > StringTokenizer |
|      2      |    2.53ms     |         2.71ms          | split > StringTokenizer |
|      3      |    2.79ms     |         2.84ms          | split > StringTokenizer |
|      4      |    2.53ms     |         2.67ms          | split > StringTokenizer |
|      5      |    2.67ms     |         2.97ms          | split > StringTokenizer |
|      6      |    2.58ms     |         2.87ms          | split > StringTokenizer |
|      7      |    2.48ms     |         2.65ms          | split > StringTokenizer |
|      8      |    2.69ms     |         3.01ms          | split > StringTokenizer |
|      9      |    2.50ms     |         2.90ms          | split > StringTokenizer |
|     10      |    2.62ms     |         2.94ms          | split > StringTokenizer |

$2^1$, $2^3$처럼 끊어가다가 뜬금없이 1000을 넣은 이유는, 이상하게 $t = 1,000$일 땐 `split`이 압승한다.

* $t = 10,000$

| 테스트 횟수 | split 총 소요 | StringTokenizer 총 소요 |          속도           |
| :---------: | :-----------: | :---------------------: | :---------------------: |
|      1      |    9.91ms     |         9.27ms          | split < StringTokenizer |
|      2      |    9.49ms     |         9.19ms          | split < StringTokenizer |
|      3      |    9.02ms     |         8.61ms          | split < StringTokenizer |
|      4      |    9.95ms     |         9.25ms          | split < StringTokenizer |
|      5      |    9.03ms     |         8.87ms          | split < StringTokenizer |
|      6      |    8.83ms     |         9.08ms          | split > StringTokenizer |
|      7      |    9.14ms     |         8.68ms          | split < StringTokenizer |
|      8      |    9.28ms     |         9.07ms          | split < StringTokenizer |
|      9      |    9.49ms     |         9.66ms          | split > StringTokenizer |
|     10      |    11.79ms    |         11.20ms         | split < StringTokenizer |

다시 8:2로 `StringTokenizer`이 압승한다.

* $t = 1,000,000$

| 테스트 횟수 | split 총 소요 | StringTokenizer 총 소요 |          속도           |
| :---------: | :-----------: | :---------------------: | :---------------------: |
|      1      |   306.86ms    |        373.06ms         | split > StringTokenizer |
|      2      |   287.26ms    |        262.05ms         | split < StringTokenizer |
|      3      |   289.92ms    |        255.51ms         | split < StringTokenizer |
|      4      |   272.43ms    |        267.96ms         | split < StringTokenizer |
|      5      |   278.35ms    |        322.28ms         | split > StringTokenizer |
|      6      |   285.23ms    |        264.57ms         | split < StringTokenizer |
|      7      |   273.37ms    |        268.18ms         | split < StringTokenizer |
|      8      |   278.65ms    |        264.34ms         | split < StringTokenizer |
|      9      |   278.56ms    |        266.62ms         | split < StringTokenizer |
|     10      |   306.00ms    |        256.56ms         | split < StringTokenizer |

8:2로 `StringTokenizer`이 압승한다.

$t = 1,000$이라는 특수한 상황을 제외하고는 보편적으로 `StringTokenizer`가 성능이 더 우수하다. 저런 현상이 왜 발생하는지 이해는 잘 안 된다. 물론 통계라는게 숫자가 클 수록 의미가 커지므로 10번이라는 작은 횟수만으로 단정짓긴 어렵다.

회사 컴퓨터(AMD Ryzen 2700X)에서는 모든 케이스에서 `StringTokenizer`의 속도가 빨랐다. CPU에 따라 연산 결과나 방식에 조금씩 차이가 있을 순 있겠다.

[JAVA API](https://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html)에 의하면, `StringTokenizer`은 하위 호환성을 보장하기 위한 레거시 클래스라고 한다. JAVA API는 가급적 `StringTokenizer`보다 `split` 내지는 `regex` <span class="orange-400">패키지</span>를 활용하도록 권고하고 있다.

> **원문**  
> `StringTokenizer` is a legacy class that is retained for compatibility reasons although its use is discouraged in new code. It is recommended that anyone seeking this functionality use the `split` method of String or the `java.util.regex` package instead.

# 결론

표의 수치 상 `StringTokenizer`가 `split`에 비해 최대 약 20% 정도 더 빠르다. 하지만 JAVA API에서 가급적 다른 대체제를 사용하도록 권고하고 있고, 백만번의 연산에도 $ms$ 단위에서 움직인다. 상대적으론 차이가 있어도 객관적인 지표로 봤을땐 별다른 차이가 없는 셈. 문자열 분리하자고 새로운 <span class="orange-400">class</span>를 다룰 바에 그냥 문자열 자체를 다루는 `split`을 사용하는 게 더 효율적이라 생각한다.