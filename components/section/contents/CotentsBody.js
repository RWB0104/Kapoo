/**
 * 컨텐츠 내용 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.21 Fri 21:43:42
 */

// 라이브러리 모듈
import { makeStyles } from "@material-ui/core";
import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@material-ui/core/colors";

/**
 * 컨텐츠 내용 JSX 반환 함수
 *
 * @param {Object} contents: 컨텐츠
 *
 * @returns {JSX} JSX 객체
 */
export default function ContentsBody({ content })
{
	const classes = getStyles();

	return <div className={classes.markdown} dangerouslySetInnerHTML={{ __html: content.content }} />;
}

/**
 * 스타일 객체 반환 함수
 *
 * @returns {JSON} 스타일 객체
 */
function getStyles()
{
	return makeStyles((theme) =>
	{
		const colorRed = Object.entries(red).reduce((acc, element) =>
		{
			acc[`& .red-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorPink = Object.entries(pink).reduce((acc, element) =>
		{
			acc[`& .pink-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorPurple = Object.entries(purple).reduce((acc, element) =>
		{
			acc[`& .purple-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorDeepPurple = Object.entries(deepPurple).reduce((acc, element) =>
		{
			acc[`& .deepPurple-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorIndigo = Object.entries(indigo).reduce((acc, element) =>
		{
			acc[`& .indigo-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorBlue = Object.entries(blue).reduce((acc, element) =>
		{
			acc[`& .blue-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorLightBlue = Object.entries(lightBlue).reduce((acc, element) =>
		{
			acc[`& .lightBlue-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorCyan = Object.entries(cyan).reduce((acc, element) =>
		{
			acc[`& .cyan-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorTeal = Object.entries(teal).reduce((acc, element) =>
		{
			acc[`& .teal-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorGreen = Object.entries(green).reduce((acc, element) =>
		{
			acc[`& .green-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorLightGreen = Object.entries(lightGreen).reduce((acc, element) =>
		{
			acc[`& .lightGreen-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorLime = Object.entries(lime).reduce((acc, element) =>
		{
			acc[`& .lime-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorYellow = Object.entries(yellow).reduce((acc, element) =>
		{
			acc[`& .yellow-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorAmber = Object.entries(amber).reduce((acc, element) =>
		{
			acc[`& .amber-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorOrange = Object.entries(orange).reduce((acc, element) =>
		{
			acc[`& .orange-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorDeepOrange = Object.entries(deepOrange).reduce((acc, element) =>
		{
			acc[`& .deepOrange-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorBrown = Object.entries(brown).reduce((acc, element) =>
		{
			acc[`& .brown-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorGrey = Object.entries(grey).reduce((acc, element) =>
		{
			acc[`& .grey-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const colorBlueGrey = Object.entries(blueGrey).reduce((acc, element) =>
		{
			acc[`& .blueGrey-${element[0]}`] = {
				color: element[1]
			};

			return acc;
		}, {});

		const refColor = theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";

		return {
			markdown: {
				fontSize: "1.25rem",
				fontFamily: "Spoqa Han Sans, sans-serif",
				marginBottom: theme.spacing(20),
				lineHeight: 2,
				"& .center": {
					textAlign: "center"
				},
				"& .small": {
					fontSize: "1rem"
				},
				"& .large": {
					fontSize: "1.5rem"
				},
				"& .primary": {
					color: theme.palette.primary[theme.palette.type]
				},
				"& .secondary": {
					color: theme.palette.secondary[theme.palette.type]
				},
				"& .error": {
					color: theme.palette.error[theme.palette.type]
				},
				"& .warning": {
					color: theme.palette.warning[theme.palette.type]
				},
				"& .info": {
					color: theme.palette.warning[theme.palette.type]
				},
				"& .success": {
					color: theme.palette.warning[theme.palette.type]
				},
				...colorRed,
				...colorPink,
				...colorPurple,
				...colorDeepPurple,
				...colorIndigo,
				...colorBlue,
				...colorLightBlue,
				...colorCyan,
				...colorTeal,
				...colorGreen,
				...colorLightGreen,
				...colorLime,
				...colorYellow,
				...colorAmber,
				...colorOrange,
				...colorDeepOrange,
				...colorBrown,
				...colorGrey,
				...colorBlueGrey,
				"& .MuiDivider-root": {
					border: "none",
					height: 1,
					margin: 0,
					flexShrink: 0,
					backgroundColor: refColor
				},
				"& .remark-highlight": {
					"& *": {
						userSelect: "text",
						msUserSelect: "text",
						MozUserSelect: "text",
						WebkitUserSelect: "text"
					}
				},
				"& h1, & h2, & h3, & h4, & h5, & h6": {
					marginTop: theme.spacing(10)
				},
				"& h1, & h2, & h3": {
					borderBottom: `1px solid ${refColor}`
				},
				"& a": {
					color: lightBlue[400]
				},
				"& blockquote": {
					borderLeft: `4px solid ${orange[500]}`,
					backgroundColor: theme.palette.type === "dark" ? "#222" : "#EEE",
					marginTop: theme.spacing(8),
					marginBottom: theme.spacing(8),
					padding: "15px 25px",
					fontStyle: "italic",
					color: theme.palette.type === "dark" ? "#AAA" : "#555",
					"& > :first-child": {
						marginTop: 0
					},
					"& > :last-child": {
						marginBottom: 0
					}
				},
				"& img": {
					maxWidth: "100%",
					display: "block",
					margin: "0 auto"
				},
				"& p span": {
					display: "inline-block",
					wordBreak: "break-word"
				},
				"& strong": {
					wordBreak: "break-word"
				},
				"& table": {
					padding: 0,
					margin: "auto",
					marginTop: theme.spacing(7),
					marginBottom: theme.spacing(7),
					borderCollapse: "collapse",
					"& tr": {
						borderTop: `1px solid ${theme.palette.type === "dark" ? "#333333" : "#CCCCCC"}`,
						backgroundColor: "transparent",
						margin: 0,
						padding: 0
					},
					"& tr:nth-child(2n)": {
						backgroundColor: theme.palette.type === "dark" ? "#041733" : "whitesmoke"
					},
					"& tr th": {
						fontWeight: "bold",
						border: `1px solid ${theme.palette.type === "dark" ? "#333333" : "#CCCCCC"}`,
						margin: 0,
						padding: "6px 13px"
					},
					"& tr td": {
						border: `1px solid ${theme.palette.type === "dark" ? "#333333" : "#CCCCCC"}`,
						margin: 0,
						padding: "6px 13px"
					},
					"& tr th :first-child, & tr td :first-child": {
						marginTop: 0
					},
					"& tr th :last-child, & tr td :last-child": {
						marginBottom: 0
					}
				},
				"& code:not([class*='language-'])": {
					backgroundColor: indigo[700],
					color: "white",
					padding: 5,
					borderRadius: 5,
					fontFamily: "Hack, Spoqa Han Sans, monospace",
					fontSize: "0.75em",
					marginLeft: theme.spacing(1),
					marginRight: theme.spacing(1),
					userSelect: "text",
					msUserSelect: "text",
					MozUserSelect: "text",
					WebkitUserSelect: "text",
					wordBreak: "break-word"
				},
				"& code[class*='language-'], pre[class*='language-']": {
					color: "#ccc",
					background: "none",
					fontFamily: "Hack, Spoqa Han Sans, monospace",
					fontSize: 16,
					textAlign: "left",
					whiteSpace: "pre",
					wordSpacing: "normal",
					wordBreak: "normal",
					wordWrap: "normal",
					lineHeight: 1.5,
					tabSize: 4,
					MozTabSize: 4,
					hyphens: "none",
					msHyphens: "none",
					MozHyphens: "none",
					WebkitHyphens: "none"
				},
				"& pre[class*='language-']": {
					padding: "1em",
					margin: ".5em 0",
					overflow: "auto"
				},
				"& :not(pre) > code[class*='language-'], pre[class*='language-']": {
					background: "#020213",
					borderRadius: 10
				},
				"& :not(pre) > code[class*='language-']": {
					padding: ".1em",
					borderRadius: ".3em",
					whiteSpace: "normal"
				},
				"& .token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata": {
					color: "#00c800"
				},
				"& .token.punctuation": {
					color: "#ccc"
				},
				"& .token.tag, .token.attr-name, .token.namespace, .token.deleted": {
					color: "#e2777a"
				},
				"& .token.function-name": {
					color: "#6196cc"
				},
				"& .token.boolean, .token.number, .token.function": {
					color: "#f08d49"
				},
				"& .token.property, .token.class-name, .token.constant, .token.symbol": {
					color: "#f8c555"
				},
				"& .token.selector, .token.important, .token.atrule, .token.keyword, .token.builtin": {
					color: "#cc99cd"
				},
				"& .token.string, .token.char, .token.attr-value, .token.regex, .token.variable": {
					color: "#7ec699"
				},
				"& .token.operator, .token.entity, .token.url": {
					color: "#67cdcc"
				},
				"& .token.important, .token.bold": {
					fontWeight: "bold"
				},
				"& .token.italic": {
					fontStyle: "italic"
				},
				"& .token.entity": {
					cursor: "help"
				},
				"& .token.inserted": {
					color: "green"
				},
				"& a.head-link": {
					textDecoration: "none",
					marginRight: theme.spacing(1)
				}
			}
		};
	})();
}