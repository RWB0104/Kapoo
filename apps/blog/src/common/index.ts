/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.04.05 Fri 14:21:09
 */

import { postGoogleLogin, postPopularData } from '@kapoo/api';
import { BlogMarkdownDetailProps, MarkdownHeaderProps, MarkdownType, getMarkdownDetailListForGrid } from '@kapoo/blog-ui-pack/common';
import { BaseMetadataProps, getBaseMetadata } from '@kapoo/common';
import { Metadata } from 'next';
import { CSSProperties } from 'react';

export type MetadataProps = Omit<BaseMetadataProps, 'sitename' | 'baseurl'>;

export interface RouterProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 부제목
	 */
	subtitle: string;

	/**
	 * 색상
	 */
	color: CSSProperties['color'];
}

export const routers: Record<'home' | 'posts' | 'projects' | 'comments', RouterProps> = {
	comments: {
		color: 'hotpink',
		subtitle: '💝 두근대며 읽어보는 중...',
		title: '방명록'
	},
	home: {
		color: 'gold',
		subtitle: process.env.NEXT_PUBLIC_DESCRIPTION,
		title: '홈'
	},
	posts: {
		color: 'dodgerblue',
		subtitle: '📚 무엇인가 끄적끄적 쓰는 중...',
		title: '게시글'
	},
	projects: {
		color: 'springgreen',
		subtitle: '💻 무언가 뚝딱뚝딱 만드는 중...',
		title: '프로젝트'
	}
};

/**
 * 메타데이터 반환 메서드
 *
 * @param {MetadataProps} params: MetadataProps
 *
 * @returns {Metadata} 메타데이터
 */
export function getMetadata(params?: MetadataProps): Metadata
{
	const init: BaseMetadataProps = {
		baseurl: process.env.NEXT_PUBLIC_BASE_URL,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		keywords: [],
		sitename: process.env.NEXT_PUBLIC_TITLE,
		thumbnail: '/thumb.png',
		title: process.env.NEXT_PUBLIC_TITLE,
		url: '/'
	};

	return getBaseMetadata({ ...init, ...params });
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