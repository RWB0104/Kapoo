/**
 * 감사 카드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.01 Wed 02:15:51
 */

'use client';

import DotLottieIcon from '@kapoo/ui-pack/atom/DotLottieIcon/DotLottieIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MouseEventHandler, useCallback } from 'react';

/**
 * 감사 카드 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ThanksCard(): JSX.Element
{
	const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const centerX = left + width / 2;
		const centerY = top + height / 2;

		const relativeX = e.clientX - centerX;
		const relativeY = e.clientY - centerY;

		e.currentTarget.style.transition = '';
		e.currentTarget.style.transform = `rotate3d(${relativeX}, ${relativeY}, 0, 30deg) perspective(1920px)`;
	}, []);

	const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		e.currentTarget.style.transition = '1s ease-out';
		e.currentTarget.style.transform = '';
	}, []);

	return (
		<Stack
			bgcolor='lemonchiffon'
			borderRadius={1}
			boxShadow='0px 0px 10px #00000030'
			component='div'
			data-component='ThanksCard'
			direction='row'
			gap={4}
			padding={4}
			width='fit-content'
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
		>
			<DotLottieIcon iconName='love-message-burst' width={100} />

			<Stack>
				<Typography variant='h6' gutterBottom>읽어주셔서 고마워요!</Typography>
				<Typography>도움이 되셨다면, <Typography color='hotpink' component='span' fontWeight='bold'>공감</Typography>이나 <Typography color='dodgerblue' component='span' fontWeight='bold'>댓글</Typography>을 달아주시는 건 어떤가요?</Typography>
				<Typography>블로그 운영에 큰 힘이 됩니다.</Typography>
			</Stack>
		</Stack>
	);
}