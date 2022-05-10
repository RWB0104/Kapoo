/**
 * 포스트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 11:59:59
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// 사용자 모듈
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';
import ContentSearch from '@components/contents/ContentSearch';
import { CategoryProps, ContentProps, ContentTypeEnum, CONTENT_DIV, getRandomIndex, getUrlQuery } from '@commons/common';
import { TITLE } from '@commons/env';
import { MENU_LIST } from '@commons/menulist';
import { postsAtom, postsCategoryAtom, postsPageAtom, postsScrollAtom, postsSearchAtom } from '@commons/state';
import { useResetHook } from '@commons/hook';

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Posts(): JSX.Element | null
{
	const type = ContentTypeEnum.POSTS;

	const [ imageState, setImageState ] = useState('');
	const [ categoryState, setCategoryState ] = useState([] as CategoryProps[]);
	const [ refPostsState, setRefPostsState ] = useState([] as ContentProps[]);

	const [ postsState, setPostsState ] = useRecoilState(postsAtom);
	const [ postsPageState, setPostsPageState ] = useRecoilState(postsPageAtom);
	const [ postsSearchState, setPostsSearchState] = useRecoilState(postsSearchAtom);
	const [ postsCategoryState, setPostsCategoryState ] = useRecoilState(postsCategoryAtom);

	const postsScrollState = useRecoilValue(postsScrollAtom);

	useResetHook(ContentTypeEnum.PROJECTS);

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

			setRefPostsState(json.list as ContentProps[]);
			setPostsState(json.list as ContentProps[]);
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
			setPostsPageState(isNaN(pageNum) ? 1 : pageNum);
		}

		const search = query.filter(e => e.key === 'search');

		// 검색 키워드가 있을 경우
		if (search.length > 0)
		{
			setPostsSearchState(search[0].value);
		}

		// 검색 키워드가 없을 경우
		else
		{
			const categories = query.filter(e => e.key === 'category');

			// 카테고리가 있을 경우
			if (categories.length > 0)
			{
				setPostsCategoryState(categories.map(e => e.value));
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
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${postsPageState}&${postsCategoryState.map(e => 'category=' + e).join('&')}`);
			}

			// 페이지가 한 번 이상 넘어간 경우
			else if (postsPageState > 1)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?page=${postsPageState}`);
			}

			// 카테고리가 하나 이상 선택된 경우
			else if (postsCategoryState.length > 0)
			{
				window.history.replaceState(window.history.state, '', `${window.location.pathname}?${postsCategoryState.map(e => 'category=' + e).join('&')}`);
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
			temp = temp.filter(item =>
			{
				let { title, excerpt, tag } = item.header;
				title = title.replaceAll(/ /g, '').toLowerCase();
				excerpt = excerpt.replaceAll(/ /g, '').toLowerCase();
				tag = tag.map(item => item.replaceAll(/ /g, '').toLowerCase());

				const target = postsSearchState.replaceAll(/ /g, '').toLowerCase();

				return title.includes(target) || excerpt.includes(target) || tag.join(' ').includes(target);
			});

			console.log(111);
		}

		// 카테고리를 하나 이상 선택했을 경우
		else if (postsCategoryState.length > 0)
		{
			temp = temp.filter(item => postsCategoryState.indexOf(item.header.category) > -1);
		}

		setPostsState(temp);
	}, [ refPostsState, postsSearchState, postsCategoryState ]);

	return (
		<section>
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} />

			<Screener title={TITLE} menu={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={imageState} />

			<ContentSearch type={type} />
			<ContentCategory type={type} list={categoryState} />
			<ContentBoard list={postsState.slice(0, postsPageState * CONTENT_DIV)} />
		</section>
	);
}