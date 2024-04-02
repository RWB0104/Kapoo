/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:17:24
 */

import Menu from '@mui/icons-material/Menu';
import { IconButton, PaletteMode } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { MouseEventHandler, ReactNode } from 'react';

import styles from './Header.module.scss';

const cn = classNames.bind(styles);

export interface HeaderProps extends BoxProps
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;

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
export default function Header({ theme, logo, title, isTransparent, onMenuClick, ...props }: HeaderProps): ReactNode
{
	const calc = <T, >(transparent?: T, light?: T, dark?: T): T | undefined =>
	{
		// 투명일 경우
		if (isTransparent)
		{
			return transparent;
		}

		if (theme === 'dark')
		{
			return dark;
		}

		return light;
	};

	return (
		<Box
			bgcolor={calc<BoxProps['bgcolor']>('transparent', 'white', '#121212')}
			borderBottom={1}
			borderColor={calc<BoxProps['borderColor']>('#FFFFFF30', 'transparent', 'transparent')}
			boxShadow={calc<BoxProps['boxShadow']>(undefined, '0px 0px 5px #00000050', '0px 0px 5px #00000050')}
			className={cn('header', { isTransparent: true })}
			component='header'
			data-component='Header'
			left={0}
			padding={1}
			position='fixed'
			top={0}
			width='100%'
			zIndex={10000}
			{...props}
		>
			<Stack color={calc<StackProps['color']>('white', undefined, undefined)} direction='row' gap={2} height='100%' width='100%'>
				<IconButton color='inherit' onClick={onMenuClick}>
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