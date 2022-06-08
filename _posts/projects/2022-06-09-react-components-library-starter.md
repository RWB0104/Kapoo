---
title: "Rollup.js로 React 컴포넌트 라이브러리 개발기"
excerpt: "Next.js로 블로그를 다시 만든 뒤에, 새로운 글 작성 이외에 별다른 유지보수는 하지 않았었다. 나름의 이유는 있었던 것이, 일단 당장 쓰는 데 큰 문제가 없었고, 귀찮기도 했다. 적절한 컴포넌트를 구상하고 배치하는 게 여간 귀찮은 일이 아니기도 했고. 내 블로그에 몇 가지 문제점이 있었는데, 그 중 하나가 About 페이지에 아무 것도 없다는 점이다. 뭔가 나름의 블로그 소개를 작성하려고 했는데, 마땅한 아이디어가 없었기 때문. 그러다 문득, 괜찮은 아이디어가 하나 떠올랐는데, \"About 페이지에 커밋 리스트를 표시해주면 괜찮지 않을까?\"란 생각이였다. 나쁘지 않은 생각이였으므로 개발에 들어갔으나, 갑자기 블로그의 못난 부분들이 거슬리기 시작했다. 갑자기 못난 부분들이 보이는 게 너무나도 참을 수 없던 나는, 그렇게 예정에도 없던 블로그 리뉴얼 작업을 시작했다."
coverImage: "https://user-images.githubusercontent.com/50317129/172054319-11955bfc-e4f3-4a30-b8fb-0de34f57c001.png"
date: "2022-06-05T23:01:19+09:00"
type: "projects"
category: "React"
tag: [ "React", "Rollup.js", "npm", "Library" ]
comment: true
publish: false
---

# 왜?

회사에서 할당받은 업무 중 하나로, 컴포넌트를 라이브러리화하여 npm으로 배포하는 업무를 맡게 됐다. 즉, `react-bootstrap` 같은 컴포넌트 라이브러리를 개발해야한다.

코드 배포 경험이라곤 예전에 JAVA 오픈소스 라이브러리 만든답시고 Maven에 한 번 배포해본 게 전부인 내게, 새로운 개발환경에서의 배포는 필연적인 시행착오를 불러왔다.

개발하면서 느꼈던건, 깊게 참고할만한 레퍼런스가 너무 없었고, 가져다 쓸만한 적절한 코드도 찾지 못 했다. 다행히 뭐 어찌저찌 시간 갈아가며 어느정도 기틀을 잡을 수 있었다.

나름 재밌기도 했고, 한 번 파볼만한 가치도 있는 것 같고, 인지도 높은 레퍼런스도 없는 것 같아서 내가 직접 한 번 만들어보기로 했다.

<br />
<br />
<br />










# 목표

- 최소한의 번들을 위해 Create React App 미사용
- TypeScript 기반의 React 라이브러리 개발환경을 구축
- 스타일 코드는 SCSS 사용 (CSS-in-CSS)
- Storybook을 통한 컴포넌트 테스트
- npm 배포 및 타 프로젝트에서의 활용 가능 여부 확인

목표는 위와 같다. 수준급의 개발환경까지 제공하지는 못 하더라도, 적당히 활용 가능할만한 수준의 개발환경을 제공해주는 것이 궁극적인 목표다.

<br />
<br />
<br />










# React Components Library Starter

이 프로젝트의 이름은 <b class="primary">React Components Library Starter</b>로 명명했다. 리액트 라이브러리 개발환경을 제공한다는 의미가 직관적으로 드러나길 원했다.

제품화된 소프트웨어나 솔루션이면 모를까, 이런 종류의 라이브러리는 그냥 봤을 때 "얘가 뭘 하는 라이브러리구나"라고 대충 감이 오는 게 제일 좋은 것 같다.

CRA를 사용하지 않으므로, 그냥 생짜 밑바닥에서부터 구축한다.

`yarn`을 기준으로 기술한다.

<br />
<br />





