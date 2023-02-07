/**
 * 모바일 메뉴 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 23:33:48
 */

import { Theme } from '@kapoo/commons/common';
import { useSemanticHook } from '@kapoo/commons/hook';
import { MENU_LIST } from '@kapoo/commons/menulist';
import { menuAtom, themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/header/MobileMenu.module.scss';
import classNames from 'classnames/bind';
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

	const setCookie = useCookies([ 'theme' ])[1];

	const theme = themeState === Theme.DARK ? Theme.LIGHT : Theme.DARK;

	const cn = classNames.bind(styles);

	return !semanticState ? (
		<nav className={cn('root', themeState)} data-show={menuState}>
			<ul className={cn('list', themeState)}>
				{MENU_LIST.map((element) => (
					<li key={element.id}>
						<Link href={element.url} legacyBehavior passHref>
							<a href='#replace' title={element.title}>
								{element.icon}
								{element.title}
							</a>
						</Link>
					</li>
				))}
			</ul>

			<button
				className={cn('switch', themeState)}
				onClick={() =>
				{
					setThemeState(theme);
					setCookie('theme', theme, { maxAge: 86400 * 30 });
				}}
			>
				<IoSunny data-status={themeState === Theme.LIGHT} />
				<BsArrowRepeat size={10} />
				<IoMoon data-status={themeState === Theme.DARK} />
			</button>
		</nav>
	) : null;
}