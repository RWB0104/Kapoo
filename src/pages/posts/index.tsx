/**
 * 포스트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 11:59:59
 */

import { ContentTypeEnum } from '@kapoo/commons/common';
import { TITLE } from '@kapoo/commons/env';
import { MENU_LIST } from '@kapoo/commons/menulist';
import ContentBox from '@kapoo/components/contents/ContentBox';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Posts(): JSX.Element
{
	return (
		<section>
			<Meta description={MENU_LIST[1].desc} title={MENU_LIST[1].title} url={MENU_LIST[1].url.pathname} />

			<Screener lower={MENU_LIST[1].desc} menu={MENU_LIST[1].title} title={TITLE} />

			<ContentBox type={ContentTypeEnum.POSTS} />
		</section>
	);
}