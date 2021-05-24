/**
 * 메타 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.24 Mon 10:54:37
 */

// 라이브러리 모듈
import Head from "next/head";

// 사용자 모듈
import { DESCRIPTION, PROFILE, TITLE } from "../../common/env";

/**
 * 메타 컴포넌트 JSX 반환 함수
 *
 * @param {String} title: 페이지 제목
 * @param {String} description: 페이지 설명
 * @param {String} type: 페이지 타입
 * @param {String} url: 페이지 URL
 * @param {String} image: 페이지 커버 이미지 URL
 * @param {String} locale: 페이지 언어
 *
 * @returns {JSX} JSX 객체
 */
export default function Meta({ title, description = DESCRIPTION, type = "website", url, image = PROFILE, locale = "ko_KR" })
{
	return (
		<Head>
			<title>{`${title} - ${TITLE}`}</title>

			<meta name="description" content={description} />

			<meta property="og:site_name" content={TITLE} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={`https://rwb0104.github.io/${url}`} />
			<meta property="og:image" content={image} />
			<meta property="og:locale" content={locale} />

			<link rel="canonical" href={`https://rwb0104.github.io/${url}`}></link>
		</Head>
	);
}