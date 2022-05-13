/**
 * 컨텐츠 뷰어 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:11:28
 */

import { themeAtom } from '@commons/state';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';

interface Props
{
	content: string
}

/**
 * 컨텐츠 뷰어 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentViewer({ content }: Props): JSX.Element
{
	const themeState = useRecoilValue(themeAtom);

	return (
		<>
			<Head>
				<link href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" rel="stylesheet" />
			</Head>

			<div className={`markdown ${themeState}`} dangerouslySetInnerHTML={{ __html: content }} />
		</>
	);
}