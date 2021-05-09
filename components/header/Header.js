/**
 * 헤더 컴포넌트 클래스
 *
 * @author RWB
 * @since 2021.04.26 Mon 22:19:47
 */

// 라이브러리 모듈
import { AppBar, Box, Container, Hidden, makeStyles, Toolbar } from "@material-ui/core";

// 사용자 모듈
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

// 사용자 모듈
//import DesktopHeader from "./DesktopHeader";
//import MobileHeader from "./MobileHeader";

/**
 * 헤더 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function Header()
{
	const classes = getStyles();

	return (
		<Box component="header">
			<AppBar position="fixed" className={classes.root}>
				<Toolbar className={classes.bar}>
					<Container maxWidth="lg" className={classes.container}>
						<Hidden smDown>
							<DesktopHeader />
						</Hidden>

						<Hidden mdUp>
							<MobileHeader />
						</Hidden>
					</Container>
				</Toolbar>
			</AppBar>
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
		root: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "linear-gradient(to right, #000000CC, #434343CC);" : "linear-gradient(to right, #fc466bCC, #3f5efbCC)",
			zIndex: theme.zIndex.drawer + 1
		},
		bar: {
			minHeight: 64
		},
		container: {
			display: "flex"
		}
	}))();
}