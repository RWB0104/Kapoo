/**
 * 사이트맵 에셋 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 16:41:09
 */

import { getUrl, markdownPath } from '@kapoo/blog-ui-pack/common';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import { MetadataRoute } from 'next';

/**
 * 사이트맵 에셋 컴포넌트 반환 메서드
 *
 * @returns {Promise} MetadataRoute.Sitemap
 */
export default async function SitemapAssets(): Promise<MetadataRoute.Sitemap>
{
	const baseList = [ '', '/posts', '/projects', '/comments' ];

	const postsList = getMarkdownAllList(markdownPath.posts).map(({ filename }) => getUrl(filename, 'posts'));
	const projectsList = getMarkdownAllList(markdownPath.projects).map(({ filename }) => getUrl(filename, 'projects'));

	const totalList = baseList.concat(postsList).concat(projectsList);

	return totalList.map<MetadataRoute.Sitemap[number]>((url) => ({
		changeFrequency: 'always',
		lastModified: new Date(),
		priority: 1,
		url: `${process.env.BASE_URL}${url}`
	}));
}