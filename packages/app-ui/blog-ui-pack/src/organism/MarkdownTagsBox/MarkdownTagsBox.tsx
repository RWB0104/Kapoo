/**
 * 마크다운 태그 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.30 Tue 21:38:58
 */

'use client';

import { themeStore } from '@kapoo/state';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MarkdownType } from '../../common';
import MarkdownTags from '../../molecule/MarkdownTags';

export interface MarkdownTagsBoxProps
{
	/**
	 * 타입
	 */
	type: MarkdownType;

	/**
	 * 태그
	 */
	tags: string[];
}

/**
 * 마크다운 태그 박스 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownTagsBoxProps} param0: MarkdownTagsBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTagsBox({ type, tags }: MarkdownTagsBoxProps): JSX.Element
{
	const { themeState } = themeStore();

	return (
		<Stack data-component='MarkdownTagsBox' gap={2}>
			<Typography variant='h6'>🏷️ 태그</Typography>

			<MarkdownTags
				color={type === 'posts' ? 'info' : 'success'}
				tags={tags}
				variant={themeState === 'light' ? 'filled' : 'outlined'}
			/>
		</Stack>
	);
}