/**
 * 컨텐츠 아이템 컴포넌트
 *
 * @author RWB
 * @since 2021.07.13 Tue 00:00:40
 */

import { ContentProps, ContentTypeEnum, getWrittenTimes, isNewContent } from '@kapoo/commons/common';
import { CATEGORY } from '@kapoo/commons/env';
import { useSemanticHook } from '@kapoo/commons/hook';
import { postsScrollAtom, projectsScrollAtom, themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/ContentItem.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ContentMeta from './ContentMeta';
import NewContent from './NewContent';

interface Props
{
	item: ContentProps
}

/**
 * 컨텐츠 아이템 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentItem({ item }: Props): JSX.Element
{
	const { title, excerpt, coverImage, type, category, date } = item.header;

	const urls = item.url;

	const semanticState = useSemanticHook();
	const [ state, setState ] = useState(undefined as boolean | undefined);

	const isNew = isNewContent(item.header.date);

	const setPostsScrollState = useSetRecoilState(postsScrollAtom);
	const setProjectsScrollState = useSetRecoilState(projectsScrollAtom);

	const setScrollState = item.header.type === ContentTypeEnum.POSTS ? setPostsScrollState : setProjectsScrollState;

	const themeState = useRecoilValue(themeAtom);

	const postUrl = `/${type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`;
	const categoryUrl = `/${type}?category=${category}`;

	const cn = classNames.bind(styles);

	return (
		<div className={cn('root', themeState)}>
			<div className={cn('image-wrapper')}>
				<Link href={postUrl} legacyBehavior passHref>
					<a href='#replace' onClick={() => setScrollState(window.scrollY)}>
						<img alt='cover' className={cn('image')} src={coverImage} />
					</a>
				</Link>
			</div>

			<div className={cn('body-wrapper')}>
				<div className={cn('wrapper')}>
					<div className={cn('category-wrapper')}>
						<Link href={categoryUrl} legacyBehavior passHref>
							<a href='#replace'>
								<img alt={category} className={cn('category-image')} src={CATEGORY[category] || CATEGORY.All} />
							</a>
						</Link>

						<Link href={categoryUrl} legacyBehavior passHref>
							<a href='#replace'>
								<h4 className={cn('category')}>{category}</h4>
							</a>
						</Link>

						<NewContent flag={isNew} />
					</div>

					<Link href={postUrl} legacyBehavior passHref>
						<a href='#replace' onClick={() => setScrollState(window.scrollY)}>
							<h3 className={cn('title')}>{title}</h3>
						</a>
					</Link>

					{semanticState && <p className={cn('excerpt')}>{excerpt}</p>}
				</div>

				<div className={cn('footer')}>
					<p>🕔 {getWrittenTimes(new Date(date))}</p>

					{semanticState && (
						<button onClick={() => setState(state === undefined ? true : !state)}>
							<IoIosArrowDown className={cn('footer-active', themeState)} data-status={state} />
						</button>
					)}
				</div>

				{semanticState && (
					<div className={cn('footer-detail')} data-show={state}>
						<ContentMeta header={item.header} />
					</div>
				)}
			</div>
		</div>
	);
}