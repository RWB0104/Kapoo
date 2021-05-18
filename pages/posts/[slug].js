import { useEffect } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Container, Divider, makeStyles } from "@material-ui/core";
import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@material-ui/core/colors";

import { getPostBySlug, getTypePosts, markdownToHtml } from "../../common/api";
import Title from "../../components/global/Title";
import Top from "../../components/global/Top";
import { getFormattedDate } from "../../common/common";
import Head from "next/head";

export default function Post({ post, morePosts, preview })
{
	const router = useRouter();

	const classes = getStyles();

	useEffect(() =>
	{
		const img = document.getElementsByTagName("img");

		for (const element of img)
		{
			element.addEventListener("contextmenu", e => e.preventDefault());
		}
	});

	if (!router.isFallback && !post?.slug)
	{
		return <ErrorPage statusCode={404} />;
	}

	return (
		<>
			<Title title={post.title} />
			<Head>
				<link href="/prism.css" rel="stylesheet" />
			</Head>

			<Top title={post.title} desc={getFormattedDate(new Date(post.date))} image={post.coverImage} />

			<Container maxWidth="md">
				<div className={classes.markdown} dangerouslySetInnerHTML={{ __html: post.content }}></div>
			</Container>
		</>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) =>
	{
		const colorRed = Object.entries(red).reduce((acc, element) =>
		{
			acc[`& .red-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorPink = Object.entries(pink).reduce((acc, element) =>
		{
			acc[`& .pink-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorPurple = Object.entries(purple).reduce((acc, element) =>
		{
			acc[`& .purple-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorDeepPurple = Object.entries(deepPurple).reduce((acc, element) =>
		{
			acc[`& .deepPurple-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorIndigo = Object.entries(indigo).reduce((acc, element) =>
		{
			acc[`& .indigo-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorBlue = Object.entries(blue).reduce((acc, element) =>
		{
			acc[`& .blue-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorLightBlue = Object.entries(lightBlue).reduce((acc, element) =>
		{
			acc[`& .lightBlue-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorCyan = Object.entries(cyan).reduce((acc, element) =>
		{
			acc[`& .cyan-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorTeal = Object.entries(teal).reduce((acc, element) =>
		{
			acc[`& .teal-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorGreen = Object.entries(green).reduce((acc, element) =>
		{
			acc[`& .green-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorLightGreen = Object.entries(lightGreen).reduce((acc, element) =>
		{
			acc[`& .lightGreen-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorLime = Object.entries(lime).reduce((acc, element) =>
		{
			acc[`& .lime-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorYellow = Object.entries(yellow).reduce((acc, element) =>
		{
			acc[`& .yellow-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorAmber = Object.entries(amber).reduce((acc, element) =>
		{
			acc[`& .amber-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorOrange = Object.entries(orange).reduce((acc, element) =>
		{
			acc[`& .orange-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorDeepOrange = Object.entries(deepOrange).reduce((acc, element) =>
		{
			acc[`& .deepOrange-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorBrown = Object.entries(brown).reduce((acc, element) =>
		{
			acc[`& .brown-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorGrey = Object.entries(grey).reduce((acc, element) =>
		{
			acc[`& .grey-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorBlueGrey = Object.entries(blueGrey).reduce((acc, element) =>
		{
			acc[`& .blueGrey-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});


		const refColor = theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";

		return {
			markdown: {
				fontSize: "1.5em",
				lineHeight: 1.8,
				"& .center": {
					textAlign: "center"
				},
				"& .small": {
					fontSize: "1.25em"
				},
				"& .large": {
					fontSize: "1.75em"
				},
				"& .bold": {
					fontWeight: "bold"
				},
				"& .primary": {
					color: theme.palette.primary[theme.palette.type]
				},
				"& .secondary": {
					color: theme.palette.secondary[theme.palette.type]
				},
				"& .error": {
					color: theme.palette.error[theme.palette.type]
				},
				"& .warning": {
					color: theme.palette.warning[theme.palette.type]
				},
				"& .info": {
					color: theme.palette.warning[theme.palette.type]
				},
				"& .success": {
					color: theme.palette.warning[theme.palette.type]
				},
				...colorRed,
				...colorPink,
				...colorPurple,
				...colorDeepPurple,
				...colorIndigo,
				...colorBlue,
				...colorLightBlue,
				...colorCyan,
				...colorTeal,
				...colorGreen,
				...colorLightGreen,
				...colorLime,
				...colorYellow,
				...colorAmber,
				...colorOrange,
				...colorDeepOrange,
				...colorBrown,
				...colorGrey,
				...colorBlueGrey,
				"& .MuiDivider-root": {
					border: "none",
					height: 1,
					margin: 0,
					flexShrink: 0,
					backgroundColor: refColor
				},
				"& .remark-highlight": {
					"& *": {
						userSelect: "text",
						msUserSelect: "text",
						MozUserSelect: "text",
						WebkitUserSelect: "text"
					}
				},
				"& h1, & h2, & h3, & h4, & h5, & h6": {
					marginTop: theme.spacing(10)
				},
				"& h1, & h2, & h3": {
					borderBottom: `1px solid ${refColor}`
				},
				"& a": {
					color: lightBlue[400]
				},
				"& blockquote": {
					borderLeft: `4px solid ${refColor}`,
					padding: "0 15px",
					color: "#777777",
					"& > :first-child": {
						marginTop: 0
					},
					"& > :last-child": {
						marginBottom: 0
					}
				},
				"& table": {
					padding: 0,
					borderCollapse: "collapse",
					"& tr": {
						borderTop: `1px solid ${theme.palette.type === "dark" ? "#333333" : "#CCCCCC"}`,
						backgroundColor: "transparent",
						margin: 0,
						padding: 0
					},
					"& tr:nth-child(2n)": {
						backgroundColor: theme.palette.type === "dark" ? "#041733" : "whitesmoke"
					},
					"& tr th": {
						fontWeight: "bold",
						border: `1px solid ${theme.palette.type === "dark" ? "#333333" : "#CCCCCC"}`,
						margin: 0,
						padding: "6px 13px"
					},
					"& tr td": {
						border: `1px solid ${theme.palette.type === "dark" ? "#333333" : "#CCCCCC"}`,
						margin: 0,
						padding: "6px 13px"
					},
					"& tr th :first-child, & tr td :first-child": {
						marginTop: 0
					},
					"& tr th :last-child, & tr td :last-child": {
						marginBottom: 0
					}
				},
				"& code:not([class*='language-'])": {
					backgroundColor: theme.palette.primary[theme.palette.type],
					padding: 5,
					borderRadius: 5,
					fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
					userSelect: "text",
					msUserSelect: "text",
					MozUserSelect: "text",
					WebkitUserSelect: "text"
				}
			}
		};
	})();
}

export async function getStaticProps({ params })
{
	const post = getPostBySlug("posts", params.slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"ogImage",
		"coverImage"
	]);

	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			post: {
				...post,
				content
			}
		}
	};
}

export async function getStaticPaths()
{
	const posts = getTypePosts("posts", ["slug"]);

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
