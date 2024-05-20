import Img from '@kapoo/ui-pack/organism/Img';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export interface IntroduceTemplateProps
{
	image: string;

	org: string;

	name: string;
}

export default function IntroduceTemplate({ image, org, name }: IntroduceTemplateProps): JSX.Element
{
	return (
		<Stack alignItems='center'>
			<Box borderRadius='50%' boxShadow='0px 0px 30px #00000050' overflow='hidden'>
				<Img height='10rem' src={image} width='10rem' />
			</Box>

			<Typography color='gold'>{org}</Typography>
			<Typography sx={{ textShadow: '5px 5px 5px black' }}>{name}</Typography>
		</Stack>
	);
}