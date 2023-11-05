/**
 * 뷰 TOC organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 12:59:18
 */

'use client';

import { dancingScript } from '@kapoo/organism/global/AppThemeProvider';
import { themeStore } from '@kapoo/store/theme';
import { TocProps } from '@kapoo/util/markdown';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';

import styles from './ViewTocBox.module.scss';

const cn = classNames.bind(styles);

export interface ViewTocBoxProps
{
	/**
	 * TOC
	 */
	toc: TocProps[];
}

/**
 * 뷰 TOC organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTocBox({ toc }: ViewTocBoxProps): ReactNode
{
	const { palette } = useTheme();

	const { theme } = themeStore();

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
					<Box>
						{toc.map((i) => (
							<Box key={`${i.level}-${i.text}`}>
								<Link href={`#${i.text.replaceAll(' ', '-').toLowerCase()}`}>
									<Stack alignItems='center' direction='row' marginLeft={(i.level - 1) * 2} spacing={1}>
										<Box
											border='2px solid'
											borderColor={palette.primary.main}
											borderRadius='50%'
											height={10}
											width={10}
										/>

										<Typography>{i.text}</Typography>
									</Stack>
								</Link>
							</Box>
						))}
					</Box>
				</Stack>

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