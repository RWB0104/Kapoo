/**
 * 뷰 TOC organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 12:59:18
 */

'use client';

import { viewStore } from '@kapoo/store/markdown';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
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
	const { palette: { background, primary } } = useTheme();

	const { view } = viewStore();

	return (
		<Paper className='fullwidth' data-component='ViewTocBox' variant='outlined'>
			<Stack padding={2} position='relative' spacing={2} width='100%'>
				<Typography color='primary' fontWeight='bold' textAlign='center' variant='h5'>Table of Contents</Typography>

				<ReactToc className={cn('toc')} data-component='ViewTocBox' markdownText={view?.content || ''} type='raw' />

				<Box
					bgcolor={primary.main}
					bottom={-30}
					className={cn('tag')}
					height={100}
					position='absolute'
					right={50}
					width={50}
				/>

				<Box
					bgcolor={background.default}
					bottom={-48}
					className={cn('sub')}
					height={35}
					position='absolute'
					right={58}
					width={35}
				/>
			</Stack>
		</Paper>
	);
}