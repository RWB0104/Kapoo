/**
 * 홈 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 19:58:12
 */

import { APP_INFO } from '@kapoo/env';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import HomeScreenerTemplate from '@kapoo/template/home/HomeScreenerTemplate';

import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	authors: [{ name: 'RWB', url: 'https://github.com/RWB0104' }],
	description: APP_INFO.description,
	icons: [ '/favicon.ico', { rel: 'shortcut icon', url: '/favicon.ico' }, { rel: 'apple-touch-icon', url: '/favicon.ico' }],
	openGraph: {
		description: APP_INFO.description,
		images: '/thumb.png',
		locale: 'ko-KR',
		siteName: APP_INFO.title,
		title: `홈 - ${APP_INFO.title}`,
		type: 'website',
		url: 'https://blog.itcode.dev'
	},
	title: `홈 - ${APP_INFO.title}`
};

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