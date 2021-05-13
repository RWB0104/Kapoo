/**
 * 타이틀 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.13 Thu 10:56:20
 */

// 라이브러리 모듈
import Head from "next/head";
import { TITLE } from "../../common/env";

/**
 * 타이틀 JSX 반환 함수
 *
 * @param {String} title: 하위 타이틀
 *
 * @returns {JSX} JSX 객체
 */
export default function Title({ title })
{
	return (
		<Head>
			<title>{`${title} - ${TITLE}`}</title>
		</Head>
	);
}