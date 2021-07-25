/**
 * 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.07.16 Fri 00:42:43
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Chip } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';

// 스타일
import styles from '@styles/components/contents/contenttags.module.scss';

interface Props {
	type: string
	tags: string[]
}

/**
 * 컨텐츠 태그 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentTags({ type, tags }: Props): ReactElement
{
	const router = useRouter();

	const list = tags.map((item, index) => <Chip key={index} className={styles.root} label={item} clickable onClick={() => router.push(`/${type}/tag/${item}/1`)} />);

	return <>{list}</>;
}