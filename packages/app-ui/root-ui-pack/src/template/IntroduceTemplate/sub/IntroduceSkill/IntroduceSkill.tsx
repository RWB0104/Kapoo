/**
 * 기술 소개 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.24 Fri 13:35:26
 */

import { DevStackItem } from '@kapoo/api';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DevStackGrid from '../../../../organism/DevStackGrid';

export interface IntroduceSkillProps
{
	/**
	 * 목록
	 */
	list: DevStackItem[];
}

export default function IntroduceSkill({ list }: IntroduceSkillProps): JSX.Element
{
	return (
		<Stack data-component='IntroduceSkill' gap={2}>
			<Typography fontStyle='italic' fontWeight='bold' variant='h4'># Main Skill</Typography>

			<DevStackGrid list={list} />
		</Stack>
	);
}