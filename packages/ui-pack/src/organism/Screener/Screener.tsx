'use client';

/**
 * 스크리너 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 01:44:51
 */

import { getScreenerList } from '@kapoo/api';
import { getRandom } from '@kapoo/common';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

import styles from './Screener.module.scss';

const cn = classNames.bind(styles);

export interface ScreenerProps
{
	/**
	 * 너비
	 */
	width?: CSSProperties['width'];

	/**
	 * 높이
	 */
	height?: CSSProperties['height'];

	/**
	 * 소스
	 */
	src?: string;
}

interface ScreenerSource
{
	/**
	 * 외부 소스 여부
	 */
	isExternal: boolean;

	/**
	 * 소스
	 */
	src: string;
}

/**
 * 스크리너 organism 컴포넌트 반환 메서드
 *
 * @param {ScreenerProps} param0: ScreenerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Screener({ width = '100%', height = '100vh', src }: ScreenerProps): JSX.Element
{
	const [ listState, setListState ] = useState<string[]>([]);

	const source = useMemo<ScreenerSource>(() =>
	{
		const isExternal = !!src;

		return {
			isExternal,
			src: src || listState[getRandom(listState)]
		};
	}, [ src, listState ]);

	useEffect(() =>
	{
		const handle = async (): Promise<void> =>
		{
			const list = await getScreenerList();

			setListState(list);
		};

		handle();
	}, []);

	return (
		<Box
			className={cn('screener')}
			data-component='Screener'
			height={height}
			position='relative'
			width={width}
		>
			<Box
				bgcolor='#00000088'
				height='100%'
				left={0}
				position='absolute'
				top={0}
				width='100%'
				zIndex={1}
			/>

			<Box
				className={cn('media')}
				height='100%'
				left={0}
				position='absolute'
				top={0}
				width='100%'
			>
				{source.isExternal ? (
					<img
						alt='screener'
						className={cn('cover')}
						height='100%'
						src={source.src}
						width='100%'
					/>
				) : (
					<video
						className={cn('cover')}
						controls={false}
						height='100%'
						src={source.src}
						width='100%'
						autoPlay
						loop
						muted
					/>
				)}
			</Box>
		</Box>
	);
}