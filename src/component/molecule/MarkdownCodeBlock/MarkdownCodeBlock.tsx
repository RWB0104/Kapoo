/**
 * 마크다운 코드 블럭 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:12:03
 */

import { themeStore } from '@kapoo/store/theme';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MouseEventHandler, ReactNode, useCallback, useMemo } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface MarkdownCodeBlockProps extends Omit<CodeProps, 'style'>
{
	/**
	 * 언어명
	 */
	languageName: string;
}

/**
 * 마크다운 코드 블럭 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownCodeBlockProps} param0: MarkdownCodeBlockProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownCodeBlock({ languageName, children, ...props }: MarkdownCodeBlockProps): ReactNode
{
	const { theme } = themeStore();

	const style = useMemo(() => (theme === 'light' ? oneLight : oneDark), [ theme ]);

	const code = useMemo(() => String(children).replace(/\n$/, ''), [ children ]);

	const handleCopyClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		navigator.clipboard.writeText(code);
	}, [ code ]);

	return (
		<Box data-component='MarkdownCode' padding={2}>
			<Stack bgcolor='whitesmoke' borderRadius={2} overflow='hidden'>
				<Stack alignItems='center' direction='row' justifyContent='space-between' padding={2}>
					<Typography>{languageName.toUpperCase()}</Typography>

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

				<Button onClick={handleCopyClick}>
					복사
				</Button>

				<Prism
					language={languageName}
					style={style}
					showLineNumbers
					useInlineStyles
					{...props}
				>
					{code}
				</Prism>
			</Stack>
		</Box>
	);
}