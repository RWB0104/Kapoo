/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';

// 사용자 모듈
import { CategoryProps, ContentProps, CONTENT_DIV, getRandomIndex } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentCategory from '@components/contents/ContentCategory';
import ContentBoard from '@components/contents/ContentBoard';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Projects(): JSX.Element | null
{
	const type = 'projects';

	const [ pageState, setPageState ] = useState(1);
	const [ categoryState, setCategoryState ] = useState([] as CategoryProps[]);
	const [ selectCategoryState, setSelectCategoryState ] = useState([] as string[]);

	const [ imageState, setImageState ] = useState('');
	const [ projectsState, setProjectsState ] = useState([] as ContentProps[]);

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			if (pageState < Math.ceil(projectsState.length / CONTENT_DIV) && window.scrollY > window.document.documentElement.scrollHeight - 1500)
			{
				setPageState(pageState + 1);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	useEffect(() => setPageState(1), [ categoryState ]);

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
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={imageState} />

			<Screener title={TITLE} menu={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={imageState} />

			<ContentCategory type={type} list={categoryState} select={selectCategoryState} setSelect={setSelectCategoryState} />

			<ContentBoard list={selectCategoryState.length > 0 ? projectsState.filter(item => selectCategoryState.indexOf(item.header.category) > -1).slice(0, 10 * pageState) : projectsState.slice(0, 10 * pageState)} />
		</section>
	);
}