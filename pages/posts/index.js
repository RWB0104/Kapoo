/**
 * 게시글 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Thu 22:37:06
 */

// 라이브러리 모듈
import React from "react";
import { Box, Container, FormControl, Grid, Grow, Hidden, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import Head from "next/head";

// 사용자 모듈
import PostList from "../../components/section/posts/PostList";
import { getTypePosts } from "../../common/api";
import { useRouter } from "next/router";

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function Posts({ posts })
{
	const router = useRouter();

	const categories = [...new Set(posts.map(e => e.category))];

	return (
		<React.Fragment>
			<Head>
				<title>🐾Kapoo - Posts</title>
			</Head>

			<Grow in={true}>
				<Box component="section">
					<Container maxWidth="md">
						<Grid container spacing={5}>
							<Grid item xs={12}>
								<Typography variant="h4" gutterBottom>🏆Post</Typography>
							</Grid>

							<Grid item xs={12}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="name">Category</InputLabel>

									<Hidden smDown>
										<Select labelId="name" label="Category" onChange={e => router.push({
											query: {
												...router.query,
												category: e.target.value
											}
										})}>
											<MenuItem value="all">All</MenuItem>
											{categories.map((element, index) => <MenuItem key={index} value={element}>{element}</MenuItem>)}
										</Select>
									</Hidden>

									<Hidden mdUp>
										<Select native labelId="name" label="Category" style={{width: "100%"}} onChange={e => router.push({
											query: {
												...router.query,
												category: e.target.value
											}
										})}>
											<option value="all">All</option>
											{categories.map((element, index) => <option key={index} value={element}>{element}</option>)}
										</Select>
									</Hidden>
								</FormControl>
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
 * 사용자 Props 반환 함수
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps(context)
{
	console.dir(context);
	const posts = getTypePosts("posts", [
		"title",
		"date",
		"slug",
		"author",
		"coverImage",
		"excerpt",
		"type",
		"category"
	]);

	return {
		props: { posts }
	};
}