/**
 * 마크다운 카테고리 아이템 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.24 Thu 19:26:50
 */

import Box from '@mui/material/Box';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import styles from './MarkdownCategoryItem.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownCategoryItemProps extends ButtonBaseProps
{
	/**
	 * 카테고리명
	 */
	category: string;

	/**
	 * 갯수
	 */
	count: number;

	/**
	 * 선택 여부
	 */
	selected?: boolean;

	/**
	 * 흐린 효과 여부
	 */
	dimmed?: boolean;
}

/**
 * 마크다운 카테고리 아이템 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownCategoryItemProps} param0: MarkdownCategoryItemProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownCategoryItem({ category, count, selected, dimmed, ...props }: MarkdownCategoryItemProps): ReactNode
{
	return (
		<ButtonBase className='fullwidth' data-component='MarkdownCategoryItem' data-selected={selected} {...props}>
			<Box className={cn('card')} position='relative' width='100%'>
				<Box className={cn('wrap')}>
					<img
						alt={category}
						className={cn('image', { dimmed })}
						height='100%'
						src={`https://datastore.itcode.dev/blog/category/${encodeURIComponent(category)}.png`}
						width='100%'
					/>
				</Box>

				<Stack
					alignItems='center'
					bgcolor='#000000AA'
					bottom={0}
					className={cn('title')}
					direction='row'
					justifyContent='space-between'
					padding={1}
					position='absolute'
					width='100%'
				>
					<Typography color='white' variant='caption'>{category}</Typography>
					<Typography color='white' variant='caption'>{count}</Typography>
				</Stack>
			</Box>
		</ButtonBase>
	);
}