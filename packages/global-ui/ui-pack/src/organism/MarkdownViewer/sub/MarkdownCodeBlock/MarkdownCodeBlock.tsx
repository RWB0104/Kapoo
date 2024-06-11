/**
 * 마크다운 코드블럭 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 09:54:57
 */

'use client';

import { colors, doCopy, ubuntuMono } from '@kapoo/common';
import Check from '@mui/icons-material/Check';
import Code from '@mui/icons-material/Code';
import CopyAll from '@mui/icons-material/CopyAll';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import LinkIcon from '@mui/icons-material/Link';
import { PaletteMode, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties, DetailedHTMLProps, HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { PrismAsync } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { toast } from 'react-toastify';

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
	const [ delayState, setDelayState ] = useState(false);

	const bgcolor: CSSProperties['backgroundColor'] = useMemo(() => (theme === 'light' ? 'whitesmoke' : '#222222'), [ theme ]);
	const borderColor: CSSProperties['borderColor'] = useMemo(() => (theme === 'light' ? '#DDDDDD' : '#333333'), [ theme ]);
	const style: { [key: string]: CSSProperties; } | undefined = useMemo(() => (theme === 'light' ? oneLight : oneDark), [ theme ]);

	const { palette: { success } } = useTheme();

	const code = useMemo(() => String(children).replace(/\n$/, ''), [ children ]);

	const handleCopyClick = useCallback(() =>
	{
		// 동작 가능할 경우
		if (!delayState)
		{
			doCopy(code, () =>
			{
				setDelayState(true);

				toast(`${languageName} 코드 복사 완료`, { icon: <LinkIcon htmlColor='dodgerblue' /> });

				setTimeout(() => setDelayState(false), 1000);
			}, () =>
			{
				toast(`${languageName} 코드 복사 실패`, {
					icon: <ErrorOutline htmlColor='crimson' />,
					type: 'error'
				});
			});
		}
	}, [ delayState, languageName, code ]);

	return (
		<Box className={cn('code')} data-component='MarkdownCodeBlock' fontFamily={[ ubuntuMono.style.fontFamily ]} paddingBottom={4} paddingTop={4}>
			<Stack
				bgcolor={bgcolor}
				border='1px solid'
				borderColor={borderColor}
				borderRadius={2}
				boxShadow={`0px 0px 10px ${colors.shadow.default}`}
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

				<Box position='relative'>
					<Box
						bgcolor={bgcolor}
						border='1px solid'
						borderColor={delayState ? success.main : borderColor}
						borderRadius={1}
						boxShadow='0px 0px 4px #00000030'
						className={cn('copy-button')}
						position='absolute'
						right={10}
						top={10}
					>
						<ButtonBase
							className={cn('copy-button-base')}
							disabled={delayState}
							onClick={handleCopyClick}
						>
							<Stack
								alignItems='center'
								className={cn('icon', { active: delayState })}
								height='100%'
								justifyContent='center'
								left={0}
								position='absolute'
								top={0}
								width='100%'
							>
								<Check color='success' fontSize='inherit' />
							</Stack>

							<Stack
								alignItems='center'
								className={cn('icon', { active: !delayState })}
								height='100%'
								justifyContent='center'
								left={0}
								position='absolute'
								top={0}
								width='100%'
							>
								<CopyAll fontSize='inherit' />
							</Stack>
						</ButtonBase>
					</Box>

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