/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

import { ContentTypeEnum } from '@kapoo/commons/common';
import { TITLE } from '@kapoo/commons/env';
import { MENU_LIST } from '@kapoo/commons/menulist';
import ContentBox from '@kapoo/components/contents/ContentBox';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Projects(): JSX.Element
{
	return (
		<section>
			<Meta description={MENU_LIST[2].desc} title={MENU_LIST[2].title} url={MENU_LIST[2].url.pathname} />

			<Screener lower={MENU_LIST[2].desc} menu={MENU_LIST[2].title} title={TITLE} />

			<ContentBox type={ContentTypeEnum.PROJECTS} />
		</section>
	);
}