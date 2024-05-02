/**
 * 마크다운 인피니트 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.24 Wed 00:15:38
 */

'use client';

import { refererStore } from '@kapoo/state';
import InfiniteScroll from '@kapoo/ui-pack/organism/InfiniteScroll';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { BlogMarkdownDetailProps, MarkdownHeaderProps } from '../../common';
import MarkdownGrid from '../MarkdownGrid';

export interface MarkdownInfiniteGridProps
{
	/**
	 * 리스트
	 */
	list: BlogMarkdownDetailProps<MarkdownHeaderProps>[];
}

export default function MarkdownInfiniteGrid({ list }: MarkdownInfiniteGridProps): JSX.Element
{
	const { replace } = useRouter();

	const { setRefererState } = refererStore();

	const searchParams = useSearchParams();
	const page = useMemo(() => Number.parseInt(searchParams.get('page') || '1', 10), [ searchParams ]);
	const category = useMemo(() => searchParams.getAll('category') || [], [ searchParams ]);
	const keyword = useMemo(() => searchParams.get('keyword') || undefined, [ searchParams ]);

	const handleEnd = useCallback(() =>
	{
		const urlParams = new URLSearchParams(window.location.search);
		const page = Number.parseInt(urlParams.get('page') || '1', 10);

		urlParams.set('page', `${page + 1}`);

		replace(`${window.location.pathname}?${urlParams.toString()}`, { scroll: false });
	}, [ replace ]);

	const filteredList = useMemo(() => list.filter(({ meta, summary }) =>
	{
		let matched = meta.publish;

		// 카테고리가 하나 이상 선택된 경우
		if (category.length > 0)
		{
			matched = matched && category.includes(meta.category);
		}

		// 키워드가 하나 이상 입력된 경우
		if (keyword)
		{
			matched = matched && summary.includes(keyword.toLowerCase());
		}

		return matched;
	}), [ list, category, keyword ]);

	const pageFilteredList = useMemo(() => filteredList.slice(0, page * 6), [ filteredList, page ]);

	useEffect(() =>
	{
		setRefererState(undefined);

		const scroll = sessionStorage.getItem('scroll');

		// 스크롤이 유효할 경우
		if (scroll)
		{
			window.scrollTo({ top: Number.parseInt(scroll, 10) || 0 });

			sessionStorage.removeItem('scroll');
		}
	}, []);

	return (
		<InfiniteScroll data-component='MarkdownInfiniteGrid' disabled={pageFilteredList.length >= filteredList.length} onEnd={handleEnd}>
			<MarkdownGrid list={pageFilteredList} />
		</InfiniteScroll>
	);
}