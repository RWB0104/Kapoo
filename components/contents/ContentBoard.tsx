/**
 * 컨텐츠 보드 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 09:57:28
 */

// 라이브러리 모듈
import { ChangeEvent, ReactElement } from 'react';
import { Container } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';

// 사용자 모듈
import ContentList from './ContentList';
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contentboard.module.scss';

interface Props {
	baseUrl: string,
	page: number,
	total: number,
	list: ContentProps[]
}

/**
 * 컨텐츠 보드 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentBoard({ baseUrl, page, total, list }: Props): ReactElement
{
	const router = useRouter();

	return (
		<Container maxWidth="md" className={styles.root}>
			<ContentList list={list} />

			<Pagination className={styles.pagination} count={total} page={page} color="primary" onChange={(event: ChangeEvent<unknown>, value: number) => router.push(`${baseUrl}/${value}`)} />
		</Container>
	);
}