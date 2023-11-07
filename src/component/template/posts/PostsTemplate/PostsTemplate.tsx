/**
 * 게시글 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.20 Sun 02:10:03
 */

import PostsListTemplate from '@kapoo/template/posts/PostsListTemplate';
import PostsScreenerTemplate from '@kapoo/template/posts/PostsScreenerTemplate';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export interface PostsTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 게시글 template 컴포넌트 JSX 반환 메서드
 *
 * @param {PostsTemplateProps} param0: PostsTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsTemplate({ markdownList }: PostsTemplateProps): ReactNode
{
	return (
		<Stack alignItems='center' data-component='PostsTemplate' spacing={10} width='100%'>
			<PostsScreenerTemplate />
			<PostsListTemplate markdownList={markdownList} />
		</Stack>
	);
}