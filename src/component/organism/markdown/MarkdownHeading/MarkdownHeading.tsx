/**
 * 마크다운 헤딩 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:14:43
 */

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';
import { HeadingProps } from 'react-markdown/lib/ast-to-react';

import styles from './MarkdownHeading.module.scss';

const cn = classNames.bind(styles);

export type MarkdownHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type MarkdownHeadingProps = HeadingProps;

/**
 * 마크다운 헤딩 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownHeadingProps} param0: MarkdownHeadingProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownHeading({ level, children, ...props }: MarkdownHeadingProps): ReactNode
{
	const href = useMemo(() => String(children).replaceAll(' ', '-').toLowerCase(), [ children ]);

	const tag = useMemo(() =>
	{
		const child = (
			<Link
				href={`#${href}`}
				id={href}
			>
				<Stack>
					{children}

					<Box paddingTop={1}>
						<Divider />
					</Box>
				</Stack>
			</Link>
		);

		switch (level)
		{
			case 1: return (
				<h1 className={cn('heading', `h${level}`)} data-component='MarkdownHeading' {...props}>
					{child}
				</h1>
			);

			case 2: return (
				<h2 className={cn('heading', `h${level}`)} data-component='MarkdownHeading' {...props}>
					{child}
				</h2>
			);

			case 3: return (
				<h3 className={cn('heading', `h${level}`)} data-component='MarkdownHeading' {...props}>
					{child}
				</h3>
			);

			case 4: return (
				<h4 className={cn('heading', `h${level}`)} data-component='MarkdownHeading' {...props}>
					{child}
				</h4>
			);

			case 5: return (
				<h5 className={cn('heading', `h${level}`)} data-component='MarkdownHeading' {...props}>
					{child}
				</h5>
			);

			default: return (
				<h6 className={cn('heading', `h${level}`)} data-component='MarkdownHeading' {...props}>
					{child}
				</h6>
			);
		}
	}, [ href, level, children, props ]);

	return tag;
}