/**
 * 마크다운 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 14:19:36
 */

import { getMarkdownAllList } from '@kapoo/markdown-kit';
import Container from '@mui/material/Container';

import { getMarkdownDetailBySlug, markdownPath } from '../../common';
import MarkdownBox from '../../organism/MarkdownBox';
import ScreenPageTemplate, { ScreenPageTemplateProps } from '../ScreenPageTemplate';

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
	const markdown = getMarkdownAllList(markdownPath[type])
		.map(({ token }) =>
		{
			const slug = [ type, ...token ];
			return getMarkdownDetailBySlug(slug);
		})
		.filter(({ meta }) => meta.publish);

	return (
		<ScreenPageTemplate {...props}>
			<Container>
				<MarkdownBox markdown={markdown} />
			</Container>
		</ScreenPageTemplate>
	);
}