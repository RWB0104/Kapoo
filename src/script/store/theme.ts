/**
 * 테마 상태관리 모듈
 *
 * @author RWB
 * @since 2023.08.19 Sat 03:03:23
 */

/**
 * 테마 상태관리 모듈
 *
 * @author RWB
 * @since 2023.09.06 Wed 02:28:05
 */

'use client';

import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

export type SetThemeHandler = (theme: PaletteMode) => void;
export type ToggleThemeHandler = () => void;

export interface ThemeStateProps
{
	/**
	 * 테마
	 */
	theme: PaletteMode;

	/**
	 * 테마 할당 메서드
	 */
	setTheme: SetThemeHandler;

	/**
	 * 테마 토글 메서드
	 */
	toggle: ToggleThemeHandler;
}

export const themeStore = create<ThemeStateProps>((set) => ({
	setTheme: (theme): void =>
	{
		localStorage.setItem('theme', theme);
		set({ theme });
	},
	theme: 'dark',
	toggle: (): void =>
	{
		set(({ theme }) =>
		{
			const newTheme = (theme === 'light' ? 'dark' : 'light');

			localStorage.setItem('theme', newTheme);
			return ({ theme: newTheme });
		});
	}
}));