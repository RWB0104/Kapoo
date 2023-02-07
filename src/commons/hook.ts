/**
 * 훅 컴포넌트
 *
 * @author RWB
 * @since 2022.05.02 Mon 22:53:48
 */

import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { ContentProps, ContentType, ContentTypeEnum } from './common';
import { postsCategoryAtom, postsPageAtom, postsSearchAtom, projectsCategoryAtom, projectsPageAtom, projectsSearchAtom, menuAtom, postsScrollAtom, projectsScrollAtom } from './state';

/**
 * 반응형 훅 메서드
 *
 * @returns {number} 반응형 여부
 */
export function useSemanticHook(): boolean
{
	const [ semanticState, setSemanticState ] = useState(true);

	useEffect(() =>
	{
		const handle = () => setSemanticState(window.innerWidth >= 960);

		window.addEventListener('resize', handle);

		handle();

		return () => window.removeEventListener('resize', handle);
	}, []);

	return semanticState;
}

/**
 * 스크롤 상단 훅 메서드
 *
 * @returns {boolean} 스크롤 상단 위치 여부
 */
export function useScrollTopHook(): boolean
{
	const menuState = useRecoilValue(menuAtom);
	const [ scrollState, setScrollState ] = useState(true);

	useEffect(() =>
	{
		const handle = () => setScrollState(window.scrollY === 0);

		window.addEventListener('scroll', handle);

		handle();

		return () => window.removeEventListener('scroll', handle);
	}, []);

	useEffect(() =>
	{
		if (window.scrollY === 0)
		{
			setScrollState(!menuState);
		}
	}, [ menuState ]);

	return scrollState;
}

/**
 * 리셋 훅 메서드
 *
 * @param {ContentType} type: 컨텐츠 타입
 */
export function useResetHook(type?: ContentType): void
{
	const setPostsPageState = useSetRecoilState(postsPageAtom);
	const setProjectsPageState = useSetRecoilState(projectsPageAtom);

	const setPostsCategoryState = useSetRecoilState(postsCategoryAtom);
	const setProjectsCategoryState = useSetRecoilState(projectsCategoryAtom);

	const setPostsSearchState = useSetRecoilState(postsSearchAtom);
	const setProjectsSearchState = useSetRecoilState(projectsSearchAtom);

	const setPostsScrollState = useSetRecoilState(postsScrollAtom);
	const setProjectsScrollState = useSetRecoilState(projectsScrollAtom);

	useEffect(() =>
	{
		// posts일 경우
		if (type === ContentTypeEnum.POSTS)
		{
			setPostsPageState(1);
			setPostsCategoryState([]);
			setPostsSearchState('');
			setPostsScrollState(0);
		}

		// projects일 경우
		else if (type === ContentTypeEnum.PROJECTS)
		{
			setProjectsPageState(1);
			setProjectsCategoryState([]);
			setProjectsSearchState('');
			setProjectsScrollState(0);
		}

		// 파라미터가 없을 경우
		else
		{
			setPostsPageState(1);
			setPostsCategoryState([]);
			setPostsSearchState('');
			setPostsScrollState(0);

			setProjectsPageState(1);
			setProjectsCategoryState([]);
			setProjectsSearchState('');
			setProjectsScrollState(0);
		}
	}, []);
}

/**
 * 컨텐츠 훅 메서드
 *
 * @param {ContentType} type: 컨텐츠 타입
 *
 * @returns {ContentProps[]} 컨텐츠 객체 배열
 */
export function useContents(type: ContentType): ContentProps[]
{
	const [ state, setState ] = useState<ContentProps[]>([]);

	useEffect(() =>
	{
		(async () =>
		{
			const list = await fetch(`/${type}.json`);
			const json = await list.json();

			setState(json.list as ContentProps[]);
		})();
	}, []);

	return state;
}