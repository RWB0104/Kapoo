/**
 * 게시글 리스트 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.21 월 18:59:09
 */

import InfiniteScroller, { InfiniteScrollerFetchHandler } from '@kapoo/molecule/InfiniteScroller';
import { MarkdownListProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export interface PostsListProps
{
	/**
	 * 리스트
	 */
	list: MarkdownListProps[];

	/**
	 * 마지막 여부
	 */
	isLast?: boolean;

	/**
	 * fetch 메서드
	 */
	onFetch?: InfiniteScrollerFetchHandler;
}

/**
 * 게시글 리스트 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {PostsListProps} param0: PostsListProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsList({ list, isLast, onFetch }: PostsListProps): ReactNode
{
	return (
		<InfiniteScroller isLast={isLast} onFetch={onFetch}>
			<Stack>
				{list.map((i) => <Typography key={i.url}>{i.frontmatter.title}</Typography>)}
			</Stack>
		</InfiniteScroller>
	);
}