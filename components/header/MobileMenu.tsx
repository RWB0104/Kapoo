/**
 * 모바일 메뉴 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 23:33:48
 */

// 라이브러리 모듈
import React from 'react';
import { Switch, Typography } from '@material-ui/core';
import { Router, useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';
import { darkAtom, menuAtom } from '@commons/state';
import { NightsStay, WbSunny } from '@material-ui/icons';

// 스타일
import styles from '@styles/components/header/MobileMenu.module.scss';

export default function MobileMenu(): JSX.Element | null
{
	const [ darkState, setDarkState ] = useRecoilState(darkAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	const setCookie = useCookies(['theme'])[1];

	const router = useRouter();

	Router.events.on('routeChangeComplete', () => setMenuState(false));

	return (
		<nav className={styles[`root-${darkState ? 'dark' : 'light'}`]} data-show={menuState}>
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

			<div>
				<Typography>
					<WbSunny />
				</Typography>

				<Switch checked={darkState} onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void =>
				{
					setDarkState(checked);
					setCookie('theme', checked, { maxAge: 86400 * 30 });
				}} name="theme" />

				<Typography>
					<NightsStay />
				</Typography>
			</div>
		</nav>
	);
}