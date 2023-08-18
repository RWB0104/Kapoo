/**
 * 스크리너 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 05:24:14
 */

'use client';

import { useScreenerVideo } from '@kapoo/api';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { CSSProperties, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';

import styles from './Screener.module.scss';

const cn = classNames.bind(styles);

interface Props
{
	/**
	 * 너비
	 */
	width?: CSSProperties['width'];

	/**
	 * 높이
	 */
	height?: CSSProperties['height'];
}

export type ScreenerProps = PropsWithChildren<Props>

/**
 * 스크리너 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {ScreenerProps} param0: ScreenerProps 객체
 *
 * @returns {ReactNode} JSX
 */
export default function Screener({ width = '100%', height = '100vh', children }: ScreenerProps): ReactNode
{
	const [ isReadyState, setReadyState ] = useState(false);

	const { data = [] } = useScreenerVideo();

	const getList = useMemo(() => data[Math.floor(Math.random() * (data.length - 1))], [ data ]);

	const handleCanPlay = useCallback(() =>
	{
		setReadyState(true);
	}, [ setReadyState ]);

	return (
		<Box
			className={cn('screener')}
			component='article'
			data-component='Screener'
			height={height}
			position='relative'
			width={width}
		>
			<motion.div
				animate={isReadyState ? 'animate' : undefined}
				className={cn('template')}
				initial='initial'
				transition={{ duration: 0.5 }}
				variants={{
					animate: { backdropFilter: 'blur(0px)' },
					initial: { backdropFilter: 'blur(50px)' }
				}}
			>
				<Stack
					alignItems='center'
					bgcolor='#00000099'
					height='100%'
					justifyContent='center'
					width='100%'
				>
					{children}
				</Stack>
			</motion.div>

			<Box className={cn('wrap')}>
				<video
					className={cn('video')}
					controls={false}
					height='100%'
					src={getList}
					width='100%'
					autoPlay
					loop
					muted
					onCanPlay={handleCanPlay}
				/>
			</Box>
		</Box>
	);
}