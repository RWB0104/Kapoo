/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 14:19:40
 */

import { ContentProps, ContentTypeEnum } from '@kapoo/commons/common';
import { TITLE } from '@kapoo/commons/env';
import { useContents, usePopularPage, useResetHook, useScreenImage } from '@kapoo/commons/hook';
import { MENU_LIST } from '@kapoo/commons/menulist';
import Artbox from '@kapoo/components/global/Artbox';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';
import ContentsCase from '@kapoo/components/home/ContentsCase';
import { useEffect, useState } from 'react';

/**
 * 홈 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Home(): JSX.Element
{
	useResetHook();

	const [ postsPopularState, setPostsPopularState ] = useState<ContentProps[]>([]);
	const [ projectsPopularState, setProjectsPopularState ] = useState<ContentProps[]>([]);

	const imageState = useScreenImage();
	const postsState = useContents(ContentTypeEnum.POSTS);
	const projectsState = useContents(ContentTypeEnum.PROJECTS);
	const postsPopular = usePopularPage(ContentTypeEnum.POSTS);
	const projectsPopular = usePopularPage(ContentTypeEnum.PROJECTS);

	useEffect(() =>
	{
		const postsPopularUrls: string[] = postsPopular ? postsPopular.rows.map((item) => item.dimensionValues[0].value.replace(/.html$/, '')) : [];

		const postsPopularList = postsPopularUrls ? postsPopularUrls.reduce((acc, item) =>
		{
			const target = postsState.find((content) => `/${content.header.type}/${content.url[1]}/${content.url[2]}/${content.url[3]}/${content.url[4]}` === item);

			if (target)
			{
				acc.push(target);
			}

			return acc;
		}, [] as ContentProps[]) : [];

		setPostsPopularState(postsPopularList);
	}, [ postsState, postsPopular ]);

	useEffect(() =>
	{
		const projectsPopularUrls = projectsPopular ? projectsPopular.rows.map((item) => item.dimensionValues[0].value.replace(/.html$/, '')) : [];

		const projectsPostsPopularList = projectsPopularUrls ? projectsPopularUrls.reduce((acc, item) =>
		{
			const target = projectsState.find((content) => `/${content.header.type}/${content.url[1]}/${content.url[2]}/${content.url[3]}/${content.url[4]}` === item);

			if (target)
			{
				acc.push(target);
			}

			return acc;
		}, [] as ContentProps[]) : [];

		setProjectsPopularState(projectsPostsPopularList);
	}, [ projectsState, projectsPopular ]);

	return (
		<section>
			<Meta description={MENU_LIST[0].desc} title={MENU_LIST[0].title} url='' />

			<Screener image={imageState} lower={MENU_LIST[0].desc} menu={MENU_LIST[0].title} title={TITLE} />

			<ContentsCase list={postsPopularState} num={10} title='Posts Popular' url={MENU_LIST[1].url} />

			<Artbox />

			<ContentsCase list={projectsPopularState} num={10} title='Projects Popular' url={MENU_LIST[2].url} />
		</section>
	);
}