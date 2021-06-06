/**
 * 반응성 타이포그래피 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.27 Thu 10:45:44
 */

// 라이브러리 모듈
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";

/**
 * 반응성 타이포그래피 JSX 반환 함수
 *
 * @param {Object} props: props 객체
 *
 * @returns {JSX} JSX 객체
 */
export default function SemanticTypo(props)
{
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return <Typography variant={isMobile ? props.down : props.up} {...props}>{props.children}</Typography>;
}