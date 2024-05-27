/**
 * 프로젝트 모달 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.08 Wed 17:57:39
 */

'use client';

import { MarkdownDetailProps } from '@kapoo/markdown-kit';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { MarkdownHeaderProps, getId } from '../../common';
import ProjectModal from '../../molecule/ProjectModal';

export interface ProjectModalProviderProps
{
	/**
	 * 리스트
	 */
	list: MarkdownDetailProps<MarkdownHeaderProps>[];
}

/**
 * 프로젝트 모달 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {ProjectModalProviderProps} param0: ProjectModalProviderProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectModalProvider({ list }: ProjectModalProviderProps): JSX.Element
{
	const { push } = useRouter();

	const searchParams = useSearchParams();

	const handleClose = useCallback(() =>
	{
		push(window.location.pathname, { scroll: false });
	}, [ push ]);

	const project = useMemo(() =>
	{
		const id = searchParams.get('id');

		return list.find(({ filename }) => getId(filename) === id);
	}, [ list, searchParams ]);

	return (
		<ProjectModal open={project !== undefined} project={project?.meta} onClose={handleClose}>
			{project?.body}
		</ProjectModal>
	);
}