/**
 * 마크다운 코드블럭 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 09:54:57
 */

'use client';

import Code from '@mui/icons-material/Code';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties, DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { PrismAsync } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './MarkdownCodeBlock.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownCodeBlockProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'ref' | 'style'>
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;

	/**
	 * 언어명
	 */
	languageName: string;
}

/**
 * 마크다운 코드블럭 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownCodeBlockProps} param0: MarkdownCodeBlockProps
 *
 * @return {JSX.Element} JSX
 */
export default function MarkdownCodeBlock({ theme, languageName, children, ...props }: MarkdownCodeBlockProps): JSX.Element
{
	const [ aniamteState, setAnimateState ] = useState(false);

	const bgcolor: CSSProperties['backgroundColor'] = useMemo(() => (theme === 'light' ? 'whitesmoke' : '#222222'), [ theme ]);
	const boxShadow: CSSProperties['boxShadow'] = useMemo(() => `3px 3px 20px ${theme === 'light' ? '#DDDDDD' : '#333333'}`, [ theme ]);
	const borderColor: CSSProperties['borderColor'] = useMemo(() => (theme === 'light' ? '#DDDDDD' : '#333333'), [ theme ]);
	const style: { [key: string]: CSSProperties; } | undefined = useMemo(() => (theme === 'light' ? oneLight : oneDark), [ theme ]);

	const code = useMemo(() => String(children).replace(/\n$/, ''), [ children ]);

	useEffect(() =>
	{
		// 애니메이션이 동작 중인 경우
		if (aniamteState)
		{
			setTimeout(() =>
			{
				setAnimateState(false);
			}, 2000);
		}
	}, [ aniamteState, setAnimateState ]);

	return (
		<Box data-component='MarkdownCodeBlock' padding={2} paddingBottom={4} paddingTop={4}>
			<Stack
				bgcolor={bgcolor}
				border='1px solid'
				borderColor={borderColor}
				borderRadius={2}
				boxShadow={boxShadow}
				overflow='hidden'
			>
				<Stack
					alignItems='center'
					borderBottom='1px solid'
					borderColor={borderColor}
					direction='row'
					justifyContent='space-between'
					padding='5px 20px'
				>
					<Stack alignItems='center' direction='row' spacing={1}>
						<Code />
						<Typography className='unselectable'>{languageName.toUpperCase()}</Typography>
					</Stack>

					<Stack alignItems='center' direction='row' spacing={1.5}>
						<Box
							bgcolor='springgreen'
							borderRadius='50%'
							boxShadow='0px 0px 5px springgreen'
							height={12}
							width={12}
						/>

						<Box
							bgcolor='orange'
							borderRadius='50%'
							boxShadow='0px 0px 5px orange'
							height={12}
							width={12}
						/>

						<Box
							bgcolor='crimson'
							borderRadius='50%'
							boxShadow='0px 0px 5px crimson'
							height={12}
							width={12}
						/>
					</Stack>
				</Stack>

				<Box className={cn('markdown')} position='relative'>
					<PrismAsync
						language={languageName}
						style={style}
						showLineNumbers
						{...props}
					>
						{code}
					</PrismAsync>
				</Box>
			</Stack>
		</Box>
	);
}