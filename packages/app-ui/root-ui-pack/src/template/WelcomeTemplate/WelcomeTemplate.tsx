/**
 * 환영 template 컴포넌트
 *
 * @author RWB
 * @since 2024.05.27 Mon 01:44:04
 */

'use client';

import { getRandom, mathRound } from '@kapoo/common';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect, useRef } from 'react';

import Welcome, { WelcomeProps } from '../../organism/Welcome';

const images = [
	'https://github.com/RWB0104/blog.itcode.dev/assets/50317129/a1dba2fe-caae-4d12-81f0-78bbef241280',
	'https://github.com/RWB0104/blog.itcode.dev/assets/50317129/755aee24-f2f1-42f4-bcd4-4649ac6a94eb',
	'https://github.com/RWB0104/blog.itcode.dev/assets/50317129/aee34ef4-4221-4364-af3f-2e2be86860ab',
	'https://github.com/RWB0104/blog.itcode.dev/assets/50317129/8b65a496-50ed-41a6-9891-802e4a1ef624',
	'https://github.com/RWB0104/blog.itcode.dev/assets/50317129/9074ac51-ac46-4630-969c-f8674f2a2dfe'
];

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

					imageRef.current.style.filter = `blur(${(percent * 5)}px)`;
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
		<Stack data-component='WelcomeTemplate' marginTop={10} minHeight='300dvh' position='relative' ref={ref}>
			<Box left={0} overflow='hidden' position='sticky' top={0}>
				<Box height='100%' left={0} position='absolute' ref={imageRef} top={0} width='100%'>
					<Img height='100%' src={images[getRandom(images)]} width='100%' />
				</Box>

				<Welcome list={list} />
			</Box>
		</Stack>
	);
}