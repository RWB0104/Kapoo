/**
 * 환영 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.23 Thu 15:46:41
 */

'use client';

import { getRandom, useIntersectionObserver } from '@kapoo/common';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';

import styles from './Welcome.module.scss';

const cn = classNames.bind(styles);

export interface WelcomeProps extends BoxProps
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
export default function Welcome({ list, ...props }: WelcomeProps): JSX.Element
{
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);
	const [ isShowState, setShowState ] = useState(false);

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

	useIntersectionObserver(domState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			setShowState(true);
		}
	}, { threshold: 0.5 });

	return (
		<Box
			data-component='Welcome'
			minHeight='100vh'
			overflow='hidden'
			padding={2}
			position='relative'
			ref={setDomState}
			width='100%'
			{...props}
		>
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
						className={cn('typo', { active: (j === indexState) && isShowState })}
						color='white'
						fontSize='calc(100vw / 20)'
						fontWeight='bolder'
						textAlign='center'
					>
						{i}
					</Typography>
				</Stack>
			))}
		</Box>
	);
}