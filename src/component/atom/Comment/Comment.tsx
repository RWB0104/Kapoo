/**
 * 댓글 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 22:03:07
 */

'use client';

import { themeStore } from '@kapoo/store/theme';

import Giscus from '@giscus/react';
import { ReactNode } from 'react';

/**
 * 댓글 atom 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Comment(): ReactNode
{
	const mode = themeStore();

	return (
		<Giscus
			category='Comment'
			categoryId='DIC_kwDOFgF3J84CYZWI'
			data-component='Comment'
			inputPosition='top'
			lang='ko'
			mapping='pathname'
			reactionsEnabled='1'
			repo='RWB0104/blog.itcode.dev-comments'
			repoId='MDEwOlJlcG9zaXRvcnkzNjkxOTQ3OTE'
			strict='0'
			theme={mode.theme}
		/>
	);
}