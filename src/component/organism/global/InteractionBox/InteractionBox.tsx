/**
 * 상호작용 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:02:04
 */

import ThemeSwitch from '@kapoo/organism/global/ThemeSwitch';
import Whoop from '@kapoo/organism/global/Whoop';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

/**
 * 상호작용 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function InteractionBox(): ReactNode
{
	return (
		<Stack
			alignItems='center'
			bottom={20}
			data-component='InteractionBox'
			direction='row'
			position='fixed'
			right={20}
			spacing={1}
			zIndex={10}
		>
			<ThemeSwitch />
			<Whoop />
		</Stack>
	);
}