/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 22:32:57
 */

import { ContentProps } from '@kapoo/commons/common';
import ContentItem from '@kapoo/components/contents/ContentItem';
import styles from '@kapoo/styles/components/contents/ContentList.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, Fragment } from 'react';

interface Props
{
	list: ContentProps[]
	onLast?: IntersectionObserverCallback
}

/**
 * 컨텐츠 리스트 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentList({ list, onLast }: Props): JSX.Element
{
	const cn = classNames.bind(styles);
	const ref = useRef<HTMLDivElement | null>(null);

	const map = useMemo(() => list.map((item, index) => (
		<Fragment key={index}>
			<ContentItem data-index={index} item={item} />

			{index === list.length - 1 ? <div className={cn('end')} ref={ref} /> : null}
		</Fragment>
	)), [ list ]);

	useEffect(() =>
	{
		let observer: IntersectionObserver | undefined;

		if (ref.current)
		{
			observer = new IntersectionObserver((ent, obs) =>
			{
				ent.forEach(({ isIntersecting }) =>
				{
					if (isIntersecting)
					{
						if (onLast)
						{
							onLast(ent, obs);
						}
					}
				});
			}, { threshold: 1 });
			observer.observe(ref.current);
		}

		return () =>
		{
			if (observer)
			{
				observer.disconnect();
			}
		};
	}, [ ref, onLast ]);

	return (
		<div className={cn('root')}>
			{map}

		</div>
	);
}