/**
 * 데스크탑 헤더 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Tue 00:47:40
 */

// 라이브러리 모듈
import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Fab, Fade, makeStyles, Typography } from "@material-ui/core";
import { blue, grey, orange, yellow } from "@material-ui/core/colors";
import { NightsStay, WbSunny } from "@material-ui/icons";
import { useRecoilState } from "recoil";

// 사용자 모듈
import { LOGO, MENU_LIST, TITLE } from "../../common/env";
import { darkAtom } from "../../common/states";

/**
 * 데스크탑 헤더 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function DesktopHeader()
{
	const router = useRouter();

	const path = `/${router.asPath.split("/")[1]}`;

	const classes = getStyles();

	const [ darkState, setDarkState ] = useRecoilState(darkAtom);

	return (
		<React.Fragment>
			<Avatar variant="square" alt={TITLE} src={LOGO} className={classes.logo} />

			<Typography variant="h4" className={classes.title}>{TITLE}</Typography>

			{MENU_LIST.map((element, index) => (<Button key={index} className={classes.menu} disabled={path === element.url} startIcon={element.icon} onClick={() => router.push(element.url)}>{element.title}</Button>))}

			<Fade in={!darkState} timeout={300} unmountOnExit>
				<Fab variant="extended" className={classes.fab_dark} onClick={() => setDarkState(true)}>
					<NightsStay />
					<Typography variant="button">다크 모드 활성화</Typography>
				</Fab>
			</Fade>

			<Fade in={darkState} timeout={300} unmountOnExit>
				<Fab variant="extended" className={classes.fab_bright} onClick={() => setDarkState(false)}>
					<WbSunny />
					<Typography variant="button">라이트 모드 활성화</Typography>
				</Fab>
			</Fade>
		</React.Fragment>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	const text = yellow["A700"];

	return makeStyles((theme) => ({
		logo: {
			marginRight: theme.spacing(2),
			height: 41,
			animation: "rotate 5s linear infinite",
			transformOrigin: "50% 50%"
		},
		title: {
			flexGrow: 1,
			fontWeight: "bold"
		},
		menu: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
			color: "white",
			"&:disabled": {
				color: text,
				fontWeight: "bold"
			}
		},
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
				color: orange[600],
				marginRight: theme.spacing(1)
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
				color: blue[600],
				marginRight: theme.spacing(1)
			}
		}
	}))();
}