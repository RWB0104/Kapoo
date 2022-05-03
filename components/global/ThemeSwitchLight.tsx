/**
 * 테마 스위치 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { IoSunny } from 'react-icons/io5';

// 사용자 모듈
import { useSemanticHook } from '@commons/hook';
import { themeAtom } from '@commons/state';
import { Theme } from '@commons/common';

// 스타일
import styles from '@styles/components/global/ThemeSwitch.module.scss';

/**
 * 라이트 테마 스위치 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ThemeSwitchLight(): JSX.Element | null
{
	const setCookie = useCookies([ 'theme' ])[1];
	const semanticState = useSemanticHook();

	const setThemeState = useSetRecoilState(themeAtom);

	return semanticState ? (
		<div className={styles['switch-light']} onClick={() =>
		{
			const theme = Theme.LIGHT;

			setThemeState(theme);
			setCookie('theme', theme, { maxAge: 86400 * 30 });
		}}>
			<IoSunny className={styles['icon-light']} />
			<p className={styles['switch-text']}>라이트 모드로 보기</p>
		</div>
	) : null;
}