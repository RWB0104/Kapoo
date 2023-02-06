/**
 * 컨텐츠 TOC 컴포넌트
 *
 * @author RWB
 * @since 2021.07.21 Wed 22:48:28
 */

import { themeAtom } from '@commons/state';
import styles from '@styles/components/contents/ContentToc.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

interface Props
{
	toc?: string
}

/**
 * 컨텐츠 TOC JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentToc({ toc }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	const cn = classNames.bind(styles);

	return toc ? (
		<div className={cn('toc', themeState)}>
			<h2>Table of Contents</h2>

			<div dangerouslySetInnerHTML={{ __html: toc }} />
		</div>
	) : null;
}