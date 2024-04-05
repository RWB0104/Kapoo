/**
 * 마크다운 뷰어 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 03:53:53
 */

import classNames from 'classnames/bind';
import { ClassAttributes, HTMLAttributes, useCallback } from 'react';
import ReactMarkdown, { ExtraProps, Options } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import styles from './MarkdownViewer.module.scss';
import MarkdownA from './sub/MarkdownA';
import MarkdownBlockquote from './sub/MarkdownBlockquote';
import MarkdownHeading, { MarkdownHeadingLevel } from './sub/MarkdownHeading';

const cn = classNames.bind(styles);

type HeadingType = ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps;

/**
 * 마크다운 뷰어 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownViewerProps} param0: MarkdownViewerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownViewer({ className, ...props }: Options): JSX.Element
{
	const getHeadingTag = useCallback((props: HeadingType, level: MarkdownHeadingLevel) => <MarkdownHeading level={level} {...props} />, []);

	return (
		<ReactMarkdown
			className={cn('markdown', className)}
			data-component='MarkdownViewer'
			rehypePlugins={[[ rehypeKatex, { output: 'mathml' }], rehypeRaw ]}
			remarkPlugins={[ remarkGfm, remarkMath ]}
			components={{
				a: MarkdownA,
				blockquote: MarkdownBlockquote,
				h1: (props) => getHeadingTag(props, 1),
				h2: (props) => getHeadingTag(props, 2),
				h3: (props) => getHeadingTag(props, 3),
				h4: (props) => getHeadingTag(props, 4),
				h5: (props) => getHeadingTag(props, 5),
				h6: (props) => getHeadingTag(props, 6)
			}}
			{...props}
		/>
	);
}