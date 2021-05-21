/**
 * 프리뷰 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.07 Fri 01:16:26
 */

// 라이브러리 모듈
import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import PostItem from "../posts/PostItem";

/**
 * 미리보기 컴포넌트 반환 함수
 *
 * @param {String} type: 컨텐츠 타입
 * @param {data} data: 게시글 리스트
 *
 * @returns {JSX} JSX 객체
 */
export default function PreviewList({ type, data })
{
	const classes = getStyles();

	const list = [];

	data.sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));

	for (let i = 0; i < 4; i++)
	{
		// 게시글이 있을 경우
		if (data[i] !== undefined)
		{
			list.push(
				<Grid item md={12} key={i} className={classes.contents_grid}>
					<PostItem item={data[i]} index={i} />
				</Grid>
			);
		}
	}

	return list;
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		contents_grid: {
			width: "100%"
		},
		contents: {
			width: "100%",
			minHeight: 400,
			padding: theme.spacing(5),
			color: "white",
			overflow: "hidden",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundPosition: "center",
			borderRadius: 20
		}
	}))();
}