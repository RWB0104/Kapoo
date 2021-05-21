/**
 * 미리보기 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.15 Sat 02:11:13
 */

// 라이브러리 모듈
import { Box, Button, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useRouter } from "next/router";

// 사용자 모듈
import PreviewList from "./PreviewList";

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

	const theme = useTheme();
	const router = useRouter();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box component="article" className={classes.box}>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Typography variant={isMobile ? "h4" : "h2"} align="center" className={classes.typo_title} gutterBottom>{menu.title}</Typography>
				</Grid>

				<PreviewList type={menu.url.pathname} data={data} />

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
			letterSpacing: 5
		}
	}))();
}