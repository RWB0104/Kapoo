/**
 * 게시글 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 12:34:25
 */

// 라이브러리 모듈
import { Box, Grid, Typography, Zoom } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";

/**
 * 게시글 리스트 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function PostList({ data })
{
	const router = useRouter();

	return (
		<Box>
			<Grid container spacing={8}>
				{data.map((element, index) => (
					<Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
						<Grid item xs={12}>
							<Grid container spacing={0}>
								<Grid item xs={5} style={{ height: "380px", backgroundImage: "url(https://d2skuhm0vrry40.cloudfront.net/2020/articles/2020-07-14-17-16/this-portal-2-level-completed-without-portals-is-outrageous-1594743396198.jpg/EG11/resize/1200x-1/this-portal-2-level-completed-without-portals-is-outrageous-1594743396198.jpg)" }} />

								<Grid item xs={7}>
									<Typography>{element.category}</Typography>
									<Typography>{element.title}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Zoom>
				))}

				<Grid item xs={12}>
					<p>???</p>
				</Grid>

				<Grid item xs={12}>
					<p>???</p>
				</Grid>

				<Grid item xs={12}>
					<p>???</p>
				</Grid>
			</Grid>

			<Box>
				<Pagination count={32} color="primary" siblingCount={1} boundaryCount={2} showFirstButton showLastButton onClick={(e) => console.dir(e.target.innerText)} />
			</Box>
		</Box>
	);
}