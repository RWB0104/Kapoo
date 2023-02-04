/**
 * Lottie 아이콘 컴포넌트
 *
 * @author RWB
 * @since 2023.02.04 Sat 12:57:03
 */

import lottie from '@components/global/lottie';
import Lottie, { LottieComponentProps } from 'lottie-react';

export interface LottieIconProps extends Omit<LottieComponentProps, 'animationData'>
{
	icon: keyof typeof lottie;
}

/**
 * Lottie 아이콘 JSX 반환 함수
 *
 * @param {LottieIconProps} param0: LottieIconProps 객체
 *
 * @returns {JSX.Element} JSX
 */
export default function LottieIcon({ icon, ...props }: LottieIconProps): JSX.Element
{
	return (
		<Lottie animationData={lottie[icon]} {...props} />
	);
}