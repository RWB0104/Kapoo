/**
 * 프로젝트 리스트 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.10 Mon 01:25:36
 */

// 라이브러리 모듈
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";

/**
 * 프로젝트 리스트 JSX 반환 함수
 *
 * @returns {JSX} JSX 객체
 */
export default function ProjectList({ data })
{
	const router = useRouter();

	return (
		<Box>
			<Box>
				{data.map(element => <p>{element.slug}</p>)}
			</Box>

			<Box>
				<Pagination count={32} color="primary" siblingCount={1} boundaryCount={2} showFirstButton showLastButton onClick={(e) => console.dir(e.target.innerText)} />
			</Box>
		</Box>
	);
}