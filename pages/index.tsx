/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 14:19:40
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';

// 사용자 모듈
import Artbox from '@components/global/Artbox';
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentsCase from '@components/home/ContentsCase';
import { MENU_LIST } from '@commons/menulist';
import { ContentProps, getRandomIndex } from '@commons/common';
import { TITLE } from '@commons/env';
import { useResetHook } from '@commons/hook';

/**
 * 홈 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Home(): JSX.Element | null
{
	const [ imageState, setImageState ] = useState('');
	const [ postsState, setPostsState ] = useState([] as ContentProps[]);
	const [ projectsState, setProjectsState ] = useState([] as ContentProps[]);

	useResetHook();

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
			const list = await fetch('/posts.json');
			const json = await list.json();

			setPostsState(json.list as ContentProps[]);
		})();

		(async () =>
		{
			const list = await fetch('/projects.json');
			const json = await list.json();

			setProjectsState(json.list as ContentProps[]);
		})();
	}, []);

	return (
		<section>
			<Meta title={MENU_LIST[0].title} description={MENU_LIST[0].desc} url="" />

			<Screener title={TITLE} menu={MENU_LIST[0].title} lower={MENU_LIST[0].desc} image={imageState} />

			<ContentsCase num={5} title={MENU_LIST[1].title} url={MENU_LIST[1].url} list={postsState} />

			<Artbox />

			<ContentsCase num={5} title={MENU_LIST[2].title} url={MENU_LIST[2].url} list={projectsState} />
		</section>
	);
}