/**
 * 마크다운 뷰어 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 03:53:53
 */

'use client';

import { PaletteMode } from '@mui/material';
import classNames from 'classnames/bind';
import { BlockquoteHTMLAttributes, ClassAttributes, HTMLAttributes, ThHTMLAttributes, useCallback } from 'react';
import ReactMarkdown, { ExtraProps, Options } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import styles from './MarkdownViewer.module.scss';
import MarkdownA from './sub/MarkdownA';
import MarkdownBlockquote from './sub/MarkdownBlockquote';
import MarkdownCodeBlock from './sub/MarkdownCodeBlock';
import MarkdownCodeInline from './sub/MarkdownCodeInline';
import MarkdownHeading, { MarkdownHeadingLevel } from './sub/MarkdownHeading';
import MarkdownTable from './sub/MarkdownTable';
import MarkdownTd from './sub/MarkdownTd';
import MarkdownTh from './sub/MarkdownTh';
import MarkdownTr from './sub/MarkdownTr';

const cn = classNames.bind(styles);

type BlockquoteType = ClassAttributes<HTMLQuoteElement> & BlockquoteHTMLAttributes<HTMLQuoteElement> & ExtraProps;
type CodeType = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps;
type HeadingType = ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps;
type ThType = ClassAttributes<HTMLElement> & ThHTMLAttributes<HTMLElement> & ExtraProps;
type TrType = ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement> & ExtraProps;

export interface MarkdownViewerProps extends Options
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;
}

/**
 * 마크다운 뷰어 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownViewerProps} param0: MarkdownViewerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownViewer({ theme, className, ...props }: MarkdownViewerProps): JSX.Element
{
	const getBlockquote = useCallback((props: BlockquoteType) => <MarkdownBlockquote theme={theme} {...props} />, [ theme ]);
	const getCode = useCallback((props: CodeType) =>
	{
		const regex = /^(language-)(.*?)$/.exec(props.className || '');

		// 정규식이 일치할 경우
		if (regex && regex[2])
		{
			return <MarkdownCodeBlock languageName={regex[2]} theme={theme} {...props} />;
		}

		return <MarkdownCodeInline theme={theme} {...props} />;
	}, [ theme ]);
	const getHeadingTag = useCallback((props: HeadingType, level: MarkdownHeadingLevel) => <MarkdownHeading level={level} {...props} />, []);
	const getTh = useCallback((props: ThType) => <MarkdownTh theme={theme} {...props} />, [ theme ]);
	const getTr = useCallback((props: TrType) => <MarkdownTr theme={theme} {...props} />, [ theme ]);

	return (
		<ReactMarkdown
			className={cn('markdown', className)}
			data-component='MarkdownViewer'
			rehypePlugins={[[ rehypeKatex, { output: 'mathml' }], rehypeRaw ]}
			remarkPlugins={[ remarkGfm, remarkMath ]}
			components={{
				a: MarkdownA,
				blockquote: (props) => getBlockquote(props),
				code: (props) => getCode(props),
				h1: (props) => getHeadingTag(props, 1),
				h2: (props) => getHeadingTag(props, 2),
				h3: (props) => getHeadingTag(props, 3),
				h4: (props) => getHeadingTag(props, 4),
				h5: (props) => getHeadingTag(props, 5),
				h6: (props) => getHeadingTag(props, 6),
				table: MarkdownTable,
				td: MarkdownTd,
				th: (props) => getTh(props),
				tr: (props) => getTr(props)
			}}
			{...props}
		/>
	);
}