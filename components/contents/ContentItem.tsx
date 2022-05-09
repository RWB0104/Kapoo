/**
 * 컨텐츠 아이템 컴포넌트
 *
 * @author RWB
 * @since 2021.07.13 Tue 00:00:40
 */

// 라이브러리 모듈
import { useState } from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { IoIosArrowDown } from 'react-icons/io';

// 사용자 모듈
import NewContent from './NewContent';
import ContentMeta from './ContentMeta';
import { CATEGORY } from '@commons/env';
import { ContentProps, getWrittenTimes, isNewContent } from '@commons/common';
import { useSemanticHook } from '@commons/hook';
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/contents/ContentItem.module.scss';

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

	const semanticState = useSemanticHook();
	const [ state, setState ] = useState(undefined as boolean | undefined);

	const isNew = isNewContent(item.header.date);

	const themeState = useRecoilValue(themeAtom);

	return (
		<div className={styles[`root-${themeState}`]}>
			<div className={styles['image-wrapper']}>
				<Link href={`/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`}>
					<a>
						<img className={styles.image} src={coverImage} />
					</a>
				</Link>
			</div>

			<div className={styles['body-wrapper']}>
				<div className={styles.wrapper}>
					<div className={styles['category-wrapper']}>
						<img className={styles['category-image']} alt={category} src={CATEGORY[category] || 'https://user-images.githubusercontent.com/50317129/132937376-276bf532-841b-4f80-9ba7-d05063ee6e92.png'} />
						<h4 className={styles.category}>{category}</h4>

						<NewContent flag={isNew} />
					</div>

					<Link href={`/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`}>
						<a>
							<h3 className={styles.title}>{title}</h3>
						</a>
					</Link>

					{semanticState && <p className={styles.excerpt}>{excerpt}</p>}
				</div>

				<div className={styles.footer}>
					<p>🕔 {getWrittenTimes(new Date(date))}</p>

					{semanticState && (
						<button onClick={() => setState(state === undefined ? true : !state)}>
							<IoIosArrowDown className={styles[`footer-active-${themeState}`]} data-status={state} />
						</button>
					)}
				</div>

				{semanticState && (
					<div className={styles['footer-detail']} data-show={state}>
						<ContentMeta header={item.header} />
					</div>
				)}
			</div>
		</div>
	);
}