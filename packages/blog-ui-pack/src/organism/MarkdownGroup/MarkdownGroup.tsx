/**
 * 마크다운 그룹 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.15 Mon 02:25:29
 */

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { BlogMarkdownDetailGroupProps } from '../../common';

export interface MarkdownGroupProps
{
	/**
	 * 그룹 리스트
	 */
	groups: BlogMarkdownDetailGroupProps[];
}

/**
 * 마크다운 그룹 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownGroupProps} param0: MarkdownGroupProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownGroup({ groups }: MarkdownGroupProps): JSX.Element
{
	return (
		<Stack data-component='MarkdownGroup'>
			<Box component='ul'>
				{groups.map(({ title, url }) => (
					<Box component='li' key={url}>
						<Link href={url}>
							{title}
						</Link>
					</Box>
				))}
			</Box>
		</Stack>
	);
}