/**
 * 뷰 Hits organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 03:21:18
 */

import Hits from '@kapoo/atom/Hits';
import { MarkdownType } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode, useMemo } from 'react';

export interface ViewHitsProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * URL
	 */
	url?: string;
}

/**
 * 뷰 Hits organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewHits({ type, url }: ViewHitsProps): ReactNode
{
	const color = useMemo(() => (type === 'posts' ? 'dodgerblue' : 'springgreen'), [ type ]);

	return (
		<Stack data-component='ViewHits' direction='row' justifyContent='center'>
			<Hits
				countBgcolor='#333333'
				icon='react.svg'
				iconColor={color}
				text='view'
				titleBgcolor='#222222'
				unique={`https://blog.itcode.dev${url || '/'}`}
			/>
		</Stack>
	);
}