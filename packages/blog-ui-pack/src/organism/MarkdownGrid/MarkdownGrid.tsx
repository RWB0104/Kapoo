/**
 * 마크다운 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 02:11:51
 */

'use client';

import { MarkdownDetailProps } from '@kapoo/markdown-kit';
import InfiniteScroll from '@kapoo/ui-pack/organism/InfiniteScroll';
import { Grid } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useMemo } from 'react';

import { MarkdownHeaderProps } from '../../common';
import MarkdownCard from '../MarkdownCard';

export interface MarkdownGridProps
{
	/**
	 * 리스트
	 */
	list: MarkdownDetailProps<MarkdownHeaderProps>[];
}

/**
 * 마크다운 그리드 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownGridProps} param0: MarkdownGridProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownGrid({ list }: MarkdownGridProps): JSX.Element
{
	const { replace } = useRouter();

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

	const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() =>
	{
		sessionStorage.setItem('scroll', `${window.scrollY}`);
	}, []);

	useEffect(() =>
	{
		const scroll = sessionStorage.getItem('scroll');

		// 스크롤이 유효할 경우
		if (scroll)
		{
			window.scrollTo({ top: Number.parseInt(scroll, 10) || 0 });

			sessionStorage.removeItem('scroll');
		}
	}, []);

	return (
		<InfiniteScroll data-component='MarkdownGrid' onEnd={handleEnd}>
			<Grid spacing={4} container>
				{list.filter(({ meta }) =>
				{
					const summary = [
						meta.title,
						meta.excerpt,
						meta.category,
						...meta.tag
					].join('|||').toLowerCase();

					let matched = meta.publish;

					// 카테고리가 하나 이상 선택된 경우
					if (category.length > 0)
					{
						matched = category.includes(meta.category);
					}

					// 키워드가 하나 이상 입력된 경우
					if (keyword)
					{
						matched = summary.includes(keyword.toLowerCase());
					}

					return matched;
				})
					.slice(0, page * 6)
					.map(({ meta, urls }) =>
					{
						const href = [ meta.type, ...urls ].join('/');

						return (
							<Grid key={href} md={4} sm={6} xs={12} item>
								<MarkdownCard
									category={meta.category}
									description={meta.excerpt}
									href={href}
									thumbnail={meta.coverImage}
									timestamp={meta.date}
									title={meta.title}
									onClick={handleClick}
								/>
							</Grid>
						);
					})}
			</Grid>
		</InfiniteScroll>
	);
}