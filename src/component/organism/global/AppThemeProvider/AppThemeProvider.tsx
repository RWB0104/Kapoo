/**
 * 앱 테마 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 03:01:13
 */

'use client';

import { themeStore } from '@kapoo/store/theme';

import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// eslint-disable-next-line camelcase
import { Noto_Sans_KR } from 'next/font/google';
import { PropsWithChildren, ReactNode, useCallback, useEffect } from 'react';

export type AppThemeProviderProps = PropsWithChildren;

const notoSans = Noto_Sans_KR({ subsets: [ 'latin' ], weight: [ '100', '300', '400', '500', '700', '900' ] });

/**
 * 앱 테마 프로바이더 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {AppThemeProviderProps} param0: AppThemeProviderProps 객체
 *
 * @returns {ReactNode} ReactNode 객체
 */
export default function AppThemeProvider({ children }: AppThemeProviderProps): ReactNode
{
	const { theme, setTheme } = themeStore();

	const list = [ notoSans.style.fontFamily, 'sans-serif' ];

	const getTheme = useCallback((theme: PaletteMode) => createTheme({
		palette: { mode: theme },
		typography: { fontFamily: list.join(', ') }
	}), [ list ]);

	useEffect(() =>
	{
		const saved = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

		setTheme(saved);
	}, [ setTheme ]);

	return (
		<ThemeProvider theme={getTheme(theme)}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}