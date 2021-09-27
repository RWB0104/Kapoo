/**
 * 푸터 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 16:52:22
 */

// 라이브러리 모듈
import { ReactElement, useState } from 'react';
import { Avatar, Box, Dialog, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { AccountTree, GitHub, Mail, RssFeed } from '@material-ui/icons';

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
	const [ state, setState ] = useState(false);

	return (
		<Box component="footer" className={styles.root}>
			<Box className={styles.line}>
				<Divider />

				<Avatar className={styles.logo} alt={TITLE} src="/img/profile.jpg" />

				<Divider />
			</Box>

			<Box className={styles.buttons}>
				<IconButton className={styles.github} onClick={() => open('https://github.com/RWB0104')}>
					<GitHub />
				</IconButton>

				<IconButton className={styles.mail} onClick={() => location.href = 'mailto:psj2716@gmail.com'}>
					<Mail />
				</IconButton>

				<IconButton className={styles.rss} onClick={() => setState(true)}>
					<RssFeed />
				</IconButton>
			</Box>

			<Hits />

			<Typography className={styles.text} align="center">💻 Copyright ⓒ RWB 2021.05</Typography>
			{hash && <Typography className={styles.text} align="center">{hash}</Typography>}

			<Dialog open={state} onClose={() => setState(false)}>
				<DialogTitle>SEO</DialogTitle>

				<List>
					<ListItem button onClick={() =>
					{
						open('/sitemap');
						setState(false);
					}}>
						<ListItemAvatar>
							<Avatar className={styles['sitemap-mini']}>
								<AccountTree />
							</Avatar>
						</ListItemAvatar>

						<ListItemText>Sitemap</ListItemText>
					</ListItem>

					<ListItem button onClick={() =>
					{
						open('/rss');
						setState(false);
					}}>
						<ListItemAvatar>
							<Avatar className={styles['rss-mini']}>
								<RssFeed />
							</Avatar>
						</ListItemAvatar>

						<ListItemText>RSS Feed</ListItemText>
					</ListItem>
				</List>
			</Dialog>
		</Box>
	);
}