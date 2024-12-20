/**
 * 웨이브 atom 컴포넌트
 *
 * @author RWB
 * @since 2024.04.25 Thu 17:55:16
 */

import classNames from 'classnames/bind';
import { CSSProperties, SVGProps } from 'react';

import styles from './Wave.module.scss';

const cn = classNames.bind(styles);

export interface WaveProps extends SVGProps<SVGSVGElement>
{
	/**
	 * 채우기 색
	 */
	fillColor?: CSSProperties['fill'];

	/**
	 * 애니메이션 비활성화 여부
	 */
	disabledAnimation?: boolean;
}

/**
 * 웨이브 atom 컴포넌트 반환 메서드
 *
 * @param {WaveProps} param0: WaveProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Wave({ fillColor, disabledAnimation, width = '100%', height = 40, className, ...props }: WaveProps): JSX.Element
{
	return (
		<svg
			className={cn('waves', className)}
			data-component='Wave'
			height={height}
			preserveAspectRatio='none'
			shapeRendering='auto'
			viewBox='0 24 150 28'
			width={width}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<defs>
				<path
					d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
					id='gentle-wave'
				/>
			</defs>

			<g className={cn('parallax', { disabled: disabledAnimation })}>
				<use fill={fillColor} opacity='0.7' x='48' xlinkHref='#gentle-wave' y='0' />
				<use fill={fillColor} opacity='0.5' x='48' xlinkHref='#gentle-wave' y='3' />
				<use fill={fillColor} opacity='0.3' x='48' xlinkHref='#gentle-wave' y='5' />
				<use fill={fillColor} x='48' xlinkHref='#gentle-wave' y='7' />
			</g>
		</svg>
	);
}