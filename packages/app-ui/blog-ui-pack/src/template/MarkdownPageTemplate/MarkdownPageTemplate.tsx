/**
 * 마크다운 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 14:19:36
 */

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { getMarkdownDetailListForGrid, markdownPath } from '../../common';
import MarkdownBox from '../../organism/MarkdownBox';
import ScreenPageTemplate, { ScreenPageTemplateProps } from '../ScreenPageTemplate';
import TitleTemplate from '../TitleTemplate';

export interface MarkdownPageTemplateProps extends ScreenPageTemplateProps
{
	/**
	 * 경로
	 */
	type: keyof typeof markdownPath;
}

/**
 * 마크다운 페이지 template 컴포넌트 반환 메서드
 *
 * @param {MarkdownPageTemplateProps} param0: MarkdownPageTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownPageTemplate({ type, ...props }: MarkdownPageTemplateProps): JSX.Element
{
	const markdown = getMarkdownDetailListForGrid(type)
		.filter(({ meta }) => meta.publish);

	const title = type === 'posts' ? '📚 게시글' : '💻 프로젝트';
	const subtitle = type === 'posts' ? '개발과 관련된 다양한 내용을 다룬 글들의 목록입니다.' : '직접 개발한 프로젝트에 대한 내용을 다룬 글들의 목록입니다.';

	return (
		<ScreenPageTemplate {...props}>
			<Container>
				<Stack marginTop={10}>
					<TitleTemplate subtitle={subtitle} title={title}>
						<MarkdownBox markdown={markdown} />
					</TitleTemplate>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}