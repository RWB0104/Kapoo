/**
 * 마크다운 헤딩 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 04:45:26
 */

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react';

import styles from './MarkdownHeading.module.scss';

const cn = classNames.bind(styles);

export type MarkdownHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkdownHeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
{
	/**
	 * 레벨
	 */
	level: MarkdownHeadingLevel;
}

/**
 * 마크다운 헤딩 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownHeadingProps} param0: MarkdownHeadingProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownHeading({ level, className, children, ...props }: MarkdownHeadingProps): JSX.Element
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
			<h1 className={cn('heading', `h${level}`, className)} data-component='MarkdownHeading' {...props}>
				{child}
			</h1>
		);

		case 2: return (
			<h2 className={cn('heading', `h${level}`, className)} data-component='MarkdownHeading' {...props}>
				{child}
			</h2>
		);

		case 3: return (
			<h3 className={cn('heading', `h${level}`, className)} data-component='MarkdownHeading' {...props}>
				{child}
			</h3>
		);

		case 4: return (
			<h4 className={cn('heading', `h${level}`, className)} data-component='MarkdownHeading' {...props}>
				{child}
			</h4>
		);

		case 5: return (
			<h5 className={cn('heading', `h${level}`, className)} data-component='MarkdownHeading' {...props}>
				{child}
			</h5>
		);

		default: return (
			<h6 className={cn('heading', `h${level}`, className)} data-component='MarkdownHeading' {...props}>
				{child}
			</h6>
		);
		}
	}, [ href, level, className, children, props ]);

	return tag;
}