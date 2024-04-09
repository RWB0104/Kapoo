/**
 * 마크다운 무한 스크롤 리스트 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:45:17
 */

'use client';

import InfiniteScroller from '@kapoo/molecule/InfiniteScroller';
import MarkdownList from '@kapoo/molecule/MarkdownList';
import { RefererProps, refererStore } from '@kapoo/store/markdown';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Box from '@mui/material/Box';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';

export interface MarkdownInfiniteListProps
{
	/**
	 * 마크다운 리스트
	 */
	markdown: MarkdownListItemProps[];
}

/**
 * 마크다운 무한 스크롤 리스트 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownInfiniteListProps} param0: MarkdownInfiniteListProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownInfiniteList({ markdown }: MarkdownInfiniteListProps): ReactNode
{
	const size = 6;

	const router = useRouter();
	const seachParam = useSearchParams();
	const pathname = usePathname();

	const { referer, setReferer } = refererStore();

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
			return (frontmatter.title.includes(keyword) || frontmatter.excerpt.includes(keyword)) && category.includes(frontmatter.category);
		}

		// 키워드만 입력된 경우
		if (keyword && keyword.length > 0)
		{
			return frontmatter.title.includes(keyword) || frontmatter.excerpt.includes(keyword);
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
		const end = page * size;

		return list.slice(start, end);
	}, [ page, list ]);

	const isLast = useMemo(() =>
	{
		const last = Math.ceil(list.length / size);

		return page >= last;
	}, [ page, list ]);

	const handleClick = useCallback(() =>
	{
		const param = new URLSearchParams(seachParam);
		const page = param.get('page');
		const keyword = param.get('keyword');
		const category = param.getAll('category');

		const referer: RefererProps = { scroll: window.scrollY };

		// 페이지가 유효할 경우
		if (page)
		{
			referer.page = page;
		}

		// 키워드가 유효할 경우
		if (keyword && keyword.length > 0)
		{
			referer.keyword = keyword;
		}

		// 카테고리가 유효할 경우
		if (category && category.length > 0)
		{
			referer.category = category;
		}

		setReferer(referer);
	}, [ seachParam, setReferer ]);

	useEffect(() =>
	{
		// 스크롤이 유효할 경우
		if (referer?.scroll)
		{
			window.scroll({ top: referer.scroll });
		}

		setReferer(undefined);
	}, [ setReferer ]);

	return (
		<Box data-component='MarkdownInfiniteList'>
			<InfiniteScroller fetchMargin='500px' isLast={isLast} onFetch={handleFetch}>
				<MarkdownList markdown={piece} onCardClick={handleClick} />
			</InfiniteScroller>
		</Box>
	);
}