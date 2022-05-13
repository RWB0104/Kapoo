/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 14:19:40
 */

import { ContentTypeEnum } from '@commons/common';
import { TITLE } from '@commons/env';
import { useContents, useResetHook, useScreenImage } from '@commons/hook';
import { MENU_LIST } from '@commons/menulist';
import Artbox from '@components/global/Artbox';
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';
import ContentsCase from '@components/home/ContentsCase';

/**
 * 홈 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Home(): JSX.Element
{
	useResetHook();

	const imageState = useScreenImage();
	const postsState = useContents(ContentTypeEnum.POSTS);
	const projectsState = useContents(ContentTypeEnum.PROJECTS);

	return (
		<section>
			<Meta description={MENU_LIST[0].desc} title={MENU_LIST[0].title} url="" />

			<Screener image={imageState} lower={MENU_LIST[0].desc} menu={MENU_LIST[0].title} title={TITLE} />

			<ContentsCase list={postsState} num={5} title={MENU_LIST[1].title} url={MENU_LIST[1].url} />

			<Artbox />

			<ContentsCase list={projectsState} num={5} title={MENU_LIST[2].title} url={MENU_LIST[2].url} />
		</section>
	);
}