/**
 * 인덱스 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.26 Mon 22:10:38
 */

// 라이브러리 모듈
import React from "react";
import { Fade } from "react-reveal";
import { Box, Container } from "@material-ui/core";

// 사용자 모듈
import Top from "../components/global/Top";
import Meta from "../components/global/Meta";
import ShowBox from "../components/section/index/ShowBox";
import Preview from "../components/section/index/Preview";
import { getMainImages, getContents } from "../common/api";
import { DESCRIPTION, MENU_LIST, TITLE } from "../common/env";
import { getRandomItem } from "../common/common";

/**
 * 인덱스 JSX 반환 함수
 *
 * @param {String[]} images: 메인 이미지 배열
 * @param {Object} posts: 게시글 리스트
 * @param {Object} projects: 프로젝트 리스트
 *
 * @returns {JSX} JSX 객체
 */
export default function Index({ images, posts, projects })
{
	const url = getRandomItem(images);

	return (
		<React.Fragment>
			<Meta title={MENU_LIST[0].title} description={DESCRIPTION} url={MENU_LIST[0].url.pathname} />

			<Box component="section">
				<Fade>
					<Top title={TITLE} desc={DESCRIPTION} image={`/assets/images/main/${url}`} onlyEng />

					<Container maxWidth="md">
						<Preview menu={MENU_LIST[1]} data={posts} />
					</Container>

					<ShowBox />

					<Container maxWidth="md">
						<Preview menu={MENU_LIST[2]} data={projects} />
					</Container>
				</Fade>
			</Box>
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
	const posts = getContents("posts");

	const projects = getContents("projects");

	const images = getMainImages();

	return {
		props: { images, posts, projects }
	};
}