/**
 * 홈 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 05:26:46
 */

import { PAGE_INFO } from '@kapoo/env';
import Screener from '@kapoo/molecule/Screener';
import ScreenerBox from '@kapoo/organism/global/ScreenerBox';

import { ReactNode } from 'react';

/**
 * 홈 스크리너 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} JSX
 */
export default function HomeScreenerTemplate(): ReactNode
{
	return (
		<Screener>
			<ScreenerBox color='gold' name={PAGE_INFO.index.title} text={PAGE_INFO.index.description} />
		</Screener>
	);
}