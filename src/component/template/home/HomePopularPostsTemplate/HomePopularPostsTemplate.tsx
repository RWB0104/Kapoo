/**
 * 홈 인기 게시글 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:47:48
 */

import HomePopularBox from '@kapoo/organism/home/HomePopularBox';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface HomePopularPostsTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 홈 인기 게시글 template 컴포넌트 JSX 반환 메서드
 *
 * @param {HomePopularPostsTemplateProps} param0: HomePopularPostsTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePopularPostsTemplate({ markdownList }: HomePopularPostsTemplateProps): ReactNode
{
	return (
		<Container data-component='HomePopularPostsTemplate'>
			<HomePopularBox markdownList={markdownList} type='posts' />
		</Container>
	);
}