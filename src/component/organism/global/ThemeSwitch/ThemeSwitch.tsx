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
import { PaletteMode } from '@mui/material';
import Fab from '@mui/material/Fab';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import { MouseEventHandler, ReactNode, useCallback } from 'react';

import styles from './ThemeSwitch.module.scss';

const cn = classNames.bind(styles);

/**
 * 테마 스위치 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ThemeSwitch(): ReactNode
{
	const { theme, toggle } = themeStore();

	const getIcon = useCallback((theme: PaletteMode) => (
		<motion.div
			animate='animate'
			className={cn('wrap')}
			exit='initial'
			initial='initial'
			key={theme}
			transition={{ duration: 0.3 }}
			variants={{
				animate: { translateY: 0 },
				initial: { translateY: 50 }
			}}
		>
			{theme === 'light' ? <DarkMode className={cn('icon', 'dark')} htmlColor='blueviolet' /> : null}
			{theme === 'dark' ? <LightMode className={cn('icon', 'light')} htmlColor='orange' /> : null}
		</motion.div>
	), []);

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		toggle();
	}, [ toggle ]);

	return (
		<Fab className={cn('fab', theme)} size='small' onClick={handleClick}>
			<AnimatePresence>
				{theme === 'light' ? getIcon('light') : null}
				{theme === 'dark' ? getIcon('dark') : null}
			</AnimatePresence>
		</Fab>
	);
}