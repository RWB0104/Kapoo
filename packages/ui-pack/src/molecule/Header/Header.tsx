/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:17:24
 */

import { colors } from '@kapoo/common';
import Menu from '@mui/icons-material/Menu';
import { IconButton, PaletteMode } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

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
 * @returns {JSX.Element} JSX
 */
export default function Header({ theme, logo, title, isTransparent, onMenuClick, ...props }: HeaderProps): JSX.Element
{
	const calc = <T, >(transparent: T, light: T, dark: T): T =>
	{
		// 투명일 경우
		if (isTransparent)
		{
			return transparent;
		}

		// 다크 테마일 경우
		if (theme === 'dark')
		{
			return dark;
		}

		return light;
	};

	return (
		<Box
			bgcolor={calc<BoxProps['bgcolor']>('transparent', '#FFFFFF70', '#12121270')}
			boxShadow={calc<BoxProps['boxShadow']>(undefined, `0px 0px 5px ${colors.shadow.default}`, `0px 0px 5px ${colors.shadow.default}`)}
			className={cn('header', { transparent: isTransparent })}
			component='header'
			data-component='Header'
			left={0}
			padding={0.5}
			position='fixed'
			top={0}
			width='100%'
			zIndex={10000}
			{...props}
		>
			<Stack alignItems='center' color={calc<StackProps['color']>('white', undefined, undefined)} direction='row' gap={2} height='100%' width='100%'>
				<IconButton color='inherit' onClick={onMenuClick}>
					<Menu htmlColor='inherit' />
				</IconButton>

				<Link href='/'>
					<Stack alignItems='center' direction='row' gap={2}>
						<img alt={title} height={24} src={logo} width={24} />

						<Typography className={cn('title')}>{title}</Typography>
					</Stack>
				</Link>
			</Stack>
		</Box>
	);
}