/**
 * 뷰 TOC organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 12:59:18
 */

'use client';

import { dancingScript } from '@kapoo/organism/global/AppThemeProvider';
import { viewStore } from '@kapoo/store/markdown';
import { themeStore } from '@kapoo/store/theme';

import TurnedIn from '@mui/icons-material/TurnedIn';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { ReactNode, useMemo } from 'react';
import ReactToc from 'react-toc';

import styles from './ViewTocBox.module.scss';

const cn = classNames.bind(styles);

/**
 * 뷰 TOC organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTocBox(): ReactNode
{
	const { theme } = themeStore();
	const { view } = viewStore();

	const bgcolor = useMemo(() => (theme === 'light' ? 'ivory' : undefined), [ theme ]);
	const image = useMemo(() => (theme === 'light' ? 'https://user-images.githubusercontent.com/50317129/260317028-9c42e25d-9213-4583-87af-66853cf16bc2.png' : 'https://user-images.githubusercontent.com/50317129/260317030-e4b8575b-f09e-47f4-ab70-168a817268c6.png'), [ theme ]);

	return (
		<Paper className='fullwidth' data-component='ViewTocBox'>
			<Stack
				bgcolor={bgcolor}
				padding={4}
				position='relative'
				spacing={2}
				width='100%'
			>
				<Stack alignItems='center'>
					<img
						alt={image}
						className={cn('line')}
						src={image}
						width='50%'
					/>
				</Stack>

				<Typography
					color='primary'
					fontFamily={dancingScript.style.fontFamily}
					fontWeight='bold'
					textAlign='center'
					variant='h4'
				>
					Table of Contents
				</Typography>

				<Stack alignItems='center'>
					<ReactToc className={cn('toc')} data-component='ViewTocBox' markdownText={view?.content || ''} type='raw' />
				</Stack>

				<Box bottom={-80} className={cn('tag')} fontSize={100} position='absolute' right={50}>
					<TurnedIn color='error' fontSize='inherit' />
				</Box>

				<Stack alignItems='center'>
					<img
						alt={image}
						className={cn('line', 'last')}
						src={image}
						width='50%'
					/>
				</Stack>
			</Stack>
		</Paper>
	);
}