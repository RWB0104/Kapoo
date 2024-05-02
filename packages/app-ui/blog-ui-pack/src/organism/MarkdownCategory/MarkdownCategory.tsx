/**
 * 마크다운 카테고리 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 17:56:40
 */

'use client';

import CollapseBox, { CollapseBoxControllerProps, CollapseBoxHandler } from '@kapoo/ui-pack/molecule/CollapseBox';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import styles from './MarkdownCategory.module.scss';
import MarkdownCategoryTile, { MarkdownCategoryTileProps } from './sub/MarkdownCategoryTile';

const cn = classNames.bind(styles);

export interface MarkdownCategoryProps
{
	/**
	 * 카테고리
	 */
	categories: MarkdownCategoryTileProps[];
}

const key = 'category';

/**
 * 마크다운 카테고리 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownCategoryProps} param0: MarkdownCategoryProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownCategory({ categories }: MarkdownCategoryProps): JSX.Element
{
	const [ isOpenState, setOpenState ] = useState<boolean>();
	const [ controllerState, setControllerState ] = useState<CollapseBoxControllerProps>();

	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const hasSelected = useMemo(() => searchParams.has(key), [ searchParams ]);

	const handleOpenClick = useCallback(() =>
	{
		controllerState?.handle();
	}, [ controllerState ]);

	const handleClick = useCallback((label: string) =>
	{
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.delete('page');

		const category = urlParams.getAll(key);
		const has = urlParams.has(key, label);

		// 전체를 선택할 경우
		if (label === '전체')
		{
			urlParams.delete(key);
		}

		// 전체를 제외한 모든 카테고리를 선택할 경우 (전체, 선택된 카테고리를 반영하기 위해 2 더함)
		else if (!has && categories.length === category.length + 2)
		{
			urlParams.delete(key);
		}

		// 이미 존재하는 카테고리일 경우
		else if (has)
		{
			urlParams.delete(key, label);
		}

		// 아닐 경우
		else
		{
			urlParams.append(key, label);
		}

		replace(`${window.location.pathname}?${urlParams.toString()}`, { scroll: false });
	}, [ categories ]);

	const handleControlled = useCallback<CollapseBoxHandler>((flag) =>
	{
		setOpenState(flag);
	}, []);

	return (
		<Paper data-component='MarkdownCategory' variant='outlined'>
			<Stack>
				<ButtonBase onClick={handleOpenClick}>
					<Stack
						alignItems='center'
						direction='row'
						justifyContent='space-between'
						padding={1}
						paddingLeft={2}
						paddingRight={2}
						width='100%'
					>
						<Typography component='h5' fontWeight='bold' variant='h5'># 카테고리</Typography>

						<ExpandMore className={cn('icon', { open: isOpenState })} />
					</Stack>
				</ButtonBase>
			</Stack>

			<CollapseBox controller={setControllerState} onControlled={handleControlled}>
				<Grid spacing={0.5} container>
					{categories.map(({ label, count, selected }) => (
						<Grid key={label} md={2} sm={3} xs={4} item>
							<MarkdownCategoryTile
								count={count}
								label={label}
								selected={!hasSelected || selected}
								onClick={() => handleClick(label)}
							/>
						</Grid>
					))}
				</Grid>
			</CollapseBox>
		</Paper>
	);
}