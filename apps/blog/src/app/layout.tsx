/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 02:51:31
 */

import AppThemeProvider from '@kapoo/global-ui-pack/organism/AppThemeProvider';
import FloatButtonsBox from '@kapoo/global-ui-pack/organism/FloatButtonsBox';
import GoogleAnalyticsProvider from '@kapoo/ui-pack/organism/GoogleAnalyticsProvider';
import QueryProvider from '@kapoo/ui-pack/organism/QueryProvider';
import ToastifyProvider from '@kapoo/ui-pack/organism/ToastifyProvider';
import { PropsWithChildren, Suspense } from 'react';

import { getMetadata } from '../common';

import '@kapoo/ui-pack/global.scss';

export const metadata = getMetadata({});

/**
 * 레이아웃 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren
 *
 * @returns {JSX.Element} JSX
 */
export default function RootLayout({ children }: PropsWithChildren): JSX.Element
{
	return (
		<html lang='ko'>
			<body>
				<Suspense>
					<GoogleAnalyticsProvider gaKey='G-7QYWYNZ90R'>
						<QueryProvider>
							<AppThemeProvider>
								{children}

								<FloatButtonsBox />
								<ToastifyProvider />
							</AppThemeProvider>
						</QueryProvider>
					</GoogleAnalyticsProvider>
				</Suspense>
			</body>
		</html>
	);
}