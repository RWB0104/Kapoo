/**
 * 헤더 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 15:01:10
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { AppBar, Avatar, Box, Container, Toolbar, Typography, useTheme } from '@material-ui/core';

// 사용자 모듈
import MenuList from './MenuList';
import { LOGO, TITLE } from '@commons/env';

// 스타일
import styles from '@styles/components/header/header.module.scss';

/**
 * 헤더 ReactNode 반환 함수
 *
 * @returns {ReactNode} ReactNode
 */
export default function Header(): ReactElement | null
{
	const theme = useTheme();

	return (
		<Box component="header">
			<AppBar className={styles[`bar-${theme.palette.type}`]}>
				<Toolbar className={styles.toolbar}>
					<Container maxWidth="lg">
						<Box display="grid" gridTemplateColumns="50px 1fr 250px" alignItems="center">
							<Avatar className={styles.logo} variant="square" alt={TITLE} src={LOGO} />

							<Typography className={styles.title} variant="h4">{TITLE}</Typography>

							<MenuList />
						</Box>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	);
}