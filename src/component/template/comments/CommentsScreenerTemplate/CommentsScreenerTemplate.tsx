/**
 * 방명록 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:08:16
 */

import { PAGE_INFO } from '@kapoo/env';
import Screener from '@kapoo/molecule/Screener';
import ScreenerBox from '@kapoo/organism/global/ScreenerBox';

import { ReactNode } from 'react';

/**
 * 방명록 스크리너 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} JSX
 */
export default function CommentsScreenerTemplate(): ReactNode
{
	return (
		<Screener>
			<ScreenerBox color='hotpink' name={PAGE_INFO.comments.title} text={PAGE_INFO.comments.description} />
		</Screener>
	);
}