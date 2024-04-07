/**
 * 마크다운 td 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 11:18:05
 */

import Box from '@mui/material/Box';

export type MarkdownTdProps = Omit<JSX.IntrinsicElements['td'], 'ref'>;

/**
 * 마크다운 td 태그 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownTdProps} param0: MarkdownTdProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTd({ ...props }: MarkdownTdProps): JSX.Element
{
	return (
		<Box
			component='td'
			data-component='MarkdownTh'
			padding='8px 24px'
			whiteSpace='nowrap'
			{...props}
		/>
	);
}