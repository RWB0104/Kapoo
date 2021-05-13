/**
 * Top 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.12 Wed 17:13:59
 */

import { Box, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";

export function Top({ title, desc, image })
{
	const classes = getStyles(image);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box className={classes.top_wrapper}>
			<Box className={classes.top_content}>
				<Typography variant={isMobile ? "h2" : "h1"} align="center">{title}</Typography>
				<Typography variant={isMobile ? "h6" : "h4"} align="center">{desc}</Typography>
			</Box>
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
	return makeStyles(() => ({
		top_wrapper: {
			display: "flex",
			height: "calc(100vh - 64px)",
			backgroundImage: `url(${image})`,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
			backgroundPosition: "center"
		},
		top_content: {
			width: "100%",
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
		}
	}))();
}