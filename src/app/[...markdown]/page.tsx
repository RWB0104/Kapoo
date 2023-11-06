/**
 * 마크다운 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 12:37:17
 */

import ViewProgress from '@kapoo/organism/view/ViewProgress';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import ViewTemplate from '@kapoo/template/view/ViewTemplate';
import { REGEX, getMetadata } from '@kapoo/util/common';
import { MarkdownType, POST_LIST, PROJECT_LIST, getMarkdown } from '@kapoo/util/markdown';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export interface MarkdownDynamicPageParams
{
	/**
	 * 마크다운
	 */
	markdown: string[];
}

export interface MarkdownDynamicPageProps
{
	/**
	 * 마크다운 페이지 파라미터
	 */
	params: MarkdownDynamicPageParams;
}

/**
 * 마크다운 페이지 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownDynamicPageProps} param0: MarkdownDynamicPageProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownDynamicPage({ params }: MarkdownDynamicPageProps): ReactNode
{
	const type: MarkdownType = params.markdown[0] === 'posts' ? 'posts' : 'projects';
	const filename = params.markdown.slice(1, 5).join('-');

	const markdown = getMarkdown(type, filename);

	return (
		<PageTemplate>
			<ViewProgress type={markdown.frontmatter.type} />
			<ViewTemplate markdown={markdown} />
		</PageTemplate>
	);
}

/**
 * SSG 파라미터 반환 비동기 메서드
 *
 * @returns {Promise} SSG 파라미터 Promise
 */
export async function generateStaticParams(): Promise<MarkdownDynamicPageParams[]>
{
	const list = [
		...POST_LIST,
		...PROJECT_LIST
	];

	return list.map(({ url }) => ({ markdown: url.split('/').slice(1) }));
}

/**
 * 메타데이터 반환 비동기 메서드
 *
 * @param {MarkdownDynamicPageProps} param0: MarkdownDynamicPageProps 객체
 *
 * @returns {Promise} 메타데이터 Promise
 */
export async function generateMetadata({ params }: MarkdownDynamicPageProps): Promise<Metadata>
{
	const type: MarkdownType = params.markdown[0] === 'posts' ? 'posts' : 'projects';
	const filename = params.markdown.slice(1, 5).join('-');

	// 올바른 마크다운 파일명이 아닐 경우
	if (!REGEX.markdownName.test(`${filename}.md`))
	{
		notFound();
	}

	const { frontmatter, url } = getMarkdown(type, filename);

	return getMetadata(frontmatter.title, frontmatter.excerpt, frontmatter.tag, url, frontmatter.coverImage);
}