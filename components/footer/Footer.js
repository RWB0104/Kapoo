/**
 * 푸터 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 01:59:12
 */

import { Box, Container, Divider, Grid, IconButton, Link, makeStyles, SvgIcon, useMediaQuery, useTheme } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import { DESCRIPTION, TITLE } from "../../common/env";
import { Gmail, MaterialUI, React } from "../global/Icons";
import SemanticTypo from "../global/SemanticTypo";

/**
 * 푸터 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function Footer()
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const classes = getStyles(isMobile);

	return (
		<Box component="footer" className={classes.root}>
			<Box display="flex" alignItems="center" className={classes.divider}>
				<Box flexGrow={1}>
					<Divider />
				</Box>

				<Box>
					<img src="/assets/images/logo.png" width="84" className={classes.logo} />
				</Box>

				<Box flexGrow={1}>
					<Divider />
				</Box>
			</Box>

			<Container maxWidth="md">
				<Grid container spacing={3} className={classes.content}>
					<Grid item xs={12}>
						<Box display="flex" flexDirection="column" alignItems="center">
							<SemanticTypo up="h4" down="h5" className={classes.title}>Developed by RWB at 2021.</SemanticTypo>
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<SemanticTypo up="h4" down="h5" align="center" className={classes.title}>{TITLE}</SemanticTypo>

						<Box display="flex" flexDirection="column" justifyContent="center">
							<SemanticTypo up="subtitle2" down="caption1" align={isMobile ? "center" : "left"}>
								🔗 <Link href="https://rwb0104.github.io/" className={classes.link}>https://rwb0104.github.io/</Link>
							</SemanticTypo>

							<SemanticTypo up="subtitle2" down="caption1" align={isMobile ? "center" : "left"} className={classes.desc}>{DESCRIPTION}</SemanticTypo>
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<SemanticTypo up="h4" down="h5" align="center" className={classes.title}>Contact Me</SemanticTypo>

						<Box display="flex" justifyContent="center">
							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#EA4335", color: "white" }} onClick={() => window.location = "mailto:psj2716@gmail.com"}>
									<SvgIcon fontSize={isMobile ? "small" : "large"}>
										<Gmail />
									</SvgIcon>
								</IconButton>

								<SemanticTypo up="subtitle2" down="caption1" className={classes.stack_typo} align="center">Mail</SemanticTypo>
							</Box>

							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#181717", color: "white" }} onClick={() => window.open("https://github.com/RWB0104", "_blank")}>
									<GitHub fontSize={isMobile ? "small" : "large"} />
								</IconButton>

								<SemanticTypo up="subtitle2" down="caption1" className={classes.stack_typo} align="center">Github</SemanticTypo>
							</Box>
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<SemanticTypo up="h4" down="h5" align="center" className={classes.title}>Associated</SemanticTypo>

						<Box display="flex" justifyContent="center">
							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#181717", color: "#61DAFB" }} onClick={() => window.open("https://ko.reactjs.org/", "_blank")}>
									<SvgIcon fontSize={isMobile ? "small" : "large"}>
										<React />
									</SvgIcon>
								</IconButton>

								<SemanticTypo up="subtitle2" down="caption1" className={classes.stack_typo} align="center">with Develop</SemanticTypo>
							</Box>

							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#0081CB", color: "white" }} onClick={() => window.open("https://material-ui.com/", "_blank")}>
									<SvgIcon fontSize={isMobile ? "small" : "large"}>
										<MaterialUI />
									</SvgIcon>
								</IconButton>

								<SemanticTypo up="subtitle2" down="caption1" className={classes.stack_typo} align="center">with Design</SemanticTypo>
							</Box>

							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#181717", color: "white" }} onClick={() => window.open("https://pages.github.com/", "_blank")}>
									<GitHub fontSize={isMobile ? "small" : "large"} />
								</IconButton>

								<SemanticTypo up="subtitle2" down="caption1" className={classes.stack_typo} align="center">with Publish</SemanticTypo>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @param {boolean} isMobile: 모바일 여부
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles(isMobile)
{
	const flag = isMobile ? 4 : 1;

	return makeStyles((theme) => ({
		root: {
			marginTop: theme.spacing(20 / flag),
			paddingBottom: theme.spacing(10 / flag)
		},
		content: {
			marginTop: theme.spacing(10 / flag),
			"& > div": {
				marginBottom: theme.spacing(5 / flag)
			}
		},
		logo: {
			animation: "rotate 5s linear infinite",
			transformOrigin: "50% 50%"
		},
		title: {
			marginBottom: theme.spacing(3),
			color: theme.palette.type === "dark" ? "#CCCCCC" : "#555555",
			fontFamily: "Hack, sans-serif",
			fontWeight: "bold"
		},
		desc: {
			color: theme.palette.type === "dark" ? "#CCCCCC" : "#555555"
		},
		link: {
		},
		stack_icon: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
			border: "3px solid white"
		},
		stack_typo: {
			margin: theme.spacing(1),
			color: theme.palette.type === "dark" ? "#CCCCCC" : "#555555"
		}
	}))();
}