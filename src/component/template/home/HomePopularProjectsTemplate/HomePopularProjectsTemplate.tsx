/**
 * 홈 인기 프로젝트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:49:34
 */

import HomePopularBox from '@kapoo/organism/home/HomePopularBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 홈 인기 프로젝트 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePopularProjectsTemplate(): ReactNode
{
	return (
		<Container data-component='HomePopularProjectsTemplate'>
			<HomePopularBox type='projects' />
		</Container>
	);
}