## 1. 환경 구성하기

``` bash
mkdir react-components-library-starter

cd react-components-library-starter

yarn init
# question name (react-components-library-starter):
# question version (1.0.0):
# question description:
# question entry point (index.js):
# question repository url (https://github.com/itcode-dev/react-components-library-starter):
# question author (RWB0104 <psj2716@gmail.com>):
# question license (MIT):
# question private: false

mkdir src
```

- 폴더를 생성한다.
- 프로젝트를 초기화한다.
- `src` 폴더를 생성한다. 소스코드의 최상위 폴더가 될 것이다.

<br />
<br />





## 2. React 설치

``` bash
yarn add -D react @types/react
```

|                            이름                            | 용도                  |
| :--------------------------------------------------------: | :-------------------- |
|        [react](https://www.npmjs.com/package/react)        | React 라이브러리      |
| [@types/react](https://www.npmjs.com/package/@types/react) | React 라이브러리 타입 |

- React 관련 라이브러리를 설치한다.
- 해당 라이브러리의 구동에 직접적으로 연관이 없는 대부분의 라이브러리는 `-D` 옵션을 지정하여 `devDependencies`로 설치한다.

<br />
<br />





## 3. TypeScript 설치

``` bash
yarn add -D typescript
```

|                          이름                          | 용도                  |
| :----------------------------------------------------: | :-------------------- |
| [typescript](https://www.npmjs.com/package/typescript) | TypeScript 라이브러리 |

- TypeScript 관련 라이브러리를 설치한다.

``` bash
vim tsconfig.json
```

- TypeScript 빌드 설정을 위해, 설정파일 `tsconfig.json`을 생성한다.

``` json
{
	"compilerOptions": {
		"target": "es5",
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"strict": true,
		"skipLibCheck": true,
		"jsx": "react",
		"module": "ESNext",
		"declaration": true,
		"declarationDir": "./dist",
		"sourceMap": false,
		"outDir": "./dist",
		"moduleResolution": "node",
		"allowSyntheticDefaultImports": true,
		"emitDeclarationOnly": true,
		"removeComments": true
	},
	"include": [
		"./src"
	],
	"exclude": [
		"./dist",
		"./node_modules",
		"./src/**/*.test.tsx",
		"./src/**/*.stories.tsx",
	]
}
```

- `tsconfig.json`의 예시는 위와 같다.
  - `declaration` - `*.d.ts` 타입 파일 생성 여부
  - `declarationDir` - `*.d.ts` 출력 경로. 반드시 `output`과 동일하거나 하위 경로여야한다.
  - `sourceMap` - 번들링 분석을 위한 소스맵 코드 생성 여부
  - `outDir` - 출력 경로. 라이브러리의 빌드 결과물은 `dist/`에 생성된다.
- 특별한 설정을 할 게 아니라면, 그냥 저대로 사용해도 무방하다.

<br />
<br />





## 4. SCSS 설치

``` bash
yarn add classnames style-inject
yarn add -D postcss sass
```

|                            이름                            | 용도                                               |
| :--------------------------------------------------------: | :------------------------------------------------- |
|   [classnames](https://www.npmjs.com/package/classnames)   | 클래스 속성 `claaName` 조인 활용을 위한 라이브러리 |
| [style-inject](https://www.npmjs.com/package/style-inject) | 스타일 태그 헤더 삽입기                            |
|      [postcss](https://www.npmjs.com/package/postcss)      | CSS 후처리기                                       |
|         [sass](https://www.npmjs.com/package/sass)         | SASS/SCSS 라이브러리                               |

<br />
<br />





## 5. Rollup.js 빌더 설치

``` bash
yarn add -D rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript rollup-plugin-peer-deps-external rollup-plugin-postcss
```

|                                                이름                                                | 용도                                                                                                                        |
| :------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
|                           [rollup](https://www.npmjs.com/package/rollup)                           | Rollup.js 코어                                                                                                              |
|             [@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel)             | Rollup.js와 Babel 연동 플러그인                                                                                             |
|          [@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)          | CommonJS -> ES6 코드로 변환하는 플러그인                                                                                    |
|      [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve)      | 외부 라이브러리 사용 시, 해당 라이브러리를 설치한 프로젝트의 `node_modules`를 참조하도록 변환하는 플러그인                  |
|        [@rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript)        | Rollup.js와 TypeScript 연동 플러그인                                                                                        |
| [rollup-plugin-peer-deps-external](https://www.npmjs.com/package/rollup-plugin-peer-deps-external) | `peerDependencies` 모듈을 번들링하지 않고 해당 라이브러리를 설치한 프로젝트의 `node_modules`를 참조하도록 변환하는 플러그인 |
|            [rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss)            | Rollup.js와 PostCSS 연동 플러그인                                                                                           |

- Rollup.js 관련 라이브러리를 설치한다.
- 개발자의 니즈에 따라 다양한 플러그인을 추가할 수도 있다.

``` bash
vim rollup.config.js
```

- Rollup.js 설정을 위해 `rollup.config.js`를 생성한다.

``` js
/**
 * Rollup 설정 모듈
 *
 * @author RWB
 * @since 2022.06.06 Mon 17:44:31
 */

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const extensions = [ 'js', 'jsx', 'ts', 'tsx', 'mjs' ];

const pkg = require('./package.json')

const config = [
	{
		external: [ /node_modules/ ],
		input: './src/index.ts',
		output: [
			{
				dir: './dist',
				format: 'cjs',
				preserveModules: true,
				preserveModulesRoot: 'src'
			},
			{
				file: pkg.module,
				format: 'es'
			}
			,
			{
				name: pkg.name,
				file: pkg.browser,
				format: 'umd'
			}
		],
		plugins: [
			nodeResolve({ extensions }),
			babel({
				exclude: 'node_modules/**',
				extensions,
				include: [ 'src/**/*' ]
			}),
			commonjs({ include: 'node_modules/**' }),
			peerDepsExternal(),
			typescript({ tsconfig: './tsconfig.json' }),
			postcss({
				extract: false,
				inject: (cssVariableName) => `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`,
				modules: true,
				sourceMap: false,
				use: [ 'sass' ]
			})
		]
	}
];

export default config;
```

- 설정 예시는 위와 같다.
- `./src/index.ts` 파일을 기준으로 결과물을 출력
  - `CJS` (기본)
  - `ESM`
  - `UMD`
- `CJS` 모듈의 경우 `preserveModules`로 Tree Shaking을 지원
- `@rollup/plugin-babel`은 `@rollup/plugin-commonjs` 보다 먼저 수행되어야함
  - 플러그인의 특성 상, 순서가 중요하게 작용할 가능성 있음

<br />
<br />





## 6. Storybook 설치

``` bash
npx storybook init --builder webpack5

yarn add -D @storybook/preset-scss css-loader sass-loader style-loader react-dom
```

|                                      이름                                      | 용도                                  |
| :----------------------------------------------------------------------------: | :------------------------------------ |
|              [storybook](https://www.npmjs.com/package/storybook)              | Storybook CLI                         |
| [@storybook/preset-scss](https://www.npmjs.com/package/@storybook/preset-scss) | Storybook의 webpack SCSS 설정 애드온  |
|             [css-loader](https://www.npmjs.com/package/css-loader)             | CSS 해석기                            |
|            [sass-loader](https://www.npmjs.com/package/sass-loader)            | SASS/SCSS를 CSS로 빌드하는 라이브러리 |
|           [style-loader](https://www.npmjs.com/package/style-loader)           | CSS 코드를 DOM에 삽입하는 라이브러리  |
|              [react-dom](https://www.npmjs.com/package/react-dom)              | React Dom 처리기                      |

- Storybook을 구동하기 위한 라이브러리를 설치한다.
  - `.storybook/` - Storybook 설정 폴더
  - `src/stories/` - Storybook 데모 폴더
- 스타일 관련 로더들의 최신버전은 대부분 `webpack5`와 호환되고 있으므로, 반드시 Storybook의 빌더를 `webpack5`로 지정해야한다.
  - 기본 빌더는 `webpack4`로, 이 경우 로더들의 버전을 빌더와 호환되게끔 낮춰줘야한다.

설치만 하면 되는 건 아니고, 간단한 설정이 필요하다.

`npx storybook init --builder webpack5`를 수행하면 알아서 프로젝트에 Storybook을 설치해준다. 이 과정에서 최상단 경로에 `.storybook` 폴더를 생성한다.

`.storybook/main.js`에 아래와 같이 코드를 추가해준다.

``` js
module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		// 추가
		"@storybook/preset-scss"
	],
	"framework": "@storybook/react",
	"core": {
		"builder": "@storybook/builder-webpack5"
	}
}
```

- `@storybook/preset-scss`를 애드온 리스트에 추가하여 적용한다.

<br />
<br />





## 7. ESLint 설치 (Optional)

코드의 일정한 규칙은 코드의 가독성을 향상시켜준다. 물론 개발자가 온전히 수작업으로 코드 컨벤션을 준수할 수도 있지만, 사람이 하는 일이다보니 실수가 발생하기도 하며, 코드 컨벤션와 일치하지 않는 코드를 일일히 찾는 것은 코드 퍼포먼스와 거의 연관성이 없음에도 많은 작업량을 요구한다. 더군다나 개발자가 여러명일 경우, 각자의 주관으로 인해 코드 컨벤션이 쉽게 망가질 우려가 있다.

`ESLint`를 활용하면 개발자가 신경쓰지 않아도 코드 컨벤션을 준수할 수 있다.

하지만 이는 코드 품질을 준수하기 위한 것으로, 코드의 퍼포먼스와 큰 연관성이 없으며, `ESLint`의 유무와 개발은 전혀 관련이 없다. 만약 이런 것까지 굳이 신경쓰고 싶지 않다면 이 문단은 넘어가도 무방하다. 향후 라이브러리 개발에 어떠한 영향도 미치지 않는다.

``` bash
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-sort-keys-fix eslint-plugin-storybook
```

|                                                이름                                                | 용도                                 |
| :------------------------------------------------------------------------------------------------: | :----------------------------------- |
|                           [eslint](https://www.npmjs.com/package/eslint)                           | ESLint 코어                          |
| [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) | ESLint TypeScript 환경 적용 플러그인 |
|        [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)        | ESLint TypeScript 파서 플러그인      |
|             [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)             | Airbnb 규칙 설정                     |
|             [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)             | `import/export` 규칙 플러그인        |
|           [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)           | JSX 요소 규칙 플러그인               |
|              [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)              | React 규칙 플러그인                  |
|        [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)        | React Hook 규칙 플러그인             |
|      [eslint-plugin-sort-keys-fix](https://www.npmjs.com/package/eslint-plugin-sort-keys-fix)      | 객체 키 정렬 규칙 플러그인           |
|          [eslint-plugin-storybook](https://www.npmjs.com/package/eslint-plugin-storybook)          | Storybook 규칙 플러그인              |

- ESLint 및 관련 설정, 플러그인을 설치한다.

``` js
module.exports = {
	env: {
		browser: true,
		node: true
	},
	extends: [ 'airbnb', 'airbnb/hooks', 'eslint:recommended', 'plugin:react/recommended', 'plugin:import/recommended', 'plugin:storybook/recommended' ],
	ignorePatterns: [ '.storybook', '*.d.ts', 'node_modules', 'build', 'dist', '**/env/*.js' ],
	overrides: [
		{
			files: [ '*.ts', '*.tsx' ],
			rules: { 'no-undef': 'off' }
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { warnOnUnsupportedTypeScriptVersion: false },
	plugins: [ '@typescript-eslint', 'sort-keys-fix', 'prettier' ],
	rules: {
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{ 'ts-ignore': 'allow-with-description' }
		],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-unused-vars': 'error',
		'array-bracket-spacing': [
			'error',
			'always',
			{
				arraysInArrays: false,
				objectsInArrays: false
			}
		],
		'brace-style': [ 'error', 'allman' ],
		'comma-dangle': [ 'error', 'never' ],
		'eol-last': [ 'error', 'never' ],
		'import/extensions': 'off',
		'import/named': 'off',
		'import/no-anonymous-default-export': 'off',
		'import/no-cycle': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-named-as-default': 'off',
		'import/no-unresolved': 'off',
		'import/order': [
			'error',
			{
				alphabetize: {
					caseInsensitive: true,
					order: 'asc'
				},
				groups: [ 'external', 'builtin', 'internal', 'sibling', 'parent', 'index' ],
				'newlines-between': 'always'
			}
		],
		indent: [ 'error', 'tab' ],
		'jsx-a11y/control-has-associated-label': 'off',
		'jsx-quotes': [ 'error', 'prefer-single' ],
		'linebreak-style': 'off',
		'max-len': 'off',
		'no-restricted-exports': 'off',
		'no-tabs': [ 'error', { allowIndentationTabs: true }],
		'no-unused-vars': 'off',
		'object-curly-newline': [ 'error', {
			ExportDeclaration: 'never',
			ImportDeclaration: 'never',
			ObjectExpression: {
				minProperties: 3,
				multiline: true
			},
			ObjectPattern: 'never'
		}],
		'react-hooks/exhaustive-deps': 'warn',
		'react/button-has-type': 'off',
		'react/destructuring-assignment': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-curly-brace-presence': [
			'error',
			{
				children: 'never',
				props: 'never'
			}
		],
		'react/jsx-filename-extension': 'off',
		'react/jsx-indent': [ 'error', 'tab' ],
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-sort-props': [
			'error',
			{
				callbacksLast: true,
				ignoreCase: true,
				multiline: 'last',
				noSortAlphabetically: false,
				reservedFirst: false,
				shorthandFirst: false,
				shorthandLast: true
			}
		],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'require-jsdoc': 'off',
		'sort-keys-fix/sort-keys-fix': 'error'
	},
	settings: {
		'import/parsers': { '@typescript-eslint/parser': [ '.ts', '.tsx', '.js' ] },
		react: { version: 'detect' }
	}
};
```

- `.eslintrc.js`에서 ESLint의 설정을 관리할 수 있으며, 그 예시는 위와 같다.
- `rules`에 원하는 규칙을 추가하면 된다.
  - 기본 규칙은 [Rules - ESLint](https://eslint.org/docs/rules/)를 참조하자.

<br />
<br />





## 8. 프로젝트 설정

``` txt
.storybook/
src/
rollup.config.js
tsconfig.json
yarn.lock
```

- `.npmignore`는 `.gitignore`와 비슷하다. 다만, npm에 배포 시 제외할 파일을 선언한다는 점이 다르다.
- 해당 리스트의 규칙과 일치하는 파일 및 폴더는 npm 배포 시 포함되지 않는다.

``` json
{
	"name": "@itcode-dev/react-components-library-starter",
	"version": "3.0.1",
	"main": "./dist/index.js",
	"module": "./dist/index.es.js",
	"types": "./dist/index.d.ts",
	"private": false,
}
```

- `name` - npm 배포 시, 이 이름을 기준으로 배포를 수행한다.
  - 조직 하위에 배포할 경우, `@org/name` 형태로 입력한다.
- `version` - 라이브러리 버전. 이미 올라간 버전은 재배포가 불가능하며, 배포 시마다 버전을 적절히 관리해야한다.
- `main` - 해당 라이브러리의 기본(CJS) 스크립트
- `module` - 해당 라이브러리의 ESM 스크립트
- `browser` - 해당 라이브러리의 UMD 스크립트
- `types` - 해당 라이브러리의 타입
- `private` - npm 공개 여부
  - GitHub와는 관계 없는 설정