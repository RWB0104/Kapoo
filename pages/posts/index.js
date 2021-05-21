/**
 * 게시글 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Thu 22:37:06
 */

// 라이브러리 모듈
import React from "react";
import { Box, Container, Divider, FormControl, Grid, InputLabel, makeStyles, Select, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import { Fade } from "react-reveal";

// 사용자 모듈
import Top from "../../components/global/Top";
import Title from "../../components/global/Title";
import PostList from "../../components/section/posts/PostList";
import { getMainImages, getPosts } from "../../common/api";
import { getRandomItem } from "../../common/common";
import { MENU_LIST } from "../../common/env";

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

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const classes = getStyles();

	const router = useRouter();

	const categories = [ ...new Set(posts.map(element => element.category)) ];

	return (
		<React.Fragment>
			<Title title={MENU_LIST[1].title} />

			<Box component="section">
				<Fade>
					<Top title={MENU_LIST[1].title} desc={`Posts of "${router.query.category}"`} image={`/assets/images/main/${url}`} onlyEng />

					<Container maxWidth="md" className={classes.section}>
						<Grid container spacing={5}>
							<Grid item xs={isMobile ? 12 : 4}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="name">Category</InputLabel>

									<Select native label="Category" value={router.query.category} onChange={e => onSelectCategory(e, router)}>
										<option value="All">All</option>
										{categories.map((element, index) => <option key={index + 1} value={element}>{element}</option>)}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<Autocomplete
									options={posts.sort((a, b) => -b.category.localeCompare(a.category))}
									groupBy={option => option.category}
									getOptionLabel={option => option.title}
									onChange={(e, option) => router.push(`/posts/${option.slug}`)}
									renderInput={param => <TextField {...param} label="게시글 검색" variant="outlined" />}
								/>
							</Grid>

							<Grid item xs={12}>
								<PostList data={posts} />
							</Grid>
						</Grid>
					</Container>
				</Fade>
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
export async function getStaticProps()
{
	const posts = getPosts("posts");

	const images = getMainImages();

	return {
		props: { posts, images }
	};
}