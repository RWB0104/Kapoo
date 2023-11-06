/**
 * 뷰 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 21:13:22
 */

import ViewAdsTemplate from '@kapoo/template/view/ViewAdsTemplate';
import ViewCommentTemplate from '@kapoo/template/view/ViewCommentTemplate';
import ViewContentTemplate from '@kapoo/template/view/ViewContentTemplate';
import ViewControllTemplate from '@kapoo/template/view/ViewControllTemplate';
import ViewGroupTemplate from '@kapoo/template/view/ViewGroupTemplate';
import ViewScrennerTemplate from '@kapoo/template/view/ViewScrennerTemplate';
import ViewTagTemplate from '@kapoo/template/view/ViewTagTemplate/ViewTagTemplate';
import ViewTocTemplate from '@kapoo/template/view/ViewTocTemplate';
import { MarkdownProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export interface ViewTemplateProps
{
	/**
	 * 마크다운
	 */
	markdown: MarkdownProps;
}

/**
 * 뷰 template 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewTemplateProps} param0: ViewTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTemplate({ markdown }: ViewTemplateProps): ReactNode
{
	return (
		<Stack alignItems='center' data-component='ViewTemplate' spacing={10}>
			<ViewScrennerTemplate frontmatter={markdown.frontmatter} />
			<ViewGroupTemplate frontmatter={markdown.frontmatter} group={markdown.info?.group || null} link={markdown.url} />
			<ViewTocTemplate toc={markdown.toc} />
			<ViewContentTemplate content={markdown.content} />
			<ViewAdsTemplate />
			<ViewTagTemplate tag={markdown.frontmatter.tag} />
			<ViewControllTemplate next={markdown.info?.next || null} prev={markdown.info?.prev || null} type={markdown.frontmatter.type} />
			<ViewCommentTemplate comment={markdown.frontmatter.comment} type={markdown.frontmatter.type} url={markdown.url} />
		</Stack>
	);
}