/**
 * 타일 atom 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 17:57:28
 */

import Box, { BoxProps } from '@mui/material/Box';
import classNames from 'classnames/bind';

import styles from './Tile.module.scss';

const cn = classNames.bind(styles);

/**
 * 타일 atom 컴포넌트 반환 메서드
 *
 * @param {BoxProps} param0: BoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Tile({ className, children, ...props }: BoxProps): JSX.Element
{
	return (
		<Box
			className={cn('tile', className)}
			data-component='Tile'
			overflow='hidden'
			position='relative'
			{...props}
		>
			<Box height='100%' left={0} position='absolute' top={0} width='100%'>
				{children}
			</Box>
		</Box>
	);
}