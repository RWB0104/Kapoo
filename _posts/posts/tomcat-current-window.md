---
title: "Tomcat(톰캣) 현재 콘솔창에서 구동하기"
excerpt: "Jekyll에서 Next.js로의 블로그 이동기"
coverImage: "https://media.vlpt.us/images/hanblueblue/post/0261303c-2557-4673-9d91-24b08c6dde16/Tomcat-logo.png"
date: "2021-05-26 16:32:16"
type: "posts"
category: "WAS"
tag: [ "WAS", "Tomcat(톰캣)", "Console(콘솔)" ]
comment: true
publish: true
---

# 왜 자꾸 꺼지는거야!

오늘도 어느때와 다름없이 톰캣을 구동하는 A씨. 어제까지만 해도 잘 되던 톰캣이 무슨 오류가 있는지 구동 중에 바로 꺼져버린다. 꺼지기 직전의 순간 무슨 오류가 뜬 거 같은데..... 너무 빨라서 도통 확인할 수가 없다. 할 수 없이 일일이 로그를 찾아보며 오류를 수정하는 A씨. 건드린 것도 없는데, 왜 이러는 걸까?

# 왜?

톰캣이 콘솔 형태로 실행되는 것은 맞지만, 실행되는 프로세스를 보면 살짝 다르다. `startup.bat`을 실행하면 cmd창이 뜬 뒤 꺼지면서 곧바로 Tomcat 창이 표시된다. <span class="primary">톰캣을 구동하면 항상 새로운 창이 뜨기 때문에, 톰캣이 오류로 인해 동작이 중지되면 창이 곧바로 닫히게 된다.</span>

# 해결책?

그렇다고 해결책이 없는 건 아니고, `startup.bat`의 간단한 수정을 통해 톰캣이 <span class="primary">현재 창에서 동작</span>하도록 수정할 수 있다. 

`startup.bat`을 메모장으로 열면, 맨 아래에 `call "%EXECUTABLE%" run %CMD_LINE_ARGS%` 구문이 존재한다. 여기서 가운데 `run`을 `start`로 변경한다.

즉 `call "%EXECUTABLE%" start %CMD_LINE_ARGS%`로 구문을 변경하고 저장하면 된다.

이후 `startup.bat`을 클릭하여 실행하지 말고, `cmd`창 하나를 킨 다음에, 해당 콘솔에서 `startup.bat`을 호출하면 새 창이 뜨지 않고 호출한 콘솔에서 톰캣이 구동된다.  
톰캣이 종료돼도 콘솔창이 꺼지지 않으므로, 편하게 메시지를 확인할 수 있다.