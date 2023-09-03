/**
 * 프리로더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:41:23
 */

import MarkdownProvider from '@kapoo/organism/global/MarkdownProvider';
import { getMarkdownList } from '@kapoo/util/markdown';

import { ReactNode } from 'react';

/**
 * 프리로더 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Preloader(): ReactNode
{
	const posts = getMarkdownList('posts');
	const projects = getMarkdownList('projects');

	return (
		<MarkdownProvider posts={posts} projects={projects} />
	);
}