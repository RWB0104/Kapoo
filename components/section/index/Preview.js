/**
 * 미리보기 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.15 Sat 02:11:13
 */

// 라이브러리 모듈
import { useRouter } from "next/router";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// 사용자 모듈
import PreviewList from "./PreviewList";
import SemanticTypo from "../../global/SemanticTypo";

/**
 * 미리보기 JSX 반환 함수
 *
 * @param {JSON} menu: 메뉴
 * @param {JSON[]} data: 데이터
 *
 * @returns {JSX} JSX 객체
 */
export default function Preview({ menu, data })
{
	const classes = getStyles();

	const router = useRouter();

	return (
		<Box component="article" className={classes.box}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<SemanticTypo up="h1" down="h2" align="center" className={classes.typo_title} gutterBottom>{menu.title}</SemanticTypo>
				</Grid>

				<PreviewList data={data} />

				<Grid item xs={12} className={classes.more_grid}>
					<Button className={classes.more} startIcon={<Add />} onClick={() => router.push(menu.url)}>M O R E</Button>
				</Grid>
			</Grid>
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
		box: {
			marginTop: theme.spacing(7),
			marginBottom: theme.spacing(7)
		},
		typo_title: {
			fontFamily: "Blacksword, sans-serif",
			fontWeight: "bold"
		},
		more_grid: {
			textAlign: "center"
		},
		more: {
			background: "linear-gradient(to right, #4776E6, #8E54E9)",
			color: "white",
			padding: "15px 30px",
			margin: "auto",
			marginTop: theme.spacing(10),
			marginBottom: theme.spacing(10),
			letterSpacing: 5
		}
	}))();
}