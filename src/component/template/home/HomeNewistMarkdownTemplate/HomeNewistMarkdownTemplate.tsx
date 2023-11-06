/**
 * 홈 신규 컨텐츠 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.10 Sun 03:56:35
 */

import HomeNewistBox from '@kapoo/organism/home/HomeNewistBox';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface HomeNewistMarkdownTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 홈 신규 컨텐츠 template 컴포넌트 JSX 반환 메서드
 *
 * @param {HomeNewistMarkdownTemplateProps} param0: HomeNewistMarkdownTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeNewistMarkdownTemplate({ markdownList }: HomeNewistMarkdownTemplateProps): ReactNode
{
	return (
		<Container data-component='HomePopularPostsTemplate'>
			<HomeNewistBox markdownList={markdownList} />
		</Container>
	);
}