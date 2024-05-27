/**
 * 마크다운 a 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 04:15:58
 */

import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './MarkdownA.module.scss';

const cn = classNames.bind(styles);

export type MarkdownAProps = Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'ref'>

/**
 * 마크다운 a 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownAProps} param0: MarkdownAProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownA({ href = '#', children, ...props }: MarkdownAProps): JSX.Element
{
	return (
		<Link data-component='MarkdownA' href={href} target='_blank' {...props}>
			<Typography className={cn('link')} color='dodgerblue' component='span'>🔗 {children}</Typography>
		</Link>
	);
}