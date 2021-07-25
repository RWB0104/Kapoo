/**
 * 컨텐츠 TOC 컴포넌트
 *
 * @author RWB
 * @since 2021.07.21 Wed 22:48:28
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';

// 사용자 모듈
import { tableOfContents, TocProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contenttoc.module.scss';

interface Props {
	toc?: TocProps[]
}

/**
 * 컨텐츠 TOC ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement | null} ReactElement
 */
export default function ContentToc({ toc }: Props): ReactElement | null
{
	const theme = useTheme();

	// toc에 유효한 데이터가 있을 경우
	if (toc && toc.length > 0)
	{
		return (
			<Box className={styles[`toc-${theme.palette.type}`]}>
				<Typography component="h2" variant="h2" align="center">Table of Contents</Typography>

				<div dangerouslySetInnerHTML={{ __html:  tableOfContents(toc)}}></div>
			</Box>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}