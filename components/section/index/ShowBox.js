/**
 * 쇼박스 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.15 Sat 01:16:26
 */

// 라이브러리 모듈
import { Box, makeStyles } from "@material-ui/core";
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
			<Box component="article" className={classes.box_easter} style={{ backgroundImage: `url(${piece.images})` }}>
				<SemanticTypo up="h3" down="h5" align="center" className={classes.typo_title}>{piece.title}</SemanticTypo>
				<SemanticTypo up="h4" down="body1" align="center" className={classes.typo_desc}>{piece.author}</SemanticTypo>
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
			backgroundAttachment: "fixed",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundPosition: "center",
			textAlign: "center",
			height: "40vw",
			maxHeight: 1000,
			minHeight: 500,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center"
		},
		typo_title: {
			color: "white",
			fontFamily: "둘기마요, sans-serif",
			fontStyle: "italic",
			fontWeight: "bold"
		},
		typo_desc: {
			color: "white",
			fontFamily: "둘기마요, sans-serif",
			fontStyle: "italic"
		}
	}))();
}