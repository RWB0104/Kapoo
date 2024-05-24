/**
 * 기술 소개 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.24 Fri 13:35:26
 */

import Img from '@kapoo/ui-pack/organism/Img';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface SkillProps
{
	/**
	 * 아이콘
	 */
	icon: string;

	/**
	 * 제목
	 */
	name: string;
}

export interface IntroduceSkillProps
{
	/**
	 * 목록
	 */
	list: SkillProps[];
}

export default function IntroduceSkill({ list }: IntroduceSkillProps): JSX.Element
{
	return (
		<Stack data-component='IntroduceSkill'>
			<Grid spacing={2} container>
				{list.map(({ icon, name }) => (
					<Grid gap={2} key={name} md={4} sm={6} xl={3} item>
						<Img src={icon} />

						<Typography>{name}</Typography>
					</Grid>
				))}
			</Grid>
		</Stack>
	);
}