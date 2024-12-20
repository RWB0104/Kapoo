/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2024.07.22 Mon 23:16:40
 */

import AppThemeProvider from '@kapoo/global-ui-pack/organism/AppThemeProvider';
import GoogleAnalyticsProvider from '@kapoo/ui-pack/organism/GoogleAnalyticsProvider';
import { PropsWithChildren, Suspense } from 'react';

import { getMetadata } from '../common';

import '@kapoo/ui-pack/global.scss';

export const metadata = getMetadata({});

/**
 * 레이아웃 컴포넌트 JSX 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren
 *
 * @returns {JSX.Element} JSX
 */
export default function RootLayout({ children }: PropsWithChildren): JSX.Element
{
	return (
		<html lang='ko'>
			<head>
				<link href='/piedit/manifest.webmanifest' rel='manifest' />
			</head>

			<body>
				<Suspense>
					<GoogleAnalyticsProvider gaKey='G-1YPNLPR0CQ'>
						<AppThemeProvider>
							{children}
						</AppThemeProvider>
					</GoogleAnalyticsProvider>
				</Suspense>
			</body>
		</html>
	);
}