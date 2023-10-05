---
title: "Tomcat(톰캣) 콘솔창 한글 인코딩 깨짐 현상 해결하기"
excerpt: "톰캣을 구동하다보면 심심치않게 마주하는 오류(?)는 아니고 현상. Windows Console의 기본 인코딩과 Tomcat이 출력하는 인코딩이 서로 달라서 생긴다."
coverImage: "https://user-images.githubusercontent.com/50317129/119212068-1b218b80-baf1-11eb-9a42-85945bceb7d9.png"
date: "2021-05-22T12:52:51"
type: "posts"
category: "WAS"
tag: [ "WAS", "Tomcat(톰캣)", "Console(콘솔)" ]
comment: true
publish: true
---

# 와장창!

![Encoding Broken](https://user-images.githubusercontent.com/50317129/119212087-342a3c80-baf1-11eb-89bc-06829a5f7c16.png)

톰캣을 구동하다보면 심심치않게 마주하는 오류(?)는 아니고 현상.  
Windows Console의 기본 인코딩과 Tomcat이 출력하는 인코딩이 서로 달라서 생긴다.

# 도대체 왜?

실력 좋은 개발자가 아니더라도, 컴퓨터와 친분이 있다면 언어가 깨짐은 곧 인코딩의 불일치라는 걸 개괄적으로 이해하고 있다. 이러한 현상이 일어나는 이유는 아래와 같은데,

* <span class="blue-400">Windows Console</span>: Windows OS 설정 언어의 기본 인코딩 (한국어는 **EUC-KR**)
* <span class="blue-400">Tomcat Console</span>: 설정파일의 인코딩 (**기본 UTF-8**)

이 처럼, 기본 인코딩이 서로 다르다.

# 해결책

이를 해결하는 방법은 크게 두 가지가 존재한다. 개인적으로 <span class="red-300">두 번째 방법을 추천</span>한다.

### Windows Console 인코딩 변경하기

첫 번째로, Windows Console의 인코딩을 변경한다. Windows 10 기준으로 OS의 기본 콘솔은 <span class="green-500">cmd</span>와 <span class="green-500">PowerShell</span> 두 가지다. **사용할 콘솔의 기본 인코딩을 EUC-KR에서 UTF-8로 변경**해주면 된다.

애석하게도, 두 콘솔 모두 인코딩을 변경하는 옵션을 제공하지 않는다. 그렇다고 방법이 없는 건 아니고, 레지스트리 수정을 통해 문제를 해결할 수 있다.

<br />

1. 작업표시줄에서 `regedit`을 입력하여 <span class="blue-500">레지스트리 편집기</span>를 띄운다.
2. `HKEY_CURRENT_USER\Console` 경로에 접근한다. 사용자 계정에 설치된 콘솔들이 출력된다. (cmd, PowerShell, Git 등)

![Registry](https://user-images.githubusercontent.com/50317129/119212160-83706d00-baf1-11eb-92c8-b41458950f20.png)

3. 인코딩을 변경하려는 콘솔의 폴더를 클릭한다.

``` powershell
# cmd
%SystemRoot%_system32_cmd.exe

# 32비트 PowerShell
%SystemRoot%_System32_WindowsPowerShell_v1.0_powershell.exe

# 64비트 PowerShell
%SystemRoot%_SysWOW64_WindowsPowerShell_v1.0_powershell.exe
```

4. `CodePage` 키를 더블클릭하여 편집을 수행한다.
   `CodePage`가 없을 경우, 오른쪽 마우스 버튼을 클릭하여 새 DWORD(32비트) 키를 동일한 이름으로 생성한다.
5. 값 데이터를 10진수 `65001`로 변경한다.

![Registry](https://user-images.githubusercontent.com/50317129/119212198-ab5fd080-baf1-11eb-981b-82599148c8f8.png)

6. 앞으로 실행되는 Windows Console은 해당 인코딩이 적용된다.

이렇게 하면 Windows Console과 Tomcat의 기본 인코딩이 UTF-8로 서로 일치하므로, 한글이 정상적으로 출력된다.  
하지만 이 방법은 Windows Console의 인코딩을 바꾸므로, 차후 해당 <span class="red-500">콘솔을 통해 다른 작업이나 프로그램이 실행될 경우 엉뚱한 프로그램의 한글이 깨질 우려</span>가 있다.  
(대부분은 OS 언어의 기본 인코딩을 따라가도록 설계함)

Windows Console은 범용적으로 사용되는 프로그램이므로, 다른 작업에 영향을 줄 수 있다. 내가 이 방법을 굳이 추천하지 않는 이유이기도 하다.  

### Tomcat Console 인코딩 변경하기

두 번째로, Tomcat Console의 인코딩을 변경한다. 첫 번째 방법보다 이 방법이 나은 이유는, Tomcat이라는 제한적인 용도의 콘솔에만 영향을 미치기 때문. 어차피 Tomcat Console의 인코딩이 불일치해서 생기는 문제이므로, 이쪽을 바꾸는게 상식적으로도 맞다.

대부분 마찬가지로 위 방법처럼 레지스트리를 수정하라고 안내할텐데, Tomcat은 굳이 그렇게 바꿔줄 필요 없다.

1. `%TOMCAT_HOME%\conf\logging.properties`을 연다.
2. **java.util.logging.ConsoleHandler.encoding**의 값을 **EUC-KR**로 변경한다.
   별다른 설정이 없었다면, UTF-8이 기본으로 설정되어 있다.
3. 앞으로 실행되는 Tomcat은 해당 인코딩이 적용된다.

Tomcat을 실행하면 한글이 정상적으로 출력된다.