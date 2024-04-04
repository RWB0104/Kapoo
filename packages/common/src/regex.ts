/**
 * 정규식 모듈
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:46:04
 */

export const markdownRegex = {
	codeBlock: /```[^]*?```/gim,
	fullname: /^(.*?).md$/,
	heading: /^(#{1,6}) (.+)$/gm,
	nameToken: /(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*).md/
};