/**
 * 컨텐츠 TOC 컴포넌트
 *
 * @author RWB
 * @since 2021.07.21 Wed 22:48:28
 */

// 라이브러리 모듈
import { Box, Typography, useTheme } from '@material-ui/core';

// 사용자 모듈
import { tableOfContents, TocProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contenttoc.module.scss';

interface Props
{
	toc?: TocProps[]
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
	const theme = useTheme();

	return toc && toc.length > 0 ? (
		<Box className={styles[`toc-${theme.palette.type}`]}>
			<Typography component="h2" variant="h2" align="center">Table of Contents</Typography>

			<div dangerouslySetInnerHTML={{ __html: tableOfContents(toc) }}></div>
		</Box>
	) : null;
}