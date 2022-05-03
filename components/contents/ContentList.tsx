/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 22:32:57
 */

// 라이브러리 모듈
import { Grid } from '@material-ui/core';

// 사용자 모듈
import ContentItem from '@components/contents/ContentItem';
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contentlist.module.scss';

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
	const map = list.map((item, index) => (
		<Grid item key={index} className={styles.item}>
			<ContentItem item={item} />
		</Grid>
	));

	return (
		<Grid container className={styles.root}>{map}</Grid>
	);
}