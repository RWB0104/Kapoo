/**
 * 게시글 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 12:34:25
 */

// 라이브러리 모듈
import { Avatar, Box, ButtonBase, Chip, Grid, Link, Typography, Zoom } from "@material-ui/core";
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
							<ButtonBase style={{ textAlign: "initial" }} onClick={() => alert(14234)}>
								<Grid container spacing={0}>
									<Grid item xs={4} style={{ height: "303.98px", backgroundImage: `url(${element.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />

									<Grid item xs={8} style={{ padding: 20, display: "flex", flexDirection: "column" }}>
										<Typography variant="h6" onClick={(e) => e.stopPropagation()}>
											📌<Link href="#">{element.category}</Link>
										</Typography>
										<Typography variant="h4">{element.title}</Typography>

										<Typography variant="body" style={{ flexGrow: 1 }}>{element.excerpt}</Typography>

										<Box>
											<Chip label="#WEB" style={{ marginLeft: 3, marginRight: 3 }} onClick={(e) => e.stopPropagation()} />
											<Chip label="#Security" style={{ marginLeft: 3, marginRight: 3 }} onClick={(e) => e.stopPropagation()} />
											<Chip label="#WAS" style={{ marginLeft: 3, marginRight: 3 }} onClick={(e) => e.stopPropagation()} />
											<Chip label="#JavaScript" style={{ marginLeft: 3, marginRight: 3 }} onClick={(e) => e.stopPropagation()} />
										</Box>
									</Grid>
								</Grid>
							</ButtonBase>
						</Grid>
					</Zoom>
				))}
			</Grid>

			<Box>
				<Pagination
					count={32}
					page={parseInt(router.query.page) || 1}
					defaultPage={1}
					color="primary"
					siblingCount={1}
					boundaryCount={2}
					showFirstButton
					showLastButton
					onChange={(e, page) => router.push({
						query: {
							...router.query,
							page: page
						}
					})} />
			</Box>
		</Box>
	);
}