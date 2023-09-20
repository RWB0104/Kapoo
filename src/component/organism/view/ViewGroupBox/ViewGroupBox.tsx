/**
 * 뷰 그룹 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 02:58:00
 */

'use client';

import Image from '@kapoo/atom/Image';
import { viewStore } from '@kapoo/store/markdown';

import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import styles from './ViewGroupBox.module.scss';

const cn = classNames.bind(styles);

/**
 * 뷰 그룹 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode | null} ReactNode
 */
export default function ViewGroupBox(): ReactNode | null
{
	const { view } = viewStore();

	const [ isOpenState, setOpenState ] = useState(false);

	const idx = useMemo(() => view?.info?.group?.findIndex(({ url }) => url === view.url), [ view ]);

	const handleDownClick = useCallback(() =>
	{
		setOpenState(true);
	}, [ setOpenState ]);

	const handleUpClick = useCallback(() =>
	{
		setOpenState(false);
	}, [ setOpenState ]);

	return view?.info?.group ? (
		<Paper data-component='ViewGroupBox' variant='outlined'>
			<Stack>
				<Stack alignItems='center' height={200} justifyContent='center' position='relative'>
					<Image
						alt={view.frontmatter.group}
						className={cn('image')}
						height='100%'
						src={view.frontmatter.coverImage}
						width='100%'
					/>

					<Box bgcolor='#00000099' height='100%' position='absolute' width='100%' />

					<Box padding={2} zIndex={2}>
						<Typography color='white' textAlign='center' variant='h6'>이 게시글은 <Typography color='gold' component='span' variant='inherit'>{view.frontmatter.group}</Typography> 시리즈의 {view.info.group.length}개 중 {view.info.group.length - (idx || 0)}번 째 게시글입니다.</Typography>
					</Box>
				</Stack>

				{isOpenState ? (
					<Stack>
						<ul>
							{view.info.group.map(({ frontmatter, url }) =>
							{
								let tag = (
									<Link href={url}>
										<Typography className={cn('link')} color='primary'>{frontmatter.title}</Typography>
									</Link>
								);

								if (view.url === url)
								{
									tag = (
										<Stack alignItems='center' direction='row' spacing={1}>
											<Typography fontWeight='bold'>{frontmatter.title}</Typography>
											<ArrowBack className={cn('icon')} />
										</Stack>
									);
								}

								return (
									<li className={cn('li')} key={url}>
										{tag}
									</li>
								);
							})}
						</ul>

						<Button color='inherit' size='large' startIcon={<ArrowDropUp />} onClick={handleUpClick}>그만 볼래요!</Button>
					</Stack>
				) : <Button color='inherit' size='large' startIcon={<ArrowDropDown />} onClick={handleDownClick}>시리즈가 궁금하다면?</Button>}
			</Stack>
		</Paper>
	) : null;
}