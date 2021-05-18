/**
 * 레이아웃 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.08 Sat 14:42:08
 */

// 라이브러리 모듈
import { createMuiTheme, CssBaseline, MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { useRecoilValue } from "recoil";

// 사용자 모듈
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { darkAtom } from "../../common/states";
import BottomMenu from "../footer/BottomMenu";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect } from "react";
import { blue, indigo } from "@material-ui/core/colors";

/**
 * 레이아웃 JSX 반환 함수
 *
 * @param {JSX} children: 하위 JSX
 *
 * @returns {JSX} JSX 객체
 */
export default function Layout({ children })
{
	const darkState = useRecoilValue(darkAtom);

	const theme = getThemes(darkState);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() =>
	{
		document.addEventListener("contextmenu", (e) => e.preventDefault());
	});

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />

			<Header />

			{children}

			<Footer />

			<ThemeSwitch />

			{isMobile && <BottomMenu />}
		</MuiThemeProvider>
	);
}

/**
 * 테마 반환 함수
 *
 * @param {boolean} isDark: 다크 테마 적용 여부
 *
 * @returns {MuiTheme} MuiTheme 객체
 */
function getThemes(isDark)
{
	return createMuiTheme({
		palette: {
			type: isDark ? "dark" : "light",
			background: {
				default: isDark ? "#020d1d" : "#FFFFFF"
			},
			primary: blue,
			secondary: indigo
		},
		typography: {
			fontFamily: "Spoqa Han Sans, sans-serif"
		},
		overrides: {
			MuiCssBaseline: {
				"@global": {
					html: {
						WebkitFontSmoothing: "auto"
					},
					"*::-webkit-scrollbar, *::-webkit-scrollbar-thumb": {
						width: 13,
						borderRadius: 13,
						backgroundClip: "padding-box",
						border: "1px solid transparent"
					},
					"*::-webkit-scrollbar-thumb": {
						boxShadow: "inset 0 0 0 10px",
						color: isDark ? "#404040" : "#C0C0C0"
					}
				}
			}
		}
	});
}