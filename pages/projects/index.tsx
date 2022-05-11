/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// 사용자 모듈
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentCategory from '@components/contents/ContentCategory';
import ContentBoard from '@components/contents/ContentBoard';
import ContentSearch from '@components/contents/ContentSearch';
import { CategoryProps, ContentProps, ContentTypeEnum, CONTENT_DIV, getRandomIndex, getUrlQuery } from '@commons/common';
import { TITLE } from '@commons/env';
import { MENU_LIST } from '@commons/menulist';
import { projectsAtom, projectsCategoryAtom, projectsPageAtom, projectsScrollAtom, projectsSearchAtom } from '@commons/state';
import { useResetHook } from '@commons/hook';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Projects(): JSX.Element | null
{
	const type = ContentTypeEnum.PROJECTS;

	const [ imageState, setImageState ] = useState('');
	const [ categoryState, setCategoryState ] = useState([] as CategoryProps[]);
	const [ refProjectsState, setRefProjectsState ] = useState([] as ContentProps[]);

	const [ projectsState, setProjectsState ] = useRecoilState(projectsAtom);
	const [ projectsPageState, setProjectsPageState ] = useRecoilState(projectsPageAtom);
	const [ projectsSearchState, setProjectsSearchState ] = useRecoilState(projectsSearchAtom);
	const [ projectsCategoryState, setProjectsCategoryState ] = useRecoilState(projectsCategoryAtom);

	const projectsScrollState = useRecoilValue(projectsScrollAtom);

	useResetHook(ContentTypeEnum.POSTS);

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			// 페이지 최대값에 도달하지 않은 상태에서, 정해진 위치까지 스크롤을 내렸을 경우
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

			setRefProjectsState(json.list as ContentProps[]);
			setProjectsState(json.list as ContentProps[]);
		})();

		(async () =>
		{
			const list = await fetch(`/${type}-category.json`);
			const json = await list.json();

			setCategoryState(json.list as CategoryProps[]);
		})();
	}, []);

	useEffect(() =>
	{
		const query = getUrlQuery(location);

		const page = query.filter(e => e.key === 'page');

		// 페이지가 있을 경우
		if (page.length > 0)
		{
			const pageNum = parseInt(page[0].value);
			setProjectsPageState(isNaN(pageNum) ? 1 : pageNum);
		}

		const search = query.filter(e => e.key === 'search');

		// 검색 키워드가 있을 경우
		if (search.length > 0)
		{
			setProjectsSearchState(search[0].value);
		}

		// 검색 키워드가 없을 경우
		else
		{
			const categories = query.filter(e => e.key === 'category');

			// 카테고리가 있을 경우
			if (categories.length > 0)
			{
				setProjectsCategoryState(categories.map(e => e.value));
			}
		}

		window.scrollTo(0, projectsScrollState);
	}, [ refProjectsState ]);

	useEffect(() =>
	{
		// 검색 키워드가 있을 경우
		if (projectsSearchState.length > 0)
		{
			// 페이지가 한 번 이상 넘어간 경우
			if (projectsPageState > 1)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${projectsPageState}&search=${projectsSearchState}`);
			}

			// 아닌 경우
			else
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?search=${projectsSearchState}`);
			}
		}

		// 검색 키워드가 없을 경우
		else
		{
			// 페이지가 한 번 이상 넘어가고, 카테고리가 하나 이상 선택된 경우
			if (projectsPageState > 1 && projectsCategoryState.length > 0)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${projectsPageState}&${projectsCategoryState.map(e => 'category=' + e).join('&')}`);
			}

			// 페이지가 한 번 이상 넘어간 경우
			else if (projectsPageState > 1)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${projectsPageState}`);
			}

			// 카테고리가 하나 이상 선택된 경우
			else if (projectsCategoryState.length > 0)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?${projectsCategoryState.map(e => 'category=' + e).join('&')}`);
			}

			// 기본 URL일 경우
			else
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}`);
			}
		}
	}, [ projectsPageState, projectsSearchState, projectsCategoryState ]);

	useEffect(() =>
	{
		let temp = refProjectsState.slice();

		// 검색 중일 경우
		if (projectsSearchState.length > 1)
		{
			temp = temp.filter(item =>
			{
				let { title, excerpt, tag } = item.header;
				title = title.replaceAll(/ /g, '').toLowerCase();
				excerpt = excerpt.replaceAll(/ /g, '').toLowerCase();
				tag = tag.map(item => item.replaceAll(/ /g, '').toLowerCase());

				const target = projectsSearchState.replaceAll(/ /g, '').toLowerCase();

				return title.includes(target) || excerpt.includes(target) || tag.join(' ').includes(target);
			});
		}

		// 카테고리를 하나 이상 선택했을 경우
		else if (projectsCategoryState.length > 0)
		{
			temp = temp.filter(item => projectsCategoryState.indexOf(item.header.category) > -1);
		}

		setProjectsState(temp);
	}, [ refProjectsState, projectsSearchState, projectsCategoryState ]);

	return (
		<section>
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} />

			<Screener title={TITLE} menu={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={imageState} />

			<ContentSearch type={type} />
			<ContentCategory type={type} list={categoryState} />
			<ContentBoard list={projectsState.slice(0, projectsPageState * CONTENT_DIV)} />
		</section>
	);
}