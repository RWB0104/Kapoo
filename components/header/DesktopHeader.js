/**
 * 데스크탑 헤더 JavaScript
 *
 * @author RWB
 * @since 2021.04.27 Tue 00:47:40
 */

// 라이브러리 모듈
import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

// 사용자 모듈
import { LOGO, MENU_LIST, TITLE } from "../../common/env";


/**
 * 데스크탑 헤더 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function DesktopHeader()
{
	const router = useRouter();

	const classes = getStyles();

	return (
		<React.Fragment>
			<Avatar variant="square" alt={TITLE} src={LOGO} className={classes.logo} />

			<Typography variant="h4" className={classes.title}>{TITLE}</Typography>

			{MENU_LIST.map((element, index) => (<Button key={index} className={classes.menu} disabled={`/${router.pathname.split("/")[1]}` === element.url.pathname} startIcon={element.icon} onClick={() => router.push(element.url)}>{element.title}</Button>))}
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
			fontWeight: "bold",
			fontFamily: "Blacksword, sans-serif"
		},
		menu: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
			color: "white",
			fontFamily: "나눔스퀘어라운드, sans-serif",
			"&:disabled": {
				color: text,
				fontWeight: "bold"
			}
		}
	}))();
}