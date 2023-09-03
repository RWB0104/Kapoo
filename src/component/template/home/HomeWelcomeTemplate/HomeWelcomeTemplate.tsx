/**
 * 홈 웰컴 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 12:23:08
 */

import HomeWelcomBox from '@kapoo/organism/home/HomeWelcomBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 홈 웰컴 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeWelcomeTemplate(): ReactNode
{
	return (
		<Container data-component='HomeWelcomeTemplate'>
			<HomeWelcomBox />
		</Container>
	);
}