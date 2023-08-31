/**
 * 마크다운 테이블 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:17:05
 */

import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, ReactNode, TableHTMLAttributes } from 'react';

import styles from './MarkdownTable.module.scss';

const cn = classNames.bind(styles);

export type MarkdownTableProps = DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;

/**
 * 마크다운 테이블 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownTableProps} param0: MarkdownTableProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownTable({ className, ...props }: MarkdownTableProps): ReactNode
{
	return (
		<Box data-component='MarkdownTable' marginBottom={4} marginTop={4} maxWidth='100%' overflow='auto'>
			<table className={cn('table', className)} {...props} />
		</Box>
	);
}