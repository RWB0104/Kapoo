/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:54:47
 */

import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import Screener from '@kapoo/ui-pack/organism/Screener';

/**
 * 프로젝트 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectsPage(): JSX.Element
{
	return (
		<PageTemplate>
			<Screener />
		</PageTemplate>
	);
}