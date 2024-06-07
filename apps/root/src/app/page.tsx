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
import DevStackTemplate from '@kapoo/root-ui-pack/template/DevStackTemplate';
import IntroduceTemplate from '@kapoo/root-ui-pack/template/IntroduceTemplate';
import { IntroduceCareerCardProps } from '@kapoo/root-ui-pack/template/IntroduceTemplate/sub/IntroduceCareerCard';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import WelcomeTemplate from '@kapoo/root-ui-pack/template/WelcomeTemplate';
import Glow from '@kapoo/ui-pack/molecule/Glow';
import NameTag from '@kapoo/ui-pack/molecule/NameTag';
import TiltBox from '@kapoo/ui-pack/molecule/TiltBox';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { routers } from '../common';

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

const stackNames = [ 'TypeScript', 'React', 'Next.js', 'JAVA' ];

const careers: IntroduceCareerCardProps[] = [
	{
		content: [
			'Next.js를 활용한 프론트엔드 개발',
			'Nest.js를 활용한 BFF 백엔드 서버 개발',
			'소설 창작 플랫폼 "창작의날씨" 개발 및 유지보수'
		],
		icon: 'https://i.namu.wiki/i/qqcHBszynqQKPEP8isdydGXkYpPcu1iGtjKnW391xaq-8M_XwBW3WAvSZt8jCLFXRK5hm2JjEfdorw1nC2Bgog.svg',
		joinDate: 1704067200000,
		link: 'https://www.kyobobook.co.kr/',
		mainColor: '#4DAC27',
		name: '교보문고'
	},
	{
		content: [
			'Next.js를 활용한 프론트엔드 개발',
			'Nest.js를 활용한 BFF 백엔드 서버 개발',
			'GitHub Actions, Amplify를 활용한 CI/CD 파이프라인 구축',
			'lerna, nx를 활용한 프론트엔드 모노레포 프로젝트 구축',
			'PWA를 활용한 프로그레시브 웹앱 개발',
			'Storybook을 활용한 디자인 시스템 개발',
			'디자인 시스템 NPM 배포 및 관리 (@mint-ui)',
			'사내 상업용 부동산 데이터 관리를 위한 "RTB" 개발 및 유지보수',
			'해외 업무용 "RTB 글로벌" 개발 및 유지보수',
			'사무실 임대 솔루션 "R.Find" 개발 및 유지보수',
			'상업용 부동산 관련 IT 업무 수행'
		],
		icon: 'https://www.rsquare.co.kr/default/img/webbase/images/main/about/rsquare-symbols.png',
		joinDate: 1643673600000,
		link: 'https://www.rsquare.co.kr/',
		mainColor: '#C9252C',
		name: 'RSQUARE',
		outDate: 1704067200000
	},
	{
		content: [
			'JSP를 활용한 프론트엔드 개발',
			'JAVA Servlet를 활용한 백엔드 개발',
			'"모두의지도" 웹 및 안드로이드 앱 개발',
			'"uMap" 타일 지도 제작 업무 수행',
			'KAIS 도로명주소 GIS 엔진 유지보수',
			'서울시 도로점용관리 웹 시스템 개발 및 유지보수',
			'한양대 탄소저감관리 웹 시스템 개발',
			'GIS 관련 개발 및 연구 수행',
			'IntraMap GIS 엔진 활용'
		],
		icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6YgElARTbgWVFpMfMAo7W7qeUoFiIKzIpS8z5r53kCg&s',
		joinDate: 1551398400000,
		link: 'https://www.ksic.net/',
		mainColor: '#00509E',
		name: '(주)한국공간정보통신',
		outDate: 1635724800000
	}
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
					color={routers.home.color}
					subtitle={routers.home.subtitle}
					text={routers.home.title}
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		>
			<WelcomeTemplate list={greeting} />

			<Container>
				<Stack gap={16} marginTop={10}>
					<IntroduceTemplate
						careers={careers}
						image='https://user-images.githubusercontent.com/50317129/167695995-bb7080e0-dd19-455e-abdc-b16a0cafd98d.png'
						name='박성진'
						org={process.env.NEXT_PUBLIC_TITLE}
						skills={stacks.filter(({ name }) => stackNames.includes(name))}
					/>

					<TitleTemplate subtitle='현재 진행 중인 프로젝트의 목록입니다.' title='🚀 진행중인 프로젝트'>
						<Stack alignItems='center' gap={8}>
							<ProjectGrid list={recendProjects} mode='link' />

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

					<Stack alignItems='center' width='100%'>
						<Box boxShadow='0px 0px 10px #00000050' maxWidth={250} width='100%'>
							<Link href='https://blog.itcode.dev' target='_blank'>
								<TiltBox scale={1.1}>
									<NameTag
										color='white'
										colors={[ '#C1A2E6', '#74EBD5' ]}
										image='https://blog.itcode.dev/logo.png'
										title='𝝅번째 알파카의 개발 낙서장'
									>
										<Typography variant='caption'>이 카드를 클릭하고 블로그에서 다양한 개발 아티클을 확인해보세요!</Typography>
									</NameTag>

									<Glow />
								</TiltBox>
							</Link>
						</Box>
					</Stack>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}