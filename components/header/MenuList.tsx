/**
 * 메뉴 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 20:07:12
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';
import { menuAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/header/menulist.module.scss';

/**
 * 메뉴 리스트 ReactElement 반환 함수
 *
 * @returns {ReactElement}: ReactElement
 */
export default function MenuList(): ReactElement
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	// 모바일일 경우
	if (isMobile)
	{
		return (
			<Box textAlign="right">
				<Mobile />
			</Box>
		);
	}

	// 아닐 경우
	else
	{
		return <Desktop />;
	}
}

/**
 * 모바일 메뉴 리스트 ReactElement 반환 함수
 *
 * @returns {ReactElement}: ReactElement
 */
function Mobile(): ReactElement
{
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	const icon = menuState ? <Close /> : <Menu />;

	return (
		<IconButton className={styles.button} onClick={() => setMenuState(!menuState)}>
			{icon}
		</IconButton>
	);
}

/**
 * 데스크탑 메뉴 리스트 ReactElement 반환 함수
 *
 * @returns {ReactElement}: ReactElement
 */
function Desktop(): ReactElement
{
	const router = useRouter();

	const list = MENU_LIST.map((element) => (
		<IconButton key={element.id} className={styles.item} aria-label={element.title} onClick={() => router.push(element.url)}>{element.icon}</IconButton>
	));

	return (
		<Box className={styles.root} display="grid" gridAutoFlow="column" gridColumnGap={5}>{list}</Box>
	);
}