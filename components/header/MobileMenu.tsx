/**
 * 모바일 메뉴 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 23:33:48
 */

import { Theme } from '@commons/common';
import { useSemanticHook } from '@commons/hook';
import { MENU_LIST } from '@commons/menulist';
import { menuAtom, themeAtom } from '@commons/state';
import styles from '@styles/components/header/MobileMenu.module.scss';
import Link from 'next/link';
import React from 'react';
import { useCookies } from 'react-cookie';
import { BsArrowRepeat } from 'react-icons/bs';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * 모바일 메뉴 JSX 반환 함수
 *
 * @returns {JSX.Element | null}: JSX
 */
export default function MobileMenu(): JSX.Element | null
{
	const semanticState = useSemanticHook();

	const [ themeState, setThemeState ] = useRecoilState(themeAtom);
	const menuState = useRecoilValue(menuAtom);

	const setCookie = useCookies(['theme'])[1];

	const theme = themeState === Theme.DARK ? Theme.LIGHT : Theme.DARK;

	return !semanticState ? (
		<nav className={styles[`root-${themeState}`]} data-show={menuState}>
			<ul className={styles[`list-${themeState}`]}>
				{MENU_LIST.map((element) => (
					<li key={element.id}>
						<Link href={element.url}>
							<a title={element.title}>{element.icon} {element.title}</a>
						</Link>
					</li>
				))}
			</ul>

			<button className={styles[`switch-${themeState}`]} onClick={() =>
			{
				setThemeState(theme);
				setCookie('theme', theme, { maxAge: 86400 * 30 });
			}}>
				<IoSunny data-status={themeState === Theme.LIGHT} />
				<BsArrowRepeat size={10} />
				<IoMoon data-status={themeState === Theme.DARK} />
			</button>
		</nav>
	) : null;
}