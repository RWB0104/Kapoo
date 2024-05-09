/**
 * 프로젝트 모달 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.08 Wed 17:56:39
 */

import Wave from '@kapoo/ui-pack/atom/Wave';
import Img from '@kapoo/ui-pack/organism/Img';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import GitHub from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import { ButtonBase } from '@mui/material';
import Box from '@mui/material/Box';
import Modal, { ModalProps } from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './ProjectModal.module.scss';

import { MarkdownHeaderProps } from '../../common';

const cn = classNames.bind(styles);

export interface ProjectModalProps extends Omit<ModalProps, 'children'>
{
	/**
	 * 프로젝트
	 */
	project?: MarkdownHeaderProps;

	children?: string;
}

/**
 * 프로젝트 모달 molecule 컴포넌트 반환 메서드
 *
 * @param {ProjectModalProps} param0: ProjectModalProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectModal({ project, children, ...props }: ProjectModalProps): JSX.Element
{
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

						<Stack padding={1}>
							{project.images.map((i) => <Img key={i} src={i} width='100%' />)}
						</Stack>

						<Box padding={4}>
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