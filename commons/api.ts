/**
 * API 모듈
 *
 * @author RWB
 * @since 2021.07.12 Mon 13:48:50
 */

// 라이브러리 모듈
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Prism from 'prismjs';
import katex from 'katex';
import loadLanguage from 'prismjs/components/';

import { ContentHeaderProps, CONTENT_REGX, ContentProps, MD_REGX, NAME_REGX, ConvertProps, TocProps } from './common';

const CONTENT_DIR = join(process.cwd(), '_posts');

/**
 * 스크리너 기본 이미지 목록 반환 함수
 *
 * @returns {string[]} 스크리너 기본 이미지 목록
 */
export function getScreenerImage(): string[]
{
	return fs.readdirSync(join(process.cwd(), 'public', 'img', 'screener'));
}

/**
 * 컨텐츠 목록 반환 함수
 *
 * @param {string} type: 컨텐츠 타입
 *
 * @returns {ContentProps[]} 컨텐츠 목록
 */
export function getContentsList(type: string): ContentProps[]
{
	const names = fs.readdirSync(join(CONTENT_DIR, type)).filter(item => CONTENT_REGX.test(item));

	return names.map((name): ContentProps => getContent(type, name)).filter((item: ContentProps) => item.header.publish).sort((left, right): number => (new Date(right.header.date) > new Date(left.header.date) ? 1 : -1));
}

/**
 * 카테고리 목록 반환 함수
 *
 * @param {string} type: 컨텐츠 타입
 *
 * @returns {string[]} 카테고리 목록
 */
export function getContentsCategory(type: string): string[]
{
	const categories = getContentsList(type).map(content => content.header.category);

	return [ ...new Set(categories) ].sort();
}

/**
 * 태그 목록 반환 함수
 *
 * @param {string} type: 컨텐츠 타입
 *
 * @returns {string[]} 태그 목록
 */
export function getContentsTag(type: string): string[]
{
	const tags = [] as string[];

	getContentsList(type).forEach(content => content.header.tag.forEach(tag => tags.push(tag)));

	return [ ...new Set(tags) ];
}

/**
 * 카테고리별 컨텐츠 목록 반환 함수
 *
 * @param {string} type: 컨텐츠 타입
 * @param {string} category: 카테고리
 *
 * @returns {ContentProps[]} ContentProps 배열
 */
export function getContentsByCategory(type: string, category: string): ContentProps[]
{
	const names = fs.readdirSync(join(CONTENT_DIR, type)).filter(item => CONTENT_REGX.test(item));

	return names.map((name): ContentProps => getContent(type, name)).filter((item: ContentProps) => item.header.publish && item.header.category === category).sort((left, right): number => (new Date(right.header.date) > new Date(left.header.date) ? 1 : -1));
}

/**
 * 태그별 컨텐츠 목록 반환 함수
 *
 * @param {string} type: 컨텐츠 타입
 * @param {string} tag: 태그
 *
 * @returns {ContentProps[]} ContentProps 배열
 */
export function getContentsByTag(type: string, tag: string): ContentProps[]
{
	const names = fs.readdirSync(join(CONTENT_DIR, type)).filter(item => CONTENT_REGX.test(item));

	return names.map((name): ContentProps => getContent(type, name)).filter((item: ContentProps) => item.header.publish && item.header.tag.indexOf(tag) > -1).sort((left, right): number => (new Date(right.header.date) > new Date(left.header.date) ? 1 : -1));
}

/**
 * 컨텐츠 반환 함수
 *
 * @param {string} type: 타입
 * @param {string} name: 이름
 *
 * @returns {ContentProps} ContentProps
 */
