/**
 * 테마 스위치 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { Box, Fab } from '@material-ui/core';
import { WbSunny } from '@material-ui/icons';

// 사용자 모듈
import { useSemanticHook, useThemeHook } from '@commons/hook';

// 스타일
import styles from '@styles/components/global/theme-switch.module.scss';

/**
 * 라이트 테마 스위치 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ThemeSwitchLight(): JSX.Element | null
{
	const semanticState = useSemanticHook();
	const setThemeState = useThemeHook()[1];

	return semanticState ? (
		<Fab className={styles['switch-light']} variant="extended" aria-label="to Light" onClick={() => setThemeState('light')}>
			<WbSunny className={styles['icon-light']} />
			<Box component="span" className={styles['switch-text']}>라이트 모드로 보기</Box>
		</Fab>
	) : null;
}