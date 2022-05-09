/**
 * 컨텐츠 보드 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 09:57:28
 */

// 사용자 모듈
import ContentList from './ContentList';
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/ContentBoard.module.scss';

interface Props
{
	list: ContentProps[]
}

/**
 * 컨텐츠 보드 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentBoard({ list }: Props): JSX.Element | null
{
	console.dir(list);
	return (
		<article className={styles.root}>
			<ContentList list={list} />
		</article>
	);
}