/**
 * 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.07.16 Fri 00:42:43
 */

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
 * @returns {JSX.Element} JSX
 */
export default function ContentTags({ type, tags }: Props): JSX.Element
{
	return <>{tags.map((item, index) => <p className={styles.root} data-type={type} key={index}>{item}</p>)}</>;
}