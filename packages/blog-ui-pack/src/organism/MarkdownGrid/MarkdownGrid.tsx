/**
 * 마크다운 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 02:11:51
 */

'use client';

import { refererStore } from '@kapoo/state';
import { Grid } from '@mui/material';
import { MouseEventHandler, useCallback } from 'react';

import { BlogMarkdownDetailProps, MarkdownHeaderProps } from '../../common';
import MarkdownCard from '../MarkdownCard';

export interface MarkdownGridProps
{
	/**
	 * 리스트
	 */
	list: BlogMarkdownDetailProps<MarkdownHeaderProps>[];
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
	const { setRefererState } = refererStore();

	const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() =>
	{
		sessionStorage.setItem('scroll', `${window.scrollY}`);

		setRefererState(window.location.search);
	}, []);

	return (
		<Grid data-component='MarkdownGrid' spacing={4} container>
			{list.map(({ meta, url }) => (
				<Grid key={url} md={4} sm={6} xs={12} item>
					<MarkdownCard
						category={meta.category}
						description={meta.excerpt}
						href={url}
						tags={meta.tag}
						thumbnail={meta.coverImage}
						timestamp={meta.date}
						title={meta.title}
						type={meta.type}
						onClick={handleClick}
					/>
				</Grid>
			))}
		</Grid>
	);
}