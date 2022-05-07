/**
 * 컨텐츠 케이스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 19:56:14
 */

// 라이브러리 모듈
import Link from 'next/link';

// 사용자 모듈
import ContentList from '@components/contents/ContentList';
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/home/ContentsCase.module.scss';

interface Props
{
	num: number,
	title: string,
	url: { pathname: string },
	list: ContentProps[]
}

/**
 * 컨텐츠 케이스 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentsCase({ num, title, url, list }: Props): JSX.Element | null
{
	return (
		<article className={styles.root}>
			<h1 className={styles.title}>{title}</h1>

			<ContentList list={list.slice(0, num)} />

			<Link href={url}>
				<a className={styles.more} title="more">M O R E</a>
			</Link>
		</article>
	);
}