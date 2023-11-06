/**
 * 홈 인기 프로젝트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:49:34
 */

import HomePopularBox from '@kapoo/organism/home/HomePopularBox';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface HomePopularProjectsTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 홈 인기 프로젝트 template 컴포넌트 JSX 반환 메서드
 *
 * @param {HomePopularProjectsTemplateProps} param0: HomePopularProjectsTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePopularProjectsTemplate({ markdownList }: HomePopularProjectsTemplateProps): ReactNode
{
	return (
		<Container data-component='HomePopularProjectsTemplate'>
			<HomePopularBox markdownList={markdownList} type='projects' />
		</Container>
	);
}