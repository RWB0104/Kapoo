/**
 * 프로젝트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:50:17
 */

import ProjectsListTemplate from '@kapoo/template/projects/ProjectsListTemplate';
import ProjectsScreenerTemplate from '@kapoo/template/projects/ProjectsScreenerTemplate';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

/**
 * 프로젝트 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsTemplate(): ReactNode
{
	return (
		<Stack alignItems='center' data-component='ProjectsTemplate' spacing={10}>
			<ProjectsScreenerTemplate />
			<ProjectsListTemplate />
		</Stack>
	);
}