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
import { useEffect, useRef } from 'react';

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
	const ref = useRef<HTMLDivElement | null>(null);

	const map = list.map((item, index) => <ContentItem data-index={index} item={item} key={index} />);

	const cn = classNames.bind(styles);

	useEffect(() =>
	{
		let observer: IntersectionObserver | undefined;

		if (ref.current)
		{
			observer = new IntersectionObserver((ent, obs) =>
			{
				if (onLast)
				{
					onLast(ent, obs);
				}
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
	}, [ ref.current ]);

	return (
		<div className={cn('root')}>
			{map}

			<div className={cn('end')} ref={ref} />
		</div>
	);
}