export function getContent(type: string, name: string): ContentProps
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

	return {
		header: data as ContentHeaderProps,
		name: name,
		content: content,
		url: urls
	};
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
	loadLanguage([ 'javascript', 'java', 'html', 'css', 'json', 'scss' ]);

	const renderer = new marked.Renderer();

	const toc = [] as TocProps[];

	// 코드블럭 렌더링
	renderer.code = (code: string, lang: string | undefined): string =>
	{
		// 유효한 언어가 있을 경우
		if (lang && renderer?.options?.highlight)
		{
			if (lang === 'latex-block')
			{
				return `<div class="katex-block">${katex.renderToString(code, { throwOnError: true, output: 'html' })}</div>`;
			}

			else
			{
				code = renderer.options.highlight(code, lang as string) as string;

				const langClass = 'language-' + lang;

				return `
					<div class="codeblock">
						<div class="top">
							<p>${lang.toUpperCase()}</p>
							<div></div>
							<div></div>
							<div></div>
						</div>

						<button onclick="window.getSelection().selectAllChildren(this.parentElement.querySelector('code'));document.execCommand('copy');">COPY</button>

						<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>
					</div>
				`;
			}
		}

		// 없을 경우
		else
		{
			lang = 'unknown';

			const langClass = 'language-' + lang;

			return `
				<div class="codeblock">
					<div class="top">
						<p>${lang.toUpperCase()}</p>
						<div></div>
						<div></div>
						<div></div>
					</div>

					<button onclick="window.getSelection().selectAllChildren(this.parentElement.querySelector('code'));document.execCommand('copy');">COPY</button>

					<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>
				</div>
			`;
		}
	};

	// 코드라인 렌더링
	renderer.codespan = (code) =>
	{
		if (code[0] === '$')
		{
			return katex.renderToString(code.slice(1), { throwOnError: true, output: 'html' });
		}

		else
		{
			return `<code class="inline-code">${code}</code>`;
		}
	};

	// 헤더 렌더링
	renderer.heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6): string =>
	{
		const tag = text.replace(/(<([^>]+)>)/ig, '').replace(' ', '-');

		toc.push({
			text: text,
			tag: tag,
			depth: level
		});

		return `<h${level} id="${tag}">${text} <a href="#${tag}">🔗</a></h${level}>`;
	};

	// 테이블 렌더링
	renderer.table = (header: string, body: string): string =>
	{
		return `
			<div class="table-wrapper">
				<table>
					<thead>
						${header}
					</thead>

					<tbody>
						${body}
					</tbody>
				</table>
			</div>
		`;
	};

	const tokenizer = {
		codespan(src: string)
		{
			const match = src.match(/^([$])(?=[^\s$`])([^`$]*?)\1(?![$])/);

			if (match)
			{
				return {
					type: 'codespan',
					raw: match[0],
					text: match[1] === '$' ? `$${match[2].trim()}` : match[2].trim()
				};
			}

			return false;
		},
		inlineText(src: string)
		{
			const cap = src.match(/^([`$]+|[^`$])(?:[\s\S]*?(?:(?=[\\<!\[`$*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/);

			if (cap)
			{
				return {
					type: 'text',
					raw: cap[0],
					text: cap[0]
				};
			}

			return false;
		},
		fences(src: string)
		{
			const cap = src.match(/^ {0,3}(`{3,}|\${2,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`\$]* *(?:\n+|$)|$)/);

			if (cap)
			{
				return {
					type: 'code',
					raw: cap[0],
					codeBlockStyle: 'indented',
					lang: cap[1] === '$$' ? 'latex-block' : cap[2].trim(),
					text: cap[3]
				};
			}

			return false;
		}
	} as Partial<Omit<marked.Tokenizer<false>, 'constructor | options'>>;

	marked.use({ tokenizer });

	marked.setOptions({
		renderer,
		highlight: (code: string, language: string) =>
		{
			// Prism에 로딩된 언어일 경우
			if (Prism.languages[language])
			{
				return Prism.highlight(code, Prism.languages[language], language);
			}

			// 아닐 경우
			else
			{
				return code;
			}
		}
	});

	const result = marked(body);

	return {
		toc: toc,
		content: result.toString()
	};
}