---
title: "스택과 큐로 간결한 코드 생성"
excerpt: "이 장에서는 스택과 큐에 대해 알아본다. 사실 이 두 자료구조는 배열에 특정한 제약을 건 자료구조다. 제약이라는 개념 때문에 특수한 상황에서만 쓰이지 않을까 싶지만, 오히려 이러한 제약이 주는 규칙으로 인해 굉장히 많은 곳에서 쓰인다. 스택과 큐의 가장 큰 특징은 데이터 처리에 순서가 있다는 점이다. 스택과 큐는 그 제약에 따라 반드시 정해진 순서로 데이터를 처리한다. 이러한 특징 덕에 순서가 필요한 작업들에 유용하게 사용된다. 대표적으로 스케쥴러, 대기 등이 있으며 OS의 인터럽트(Interrupt) 작업에서 스택이 쓰인다."
coverImage: "https://user-images.githubusercontent.com/50317129/125144706-add9c080-e159-11eb-9522-063c655ddf36.png"
date: 1627700317000
type: "posts"
category: "알고리즘"
tag: [ "자료구조", "알고리즘", "누구나 자료 구조와 알고리즘", "큐", "스택" ]
group: "누구나 자료 구조와 알고리즘"
comment: true
publish: true
---

<p class="orange-A400" align="center">본 포스팅은 개인 스터디 모임 활동의 일환으로, "누구나 자료구조와 알고리즘" 도서를 정독한 뒤 해당 내용을 정리한 포스팅입니다.</p>

# 8장 스택과 큐로 간결한 코드 생성

이 장에서는 <span class="amber-400">스택</span>과 <span class="amber-400">큐</span>에 대해 알아본다. 사실 이 두 자료구조는 배열에 특정한 제약을 건 자료구조다. <span class="red-400">제약</span>이라는 개념 때문에 특수한 상황에서만 쓰이지 않을까 싶지만, 오히려 이러한 제약이 주는 규칙으로 인해 굉장히 많은 곳에서 쓰인다.

스택과 큐의 가장 큰 특징은 <span class="green-400">데이터 처리에 순서</span>가 있다는 점이다. 스택과 큐는 그 제약에 따라 반드시 정해진 순서로 데이터를 처리한다. 이러한 특징 덕에 순서가 필요한 작업들에 유용하게 사용된다. 대표적으로 스케쥴러, 대기 등이 있으며 OS의 인터럽트(Interrupt) 작업에서 스택이 쓰인다.

## 8-1. 스택

<span class="amber-400">스택</span>이 데이터를 관리하는 방식은 배열의 그것과 매우 유사하다. 아까도 말했듯이, 스택과 큐엔 특정한 제약이 걸려있으며 그 중 스택의 제약은 아래와 같다.

* 데이터는 반드시 스택의 입구에서만 삽입할 수 있다.
* 스택의 가장 끝에 위치한 데이터만 읽을 수 있다.
* 스택의 가장 끝에 위치한 데이터만 삭제할 수 있다.

스택의 입구는 하나 뿐이며, 이 <span class="red-400">입구에서 모든 연산</span>이 일어난다. 길쭉한 프링글스 통을 연상하면 이해하기 쉽다. 프링글스 칩을 꺼내먹기 위해선 반드시 정해진 입구에서만 꺼내서 먹을 수 있으며, 맨 위의 칩만 꺼낼 수 있다. 스택의 데이터와 연산을 이에 대입하면 매우 유사하다.

스택의 입구. 즉, 끝을 위(top)이라 하며, 스택의 가장 밑을 아래(bottom)라 한다. 스택의 연산은 두 가지로 나뉜다.

| 구분  |     내용      |
| :---: | :-----------: |
| PUSH  | 데이터를 삽입 |
|  POP  | 데이터를 삭제 |

스택의 푸시 연산을 도식화하면 아래와 같다.

1. 스택에 2를 푸시한다.

