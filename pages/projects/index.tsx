/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

// 사용자 모듈
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentCategory from '@components/contents/ContentCategory';
import ContentBoard from '@components/contents/ContentBoard';
import ContentSearch from '@components/contents/ContentSearch';
import { CategoryProps, ContentProps, CONTENT_DIV, getRandomIndex } from '@commons/common';
import { TITLE } from '@commons/env';
import { MENU_LIST } from '@commons/menulist';
import { postsCategoryAtom, postsPageAtom, postsSearchAtom, projectsCategoryAtom, projectsPageAtom, projectsSearchAtom } from '@commons/state';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Projects(): JSX.Element | null
{
	const type = 'projects';

	const [ projectsPageState, setProjectsPageState ] = useRecoilState(projectsPageAtom);
	const setPostsPageState = useSetRecoilState(postsPageAtom);

	const [ categoryState, setCategoryState ] = useState([] as CategoryProps[]);

	const [ selectProjectsCategoryState, setSelectProjectsCategoryState ] = useRecoilState(projectsCategoryAtom);
	const setSelectPostsCategoryState = useSetRecoilState(postsCategoryAtom);

	const [ projectsSearchState, setProjectsSearchState ] = useRecoilState(projectsSearchAtom);
	const setPostsSearchState = useSetRecoilState(postsSearchAtom);

	const [ imageState, setImageState ] = useState('');
	const [ projectsState, setProjectsState ] = useState([] as ContentProps[]);

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			if (projectsPageState < Math.ceil(projectsState.length / CONTENT_DIV) && window.scrollY > window.document.documentElement.scrollHeight - 1500)
			{
				setProjectsPageState(projectsPageState + 1);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	useEffect(() =>
	{
		setPostsPageState(1);
		setSelectPostsCategoryState([]);
		setPostsSearchState('');
	}, []);

	useEffect(() =>
	{
		(async () =>
		{
			const list = await fetch('/image.json');
			const json = await list.json();

			const index = getRandomIndex(json.list.length);

			setImageState(json.list[index]);
		})();

		(async () =>
		{
			const list = await fetch(`/${type}.json`);
			const json = await list.json();

			setProjectsState(json.list as ContentProps[]);
		})();

		(async () =>
		{
			const list = await fetch(`/${type}-category.json`);
			const json = await list.json();

			setCategoryState(json.list as CategoryProps[]);
		})();
	}, []);

	return (
		<section>
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} />

			<Screener title={TITLE} menu={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={imageState} />

			<ContentSearch search={projectsSearchState} setSearch={setProjectsSearchState} setPage={setProjectsPageState} setCategory={setSelectProjectsCategoryState} />
			<ContentCategory type={type} list={categoryState} select={selectProjectsCategoryState} setSelect={setSelectProjectsCategoryState} setPage={setProjectsPageState} />
			<ContentBoard list={projectsSearchState.length > 1 ? projectsState.filter(item =>
			{
				let { title, excerpt } = item.header;
				title = title.replaceAll(/ /g, '').toLowerCase();
				excerpt = excerpt.replaceAll(/ /g, '').toLowerCase();

				const target = projectsSearchState.replaceAll(/ /g, '').toLowerCase();

				return title.includes(target) || excerpt.includes(target);
			}).slice(0, 10 * projectsPageState) : selectProjectsCategoryState.length > 0 ? projectsState.filter(item => selectProjectsCategoryState.indexOf(item.header.category) > -1).slice(0, 10 * projectsPageState) : projectsState.slice(0, 10 * projectsPageState)} />
		</section>
	);
}