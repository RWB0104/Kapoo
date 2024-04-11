/**
 * 사이트맵 에셋 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 16:41:09
 */

import { markdownPath } from '@kapoo/blog-ui-pack/common';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import { MetadataRoute } from 'next';

/**
 * 사이트맵 에셋 컴포넌트 반환 메서드
 *
 * @returns {Promise} MetadataRoute.Sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
	const baseList = [ '', '/posts', '/projects', '/comments' ];

	const postsList = await getMarkdownAllList(markdownPath.post).map(({ token }) => `/posts/${token.join('/')}`);
	const projectsList = await getMarkdownAllList(markdownPath.project).map(({ token }) => `/projects/${token.join('/')}`);

	const totalList = baseList.concat(postsList).concat(projectsList);

	return totalList.map<MetadataRoute.Sitemap[number]>((url) => ({
		changeFrequency: 'always',
		lastModified: new Date(),
		priority: 1,
		url: `${process.env.BASE_URL}${url}`
	}));
}