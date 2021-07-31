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
	const comp = isMobile ? 'h5' : 'h3';

	return (
		<Box id="loading" className={styles[`root-${theme.palette.type}`]} component="article" position="fixed" width="100%" height="100%" display="grid" alignContent="center" gridRowGap={30} zIndex={20}>
			<img className={styles.logo} src="/img/logo.png" width={size} height={size} />

			<Typography component={comp} variant={comp} align="center">Loading...</Typography>
		</Box>
	);
}