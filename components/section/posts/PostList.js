/**
 * 게시글 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 12:34:25
 */

// 라이브러리 모듈
import { Box, ButtonBase, Chip, Grid, Link, makeStyles, Typography, Zoom } from "@material-ui/core";
import { Autocomplete, Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";

// 사용자 모듈
import { MAX_CONTENT } from "../../../common/env";

/**
 * 게시글 리스트 JSX 반환 함수
 *
 * @param {JSON[]} data: 게시글 리스트
 *
 * @returns {JSX} JSX 객체
 */
export default function PostList({ data })
{
	const classes = getStyles();

	const router = useRouter();

	const row = data.filter(element => router.query.category === "all" ? true : element.category === router.query.category);

	const total = Math.max(Math.ceil(row.length / MAX_CONTENT), 1);
	const page = parseInt(router.query.page) || 1;

	const content = row.slice((page - 1) * MAX_CONTENT, page * MAX_CONTENT);

	return (
		<Box>
			<Grid container spacing={8}>
				<Grid item xs={12}>
					<Autocomplete />
				</Grid>

				{content.map((element, index) => (
					<Zoom key={index} in={true} style={{ transitionDelay: `${index * 150}ms` }}>
						<Grid component="article" item xs={12}>
							<ButtonBase className={classes.post_button} onClick={() => router.push(`/posts/${element.slug}`)}>
								<Grid container spacing={0}>
									<Grid className={classes.image_wrap, "wrapper"} item xs={4}>
										<Box className={classes.post_image} style={{ backgroundImage: `url(${element.coverImage})` }} />
									</Grid>

									<Grid item xs={8} className={classes.post_content}>
										<Typography variant="h6" onClick={(e) =>
										{
											e.stopPropagation();

											router.push({
												query: {
													page: 1,
													category: e.target.innerText
												}
											});
										}}>
											📌 <Link href="#">{element.category}</Link>
										</Typography>

										<Typography variant="h4" className={classes.post_title}>{element.title}</Typography>

										<Typography variant="caption" className={classes.post_desc}>{element.excerpt}</Typography>

										<Box>
											{element.tag?.map((sub, index) => <Chip key={index} label={`# ${sub}`} className={classes.post_tag} onClick={(e) => e.stopPropagation()} />)}
										</Box>
									</Grid>
								</Grid>
							</ButtonBase>
						</Grid>
					</Zoom>
				))}
			</Grid>

			<Pagination
				className={classes.pagination}
				count={total}
				page={page}
				defaultPage={1}
				color="primary"
				siblingCount={1}
				boundaryCount={2}
				showFirstButton
				showLastButton
				onChange={(e, page) => router.push({
					query: {
						...router.query,
						page: page
					}
				})}
			/>
		</Box>
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
		post_button: {
			textAlign: "initial",
			"& .wrapper": {
				overflow: "hidden"
			},
			"&:hover .wrapper > div": {
				transform: "scale(1.2)",
				transition: "0.5s"
			}
		},
		post_image: {
			height: "303.98px",
			backgroundSize: "cover",
			backgroundPosition: "center",
			transform: "scale(1)",
			transition: "0.5s"
		},
		post_content: {
			padding: "7px 20px 7px 20px",
			display: "flex",
			flexDirection: "column"
		},
		post_title: {
			paddingBottom: theme.spacing(2),
			fontWeight: "bold"
		},
		post_desc: {
			flexGrow: 1
		},
		post_tag: {
			marginLeft: 3,
			marginRight: 3
		},
		pagination: {
			marginTop: theme.spacing(10),
			marginBottom: theme.spacing(10),
			"& > ul": {
				justifyContent: "center"
			}
		}
	}))();
}