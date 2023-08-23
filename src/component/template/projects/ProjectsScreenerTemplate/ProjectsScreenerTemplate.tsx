/**
 * 프로젝트 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:06:37
 */

import { APP_INFO } from '@kapoo/env';
import Screener from '@kapoo/molecule/Screener';
import ScreenerBox from '@kapoo/organism/global/ScreenerBox';

import { ReactNode } from 'react';

/**
 * 프로젝트 스크리너 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} JSX
 */
export default function ProjectsScreenerTemplate(): ReactNode
{
	return (
		<Screener>
			<ScreenerBox color='springgreen' name='프로젝트' text={`🦙 ${APP_INFO.description}`} />
		</Screener>
	);
}