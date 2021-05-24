/**
 * 소개 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 03:40:35
 */

// 라이브러리 모듈
import React from "react";
import { Box, Grow } from "@material-ui/core";

// 사용자 모듈
import Top from "../components/global/Top";
import { getRandomItem } from "../common/common";
import { getMainImages } from "../common/api";
import { DESCRIPTION, MENU_LIST } from "../common/env";
import Meta from "../components/global/Meta";

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
			<Meta title={MENU_LIST[3].title} description={DESCRIPTION} url={MENU_LIST[3].url.pathname} />

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