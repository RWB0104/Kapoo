/**
 * 테마 스위치 JavaScript
 *
 * @author RWB
 * @since 2021.05.14 Fri 00:18:28
 */

// 라이브러리 모듈
import cookie from "react-cookies";
import { Box, Fab, Fade, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { blue, grey, orange } from "@material-ui/core/colors";
import { NightsStay, WbSunny } from "@material-ui/icons";
import { useRecoilState } from "recoil";

// 사용자 모듈
import { darkAtom } from "../../common/states";

/**
 * 테마 스위치 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function ThemeSwitch()
{
	const classes = getStyles();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [ darkState, setDarkState ] = useRecoilState(darkAtom);

	return (
		<>
			<Fade in={!darkState} timeout={300} unmountOnExit>
				{
					isMobile ? (
						<Fab className={classes.fab_dark} onClick={() => onClickSwitch(cookie, setDarkState, true)}>
							<NightsStay />
						</Fab>
					) : (
						<Fab variant="extended" className={classes.fab_dark} onClick={() => onClickSwitch(cookie, setDarkState, true)}>
							<NightsStay />
							<Typography variant="button">다크 모드 활성화</Typography>
						</Fab>
					)
				}

			</Fade>

			<Fade in={darkState} timeout={300} unmountOnExit>
				{
					isMobile ? (
						<Fab className={classes.fab_bright} onClick={() => onClickSwitch(cookie, setDarkState, false)}>
							<Box>
								<WbSunny />
							</Box>
						</Fab>
					) : (
						<Fab variant="extended" className={classes.fab_bright} onClick={() => onClickSwitch(cookie, setDarkState, false)}>
							<Box>
								<WbSunny />
							</Box>

							<Typography variant="button">라이트 모드 활성화</Typography>
						</Fab>
					)
				}
			</Fade>
		</>
	);
}

/**
 * 스위치 클릭 이벤트 함수
 *
 * @param {Object} cookie: 쿠키 객체
 * @param {Function} setDarkState: 다크 테마 상태 지정 함수
 * @param {boolean} flag: 다크 테마 사용 여부
 */
function onClickSwitch(cookie, setDarkState, flag)
{
	cookie.save("theme", flag, { path: "/" });
	setDarkState(flag);
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		fab_bright: {
			position: "fixed",
			bottom: 50,
			right: 50,
			backgroundColor: grey[800],
			color: grey[200],
			"&:hover": {
				backgroundColor: grey[700]
			},
			"& svg": {
				color: orange[600]
			},
			[theme.breakpoints.up("md")]: {
				"& span": {
					marginLeft: theme.spacing(1)
				}
			},
			[theme.breakpoints.down("sm")]: {
				bottom: 70,
				right: 20
			}
		},
		fab_dark: {
			position: "fixed",
			bottom: 50,
			right: 50,
			backgroundColor: grey[200],
			color: grey[900],
			"&:hover": {
				backgroundColor: grey[300]
			},
			"& svg": {
				color: blue[600]
			},
			[theme.breakpoints.up("md")]: {
				"& span": {
					marginLeft: theme.spacing(1)
				}
			},
			[theme.breakpoints.down("sm")]: {
				bottom: 70,
				right: 20
			}
		}
	}))();
}