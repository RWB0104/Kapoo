/**
 * 마크다운 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 17:55:48
 */

'use client';

import Stack from '@mui/material/Stack';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { BlogMarkdownDetailProps, MarkdownHeaderProps } from '../../common';
import MarkdownCategory from '../MarkdownCategory';
import { MarkdownCategoryTileProps } from '../MarkdownCategory/sub/MarkdownCategoryTile';
import MarkdownInfiniteGrid from '../MarkdownInfiniteGrid';
import MarkdownSearch from '../MarkdownSearch';

export interface MarkdownBoxProps
{
	/**
	 * 마크다운
	 */
	markdown: BlogMarkdownDetailProps<MarkdownHeaderProps>[];
}

/**
 * 마크다운 박스 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownBoxProps} param0: MarkdownBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownBox({ markdown }: MarkdownBoxProps): JSX.Element
{
	const searchParams = useSearchParams();
	const category = useMemo(() => searchParams.getAll('category') || [], [ searchParams ]);
	const keyword = useMemo(() => searchParams.get('keyword') || undefined, [ searchParams ]);

	const categories: MarkdownCategoryTileProps[] = useMemo(() =>
	{
		const arr: MarkdownCategoryTileProps[] = [{
			count: markdown.length,
			label: '전체',
			selected: category.length === 0
		}];

		let list = markdown;

		// 키워드가 있을 경우
		if (keyword)
		{
			list = list.filter(({ summary }) => summary.includes(keyword.toLowerCase()));
		}

		list.forEach(({ meta }) =>
		{
			const idx = arr.findIndex(({ label }) => label === meta.category);

			const selected = category.includes(meta.category);

			// 이미 선택된 카테고리일 경우
			if (idx > -1)
			{
				arr[idx].count += 1;
				arr[idx].selected = selected;
			}

			// 아닐 경우
			else
			{
				arr.push({
					count: 1,
					label: meta.category,
					selected
				});
			}
		});

		return arr;
	}, [ markdown, keyword, category ]);

	return (
		<Stack data-component='MarkdownBox' gap={2} paddingTop={4} width='100%'>
			<MarkdownSearch />
			<MarkdownCategory categories={categories} />
			<MarkdownInfiniteGrid list={markdown} />
		</Stack>
	);
}