import PageTemplate from '@kapoo/template/global/PageTemplate';
import HomeScreenerTemplate from '@kapoo/template/home/HomeScreenerTemplate';

import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export default function HomePage(): ReactNode
{
	return (
		<PageTemplate>
			<HomeScreenerTemplate />
			<Typography>테스트</Typography>
		</PageTemplate>
	);
}