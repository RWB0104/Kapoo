/**
 * 모바일 메뉴 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 23:33:48
 */

// 라이브러리 모듈
import React, { ReactElement } from 'react';
import { Box, Button, Fade, Switch, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Router, useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';
import { darkAtom, menuAtom } from '@commons/state';
import { NightsStay, WbSunny } from '@material-ui/icons';

// 스타일
import styles from '@styles/components/header/mobilemenu.module.scss';

export default function MobileMenu(): ReactElement | null
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [ darkState, setDarkState ] = useRecoilState(darkAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	const setCookie = useCookies([ 'theme' ])[1];

	const router = useRouter();
	Router.events.on('routeChangeComplete', () =>
	{
		setMenuState(false);
	});

	const list = MENU_LIST.map((element) => (
		<Button className={styles.button} key={element.id} aria-label={element.title} startIcon={element.icon} onClick={() => router.push(element.url)}>{element.title}</Button>
	));

	// 모바일일 경우
	if (isMobile)
	{
		return (
			<Fade in={menuState}>
				<Box component="nav" className={styles.root} position="absolute" display="fixed" width="100%" height="100vh" top="0px" zIndex={10}>
					<Box display="flex" flexDirection="column" justifyContent="center" alignSelf="center" height="100%">
						{list}

						<Box display="flex" flexDirection="row" justifyContent="center" alignSelf="center">
							<Typography className={darkState ? styles.icon : styles['light-select']}>
								<WbSunny />
							</Typography>

							<Switch className={styles.switch} checked={darkState} onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void =>
							{
								setDarkState(checked);
								setCookie('theme', checked, { maxAge: 86400 * 30 });
							}} name="theme" />

							<Typography className={darkState ? styles['dark-select'] : styles.icon}>
								<NightsStay />
							</Typography>
						</Box>
					</Box>
				</Box>
			</Fade>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}