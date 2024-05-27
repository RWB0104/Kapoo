/**
 * 네임택 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.27 Mon 11:36:21
 */

import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import styles from './NameTag.module.scss';

import Tile from '../../atom/Tile';
import Img from '../../organism/Img';

const cn = classNames.bind(styles);

export interface NameTagProps extends BoxProps
{
	/**
	 * 이미지
	 */
	image: string;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 색상
	 */
	color?: CSSProperties['color'];

	/**
	 * 색상 리스트
	 */
	colors?: CSSProperties['color'][];
}

/**
 * 네임택 molecule 컴포넌트 반환 메서드
 *
 * @param {NameTagProps} param0: NameTagProps
 *
 * @returns {JSX.Element} JSX
 */
export default function NameTag({ image, title, color, colors = [ 'transparent' ], children, sx, ...props }: NameTagProps): JSX.Element
{
	return (
		<Box
			borderRadius={2}
			className={cn('tag')}
			data-component='NameTag'
			padding={1}
			sx={{ background: `linear-gradient(45deg, ${colors.join(', ')})`, ...sx }}
			{...props}
		>
			<Stack borderRadius={2} color={color} gap={3} padding={2}>
				<Tile>
					<Img src={image} />
				</Tile>

				<Box borderTop={`1px solid ${color}`} width='100%' />

				<Stack gap={1}>
					<Typography color='inherit' fontWeight='bold'>{title}</Typography>

					<Box color='inherit' width='100%'>
						{children}
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
}