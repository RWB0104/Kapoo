/**
 * 게시글 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.21 월 18:58:13
 */

'use client';

import PostsList from '@kapoo/organism/posts/PostsList';
import { postsStore } from '@kapoo/store/markdown';

import Stack from '@mui/material/Stack';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useMemo } from 'react';

/**
 * 게시글 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsBox(): ReactNode
{
	const { markdown } = postsStore();

	const router = useRouter();
	const seachParam = useSearchParams();
	const pathname = usePathname();

	const handleFetch = useCallback(() =>
	{
		const page = parseInt(seachParam.get('page') || '1', 10);
		const keyword = seachParam.get('keyword');
		const category = seachParam.getAll('category');

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

	const list = useMemo(() =>
	{
		const page = parseInt(seachParam.get('page') || '1', 10);

		const start = 0;
		const end = page * 10;

		return markdown.slice(start, end);
	}, [ seachParam.toString(), markdown ]);

	const isLast = useMemo(() =>
	{
		const page = parseInt(seachParam.get('page') || '1', 10);
		const last = Math.ceil(markdown.length / 10) + 1;

		return page >= last;
	}, [ seachParam, markdown ]);

	return (
		<Stack data-component='PostsBox'>
			<PostsList isLast={isLast} list={list} onFetch={handleFetch} />
		</Stack>
	);
}