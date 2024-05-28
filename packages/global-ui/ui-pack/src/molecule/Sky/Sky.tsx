'use client';

/**
 * 하늘 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.28 Tue 09:18:26
 */

import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import classNames from 'classnames/bind';

import styles from './Sky.module.scss';

import Wave from '../../atom/Wave';

const cn = classNames.bind(styles);

export interface SkyProps extends StackProps
{
	/**
	 * 시간대
	 */
	hour?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
}

/**
 * 하늘 molecule 컴포넌트 반환 메서드
 *
 * @param {SkyProps} param0: SkyProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Sky({ hour, ...props }: SkyProps): JSX.Element
{
	const time = hour || new Date().getHours();

	return (
		<Stack data-component='Sky' {...props}>
			<Stack className={cn('cloud', `hour-${time}`)} width='100%'>
				<Wave fillColor='inherit' />
			</Stack>

			<Box className={cn('sky', `hour-${time}`)} height={200} />
		</Stack>
	);
}