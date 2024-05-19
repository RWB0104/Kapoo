/**
 * 텍스트 프롬프트 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.20 Mon 02:52:24
 */

'use client';

import { modulo, useIntersectionObserver } from '@kapoo/common';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { AnimationEventHandler, useCallback, useState } from 'react';

import styles from './TextPrompt.module.scss';

const cn = classNames.bind(styles);

export interface TextPropmtProps
{
	list: string[];

	title: string;
}

/**
 * 텍스트 프롬프트 organism 컴포넌트 반환 메서드
 *
 * @param {TextPropmtProps} param0: TextPropmtProps
 *
 * @returns {JSX.Element} JSX
 */
export default function TextPropmt({ list, title }: TextPropmtProps): JSX.Element
{
	const [ isShowState, setShowState ] = useState(false);
	const [ indexState, setIndexState ] = useState(0);

	const handleAniamtionEnd = useCallback<AnimationEventHandler<HTMLSpanElement>>((e) =>
	{
		setIndexState((state) => modulo(state + 1, list.length));
	}, [ list ]);

	useIntersectionObserver('#test', (entry) =>
	{
		if (entry.isIntersecting)
		{
			setShowState(true);
		}
	});

	return (
		<Stack alignItems='center' data-component='TextPropmt'>
			<Stack alignItems='center' direction='row' height='7rem' justifyContent='space-between' maxWidth={500} position='relative' width='100%'>
				{list.map((i, j) => (
					<Typography
						className={cn('text', { animate: j === indexState && isShowState })}
						color='primary'
						fontWeight='bold'
						id='test'
						key={i}
						left={0}
						position='absolute'
						textAlign='center'
						top={0}
						variant='h2'
						width='100%'
						onAnimationEnd={handleAniamtionEnd}
					>
						{list[indexState]}
					</Typography>
				))}
			</Stack>

			<Typography>{title}</Typography>
		</Stack>
	);
}