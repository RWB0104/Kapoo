/**
 * 댓글 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 10:59:07
 */

'use client';

import Giscus from '@giscus/react';
import { themeStore } from '@kapoo/state';

/**
 * 댓글 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Comment(): JSX.Element
{
	const { themeState } = themeStore();

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
			theme={themeState}
		/>
	);
}