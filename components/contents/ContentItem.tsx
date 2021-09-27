/**
 * 컨텐츠 아이템 컴포넌트
 *
 * @author RWB
 * @since 2021.07.13 Tue 00:00:40
 */

// 라이브러리 모듈
import { ReactElement, useState } from 'react';
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Collapse, IconButton, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useRouter } from 'next/router';

// 사용자 모듈
import NewContent from './NewContent';
import ContentMeta from './ContentMeta';
import { CATEGORY } from '@commons/env';
import { ContentProps, getWrittenTimes } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contentitem.module.scss';

interface Props {
	item: ContentProps
}

/**
 * 컨텐츠 아이템 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentItem({ item }: Props): ReactElement
{
	const { title, excerpt, coverImage, type, category, date } = item.header;

	const urls = item.url;

	const router = useRouter();

	const [ state, setState ] = useState(false);

	const isNew = new Date().getTime() - new Date(item.header.date).getTime() < 86400000 * 7;

	return (
		<Card className={styles.root}>
			<CardActionArea onClick={() => router.push(`/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`)}>
				<Box className={styles['image-wrapper']}>
					<CardMedia className={styles.image} component="img" image={coverImage} />
				</Box>

				<CardContent className={styles.wrapper}>
					<Box display="grid" className={styles['category-wrapper']} gridTemplateColumns="40px 1fr" alignItems="center">
						<Avatar className={styles['category-image']} alt={category} src={CATEGORY[category] || 'https://user-images.githubusercontent.com/50317129/132937376-276bf532-841b-4f80-9ba7-d05063ee6e92.png'} />
						<Typography className={styles.category} component="h4" variant="h4" gutterBottom>{category}</Typography>

						<NewContent flag={isNew} />
					</Box>

					<Typography className={styles.title} component="h1" variant="h3" gutterBottom>{title}</Typography>
					<Typography className={styles.excerpt}>{excerpt}</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions className={styles.footer}>
				<Typography>🕔 {getWrittenTimes(new Date(date))}</Typography>

				<IconButton onClick={() => setState(!state)}>
					{state ? <ArrowUpward /> : <ArrowDownward />}
				</IconButton>
			</CardActions>

			<Collapse in={state} unmountOnExit>
				<CardContent className={styles['footer-detail']}>
					<ContentMeta header={item.header} />
				</CardContent>
			</Collapse>
		</Card>
	);
}