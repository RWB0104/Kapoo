/**
 * 게시글 리스트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.21 Mon 19:00:50
 */

import MarkdownBox from '@kapoo/organism/markdown/MarkdownBox';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface PostsListTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 게시글 리스트 template 컴포넌트 JSX 반환 메서드
 *
 * @param {PostsListTemplateProps} param0: PostsListTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsListTemplate({ markdownList }: PostsListTemplateProps): ReactNode
{
	return (
		<Container data-component='PostsListTemplate'>
			<MarkdownBox markdownList={markdownList} />
		</Container>
	);
}