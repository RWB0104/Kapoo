/**
 * 컨텐츠 아이템 컴포넌트
 *
 * @author RWB
 * @since 2021.07.13 Tue 00:00:40
 */

// 라이브러리 모듈
import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

// 사용자 모듈
import ContentMeta from './ContentMeta';
import { CATEGORY } from '@commons/env';
import { ContentProps, getWrittenTimes } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contentitem.module.scss';
import { FaHotjar } from 'react-icons/fa';

interface Props
{
	item: ContentProps
}

/**
 * 컨텐츠 아이템 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentItem({ item }: Props): JSX.Element | null
{
	const { title, excerpt, coverImage, type, category, date } = item.header;

	const urls = item.url;

	const [ state, setState ] = useState(false);

	const isNew = new Date().getTime() - new Date(item.header.date).getTime() < 86400000 * 7;

	return (
		<Link href={`/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`}>
			<a className={styles.root}>
				<div>
					<div className={styles['image-wrapper']}>
						<img className={styles.image} src={coverImage} />
					</div>

					<div className={styles.wrapper}>
						<Box display="grid" className={styles['category-wrapper']} gridTemplateColumns="40px 1fr" alignItems="center">
							<img className={styles['category-image']} alt={category} src={CATEGORY[category] || 'https://user-images.githubusercontent.com/50317129/132937376-276bf532-841b-4f80-9ba7-d05063ee6e92.png'} />
							<h4 className={styles.category}>{category}</h4>

							{true && <FaHotjar color="orange" />}
						</Box>

						<h3 className={styles.title}>{title}</h3>
						<p className={styles.excerpt}>{excerpt}</p>
					</div>
				</div>

				<div className={styles.footer}>
					<p>🕔 {getWrittenTimes(new Date(date))}</p>

					<button onClick={() => setState(!state)}>
						{state ? <ArrowUpward /> : <ArrowDownward />}
					</button>
				</div>

				<div data-show={state}>
					<div className={styles['footer-detail']}>
						<ContentMeta header={item.header} />
					</div>
				</div>
			</a>
		</Link>
	);
}