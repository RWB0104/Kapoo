/**
 * 로딩 컴포넌트
 *
 * @author RWB
 * @since 2021.07.31 Sat 00:16:04
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';

// 스타일
import styles from '@styles/components/global/loading.module.scss';
import { React } from '@commons/icons';

/**
 * 로딩 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function Loading(): ReactElement
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const size = isMobile ? '100' : '300';

	return (
		<Box id="loading" className={styles.root} component="article" position="fixed" width="100%" height="100%" display="grid" alignContent="center" gridRowGap={30} zIndex={20}>
			<React className={styles.logo} width={size} height={size} />
			<Typography className={styles.title} align="center">Loading...</Typography>
		</Box>
	);
}