/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:48:01
 */

import Navigation from '@kapoo/ui-pack/organism/Navigation';
import Screener from '@kapoo/ui-pack/organism/Screener';
import { ReactNode } from 'react';

/**
 * 앱 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function AppPage(): ReactNode
{
	return (
		<div data-component='Index'>
			<Navigation />
			<Screener />

			<div>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
				<p>2342423</p>
			</div>
		</div>
	);
}