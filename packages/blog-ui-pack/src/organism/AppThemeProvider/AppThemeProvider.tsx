/**
 * 앱 테마 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.02 Tue 23:49:08
 */

'use client';

import { notoSans } from '@kapoo/common';
import { themeStore } from '@kapoo/state';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren, useCallback } from 'react';

const fonts = [ notoSans.style.fontFamily, 'sans-serif' ];

/**
 * 앱 테마 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren
 *
 * @returns {JSX.Element} JSX
 */
export default function AppThemeProvider({ children }: PropsWithChildren): JSX.Element
{
	const { themeState } = themeStore();

	const getTheme = useCallback((theme: PaletteMode) => createTheme({
		palette: { mode: theme },
		transitions: { duration: { standard: 0.3 } },
		typography: { fontFamily: fonts.join(', ') }
	}), []);

	return (
		<ThemeProvider theme={getTheme(themeState)}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}