/**
 * 프로젝트 모달 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.08 Wed 17:56:39
 */

import Modal, { ModalProps } from '@mui/material/Modal';

import { MarkdownHeaderProps } from '../../common';

export interface ProjectModalProps extends Omit<ModalProps, 'children'>
{
	/**
	 * 프로젝트
	 */
	project?: MarkdownHeaderProps;
}

/**
 * 프로젝트 모달 molecule 컴포넌트 반환 메서드
 *
 * @param {ProjectModalProps} param0: ProjectModalProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectModal({ project, ...props }: ProjectModalProps): JSX.Element
{
	return (
		<Modal data-component='ProjectModal' {...props}>
			<p>{project?.title}</p>
		</Modal>
	);
}