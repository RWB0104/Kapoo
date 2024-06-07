/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:53:40
 */

import MarkdownPageTemplate from '@kapoo/blog-ui-pack/template/MarkdownPageTemplate';
import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';

import pkg from '../../../package.json';
import { getMetadata, routers } from '../../common';

export const metadata = getMetadata({
	description: routers.posts.subtitle,
	title: routers.posts.title,
	url: '/posts'
});

/**
 * 게시글 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function PostsPage(): JSX.Element
{
	return (
		<MarkdownPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			type='posts'
			version={pkg.version}
			template={(
				<PageScreenerTemplate
					color={routers.posts.color}
					subtitle={routers.posts.subtitle}
					text={routers.posts.title}
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		/>
	);
}