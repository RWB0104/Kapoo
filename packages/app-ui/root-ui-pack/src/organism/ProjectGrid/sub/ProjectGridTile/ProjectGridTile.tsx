/**
 * 프로젝트 그리드 타일 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.05 Sun 02:25:55
 */

'use client';

import { useIntersectionObserver } from '@kapoo/common';
import Tile from '@kapoo/ui-pack/atom/Tile';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import styles from './ProjectGridTile.module.scss';

import { MarkdownHeaderProps } from '../../../../common';

const cn = classNames.bind(styles);

export interface ProjectGridTileProps extends ButtonBaseProps
{
	/**
	 * 고유값
	 */
	unique?: string;

	/**
	 * 프로젝트
	 */
	project: MarkdownHeaderProps;
}

/**
 * 프로젝트 그리드 타일 서브 컴포넌트 반환 메서드
 *
 * @param {ProjectGridTileProps} param0: ProjectGridTileProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectGridTile({ unique, project, ...props }: ProjectGridTileProps): JSX.Element
{
	const { push } = useRouter();

	const [ domState, setDomState ] = useState<HTMLButtonElement | null>(null);
	const [ isShowState, setShowState ] = useState(false);

	const time = Math.round(((project.completed || Date.now()) - project.created) / 86400000);
	const during = project.completed ? `${time}일 소요됨` : `D+${time}`;

	const handleClick = useCallback(() =>
	{
		// 아이디가 있을 경우
		if (unique)
		{
			const params = new URLSearchParams(window.location.search);
			params.set('id', unique);

			push(`${window.location.pathname}?${params}`, { scroll: false });
		}
	}, [ unique, push ]);

	useIntersectionObserver(domState, ({ isIntersecting }) =>
	{
		// DOM이 보일 경우
		if (isIntersecting)
		{
			setShowState(true);
		}
	});

	return (
		<ButtonBase
			className={cn('tile', { active: isShowState })}
			data-component='ProjectGridTileProps'
			ref={setDomState}
			onClick={handleClick}
			{...props}
		>
			<Stack height='100%' width='100%'>
				<Stack alignItems='center' direction='row' flex={1} width='100%'>
					<Box padding={1}>
						<Img height={32} src={project.icon} width={32} />
					</Box>

					<Stack padding={1} width='100%'>
						<Typography fontWeight='bold' textAlign='start'>{project.title}</Typography>

						<Stack alignItems='center' direction='row' justifyContent='space-between' width='100%'>
							<Typography color='GrayText' variant='caption'>{project.author}</Typography>
							<Typography color={project.completed ? 'limegreen' : 'orange'} variant='caption'>{during}</Typography>
						</Stack>
					</Stack>
				</Stack>

				<Tile>
					<Box className={cn('backdrop')} left={0} position='absolute' top={0}>
						<Img src={project.images[0]} />
					</Box>

					<Stack alignItems='center' height='100%' justifyContent='center' left={0} position='absolute' top={0} width='100%'>
						<Img className={cn('thumb')} src={project.images[0]} />
					</Stack>
				</Tile>
			</Stack>
		</ButtonBase>
	);
}