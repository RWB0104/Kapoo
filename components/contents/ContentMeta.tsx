/**
 * 컨텐츠 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 16:07:52
 */

// 사용자 모듈
import ContentTags from './ContentTags';
import { ContentHeaderProps, getDateDetail } from '@commons/common';
import { CATEGORY } from '@commons/env';

// 스타일
import styles from '@styles/components/contents/ContentMeta.module.scss';

interface Props
{
	header: ContentHeaderProps
}

/**
 * 컨텐츠 메타 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentMeta({ header }: Props): JSX.Element | null
{
	const dateDetail = getDateDetail(header.date);

	return (
		<article className={styles.root}>
			<div className={styles.item}>
				<p className={styles.text}>📆 작성일</p>

				<p className={styles.text}>{`${dateDetail.year}-${dateDetail.month}-${dateDetail.day} ${dateDetail.week} ${dateDetail.hour}:${dateDetail.minute}:${dateDetail.second}`}</p>
			</div>

			<div className={styles.item}>
				<p className={styles.text}>📚 카테고리</p>

				<div className={styles['category-wrapper']}>
					<img className={styles['category-image']} alt={header.category} src={CATEGORY[header.category] || 'https://user-images.githubusercontent.com/50317129/132937376-276bf532-841b-4f80-9ba7-d05063ee6e92.png'} />
					<p className={styles.link}>{header.category}</p>
				</div>
			</div>

			<div className={styles.item}>
				<p className={styles.text}>🏷️ 태그</p>

				<div className={styles.tags}>
					<ContentTags type={header.type} tags={header.tag} />
				</div>
			</div>
		</article>
	);
}