'use client';

/**
 * 소개 template 컴포넌트
 *
 * @author RWB
 * @since 2024.05.24 Fri 13:33:02
 */

import { useIntersectionObserver } from '@kapoo/common';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './IntroduceTemplate.module.scss';
import IntroduceCareer, { IntroduceCareerProps } from './sub/IntroduceCareer';
import IntroduceHeader, { IntroduceHeaderProps } from './sub/IntroduceHeader';
import IntroduceSkill, { IntroduceSkillProps } from './sub/IntroduceSkill';

const cn = classNames.bind(styles);

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
	 * 기술 목록
	 */
	skills: IntroduceSkillProps['list'];

	/**
	 * 경력 목록
	 */
	careers: IntroduceCareerProps['list'];
}

/**
 * 소개 template 컴포넌트 반환 메서드
 *
 * @param {IntroduceTemplateProps} param0: IntroduceTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function IntroduceTemplate({ image, org, name, skills, careers }: IntroduceTemplateProps): JSX.Element
{
	const [ isShowState, setShowState ] = useState(false);
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	useIntersectionObserver(domState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			setShowState(true);
		}
	}, { threshold: 0.3 });

	return (
		<Paper className={cn('template', { active: isShowState })} data-component='IntroduceTemplate' ref={setDomState}>
			<Stack gap={4} padding={4}>
				<Divider variant='fullWidth' />

				<IntroduceHeader image={image} name={name} org={org} />

				<Alert icon={false} severity='info'>
					<Stack padding={2}>
						<Typography variant='h6'>오늘 한걸음 더 나아가는 웹 풀스택 개발자.</Typography>
					</Stack>
				</Alert>

				<Divider variant='fullWidth' />

				<IntroduceSkill list={skills} />

				<Divider variant='fullWidth' />

				<IntroduceCareer list={careers} />
			</Stack>
		</Paper>
	);
}