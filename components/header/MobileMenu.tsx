/**
 * 모바일 메뉴 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 23:33:48
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, Button, Fade, useMediaQuery, useTheme } from '@material-ui/core';
import { Router, useRouter } from 'next/dist/client/router';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';

// 스타일
import styles from '@styles/components/header/mobilemenu.module.scss';
import { useRecoilState } from 'recoil';
import { menuAtom } from '@commons/state';

export default function MobileMenu(): ReactElement | null
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

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
				<Box component="nav" className={styles.root} position="absolute" display="fixed" width="100%" height="100%" top="0px" zIndex={10}>
					<Box display="grid" gridAutoRows="auto" alignContent="center" height="100%">
						{list}
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