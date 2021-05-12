/**
 * Top 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.12 Wed 17:13:59
 */

import { Box, Hidden, makeStyles, Typography } from "@material-ui/core";

export function Top({ title, desc, image })
{
	const classes = getStyles(image);

	return (
		<Box className={classes.top_wrapper}>
			<Box className={classes.top_content}>
				<Hidden smDown>
					<Typography variant="h1" align="center">{title}</Typography>
					<Typography variant="h4" align="center">{desc}</Typography>
				</Hidden>

				<Hidden mdUp>
					<Typography variant="h2" align="center">{title}</Typography>
					<Typography variant="h6" align="center">{desc}</Typography>
				</Hidden>
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