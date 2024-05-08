/**
 * 마크다운 그룹 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.15 Mon 02:25:29
 */

'use client';

import CollapseBox, { CollapseBoxControllerProps, CollapseBoxHandler } from '@kapoo/ui-pack/molecule/CollapseBox';
import Img from '@kapoo/ui-pack/organism/Img';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import styles from './MarkdownGroup.module.scss';

import { BlogMarkdownDetailGroupProps } from '../../common';

const cn = classNames.bind(styles);

export interface MarkdownGroupProps
{
	/**
	 * 그룹명
	 */
	title: string;

	/**
	 * 현재
	 */
	current?: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;

	/**
	 * 그룹 리스트
	 */
	groups: BlogMarkdownDetailGroupProps[];
}

/**
 * 마크다운 그룹 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownGroupProps} param0: MarkdownGroupProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownGroup({ title, current, thumbnail, groups }: MarkdownGroupProps): JSX.Element
{
	const currentIndex = useMemo(() => groups.length - groups.findIndex(({ url }) => url === current), [ current, groups ]);

	const [ isOpenState, setOpenState ] = useState<boolean>();
	const [ controllerState, setControllerState ] = useState<CollapseBoxControllerProps>();

	const handleClick = useCallback(() =>
	{
		controllerState?.handle();
	}, [ controllerState ]);

	const handleControlled = useCallback<CollapseBoxHandler>((flag) =>
	{
		setOpenState(flag);
	}, []);

	return (
		<Paper data-component='MarkdownGroup' variant='outlined'>
			<Stack width='100%'>
				<Box height='100%' minHeight={200} position='relative' width='100%'>
					<Box height='100%' left={0} position='absolute' top={0} width='100%'>
						<Img height='100%' src={thumbnail} width='100%' />
					</Box>

					<Stack
						alignItems='center'
						bgcolor='#00000070'
						className={cn('text')}
						height='100%'
						justifyContent='center'
						padding={2}
						position='absolute'
						width='100%'
					>
						<Typography color='white' variant='caption'>시리즈 모아보기</Typography>
						<Typography color='gold' fontWeight='bold' variant='h5'>{title}</Typography>
						<Typography color='white' fontWeight='bold'>{currentIndex} / {groups.length}</Typography>
					</Stack>
				</Box>

				<CollapseBox onControlled={handleControlled} onInit={setControllerState}>
					<Stack paddingLeft={2} paddingRight={2}>
						<Box component='ul'>
							{groups.map(({ title, url }) => (
								<Box component='li' key={url}>
									<Link href={url}>
										<Typography color={url === current ? 'primary' : undefined} variant='caption'>{title}</Typography>
									</Link>
								</Box>
							))}
						</Box>
					</Stack>
				</CollapseBox>

				<Box width='100%'>
					<ButtonBase className='w-full' onClick={handleClick}>
						<KeyboardArrowDown className={cn('icon', { open: isOpenState })} />
					</ButtonBase>
				</Box>
			</Stack>
		</Paper>
	);
}