<img src="https://user-images.githubusercontent.com/50317129/127523633-6a838ba9-339f-4443-bfd7-bea18c4d6558.png" width="200px" />

2. 스택에 6을 푸시한다.

<img src="https://user-images.githubusercontent.com/50317129/127523640-caec6583-e44a-43f8-95d0-678f1aac1523.png" width="200px" />

3. 스택에 9를 푸시한다.

<img src="https://user-images.githubusercontent.com/50317129/127523649-7046261f-d896-4c24-bd68-648a795c8b58.png" width="200px" />

푸시는 항상 스택의 위에서 이루어진다는 점을 기억하자.

스택의 팝 연산은 아래와 같다.

1. 스택에 9를 팝한다.

<img src="https://user-images.githubusercontent.com/50317129/127523655-40e026a8-5631-41c8-a300-03d0ce237242.png" width="200px" />

2. 스택에 6을 팝한다.

<img src="https://user-images.githubusercontent.com/50317129/127523665-e28389b1-27d0-4fb9-b29a-aa4c5278c253.png" width="200px" />

이 과정 후엔 스택에 5만 남게된다. 스택은 항상 위에만 데이터를 삽입할 수 있으므로, 스택의 중간에 데이터를 삽입하려면 해당 위치까지 모든 데이터를 팝한 뒤 푸시해야한다.

이렇게 먼저 들어온 게 가장 늦게 나가고. 반대로 가장 늦게 들어온 게 가장 빨리 나가는 걸 <span class="blue-400">LIFO</span>(Last In, First Out)이라 한다.

월요일의 출근길을 생각해보자. 최대한 늦게 들어가고 최대한 빨리 나오고 싶지 않은가?

## 8-2. 스택 다뤄보기

필자는 코드 규칙에 굉장히 민감한 편이다. 쓸데없이 예민해서, 내 방식대로 포맷팅이 되어있지 않은 소스는 리딩만으로도 스트레스를 받는다. 굳이 내 방식이 아니더라도 일관성있는 규칙이라면 그나마 나은데, 일관성도 없이 막 짠 코드를 보는 건 정말이지.... 가뜩이나 코드 리딩도 제대로 못 하는데 코드가 난잡하기까지 하면 당연히 답이 없을 것 같다.

그래서 나는 ESLint를 굉장히 선호한다. TypeScript, HTML 등의 코드를 내가 정의한 규칙에 부합한지 알려주고, 틀리다면 수정까지 해준다. 나같이 코드 규칙에 예민한 사람에겐 필수품이나 다름없다.

이렇게 코드를 정렬해주는 Lint는 언어별로 다른 규칙을 일일히 이해하고 틀린 부분을 잘 찾아야 하므로 딱 봐도 구현하기 매우 어려워 보인다. 이 문단에서는 스택을 활용하여 간단한 코드 Lint를 만들어본다.

예를 들어, 아래와 같은 코드가 있다고 가정하자.

``` javascript
// 정상
const list1 = [ 1, 2, 3 ]

// 오류1. 닫는 대괄호 없음
const list2 = [ 1, 2, 3

// 오류2. 여는 대괄호 없음
const list3 = 1, 2, 3]

// 오류3. 괄호 쌍이 맞지 않음
const list4 = (1, 2, 3]
```

모든 언어에서, 괄호는 항상 한 쌍으로 이루어진다. 따라서 `list1`을 제외한 나머지 코드에는 오류가 표시된다. 스택을 사용한다 해서 린트 구현이 쉬워지는 건 아니다. 온전한 동작을 하는 하나의 린트를 설계하는 것은 매우 어려우므로, 여기서는 <span class="green-400">괄호</span>에 대해서만 생각한다.

책에서 정의한 괄호 린트의 규칙은 아래와 같다.

