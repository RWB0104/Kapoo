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
	themeState: PaletteMode;

	/**
	 * 테마 할당 메서드
	 */
	setThemeState: ThemeStoreSetThemeHandler;

	/**
	 * 테마 토글 메서드
	 */
	toggleThemeState: ThemeStoreToggleThemeHandler;
}

export const themeStore = create<ThemeStore>((set) => ({
	setThemeState: (themeState): void =>
	{
		localStorage.setItem('theme', themeState);
		set({ themeState });
	},
	themeState: 'light',
	toggleThemeState: (): void =>
	{
		set(({ themeState }) =>
		{
			const newTheme = (themeState === 'light' ? 'dark' : 'light');

			localStorage.setItem('theme', newTheme);
			return ({ themeState: newTheme });
		});
	}
}));