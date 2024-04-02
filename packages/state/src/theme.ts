/**
 * 테마 상태 모듈
 *
 * @author RWB
 * @since 2024.04.02 Tue 23:39:49
 */

import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

export type ThemeStoreSetThemeHandler = (theme: PaletteMode) => void;
export type ThemeStoreToggleThemeHandler = () => void;

export interface ThemeStore
{
	/**
	 * 테마
	 */
	theme: PaletteMode;

	/**
	 * 테마 할당 메서드
	 */
	setTheme: ThemeStoreSetThemeHandler;

	/**
	 * 테마 토글 메서드
	 */
	toggleTheme: ThemeStoreToggleThemeHandler;
}

export const themeStore = create<ThemeStore>((set) => ({
	setTheme: (theme): void =>
	{
		localStorage.setItem('theme', theme);
		set({ theme });
	},
	theme: 'light',
	toggleTheme: (): void =>
	{
		set(({ theme }) =>
		{
			const newTheme = (theme === 'light' ? 'dark' : 'light');

			localStorage.setItem('theme', newTheme);
			return ({ theme: newTheme });
		});
	}
}));