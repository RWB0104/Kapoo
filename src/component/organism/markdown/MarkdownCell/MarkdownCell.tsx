/**
 * 마크다운 테이블 셀 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:11:28
 */

import Box from '@mui/material/Box';
import { ReactNode, useMemo } from 'react';
import { TableDataCellProps, TableHeaderCellProps } from 'react-markdown/lib/ast-to-react';

export type MarkdownCellProps = TableHeaderCellProps | TableDataCellProps;

/**
 * 마크다운 테이블 셀 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownCellProps} param0: MarkdownCellProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownCell({ isHeader, ...props }: MarkdownCellProps): ReactNode
{
	const component = useMemo(() => (isHeader ? 'th' : 'td'), [ isHeader ]);

	return (
		<Box
			component={component}
			data-component='MarkdownCell'
			padding='8px 24px'
			whiteSpace='nowrap'
			{...props}
		/>
	);
}