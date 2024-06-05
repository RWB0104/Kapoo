/**
 * 프로젝트 모달 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.08 Wed 17:56:39
 */

'use client';

import Wave from '@kapoo/ui-pack/atom/Wave';
import Carousel, { CarouselControllerProps } from '@kapoo/ui-pack/organism/Carousel';
import Img from '@kapoo/ui-pack/organism/Img';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import Code from '@mui/icons-material/Code';
import GitHub from '@mui/icons-material/GitHub';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Modal, { ModalProps } from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState } from 'react';

import styles from './ProjectModal.module.scss';

import { MarkdownHeaderProps } from '../../common';

const cn = classNames.bind(styles);

export interface ProjectModalProps extends Omit<ModalProps, 'children'>
{
	/**
	 * 프로젝트
	 */
	project?: MarkdownHeaderProps;

	/**
	 * 내용
	 */
	children?: string;
}

/**
 * 프로젝트 모달 organism 컴포넌트 반환 메서드
 *
 * @param {ProjectModalProps} param0: ProjectModalProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectModal({ project, children, ...props }: ProjectModalProps): JSX.Element
{
	const [ controllerState, setControllerState ] = useState<CarouselControllerProps>();
	const [ indexState, setIndexState ] = useState(0);

	return (
		<Modal data-component='ProjectModal' {...props}>
			{project ? (
				<Paper className={cn('modal')}>
					<Stack alignItems='center' gap={4} height='100%' maxHeight='80vh' overflow='auto'>
						<Stack marginBottom={2} position='relative' width='100%'>
							<Box bgcolor='dodgerblue' height={100} />

							<Wave className={cn('wave')} fillColor='dodgerblue' />

							<Box
								borderRadius={4}
								bottom={-110}
								className={cn('icon')}
								left='50%'
								position='absolute'
							>
								<Box position='relative'>
									<Box borderRadius={4} boxShadow='0px 0px 5px #00000050' overflow='hidden'>
										<Img height={120} src={project.images[0]} width={120} />
									</Box>

									<Box
										bgcolor='background.paper'
										borderRadius='50%'
										bottom={-18}
										overflow='hidden'
										position='absolute'
										right={-18}
									>
										<Img height={36} src={project.icon} width={36} />
									</Box>
								</Box>
							</Box>
						</Stack>

						<Stack alignItems='center' gap={1} padding={4} width='100%'>
							<Typography color='dodgerblue' fontWeight='bold' variant='h5'>{project.title}</Typography>
							<Typography variant='caption'>{project.subtitle}</Typography>

							<Stack direction='row' flexWrap='wrap' gap={1} marginTop={2}>
								{project.languages.map((i) => (
									<Chip
										icon={<Code />}
										key={i}
										label={i}
										variant='outlined'
									/>
								))}
							</Stack>

							<Stack width='100%'>
								{project.links?.map(({ type, name, url }) => (
									<Link href={url} key={url} target='_blank'>
										<ButtonBase className={cn('link')}>
											<Stack
												alignItems='center'
												direction='row'
												gap={2}
												padding={1}
												textAlign='initial'
											>
												{type === 'github' ? <GitHub /> : null}
												{type === 'web' ? <LinkIcon /> : null}

												<Stack>
													<Typography variant='caption'>{name}</Typography>
													<Typography color='GrayText' variant='caption'>{url}</Typography>
												</Stack>
											</Stack>
										</ButtonBase>
									</Link>
								))}
							</Stack>
						</Stack>

						<Box className={cn('carousel')} flexShrink={0} height={400} position='relative' width='100%'>
							<Carousel
								height='100%'
								total={project.images.length}
								width='100%'
								infinite
								onChange={setIndexState}
								onInit={setControllerState}
							>
								{(i) => (
									<Box height='100%' width='100%'>
										<Img height='100%' src={project.images[i]} style={{ objectFit: 'contain' }} width='100%' />
									</Box>
								)}
							</Carousel>

							<Box height='100%' left={0} position='absolute' top={0}>
								<ButtonBase className={cn('button')} onClick={() => controllerState?.move('left')}>
									<KeyboardArrowLeft fontSize='inherit' />
								</ButtonBase>
							</Box>

							<Box height='100%' position='absolute' right={0} top={0}>
								<ButtonBase className={cn('button')} onClick={() => controllerState?.move('right')}>
									<KeyboardArrowRight fontSize='inherit' />
								</ButtonBase>
							</Box>

							<Stack
								bgcolor='black'
								borderRadius={100}
								bottom={10}
								className={cn('counter')}
								left='50%'
								padding='4px 16px'
								position='absolute'
							>
								<Typography color='white' variant='caption'>{indexState + 1} / {project.images.length}</Typography>
							</Stack>
						</Box>

						<Box padding={4} width='100%'>
							<MarkdownViewer>
								{children}
							</MarkdownViewer>
						</Box>
					</Stack>
				</Paper>
			) : <></>}
		</Modal>
	);
}