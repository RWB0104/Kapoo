/**
 * 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 03:38:21
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import Head from 'next/head';

// 사용자 모듈
import { DESCRIPTION, TITLE } from '@commons/env';

interface Props {
	title: string,
	description?: string,
	type?: string,
	url?: string,
	image?: string,
	locale?: string
}

/**
 * 메타 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Meta({ title, description = DESCRIPTION, type = 'website', url = '', image = 'https://rwb0104.github.io/favicon.ico', locale = 'ko_KR' }: Props): ReactElement
{
	return (
		<Head>
			<title>{title}</title>

			<meta name="description" content={description} />

			<meta property="og:site_name" content={TITLE} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={`https://rwb0104.github.io${url}`} />
			<meta property="og:image" content={image} />
			<meta property="og:locale" content={locale} />

			<link rel="canonical" href={`https://rwb0104.github.io${url}`}></link>
		</Head>
	);
}