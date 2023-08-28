/**
 * 마크다운 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.24 Thu 19:27:46
 */

'use client';

import MarkdownCategory from '@kapoo/organism/markdown/MarkdownCategory';
import MarkdownList from '@kapoo/organism/markdown/MarkdownList';
import MarkdownSearch from '@kapoo/organism/markdown/MarkdownSearch';
import { postsStore, projectsStore } from '@kapoo/store/markdown';
import { MarkdownType } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export interface MarkdownBoxProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;
}

/**
 * 마크다운 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownBoxProps} param0: MarkdownBoxProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownBox({ type }: MarkdownBoxProps): ReactNode
{
	const posts = postsStore();
	const projects = projectsStore();

	const markdown = {
		posts: posts.markdown,
		projects: projects.markdown
	};

	return (
		<Stack data-component='MarkdownBox' spacing={10}>
			<Stack spacing={4}>
				<MarkdownSearch />
				<MarkdownCategory markdown={markdown[type]} />
			</Stack>

			<MarkdownList markdown={markdown[type]} />
		</Stack>
	);
}