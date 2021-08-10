import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Prism from 'prismjs';
import katex from 'katex';

const CONTENT_DIR = join(process.cwd(), '_posts');
const MD_REGX = /\.md$/;
const NAME_REGX = /^(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*)$/;

function getContent(type, name)
{
	// md 확장자가 없을 경우
	if (!MD_REGX.test(name))
	{
		name = `${name}.md`;
	}

	const path = join(CONTENT_DIR, type, name);
	const file = fs.readFileSync(path, 'utf-8');
	const urls = NAME_REGX.exec(name.replace(MD_REGX, ''));

	const { data, content } = matter(file);

	return {
		header: data,
		name: name,
		content: content,
		url: urls
	};
}

function converter(body)
{
	const renderer = new marked.Renderer();

	const toc = [];

	// 코드블럭 렌더링
	renderer.code = (code, lang) =>
	{
		// 유효한 언어가 있을 경우
		if (lang && renderer.options.highlight)
		{
			if (lang === 'latex-block')
			{
				return `<div class="katex-block">${katex.renderToString(code, { throwOnError: true, output: 'html' })}</div>`;
			}

			else
			{
				code = Prism.highlight(code, lang);
				console.dir(code);
				console.dir('========================================================================================================================');
				const langClass = 'language-' + lang;



				return `
					<div class="codeblock">
						<div class="top">
							<p>${lang.toUpperCase()}</p>
							<div></div>
							<div></div>
							<div></div>
						</div>

						<button onclick="window.getSelection().selectAllChildren(this.parentElement.querySelector('pre'));document.execCommand('copy');">COPY</button>

						<pre class="${langClass}">${code}</pre>
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

					<button onclick="window.getSelection().selectAllChildren(this.parentElement.querySelector('pre'));document.execCommand('copy');">COPY</button>

					<pre class="${langClass}">${code}</pre>
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
	renderer.heading = (text, level) =>
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
	renderer.table = (header, body) =>
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
		codespan(src)
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
		inlineText(src)
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
		fences(src)
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
	};

	marked.use({ tokenizer });

	marked.setOptions({
		renderer,
		highlight: (code, language) =>
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

const md = getContent('posts', '2021-08-04-about-algorithm-chapter09');
converter(md.content);