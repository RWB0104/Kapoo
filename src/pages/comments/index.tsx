/**
 * 코멘트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.05.14 Sat 00:38:22
 */

import { TITLE } from '@kapoo/commons/env';
import { useScreenImage } from '@kapoo/commons/hook';
import { MENU_LIST } from '@kapoo/commons/menulist';
import CommentLayout from '@kapoo/components/comments/CommentLayout';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';

/**
 * 코멘트 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Comments(): JSX.Element
{
	const imageState = useScreenImage();

	return (
		<section>
			<Meta description={MENU_LIST[4].desc} title={MENU_LIST[4].title} url={MENU_LIST[4].url.pathname} />

			<Screener image={imageState} lower={MENU_LIST[4].desc} menu={MENU_LIST[4].title} title={TITLE} />

			<CommentLayout />
		</section>
	);
}