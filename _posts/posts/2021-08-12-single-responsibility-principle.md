---
title: "[OOP] 객체지향 5원칙(SOLID) - 단일 책임 원칙 (Single Responsibility Principle)"
excerpt: "올바른 객체지향 설계를 위해 수립한 원칙이 있으며, 이 다섯 가지 원칙을 통틀어 객체지향 5원칙(SOLID)이라 명명한다. 필수로 적용하지는 않지만, 적어도 이 규칙을 준수하면 준수할 수록 올바르게 설계된 객체지향이라 할 수 있다. 이 다섯가지 원칙은 아래와 같다."
coverImage: "https://user-images.githubusercontent.com/50317129/128211434-7c28e08b-c867-4b08-98c0-bcf94f0e54b3.png"
date: "2021-08-08T11:05:05"
type: "posts"
category: "CS"
tag: [ "CS", "객체지향", "객체지향 5원칙", "단일 책임 원칙" ]
group: "객체지향"
comment: true
publish: false
---

# 객체지향 5원칙

올바른 객체지향 설계를 위해 수립한 원칙이 있으며, 이 다섯 가지 원칙을 통틀어 <span class="amber-600">객체지향 5원칙</span>(SOLID)이라 명명한다. 필수로 적용하지는 않지만, 적어도 이 규칙을 준수하면 준수할 수록 올바르게 설계된 객체지향이라 할 수 있다.

이 다섯가지 원칙은 아래와 같다.

1. 단일 책임 원칙 (Single Responsibility Principle)
2. 개방-폐쇄 원칙 (Open-Closed Principle)
3. 리스코프 치환 원칙 (Liskov Substitution Principle)
4. 인터페이스 분리 원칙 (Interface Segregation Principle)
5. 의존성 역전 원칙 (Dependency Inversion Principle)

각 원칙의 영어 앞글자를 따 <span class="primary">SOLID</span>원칙이라고도 한다.

# 단일 책임 원칙 (Single Responsibility Principle)

<span class="orange-400">단일 책임 원칙</span>이란 <span class="orange-400">하나의 객체는 반드시 하나의 동작만의 책임을 갖는다</span>는 원칙이다.

모듈화가 강해질수록 다른 객체와의 의존/연관성이 줄어든다. 반대로 이야기하면 모듈화가 약해질수록 다른 객체와의 의존/연관성은 크게 늘어나며, 최악의 경우 어떠한 은닉화 정책도 존재하지 않아 모듈의 메소드에 무분별하게 접근할 수도 있게된다.

객체가 담당하는 동작. 즉, 책임이 많아질 수록 해당 객체의 변경에 따른 영향도의 양과 범위가 매우 커진다. 단일 책임 원칙은 특정 객체의 책임 의존성 과중을 최대한 지양하기 위한 정책이다.

## 코드로 보는 단일 책임 원칙

전자계산기를 객체로 구현한다고 가정해보자. 이 객체는 크게 아래와 같은 파트로 나누어진다.

* 사용자가 계산기 버튼을 눌렀음을 인식
* 입력받은 숫자 계산
* 디스플레이 표시

이를 의사코드로 나타내면 아래와 같다.

``` java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Random;

/**
 * 계산기 클래스
 *
 * @author RWB
 * @since 2021.08.12 Thu 01:43:11
 */
public class Calculator
{
	/**
	 * 동작 함수
	 *
	 * @throws IOException 입출력 예외
	 */
	public void run() throws IOException
	{
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		StringBuilder builder = new StringBuilder();
		
		String line;
		
		while ((line = reader.readLine()).equals("00"))
		{
			builder.append(onPush(Integer.parseInt(line)));
			builder.append(" ");
		}
		
		String formula = builder.toString().trim();
		
		int result = calculate(formula);
		
		show(result);
	}
	
	/**
	 * 버튼 푸시값 반환 함수
	 *
	 * @param key: [int] 키 코드
	 *
	 * @return [String] 버튼값
	 */
	private String onPush(int key)
	{
		return String.valueOf(key);
	}
	
	/**
	 * 계산 결과 반환 함수
	 *
	 * @param formula: [String] 수식
	 *
	 * @return [int] 계산 결과
	 */
	private int calculate(String formula)
	{
		return new Random().nextInt(formula.length());
	}
	
	/**
	 * 출력 함수
	 *
	 * @param result: [int] 출력 대상값
	 */
	private void show(int result)
	{
		System.out.println(result);
	}
}
```

위 소스는 계산기의 핵심 동작을 흉내낸 의사 코드다. 실제 계산기의 동작과는 매우 거리가 머나, 여기서 중요한건 코드의 동작이 아니라 구성이다.

지금 위 객체를 보면, `Calculator`는 굉장히 바쁜 객체다. 사용자가 입력하는 버튼도 감지해야하지, 입력값 모아서 계산해야하지, 그거 받아서 출력해야하지. 이 경우 `Calculator`의 코드 일부분이 변경되면 십중팔구 다른 메소드의 실행이나 연산에 영향을 미친다.

이러한 잠재적 영향은 테스트의 소요를 늘어지게 만드는 원인이 되며,