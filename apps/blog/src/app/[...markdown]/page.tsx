import { getMarkdownAllList } from '@kapoo/markdown-kit';

import { markdownPath } from '../../common/variables';

interface DynamicPageProps
{
	/**
	 * 페이지
	 */
	markdown: string;
}

export default function MarkdownPage(): JSX.Element
{
	return (
		<p>df</p>
	);
}

export async function generateStaticParams(): Promise<DynamicPageProps[]>
{
	const postsList = getMarkdownAllList(markdownPath.post, [ 'posts' ]);
	const projectsList = getMarkdownAllList(markdownPath.project, [ 'projects' ]);

	const totalList = postsList.concat(projectsList);

	console.log(totalList.map<DynamicPageProps>(({ params, token }) => ({ markdown: [ ...params, ...token ].join('/') })));

	return totalList.map<DynamicPageProps>(({ params, token }) => ({ markdown: [ ...params, ...token ].join('/') }));
}