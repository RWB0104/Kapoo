/**
 * 테마 스위치 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Fab, useMediaQuery, useTheme } from '@material-ui/core';
import { NightsStay } from '@material-ui/icons';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

// 사용자 모듈
import { darkAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/global/theme-switch.module.scss';

interface Props {
	setter: SetterOrUpdater<boolean>
}

/**
 * 다크 테마 스위치 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function ThemeSwitchDark(): ReactElement
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const setDarkState = useSetRecoilState(darkAtom);

	// 모바일일 경우
	if (isMobile)
	{
		return <DarkMobile setter={setDarkState} />;
	}

	// 데스크탑일 경우
	else
	{
		return <DarkDesktop setter={setDarkState} />;
	}
}

/**
 * 다크 테마 모바일 스위치 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
function DarkMobile({ setter }: Props): ReactElement
{
	return (
		<Fab className={styles['switch-dark']} size="small" aria-label="to Light" onClick={() => setter(true)}>
			<NightsStay className={styles['icon-dark']} />
		</Fab>
	);
}

/**
 * 다크 테마 데스크탑 스위치 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
function DarkDesktop({ setter }: Props): ReactElement
{
	return (
		<Fab className={styles['switch-dark']} variant="extended" size="small" aria-label="to Light" onClick={() => setter(true)}>
			<NightsStay className={styles['icon-dark']} />
		</Fab>
	);
}