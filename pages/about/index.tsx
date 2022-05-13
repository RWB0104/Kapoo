/**
 * 소개 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:37
 */

import {  TITLE } from '@commons/env';
import { useResetHook, useScreenImage } from '@commons/hook';
import { MENU_LIST } from '@commons/menulist';
import CommitList from '@components/about/CommitList';
import { NameCard } from '@components/about/NameCard';
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';

/**
 * 소개 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Posts(): JSX.Element
{
	useResetHook();

	const imageState = useScreenImage();

	return (
		<section>
			<Meta description={MENU_LIST[3].desc} title={MENU_LIST[3].title} url={MENU_LIST[3].url.pathname} />

			<Screener image={imageState} lower={MENU_LIST[3].desc} menu={MENU_LIST[3].title} title={TITLE} />

			<NameCard />
			<CommitList />
		</section>
	);
}