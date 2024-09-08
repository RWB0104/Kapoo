/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.09.08 Sun 04:55:11
 */

import { BaseMetadataProps, getBaseMetadata } from '@kapoo/common';
import { Metadata } from 'next';

export type MetadataProps = Omit<BaseMetadataProps, 'sitename' | 'baseurl'>;

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
		subpath: '/piedit',
		thumbnail: '/piedit/thumb.png',
		url: '/'
	};

	return getBaseMetadata({ ...init, ...params });
}