/**
 * 모바일 헤더 JavaScript
 *
 * @author RWB
 * @since 2021.04.28 Wed 01:57:59
 */

// 라이브러리 모듈
import React from "react";
import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";

// 사용자 모듈
import { LOGO, TITLE } from "../../common/env";

/**
 * 모바일 헤더 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function MobileHeader()
{
	const classes = getStyles();

	return (
		<React.Fragment>
			<Box className={classes.title_wrap}>
				<Typography variant="h5" className={classes.title}>{TITLE}</Typography>
			</Box>

			<Avatar variant="square" alt={TITLE} src={LOGO} className={classes.logo} />
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
	return makeStyles((theme) => ({
		title_wrap: {
			display: "flex",
			flexGrow: 1
		},
		title: {
			flexGrow: 1,
			fontWeight: "bold",
			textAlign: "center",
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "center",
			paddingLeft: 40
		},
		logo: {
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "center",
			marginRight: theme.spacing(-1),
			animation: "rotate 5s linear infinite",
			transformOrigin: "50% 50%"
		}
	}))();
}