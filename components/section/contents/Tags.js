/**
 * 태그 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.24 Mon 11:40:20
 */

// 라이브러리 모듈
import { Box, makeStyles, Typography } from "@material-ui/core";

export default function Tags({ list })
{
	const classes = getStyles();

	return (
		<Box component="article" className={classes.tag_wrapper}>
			{list.map((element, index) => <Typography component="sub" key={index} color="primary" className={classes.tag}>#{element}</Typography>)}
		</Box>
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
		tag_wrapper: {
			marginBottom: theme.spacing(5)
		},
		tag: {
			marginRight: theme.spacing(3)
		}
	}))();
}