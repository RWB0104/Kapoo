/**
 * 뷰 컨텐츠 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.29 Tue 02:01:48
 */

'use client';

import MarkdownCodeBlock from '@kapoo/molecule/MarkdownCodeBlock';
import MarkdownCodeInline from '@kapoo/molecule/MarkdownCodeInline';
import MarkdownImg from '@kapoo/molecule/MarkdownImg';
import { viewStore } from '@kapoo/store/markdown';

import { ReactNode, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

/**
 * 뷰 컨텐츠 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewContentBox(): ReactNode
{
	const { view } = viewStore();

	const handleCode = useCallback((props: CodeProps) =>
	{
		const { inline, className } = props;

		const match = /language-(\w+)/.exec(className || '');

		if (match && !inline)
		{
			return <MarkdownCodeBlock languageName={match[1]} {...props} />;
		}

		return <MarkdownCodeInline {...props} />;
	}, []);

	return (
		<ReactMarkdown
			components={{ code: handleCode, img: MarkdownImg }}
			rehypePlugins={[ rehypeKatex ]}
			remarkPlugins={[ remarkGfm, remarkMath ]}
		>
			{view?.content || ''}
		</ReactMarkdown>
	);
}