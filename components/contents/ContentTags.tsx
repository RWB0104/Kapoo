/**
 * 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.07.16 Fri 00:42:43
 */

// 라이브러리 모듈
import Link from 'next/link';

// 스타일
import styles from '@styles/components/contents/ContentTags.module.scss';

interface Props
{
	type: string
	tags: string[]
}

/**
 * 컨텐츠 태그 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentTags({ type, tags }: Props): JSX.Element | null
{
	return tags.map((item, index) => (
		<Link key={index} href={`/${type}/tag/${item}/1`}>
			<a className={styles.root} title={item}>{item}</a>
		</Link>
	));
}