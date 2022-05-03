/**
 * 컨텐츠 카테고리 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 10:32:45
 */

// 라이브러리 모듈
import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, ButtonBase, Container, Grid, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useRouter } from 'next/router';

// 사용자 모듈
import { CATEGORY } from '@commons/env';
import { CategoryProps } from '@commons/common';
import NewContent from './NewContent';

// 스타일
import styles from '@styles/components/contents/contentcategory.module.scss';

interface Props
{
	type: string,
	list: CategoryProps
}

/**
 * 컨텐츠 카테고리 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentCategory({ type, list }: Props): JSX.Element | null
{
	const router = useRouter();

	const [ state, setState ] = useState(true);

	const categories = Object.keys(list).sort().map((item, index: number): JSX.Element => (
		<Grid key={index} item md={2} xs={3} className={styles['item-wrapper']}>
			<Box height="100%" position="relative">
				<ButtonBase className={styles.item} style={{ backgroundImage: `url(${CATEGORY[item] || CATEGORY['All']})` }} onClick={() => item === 'All' ? router.push(`/${type}/1`) : router.push(`/${type}/category/${item}/1`)}>
					<Box className={styles.meta}>
						<Box>{item}</Box>
						<Box>
							<Box component="span">{list[item].count}</Box>
						</Box>
					</Box>
				</ButtonBase>

				<NewContent flag={list[item].flag as boolean} />
			</Box>
		</Grid>
	));

	return (
		<Container component="article" maxWidth="md">
			<Accordion className={styles.root} expanded={state} TransitionProps={{ unmountOnExit: true }} onClick={() => setState(!state)}>
				<AccordionSummary className={styles.header} expandIcon={<ExpandMore />}>
					<Typography className={styles.title} component="h4" variant="h4">📚 카테고리</Typography>
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