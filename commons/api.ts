/**
 * API 모듈
 *
 * @author RWB
 * @since 2021.07.12 Mon 13:48:50
 */

import matter from 'gray-matter';
import katex from 'katex';
import marked from 'marked';
import fetch from 'node-fetch';
import Prism from 'prismjs';
import loadLanguage from 'prismjs/components/';

import fs from 'fs';
import { join } from 'path';

import { ContentHeaderProps, CONTENT_REGX, ContentProps, MD_REGX, NAME_REGX, ConvertProps, TocProps, COMMENT_REGX, CategoryProps, ContentType } from './common';

const CONTENT_DIR = join(process.cwd(), '_posts');

/**
 * 빌드 해쉬 반환 메서드
 *
 * @returns {string} 빌드 해쉬
 */
export function getBuildHash(): string
{
	return Math.random().toString(16).substr(2, 11);
}

/**
 * 이미지 리스트 반환 비동기 메서드
 *
 * @returns {Promise<string[]>} 이미지 리스트 Promise
 */
export async function getImageList(): Promise<string[]>
{
	const response = await fetch('https://api.github.com/repos/RWB0104/blog.itcode.dev/issues/43');

	// 응답이 유효할 경우
	if (response.ok)
	{
		const json = await response.json();

		const images = json.body as string;

		return images.replaceAll(/(\r\n|\n|\r)+/g, '\n').split('\n');
	}

	// 아닐 경우

	return [];
}

/**
 * 컨텐츠 목록 반환 함수
 *
 * @param {ContentType} type: 컨텐츠 타입
 * @param {boolean} isFull: 전체 테이터 사용 여부
 *
 * @returns {ContentProps[]} 컨텐츠 목록
 */
export async function getContentList(type: ContentType, isFull: boolean): Promise<ContentProps[]>
{
	const names = fs.readdirSync(join(CONTENT_DIR, type)).filter((item) => CONTENT_REGX.test(item));

	const result: ContentProps[] = [];

	for (let i = 0; i < names.length; i++)
	{
		const item = await getContent(type, names[i], isFull);

		result.push(item);
	}

	return result.filter((item: ContentProps) => item.header.publish)
		.sort((left, right): number => (new Date(right.header.date) > new Date(left.header.date) ? 1 : -1));
}

/**
 * 카테고리 목록 반환 함수
 *
 * @param {ContentType} type: 컨텐츠 타입
 *
 * @returns {CategoryProps[]} 카테고리 목록
 */
export async function getCategoryList(type: ContentType): Promise<CategoryProps[]>
{
	const list = await getContentList(type, false);

	return list.reduce((acc, content) =>
	{
		const target = acc.filter((item) => item.name === content.header.category);

		// 새 카테고리일 경우
		if (target.length === 0)
		{
			const current: CategoryProps = {
				count: 1,
				name: content.header.category
			};

			acc.push(current);
		}

		// 이미 확인된 카테고리일 경우
		else
		{
			target[0].count++;
		}

		acc[0].count += 1;

		return acc;
	}, [
		{
			count: 0,
			name: 'All'
		}
	] as CategoryProps[]).sort((a, b) =>
	{
		// All일 경우 무조건 1순위 정렬
		if (b.name === 'All')
		{
			return 1;
		}

		// 아닐 경우

		return a.name.localeCompare(b.name);
	});
}

/**
 * 컨텐츠 반환 함수
 *
 * @param {ContentType} type: 타입
 * @param {string} name: 이름
 * @param {boolean} isFull: 전체 테이터 사용 여부
 *
 * @returns {ContentProps} ContentProps
 */
export async function getContent(type: ContentType, name: string, isFull: boolean): Promise<ContentProps>
{
	// md 확장자가 없을 경우
	if (!MD_REGX.test(name))
	{
		name = `${name}.md`;
	}

	const path = join(CONTENT_DIR, type, name);
	const file = fs.readFileSync(path, 'utf-8');
	const urls = NAME_REGX.exec(name.replace(MD_REGX, '')) as string[];

	const { data, content } = matter(file);

	const header = data as ContentHeaderProps;

	const result: ContentProps = {
		header: data as ContentHeaderProps,
		name,
		url: urls
	};

	// 컨텐츠를 포함할 경우
	if (isFull)
	{
		const list = await getContentList(type, false);
		const { toc, html } = await converter(content);

		const current = list.findIndex((item) => item.name === name);
		const group = list.filter((item) => item.header.group && item.header.group === header.group);

		result.toc = toc;
		result.content = html;
		result.meta = {
			group,
			next: current === list.length - 1 ? null : list[current + 1],
			prev: current === 0 ? null : list[current - 1]
		};
	}

	return result;
}

/**
 * 마크다운 변환 결과 반환 함수
 *
 * @param {string} body: 내용
 *
 * @returns {Promise<ConvertProps>} Promise<ConvertProps> 객체
 */
