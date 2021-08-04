/**
 * 테마 스위치 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, Fab, useMediaQuery, useTheme } from '@material-ui/core';
import { WbSunny } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

// 사용자 모듈
import { darkAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/global/theme-switch.module.scss';

/**
 * 라이트 테마 스위치 ReactElement 반환 함수
 *
 * @returns {ReactElement | null} ReactElement
 */
export default function ThemeSwitchLight(): ReactElement | null
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const setDarkState = useSetRecoilState(darkAtom);
	const setCookie = useCookies([ 'theme' ])[1];

	// 모바일일 경우
	if (isMobile)
	{
		return null;
	}

	// 데스크탑일 경우
	else
	{
		return (
			<Fab className={styles['switch-light']} variant="extended" aria-label="to Light" onClick={() =>
			{
				setDarkState(false);
				setCookie('theme', false, { maxAge: 86400 * 30 });
			}}>
				<WbSunny className={styles['icon-light']} />
				<Box component="span" className={styles['switch-text']}>라이트 모드로 보기</Box>
			</Fab>
		);
	}
}