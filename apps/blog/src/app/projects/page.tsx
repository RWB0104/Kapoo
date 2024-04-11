/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:54:47
 */

import MarkdownPageTemplate from '@kapoo/blog-ui-pack/template/MarkdownPageTemplate';

import { getMetadata } from '../../common';

export const metadata = getMetadata({
	title: '프로젝트',
	url: '/projects'
});

/**
 * 프로젝트 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectsPage(): JSX.Element
{
	return (
		<MarkdownPageTemplate title={process.env.NEXT_PUBLIC_TITLE} type='projects' />
	);
}