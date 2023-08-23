/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 03:35:18
 */

import { APP_INFO } from '@kapoo/env';

import Menu from '@mui/icons-material/Menu';
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
	return (
		<Box
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
			<Stack alignItems='center' direction='row' height='100%' padding={2} spacing={2}>
				{onMenuClick ? (
					<IconButton color='inherit' onClick={onMenuClick}>
						<Menu />
					</IconButton>
				) : null}

				<Link href='/'>
					<Stack alignItems='center' direction='row' spacing={2}>
						<Typography color='inherit' fontSize={18} fontWeight='bold'>{APP_INFO.title}</Typography>
					</Stack>
				</Link>
			</Stack>
		</Box>
	);
}