/**
 * 마크다운 tr 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:18:10
 */

'use client';

import { themeStore } from '@kapoo/store/theme';

import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { TableRowProps } from 'react-markdown/lib/ast-to-react';

import styles from './MarkdownTr.module.scss';

const cn = classNames.bind(styles);

export type MarkdownTrProps = TableRowProps;

/**
 * 마크다운 tr 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownTrProps} param0: MarkdownTrProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownTr({ isHeader, className, ...props }: MarkdownTrProps): ReactNode
{
	const { theme } = themeStore();

	return (
		<tr
			className={cn('tr', { dark: theme === 'dark', header: isHeader }, className)}
			data-component='MarkdownTr'
			{...props}
		/>
	);
}