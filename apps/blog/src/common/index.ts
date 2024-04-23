/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.04.05 Fri 14:21:09
 */

import { postGoogleLogin, postPopularData } from '@kapoo/api';
import { BlogMarkdownDetailProps, MarkdownHeaderProps, MarkdownType, getMarkdownDetailListForGrid } from '@kapoo/blog-ui-pack/common';
import { author } from '@kapoo/common';
import { Metadata } from 'next';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';

export interface BaseMetadataProps
{
	/**
	 * 타이틀
	 */
	title?: string;

	/**
	 * 설명
	 */
	description?: string;

	/**
	 * 키워드
	 */
	keywords?: string[];

	/**
	 * 경로
	 */
	url?: string;

	/**
	 * 썸네일 url
	 */
	thumbnail?: string;
}

/**
 * 메타데이터 반환 메서드
 *
 * @param {BaseMetadataProps} params: BaseMetadataProps
 *
 * @returns {Metadata} 메타데이터
 */
export function getMetadata(params: BaseMetadataProps | undefined): Metadata
{
	const init: BaseMetadataProps = {
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		keywords: [],
		thumbnail: '/thumb.png',
		title: process.env.NEXT_PUBLIC_TITLE,
		url: '/'
	};

	const { title, description, keywords, url, thumbnail } = { ...init, ...params };

	const fullTitle = `${title} - ${process.env.NEXT_PUBLIC_TITLE}`;

	return {
		applicationName: process.env.NEXT_PUBLIC_TITLE,
		authors: Object.values(author.social).map<Author>(({ link, name }) => ({ name, url: link })),
		creator: author.nickname,
		description,
		generator: 'Next.js',
		icons: [
			'/favicon.ico',
			{ rel: 'shortcut icon', url: '/favicon.ico' },
			{ rel: 'apple-touch-icon', url: '/favicon.ico' }
		],
		keywords,
		metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ''),
		openGraph: {
			description,
			images: thumbnail,
			locale: 'ko-KR',
			siteName: process.env.NEXT_PUBLIC_TITLE,
			title: fullTitle,
			type: 'website',
			url
		},
		publisher: 'GitHub Pages',
		title: fullTitle,
		twitter: {
			description,
			images: thumbnail,
			title: fullTitle
		}
	};
}

/**
 * 인기 컨텐츠 반환 비동기 메서드
 *
 * @param {MarkdownType} type: 마크다운 타입
 *
 * @returns {Promise} 비동기 마크다운 상세
 */
export async function getPopularList(type: MarkdownType): Promise<BlogMarkdownDetailProps<MarkdownHeaderProps>[]>
{
	const auth = await postGoogleLogin({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN
	});

	if (auth)
	{
		const popularData = await postPopularData(type, auth);
		const gridList = getMarkdownDetailListForGrid(type);

		const popularUrl = popularData?.rows.map(({ dimensionValues }) => dimensionValues[0].value) || [];

		return gridList.filter(({ url }) => popularUrl.includes(url));
	}

	return [];
}