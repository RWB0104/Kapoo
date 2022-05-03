/**
 * 컨텐츠 뷰어 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:11:28
 */

// 라이브러리 모듈
import { useTheme } from '@material-ui/core';
import Head from 'next/head';

interface Props
{
	content: string
}

/**
 * 컨텐츠 뷰어 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentViewer({ content }: Props): JSX.Element | null
{
	const theme = useTheme();

	return (
		<>
			<Head>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" />
			</Head>

			<div className={`markdown ${theme.palette.type}`} dangerouslySetInnerHTML={{ __html: content }} />
		</>
	);
}