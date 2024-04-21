/**
 * 플롯 버튼 모둠 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.19 Fri 17:02:03
 */

'use client';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import NightsStay from '@mui/icons-material/NightsStay';
import WbSunny from '@mui/icons-material/WbSunny';
import { PaletteMode } from '@mui/material';
import amber from '@mui/material/colors/amber';
import blue from '@mui/material/colors/blue';
import Stack from '@mui/material/Stack';
import { useCallback, useMemo } from 'react';

import SymbolicButton, { SymbolicButtonProps } from '../../atom/SymbolicButton';

export interface FloatButtonsProps
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;

	onThemeClick?: (theme: PaletteMode) => void;
}

/**
 * 플롯 버튼 모둠 organism 컴포넌트 반환 메서드
 *
 * @param {FloatButtonsProps} param0: FloatButtonsProps
 *
 * @returns {JSX.Element} JSX
 */
export default function FloatButtons({ theme = 'light', onThemeClick }: FloatButtonsProps): JSX.Element
{
	const bgcolor = useMemo<SymbolicButtonProps['bgcolor']>(() => (theme === 'light' ? 'white' : '#242424'), [ theme ]);

	const onUpClick = useCallback(() =>
	{
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	const onDownClick = useCallback(() =>
	{
		window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
	}, []);

	const handleThemeClick = useCallback(() =>
	{
		onThemeClick?.(theme);
	}, [ theme, onThemeClick ]);

	return (
		<Stack bottom={20} data-component='FloatButtons' gap={2} position='fixed' right={20} zIndex={10}>
			<SymbolicButton bgcolor={bgcolor} padding={1} onClick={onUpClick}>
				<KeyboardArrowUp />
			</SymbolicButton>

			<SymbolicButton bgcolor={bgcolor} padding={1} onClick={onDownClick}>
				<KeyboardArrowDown />
			</SymbolicButton>

			<SymbolicButton bgcolor={bgcolor} padding={1} onClick={handleThemeClick}>
				{theme === 'light' ? <NightsStay htmlColor={blue[500]} /> : null}
				{theme === 'dark' ? <WbSunny htmlColor={amber[500]} /> : null}
			</SymbolicButton>
		</Stack>
	);
}