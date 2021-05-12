/**
 * 소개 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 03:40:35
 */

// 라이브러리 모듈
import React from "react";
import { Box, Grow } from "@material-ui/core";
import Head from "next/head";
import { Top } from "../components/global/Top";
import { getRandomItem } from "../common/common";
import { getMainImages } from "../common/api";

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
			<Head>
				<title>🐾Kapoo - About</title>
			</Head>

			<Grow in={true}>
				<Box component="section">
					<Top title="🔍 About" image={`/assets/images/main/${url}`} />
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