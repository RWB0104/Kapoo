/**
 * 게시글 아이템 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.15 Sat 20:41:08
 */

// 라이브러리 모듈
import { Fade } from "react-reveal";
import { useRouter } from "next/router";
import { Box, ButtonBase, Chip, Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { LocalOffer } from "@material-ui/icons";

// 사용자 모듈
import SemanticTypo from "../../global/SemanticTypo";
import { slugRegex } from "../../../common/common";

/**
 * 게시글 아이템 JSX 반환 함수
 *
 * @param {JSON} item: 게시글 아이템
 * @param {int} index: 순번
 *
 * @returns {JSX} JSX 객체
 */
export default function PostItem({ item, index })
{
	const classes = getStyles(index, item.coverImage);

	const router = useRouter();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const slugs = slugRegex.exec(item.slug);

	return (
		<Grid component="article" item xs={12}>
			<Fade>
				<ButtonBase className={classes.post_button} onClick={() => router.push(`/posts/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}/`)}>
					<Grid container spacing={0}>
						<Grid className={classes.image_wrap, "wrapper"} item xs={4}>
							<Box className={classes.post_image} />
						</Grid>

						<Grid item xs={8} className={classes.post_content}>
							<Grid container direction="row" alignItems="center">
								<LocalOffer className={classes.post_category} />

								<SemanticTypo up="h6" down="body1" color="primary" className={classes.post_category_typo} onClick={(e) =>
								{
									e.stopPropagation();

									router.push({
										pathname: "/posts",
										query: {
											page: 1,
											category: e.target.innerText
										}
									});
								}}>
									{item.category}
								</SemanticTypo>
							</Grid>

							<SemanticTypo up="h4" down="h6" className={classes.post_title}>{item.title}</SemanticTypo>
							{!isMobile && <SemanticTypo up="caption" down="caption" className={classes.post_desc}>{item.excerpt}</SemanticTypo>}

							<Box>
								{item.tag?.map((sub, index) => <Chip key={index} variant="outlined" label={`# ${sub}`} className={classes.post_tag} onClick={(e) => e.stopPropagation()} />)}
							</Box>
						</Grid>
					</Grid>
				</ButtonBase>
			</Fade>
		</Grid>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @param {int} index: 순번
 * @param {String} url: 이미지 URL
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles(index, url)
{
	return makeStyles((theme) => ({
		zoom: {
			transitionDelay: `${index * 150}ms`
		},
		post_button: {
			textAlign: "initial",
			width: "100%",
			"& .wrapper": {
				overflow: "hidden"
			},
			"&:hover .wrapper > div": {
				transform: "scale(1.2)",
				transition: "0.5s"
			}
		},
		post_image: {
			height: "303.98px",
			backgroundImage: `url(${url})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			transform: "scale(1)",
			transition: "0.5s"
		},
		post_content: {
			padding: "7px 20px 7px 20px",
			display: "flex",
			flexDirection: "column"
		},
		post_category: {
			color: red[500],
			marginRight: 10
		},
		post_category_typo: {
			"&:hover": {
				textDecoration: "underline"
			}
		},
		post_title: {
			paddingBottom: theme.spacing(2),
			fontWeight: "bolder"
		},
		post_desc: {
			flexGrow: 1
		},
		post_tag: {
			margin: 3
		}
	}))();
}