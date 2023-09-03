/**
 * 홈 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 19:58:12
 */

import { PAGE_INFO } from '@kapoo/env';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import HomeTemplate from '@kapoo/template/home/HomeTemplate';
import { getMetadata } from '@kapoo/util/common';

import { ReactNode } from 'react';

export const metadata = getMetadata(PAGE_INFO.index.title, PAGE_INFO.index.description);

/**
 * 홈 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePage(): ReactNode
{
	return (
		<PageTemplate>
			<HomeTemplate />
		</PageTemplate>
	);
}