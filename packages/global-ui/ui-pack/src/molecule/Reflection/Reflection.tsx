/**
 * 반사 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.15 Wed 21:39:47
 */

import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import classNames from 'classnames/bind';

import styles from './Reflection.module.scss';

const cn = classNames.bind(styles);

/**
 * 반사 molecule 컴포넌트 반환 메서드
 *
 * @param {StackProps} param0: StackProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Reflection({ children, ...props }: StackProps): JSX.Element
{
	return (
		<Stack data-component='Reflection' {...props}>
			{children}

			<Box className={cn('reflect')} position='relative'>
				{children}

				<Box
					className={cn('glass')}
					height='100%'
					left={0}
					position='absolute'
					top={0}
					width='100%'
				/>
			</Box>
		</Stack>
	);
}