/**
 * 뷰 컨트롤 버튼 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 02:00:16
 */

import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';

import styles from './ViewControllButton.module.scss';

const cn = classNames.bind(styles);

export type ViewControllButtonMode = 'prev' | 'next';

export interface ViewControllButtonProps extends ButtonBaseProps
{
	/**
	 * 모드
	 */
	mode: ViewControllButtonMode;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 커버
	 */
	cover: string;

	/**
	 * 링크
	 */
	link: string;
}

/**
 * 뷰 컨트롤 버튼 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewControllButtonProps} param0: ViewControllButtonProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewControllButton({ mode, title, cover, link, ...props }: ViewControllButtonProps): ReactNode
{
	const modeText = useMemo(() => (mode === 'prev' ? '이전 글' : '다음 글'), [ mode ]);

	return (
		<Link data-component='ViewControllButton' href={link}>
			<ButtonBase className={cn('button')} data-component='ViewControllButton' {...props}>
				<Box height='100%' padding={2} position='relative' width='100%'>
					<Stack
						alignItems='center'
						height='100%'
						justifyContent='center'
						minHeight={100}
						position='relative'
						spacing={1}
						width='100%'
						zIndex={2}
					>
						<Stack alignItems='center' direction='row' spacing={1}>
							{mode === 'prev' ? <ArrowBack /> : null}

							<Typography color='white' fontWeight='bold'>{modeText}</Typography>

							{mode === 'next' ? <ArrowForward /> : null}
						</Stack>

						<Typography className={cn('title')} color='white' variant='caption'>{title}</Typography>
					</Stack>

					<img alt={cover} className={cn('image')} height='100%' src={cover} width='100%' />

					<Box bgcolor='#00000099' height='100%' left={0} position='absolute' top={0} width='100%' />
				</Box>
			</ButtonBase>
		</Link>
	);
}