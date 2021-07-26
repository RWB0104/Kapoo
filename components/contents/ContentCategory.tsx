/**
 * 컨텐츠 카테고리 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 10:32:45
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, ButtonBase, Container, Grid, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useRouter } from 'next/router';

// 사용자 모듈
import { CATEGORY } from '@commons/env';

// 스타일
import styles from '@styles/components/contents/contentcategory.module.scss';

interface Props {
	type: string,
	list: string[]
}

/**
 * 컨텐츠 카테고리 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentCategory({ type, list }: Props): ReactElement
{
	const router = useRouter();

	const categories = list.map((item, index: number): ReactElement => (
		<Grid key={index} item md={3} xs={4} className={styles['item-wrapper']}>
			<ButtonBase className={styles.item} style={{ backgroundImage: `url(${CATEGORY[item]})` }} onClick={() => router.push(`/${type}/category/${item}/1`)}>{item}</ButtonBase>
		</Grid>
	));

	return (
		<Container component="article" maxWidth="md">
			<Accordion className={styles.root} TransitionProps={{ unmountOnExit: true }}>
				<AccordionSummary className={styles.header} expandIcon={<ExpandMore />}>
					<Typography component="h4" variant="h4">📌 Category</Typography>
				</AccordionSummary>

				<AccordionDetails className={styles.detail}>
					<Grid container>
						{categories}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Container>
	);
}