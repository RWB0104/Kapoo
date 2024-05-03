/**
 * 댓글 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:33:48
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
			categoryId='DIC_kwDOGb2mi84CYZXN'
			data-component='Comment'
			inputPosition='top'
			lang='ko'
			mapping='pathname'
			reactionsEnabled='1'
			repo='RWB0104/itcode.dev-comments'
			repoId='R_kgDOGb2miw'
			strict='0'
			theme={themeState}
		/>
	);
}