export async function converter(body: string): Promise<ConvertProps>
{
	loadLanguage([ 'javascript', 'typescript', 'java', 'html', 'css', 'json', 'scss', 'sass', 'sql', 'batch', 'bash', 'tsx' ]);

	const renderer = new marked.Renderer();

	const toc = [] as TocProps[];

	// 코드블럭 렌더링
	renderer.code = (code: string, lang: string = 'txt'): string =>
	{
		// 유효한 언어가 있을 경우
		if (lang && renderer?.options?.highlight)
		{
			// 블록 수식일 경우
			if (lang === 'latex-block')
			{
				const katexText = katex.renderToString(code, { output: 'html', throwOnError: true });

				return `<div class="katex-block">${katexText}</div>`;
			}

			// 아닐 경우
			code = renderer.options.highlight(code, lang as string) as string;

			const langClass = `language-${lang}`;

			while (COMMENT_REGX.test(code))
			{
				const [ origin, target ] = COMMENT_REGX.exec(code) as string[];

				const newer = target.split('\n').map((item) => `<span class="token comment" data-tag="new">${item}</span>`).join('\n');

				code = code.replace(origin, newer);
			}

			const line = code.split('\n').map((item, index) => `<tr data-number=${index}><td class="line-number" data-number="${index}">${index}</td><td class="line-code" data-number=${index}>${item}</td></tr>`).join('\n').replace(/\t|\\n/, '');

			return `
				<div class="block-code">
					<div class="top">
						<p>${lang.toUpperCase()}</p>
						<div></div>
						<div></div>
						<div></div>
					</div>

					<button onclick="copyCode(this);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-icon="clipboard" class="i-clipboard"><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path></svg></button>

					<pre class="${langClass}"><table><tbody>${line}</tbody></table></pre>
				</div>
			`;
		}

		return '';
	};

	renderer.image = (href, title, text) => `
		<a href="${href}" target="_blank" data-title="${title}">
			<img src="${href}" alt="${text}" />
		</a>
	`;

	// 코드라인 렌더링
	renderer.codespan = (code) =>
	{
		// 수식일 경우
		if (code[0] === '$')
		{
			return katex.renderToString(code.slice(1), { output: 'html', throwOnError: true });
		}

		// 코드일 경우

		return `<code class="inline-code">${code}</code>`;
	};

	// 헤더 렌더링
	renderer.heading = (text: string, level: 1 | 2 | 3): string =>
	{
		const tag = text.replace(/(<([^>]+)>)/ig, '').replace(' ', '-');

		toc.push({
			depth: level,
			tag,
			text
		});

		return `<h${level} id="${tag}">${text} <a href="#${tag}">🔗</a></h${level}>`;
	};

	// 테이블 렌더링
	renderer.table = (header: string, content: string): string => `
			<div class="table-wrapper">
				<table>
					<thead>
						${header}
					</thead>

					<tbody>
						${content}
					</tbody>
				</table>
			</div>
		`;

	// 링크 렌더링
	renderer.link = (href: string, title: string, text: string): string => `<a href="${href}" target="_blank">${text}</a>`;

	const tokenizer = {
		codespan(src: string)
		{
			const match = src.match(/^([$])(?=[^\s$`])([^`$]*?)\1(?![$])/);

			if (match)
			{
				return {
					raw: match[0],
					text: match[1] === '$' ? `$${match[2].trim()}` : match[2].trim(),
					type: 'codespan'
				};
			}

			return false;
		},
		fences(src: string)
		{
			const cap = src.match(/^ {0,3}(`{3,}|\${2,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`$]* *(?:\n+|$)|$)/);

			if (cap)
			{
				return {
					codeBlockStyle: 'indented',
					lang: cap[1] === '$$' ? 'latex-block' : cap[2].trim(),
					raw: cap[0],
					text: cap[3],
					type: 'code'
				};
			}

			return false;
		},
		inlineText(src: string)
		{
			const cap = src.match(/^([`$]+|[^`$])(?:[\s\S]*?(?:(?=[\\<![`$*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/);

			if (cap)
			{
				return {
					raw: cap[0],
					text: cap[0],
					type: 'text'
				};
			}

			return false;
		}
	} as Partial<Omit<marked.Tokenizer<false>, 'constructor | options'>>;

	marked.use({ tokenizer });

	marked.setOptions({
		highlight: (code: string, language: string) =>
		{
			// Prism에 로딩된 언어일 경우
			if (Prism.languages[language])
			{
				return Prism.highlight(code, Prism.languages[language], language);
			}

			// 아닐 경우

			return code;
		},
		renderer
	});

	const result = marked(body);

	return {
		html: result.toString(),
		toc: tableOfContents(toc)
	};
}

/**
 * 컨텐츠 테이블 HTML 문자열 반환 함수
 *
 * @param {TocProps[]} toc TocProps 배열
 *
 * @returns {string} HTML 문자열
 */
export function tableOfContents(toc : TocProps[] | undefined): string
{
	// toc 객체가 유효할 경우
	if (toc)
	{
		let count = 0;

		return `${toc.reduce((acc: string, item: TocProps): string =>
		{
			const { text, tag, depth } = item;

			// toc의 깊이가 현재 깊이보다 깊을 경우
			if (depth > count)
			{
				count++;
				acc += `<ul><li><a href="#${tag}">${text}</a></li>`;
			}

			// toc의 깊이가 현재 깊이보다 얕을 경우
			else if (depth < count)
			{
				count--;
				acc += `</ul><li><a href="#${tag}">${text}</a></li>`;
			}

			// toc의 깊이가 현재 깊이와 동일할 경우
			else
			{
				acc += `<li><a href="#${tag}">${text}</a></li>`;
			}

			return acc;
		}, '')}</ul>`;
	}

	return '';
}