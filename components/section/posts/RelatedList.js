/**
 * 연관 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.24 Mon 01:08:21
 */

import { Box, Link, Typography } from "@material-ui/core";

export default function RelatedList({ list })
{
	return (
		<Box>
			<Typography component="h1">연관 게시물</Typography>

			<ul>
				{list.map((element, index) => <li key={index}>{element.title}</li>)}
			</ul>
		</Box>
	);
}