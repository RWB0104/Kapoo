/**
 * 심볼릭 버튼 atom 컴포넌트
 *
 * @author RWB
 * @since 2024.04.19 Fri 17:00:55
 */

import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Stack, { StackProps } from '@mui/material/Stack';
import classNames from 'classnames/bind';

import styles from './SymbolicButton.module.scss';

const cn = classNames.bind(styles);

export interface SymbolicButtonProps extends ButtonBaseProps
{
	/**
	 * 배경색
	 */
	bgcolor?: StackProps['bgcolor'];

	/**
	 * 너비
	 */
	width?: StackProps['width'];

	/**
	 * 높이
	 */
	height?: StackProps['height'];

	/**
	 * 패딩
	 */
	padding?: StackProps['padding'];
}

/**
 * 심볼릭 버튼 atom 컴포넌트 반환 메서드
 *
 * @param {SymbolicButtonProps} param0: SymbolicButtonProps
 *
 * @returns {JSX.Element} JSX
 */
export default function SymbolicButton({ bgcolor, width = '100%', height = '100%', padding = 0.5, children, ...props }: SymbolicButtonProps): JSX.Element
{
	return (
		<ButtonBase className={cn('button')} data-component='SymbolicButton' {...props}>
			<Stack
				alignItems='center'
				bgcolor={bgcolor}
				borderRadius='50%'
				boxShadow='0px 0px 5px #00000050'
				height={height}
				justifyContent='center'
				padding={padding}
				width={width}
			>
				{children}
			</Stack>
		</ButtonBase>
	);
}