1. 괄호가 아닌 문자는 모두 무시한다.
2. 여는 괄호가 나오면 스택에 푸시한다. 스택에 넣는다는 것은 해당 괄호가 닫히기를 기다린다는 의미이다.
3. 닫는 괄호가 나오면 스택 위의 원소를 확인하고, 아래와 같이 분석한다.
   * 스택에 원소가 없으면 이전에 여는 괄호가 나오지 않은 것으로, <span class="red-400">오류 2</span>와 같다.
   * 스택에 데이터가 있지만, 닫는 괄호가 스택 위에 있는 원소와 종류가 일치하지 않을 경우, <span class="red-400">오류 3</span>과 같다.
   * 닫는 괄호가 스택 위에 있는 원소와 괄호 종류가 같을 경우, 괄호가 성공적으로 닫혔으므로 정상적인 케이스다. 해당 괄호는 더 이상 기록할 필요가 없으므로 스택 위 원소를 POP한다.
4. 줄 끝에 도달했는데, 스택에 여전히 원소가 남아있을 경우, 닫는 괄호가 없는 <span class="red-400">오류 1</span>과 같다.

정의한 규칙을 토대로 예제를 기술하면 아래와 같다.

<img src="https://user-images.githubusercontent.com/50317129/127666476-c4e4a04d-bfc7-4a64-9861-554fab1c41d7.png" width="400px" />

예제는 위 구문을 토대로 서술하며, 스택 역시 그림과 같다.

1. 여는 소괄호를 스택에 푸시한다.

<img src="https://user-images.githubusercontent.com/50317129/127666490-27aa0e68-7d97-4285-9ab5-564b4ae3fa34.png" width="400px" />

만약 닫는 괄호였다면 오류였을 것이다.

2. 다음 괄호가 나올 때까지 포인터를 이동한다.

`var`, `x` 등 괄호가 아닌 구문은 모두 무시한다. 이후부터는 2번 과정의 기술은 생략한다.

3. 여는 중괄호를 스택에 푸시한다.

<img src="https://user-images.githubusercontent.com/50317129/127666497-84783779-d69a-49a2-941e-1c45fa3daafe.png" width="400px" />

비록 스택 밑의 괄호와 종류는 다르지만, 둘 다 여는 괄호이므로 제대로 닫히기만 하면 오류는 아니다.

4. 여는 대괄호를 스택에 푸시한다.

<img src="https://user-images.githubusercontent.com/50317129/127666504-41da2695-b18f-494c-bbc9-e63bd9199866.png" width="400px" />

마찬가지로 스택에 푸시한다.

5. 닫는 대괄호가 감지되었으므로, 스택의 맨 위 원소와 비교하여 팝한다.

<img src="https://user-images.githubusercontent.com/50317129/127666509-840346c4-7b4a-4b33-ab01-cd0fc558b536.png" width="400px" />

아래와 같을 경우 팝 연산이 가능하다.

* 스택의 맨 위 괄호와 현재 포인터의 괄호 종류가 같다.
* 스택의 맨 위 괄호는 반드시 여는 괄호다.

이 경우 위 두 조건을 충족하므로, 여는 대괄호를 스택에서 팝하여 제거한다.

6. 닫는 중괄호가 감지되었으므로, 스택의 맨 위 원소와 비교하여 팝한다.

<img src="https://user-images.githubusercontent.com/50317129/127666517-95b68f96-48c9-4883-a1c5-765658a85bd2.png" width="400px" />

여는 대괄호가 팝 연산으로 인해 스택에서 삭제되었으므로, 현재 스택의 가장 맨 위 요소는 여는 중괄호다. 조건을 충족하므로 마찬가지로 스택에서 팝하여 제거한다.

7. 닫는 소괄호가 감지되었으므로, 스택의 맨 위 원소와 비교하여 팝한다.

<img src="https://user-images.githubusercontent.com/50317129/127666523-8a33d330-933a-47fe-b3bc-e4bcbfde07d5.png" width="400px" />

