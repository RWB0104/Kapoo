/**
 * 게시글 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 12:34:25
 */

// 라이브러리 모듈
import { Box, Grid, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete, Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";

// 사용자 모듈
import { MAX_CONTENT } from "../../../common/env";
import PostItem from "./PostItem";

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

	const row = data.filter(element => router.query.category === "All" ? true : element.category === router.query.category);

	const total = Math.max(Math.ceil(row.length / MAX_CONTENT), 1);
	const page = parseInt(router.query.page) || 1;

	const content = row.slice((page - 1) * MAX_CONTENT, page * MAX_CONTENT);

	return (
		<Box>
			<Grid container spacing={8}>
				{content.map((element, index) => <PostItem key={index} item={element} index={index} />)}
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
				}, undefined, { scroll: false })}
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
		pagination: {
			marginTop: theme.spacing(10),
			marginBottom: theme.spacing(10),
			"& > ul": {
				justifyContent: "center"
			}
		}
	}))();
}