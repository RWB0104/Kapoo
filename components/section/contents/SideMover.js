/**
 * 사이드 컨텐츠 이동 컨트롤러 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.22 Sat 18:23:13
 */

// 라이브러리 모듈
import { useRouter } from "next/router";
import { Button, Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

/**
 * 사이드 컨텐츠 이동 컨트롤러 JSX 반환 함수
 *
 * @param {Object} page: 페이지 객체
 *
 * @returns {JSX} JSX 객체
 */
export default function SideMover({ page })
{
	const classes = getStyles();

	const router = useRouter();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid container spacing={4} justify="space-between">
			<Grid item xs={isMobile ? 6 : 4}>
				{page.prev !== -1 && <Button variant="outlined" color="primary" className={classes.button} fullWidth startIcon={<ArrowBack />} onClick={() => router.push(`/${page.type}/${page.prev.slug}`)}>{page.prev.title}</Button>}
			</Grid>

			<Grid item xs={isMobile ? 6 : 4}>
				{page.next !== -1 && <Button variant="outlined" color="primary" className={classes.button} fullWidth endIcon={<ArrowForward />} onClick={() => router.push(`/${page.type}/${page.next.slug}`)}>{page.next.title}</Button>}
			</Grid>
		</Grid>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles(() => ({
		button: {
			height: "100%"
		}
	}))();
}