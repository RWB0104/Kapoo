/**
 * 게시글 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:01:24
 */

import { PAGE_INFO } from '@kapoo/env';
import Screener from '@kapoo/molecule/Screener';
import ScreenerBox from '@kapoo/organism/global/ScreenerBox';

import { ReactNode } from 'react';

/**
 * 게시글 스크리너 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} JSX
 */
export default function PostsScreenerTemplate(): ReactNode
{
	return (
		<Screener>
			<ScreenerBox color='dodgerblue' name={PAGE_INFO.posts.title} text={PAGE_INFO.posts.description} />
		</Screener>
	);
}