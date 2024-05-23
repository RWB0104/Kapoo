/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:24:51
 */

import { DevStackCategory, getDevStack } from '@kapoo/api';
import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import { getMarkdownDetailList } from '@kapoo/markdown-kit';
import { MarkdownHeaderProps } from '@kapoo/root-ui-pack/common';
import ProjectGrid from '@kapoo/root-ui-pack/organism/ProjectGrid';
import Welcome from '@kapoo/root-ui-pack/organism/Welcome';
import DevStackTemplate from '@kapoo/root-ui-pack/template/DevStackTemplate';
import IntroduceTemplate from '@kapoo/root-ui-pack/template/IntroduceTemplate';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import Img from '@kapoo/ui-pack/organism/Img';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const greeting = [
	'반가워요!', // Korean
	'Nice to meet you!', // English
	'很高兴见到你!', // Chinese (Simplified)
	'はじめまして!', // Japanese
	'¡Mucho gusto!', // Spanish
	'Enchanté!', // French
	'Freut mich, Sie kennenzulernen!', // German
	'Приятно познакомиться!', // Russian
	'Piacere di conoscerti!', // Italian
	'Prazer em conhecê-lo!', // Portuguese
	'आप से मिलकर खुशी हुई!', // Hindi
	'تشرفت بمقابلتك!', // Arabic
	'Απόλαυση να σε γνωρίσω!', // Greek
	'Encantado de conocerte!', // Catalan
	'Senang bertemu denganmu!', // Indonesian
	'Sana tanıştığıma memnun oldum!', // Turkish
	"Të kënaqur për t'ju njohur!", // Albanian
	'שמח לפגוש אותך!', // Hebrew
	'Ravi de vous rencontrer!', // Quebec French
	'Hyvää tavata!', // Finnish
	'Trevligt att träffas!', // Swedish
	'Mă bucur să te cunosc!', // Romanian
	'Radost da te upoznam!', // Serbian
	'Es freut mich, dich kennenzulernen!', // Swiss German
	'Oikein mukava tavata!', // Finnish
	'Dobrze cię poznać!' // Polish
];

/**
 * 앱 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default async function AppPage(): Promise<JSX.Element>
{
	const categories: DevStackCategory[] = [ 'language', 'framework', 'server', 'database', 'etc' ];

	const recendProjects = getMarkdownDetailList<MarkdownHeaderProps>('src/markdown')
		.filter(({ meta }) => !meta.disabled && !meta.completed);

	const stacks = await getDevStack();

	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			template={(
				<PageScreenerTemplate
					color='gold'
					subtitle={process.env.NEXT_PUBLIC_DESCRIPTION}
					text='홈'
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		>
			<Stack marginTop={10} minHeight='300vh' position='relative'>
				<Box left={0} position='sticky' top={0}>
					<Box height='100%' left={0} position='absolute' top={0} width='100%'>
						<Img height='100%' src='https://i.pinimg.com/originals/c7/54/9d/c7549df773adf3f843383a067a353aae.jpg' width='100%' />
					</Box>

					<Welcome list={greeting} />
				</Box>
			</Stack>

			<Container>
				<Stack gap={16} marginTop={10}>

					<IntroduceTemplate image='/logo.png' name='박성진' org={process.env.NEXT_PUBLIC_TITLE} />

					<TitleTemplate subtitle='현재 진행 중인 프로젝트의 목록입니다.' title='🚀 진행중인 프로젝트'>
						<Stack alignItems='center' gap={8}>
							<ProjectGrid list={recendProjects} />

							<Link href='/projects'>
								<Button color='info' variant='outlined'>
									<Typography variant='h5'>🔍 프로젝트 전체보기</Typography>
								</Button>
							</Link>
						</Stack>
					</TitleTemplate>

					<TitleTemplate subtitle='실무, 프로젝트에서 활용한 개발스택의 목록입니다.' title='🖥️ 개발 스택'>
						<Stack gap={10}>
							{categories.map((i) => (
								<DevStackTemplate
									category={i}
									key={i}
									list={stacks.filter(({ category }) => category === i)}
								/>
							))}
						</Stack>
					</TitleTemplate>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}