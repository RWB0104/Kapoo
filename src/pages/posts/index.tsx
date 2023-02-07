/**
 * 포스트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 11:59:59
 */

import { ContentTypeEnum, CONTENT_DIV, getUrlQuery } from '@kapoo/commons/common';
import { TITLE } from '@kapoo/commons/env';
import { useCategories, useContents, useResetHook, useScreenImage } from '@kapoo/commons/hook';
import { MENU_LIST } from '@kapoo/commons/menulist';
import { postsAtom, postsCategoryAtom, postsPageAtom, postsScrollAtom, postsSearchAtom } from '@kapoo/commons/state';
import ContentBoard from '@kapoo/components/contents/ContentBoard';
import ContentCategory from '@kapoo/components/contents/ContentCategory';
import ContentSearch from '@kapoo/components/contents/ContentSearch';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Posts(): JSX.Element
{
	useResetHook(ContentTypeEnum.PROJECTS);

	const type = ContentTypeEnum.POSTS;

	const [ postsState, setPostsState ] = useRecoilState(postsAtom);
	const [ postsPageState, setPostsPageState ] = useRecoilState(postsPageAtom);
	const [ postsSearchState, setPostsSearchState ] = useRecoilState(postsSearchAtom);
	const [ postsCategoryState, setPostsCategoryState ] = useRecoilState(postsCategoryAtom);

	const postsScrollState = useRecoilValue(postsScrollAtom);

	const imageState = useScreenImage();
	const refPostsState = useContents(type);
	const categoryState = useCategories(type);

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			// 페이지 최대값에 도달하지 않은 상태에서, 정해진 위치까지 스크롤을 내렸을 경우
			if (postsPageState < Math.ceil(postsState.length / CONTENT_DIV) && window.scrollY > window.document.documentElement.scrollHeight - 1500)
			{
				setPostsPageState(postsPageState + 1);
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
			setPostsPageState(Number.isNaN(pageNum) ? 1 : pageNum);
		}

		const search = query.filter((e) => e.key === 'search');

		// 검색 키워드가 있을 경우
		if (search.length > 0)
		{
			setPostsSearchState(search[0].value);
		}

		// 검색 키워드가 없을 경우
		else
		{
			const categories = query.filter((e) => e.key === 'category');

			// 카테고리가 있을 경우
			if (categories.length > 0)
			{
				setPostsCategoryState(categories.map((e) => e.value));
			}
		}

		window.scrollTo(0, postsScrollState);
	}, [ refPostsState ]);

	useEffect(() =>
	{
		// 검색 키워드가 있을 경우
		if (postsSearchState.length > 0)
		{
			// 페이지가 한 번 이상 넘어간 경우
			if (postsPageState > 1)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${postsPageState}&search=${postsSearchState}`);
			}

			// 아닌 경우
			else
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?search=${postsSearchState}`);
			}
		}

		// 검색 키워드가 없을 경우
		else
		{
			// 페이지가 한 번 이상 넘어가고, 카테고리가 하나 이상 선택된 경우
			if (postsPageState > 1 && postsCategoryState.length > 0)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${postsPageState}&${postsCategoryState.map((e) => `category=${e}`).join('&')}`);
			}

			// 페이지가 한 번 이상 넘어간 경우
			else if (postsPageState > 1)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${postsPageState}`);
			}

			// 카테고리가 하나 이상 선택된 경우
			else if (postsCategoryState.length > 0)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?${postsCategoryState.map((e) => `category=${e}`).join('&')}`);
			}

			// 기본 URL일 경우
			else
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}`);
			}
		}
	}, [ postsPageState, postsSearchState, postsCategoryState ]);

	useEffect(() =>
	{
		let temp = refPostsState.slice();

		// 검색 중일 경우
		if (postsSearchState.length > 1)
		{
			temp = temp.filter((item) =>
			{
				let { title, excerpt, tag } = item.header;
				title = title.replaceAll(/ /g, '').toLowerCase();
				excerpt = excerpt.replaceAll(/ /g, '').toLowerCase();
				tag = tag.map((t) => t.replaceAll(/ /g, '').toLowerCase());

				const target = postsSearchState.replaceAll(/ /g, '').toLowerCase();

				return title.includes(target) || excerpt.includes(target) || tag.join(' ').includes(target);
			});
		}

		// 카테고리를 하나 이상 선택했을 경우
		else if (postsCategoryState.length > 0)
		{
			temp = temp.filter((item) => postsCategoryState.indexOf(item.header.category) > -1);
		}

		setPostsState(temp);
	}, [ refPostsState, postsSearchState, postsCategoryState ]);

	return (
		<section>
			<Meta description={MENU_LIST[1].desc} title={MENU_LIST[1].title} url={MENU_LIST[1].url.pathname} />

			<Screener image={imageState} lower={MENU_LIST[1].desc} menu={MENU_LIST[1].title} title={TITLE} />

			<ContentSearch type={type} />
			<ContentCategory list={categoryState} type={type} />
			<ContentBoard list={postsState.slice(0, postsPageState * CONTENT_DIV)} />
		</section>
	);
}