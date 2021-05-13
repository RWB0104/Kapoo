/**
 * 하단 메뉴 JavaScript
 *
 * @author RWB
 * @since 2021.05.13 Thu 23:57:26
 */

// 라이브러리 모듈
import { BottomNavigation, BottomNavigationAction, Box, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

// 사용자 모듈
import { MENU_LIST } from "../../common/env";

export default function BottomMenu()
{
	const classes = getStyles();

	const router = useRouter();

	return (
		<BottomNavigation className={classes.nav} onChange={(e, item) => router.push(item)} showLabels>
			{MENU_LIST.map((element, index) => <BottomNavigationAction key={index} className={classes.nav_item} label={element.title} value={element.url} icon={element.icon} />)}
		</BottomNavigation>
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
		nav: {
			position: "sticky",
			bottom: 0,
			background: theme.palette.type === "dark" ? "linear-gradient(to right, #000000, #434343);" : "linear-gradient(to right, #fc466b, #3f5efb)"
		},
		nav_item: {
			color: "white"
		}
	}))();
}