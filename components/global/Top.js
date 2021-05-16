/**
 * Top 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.12 Wed 17:13:59
 */

// 라이브러리 모듈
import { useEffect, useRef } from "react";
import { Flip } from "react-reveal";
import config from "react-reveal/globals";
import { Box, ButtonBase, Divider, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";

/**
 * Top 컴포넌트 JSX 반환 함수
 *
 * @param {String} title: 제목
 * @param {String} desc: 내용
 * @param {String} image: 이미지 URL
 *
 * @returns {JSX} JSX 객체
 */
export default function Top({ title, desc, image })
{
	const classes = getStyles(image);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const ref = useRef(null);

	config({ ssrFadeOut: true });

	useEffect(() =>
	{
		document.getElementById("top").addEventListener("wheel", (e) =>
		{
			if (e.deltaY > 0)
			{
				e.preventDefault();
				ref.current.scrollIntoView({ behavior: "smooth" });
			}
		});
	});

	return (
		<Box id="top" display="flex" className={classes.top_wrapper}>
			<Box display="flex" className={classes.top_content}>
				<Typography variant={isMobile ? "h2" : "h1"} align="center">
					<Flip left cascade>{title}</Flip>
				</Typography>

				<Typography variant={isMobile ? "h6" : "h4"} align="center">
					<Flip left cascade>{desc}</Flip>
				</Typography>
			</Box>

			<ButtonBase className={classes.down} onClick={() => ref.current.scrollIntoView({ behavior: "smooth" })}>
				<KeyboardArrowDown />
			</ButtonBase>

			<Divider ref={ref} className={classes.divider} />
		</Box>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @param {String} image: 배경 이미지 URL
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles(image)
{
	return makeStyles((theme) => ({
		top_wrapper: {
			flexDirection: "column",
			height: "calc(100vh - 64px)",
			backgroundImage: `url(${image})`,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
			backgroundPosition: "center",
			[theme.breakpoints.down("sm")]: {
				height: "calc(100vh - 112px)"
			}
		},
		top_content: {
			flexDirection: "column",
			width: "100%",
			height: "100%",
			padding: 50,
			justifyContent: "center",
			alignSelf: "center",
			"& h1, & h2": {
				color: "white",
				marginBottom: 60,
				fontWeight: "bold"
			},
			"& h4, & h6": {
				color: "white",
				fontWeight: "bold"
			}
		},
		down: {
			width: "100%",
			padding: 20,
			"& svg": {
				width: 50,
				height: 50
			},
			[theme.breakpoints.down("sm")]: {
				"& svg": {
					width: 30,
					height: 30
				}
			}
		},
		divider: {
			opacity: 0
		}
	}))();
}