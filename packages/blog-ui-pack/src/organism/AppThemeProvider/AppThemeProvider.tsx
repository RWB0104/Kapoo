/**
 * 앱 테마 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.02 Tue 23:49:08
 */

'use client';

import { themeStore } from '@kapoo/state';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren, ReactNode, useCallback } from 'react';

/**
 * 앱 테마 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren
 *
 * @returns {ReactNode} ReactNode
 */
export default function AppThemeProvider({ children }: PropsWithChildren): ReactNode
{
	const { theme } = themeStore();

	const getTheme = useCallback((theme: PaletteMode) => createTheme({
		palette: { mode: theme },
		typography: { fontFamily: 'Pretendard, sans-serif' }
	}), []);

	return (
		<ThemeProvider theme={getTheme(theme)}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}