/**
 * 메타 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 03:38:21
 */

import { BASE_URL, DESCRIPTION, TITLE } from '@commons/env';
import Head from 'next/head';

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
 * @returns {JSX.Element} JSX
 */
export default function Meta({ title, description = DESCRIPTION, type = 'website', url = '', image = 'https://user-images.githubusercontent.com/50317129/167476335-17cd861c-1d56-4384-b0ae-8c3680d9de29.png', locale = 'ko_KR' }: Props): JSX.Element
{
	return (
		<Head>
			<title>{`${title} - ${TITLE}`}</title>

			<meta content={description} name='description' />

			<meta content={TITLE} property='og:site_name' />
			<meta content={`${title} - ${TITLE}`} property='og:title' />
			<meta content={description} property='og:description' />
			<meta content={type} property='og:type' />
			<meta content={`${BASE_URL}${url}`} property='og:url' />
			<meta content={image} property='og:image' />
			<meta content={locale} property='og:locale' />

			<link href={`${BASE_URL}${url}`} rel='canonical' />
		</Head>
	);
}