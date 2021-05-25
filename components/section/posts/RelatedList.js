/**
 * 연관 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.24 Mon 01:08:21
 */

import { Box, GridList, GridListTile, GridListTileBar, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";

/**
 * 연관 리스트 JSX 반환 함수
 *
 * @param {JSON[]} 컨텐츠 리스트
 *
 * @returns {JSX} JSX 객체
 */
export default function RelatedList({ list })
{
	const classes = getStyles();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const router = useRouter();

	return (
		<Box component="article">
			<Typography component="h1" className={classes.title}>◎ 연관 게시물</Typography>

			<Box className={classes.gridlist_wrapper}>
				<GridList cols={isMobile ? 1.5 : 2.5} className={classes.gridlist}>
					{list.map((element, index) => (
						<GridListTile key={index} className={classes.griditem} onClick={() => router.push(`/posts/${element.slug}`)}>
							<img src={element.coverImage} className={classes.img} />

							<GridListTileBar title={element.title} />
						</GridListTile>
					))}
				</GridList>
			</Box>
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
		title: {
			fontSize: "2em",
			fontWeight: "bold"
		},
		gridlist_wrapper: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3)
		},
		gridlist: {
			flexWrap: "nowrap",
			transform: "translateZ(0)",
			cursor: "pointer"
		},
		griditem: {
			"&:hover img": {
				transform: "translateY(-50%) scale(1.2)",
				transition: "0.5s"
			},
			"& .MuiGridListTileBar-title": {
				transition: "0.5s"
			},
			"&:hover .MuiGridListTileBar-title": {
				color: theme.palette.primary.light,
				transition: "0.5s"
			}
		},
		img: {
			transition: "0.5s"
		}
	}))();
}