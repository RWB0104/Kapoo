/**
 * 라이트 테마 Fab 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

import { Theme } from '@commons/common';
import { useSemanticHook } from '@commons/hook';
import { themeAtom } from '@commons/state';
import styles from '@styles/components/global/ThemeFab.module.scss';
import { useCookies } from 'react-cookie';
import { IoSunny } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

/**
 * 라이트 테마 Fab JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ThemeLightFab(): JSX.Element | null
{
	const setCookie = useCookies([ 'theme' ])[1];
	const semanticState = useSemanticHook();

	const setThemeState = useSetRecoilState(themeAtom);

	return semanticState ? (
		<button className={styles['switch-light']} onClick={() =>
		{
			const theme = Theme.LIGHT;

			setThemeState(theme);
			setCookie('theme', theme, { maxAge: 86400 * 30 });
		}}>
			<IoSunny className={styles['icon-light']} />
			<p className={styles['switch-text']}>라이트 모드로 보기</p>
		</button>
	) : null;
}