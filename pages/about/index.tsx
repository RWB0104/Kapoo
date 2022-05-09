/**
 * 소개 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:37
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

// 사용자 모듈
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import Artbox from '@components/global/Artbox';
import CommitList from '@components/about/CommitList';
import { getRandomIndex } from '@commons/common';
import {  TITLE } from '@commons/env';
import { MENU_LIST } from '@commons/menulist';
import { postsCategoryAtom, postsPageAtom, postsSearchAtom, projectsCategoryAtom, projectsPageAtom, projectsSearchAtom } from '@commons/state';

/**
 * 소개 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Posts(): JSX.Element | null
{
	const [ imageState, setImageState ] = useState('');

	const setPostsPageState = useSetRecoilState(postsPageAtom);
	const setProjectsPageState = useSetRecoilState(projectsPageAtom);

	const setSelectPostsCategoryState = useSetRecoilState(postsCategoryAtom);
	const setSelectProjectsCategoryState = useSetRecoilState(projectsCategoryAtom);

	const setPostsSearchState = useSetRecoilState(postsSearchAtom);
	const setProjectsSearchState = useSetRecoilState(projectsSearchAtom);

	useEffect(() =>
	{
		(async () =>
		{
			const list = await fetch('/image.json');
			const json = await list.json();

			const index = getRandomIndex(json.list.length);

			setImageState(json.list[index]);
		})();

		setPostsPageState(1);
		setProjectsPageState(1);

		setSelectPostsCategoryState([]);
		setSelectProjectsCategoryState([]);

		setPostsSearchState('');
		setProjectsSearchState('');
	}, []);

	return (
		<section>
			<Meta title={MENU_LIST[3].title} description={MENU_LIST[3].desc} url={MENU_LIST[3].url.pathname} image={imageState} />

			<Screener title={TITLE} menu={MENU_LIST[3].title} lower={MENU_LIST[3].desc} image={imageState} />

			<CommitList />

			<Artbox />
		</section>
	);
}