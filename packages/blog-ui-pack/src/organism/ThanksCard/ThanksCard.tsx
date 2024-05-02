/**
 * 감사 카드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.01 Wed 02:15:51
 */

import DotLottieIcon from '@kapoo/ui-pack/atom/DotLottieIcon/DotLottieIcon';
import TiltBox from '@kapoo/ui-pack/molecule/TiltBox';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * 감사 카드 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ThanksCard(): JSX.Element
{
	return (
		<TiltBox>
			<Stack
				alignItems='center'
				bgcolor='lemonchiffon'
				borderRadius={1}
				boxShadow='0px 0px 10px #00000030'
				component='div'
				data-component='ThanksCard'
				direction='row'
				gap={2}
				padding={2}
			>
				<DotLottieIcon iconName='love-message-burst' width={100} />

				<Stack>
					<Typography color='black' variant='h6' gutterBottom>읽어주셔서 고마워요!</Typography>
					<Typography color='black'>도움이 되셨다면, <Typography color='hotpink' component='span' fontWeight='bold'>공감</Typography>이나 <Typography color='dodgerblue' component='span' fontWeight='bold'>댓글</Typography>을 달아주시는 건 어떤가요?</Typography>
					<Typography color='black'>블로그 운영에 큰 힘이 됩니다.</Typography>
				</Stack>
			</Stack>
		</TiltBox>
	);
}