/**
 * 마크다운 리스트 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:45:17
 */

'use client';

import InfiniteScroller from '@kapoo/molecule/InfiniteScroller';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Fragment, ReactNode, useCallback, useMemo } from 'react';

export type MarkdownListRenderer = (markdown: MarkdownListItemProps) => ReactNode;

export interface MarkdownListProps
{
	/**
	 * 마크다운 리스트
	 */
	markdown: MarkdownListItemProps[];

	/**
	 * 태그 렌더러
	 */
	render: MarkdownListRenderer;
}

/**
 * 마크다운 리스트
 *
 * @param {MarkdownListProps} param0: MarkdownListProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownList({ markdown, render }: MarkdownListProps): ReactNode
{
	const router = useRouter();
	const seachParam = useSearchParams();
	const pathname = usePathname();

	const page = useMemo(() => parseInt(seachParam.get('page') || '1', 10), [ seachParam ]);
	const keyword = useMemo(() => seachParam.get('keyword'), [ seachParam ]);
	const category = useMemo(() => seachParam.getAll('category'), [ seachParam ]);

	const handleFetch = useCallback(() =>
	{
		const param = new URLSearchParams(seachParam);
		param.set('page', `${page + 1}`);
		param.delete('category');

		if (keyword)
		{
			param.set('keyword', keyword);
		}

		category.forEach((i) =>
		{
			param.append('category', i);
		});

		router.push(`${pathname}?${param.toString()}`, { scroll: false });
	}, [ pathname, router, seachParam ]);

	const list = useMemo(() => markdown.filter(({ frontmatter }) =>
	{
		// 키워드, 카테고리가 모두 입력된 경우
		if (keyword && keyword.length > 0 && category.length > 0)
		{
			return frontmatter.title.includes(keyword) && category.includes(frontmatter.category);
		}

		// 키워드만 입력된 경우
		if (keyword && keyword.length > 0)
		{
			return frontmatter.title.includes(keyword);
		}

		// 카테고리만 입력된 경우
		if (category.length > 0)
		{
			return category.includes(frontmatter.category);
		}

		return true;
	}), [ category, keyword, markdown ]);

	const piece = useMemo(() =>
	{
		const start = 0;
		const end = page * 10;

		return list.slice(start, end);
	}, [ page, list ]);

	const isLast = useMemo(() =>
	{
		const last = Math.ceil(list.length / 10);

		return page >= last;
	}, [ page, list ]);

	return (
		<Stack data-component='PostsBox'>
			<InfiniteScroller isLast={isLast} onFetch={handleFetch}>
				{piece.map((i) => (
					<Fragment key={i.url}>
						{render(i)}
					</Fragment>
				))}
			</InfiniteScroller>
		</Stack>
	);
}