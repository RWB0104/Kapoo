/**
 * 소개 template 컴포넌트
 *
 * @author RWB
 * @since 2024.05.24 Fri 13:33:02
 */

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import IntroduceHeader, { IntroduceHeaderProps } from './sub/IntroduceHeader';
import IntroduceSkill, { IntroduceSkillProps } from './sub/IntroduceSkill';

export interface IntroduceTemplateProps
{
	/**
	 * 이미지
	 */
	image: IntroduceHeaderProps['image'];

	/**
	 * 소속
	 */
	org: IntroduceHeaderProps['org'];

	/**
	 * 이름
	 */
	name: IntroduceHeaderProps['name'];

	/**
	 * 목록
	 */
	list: IntroduceSkillProps['list'];
}

/**
 * 소개 template 컴포넌트 반환 메서드
 *
 * @param {IntroduceTemplateProps} param0: IntroduceTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function IntroduceTemplate({ image, org, name, list }: IntroduceTemplateProps): JSX.Element
{
	return (
		<Paper data-component='IntroduceTemplate'>
			<Stack gap={4} padding={4}>
				<Divider variant='fullWidth' />

				<IntroduceHeader image={image} name={name} org={org} />

				<Divider variant='fullWidth' />

				<IntroduceSkill list={list} />

				<Divider variant='fullWidth' />
			</Stack>
		</Paper>
	);
}