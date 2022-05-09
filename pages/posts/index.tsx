/**
 * 포스트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 11:59:59
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

// 사용자 모듈
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';
import ContentSearch from '@components/contents/ContentSearch';
import { CategoryProps, ContentProps, CONTENT_DIV, getRandomIndex } from '@commons/common';
import { TITLE } from '@commons/env';
import { MENU_LIST } from '@commons/menulist';
import { postsCategoryAtom, postsPageAtom, postsSearchAtom, projectsCategoryAtom, projectsPageAtom, projectsSearchAtom } from '@commons/state';

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Posts(): JSX.Element | null
{
	const type = 'posts';

	const [ postsPageState, setPostsPageState ] = useRecoilState(postsPageAtom);
	const setProjectsPageState = useSetRecoilState(projectsPageAtom);

	const [ categoryState, setCategoryState ] = useState([] as CategoryProps[]);

	const [ selectPostCategoryState, setSelectPostsCategoryState ] = useRecoilState(postsCategoryAtom);
	const setSelectProjectsCategoryState = useSetRecoilState(projectsCategoryAtom);

	const [ postsSearchState, setPostsSearchState ] = useRecoilState(postsSearchAtom);
	const setProjectsSearchState = useSetRecoilState(projectsSearchAtom);

	const [ imageState, setImageState ] = useState('');
	const [ postsState, setPostsState ] = useState([] as ContentProps[]);

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			if (postsPageState < Math.ceil(postsState.length / CONTENT_DIV) && window.scrollY > window.document.documentElement.scrollHeight - 1500)
			{
				setPostsPageState(postsPageState + 1);
				console.dir(postsPageState);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	useEffect(() =>
	{
		setProjectsPageState(1);
		setSelectProjectsCategoryState([]);
		setProjectsSearchState('');
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

			setPostsState(json.list as ContentProps[]);
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
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={imageState} />

			<Screener title={TITLE} menu={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={imageState} />

			<ContentSearch search={postsSearchState} setSearch={setPostsSearchState} setPage={setPostsPageState} setCategory={setSelectPostsCategoryState} />
			<ContentCategory type={type} list={categoryState} select={selectPostCategoryState} setSelect={setSelectPostsCategoryState} setPage={setPostsPageState} />
			<ContentBoard list={postsSearchState.length > 1 ? postsState.filter(item =>
			{
				let { title, excerpt } = item.header;
				title = title.replaceAll(/ /g, '').toLowerCase();
				excerpt = excerpt.replaceAll(/ /g, '').toLowerCase();

				const target = postsSearchState.replaceAll(/ /g, '').toLowerCase();

				return title.includes(target) || excerpt.includes(target);
			}).slice(0, 10 * postsPageState) : selectPostCategoryState.length > 0 ? postsState.filter(item => selectPostCategoryState.indexOf(item.header.category) > -1).slice(0, 10 * postsPageState) : postsState.slice(0, 10 * postsPageState)} />
		</section>
	);
}