/**
 * Top 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.12 Wed 17:13:59
 */

// 라이브러리 모듈
import { useEffect, useRef } from "react";
import { Flip } from "react-reveal";
import config from "react-reveal/globals";
import { Box, ButtonBase, Divider, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";

/**
 * Top 컴포넌트 JSX 반환 함수
 *
 * @param {String} title: 제목
 * @param {String} desc: 내용
 * @param {String} category: 카테고리
 * @param {boolean} onlyEng: 영문 전용 폰트 사용 여부
 * @param {String} image: 이미지 URL
 *
 * @returns {JSX} JSX 객체
 */
export default function Top({ title, desc, category, onlyEng, image })
{
	const classes = getStyles(image);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const ref = useRef(null);

	config({ ssrFadeOut: true });

	useEffect(() =>
	{
		document.getElementById("top").addEventListener("wheel", (e) =>
		{
			// 하단 스크롤일 경우
			if (e.deltaY > 0)
			{
				e.preventDefault();
				ref.current.scrollIntoView({ behavior: "smooth" });
			}
		});
	});

	return (
		<Box id="top" display="flex" flexDirection="column" className={classes.top_wrapper}>
			<Box display="flex" flexDirection="column" justifyContent="center" alignSelf="center" className={classes.top_content}>
				<Typography variant={isMobile ? "h5" : "h3"} align="center" className={classes.desc}>
					<Flip left cascade>{category && `[${category}]`}</Flip>
				</Typography>

				<Typography variant={isMobile ? "h3" : "h1"} align="center" className={onlyEng ? classes.title_eng : classes.title}>
					<Flip left cascade>{title}</Flip>
				</Typography>

				<Typography variant={isMobile ? "h6" : "h4"} align="center" className={classes.desc}>
					<Flip left cascade>{desc}</Flip>
				</Typography>
			</Box>

			<ButtonBase className={classes.down} onClick={() => ref.current.scrollIntoView({ behavior: "smooth" })}>
				<KeyboardArrowDown />
			</ButtonBase>

			<Divider ref={ref} className={classes.divider} />
		</Box>
	);
}

/**
 * 스타일 객체 반환 함수
 *
 * @param {String} image: 배경 이미지 URL
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles(image)
{
	return makeStyles((theme) => ({
		top_wrapper: {
			height: "calc(100vh - 64px)",
			backgroundImage: `url(${image})`,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
			backgroundPosition: "center",
			[theme.breakpoints.down("sm")]: {
				height: "calc(100vh - 112px)"
			}
		},
		top_content: {
			width: "100%",
			height: "100%",
			padding: 50
		},
		title: {
			color: "white",
			marginBottom: 60,
			fontFamily: "둘기마요, sans-serif",
			fontWeight: "bold"
		},
		title_eng: {
			color: "white",
			marginBottom: 60,
			fontFamily: "Blacksword, sans-serif",
			fontWeight: "bold"
		},
		desc: {
			color: "white",
			fontFamily: "둘기마요, sans-serif"
		},
		down: {
			width: "100%",
			color: "white",
			padding: 20,
			"& svg": {
				width: 50,
				height: 50
			},
			[theme.breakpoints.down("sm")]: {
				"& svg": {
					width: 30,
					height: 30
				}
			}
		},
		divider: {
			opacity: 0
		}
	}))();
}