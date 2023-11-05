/**
 * 뷰 그룹 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 02:58:00
 */

'use client';

import Image from '@kapoo/atom/Image';
import { FrontmatterProps, MarkdownListItemProps } from '@kapoo/util/markdown';

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

export interface ViewGroupBoxProps
{
	/**
	 * 마크다운 메타
	 */
	frontmatter: FrontmatterProps;

	/**
	 * 마크다운 정보
	 */
	group: MarkdownListItemProps[] | null;

	/**
	 * 링크
	 */
	link: string;
}

/**
 * 뷰 그룹 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode | null} ReactNode
 */
export default function ViewGroupBox({ frontmatter, group, link }: ViewGroupBoxProps): ReactNode | null
{
	const [ isOpenState, setOpenState ] = useState(false);

	const idx = useMemo(() => group?.findIndex(({ url }) => url === link), [ group ]);

	const handleDownClick = useCallback(() =>
	{
		setOpenState(true);
	}, [ setOpenState ]);

	const handleUpClick = useCallback(() =>
	{
		setOpenState(false);
	}, [ setOpenState ]);

	return group ? (
		<Paper data-component='ViewGroupBox' variant='outlined'>
			<Stack>
				<Stack alignItems='center' height={200} justifyContent='center' position='relative'>
					<Box height='100%' left={0} position='absolute' top={0} width='100%'>
						<Image
							alt={frontmatter.group}
							className={cn('image')}
							height='100%'
							src={frontmatter.coverImage}
							width='100%'
						/>
					</Box>

					<Box padding={2} zIndex={2}>
						<Typography color='white' textAlign='center' variant='h6'>이 게시글은 <Typography color='gold' component='span' variant='inherit'>{frontmatter.group}</Typography> 시리즈의 {group.length}개 중 {group.length - (idx || 0)}번 째 게시글입니다.</Typography>
					</Box>
				</Stack>

				{isOpenState ? (
					<Stack>
						<ul>
							{group.map(({ frontmatter, url }) =>
							{
								let tag = (
									<Link href={url}>
										<Typography className={cn('link')} color='primary'>{frontmatter.title}</Typography>
									</Link>
								);

								if (link === url)
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