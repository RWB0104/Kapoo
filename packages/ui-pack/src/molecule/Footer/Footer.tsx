/**
 * 푸터 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 00:54:30
 */

import Box, { BoxProps } from '@mui/material/Box';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

import Wave from '../../atom/Wave';

const cn = classNames.bind(styles);

export interface FooterProps extends BoxProps
{
	/**
	 * 로고
	 */
	logo?: string;

	/**
	 * 타이틀
	 */
	title?: string;
}

/**
 * 푸터 molecule 컴포넌트 반환 메서드
 *
 * @param {FooterProps} param0: FooterProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Footer({ logo, title, ...props }: FooterProps): JSX.Element
{
	return (
		<Box component='footer' data-component='Footer' position='relative' {...props}>
			<Box className={cn('ship')} left={50} position='absolute' top={-50}>
				<img alt='22' height={100} src='https://cdn-icons-png.freepik.com/512/6643/6643562.png' width={100} />
			</Box>

			<Wave fillColor='lightskyblue' />

			<Box bgcolor='lightskyblue' height={50}>
				sdfsd
			</Box>
		</Box>
	);
}