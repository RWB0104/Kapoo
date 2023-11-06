/**
 * 마크다운 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.24 Thu 19:27:46
 */

import MarkdownCategory from '@kapoo/organism/markdown/MarkdownCategory';
import MarkdownInfiniteList from '@kapoo/organism/markdown/MarkdownInfiniteList';
import MarkdownSearch from '@kapoo/organism/markdown/MarkdownSearch';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export interface MarkdownBoxProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 마크다운 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownBoxProps} param0: MarkdownBoxProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownBox({ markdownList }: MarkdownBoxProps): ReactNode
{
	return (
		<Stack data-component='MarkdownBox' spacing={10}>
			<Stack spacing={4}>
				<MarkdownSearch />
				<MarkdownCategory markdown={markdownList} />
			</Stack>

			<MarkdownInfiniteList markdown={markdownList} />
		</Stack>
	);
}