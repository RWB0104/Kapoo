/**
 * 뷰 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 21:17:21
 */

'use client';

import Screener from '@kapoo/molecule/Screener';
import ScreenerBox from '@kapoo/organism/global/ScreenerBox';
import { viewStore } from '@kapoo/store/markdown';

import { CSSProperties, ReactNode, useMemo } from 'react';

/**
 * 뷰 스크리너 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewScrennerTemplate(): ReactNode
{
	const { view } = viewStore();

	const name = useMemo(() => (view?.frontmatter.type === 'projects' ? '프로젝트' : '게시글'), [ view ]);
	const color: CSSProperties['color'] = useMemo(() => (view?.frontmatter.type === 'projects' ? 'springgreen' : 'dodgerblue'), [ view ]);

	return (
		<Screener cover={view?.frontmatter.coverImage}>
			<ScreenerBox
				color={color}
				name={name}
				title={view?.frontmatter.title || ''}
			/>
		</Screener>
	);
}