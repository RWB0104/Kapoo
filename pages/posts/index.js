/**
 * 게시글 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Thu 22:37:06
 */

// 라이브러리 모듈
import React from "react";
import { Box, Container, Divider, Grid, Grow, makeStyles, Select, Typography } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";

// 사용자 모듈
import { Top } from "../../components/global/Top";
import PostList from "../../components/section/posts/PostList";
import { getMainImages, getTypePosts } from "../../common/api";
import { getRandomItem } from "../../common/common";
import { Autocomplete } from "@material-ui/lab";

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @param {JSON[]} posts: 게시글 리스트
 *
 * @returns {JSX} JSX 객체
 */
export default function Posts({ posts, images })
{
	const url = getRandomItem(images);

	const classes = getStyles();

	const router = useRouter();

	const categories = [...new Set(posts.map(e => e.category))];

	return (
		<React.Fragment>
			<Head>
				<title>🐾Kapoo - Posts</title>
			</Head>

			<Grow in={true}>
				<Box component="section">
					<Top title="📑 Post" image={`/assets/images/main/${url}`} />

					<Container maxWidth="md">
						<Grid container spacing={5}>
							<Grid item xs={12}>
								<Divider className={classes.divider} />
							</Grid>

							<Grid item xs={4}>
								<Select native className={classes.category} value={router.query.category} onChange={e => onSelectCategory(e, router)} fullWidth>
									<option value="all">All</option>
									{categories.map((element, index) => <option key={index} value={element}>{element}</option>)}
								</Select>
							</Grid>

							<Grid item xs={12}>
								<PostList data={posts} />
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Grow>
		</React.Fragment>
	);
}

/**
 * 카테고리 선택 이벤트 함수
 *
 * @param {Event} e: 이벤트 객체
 * @param {Object} router: 라우터 객체
 */
function onSelectCategory(e, router)
{
	router.push({
		query: {
			page: 1,
			category: e.target.value
		}
	});
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		divider: {
			marginTop: theme.spacing(10),
			marginBottom: theme.spacing(5)
		},
		category: {
			"& > select": {
				padding: 12
			}
		}
	}))();
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps()
{
	const posts = getTypePosts("posts", [
		"title",
		"date",
		"slug",
		"author",
		"coverImage",
		"excerpt",
		"type",
		"category",
		"tag"
	]);

	const images = getMainImages();

	return {
		props: { posts, images }
	};
}