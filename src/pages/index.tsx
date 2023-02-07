/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 14:19:40
 */

import { ContentTypeEnum } from '@kapoo/commons/common';
import { TITLE } from '@kapoo/commons/env';
import { MENU_LIST } from '@kapoo/commons/menulist';
import { useGetContents, useGetGooglePopularData, useGetPopularContents } from '@kapoo/commons/query';
import Artbox from '@kapoo/components/global/Artbox';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';
import ContentsCase from '@kapoo/components/home/ContentsCase';

/**
 * 홈 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Home(): JSX.Element
{
	const { data: postsContents } = useGetContents(ContentTypeEnum.POSTS);
	const { data: projectsContents } = useGetContents(ContentTypeEnum.PROJECTS);

	const { data: postsPopularContents, isLoading: postsPopularContentsLoading } = useGetGooglePopularData(ContentTypeEnum.POSTS);
	const { data: projectsPopularContents, isLoading: projectsPopularContentsLoading } = useGetGooglePopularData(ContentTypeEnum.PROJECTS);

	const { data: postsPopularData, isLoading: postsPopularLoading } = useGetPopularContents(ContentTypeEnum.POSTS, postsContents, postsPopularContents);
	const { data: projectsPopularData, isLoading: projectsPopularLoading } = useGetPopularContents(ContentTypeEnum.PROJECTS, projectsContents, projectsPopularContents);

	return (
		<section>
			<Meta description={MENU_LIST[0].desc} title={MENU_LIST[0].title} url='' />

			<Screener lower={MENU_LIST[0].desc} menu={MENU_LIST[0].title} title={TITLE} />

			<ContentsCase list={postsPopularData || []} loading={postsPopularContentsLoading || postsPopularLoading} num={10} title='Posts Popular' url={MENU_LIST[1].url} />

			<Artbox />

			<ContentsCase list={projectsPopularData || []} loading={projectsPopularContentsLoading || projectsPopularLoading} num={10} title='Projects Popular' url={MENU_LIST[2].url} />
		</section>
	);
}