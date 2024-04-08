/**
 * 마크다운 table 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 11:05:08
 */

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, TableHTMLAttributes } from 'react';

import styles from './MarkdownTable.module.scss';

const cn = classNames.bind(styles);

export type MarkdownTableProps = DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;

/**
 * 마크다운 table 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownTableProps} param0: MarkdownTableProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTable({ className, ...props }: MarkdownTableProps): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='MarkdownTable' marginBottom={4} marginTop={4}>
			<Box maxWidth='100%' overflow='auto'>
				<table className={cn('table', className)} {...props} />
			</Box>
		</Stack>
	);
}