/**
 * 다크 테마 Fab 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

import { Theme } from '@kapoo/commons/common';
import { useSemanticHook } from '@kapoo/commons/hook';
import { themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/global/ThemeFab.module.scss';
import classNames from 'classnames/bind';
import { useCookies } from 'react-cookie';
import { IoMoon } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

/**
 * 다크 테마 Fab JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ThemeDarkFab(): JSX.Element | null
{
	const setCookie = useCookies([ 'theme' ])[1];
	const semanticState = useSemanticHook();

	const setThemeState = useSetRecoilState(themeAtom);

	const cn = classNames.bind(styles);

	return semanticState ? (
		<button
			className={cn('switch-dark')}
			onClick={() =>
			{
				const theme = Theme.DARK;

				setThemeState(theme);
				setCookie('theme', theme, { maxAge: 86400 * 30 });
			}}
		>
			<IoMoon className={cn('icon-dark')} />
			<p className={cn('switch-text')}>다크 모드로 보기</p>
		</button>
	) : null;
}