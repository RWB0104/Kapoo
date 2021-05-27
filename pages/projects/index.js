/**
 * 프로젝트 페이지 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Thu 22:37:06
 */

// 라이브러리 모듈
import React from "react";
import { Fade } from "react-reveal";
import { Box, Container, Divider, FormControl, Grid, Hidden, InputLabel, makeStyles, MenuItem, Select, useMediaQuery, useTheme } from "@material-ui/core";

// 사용자 모듈
import ProjectList from "../../components/section/projects/ProjectList";
import { getMainImages, getContents } from "../../common/api";
import Top from "../../components/global/Top";
import { getRandomItem } from "../../common/common";
import { DESCRIPTION, MENU_LIST } from "../../common/env";
import Meta from "../../components/global/Meta";
import { useRouter } from "next/router";
import NoContents from "../../components/section/contents/NoContents";

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function Project({ projects, images })
{
	const url = getRandomItem(images);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const classes = getStyles();

	const router = useRouter();

	const category = router.query.category || "All";

	return (
		<React.Fragment>
			<Meta title={MENU_LIST[2].title} description={DESCRIPTION} url={MENU_LIST[2].url.pathname} />

			<Box component="section">
				<Fade>
					<Top title={MENU_LIST[2].title} image={`/assets/images/main/${url}`} onlyEng />

					<Container maxWidth="md" className={classes.section}>
						{
							projects.length > 0 ? (
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
											options={posts.sort((a, b) => -b.category.localeCompare(a.category))}
											groupBy={option => option.category}
											getOptionLabel={option => option.title}
											onChange={(e, option) => router.push(`/projects/${option.slug}`)}
											renderInput={param => <TextField {...param} label="프로젝트 검색" variant="outlined" />}
										/>
									</Grid>

									<Grid item xs={12}>
										<ProjectList data={projects} />
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
				</Fade>
			</Box>
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
	const projects = getContents("projects");

	const images = getMainImages();

	return {
		props: { projects, images }
	};
}