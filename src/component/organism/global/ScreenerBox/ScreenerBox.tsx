/**
 * 스크리너 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.07.23 Sun 23:34:08
 */

import { APP_INFO } from '@kapoo/env';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties, ReactNode } from 'react';

import styles from './ScreenerBox.module.scss';

const cn = classNames.bind(styles);

export interface ScreenerBoxProps
{
	/**
	 * 이름
	 */
	name: string;

	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 색상
	 */
	color?: CSSProperties['color'];
}

/**
 * 스크리너 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ScreenerBoxProps} param0: ScreenerBoxProps 객체
 *
 * @returns {ReactNode} JSX
 */
export default function ScreenerBox({ name, text, color = 'white' }: ScreenerBoxProps): ReactNode
{
	return (
		<Stack
			alignItems='center'
			data-component='ScreenerBox'
			height='100%'
			justifyContent='center'
			padding={4}
			position='relative'
			width='100%'
		>
			<Stack direction='row' spacing={3}>
				<Box bgcolor={color} boxShadow='5px 5px 5px black' width={5} />

				<Stack>
					<Typography className={cn('text')} color='white' fontWeight='bold'>{APP_INFO.title}</Typography>
					<Typography className={cn('text')} color={color}>{name}</Typography>
					<Typography className={cn('text')} color='white'>{text}</Typography>
				</Stack>
			</Stack>

			<Stack alignItems='center' bottom={50} position='absolute' spacing={2}>
				<Stack
					border='5px solid white'
					borderRadius={100}
					height={50}
					padding={1}
					position='relative'
					width={31}
				>
					<Box
						bgcolor='white'
						borderRadius={100}
						className={cn('icon')}
						height={10}
						position='absolute'
						width={5}
					/>
				</Stack>

				<Typography color='white'>D O W N</Typography>
			</Stack>
		</Stack>
	);
}