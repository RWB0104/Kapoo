/**
 * 컨텐츠 없음 표시 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.25 Tue 20:53:17
 */

import { Grid, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { CloudOff } from "@material-ui/icons";
import SemanticTypo from "../../global/SemanticTypo";

/**
 * 컨텐츠 없음 표시 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function NoContents()
{
	const classes = getStyles();

	return (
		<Grid container className={classes.grid}>
			<Grid item xs={12}>
				<CloudOff className={classes.grid_icon} />
			</Grid>

			<Grid item xs={12}>
				<SemanticTypo up="h4" down="h6" className={classes.grid_typo}>컨텐츠가 존재하지 않습니다.</SemanticTypo>
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
			width: 128,
			height: 128,
			marginTop: theme.spacing(10)
		},
		grid_typo: {
			color: grey[500],
			marginTop: theme.spacing(2)
		}
	}))();
}