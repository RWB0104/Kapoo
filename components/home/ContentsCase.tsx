/**
 * 컨텐츠 케이스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 19:56:14
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';

// 사용자 모듈
import ContentList from '@components/contents/ContentList';
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/home/contentscase.module.scss';

interface Props {
	num: number,
	title: string,
	url: { pathname: string },
	list: ContentProps[]
}

/**
 * 컨텐츠 케이스 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentsCase({ num, title, url, list }: Props): ReactElement
{
	const router = useRouter();

	return (
		<Container maxWidth="md" className={styles.root}>
			<Typography component="h1" className={styles.title} gutterBottom align="center">{title}</Typography>

			<ContentList list={list.slice(0, num)} />

			<Button className={styles.more} onClick={() => router.push(url)}>M O R E</Button>
		</Container>
	);
}