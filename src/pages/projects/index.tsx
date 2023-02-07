/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

import { ContentTypeEnum, CONTENT_DIV, getUrlQuery } from '@kapoo/commons/common';
import { TITLE } from '@kapoo/commons/env';
import { useCategories, useContents, useResetHook, useScreenImage } from '@kapoo/commons/hook';
import { MENU_LIST } from '@kapoo/commons/menulist';
import { projectsAtom, projectsCategoryAtom, projectsPageAtom, projectsScrollAtom, projectsSearchAtom } from '@kapoo/commons/state';
import ContentBoard from '@kapoo/components/contents/ContentBoard';
import ContentCategory from '@kapoo/components/contents/ContentCategory';
import ContentSearch from '@kapoo/components/contents/ContentSearch';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Projects(): JSX.Element
{
	useResetHook(ContentTypeEnum.POSTS);

	const type = ContentTypeEnum.PROJECTS;

	const [ projectsState, setProjectsState ] = useRecoilState(projectsAtom);
	const [ projectsPageState, setProjectsPageState ] = useRecoilState(projectsPageAtom);
	const [ projectsSearchState, setProjectsSearchState ] = useRecoilState(projectsSearchAtom);
	const [ projectsCategoryState, setProjectsCategoryState ] = useRecoilState(projectsCategoryAtom);

	const projectsScrollState = useRecoilValue(projectsScrollAtom);

	const imageState = useScreenImage();
	const refProjectsState = useContents(type);
	const categoryState = useCategories(type);

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
		const query = getUrlQuery(window.location);

		const page = query.filter((e) => e.key === 'page');

		// 페이지가 있을 경우
		if (page.length > 0)
		{
			const pageNum = parseInt(page[0].value, 10);
			setProjectsPageState(Number.isNaN(pageNum) ? 1 : pageNum);
		}

		const search = query.filter((e) => e.key === 'search');

		// 검색 키워드가 있을 경우
		if (search.length > 0)
		{
			setProjectsSearchState(search[0].value);
		}

		// 검색 키워드가 없을 경우
		else
		{
			const categories = query.filter((e) => e.key === 'category');

			// 카테고리가 있을 경우
			if (categories.length > 0)
			{
				setProjectsCategoryState(categories.map((e) => e.value));
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
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${projectsPageState}&${projectsCategoryState.map((e) => `category=${e}`).join('&')}`);
			}

			// 페이지가 한 번 이상 넘어간 경우
			else if (projectsPageState > 1)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${projectsPageState}`);
			}

			// 카테고리가 하나 이상 선택된 경우
			else if (projectsCategoryState.length > 0)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?${projectsCategoryState.map((e) => `category=${e}`).join('&')}`);
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
			temp = temp.filter((item) =>
			{
				let { title, excerpt, tag } = item.header;
				title = title.replaceAll(/ /g, '').toLowerCase();
				excerpt = excerpt.replaceAll(/ /g, '').toLowerCase();
				tag = tag.map((t) => t.replaceAll(/ /g, '').toLowerCase());

				const target = projectsSearchState.replaceAll(/ /g, '').toLowerCase();

				return title.includes(target) || excerpt.includes(target) || tag.join(' ').includes(target);
			});
		}

		// 카테고리를 하나 이상 선택했을 경우
		else if (projectsCategoryState.length > 0)
		{
			temp = temp.filter((item) => projectsCategoryState.indexOf(item.header.category) > -1);
		}

		setProjectsState(temp);
	}, [ refProjectsState, projectsSearchState, projectsCategoryState ]);

	return (
		<section>
			<Meta description={MENU_LIST[2].desc} title={MENU_LIST[2].title} url={MENU_LIST[2].url.pathname} />

			<Screener image={imageState} lower={MENU_LIST[2].desc} menu={MENU_LIST[2].title} title={TITLE} />

			<ContentSearch type={type} />
			<ContentCategory list={categoryState} type={type} />
			<ContentBoard list={projectsState.slice(0, projectsPageState * CONTENT_DIV)} />
		</section>
	);
}