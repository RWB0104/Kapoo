/**
 * 404 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 20:25:01
 */

import NotFoundTemplate from '@kapoo/template/global/NotFoundTemplate';
import { getMetadata } from '@kapoo/util/common';

import { ReactNode } from 'react';

export const metadata = getMetadata('Not Found', undefined, undefined, '/404');

/**
 * 404 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function NotFoundPage(): ReactNode
{
	return (
		<NotFoundTemplate />
	);
}