/**
 * 경력 소개 카드 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.25 Sat 13:17:20
 */

import { parseLocalDate, useIntersectionObserver } from '@kapoo/common';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { CSSProperties, useState } from 'react';

import styles from './IntroduceCareerCard.module.scss';

const cn = classNames.bind(styles);

export interface IntroduceCareerCardProps
{
	/**
	 * 이름
	 */
	name: string;

	/**
	 * 컨텐츠
	 */
	content: string[];

	/**
	 * 아이콘
	 */
	icon: string;

	/**
	 * 링크
	 */
	link: string;

	/**
	 * 입사일
	 */
	joinDate: number;

	/**
	 * 퇴사일
	 */
	outDate?: number;

	/**
	 * 주 색상
	 */
	mainColor?: CSSProperties['borderColor'];
}

/**
 * 경력 소개 카드 서브 컴포넌트 반환 메서드
 *
 * @param {IntroduceCareerCardProps} param0: IntroduceCareerCardProps
 *
 * @returns {JSX.Element} JSX
 */
export default function IntroduceCareerCard({ name, content, icon, link, joinDate, outDate, mainColor = 'transparent' }: IntroduceCareerCardProps): JSX.Element
{
	const [ isShowState, setShowState ] = useState(false);
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	useIntersectionObserver(domState, (entry) =>
	{
		if (entry.isIntersecting)
		{
			setShowState(true);
		}
	}, { threshold: 0.3 });

	const join = parseLocalDate(joinDate);
	const out = parseLocalDate(outDate);

	const dday = Math.round(((outDate || Date.now()) - joinDate) / 86400000);

	return (
		<Paper
			className={cn('card', { active: isShowState })}
			data-component='IntroduceCareerCard'
			key={name}
			ref={setDomState}
			variant='outlined'
		>
			<Stack borderTop={`3px solid ${mainColor}`} gap={2} padding={2}>
				<Link href={link} target='_blank'>
					<Stack alignItems='center' direction='row' gap={2}>
						<Img height={36} src={icon} />

						<Stack>
							<Typography fontWeight='bold' variant='h6'>{name}</Typography>
							<Typography color='GrayText' variant='caption'>{join.year.text}. {join.month.text}. ~ {outDate ? `${out.year.text}. ${out.month.text}.` : '현재'} ({dday}일)</Typography>
						</Stack>
					</Stack>
				</Link>

				<Divider variant='fullWidth' />

				<Box component='ul' paddingLeft={4}>
					{content.map((i) => <Box component='li' key={i}>{i}</Box>)}
				</Box>
			</Stack>
		</Paper>
	);
}