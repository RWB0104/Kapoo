/**
 * 뷰 컨트롤 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 02:57:22
 */

'use client';

import ViewControllButton from '@kapoo/molecule/ViewControllButton';
import { refererStore, viewStore } from '@kapoo/store/markdown';

import Menu from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';

/**
 * 뷰 컨트롤 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewControllBox(): ReactNode
{
	const { view } = viewStore();
	const { referer } = refererStore();

	const link = useMemo(() =>
	{
		let base = `/${view?.frontmatter.type}`;

		const query = [];

		// 페이지가 유효할 경우
		if (referer?.page)
		{
			query.push(`page=${referer.page}`);
		}

		// 카테고리가 유효할 경우
		if (referer?.category)
		{
			referer.category.forEach((i) =>
			{
				query.push(`category=${i}`);
			});
		}

		// 키워드가 유효할 경우
		if (referer?.keyword)
		{
			query.push(`keyword=${referer.keyword}`);
		}

		// 유효한 쿼리가 있을 경우
		if (query.length > 0)
		{
			base += `?${query.join('&')}`;
		}

		return base;
	}, [ view, referer ]);

	return (
		<Stack spacing={1} width='100%'>
			<Grid spacing={1} width='100%' container>
				<Grid lg={6} sm={12} xs={12} item>
					{view?.info?.prev ? (
						<ViewControllButton
							cover={view.info.prev.frontmatter.coverImage}
							link={view.info.prev.url}
							mode='prev'
							title={view.info.prev.frontmatter.title}
						/>
					) : null}
				</Grid>

				<Grid lg={6} sm={12} xs={12} item>
					{view?.info?.next ? (
						<ViewControllButton
							cover={view.info.next.frontmatter.coverImage}
							link={view.info.next.url}
							mode='next'
							title={view.info.next.frontmatter.title}
						/>
					) : null}
				</Grid>
			</Grid>

			<Divider />

			<Stack direction='row' justifyContent='end'>
				<Link href={link}>
					<Button color='inherit' size='small' startIcon={<Menu />} variant='outlined'>메뉴</Button>
				</Link>
			</Stack>
		</Stack>
	);
}