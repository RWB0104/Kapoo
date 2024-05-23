/**
 * 환영 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.23 Thu 15:46:41
 */

'use client';

import { getRandom } from '@kapoo/common';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';

import styles from './Welcome.module.scss';

const cn = classNames.bind(styles);

export interface WelcomeProps
{
	/**
	 * 인삿말 목록
	 */
	list: string[];
}

/**
 * 환경 organism 컴포넌트 반환 메서드
 *
 * @param {WelcomeProps} param0: WelcomeProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Welcome({ list }: WelcomeProps): JSX.Element
{
	const [ indexState, setIndexState ] = useState(0);

	const handleAnimationEnd = useCallback(() =>
	{
		let index = getRandom(list);

		// 기존 인덱스와 동일한 인덱스일 경우
		if (indexState === index)
		{
			index += index > 0 ? -1 : 1;
		}

		setIndexState(index);
	}, [ list, indexState ]);

	return (
		<Box data-component='Welcome' overflow='hidden' width='100%'>
			<Box className={cn('container')} minHeight='100vh' padding={2} position='relative' width='100%'>
				{list.map((i, j) => (
					<Stack
						alignItems='center'
						className={cn('text')}
						justifyContent='center'
						key={i}
						left='50%'
						position='absolute'
						top='50%'
						width='100%'
						onAnimationEnd={handleAnimationEnd}
					>
						<Typography
							className={cn('typo', { active: j === indexState })}
							color='white'
							fontSize='calc(100vw / 20)'
							fontWeight='bold'
							textAlign='center'
						>
							{i}
						</Typography>
					</Stack>
				))}
			</Box>
		</Box>
	);
}