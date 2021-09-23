/**
 * 컨텐츠 조회수 컴포넌트
 *
 * @author RWB
 * @since 2021.09.23 Thu 16:37:47
 */

// 라이브러리 모듈
import { ReactElement } from 'react';

// 사용자 모듈
import { BASE_URL } from '@commons/env';

// 스타일
import styles from '@styles/components/contents/contenthits.module.scss';

interface Props {
	type: string,
	urls: string[]
}

/**
 * 컨텐츠 조회수 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentHits({ type, urls }: Props): ReactElement
{
	const url = `${BASE_URL}/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`;

	return <img className={styles.counter} src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodeURIComponent(url)}&count_bg=%2379C83D&title_bg=%23555555&icon=react.svg&icon_color=%2348CAF7&title=hits&edge_flat=false`} />;
}