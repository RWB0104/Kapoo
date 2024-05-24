/**
 * 소개 헤더 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.24 Fri 11:47:39
 */

import { author } from '@kapoo/common';
import Glow from '@kapoo/ui-pack/molecule/Glow';
import TiltBox from '@kapoo/ui-pack/molecule/TiltBox';
import Img from '@kapoo/ui-pack/organism/Img';
import { Mail } from '@mui/icons-material';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';

import styles from './IntroduceHeader.module.scss';

const cn = classNames.bind(styles);

export interface IntroduceHeaderProps
{
	/**
	 * 이미지
	 */
	image: string;

	/**
	 * 소속
	 */
	org: string;

	/**
	 * 이름
	 */
	name: string;
}

/**
 * 소개 헤더 서브 컴포넌트 반환 메서드
 *
 * @param {IntroduceHeaderProps} param0: IntroduceHeaderProps
 *
 * @returns {JSX.Element}
 */
export default function IntroduceHeader({ image, org, name }: IntroduceHeaderProps): JSX.Element
{
	return (
		<Stack direction='row' gap={4}>
			<Box position='relative'>
				<TiltBox borderRadius={4} boxShadow='0px 0px 20px #00000050' overflow='hidden'>
					<Box>
						<Img height='8rem' src={image} width='8rem' />
					</Box>

					<Box height='100%' left={0} position='absolute' top={0} width='100%'>
						<Glow />
					</Box>
				</TiltBox>
			</Box>

			<Stack gap={2} justifyContent='center'>
				<Stack>
					<Typography className={cn('text')} color='dodgerblue'>{org}</Typography>
					<Typography className={cn('text')} fontWeight='bold' variant='h3'>{name}</Typography>
				</Stack>

				<Stack direction='row' gap={2}>
					<Button color='inherit' href={`mailto:${author.email}`} startIcon={<Mail />} target='_blank'>{author.email}</Button>
					<Button color='inherit' href={author.social.github.link} startIcon={<GitHub />} target='_blank'>{author.social.github.name}</Button>
					<Button color='inherit' href={author.social.linkedin.link} startIcon={<LinkedIn />} target='_blank'>{author.social.linkedin.name}</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}