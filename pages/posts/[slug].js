/**
 * 게시글 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.19 Wed 20:04:13
 */

// 라이브러리 모듈
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
import Head from "next/head";
import RelatedList from "../../components/section/posts/RelatedList";

/**
 * 게시글 JSX 반환 함수
 *
 * @param {Object} post: 게시글
 *
 * @returns {JSX} JSX 객체
 */
export default function Post({ page, post, group })
{
	const classes = getStyles();

	const router = useRouter();

	// 유효하지 않은 경로일 경우
	if (!router.isFallback && !post?.slug)
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
					<meta property="og:title" content={post.title} />
					<meta property="og:description" content={post.excerpt} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`https://rwb0104.github.io/posts/${post.slug}`} />
					<meta property="og:image" content={post.coverImage} />
					<meta property="og:locale" content="ko_KR" />
				</Head>

				<Title title={post.title} />

				<Top title={post.title} desc={getFormattedDate(new Date(post.date))} category={post.category} image={post.coverImage} />

				<Container maxWidth="md">
					<ContentsBody content={post} />

					{group.length > 0 && <RelatedList list={group} />}

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
							<Button variant="outlined" className={classes.list_button} fullWidth startIcon={<Menu />} onClick={() => router.push(MENU_LIST[1].url)}>목록</Button>
						</Grid>
					</Grid>

					{post.comment ? <Utterances /> : <NoUtterances />}
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
	const posts = getContents("posts");
	const post = getContentBySlug("posts", params.slug);

	const index = posts.findIndex(element => element.slug === post.slug);

	const group = post.group ? posts.filter(element => (element.group === post.group && element.slug !== post.slug)) : [];

	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			page: {
				type: "posts",
				prev: index - 1 > 0 ? posts[index - 1] : -1,
				next: index + 1 > posts.length - 1 ? -1 : posts[index + 1]
			},
			group: group,
			post: {
				...post,
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
	const posts = getContents("posts");

	return {
		paths: posts.map((post) =>
		{
			return {
				params: {
					slug: post.slug
				}
			};
		}),
		fallback: false
	};
}