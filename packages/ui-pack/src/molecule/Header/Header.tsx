/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:17:24
 */

import Menu from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { MouseEventHandler, ReactNode } from 'react';

import styles from './Header.module.scss';

const cn = classNames.bind(styles);

export interface HeaderProps extends BoxProps
{
	/**
	 * 로고 URL
	 */
	logo?: string;

	/**
	 * 타이틀
	 */
	title?: string;

	/**
	 * 투명 여부
	 */
	isTransparent?: boolean;

	/**
	 * 메뉴 클릭 이벤트 메서드
	 */
	onMenuClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 헤더 molecule 컴포넌트 반환 메서드
 *
 * @param {HeaderProps} param0: HeaderProps
 *
 * @returns {ReactNode} ReactNode
 */
export default function Header({ logo, title, isTransparent, onMenuClick }: HeaderProps): ReactNode
{
	return (
		<Box
			className={cn('header', { isTransparent: true })}
			component='header'
			data-component='Header'
			left={0}
			padding={1}
			position='fixed'
			top={0}
			width='100%'
			zIndex={10000}
		>
			<Stack color='white' direction='row' gap={2} height='100%' width='100%'>
				<IconButton color='inherit'>
					<Menu htmlColor='inherit' />
				</IconButton>

				<Stack alignItems='center' direction='row' gap={1}>
					<img alt={title} height={32} src={logo} width={32} />

					<Typography className={cn('title')}>{title}</Typography>

					{isTransparent ? 'isTopState' : 'basic'}
				</Stack>
			</Stack>
		</Box>
	);
}