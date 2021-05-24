/**
 * Utterances 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.20 Thu 21:13:29
 */

// 라이브러리 모듈
import { useEffect } from "react";
import { Box, makeStyles, useTheme } from "@material-ui/core";

/**
 * Utterances 컴포넌트 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function Utterances()
{
	const classes = getStyles();

	const theme = useTheme();
	const type = theme.palette.type;

	useEffect(() =>
	{
		// 댓글 DOM이 없을 경우
		if (document.querySelectorAll("#utterances > div").length === 0)
		{
			const wrapper = document.createElement("div");

			const script = document.createElement("script");
			script.src = "https://utteranc.es/client.js";
			script.async = true,
			script.setAttribute("repo", "RWB0104/RWB0104.github.io-comments");
			script.setAttribute("issue-term", "pathname");
			script.setAttribute("theme", type === "dark" ? "github-dark" : "github-light");
			script.setAttribute("crossOrigin", "anonymous");

			wrapper.appendChild(script);
			document.getElementById("utterances").appendChild(wrapper);
		}

		// 댓글 DOM이 있을 경우
		else
		{
			document.querySelector("#utterances iframe")?.contentWindow.postMessage({ type: "set-theme", theme: type === "dark" ? "github-dark" : "github-light" }, "https://utteranc.es/");
		}
	});

	return <Box component="article" id="utterances" className={classes.utterances} />;
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		utterances: {
			marginTop: theme.spacing(10)
		}
	}))();
}