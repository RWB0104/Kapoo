/**
 * 프로젝트 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Thu 22:37:06
 */

// 라이브러리 모듈
import React from "react";
import { Box, Container, FormControl, Grid, Grow, Hidden, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import Head from "next/head";

// 사용자 모듈
import ProjectList from "../../components/section/projects/ProjectList";
import { getTypePosts } from "../../common/api";

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function Project({ projects })
{
	return (
		<React.Fragment>
			<Head>
				<title>🐾Kapoo - Projects</title>
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
									<Hidden smDown>
										<InputLabel id="name">Category</InputLabel>

										<Select labelId="name" label="Category">
											<MenuItem value="">All</MenuItem>
										</Select>
									</Hidden>

									<Hidden mdUp>
										<InputLabel id="name">Category</InputLabel>

										<Select native labelId="name" label="Category" style={{width: "100%"}}>
											<option value="">All</option>
										</Select>
									</Hidden>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<ProjectList data={projects} />
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
export async function getStaticProps()
{
	const projects = getTypePosts("projects", [
		"title",
		"date",
		"slug",
		"author",
		"coverImage",
		"excerpt",
		"type"
	]);

	return {
		props: { projects }
	};
}