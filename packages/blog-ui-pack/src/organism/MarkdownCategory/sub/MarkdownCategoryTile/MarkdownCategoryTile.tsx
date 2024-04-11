/**
 * 마크다운 카테고리 타일 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.12 Fri 00:50:48
 */

import Tile from '@kapoo/ui-pack/atom/Tile';
import Img from '@kapoo/ui-pack/organism/Img';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { MouseEventHandler } from 'react';

import styles from './MarkdownCategoryTile.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownCategoryTileProps
{
	/**
	 * 라벨
	 */
	label: string;

	/**
	 * 카운트
	 */
	count: number;

	/**
	 * 선택 여부
	 */
	selected?: boolean;

	/**
	 * 클릭 이벤트 메서드
	 */
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 마크다운 카테고리 타일 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownCategoryTileProps} param0: MarkdownCategoryTileProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownCategoryTile({ label, count, selected, onClick }: MarkdownCategoryTileProps): JSX.Element
{
	return (
		<Tile data-component='MarkdownCategoryItem'>
			<ButtonBase
				className={cn('button')}
				onClick={onClick}
			>
				<Box height='100%' position='absolute' width='100%'>
					<Img
						className={cn('image', { dimmed: selected === false })}
						height='100%'
						src={`https://datastore.itcode.dev/blog/category/${encodeURIComponent(label)}.png`}
						width='100%'
					/>
				</Box>

				<Stack
					height='100%'
					justifyContent='end'
					left={0}
					position='absolute'
					top={0}
					width='100%'
				>
					<Stack
						alignItems='center'
						bgcolor='#00000075'
						className={cn('label')}
						direction='row'
						justifyContent='space-between'
						padding={1}
					>
						<Typography color='white' variant='caption'>{label}</Typography>
						<Typography color='white' variant='caption'>{count}</Typography>
					</Stack>
				</Stack>
			</ButtonBase>
		</Tile>
	);
}