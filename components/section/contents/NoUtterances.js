/**
 * 댓글 미사용 표시 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.23 Sun 19:10:57
 */

// 라이브러리 모듈
import { Grid, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { SpeakerNotesOff } from "@material-ui/icons";
import SemanticTypo from "../../global/SemanticTypo";

/**
 * 댓글 미사용 표시 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function NoUtterances()
{
	const classes = getStyles();

	return (
		<Grid container className={classes.grid}>
			<Grid item xs={12}>
				<SpeakerNotesOff className={classes.grid_icon} />
			</Grid>

			<Grid item xs={12}>
				<SemanticTypo up="h4" down="h6" className={classes.grid_typo}>댓글 서비스가 중지된 게시물입니다.</SemanticTypo>
			</Grid>
		</Grid>
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
		grid: {
			textAlign: "center"
		},
		grid_icon: {
			color: grey[500],
			width: 64,
			height: 64,
			marginTop: theme.spacing(10)
		},
		grid_typo: {
			color: grey[500],
			fontSize: "1.5em",
			marginTop: theme.spacing(2)
		}
	}))();
}