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
import { Box, Button, Container, Divider, Grid, Grow, Hidden, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// 사용자 모듈
import { getMainImages, getTypePosts } from "../common/api";
import { DESCRIPTION, PIECE, TITLE } from "../common/env";
import { getRandomItem } from "../common/common";
import PreviewList from "../components/section/index/PreviewList";


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

	const classes = getStyles(`/assets/images/main/${url}`);

	return (
		<React.Fragment>
			<Head>
				<title>🐾Kapoo - Home</title>
			</Head>

			<Grow in={true}>
				<Box component="section">
					<Box className={classes.main}>
						<Box className={classes.main_wrapper}>
							<Hidden smDown>
								<Typography variant="h1" align="center">{TITLE}</Typography>
								<Typography variant="h4" align="center">{DESCRIPTION}</Typography>
							</Hidden>

							<Hidden mdUp>
								<Typography variant="h2" align="center">{TITLE}</Typography>
								<Typography variant="h6" align="center">{DESCRIPTION}</Typography>
							</Hidden>
						</Box>
					</Box>

					<Container maxWidth="md">
						<Box component="article" className={classes.box}>
							<Grid container spacing={5}>
								<Grid item xs={12}>
									<Typography variant="h2" align="center" gutterBottom>📑Post</Typography>
								</Grid>

								<PreviewList type="posts" data={posts} />

								<Grid item xs={12} className={classes.more_grid}>
									<Button className={classes.more} startIcon={<Add />} onClick={() => router.push("/posts")}>M O R E</Button>
								</Grid>
							</Grid>
						</Box>

						<Divider />

						<Box component="article" className={classes.box}>
							<Grid container spacing={5}>
								<Grid item xs={12}>
									<Typography variant="h2" align="center" gutterBottom>🏆Project</Typography>
								</Grid>

								<PreviewList type="projects" data={projects} />

								<Grid item xs={12} className={classes.more_grid}>
									<Button className={classes.more} startIcon={<Add />} onClick={() => router.push("/projects")}>M O R E</Button>
								</Grid>
							</Grid>
						</Box>

						<Divider />

						<Box component="article" className={classes.box}>
							<Typography variant="h4" align="center">{piece.title}</Typography>
							<Typography variant="h6" align="center">{piece.author}</Typography>
						</Box>

						<Divider />
					</Container>
				</Box>
			</Grow>
		</React.Fragment>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @param {String} image: 배경 이미지 URL
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles(image)
{
	return makeStyles((theme) => ({
		main: {
			display: "flex",
			height: "calc(100vh - 64px)",
			backgroundImage: `url(${image})`,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
			backgroundPosition: "center"
		},
		main_wrapper: {
			width: "100%",
			padding: 50,
			justifyContent: "center",
			alignSelf: "center",
			"& h1, & h2": {
				color: "white",
				marginBottom: 60,
				fontWeight: "bold"
			},
			"& h4, & h6": {
				color: "white",
				fontWeight: "bold"
			}
		},
		box: {
			marginTop: theme.spacing(7),
			marginBottom: theme.spacing(7)
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
		"type"
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