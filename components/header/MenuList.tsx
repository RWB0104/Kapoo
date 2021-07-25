/**
 * 메뉴 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 20:07:12
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';

// 스타일
import styles from '@styles/components/header/menulist.module.scss';

export default function MenuList(): ReactElement | null
{
	const router = useRouter();

	const list = MENU_LIST.map((element) => (
		<IconButton key={element.id} className={styles.item} aria-label={element.title} onClick={() => router.push(element.url)}>{element.icon}</IconButton>
	));

	return (
		<Box className={styles.root} display="grid" gridAutoFlow="column" gridColumnGap={5}>{list}</Box>
	);
}