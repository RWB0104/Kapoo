/**
 * 홈 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 12:22:46
 */

import BusinessCard from '@kapoo/organism/home/BusinessCard';
import HomeNewistMarkdownTemplate from '@kapoo/template/home/HomeNewistMarkdownTemplate';
import HomePopularPostsTemplate from '@kapoo/template/home/HomePopularPostsTemplate';
import HomePopularProjectsTemplate from '@kapoo/template/home/HomePopularProjectsTemplate';
import HomeScreenerTemplate from '@kapoo/template/home/HomeScreenerTemplate';
import HomeWelcomeTemplate from '@kapoo/template/home/HomeWelcomeTemplate';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export interface HomeTemplateProps
{
	/**
	 * 게시글 마크다운 리스트
	 */
	postsList: MarkdownListItemProps[];

	/**
	 * 프로젝트 마크다운 리스트
	 */
	projectsList: MarkdownListItemProps[];
}

/**
 * 홈 template 컴포넌트 JSX 반환 메서드
 *
 * @param {HomeTemplateProps} param0: HomeTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeTemplate({ postsList, projectsList }: HomeTemplateProps): ReactNode
{
	return (
		<Stack alignItems='center' data-component='HomeTemplate' spacing={10}>
			<HomeScreenerTemplate />
			<HomeWelcomeTemplate />
			<HomeNewistMarkdownTemplate markdownList={[ ...postsList, ...projectsList ]} />
			<HomePopularPostsTemplate markdownList={postsList} />
			<HomePopularProjectsTemplate markdownList={projectsList} />
			<BusinessCard />
		</Stack>
	);
}