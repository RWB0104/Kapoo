/**
 * 사이트맵 에셋 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 16:52:53
 */

import { getMarkdownDetailList } from '@kapoo/markdown-kit';
import { MarkdownHeaderProps, getId } from '@kapoo/root-ui-pack/common';
import { MetadataRoute } from 'next';

/**
 * 사이트맵 에셋 컴포넌트 반환 메서드
 *
 * @returns {Promise} MetadataRoute.Sitemap
 */
export default async function SitemapAssets(): Promise<MetadataRoute.Sitemap>
{
	const baseList = [ '', '/projects', '/guestbook' ];

	const baseSitemap = baseList.map<MetadataRoute.Sitemap[number]>((url) => ({
		changeFrequency: 'always',
		lastModified: new Date(),
		priority: 1,
		url: `${process.env.BASE_URL}${url}`
	}));

	const projectsSitemap = getMarkdownDetailList<MarkdownHeaderProps>('src/markdown')
		.filter(({ meta }) => !meta.disabled)
		.map<MetadataRoute.Sitemap[number]>(({ filename }) => ({
			changeFrequency: 'always',
			lastModified: new Date(),
			priority: 1,
			url: `${process.env.BASE_URL}/projects?id=${getId(filename)}`
		}));

	return baseSitemap.concat(projectsSitemap);
}