/**
 * 마크다운 TOC 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.12 Fri 13:28:53
 */

import Box from '@mui/material/Box';
import Link from 'next/link';

export interface MarkdownTocListItem
{
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 레벨
	 */
	level: number;
}

export interface MarkdownTocBoxProps
{
	/**
	 * 마크다운 TOC 리스트
	 */
	list: MarkdownTocListItem[];
}

/**
 * 마크다운 TOC 박스 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownTocBoxProps} param0: MarkdownTocBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTocBox({ list }: MarkdownTocBoxProps): JSX.Element
{
	return (
		<Box component='ul' data-component='MarkdownTocBox'>
			{list.map(({ text, level }) => (
				<Box component='li' key={text} marginLeft={(level - 1) * 1}>
					<Link href={`#${text.replaceAll(' ', '-')}`}>
						{text}
					</Link>
				</Box>
			))}
		</Box>
	);
}