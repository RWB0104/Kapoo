/**
 * 댓글 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 19:42:46
 */

import Giscus from '@giscus/react';
import { themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/Comment.module.scss';
import { useRecoilValue } from 'recoil';

interface Props
{
	flag: boolean
}

/**
 * 댓글 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Comment({ flag }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	return flag ? (
		<div className={styles.root}>
			<Giscus
				category='Comment'
				categoryId='DIC_kwDOFgF3J84CYZWI'
				data-component='Comment'
				inputPosition='top'
				lang='ko'
				mapping='pathname'
				reactionsEnabled='1'
				repo='RWB0104/blog.itcode.dev-comments'
				repoId='MDEwOlJlcG9zaXRvcnkzNjkxOTQ3OTE='
				strict='0'
				theme={themeState}
			/>
		</div>
	) : null;
}