마찬가지로 조건을 충족하므로 요소를 팝한다.

8. 코드 끝에 도달했으므로, 스택의 상태를 확인하여 오류 여부를 판단한다.

코드의 모든 요소들을 확인했다. 만약 스택에 원소가 하나라도 남아있다면 해당 구문은 오류가 발생한 것이다.

이 경우 스택에 원소가 하나도 없으므로 정상적인 구문으로 판단할 수 있다. 즉 위 구문에서 우리가 설계한 린트는 오류를 표시하지 않는다.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Stack;

/**
 * 누구나 자료 구조와 알고리즘 괄호 린트 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/31/about-algorithm-chapter08/">스택과 큐로 간결한 코드 생성</a>
 * @since 2021.07.30 Fri 23:30:56
 */
public class Linter
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
		
		writer.write("후보 이름 입력 (x: 종료) >> ");
		writer.flush();
		
		String code = reader.readLine();
		
		char c = lint(code);
		
		// 린트 결과가 정상일 경우
		if (c == '0')
		{
			writer.write("오류 없음");
		}
		
		// 여는 괄호가 없을 경우
		else if (c == 'x')
		{
			writer.write("여는 괄호 존재하지 않음");
		}
		
		// 닫는 괄호가 없을 경우
		else
		{
			writer.write(c);
			writer.write(" 닫는 괄호 존재하지 않음");
		}
		
		writer.newLine();
		writer.flush();
		
		writer.close();
		reader.close();
	}
	
	/**
	 * 린트 결과 반환 함수
	 *
	 * @param text: [String] 구문
	 *
	 * @return [char] 린트 결과
	 */
	private static char lint(String text)
	{
		Stack<Character> stack = new Stack<>();
		
		for (int i = 0; i < text.length(); i++)
		{
			char c = text.charAt(i);
			
			// 여는 괄호일 경우
			if (isOpenBrace(c))
			{
				stack.push(c);
			}
			
			// 닫는 괄호일 경우
			else if (isCloseBrace(c))
			{
				// 스택이 비어있을 경우
				if (stack.isEmpty())
				{
					return 'x';
				}
				
				// 스택이 비어있지 않을 경우
				else
				{
					char co = stack.pop();
					
					// 괄호가 서로 매칭되지 않을 경우
					if (!isMatched(co, c))
					{
						return co;
					}
				}
			}
		}
		
		// 스택이 비어이쓸 경우
		if (stack.isEmpty())
		{
			return '0';
		}
		
		// 스택이 비어있지 않을 경우
		else
		{
			return stack.pop();
		}
	}
	
	/**
	 * 여는 괄호 여부 반환 함수
	 *
	 * @param c: [char] 문자
	 *
	 * @return [boolean] 여는 괄호 여부
	 */
	private static boolean isOpenBrace(char c)
	{
		return c == '(' || c == '{' || c == '[';
	}
	
	/**
	 * 닫는 괄호 여부 반환 함수
	 *
	 * @param c: [char] 문자
	 *
	 * @return [boolean] 여는 괄호 여부
	 */
	private static boolean isCloseBrace(char c)
	{
		return c == ')' || c == '}' || c == ']';
	}
	
	/**
	 * 괄호 매칭 여부 반환 함수
	 *
	 * @param open: [char] 여는 괄호
	 * @param close: [char] 닫는 괄호
	 *
	 * @return [boolean] 괄호 매칭 여부
	 */
	private static boolean isMatched(char open, char close)
	{
		// 소괄호가 서로 매칭될 경우
		if (open == '(' && close == ')')
		{
			return true;
		}
		
		// 중괄호가 서로 매칭될 경우
		else if (open == '{' && close == '}')
		{
			return true;
		}
		
		// 아닐 경우
		else
		{
			return open == '[' && close == ']';
		}
	}
}
```

``` input
const a = (1 + 2 * 3;
```

``` output
( 닫는 괄호 존재하지 않음
```

소스와 입출력은 위와 같다. 문자열을 하나하나 분석하여 여는 괄호가 있을 때까지 분석하여, 여는 괄호가 감지되면 스택에 푸시한다.

분석 중에 닫는 괄호가 나오면, 스택을 팝하여 닫는 괄호와 종류가 일치하는지 비교한다. 만약 일치할 경우 계속 진행하며, 일치하지 않다면 관련 오류를 표시한다.

``` java
for (int i = 0; i < text.length(); i++)
{
	char c = text.charAt(i);
	
	// 여는 괄호일 경우
	if (isOpenBrace(c))
	{
		stack.push(c);
	}
	
	// 닫는 괄호일 경우
	else if (isCloseBrace(c))
	{
		// 스택이 비어있을 경우
		if (stack.isEmpty())
		{
			return 'x';
		}
		
		// 스택이 비어있지 않을 경우
		else
		{
			char co = stack.pop();
			
			// 괄호가 서로 매칭되지 않을 경우
			if (!isMatched(co, c))
			{
				return co;
			}
		}
	}
}
```

해당 동작은 위 소스에서 제어한다. 또한 모든 동작 이후에도 스택에 원소가 남아있을 경우, 정상적으로 닫히지 않은 괄호가 있는 것이므로 역시 오류를 표시한다.

``` java
// 스택이 비어있을 경우
if (stack.isEmpty())
{
	return '0';
}

// 스택이 비어있지 않을 경우
else
{
	return stack.pop();
}
```

해당 동작은 모든 감지가 끝난 뒤, 위 소스에서 제어한다.

이와 같이 스택은 가장 나중에 들어온 데이터를 먼저 처리해야할 경우에 굉장히 유용하다. 방금과 같은 린트나, 우리의 실수를 막아주는 `Ctrl + z` 등에 사용된다.

## 8-3. 큐

큐 역시 스택과 비슷하게 배열에 특정 규칙이 적용된 자료구조다. 큐의 제약사항은 아래와 같다.

* 데이터는 큐의 끝에만 삽입할 수 있다. (스택과 동일)
* 데이터는 큐의 앞에서만 읽을 수 있다. (스택과 반대)
* 데이터는 큐의 앞에서만 삭제할 수 있다. (스택과 반대)

스택과 골자는 비슷하나, 연산을 보면 살짝 다르다. 스택이 출입구가 하나로 통일된 형태라면, 큐는 출입구가 서로 나뉜 형태다. 스택은 프링글스 통을, 큐는 일반적인 파이프를 연상하면 쉽다. 단, 이 파이프는 한 쪽 방향으로만 흘러간다.

스택과 달리 큐는 PUSH 같은 연산명이 따로 있진 않다. 큐의 연산을 도식화하면 아래와 같다.

1. 큐에 8을 삽입한다.

<img src="https://user-images.githubusercontent.com/50317129/127694394-a849f2e6-591e-46f3-aef5-e94332f61df6.png" width="400px" />

2. 큐에 93을 삽입한다.

<img src="https://user-images.githubusercontent.com/50317129/127694400-dfc6ccda-f609-4dcc-b9b0-4365fb21abf3.png" width="400px" />

3. 큐에 51을 삽입한다.

<img src="https://user-images.githubusercontent.com/50317129/127694406-70a9119d-e29f-4ad9-9fa1-f3259c3b537f.png" width="400px" />

여기까지는 스택의 PUSH 연산과 크게 다른 점이 없다.

4. 큐의 8을 삭제한다.

<img src="https://user-images.githubusercontent.com/50317129/127694414-d59f5897-2f8c-481c-bd5f-e66c77875907.png" width="400px" />

스택과 달리 큐는 데이터 입구의 반대편에서 데이터를 삭제할 수 있다.

5. 큐의 93을 삭제한다.

<img src="https://user-images.githubusercontent.com/50317129/127694425-97870074-8a27-412f-945f-50c458f991d7.png" width="400px" />

6. 큐의 51을 삭제한다.

<img src="https://user-images.githubusercontent.com/50317129/127694428-f3bb5a80-ec75-446a-b8f0-6d12b0d74abd.png" width="400px" />

컨테이너 벨트처럼 순차적으로 처리하는 특징을 확인할 수 있다.

## 8-4. 큐 다뤄보기

스택과는 다른 방식으로 데이터를 순차적으로 처리하는 큐의 특성 덕분에 여러 곳에서 유용하게 쓰인다. 대기열이나 작업 예약 등 먼저 들어온 요소가 먼저 나가는 <span class="blue-400">FIFO</span>(First In, First Out)으로 동작한다.

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.LinkedList;
import java.util.Objects;
import java.util.Queue;

/**
 * 누구나 자료 구조와 알고리즘 큐 프린터 클래스
 *
 * @author RWB
 * @see <a href="https://blog.itcode.dev/posts/2021/07/31/about-algorithm-chapter08/">스택과 큐로 간결한 코드 생성</a>
 * @since 2021.07.31 Sat 03:21:35
 */
public class Printer
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
		
		Queue<String> queue = new LinkedList<>();
		
		while (true)
		{
			writer.write("출력할 문자열 입력 (x: 종료) >> ");
			writer.flush();
			
			String work = reader.readLine();
			
			// 입력을 종료할 경우
			if (work.equalsIgnoreCase("x"))
			{
				break;
			}
			
			// 작업할 입력이 들어올 경우
			else
			{
				queue.offer(work);
			}
		}
		
		while (!queue.isEmpty())
		{
			writer.write("[INFO] ");
			writer.write(Objects.requireNonNull(queue.poll()));
			writer.newLine();
			writer.flush();
		}
		
		writer.close();
		reader.close();
	}
}
```

``` input
First Document
Second Document
Third Document
Fourth Document
Fifth Document
x
```

``` output
[INFO] First Document
[INFO] Second Document
[INFO] Third Document
[INFO] Fourth Document
[INFO] Fifth Document
```

얼핏 보면 그냥 입력받은 순서대로 바로 콘솔에 뿌려주는 것 처럼 보이지만, 이는 소스가 간단하기 때문에 일어나는 착각이다.

실제로 복잡한 작업을 하다보면, 조건에 따라 작업을 저장했다가 후에 순차적으로 후처리를 해야하는 등의 작업이 필요하다. 이런 경우에 큐의 특징은 매우 유용하다. 

우리가 흔히 아는 배열에 담아도 되지 않냐 반문할 수 있지만, 수시로 작업이 추가/삭제될 경우 배열은 그 인덱스를 신경써주어야한다. 반면 큐의 경우 작업의 IO에 있어서 정해진 규약이 있기 때문에 인덱스에 구애받지 않고 추가하고 삭제하면 된다.

# 마무리

이 장의 핵심은 아래와 같이 정리할 수 있다.

* 스택은 후입선출(LIFO) 방식이다.
* 스택은 원소의 추가/삭제 모두 스택의 위(TOP)에서 발생한다.
* 스택 중간에 원소를 삽입하려면, 해당 위치에 도달할 때까지 모든 원소를 삭제해야한다.
* 큐는 선입선출(FIFO) 방식이다.
* 큐는 원소의 추가가 한 쪽, 삭제가 다른 쪽에서 각각 따로 발생한다.

스택과 큐의 개념 자체는 어렵지 않았지만, JAVA에서 이를 다루는 것은 익숙치 않았었다. 이 장을 정리하면서 스택과 큐의 특성은 물론, JAVA에서 이를 어떻게 다루는 지도 알 수 있었다.

다음 장에서는 반복적인 연산을 단축하는데 매우 효과적인 재귀에 대해 다룰 예정이다.