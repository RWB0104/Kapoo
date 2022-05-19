/**
 * 조회수 컴포넌트
 *
 * @author RWB
 * @since 2021.09.23 Thu 16:37:47
 */

import { BASE_URL } from '@commons/env';
import styles from '@styles/components/global/Hits.module.scss';
import classNames from 'classnames/bind';

interface Props
{
	urls?: string[]
}

/**
 * 조회수 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function Hits({ urls }: Props): JSX.Element
{
	const cn = classNames.bind(styles);

	let url = BASE_URL;

	// url이 배열일 경우
	if (Array.isArray(urls))
	{
		urls.forEach((e) => url += `/${e}`);
	}

	return <img alt='count' className={cn('counter')} src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodeURIComponent(url)}&count_bg=%23555555&title_bg=%23555555&icon=react.svg&icon_color=%2348CAF7&title=hits&edge_flat=false`} />;
}