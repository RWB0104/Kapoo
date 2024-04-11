/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:48:01
 */

import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';

import { getMetadata } from '../common';

export const metadata = getMetadata({ title: '홈' });

/**
 * 앱 페이지 컴포넌트 반환 비동기 메서드
 *
 * @returns {Promise} 비동기 JSX
 */
export default async function AppPage(): Promise<JSX.Element>
{
	return (
		<ScreenPageTemplate title={process.env.NEXT_PUBLIC_TITLE} />
	);
}