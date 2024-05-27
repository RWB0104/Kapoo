/**
 * 캐러셀 아이템 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.09 Thu 15:54:07
 */

import Box, { BoxProps } from '@mui/material/Box';

export default function CarouselItem({ ...props }: BoxProps): JSX.Element
{
	return (
		<Box bgcolor='#333' data-component='CarouselItem' flexShrink={0} height='100%' width='100%' {...props} />
	);
}