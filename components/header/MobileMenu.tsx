/**
 * 모바일 메뉴 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 23:33:48
 */

// 라이브러리 모듈
import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCookies } from 'react-cookie';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { BsArrowRepeat } from 'react-icons/bs';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';
import { menuAtom, themeAtom } from '@commons/state';

import styles from '@styles/components/header/MobileMenu.module.scss';
import { useSemanticHook } from '@commons/hook';
import { Theme } from '@commons/common';

export default function MobileMenu(): JSX.Element | null
{
	const semanticState = useSemanticHook();

	const [ themeState, setThemeState ] = useRecoilState(themeAtom);
	const menuState = useRecoilValue(menuAtom);

	const setCookie = useCookies(['theme'])[1];

	const router = useRouter();

	const theme = themeState === Theme.DARK ? Theme.LIGHT : Theme.DARK;

	return !semanticState && (
		<nav className={styles[`root-${themeState}`]} data-show={menuState}>
			<ul className={styles.list}>
				{MENU_LIST.map((element) => (
					<li key={element.id}>
						<a title={element.title} href="#" onClick={() => router.push(element.url)}>
							{element.icon}
							{element.title}
						</a>
					</li>
				))}
			</ul>

			<button className={styles[`switch-${themeState}`]} onClick={() =>
			{
				setThemeState(theme);
				setCookie('theme', theme, { maxAge: 86400 * 30 });
			}}>
				<IoSunny data-status={!darkState} />
				<BsArrowRepeat />
				<IoMoon data-status={darkState} />
			</button>
		</nav>
	);
}