/**
 * 로딩 컴포넌트
 *
 * @author RWB
 * @since 2021.07.31 Sat 00:16:04
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, useTheme } from '@material-ui/core';

// 사용자 모듈
import { React } from '@commons/icons';

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

	return (
		<Box id="loading" className={styles[`root-${theme.palette.type}`]} component="article">
			<Box className={styles['logo-wrap']}>
				<React className={styles.logo} />
			</Box>
		</Box>
	);
}