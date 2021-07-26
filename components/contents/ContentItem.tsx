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
import { CATEGORY } from '@commons/env';
import { getDateDetail, ContentProps } from '@commons/common';


import styles from '@styles/components/contents/contentitem.module.scss';
import ContentMeta from './ContentMeta';

interface Props {
	item: ContentProps
}

/**
 * 컨텐츠 아이템 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentItem({ item }: Props): ReactElement
{
	const { title, excerpt, coverImage, type, category } = item.header;

	const dateDetail = getDateDetail(item.header.date);
	const urls = item.url;

	const router = useRouter();

	const [ state, setState ] = useState(false);

	return (
		<Card className={styles.root}>
			<CardActionArea onClick={() => router.push(`/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`)}>
				<Box className={styles['image-wrapper']}>
					<CardMedia className={styles.image} component="img" image={coverImage} />
				</Box>

				<CardContent className={styles.wrapper}>
					<Box display="grid" className={styles['category-wrapper']} gridTemplateColumns="40px 1fr" alignItems="center">
						<Avatar className={styles['category-image']} alt={category} src={CATEGORY[category]} />
						<Typography className={styles.category} component="h4" variant="h4" gutterBottom>{category}</Typography>
					</Box>

					<Typography className={styles.title} component="h1" variant="h3" gutterBottom>{title}</Typography>
					<Typography className={styles.excerpt}>{excerpt}</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions className={styles.footer}>
				<Typography>📆 {`${dateDetail.year}-${dateDetail.month}-${dateDetail.day} ${dateDetail.week} ${dateDetail.hour}:${dateDetail.minute}:${dateDetail.second}`}</Typography>

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