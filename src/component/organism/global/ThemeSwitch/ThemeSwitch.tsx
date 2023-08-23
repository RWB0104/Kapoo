/**
 * 테마 스위치 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 04:00:05
 */

'use client';

import { themeStore } from '@kapoo/store/theme';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Fab from '@mui/material/Fab';
import { MouseEventHandler, ReactNode, useCallback } from 'react';

/**
 * 테마 스위치 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ThemeSwitch(): ReactNode
{
	const { theme, toggle } = themeStore();

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		toggle();
	}, [ toggle ]);

	return (
		<Fab size='small' onClick={handleClick}>
			{theme === 'light' ? <DarkMode /> : null}
			{theme === 'dark' ? <LightMode /> : null}
		</Fab>
	);
}