// 라이브러리 모듈
import React from "react";
import { Fade } from "react-reveal";
import { useRouter } from "next/router";
import { Box, Container, FormControl, Grid, InputLabel, makeStyles, Select, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

// 사용자 모듈
import Top from "./components/global/Top";
import PostList from "./components/section/posts/PostList";
import { getMainImages, getContents } from "./common/api";
import { getRandomItem } from "./common/common";
import { DESCRIPTION, MAX_CONTENT, MENU_LIST } from "./common/env";
import Meta from "./components/global/Meta";
import NoContents from "./components/section/contents/NoContents";

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @param {JSON[]} posts: 게시글 리스트
 * @param {String} images: 이미지 객체
 *
 * @returns {JSX} JSX 객체
 */
export default function Posts({ posts, images, page, total, categories })
{
	const url = getRandomItem(images);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const classes = getStyles();

	const router = useRouter();

	const category = "All";

	console.dir(total);

	return (
		<React.Fragment>
			<Meta title={MENU_LIST[1].title} description={DESCRIPTION} url={MENU_LIST[1].url.pathname} />

			<Box component="section">
				<Fade>
					<Top title={MENU_LIST[1].title} image={`/assets/images/main/${url}`} onlyEng />
				</Fade>

				<Container maxWidth="md" className={classes.section}>
					{
						posts.length > 0 ? (
							<Grid container spacing={4}>
								<Grid item xs={isMobile ? 12 : 4}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel id="name">Category</InputLabel>

										<Select native label="Category" value={category} onChange={e => onSelectCategory(e, router)}>
											<option value="All">All</option>
											{categories.map((element, index) => <option key={index + 1} value={element}>{element}</option>)}
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<Autocomplete
										page={page}
										options={posts.sort((a, b) => -b.category.localeCompare(a.category))}
										groupBy={option => option.category}
										getOptionLabel={option => option.title}
										onChange={(e, option) => router.push(`/posts/${option.slug}`)}
										renderInput={param => <TextField {...param} label="게시글 검색" variant="outlined" />}
									/>
								</Grid>

								<Grid item xs={12}>
									<PostList data={posts} page={page} total={total} />
								</Grid>
							</Grid>
						) : (
							<Grid container spacing={5}>
								<Grid item xs={12}>
									<NoContents />
								</Grid>
							</Grid>
						)
					}
				</Container>
			</Box>
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
	}, undefined, {
		scroll: false
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
		section: {
			marginTop: theme.spacing(10)
		}
	}))();
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps({ params })
{
	const data = getContents("posts").sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
	const posts = data.slice((params.page - 1) * MAX_CONTENT, params.page * MAX_CONTENT);

	const total = Math.max(Math.ceil(data.length / MAX_CONTENT), 1);

	const images = getMainImages();

	const categories = [ ...new Set(posts.map(element => element.category)) ];

	return {
		props: { posts, images, categories, total, page: params.page }
	};
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Object} 동적 경로 객체
 */
export async function getStaticPaths()
{
	const posts = getContents("posts");

	const total = Math.max(Math.ceil(posts.length / MAX_CONTENT), 1);

	const pages = [];

	for (let i = 1; i <= total; i++)
	{
		pages.push(i);
	}

	return {
		paths: pages.map(num =>
		{
			return {
				params: {
					page: num.toString()
				}
			};
		}),
		fallback: false
	};
}