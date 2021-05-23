/**
 * 게시글 컴포넌트 JavaScript
 *
 * @author RWB
 * @since 2021.05.19 Wed 20:04:13
 */

// 라이브러리 모듈
import { useRouter } from "next/router";
import ErrorPage from "next/error";

// 사용자 모듈
import Title from "../../components/global/Title";
import Top from "../../components/global/Top";
import { getContentBySlug, getContents, markdownToHtml } from "../../common/api";
import { getFormattedDate } from "../../common/common";
import ContentsBody from "../../components/global/CotentsBody";

/**
 * 프로젝트 JSX 반환 함수
 *
 * @param {Object} project: 프로젝트
 *
 * @returns {JSX} JSX 객체
 */
export default function Project({ project })
{
	const router = useRouter();

	// 유효하지 않은 경로일 경우
	if (!router.isFallback && !project?.slug)
	{
		return <ErrorPage statusCode={404} />;
	}

	// 유효한 경로일 경우
	else
	{
		return (
			<>
				<Title title={project.title} />

				<Top title={project.title} desc={getFormattedDate(new Date(project.date))} category={project.category} image={project.coverImage} />

				<ContentsBody content={project} />
			</>
		);
	}
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps({ params })
{
	const project = getContentBySlug("projects", params.slug);

	const content = await markdownToHtml(project.content || "");

	return {
		props: {
			project: {
				...project,
				content
			}
		}
	};
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticPaths()
{
	const projects = getContents("projects");

	return {
		paths: projects.map(project =>
		{
			return {
				params: {
					slug: project.slug
				}
			};
		}),
		fallback: false
	};
}