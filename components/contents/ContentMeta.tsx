/**
 * 컨텐츠 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 16:07:52
 */

import { ContentHeaderProps, getDateDetail } from '@commons/common';
import { CATEGORY } from '@commons/env';
import styles from '@styles/components/contents/ContentMeta.module.scss';

import ContentTags from './ContentTags';

interface Props
{
	header: ContentHeaderProps
}

/**
 * 컨텐츠 메타 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentMeta({ header }: Props): JSX.Element
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
					<img alt={header.category} className={styles['category-image']} src={CATEGORY[header.category] || CATEGORY['All']} />
					<p className={styles.link}>{header.category}</p>
				</div>
			</div>

			<div className={styles.item}>
				<p className={styles.text}>🏷️ 태그</p>

				<div className={styles.tags}>
					<ContentTags tags={header.tag} type={header.type} />
				</div>
			</div>
		</article>
	);
}