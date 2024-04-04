/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 02:51:31
 */

import AppThemeProvider from '@kapoo/blog-ui-pack/organism/AppThemeProvider';
import { PropsWithChildren, ReactNode } from 'react';

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
 * @returns {ReactNode} ReactNode
 */
export default function RootLayout({ children }: PropsWithChildren): ReactNode
{
	return (
		<html lang='ko'>
			<body>
				<AppThemeProvider>
					{children}
				</AppThemeProvider>
			</body>
		</html>
	);
}