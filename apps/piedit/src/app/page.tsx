/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.08.21 Wed 01:12:55
 */

import MarkdownEditorBox from '@kapoo/piedit-ui-pack/organism/MarkdownEditorBox';
import PageTemplate from '@kapoo/piedit-ui-pack/template/PageTemplate';

import pkg from '../../package.json';

/**
 * 인덱스 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Index(): JSX.Element
{
	return (
		<PageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			version={pkg.version}
		>
			<MarkdownEditorBox />
		</PageTemplate>
	);
}