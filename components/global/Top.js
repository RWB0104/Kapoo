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
import { Box, ButtonBase, Divider, makeStyles } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import SemanticTypo from "./SemanticTypo";
import { isIOS } from "react-device-detect";

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
	const classes = getStyles(isIOS, image);

	const ref = useRef(null);

	config({ ssrFadeOut: true, display: "unset" });

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
		<Box id="top" position="relative" display="flex" flexDirection="column" className={classes.top_wrapper}>
			<Box position="absolute" className={classes.top_image_wrapper}>
				<Box className={classes.top_image} />
			</Box>

			<Box display="flex" flexDirection="column" justifyContent="center" alignSelf="center" className={classes.top_content}>
				<SemanticTypo up="h3" down="h5" align="center" className={classes.desc}>
					<Flip left cascade>{category && `[${category}]`}</Flip>
				</SemanticTypo>

				<SemanticTypo up="h1" down="h3" align="center" className={onlyEng ? classes.title_eng : classes.title}>
					<Flip left cascade>{title}</Flip>
				</SemanticTypo>

				<SemanticTypo up="h4" down="h6" align="center" className={classes.desc}>
					<Flip left cascade>{desc}</Flip>
				</SemanticTypo>
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
function getStyles(isIOS, image)
{
	return makeStyles((theme) => ({
		top_wrapper: {
			height: "calc(100vh - 64px)",
			width: "100%",
			[theme.breakpoints.down("sm")]: {
				height: "calc(100vh - 136px)"
			}
		},
		top_image_wrapper: {
			clip: "rect(0, auto, auto, 0)",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%"
		},
		top_image: {
			position: "fixed",
			display: "block",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundImage: `url(${image})`,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			backgroundBlendMode: "multiply",
			backgroundSize: "cover",
			backgroundAttachment: isIOS ? "scroll" : "fixed",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			WebkitBackgroundSize: "cover",
			OBackgroundSize: "cover",
			MozBackgroundSize: "cover"
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
			fontWeight: "bold",
			"& span": {
				display: isIOS ? "compact" : "inline-block"
			}
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