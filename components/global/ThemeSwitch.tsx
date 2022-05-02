/**
 * 테마 스위치 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { ReactElement } from 'react';

// 사용자 모듈
import ThemeSwitchDark from './ThemeSwitchDark';
import ThemeSwitchLight from './ThemeSwitchLight';
import { useThemeHook } from '@commons/hook';

/**
 * 테마 스위치 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function ThemeSwitch(): ReactElement
{
	const themeState = useThemeHook()[0];

	return themeState ? <ThemeSwitchLight /> : <ThemeSwitchDark />;
}