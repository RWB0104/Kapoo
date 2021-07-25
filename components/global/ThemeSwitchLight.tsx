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
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

// 사용자 모듈
import { darkAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/global/theme-switch.module.scss';

interface Props {
	setter: SetterOrUpdater<boolean>
}

/**
 * 라이트 테마 스위치 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function ThemeSwitchLight(): ReactElement
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const setDarkState = useSetRecoilState(darkAtom);

	// 모바일일 경우
	if (isMobile)
	{
		return <LightMobile setter={setDarkState} />;
	}

	// 데스크탑일 경우
	else
	{
		return <LightDesktop setter={setDarkState} />;
	}
}

/**
 * 라이트 테마 모바일 스위치 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
function LightMobile({ setter }: Props): ReactElement
{
	return (
		<Fab className={styles['switch-light']} size="small" aria-label="to Light" onClick={() => setter(false)}>
			<WbSunny className={styles['icon-light']} />
		</Fab>
	);
}

/**
 * 라이트 테마 데스크탑 스위치 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
function LightDesktop({ setter }: Props): ReactElement
{
	return (
		<Fab className={styles['switch-light']} variant="extended" size="small" aria-label="to Light" onClick={() => setter(false)}>
			<WbSunny className={styles['icon-light']} />
			<Box component="span" className={styles['switch-text']}>라이트 모드로 보기</Box>
		</Fab>
	);
}