/**
 * 스크리너 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 01:44:51
 */

'use client';

import { useGetScreenerList } from '@kapoo/api';
import { getRandom } from '@kapoo/common';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { CSSProperties, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import styles from './Screener.module.scss';

const cn = classNames.bind(styles);

export interface ScreenerProps extends PropsWithChildren
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

/**
 * 스크리너 organism 컴포넌트 반환 비동기 메서드
 *
 * @param {ScreenerProps} param0: ScreenerProps
 *
 * @returns {Promise} 비동기 JSX
 */
export default function Screener({ width = '100%', height = '100dvh', src, children }: ScreenerProps): JSX.Element
{
	const [ isReadyState, setReadyState ] = useState(false);

	const { data = [] } = useGetScreenerList();

	const getVideo = useMemo(() => data[getRandom(data)], [ data ]);

	const handleCanPlay = useCallback(() =>
	{
		setReadyState(true);
	}, [ setReadyState ]);

	useEffect(() =>
	{
		// 커버가 유효할 경우
		if (src)
		{
			setReadyState(true);
		}
	}, [ src ]);

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
				className={(cn('dimmer', { loading: !isReadyState }))}
				height='100%'
				left={0}
				position='absolute'
				top={0}
				width='100%'
				zIndex={1}
			>
				{children}
			</Box>

			<Box
				className={cn('media')}
				height='100%'
				left={0}
				position='absolute'
				top={0}
				width='100%'
			>
				{src ? (
					<img
						alt='screener'
						className={cn('cover')}
						height='100%'
						src={src}
						width='100%'
					/>
				) : (
					<video
						className={cn('cover')}
						controls={false}
						height='100%'
						src={getVideo}
						width='100%'
						autoPlay
						loop
						muted
						onCanPlay={handleCanPlay}
					/>
				)}
			</Box>
		</Box>
	);
}