/**
 * 소개 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 03:40:35
 */

// 라이브러리 모듈
import React from "react";
import Head from "next/head";
import { Box, Grow } from "@material-ui/core";

// 사용자 모듈
import Top from "../components/global/Top";
import Title from "../components/global/Title";
import { getRandomItem } from "../common/common";
import { getMainImages } from "../common/api";
import { DESCRIPTION, MENU_LIST, TITLE } from "../common/env";

/**
 * 소개 페이지 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function About({ images })
{
	const url = getRandomItem(images);

	return (
		<React.Fragment>
			<Title title={MENU_LIST[3].title} />

			<Head>
				<meta property="og:site_name" content={TITLE} />
				<meta property="og:title" content={MENU_LIST[3].title} />
				<meta property="og:description" content={DESCRIPTION} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://rwb0104.github.io/${MENU_LIST[3].url.pathname}/`} />
				<meta property="og:image" content={"https://rwb0104.github.io/assets/images/logo.png"} />
				<meta property="og:locale" content="ko_KR" />
			</Head>

			<Grow in={true}>
				<Box component="section">
					<Top title={MENU_LIST[3].title} image={`/assets/images/main/${url}`} onlyEng />
				</Box>
			</Grow>
		</React.Fragment>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps()
{
	const images = getMainImages();

	return {
		props: { images }
	};
}