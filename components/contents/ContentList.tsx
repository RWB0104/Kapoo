/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 22:32:57
 */

import { ContentProps } from '@commons/common';
import ContentItem from '@components/contents/ContentItem';
import styles from '@styles/components/contents/ContentList.module.scss';

interface Props
{
	list: ContentProps[]
}

/**
 * 컨텐츠 리스트 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentList({ list }: Props): JSX.Element
{
	const map = list.map((item, index) => <ContentItem data-index={index} item={item} key={index} />);

	return (
		<div className={styles.root}>{map}</div>
	);
}