/**
 * 마크다운 a 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:03:49
 */

import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import styles from './MarkdownA.module.scss';

const cn = classNames.bind(styles);

export type MarkdownAProps = Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'ref' | 'onCopy'>;

/**
 * 마크다운 a 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownAProps} param0: MarkdownAProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownA({ href = '#', children, ...props }: MarkdownAProps): ReactNode
{
	return (
		<Link data-component='MarkdownA' href={href} target='_blank' {...props}>
			<Typography className={cn('link')} color='dodgerblue' component='span'>🔗 {children}</Typography>
		</Link>
	);
}