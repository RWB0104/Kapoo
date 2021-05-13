/**
 * 인덱스 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.26 Mon 22:10:38
 */

// 라이브러리 모듈
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Button, Container, Grid, Grow, Hidden, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// 사용자 모듈
import { getMainImages, getTypePosts } from "../common/api";
import { DESCRIPTION, MENU_LIST, PIECE, TITLE } from "../common/env";
import { getRandomItem } from "../common/common";
import PreviewList from "../components/section/index/PreviewList";
import { Top } from "../components/global/Top";
import Title from "../components/global/Title";


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
	const piece = getRandomItem(PIECE);

	const router = useRouter();

	const classes = getStyles();

	return (
		<React.Fragment>
			<Title title={MENU_LIST[0].title} />

			<Grow in={true}>
				<Box component="section">
					<Top title={TITLE} desc={DESCRIPTION} image={`/assets/images/main/${url}`} />

					<Container maxWidth="md">
						<Box component="article" className={classes.box}>
							<Grid container spacing={5}>
								<Grid item xs={12}>
									<Hidden smDown>
										<Typography variant="h2" align="center" className={classes.typo_title} gutterBottom>📑 Post</Typography>
									</Hidden>

									<Hidden mdUp>
										<Typography variant="h4" align="center" className={classes.typo_title} gutterBottom>📑 Post</Typography>
									</Hidden>
								</Grid>

								<PreviewList type="posts" data={posts} />

								<Grid item xs={12} className={classes.more_grid}>
									<Button className={classes.more} startIcon={<Add />} onClick={() => router.push("/posts?page=1&category=All")}>M O R E</Button>
								</Grid>
							</Grid>
						</Box>
					</Container>

					<Box component="article" className={classes.box_easter} style={{ backgroundImage: `url(${piece.images})` }}>
						<Hidden smDown>
							<Typography variant="h4" align="center" className={classes.typo_easter}>{piece.title}</Typography>
							<Typography variant="h6" align="center" className={classes.typo_easter}>{piece.author}</Typography>
						</Hidden>

						<Hidden mdUp>
							<Typography variant="h5" align="center" className={classes.typo_easter}>{piece.title}</Typography>
							<Typography variant="body1" align="center" className={classes.typo_easter}>{piece.author}</Typography>
						</Hidden>
					</Box>

					<Container maxWidth="md">
						<Box component="article" className={classes.box}>
							<Grid container spacing={5}>
								<Grid item xs={12}>
									<Hidden smDown>
										<Typography variant="h2" align="center" className={classes.typo_title} gutterBottom>🏆 Project</Typography>
									</Hidden>

									<Hidden mdUp>
										<Typography variant="h4" align="center" className={classes.typo_title} gutterBottom>🏆 Project</Typography>
									</Hidden>
								</Grid>

								<PreviewList type="projects" data={projects} />

								<Grid item xs={12} className={classes.more_grid}>
									<Button className={classes.more} startIcon={<Add />} onClick={() => router.push("/projects?page=1&category=All")}>M O R E</Button>
								</Grid>
							</Grid>
						</Box>
					</Container>
				</Box>
			</Grow>
		</React.Fragment>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		box: {
			marginTop: theme.spacing(7),
			marginBottom: theme.spacing(7)
		},
		box_easter: {
			padding: theme.spacing(3),
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundPosition: "center",
			textAlign: "center",
			height: "30vw",
			maxHeight: 600,
			minHeight: 300,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center"
		},
		typo_easter: {
			color: "white"
		},
		typo_title: {
			fontWeight: "bold"
		},
		more_grid: {
			textAlign: "center"
		},
		more: {
			background: "linear-gradient(to right, #4776E6, #8E54E9)",
			color: "white",
			padding: "15px 30px",
			margin: "auto",
			letterSpacing: 5
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
		"category"
	]);

	const projects = getTypePosts("projects", [
		"title",
		"date",
		"slug",
		"author",
		"coverImage",
		"excerpt",
		"type"
	]);

	const images = getMainImages();

	return {
		props: { images, posts, projects }
	};
}