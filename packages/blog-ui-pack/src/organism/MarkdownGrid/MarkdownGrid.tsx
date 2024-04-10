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
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

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

	const handleEnd = useCallback(() =>
	{
		const searchParams = new URLSearchParams(window.location.search);
		const page = Number.parseInt(searchParams.get('page') || '1', 10);

		searchParams.set('page', `${page + 1}`);

		replace(`${window.location.pathname}?${searchParams.toString()}`, { scroll: false });
	}, [ replace ]);

	return (
		<InfiniteScroll data-component='MarkdownGrid' onEnd={handleEnd}>
			<Grid spacing={4} container>
				{list.map(({ meta, urls }) =>
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
							/>
						</Grid>
					);
				})}
			</Grid>
		</InfiniteScroll>
	);
}