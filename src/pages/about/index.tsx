/**
 * 소개 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:37
 */

import { TITLE } from '@kapoo/commons/env';
import { useResetHook } from '@kapoo/commons/hook';
import { MENU_LIST } from '@kapoo/commons/menulist';
import CommitList from '@kapoo/components/about/CommitList';
import Info from '@kapoo/components/about/Info';
import NameCard from '@kapoo/components/about/NameCard';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';

/**
 * 소개 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Posts(): JSX.Element
{
	useResetHook();

	return (
		<section>
			<Meta description={MENU_LIST[3].desc} title={MENU_LIST[3].title} url={MENU_LIST[3].url.pathname} />

			<Screener lower={MENU_LIST[3].desc} menu={MENU_LIST[3].title} title={TITLE} />

			<Info />
			<NameCard />
			<CommitList />
		</section>
	);
}