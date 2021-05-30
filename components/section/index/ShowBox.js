/**
 * 쇼박스 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.15 Sat 01:16:26
 */

// 라이브러리 모듈
import { Box, makeStyles } from "@material-ui/core";
import { isIOS } from "react-device-detect";
import { Fade } from "react-reveal";

// 사용자 모듈
import { getRandomItem } from "../../../common/common";
import { PIECE } from "../../../common/env";
import SemanticTypo from "../../global/SemanticTypo";

/**
 * 쇼박스 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function ShowBox()
{
	const classes = getStyles();

	const piece = getRandomItem(PIECE);

	return (
		<Fade>
			<Box component="article" position="relative" display="flex" flexDirection="column" justifyContent="center" className={classes.box_easter}>
				<Box position="absolute" className={classes.box_image_wrapper}>
					<Box position="fixed" display="block" className={classes.box_image} style={{ backgroundImage: `url(${piece.images})` }} />
				</Box>

				<Box display="flex" flexDirection="column" justifyContent="center" alignSelf="center" zIndex={10}>
					<SemanticTypo up="h3" down="h5" align="center" className={classes.typo_title}>{piece.title}</SemanticTypo>
					<SemanticTypo up="h4" down="body1" align="center" className={classes.typo_desc}>{piece.author}</SemanticTypo>
				</Box>
			</Box>
		</Fade>
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
		box_easter: {
			padding: theme.spacing(3),
			textAlign: "center",
			height: "40vmax",
			width: "100%",
			maxHeight: 1000,
			minHeight: 500
		},
		box_image_wrapper: {
			clip: "rect(0, auto, auto, 0)",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%"
		},
		box_image: {
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundAttachment: isIOS ? "scroll" : "fixed",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			WebkitBackgroundSize: "cover",
			OBackgroundSize: "cover",
			MozBackgroundSize: "cover"
		},
		typo_title: {
			color: "white",
			fontStyle: "italic",
			fontWeight: "bold"
		},
		typo_desc: {
			color: "white",
			fontStyle: "italic"
		}
	}))();
}