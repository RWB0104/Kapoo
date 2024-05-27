/**
 * 연구소 네임택 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.27 Mon 22:44:33
 */

import Glow from '@kapoo/ui-pack/molecule/Glow';
import NameTag from '@kapoo/ui-pack/molecule/NameTag';
import TiltBox from '@kapoo/ui-pack/molecule/TiltBox';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

/**
 * 연구소 네임택 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function LabNameTag(): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='LabNameTag' width='100%'>
			<Box boxShadow='0px 0px 10px #00000050' maxWidth={250} width='100%'>
				<Link href='https://itcode.dev' target='_blank'>
					<TiltBox scale={1.1}>
						<NameTag
							color='white'
							colors={[ '#833AB4', '#FD2B20', '#fCAA43' ]}
							image='https://itcode.dev/logo.png'
							title='𝝅번째 알파카의 개발 연구소'
						>
							<Typography variant='caption'>이 카드를 클릭하고 𝝅번째 알파카의 개발 연구소의 다양한 프로젝트를 확인해보세요!</Typography>
						</NameTag>

						<Glow />
					</TiltBox>
				</Link>
			</Box>
		</Stack>
	);
}