/**
 * 컨텐츠 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 16:07:52
 */

import { ContentHeaderProps, getDateDetail } from '@kapoo/commons/common';
import { CATEGORY } from '@kapoo/commons/env';
import styles from '@kapoo/styles/components/contents/ContentMeta.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';

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

	const cn = classNames.bind(styles);

	return (
		<article className={cn('root')}>
			<div className={cn('item')}>
				<p className={cn('text')}>📆 작성일</p>

				<p className={cn('text')}>{`${dateDetail.year}-${dateDetail.month}-${dateDetail.day} ${dateDetail.week} ${dateDetail.hour}:${dateDetail.minute}:${dateDetail.second}`}</p>
			</div>

			<div className={cn('item')}>
				<p className={cn('text')}>📚 카테고리</p>

				<div className={cn('category-wrapper')}>
					<img alt={header.category} className={cn('category-image')} src={CATEGORY[header.category] || CATEGORY.All} />
					<Link href={`/${header.type}?category=${header.category}`} legacyBehavior passHref>
						<a className={cn('link')} href='#replace'>{header.category}</a>
					</Link>
				</div>
			</div>

			<div className={cn('item')}>
				<p className={cn('text')}>🏷️ 태그</p>

				<div className={cn('tags')}>
					<ContentTags tags={header.tag} type={header.type} />
				</div>
			</div>
		</article>
	);
}