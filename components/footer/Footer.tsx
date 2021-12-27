/**
 * 푸터 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 16:52:22
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Avatar, Box, Divider, IconButton, Typography } from '@material-ui/core';
import { GitHub, Language, ListAlt, Mail, RssFeed } from '@material-ui/icons';

// 사용자 모듈
import { TITLE } from '@commons/env';

// 스타일
import styles from '@styles/components/footer/footer.module.scss';
import Hits from '@components/global/Hits';

interface Props {
	hash: string
}

/**
 * 푸터 ReactNode 반환 함수
 *
 * @returns {ReactNode} ReactNode
 */
export default function Footer({ hash }: Props): ReactElement | null
{
	return (
		<Box component="footer" className={styles.root}>
			<Box className={styles.line}>
				<Divider />

				<Avatar className={styles.logo} alt={TITLE} src="/img/profile.jpg" />

				<Divider />
			</Box>

			<Box className={styles.buttons}>
				<IconButton className={styles.button} title='GitHub' onClick={() => open('https://github.com/RWB0104')}>
					<GitHub />
				</IconButton>

				<IconButton className={styles.button} title='Mail' onClick={() => location.href = 'mailto:psj2716@gmail.com'}>
					<Mail />
				</IconButton>

				<IconButton className={styles.button} title='Project Page' onClick={() => open('https://itcode.dev')}>
					<Language />
				</IconButton>

				<IconButton className={styles.button} title='Sitemap' onClick={() => open('/sitemap')}>
					<ListAlt />
				</IconButton>

				<IconButton className={styles.button} title='RSS' onClick={() => open('/rss')}>
					<RssFeed />
				</IconButton>
			</Box>

			<Typography className={styles.text} align="center">💻 Copyright ⓒ RWB 2021.05</Typography>

			{hash && <Typography className={styles.text} align="center">{hash}</Typography>}

			<Hits />
		</Box>
	);
}