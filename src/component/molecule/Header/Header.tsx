/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 03:35:18
 */

import Logo from '@kapoo/atom/Logo';
import { APP_INFO } from '@kapoo/env';

import Menu from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

export interface HeaderProps extends BoxProps
{
	/**
	 * 메뉴 클릭 이벤트 핸들러
	 */
	onMenuClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 헤더 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {HeaderProps} param0: HeaderProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Header({ onMenuClick, ...props }: HeaderProps): ReactNode
{
	const { palette: { background: { default: defaultColor } } } = useTheme();

	return (
		<Box
			bgcolor={defaultColor}
			boxShadow='0px 3px 10px black'
			component='header'
			data-component='Header'
			height={50}
			left={0}
			position='fixed'
			top={0}
			width='100%'
			zIndex={10000}
			{...props}
		>
			<Stack alignItems='center' direction='row' height='100%' paddingLeft={2} paddingRight={2} spacing={2}>
				{onMenuClick ? (
					<IconButton color='inherit' onClick={onMenuClick}>
						<Menu />
					</IconButton>
				) : null}

				<Link href='/'>
					<Stack alignItems='center' direction='row' spacing={2}>
						<Logo size={24} />
						<Typography color='inherit' fontWeight='bold'>{APP_INFO.title}</Typography>
					</Stack>
				</Link>
			</Stack>
		</Box>
	);
}