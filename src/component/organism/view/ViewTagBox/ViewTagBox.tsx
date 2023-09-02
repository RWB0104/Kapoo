/**
 * 뷰 태그 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 11:29:34
 */

'use client';

import { viewStore } from '@kapoo/store/markdown';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 뷰 태그 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTagBox(): ReactNode
{
	const { view } = viewStore();

	return (
		<Stack data-component='ViewTagBox' spacing={2}>
			<Typography fontWeight='bold'>🏷️ Related Tag</Typography>

			<Stack direction='row' spacing={2}>
				{view?.frontmatter.tag.map((i) => <Chip key={i} label={`# ${i}`} size='medium' variant='outlined' />)}
			</Stack>
		</Stack>
	);
}