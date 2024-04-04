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
import { CSSProperties, PropsWithChildren } from 'react';

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
export default async function Screener({ width = '100%', height = '100vh', src, children }: ScreenerProps): Promise<JSX.Element>
{
	const list = await getScreenerList();

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
						src={list[getRandom(list)]}
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