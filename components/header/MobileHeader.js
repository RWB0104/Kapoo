/**
 * 모바일 헤더 JavaScript
 *
 * @author RWB
 * @since 2021.04.28 Wed 01:57:59
 */

// 라이브러리 모듈
import React from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { Menu, NightsStay, WbSunny } from "@material-ui/icons";
import { blue, orange } from "@material-ui/core/colors";
import { useRecoilState } from "recoil";

// 사용자 모듈
import { LOGO, MENU_LIST, TITLE } from "../../common/env";
import { darkAtom, menuAtom } from "../../common/states";

/**
 * 모바일 헤더 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function MobileHeader()
{
	const router = useRouter();

	const classes = getStyles();

	const [ darkState, setDarkState ] = useRecoilState(darkAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	return (
		<React.Fragment>
			{/*<IconButton className={classes.menu} onClick={() => setMenuState(!menuState)}>
				<Menu />
			</IconButton>

			<Drawer anchor="left" open={menuState} className={classes.drawer} onClose={() => setMenuState(false)}>
				<List>
					{
						MENU_LIST.map((element, index) => (
							<ListItem button key={index} disabled={router.pathname === element.url.pathname} onClick={() =>
							{
								router.push(element.url);
								setMenuState(false);
							}}>
								<ListItemIcon>{element.icon}</ListItemIcon>
								<ListItemText primary={element.title} />
							</ListItem>
						))
					}

					<Divider />

					<ListItem button className={classes.drawer_item} onClick={() => setDarkState(!darkState)}>
						<ListItemIcon>{darkState ? <WbSunny className={classes.fab_bright} /> : <NightsStay className={classes.fab_dark} />}</ListItemIcon>
						<ListItemText primary={darkState ? "라이트 모드 활성화" : "다크 모드 활성화"} />
					</ListItem>
				</List>
				</Drawer>*/}


			<Box className={classes.title_wrap}>
				<Typography variant="h6" className={classes.title}>{TITLE}</Typography>
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
		menu: {
			marginLeft: theme.spacing(-3),
			marginRight: theme.spacing(2),
			color: "white"
		},
		drawer: {
			marginTop: 64,
			"& > *": {
				marginTop: 64
			},
			"& > .MuiPaper-root": {
				backgroundColor: theme.palette.type === "dark" ? "#222222" : "#FFFFFF"
			}
		},
		drawer_item: {
			paddingRight: theme.spacing(10)
		},
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
			alignSelf: "center"
		},
		logo: {
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "center",
			marginRight: theme.spacing(-1),
			animation: "rotate 5s linear infinite",
			transformOrigin: "50% 50%"
		},
		fab_bright: {
			color: orange[600]
		},
		fab_dark: {
			color: blue[600]
		}
	}))();
}