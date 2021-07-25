/**
 * 푸터 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 16:52:22
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Avatar, Box, Divider } from '@material-ui/core';

// 사용자 모듈
import { TITLE } from '@commons/env';

// 스타일
import styles from '@styles/components/footer/footer.module.scss';

/**
 * 푸터 ReactNode 반환 함수
 *
 * @returns {ReactNode} ReactNode
 */
export default function Footer(): ReactElement | null
{
	return (
		<Box component="footer">
			<Box className={styles.root} display="grid" gridTemplateColumns="1fr 100px 1fr" gridColumnGap={20} alignItems="center" textAlign="center">
				<Divider />

				<Avatar className={styles.logo} alt={TITLE} src="/img/profile.jpg" />

				<Divider />
			</Box>
		</Box>
	);
}