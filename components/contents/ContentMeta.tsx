/**
 * 컨텐츠 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 16:07:52
 */

// 라이브러리 모듈
import { Avatar, Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

// 사용자 모듈
import ContentTags from './ContentTags';
import { ContentHeaderProps, getDateDetail } from '@commons/common';
import { CATEGORY } from '@commons/env';

import styles from '@styles/components/contents/contentmeta.module.scss';

interface Props
{
	header: ContentHeaderProps
}

/**
 * 컨텐츠 메타 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentMeta({ header }: Props ): JSX.Element | null
{
	const router = useRouter();

	const dateDetail = getDateDetail(header.date);

	return (
		<Box component="article" className={styles.root}>
			<Box display="grid" className={styles.item} alignItems="center">
				<Typography className={styles.text}>📆 작성일</Typography>

				<Typography className={styles.text}>{`${dateDetail.year}-${dateDetail.month}-${dateDetail.day} ${dateDetail.week} ${dateDetail.hour}:${dateDetail.minute}:${dateDetail.second}`}</Typography>
			</Box>

			<Box display="grid" className={styles.item} alignItems="center">
				<Typography className={styles.text}>📚 카테고리</Typography>

				<Box display="grid" gridTemplateColumns="40px 1fr" alignItems="center" gridColumnGap={10}>
					<Avatar alt={header.category} src={CATEGORY[header.category] || 'https://user-images.githubusercontent.com/50317129/132937376-276bf532-841b-4f80-9ba7-d05063ee6e92.png'} />

					<Typography className={styles.link} onClick={() => router.push(`/${header.type}/category/${header.category}/1`)}>{header.category}</Typography>
				</Box>
			</Box>

			<Box display="grid" className={styles.item} alignItems="center">
				<Typography className={styles.text}>🏷️ 태그</Typography>

				<Box>
					<ContentTags type={header.type} tags={header.tag} />
				</Box>
			</Box>
		</Box>
	);
}