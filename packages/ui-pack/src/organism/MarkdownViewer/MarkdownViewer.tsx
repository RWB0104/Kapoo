/**
 * 마크다운 뷰어 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 03:53:53
 */

'use client';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { BlockquoteHTMLAttributes, ClassAttributes, HTMLAttributes, ImgHTMLAttributes, ThHTMLAttributes, useCallback, useMemo, useState } from 'react';
import ReactMarkdown, { Components, ExtraProps, Options } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import styles from './MarkdownViewer.module.scss';
import MarkdownA from './sub/MarkdownA';
import MarkdownBlockquote from './sub/MarkdownBlockquote';
import MarkdownCodeBlock from './sub/MarkdownCodeBlock';
import MarkdownCodeInline from './sub/MarkdownCodeInline';
import MarkdownHeading, { MarkdownHeadingLevel } from './sub/MarkdownHeading';
import MarkdownImg from './sub/MarkdownImg';
import MarkdownTable from './sub/MarkdownTable';
import MarkdownTd from './sub/MarkdownTd';
import MarkdownTh from './sub/MarkdownTh';
import MarkdownTr from './sub/MarkdownTr';

import ImageModal from '../ImageModal';

const cn = classNames.bind(styles);

type BlockquoteType = ClassAttributes<HTMLQuoteElement> & BlockquoteHTMLAttributes<HTMLQuoteElement> & ExtraProps;
type CodeType = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps;
type ImgType = ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement> & ExtraProps;
type HeadingType = ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps;
type ThType = ClassAttributes<HTMLElement> & ThHTMLAttributes<HTMLElement> & ExtraProps;
type TrType = ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement> & ExtraProps;

export type MarkdownViewerProps = Options

/**
 * 마크다운 뷰어 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownViewerProps} param0: MarkdownViewerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownViewer({ className, ...props }: MarkdownViewerProps): JSX.Element
{
	const [ imageState, setImageState ] = useState<string>();

	const { palette: { mode: theme } } = useTheme();

	const components = useMemo<Partial<Components>>(() =>
	{
		const getBlockquote = (props: BlockquoteType): JSX.Element => <MarkdownBlockquote theme={theme} {...props} />;
		const getCode = (props: CodeType): JSX.Element =>
		{
			const regex = /^(language-)(.*?)$/.exec(props.className || '');

			// 정규식이 일치할 경우
			if (regex && regex[2])
			{
				return <MarkdownCodeBlock languageName={regex[2]} theme={theme} {...props} />;
			}

			return <MarkdownCodeInline theme={theme} {...props} />;
		};
		const getHeading = (props: HeadingType, level: MarkdownHeadingLevel): JSX.Element => <MarkdownHeading level={level} {...props} />;
		const getImg = (props: ImgType): JSX.Element => <MarkdownImg theme={theme} onImageClick={() => setImageState(props.src)} {...props} />;
		const getTh = (props: ThType): JSX.Element => <MarkdownTh theme={theme} {...props} />;
		const getTr = (props: TrType): JSX.Element => <MarkdownTr theme={theme} {...props} />;

		return {
			a: MarkdownA,
			blockquote: (props) => getBlockquote(props),
			code: (props) => getCode(props),
			h1: (props) => getHeading(props, 1),
			h2: (props) => getHeading(props, 2),
			h3: (props) => getHeading(props, 3),
			h4: (props) => getHeading(props, 4),
			h5: (props) => getHeading(props, 5),
			h6: (props) => getHeading(props, 6),
			img: (props) => getImg(props),
			table: MarkdownTable,
			td: MarkdownTd,
			th: (props) => getTh(props),
			tr: (props) => getTr(props)
		};
	}, [ theme ]);

	const handleClose = useCallback(() =>
	{
		setImageState(undefined);
	}, []);

	return (
		<Box data-component='MarkdownViewer'>
			<ReactMarkdown
				className={cn('markdown', className)}
				components={components}
				rehypePlugins={[[ rehypeKatex, { output: 'mathml' }], rehypeRaw ]}
				remarkPlugins={[ remarkGfm, remarkMath ]}
				{...props}
			/>

			<ImageModal open={imageState !== undefined} src={imageState} onClose={handleClose} />
		</Box>
	);
}