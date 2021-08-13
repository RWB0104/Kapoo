/**
 * 헤더 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 15:01:10
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { AppBar, Box, Container, Toolbar, Typography, useTheme } from '@material-ui/core';

// 사용자 모듈
import MenuList from './MenuList';
import { TITLE } from '@commons/env';

// 스타일
import styles from '@styles/components/header/header.module.scss';
import { React } from '@commons/icons';

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
							<React className={styles.logo} width={42} height={42} />

							<Typography className={styles.title} variant="h4">{TITLE}</Typography>

							<MenuList />
						</Box>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	);
}