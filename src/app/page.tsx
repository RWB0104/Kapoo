/**
 * 홈 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 19:58:12
 */

import PageTemplate from '@kapoo/template/global/PageTemplate';
import HomeScreenerTemplate from '@kapoo/template/home/HomeScreenerTemplate';

import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 홈 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePage(): ReactNode
{
	return (
		<PageTemplate>
			<HomeScreenerTemplate />
			<Typography>테스트</Typography>
		</PageTemplate>
	);
}