/**
 * 테마 스위치 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { IoMoon } from 'react-icons/io5';

// 사용자 모듈
import { useSemanticHook } from '@commons/hook';
import { themeAtom } from '@commons/state';
import { Theme } from '@commons/common';

// 스타일
import styles from '@styles/components/global/ThemeSwitch.module.scss';

/**
 * 다크 테마 스위치 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ThemeSwitchDark(): JSX.Element | null
{
	const setCookie = useCookies([ 'theme' ])[1];
	const semanticState = useSemanticHook();

	const setThemeState = useSetRecoilState(themeAtom);

	return semanticState ? (
		<div className={styles['switch-dark']} onClick={() =>
		{
			const theme = Theme.DARK;

			setThemeState(theme);
			setCookie('theme', theme, { maxAge: 86400 * 30 });
		}}>
			<IoMoon className={styles['icon-dark']} />
			<p className={styles['switch-text']}>다크 모드로 보기</p>
		</div>
	) : null;
}