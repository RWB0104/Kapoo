/**
 * 푸터 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.09 Sun 01:59:12
 */

import { Box, Container, Divider, Grid, IconButton, Link, makeStyles, SvgIcon, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { GitHub } from "@material-ui/icons";
import { getFormattedDate } from "../../common/common";
import { DESCRIPTION, TITLE } from "../../common/env";
import { Gmail, MaterialUI, React } from "../global/Icons";

export default function Footer()
{
	const classes = getStyles();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
				<Grid container spacing={5} className={classes.content}>
					<Grid item xs={12}>
						<Box display="flex" flexDirection="column" alignItems="center">
							<Typography variant="body1" className={classes.title}>Developed by RWB at 2021.</Typography>
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<Typography variant="h4" align="center" className={classes.title}>{TITLE}</Typography>

						<Box display="flex" flexDirection="column" justifyContent="center">
							<Typography variant="subtitle2" align={isMobile ? "center" : "left"}>
								🔗 <Link href="https://rwb0104.github.io/" className={classes.link}>https://rwb0104.github.io/</Link>
							</Typography>

							<Typography variant="subtitle1" align={isMobile ? "center" : "left"} className={classes.desc}>{DESCRIPTION}</Typography>
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<Typography variant="h4" align="center" className={classes.title}>Contact Me</Typography>

						<Box display="flex" justifyContent="center">
							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#EA4335", color: "white" }} onClick={() => window.location = "mailto:psj2716@gmail.com"}>
									<SvgIcon fontSize="large">
										<Gmail />
									</SvgIcon>
								</IconButton>

								<Typography className={classes.stack_typo} align="center">Mail</Typography>
							</Box>

							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#181717", color: "white" }} onClick={() => window.open("https://github.com/RWB0104", "_blank")}>
									<GitHub fontSize="large" />
								</IconButton>

								<Typography className={classes.stack_typo} align="center">Github</Typography>
							</Box>
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<Typography variant="h4" align="center" className={classes.title}>Associated</Typography>

						<Box display="flex" justifyContent="center">
							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#181717", color: "#61DAFB" }} onClick={() => window.open("https://ko.reactjs.org/", "_blank")}>
									<SvgIcon fontSize="large">
										<React />
									</SvgIcon>
								</IconButton>

								<Typography className={classes.stack_typo} align="center">with Develop</Typography>
							</Box>

							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#0081CB", color: "white" }} onClick={() => window.open("https://material-ui.com/", "_blank")}>
									<SvgIcon fontSize="large">
										<MaterialUI />
									</SvgIcon>
								</IconButton>

								<Typography className={classes.stack_typo} align="center">with Design</Typography>
							</Box>

							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton className={classes.stack_icon} style={{ backgroundColor: "#181717", color: "white" }} onClick={() => window.open("https://pages.github.com/", "_blank")}>
									<GitHub fontSize="large" />
								</IconButton>

								<Typography className={classes.stack_typo} align="center">with Publish</Typography>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" flexDirection="column" alignItems="center">
							<Typography variant="sub" className={classes.build_typo}>Build at {getFormattedDate(new Date())}</Typography>
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
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) => ({
		root: {
			marginTop: theme.spacing(20),
			paddingBottom: theme.spacing(10)
		},
		content: {
			marginTop: theme.spacing(10),
			"& > div": {
				marginBottom: theme.spacing(5)
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
			fontSize: "1.75rem",
			fontWeight: "bold"
		},
		desc: {
			color: theme.palette.type === "dark" ? "#CCCCCC" : "#555555",
			fontSize: "1rem"
		},
		link: {
			fontSize: "1rem"
		},
		stack_icon: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
			border: "3px solid white"
		},
		stack_typo: {
			margin: theme.spacing(1),
			color: theme.palette.type === "dark" ? "#CCCCCC" : "#555555",
			fontSize: "1rem"
		},
		build_typo: {
			fontFamily: "Hack, sans-serif",
			color: grey[500]
		}
	}))();
}