/**
 * 루트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 03:52:49
 */

import AppThemeProvider from '@kapoo/organism/global/AppThemeProvider';
import ReactQueryProvider from '@kapoo/organism/global/ReactQueryProvider';

import { PropsWithChildren, ReactNode } from 'react';
import ReactGA from 'react-ga4';

export type RootTemplateProps = PropsWithChildren;

/**
 * 루트 template 컴포넌트 JSX 반환 메서드
 *
 * @param {RootTemplateProps} param0: RootTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function RootTemplate({ children }: RootTemplateProps): ReactNode
{
	ReactGA.initialize('G-7QYWYNZ90R');

	return (
		<AppThemeProvider>
			<ReactQueryProvider>
				{children}
			</ReactQueryProvider>
		</AppThemeProvider>
	);
}