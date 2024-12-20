/**
 * 개발 스택 그리트 타일 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.04 Sat 10:18:10
 */

'use client';

import { useIntersectionObserver } from '@kapoo/common';
import Tile from '@kapoo/ui-pack/atom/Tile';
import Glow from '@kapoo/ui-pack/molecule/Glow';
import TiltBox from '@kapoo/ui-pack/molecule/TiltBox';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DevStackGridTile.module.scss';

const cn = classNames.bind(styles);

export interface DevStackGridTileProps
{
	/**
	 * 이름
	 */
	name: string;

	/**
	 * 이미지
	 */
	image: string;
}

/**
 * 개발 스택 그리트 타일 서브 컴포넌트 반환 메서드
 *
 * @param {DevStackGridTileProps} param0: DevStackGridTileProps
 *
 * @returns {JSX.Element} JSX
 */
export default function DevStackGridTile({ name, image }: DevStackGridTileProps): JSX.Element
{
	const [ refState, setRefState ] = useState<HTMLDivElement | null>(null);
	const [ isShowState, setShowState ] = useState(false);

	useIntersectionObserver(refState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			setShowState(entry.isIntersecting);
		}
	});

	return (
		<TiltBox data-component='DevStackGridTile'>
			<Tile borderRadius={4} boxShadow='0px 0px 10px #00000050' className={cn('tile', { active: isShowState })} overflow='hidden'>
				<Box ref={setRefState}>
					<Img src={image} />
				</Box>

				<Stack
					alignItems='center'
					bottom={0}
					className={cn('title')}
					left={0}
					padding={1}
					paddingBottom={2}
					paddingTop={2}
					position='absolute'
					width='100%'
				>
					<Typography color='white' fontWeight='bold'>{name}</Typography>
				</Stack>

				<Glow />
			</Tile>
		</TiltBox>
	);
}