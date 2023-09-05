/**
 * 마크다운 뷰어 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.09.06 Wed 01:35:11
 */

'use client';

import MarkdownA from '@kapoo/organism/markdown/MarkdownA';
import MarkdownBlockquote from '@kapoo/organism/markdown/MarkdownBlockquote';
import MarkdownCell from '@kapoo/organism/markdown/MarkdownCell';
import MarkdownCodeBlock from '@kapoo/organism/markdown/MarkdownCodeBlock';
import MarkdownCodeInline from '@kapoo/organism/markdown/MarkdownCodeInline';
import MarkdownHeading from '@kapoo/organism/markdown/MarkdownHeading';
import MarkdownImg from '@kapoo/organism/markdown/MarkdownImg';
import MarkdownTable from '@kapoo/organism/markdown/MarkdownTable';
import MarkdownTr from '@kapoo/organism/markdown/MarkdownTr';

import classNames from 'classnames/bind';
import { ReactNode, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import styles from './MarkdownViewer.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownViewerProps
{
	/**
	 * 텍스트
	 */
	text: string;
}

/**
 * 마크다운 뷰어 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownViewerProps} param0: MarkdownViewerProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownViewer({ text }: MarkdownViewerProps): ReactNode
{
	const handleCode = useCallback((props: CodeProps) =>
	{
		const { inline, className } = props;

		const match = /language-(\w+)/.exec(className || '');

		// 코드 블럭일 경우
		if (match && !inline)
		{
			return <MarkdownCodeBlock languageName={match[1]} {...props} />;
		}

		return <MarkdownCodeInline {...props} />;
	}, []);

	return (
		<ReactMarkdown
			className={cn('markdown')}
			data-component='MarkdownViewer'
			rehypePlugins={[[ rehypeKatex, { output: 'mathml' }], rehypeRaw ]}
			remarkPlugins={[ remarkGfm, remarkMath ]}
			components={{
				a: MarkdownA,
				blockquote: MarkdownBlockquote,
				code: handleCode,
				h1: MarkdownHeading,
				h2: MarkdownHeading,
				h3: MarkdownHeading,
				h4: MarkdownHeading,
				h5: MarkdownHeading,
				h6: MarkdownHeading,
				img: MarkdownImg,
				table: MarkdownTable,
				td: MarkdownCell,
				th: MarkdownCell,
				tr: MarkdownTr
			}}
		>
			{text}
		</ReactMarkdown>
	);
}