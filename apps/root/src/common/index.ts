/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.05.02 Thu 16:46:16
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
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		keywords: [],
		thumbnail: '/thumb.png',
		title: process.env.NEXT_PUBLIC_TITLE,
		url: '/'
	};

	return getBaseMetadata({ ...init, ...params });
}