/**
 * 경력 소개 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.25 Sat 04:24:21
 */

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IntroduceCareerCard, { IntroduceCareerCardProps } from '../IntroduceCareerCard';

export interface IntroduceCareerProps
{
	/**
	 * 경력 목록
	 */
	list: IntroduceCareerCardProps[];
}

/**
 * 경력 소개 서브 컴포넌트 반환 메서드
 *
 * @param {IntroduceCareerProps} param0: IntroduceCareerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function IntroduceCareer({ list }: IntroduceCareerProps): JSX.Element
{
	return (
		<Stack data-component='IntroduceCareer' gap={4}>
			<Typography fontStyle='italic' fontWeight='bold' variant='h4'># Career</Typography>

			<Stack gap={4}>
				{list.map((props) => (
					<IntroduceCareerCard
						key={props.name}
						{...props}
					/>
				))}
			</Stack>
		</Stack>
	);
}