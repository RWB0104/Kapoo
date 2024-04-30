/**
 * dotLottie 아이콘 atom 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 09:21:30
 */

'use client';

import { DotLottiePlayer, Props } from '@dotlottie/react-player';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import styles from './DotLottieIcon.module.scss';

const cn = classNames.bind(styles);

export const icons = [
	'empty-file',
	'image-loading-improved',
	'lottie-logo',
	'love-message-burst',
	'weather-broken-clouds',
	'weather-clear-sky',
	'weather-few-clouds',
	'weather-mist',
	'weather-night-broken-clouds',
	'weather-night-clear-sky',
	'weather-night-few-clouds',
	'weather-night-mist',
	'weather-night-rain',
	'weather-night-scattered-clouds',
	'weather-night-shower-rains',
	'weather-night-thunderstorm',
	'weather-rain',
	'weather-scattered-clouds',
	'weather-shower-rains',
	'weather-snow',
	'weather-thunderstorm',
	'web-development'
] as const;

export type DotLottieIconName = typeof icons[number]

export interface DotLottieIconProps extends Omit<Props, 'src'>
{
	/**
	 * 아이콘 이름
	 */
	iconName: DotLottieIconName;

	/**
	 * 위치 기준
	 */
	position?: CSSProperties['position'];

	/**
	 * 너비
	 */
	width?: CSSProperties['width'];

	/**
	 * 높이
	 */
	height?: CSSProperties['height'];

	/**
	 * 최대 너비
	 */
	maxWidth?: CSSProperties['maxWidth'];

	/**
	 * 최대 높이
	 */
	maxHeight?: CSSProperties['maxHeight'];
}

/**
 * dotLottie 아이콘 atom 컴포넌트 반환 메서드
 *
 * @param {DotLottieIconProps} param0: DotLottieIconProps
 *
 * @returns {JSX.Element} JSX
 */
export default function DotLottieIcon({ iconName, position, width = '100%', height = '100%', maxWidth, maxHeight, autoplay = true, loop = true, className, ...props }: DotLottieIconProps): JSX.Element
{
	return (
		<Stack data-component='DotLottieIcon' height={height} maxHeight={maxHeight} maxWidth={maxWidth} position={position} width={width}>
			<DotLottiePlayer
				autoplay={autoplay}
				className={cn('dot-lottie', className)}
				loop={loop}
				src={`https://project.itcode.dev/lottie/lottie/${iconName}.lottie`}
				{...props}
			/>
		</Stack>
	);
}