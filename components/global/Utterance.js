/**
 * Utterance 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.20 Thu 21:13:29
 */

import { Box, useTheme } from "@material-ui/core";
import { useEffect } from "react";

export default function Utterance()
{
	const theme = useTheme();
	const type = theme.palette.type;

	useEffect(() =>
	{
		const script = document.createElement("script");
		script.src = "https://utteranc.es/client.js";
		script.async = true,
		script.setAttribute("repo", "RWB0104/RWB0104.github.io-comments");
		script.setAttribute("issue-term", "pathname");
		script.setAttribute("theme", type === "dark" ? "github-dark" : "github-light");
		script.setAttribute("crossOrigin", "anonymous");

		document.getElementById("test").appendChild(script);

		return (() =>
		{

		});
	});

	return (
		<Box component="article" id="test" />
	);
}