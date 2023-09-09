/**
 * 홈 웰컴 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 12:21:57
 */

'use client';

import { APP_INFO } from '@kapoo/env';
import { gamjaFlower } from '@kapoo/organism/global/AppThemeProvider';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 홈 웰컴 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeWelcomBox(): ReactNode
{
	return (
		<Stack alignItems='center' data-component='HomeWelcomBox' padding={4} paddingBottom={20} paddingTop={20} spacing={5}>
			<Stack
				borderRadius={4}
				boxShadow='0px 0px 20px #00000099'
				display='flex'
				height={300}
				overflow='hidden'
				width={300}
			>
				<img alt={APP_INFO.title} height='100%' src='/thumb.png' width='100%' />
			</Stack>

			<Typography fontFamily={gamjaFlower.style.fontFamily} fontWeight='bold' textAlign='center' variant='h4'>{APP_INFO.title}</Typography>
		</Stack>
	);
}