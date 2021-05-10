/**
 * 프리뷰 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.07 Fri 01:16:26
 */

// 라이브러리 모듈
import React from "react";
import { ButtonBase, Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

export default function PreviewList({ type, data })
{
	const classes = getStyles();

	const router = useRouter();

	const list = [];

	for (let i = 0; i < 4; i++)
	{
		// 게시글이 없을 경우
		if (data[i] === undefined)
		{
			list.push(
				<Grid item md={6} key={i} className={classes.contents_grid}>
					<ButtonBase focusRipple disabled className={classes.contents} style={{ backgroundImage: "url(https://i.pinimg.com/originals/17/c4/a4/17c4a4f21be8344c713b69f7ca26f11c.gif)" }}>
						<Typography variant="h4" noWrap>o_O</Typography>
					</ButtonBase>
				</Grid>
			);
		}

		// 게시글이 있을 경우
		else
		{
			list.push(
				<Grid item md={6} key={i} className={classes.contents_grid}>
					<ButtonBase focusRipple className={classes.contents} style={{ backgroundImage: `url(${data[i].coverImage})` }} onClick={() => router.push(`/${type}/${data[i].slug}`)}>
						<Typography variant="h4" align="center" noWrap>{data[i].title}</Typography>
					</ButtonBase>
				</Grid>
			);
		}
	}

	return list;
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		contents_grid: {
			width: "100%"
		},
		contents: {
			width: "100%",
			minHeight: 400,
			padding: theme.spacing(5),
			color: "white",
			overflow: "hidden",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundPosition: "center",
			borderRadius: 20
		}
	}))();
}