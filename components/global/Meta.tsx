/**
 * 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 03:38:21
 */

// 라이브러리 모듈
import Head from 'next/head';

// 사용자 모듈
import { BASE_URL, DESCRIPTION, TITLE } from '@commons/env';

interface Props
{
	title: string,
	description?: string,
	type?: string,
	url?: string,
	image?: string,
	locale?: string
}

/**
 * 메타 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Meta({ title, description = DESCRIPTION, type = 'website', url = '', image = '/favicon.ico', locale = 'ko_KR' }: Props): JSX.Element | null
{
	return (
		<Head>
			<title>{`${title} - ${TITLE}`}</title>

			<meta name="description" content={description} />

			<meta property="og:site_name" content={TITLE} />
			<meta property="og:title" content={`${title} - ${TITLE}`} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={`${BASE_URL}${url}`} />
			<meta property="og:image" content={image} />
			<meta property="og:locale" content={locale} />

			<link rel="canonical" href={`${BASE_URL}${url}`}></link>
		</Head>
	);
}