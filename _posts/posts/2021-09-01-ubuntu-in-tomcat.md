---
title: "[라즈베리파이 4] Ubuntu에 톰캣 설치하기"
excerpt: ""
coverImage: "https://user-images.githubusercontent.com/50317129/131238727-666f2aaa-d759-4f62-af73-3856086da73d.png"
date: "2021-08-31T01:51:39"
type: "posts"
category: "알고리즘"
tag: [ "라즈베리파이", "Ubuntu", "Tomcat(톰캣)" ]
group: "라즈베리파이"
comment: true
publish: true
---

# 개요

OS가 준비되었으므로 본격적으로 웹 서버 환경을 구축해보자. 대표적인 WAS인 Tomcat을 활용하여 페이지를 호스팅한다.

* Tomcat 9.0.50

# 웹 서버 구축하기

아래의 과정을 통해 Ubuntu 서버에 웹 서버를 구축하자.

## 1. JAVA 설치

우리가 사용할 WAS는 Tomcat으로, 구동 시 WAS를 필요로한다.

``` bash
sudo apt-get install openjdk-15-jdk
```

원하는 JAVA 버전을 설치한다. 본 문서에서는 최신 버전인 JAVA 15를 설치한다.

``` bash
java -version
```

``` output
openjdk version "15.0.3" 2021-04-20
OpenJDK Runtime Environment (build 15.0.3+3-Ubuntu-1)
OpenJDK 64-Bit Server VM (build 15.0.3+3-Ubuntu-1, mixed mode, sharing)
```

`java -version` 명령어를 수행하여 위와 같은 형식의 결과물이 출력되면 JAVA 설치가 완료된 것이다.

## 2. 환경변수 설정

JAVA 환경변수를 설정한다. 자바 컴파일러인 `javac` 명령어 입력 시 실제로 호출되는 파일의 경로를 확인하여 설치 경로를 찾는다.

``` bash
which javac
```

``` output
/usr/lib/jvm/java-15-openjdk-arm64/bin/javac
```

`which` 명령어는 명령어의 위치를 찾아주는 명령어다. 이를 입력하여 위치를 확인하면 위와 같은 경로가 나온다. `java-{VERSION}-openjdk-arm64`과 같은 폴더에 설치되어있으며, 버전마다 폴더명이 조금씩 다르다.

위 경로는 폴더가 아닌, 명령어 파일의 경로다. `JAVA_HOME`은 자바가 설치된 최상위 경로인 `/usr/lib/jvm/java-15-openjdk-arm64`가 된다.

사용자 설정파일인 `.profile`에 환경변수를 지정한다.

``` bash
vi ~/.profile
```

``` input
export JAVA_HOME=/usr/lib/jvm/java-15-openjdk-arm64
export PATH=$JAVA_HOME/bin:$PATH
```

사용자 설정파일을 열어 위 내용을 입력한다. `a` 혹은 `i`를 눌러 작성할 수 있다. 작성 이후 `:wq`를 입력하여 저장하면 된다.

``` bash
source ~/.profile
```

위 명령어를 입력하여 변경된 사용자 설정파일을 갱신한다. 이를 입력하지 않으면 해당 쉘에서는 변경된 환경변수가 반영되지 않는다.

## 3. Tomcat 설치

``` bash
sudo apt-get install tomcat9
sudo apt-get install libtcnative-1
```

`tomcat9`는 Tomcat 9버전이고, `libtcnative-1` 패키지를 설치하여 컴파일없이 Tomcat Native를 활성화할 수 있다.

Tomcat Native 찾다보면 `./configure`, `make` 같은 명령어가 나오기도 하는데, Tomcat Native 모듈을 직접 컴파일하는 방식이니 참고할 것.

톰캣의 설치 경로는 `/var/lib/tomcat9`다.

``` bash
# 톰캣 기동
systemctl start tomcat9

# 톰캣 정지
systemctl stop tomcat9

# 톰캣 재기동
systemctl restart tomcat9
```

위 명령어를 통해 톰캣 서비스를 on/off할 수 있다.

![image](https://user-images.githubusercontent.com/50317129/131715233-e70c15ac-0e38-48f3-8618-96b63a87ee0e.png)

Tomcat Native 활성화 여부는 로그에서 확인할 수 있으며, 로그에 위와 같은 문구가 출력되면 Tomcat Native가 활성화된 것이다.

``` bash
cd /var/log/tomcat9
```

Tomcat9 기준 로그는 위와 같으며, `catalina.yyyy-MM-dd.log` 형태의 파일을 열면 확인할 수 있다.

## 4. 포트 개방

통신에 사용할 포트를 개방한다.



## 4. 페이지 호스팅 확인

라즈베리파이 IP `xxx.xxx.xxx.xxx:8080`에 접속하여 톰캣 페이지가 정상적으로 출력되는지 확인하자.

![image](https://user-images.githubusercontent.com/50317129/131716513-505d0ed5-32ef-423e-b86d-d020253cede0.png)

별다른 설정을 변경하지 않았을 경우 위와 같은 관리자 페이지가 표시될 것이다.

만약 정상적으로 표시되지 않는다면 