/**
 * 마크다운 코드 블럭 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:12:03
 */

import { ubuntuMono } from '@kapoo/organism/global/AppThemeProvider';
import { themeStore } from '@kapoo/store/theme';
import { toastState } from '@kapoo/store/toast';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import Check from '@mui/icons-material/Check';
import Code from '@mui/icons-material/Code';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { SvgIconTypeMap } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, MouseEventHandler, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './MarkdownCodeBlock.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownCodeBlockProps extends Omit<CodeProps, 'style'>
{
	/**
	 * 언어명
	 */
	languageName: string;
}

/**
 * 마크다운 코드 블럭 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownCodeBlockProps} param0: MarkdownCodeBlockProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownCodeBlock({ languageName, children, ...props }: MarkdownCodeBlockProps): ReactNode
{
	const { theme } = themeStore();
	const { setToast } = toastState();

	const [ aniamteState, setAnimateState ] = useState(false);

	const bgcolor: CSSProperties['backgroundColor'] = useMemo(() => (theme === 'light' ? 'whitesmoke' : '#222222'), [ theme ]);
	const boxShadow: CSSProperties['boxShadow'] = useMemo(() => `3px 3px 20px ${theme === 'light' ? '#DDDDDD' : '#333333'}`, [ theme ]);
	const borderColor: CSSProperties['borderColor'] = useMemo(() => (theme === 'light' ? '#DDDDDD' : '#333333'), [ theme ]);
	const style = useMemo(() => (theme === 'light' ? oneLight : oneDark), [ theme ]);

	const code = useMemo(() => String(children).replace(/\n$/, ''), [ children ]);

	const getIcon = useCallback((Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>, key: string) => (
		<motion.div
			animate='animate'
			className={cn('wrap')}
			exit='initial'
			initial='initial'
			key={key}
			transition={{ duration: 0.3 }}
			variants={{
				animate: {
					opacity: 1,
					scale: 1
				},
				initial: {
					opacity: 0,
					scale: 0
				}
			}}
		>
			<Icon className={cn('icon')} />
		</motion.div>
	), []);

	const handleCopyClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		// 애니메이션이 동작 중이지 않을 경우
		if (!aniamteState)
		{
			navigator.clipboard.writeText(code);

			setAnimateState(true);
			setToast({
				severity: 'success',
				title: 'Copy Done!'
			});
		}
	}, [ code, aniamteState, setAnimateState, setToast ]);

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
		<Box data-component='MarkdownCode' padding={2}>
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
						<Typography className='unselectable' fontFamily={ubuntuMono.style.fontFamily}>{languageName.toUpperCase()}</Typography>
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
					<Tooltip title='Copy to Clipboard!' arrow>
						<Button
							className={cn('button')}
							color={aniamteState ? 'success' : undefined}
							size='small'
							variant='outlined'
							onClick={handleCopyClick}
						>
							<AnimatePresence>
								{aniamteState ? getIcon(Check, 'Check') : getIcon(ContentCopy, 'ContentCopy')}
							</AnimatePresence>
						</Button>
					</Tooltip>

					<Prism
						customStyle={{ fontFamily: ubuntuMono.style.fontFamily }}
						language={languageName}
						style={style}
						showLineNumbers
						useInlineStyles
						{...props}
					>
						{code}
					</Prism>
				</Box>
			</Stack>
		</Box>
	);
}