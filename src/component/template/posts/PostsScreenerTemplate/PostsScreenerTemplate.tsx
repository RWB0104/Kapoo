/**
 * 게시글 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:01:24
 */

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
			<ScreenerBox color='dodgerblue' name='게시글' text='🦙 뭔가 끄적끄적 쓰는 중...' />
		</Screener>
	);
}