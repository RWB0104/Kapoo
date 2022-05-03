/**
 * 조회수 컴포넌트
 *
 * @author RWB
 * @since 2021.09.23 Thu 16:37:47
 */

// 사용자 모듈
import { BASE_URL } from '@commons/env';

// 스타일
import styles from '@styles/components/global/Hits.module.scss';

interface Props
{
	urls?: string[]
}

/**
 * 조회수 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Hits({ urls }: Props): JSX.Element | null
{
	let url = BASE_URL;

	// url이 배열일 경우
	if (Array.isArray(urls))
	{
		urls.forEach(e => url += `/${e}`);
	}

	return <img className={styles.counter} src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodeURIComponent(url)}&count_bg=%23555555&title_bg=%23555555&icon=react.svg&icon_color=%2348CAF7&title=hits&edge_flat=false`} />;
}