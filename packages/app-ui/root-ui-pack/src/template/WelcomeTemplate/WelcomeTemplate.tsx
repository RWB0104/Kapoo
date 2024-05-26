/**
 * 환영 template 컴포넌트
 *
 * @author RWB
 * @since 2024.05.27 Mon 01:44:04
 */

'use client';

import { mathRound } from '@kapoo/common';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect, useRef } from 'react';

import Welcome, { WelcomeProps } from '../../organism/Welcome';

export interface WelcomeTemplateProps
{
	/**
	 * 인삿말 목록
	 */
	list: WelcomeProps['list'];
}

/**
 * 환영 template 컴포넌트 반환 메서드
 *
 * @param {WelcomeTemplateProps} param0: WelcomeTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function WelcomeTemplate({ list }: WelcomeTemplateProps): JSX.Element
{
	const ref = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() =>
	{
		const handle = (e: DocumentEventMap['scroll']): void =>
		{
			if (ref.current && imageRef.current)
			{
				const start = ref.current.offsetTop;
				const end = start + ref.current.scrollHeight;

				if (window.scrollY >= start && window.scrollY <= end)
				{
					const val = window.scrollY - start;
					const ref = end - start;
					const percent = mathRound(val / ref, 2);

					imageRef.current.style.scale = `${1 + percent}`;
					imageRef.current.style.transition = '0.3s';
				}
			}
		};

		document.addEventListener('scroll', handle);

		return () =>
		{
			document.removeEventListener('scroll', handle);
		};
	}, [ ref.current, imageRef.current ]);

	return (
		<Stack data-component='WelcomeTemplate' marginTop={10} minHeight='300vh' position='relative' ref={ref}>
			<Box left={0} overflow='hidden' position='sticky' top={0}>
				<Box height='100%' left={0} position='absolute' ref={imageRef} top={0} width='100%'>
					<Img height='100%' src='https://i.pinimg.com/originals/c7/54/9d/c7549df773adf3f843383a067a353aae.jpg' width='100%' />
				</Box>

				<Welcome list={list} />
			</Box>
		</Stack>
	);
}