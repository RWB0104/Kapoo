/**
 * 마크다운 카테고리 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.24 Thu 19:29:18
 */

'use client';

import MarkdownCategoryItem from '@kapoo/molecule/MarkdownCategoryItem';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalOffer from '@mui/icons-material/LocalOffer';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useMemo } from 'react';

interface CategoryProps
{
	/**
	 * 카테고리명
	 */
	name: string;

	/**
	 * 갯수
	 */
	count: number;

	/**
	 * 선택 여부
	 */
	selected: boolean;
}

export interface MarkdownCategoryProps
{
	/**
	 * 마크다운 리스트
	 */
	markdown: MarkdownListItemProps[];
}

/**
 * 마크다운 카테고리 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownCategoryProps} param0: MarkdownCategoryProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownCategory({ markdown }: MarkdownCategoryProps): ReactNode
{
	const router = useRouter();
	const seachParam = useSearchParams();
	const pathname = usePathname();

	const keyword = useMemo(() => seachParam.get('keyword'), [ seachParam ]);
	const category = useMemo(() => seachParam.getAll('category'), [ seachParam ]);

	const categories = useMemo(() => markdown
		.filter(({ frontmatter }) =>
		{
			// 키워드가 있을 경우
			if (keyword && keyword.length > 0)
			{
				return frontmatter.title.includes(keyword) || frontmatter.excerpt.includes(keyword);
			}

			return true;
		})
		.reduce<CategoryProps[]>((acc, { frontmatter }) =>
		{
			const idx = acc.findIndex(({ name }) => name === frontmatter.category);
			const has = category.includes(frontmatter.category);

			// 선택된 카테고리가 있을 경우
			if (idx > -1)
			{
				acc[idx].count += 1;
				acc[idx].selected = has;
			}

			// 아닐 경우
			else
			{
				acc.push({
					count: 1,
					name: frontmatter.category,
					selected: has
				});
			}

			return acc;
		}, [{
			count: markdown.length,
			name: '전체',
			selected: false
		}]), [ markdown, keyword, category ]);

	const isDimmed = useCallback((name: string) => category.length > 0 && !category.includes(name), [ category ]);

	const handleClick = useCallback((name: string) =>
	{
		const param = new URLSearchParams(seachParam);

		const keyword = param.get('keyword');
		const category = param.getAll('category');
		const has = category.includes(name);

		param.delete('page');

		// 키워드가 입력된 경우
		if (keyword)
		{
			param.set('keyword', keyword);
		}

		// 전체 카테고리일 경우
		if (name === '전체')
		{
			param.delete('category');
		}

		// 이미 선택된 카테고리일 경우
		else if (has)
		{
			param.delete('category');

			category.filter((i) => i !== name).forEach((i) =>
			{
				// 해제할 카테고리가 아닌 경우
				if (i !== name)
				{
					param.append('category', i);
				}
			});
		}

		// 선택되지 않은 카테고리일 경우
		else
		{
			param.append('category', name);
		}

		router.push(`${pathname}?${param.toString()}`, { scroll: false });
	}, [ keyword, seachParam ]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Stack alignItems='center' direction='row' spacing={2}>
					<LocalOffer color='primary' />
					<Typography fontWeight='bold' variant='h5'>카테고리</Typography>
				</Stack>
			</AccordionSummary>

			<AccordionDetails>
				<Grid spacing={0.5} container>
					{categories.map(({ name, count, selected }) => (
						<Grid key={name} xl={2} item>
							<MarkdownCategoryItem
								category={name}
								count={count}
								dimmed={isDimmed(name)}
								selected={selected}
								onClick={(): void => handleClick(name)}
							/>
						</Grid>
					))}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}