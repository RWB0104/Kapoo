/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 02:51:31
 */

import AppThemeProvider from '@kapoo/blog-ui-pack/organism/AppThemeProvider';
import QueryProvider from '@kapoo/ui-pack/organism/QueryProvider';
import { PropsWithChildren, Suspense } from 'react';
import './global.scss';

export const metadata = {
	description: 'Generated by create-nx-workspace',
	title: 'Welcome to blog'
};

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
					<QueryProvider>
						<AppThemeProvider>
							{children}
						</AppThemeProvider>
					</QueryProvider>
				</Suspense>
			</body>
		</html>
	);
}