/**
 * 홈 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 19:58:12
 */

import { PAGE_INFO } from '@kapoo/env';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import HomeScreenerTemplate from '@kapoo/template/home/HomeScreenerTemplate';
import { getMetadata } from '@kapoo/util/common';

import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export const metadata = getMetadata(PAGE_INFO.index.title, PAGE_INFO.index.description);

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