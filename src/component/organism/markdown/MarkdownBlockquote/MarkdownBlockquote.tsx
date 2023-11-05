/**
 * 마크다운 blockquote 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:10:17
 */

'use client';

import { themeStore } from '@kapoo/store/theme';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { BlockquoteHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type MarkdownBlockquoteProps = DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;

/**
 * 마크다운 blockquote 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownBlockquoteProps} param0: MarkdownBlockquoteProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownBlockquote({ children }: MarkdownBlockquoteProps): ReactNode
{
	const { theme } = themeStore();

	return (
		<Box data-component='MarkdownBlockquote' padding={2} paddingBottom={4} paddingTop={4}>
			<Alert severity='info' variant={theme === 'light' ? 'standard' : 'outlined'}>
				<AlertTitle>메모</AlertTitle>

				{children}
			</Alert>
		</Box>
	);
}