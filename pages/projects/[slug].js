/**
 * 프로젝트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.19 Wed 20:04:13
 */

// 라이브러리 모듈
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Avatar, Box, Button, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

// 사용자 모듈
import Title from "../../components/global/Title";
import Top from "../../components/global/Top";
import ContentsBody from "../../components/section/contents/CotentsBody";
import SideMover from "../../components/section/contents/SideMover";
import Utterances from "../../components/section/contents/Utterances";
import NoUtterances from "../../components/section/contents/NoUtterances";
import { getContentBySlug, getContents, markdownToHtml } from "../../common/api";
import { getFormattedDate } from "../../common/common";
import { MENU_LIST, TITLE } from "../../common/env";

/**
 * 프로젝트 JSX 반환 함수
 *
 * @param {Object} project: 프로젝트
 *
 * @returns {JSX} JSX 객체
 */
export default function Project({ page, project })
{
	const classes = getStyles();

	const router = useRouter();

	// 유효하지 않은 경로일 경우
	if (!router.isFallback && !project?.slug)
	{
		return <ErrorPage statusCode={404} />;
	}

	// 유효한 경로일 경우
	else
	{
		return (
			<>
				<Head>
					<meta property="og:site_name" content={TITLE} />
					<meta property="og:title" content={project.title} />
					<meta property="og:description" content={project.excerpt} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`https://rwb0104.github.io/projects/${project.slug}`} />
					<meta property="og:image" content={project.coverImage} />
					<meta property="og:locale" content="ko_KR" />
				</Head>

				<Title title={project.title} />

				<Top title={project.title} desc={getFormattedDate(new Date(project.date))} category={project.category} image={project.coverImage} />

				<Container maxWidth="md">
					<ContentsBody content={project} />

					<SideMover page={page} />

					<Box display="flex" alignItems="center" className={classes.divider}>
						<Box flexGrow={1}>
							<Divider />
						</Box>

						<Box>
							<Avatar alt="RWB" className={classes.avatar} src="/assets/images/profile.jpg" />
						</Box>

						<Box flexGrow={1}>
							<Divider />
						</Box>
					</Box>

					<Grid container justify="flex-end">
						<Grid item>
							<Button variant="outlined" className={classes.list_button} fullWidth startIcon={<Menu />} onClick={() => router.push(MENU_LIST[2].url)}>목록</Button>
						</Grid>
					</Grid>

					{project.comment ? <Utterances /> : <NoUtterances />}
				</Container>
			</>
		);
	}
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
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3)
		},
		avatar: {
			marginRight: theme.spacing(3),
			marginLeft: theme.spacing(3)
		},
		list_button: {
			paddingRight: theme.spacing(2),
			paddingLeft: theme.spacing(2)
		}
	}))();
}

/**
 * 사용자 Props 반환 함수
 *
 * @param {Object} params: 컨텐츠
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps({ params })
{
	const projects = getContents("projects");
	const project = getContentBySlug("projects", params.slug);

	const index = posts.findIndex(element => element.slug === project.slug);

	const content = await markdownToHtml(project.content || "");

	return {
		props: {
			page: {
				type: "projects",
				prev: index - 1 > 0 ? projects[index - 1] : -1,
				next: index + 1 > projects.length - 1 ? -1 : projects[index + 1]
			},
			project: {
				...project,
				content
			}
		}
	};
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Object} 동적 경로 객체
 */
export async function getStaticPaths()
{
	const projects = getContents("projects");

	return {
		paths: projects.map((project) =>
		{
			return {
				params: {
					slug: project.slug
				}
			};
		}),
		fallback: false
	};
}