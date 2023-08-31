/**
 * 뷰 Hits organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 03:21:18
 */

'use client';

import Hits from '@kapoo/atom/Hits';
import { viewStore } from '@kapoo/store/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode, useMemo } from 'react';

/**
 * 뷰 Hits organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewHits(): ReactNode
{
	const { view } = viewStore();

	const color = useMemo(() => (view?.frontmatter.type === 'posts' ? 'dodgerblue' : 'springgreen'), [ view ]);

	return (
		<Stack data-component='ViewHits' direction='row' justifyContent='center'>
			<Hits countBgcolor='#333333' icon='react.svg' iconColor={color} text='view' titleBgcolor='#222222' unique={view?.url || '/'} />
		</Stack>
	);
}