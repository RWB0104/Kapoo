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

/**
 * 소개 페이지 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function About()
{
	return (
		<React.Fragment>
			<Head>
				<title>🐾Kapoo - About</title>
			</Head>

			<Grow in={true}>
				<Box component="section">
					<p>About</p>
				</Box>
			</Grow>
		</React.Fragment>
	);
}