/**
 * 푸터 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 00:54:30
 */

import Box, { BoxProps } from '@mui/material/Box';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import styles from './Footer.module.scss';

import Wave from '../../atom/Wave';
import Sky from '../Sky';

const cn = classNames.bind(styles);

export interface FooterProps extends BoxProps
{
	/**
	 * 기본 색상
	 */
	mainColor?: CSSProperties['backgroundColor'];
}

/**
 * 푸터 molecule 컴포넌트 반환 메서드
 *
 * @param {FooterProps} param0: FooterProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Footer({ mainColor = 'transparent', children, ...props }: FooterProps): JSX.Element
{
	return (
		<Box component='footer' data-component='Footer' marginTop={10} {...props}>
			<Box position='relative'>
				<Sky />

				<Box bottom={-20} className={cn('ship')} left='10%' position='absolute'>
					<img
						alt='icon'
						height={100}
						src='https://cdn-icons-png.freepik.com/512/6643/6643562.png'
						width={100}
					/>
				</Box>

				<Box bottom={0} position='absolute' width='100%'>
					<Wave fillColor={mainColor} />
				</Box>
			</Box>

			<Box>
				{children}
			</Box>
		</Box>
	);
}