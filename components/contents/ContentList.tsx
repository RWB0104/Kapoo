/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 22:32:57
 */

// 사용자 모듈
import ContentItem from '@components/contents/ContentItem';
import { ContentProps } from '@commons/common';

// 스타일
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
 * @returns {JSX.Element | null} JSX
 */
export default function ContentList({ list }: Props): JSX.Element | null
{
	const map = list.map((item, index) => <ContentItem key={index} item={item} data-index={index} />);

	return (
		<div className={styles.root}>{map}</div>
	);
}