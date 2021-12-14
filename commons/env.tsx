/**
 * 환경변수 모듈
 *
 * @author RWB
 * @since 2021.07.11 Sun 15:12:27
 */

// 라이브러리 모듈
import { Apps, Home, Info, Stars } from '@material-ui/icons';

interface CategoryProps {
	[ key: string ]: string
}

export const DOMAIN = 'blog.itcode.dev';
export const BASE_URL = `https://${DOMAIN}`;

export const TITLE = '𝝅번째 알파카의 개발 낙서장';
export const DESCRIPTION = '𝝅번째 알파카의 우당탕탕 개발 기록';
export const LOGO = '/img/logo.png';

export const MENU_LIST = [
	{
		id: 1,
		title: 'Welcome',
		desc: DESCRIPTION,
		url: { pathname: '/' },
		icon: <Home />
	},
	{
		id: 2,
		title: 'Posts',
		desc: '무언가 끄적끄적 쓰는 중...',
		url: { pathname: '/posts' },
		icon: <Apps />
	},
	{
		id: 3,
		title: 'Projects',
		desc: '무언가 뚝딱뚝딱 하는 중...',
		url: { pathname: '/projects' },
		icon: <Stars />
	},
	{
		id: 4,
		title: 'About',
		desc: '나름 멋들어진 자기소개를 준비하는 중...',
		url: { pathname: '/about' },
		icon: <Info />
	}
];

export const CATEGORY = {
	'All': 'https://user-images.githubusercontent.com/50317129/132937376-276bf532-841b-4f80-9ba7-d05063ee6e92.png',
	'CS': 'https://user-images.githubusercontent.com/50317129/132937772-73a6364f-c66c-4fc5-85da-60a0db1c58a1.png',
	'JAVA': 'https://user-images.githubusercontent.com/50317129/132937204-99bf52ed-2cea-4530-ad5b-1cc421ebcc94.png',
	'Jekyll': 'https://user-images.githubusercontent.com/50317129/132937228-0041b311-0d6e-4dea-a4b3-150232cc77fb.png',
	'NextJS': 'https://user-images.githubusercontent.com/50317129/146045656-caf9e4c0-0ff6-455b-b667-d1c6aca4fd95.png',
	'Programmers': 'https://user-images.githubusercontent.com/50317129/146045855-3cac4845-1d15-47db-9261-5843b9122228.png',
	'WAS': 'https://user-images.githubusercontent.com/50317129/132937090-b40eb63a-f391-44bc-8aa7-a319e745ba09.png',
	'WEB': 'https://user-images.githubusercontent.com/50317129/132937120-8c5d8c34-569f-4736-af86-820cb851e9bd.png',
	'알고리즘': 'https://user-images.githubusercontent.com/50317129/132937309-d686bf2f-8919-44b1-8919-a0711ae73031.png',
	'잡담': 'https://user-images.githubusercontent.com/50317129/132937359-c122ff9f-e610-4087-8016-c0a5b9357260.png',
	'React': 'https://user-images.githubusercontent.com/50317129/132937462-ff607a3f-1ccb-45f2-8762-b8697e4d63f5.png',
	'RaspberryPi': 'https://user-images.githubusercontent.com/50317129/132937496-a2f0e74f-18c3-43c7-9d94-869690a72e4c.png',
	'Ubuntu': 'https://user-images.githubusercontent.com/50317129/132937521-683e896e-8830-4175-9c15-d294adaf3620.png'
} as CategoryProps;

export const PIECE = [
	{
		title: 'Cake is a fxcking LIE',
		author: 'Are you steel there?',
		images: 'https://user-images.githubusercontent.com/50317129/118843488-126c6200-b905-11eb-9324-9ea96ea833dd.png'
	},
	{
		title: 'That\'s not the hard part. It\'s letting go.',
		author: 'Sierra Madre Casino',
		images: 'https://user-images.githubusercontent.com/50317129/118843635-35971180-b905-11eb-874f-e7929f9f9664.png'
	},
	{
		title: 'Trust Me.',
		author: 'BT',
		images: 'https://user-images.githubusercontent.com/50317129/118843791-595a5780-b905-11eb-88f8-781bbf897ef5.png'
	},
	{
		title: 'A man chooses, A slave obeys.',
		author: 'a Golfer',
		images: 'https://user-images.githubusercontent.com/50317129/118843919-77c05300-b905-11eb-8213-6f9caaa58829.png'
	},
	{
		title: '404 Not Found',
		author: 'undefined... x_X',
		images: 'https://user-images.githubusercontent.com/50317129/118844150-b1915980-b905-11eb-916b-49921c5c46f7.gif'
	},
	{
		title: '게임을 하면 이겨야지!',
		author: 'D.Va',
		images: 'https://user-images.githubusercontent.com/50317129/118844364-ddacda80-b905-11eb-9051-4f3f50f94f7e.png'
	},
	{
		title: '내 손을 잡아, 시작되는 Party time.',
		author: '환상속의 그대',
		images: 'https://user-images.githubusercontent.com/50317129/118844396-e3a2bb80-b905-11eb-9c71-d11851905631.png'
	},
	{
		title: 'Enjoy your stay',
		author: 'Fallout New Vegas',
		images: 'https://user-images.githubusercontent.com/50317129/118844534-fddc9980-b905-11eb-8b8b-bbb3686066d8.png'
	},
	{
		title: 'War... War never changes.',
		author: 'Fallout Series',
		images: 'https://user-images.githubusercontent.com/50317129/118844589-08972e80-b906-11eb-8b69-a32c9a29a329.png'
	},
	{
		title: 'War... War never changes. Men do.',
		author: 'Ulysses',
		images: 'https://user-images.githubusercontent.com/50317129/118844943-514ee780-b906-11eb-92fc-306cb4ad2174.png'
	},
	{
		title: 'On your left.',
		author: 'Sam',
		images: 'https://user-images.githubusercontent.com/50317129/118845228-8ce9b180-b906-11eb-860e-c1f41459a08d.png'
	},
	{
		title: 'History is written by the victors.',
		author: 'Cpt. Price',
		images: 'https://user-images.githubusercontent.com/50317129/118845457-c28e9a80-b906-11eb-8740-3fb5fd734a75.png'
	},
	{
		title: 'History is written by the victors.',
		author: 'Gen. Shepherd',
		images: 'https://user-images.githubusercontent.com/50317129/118846014-4052a600-b907-11eb-880c-0dd5708123ed.png'
	},
	{
		title: 'Remember. We get dirty, World be stay clean. That\'s the mission.',
		author: 'Cpt. Price',
		images: 'https://user-images.githubusercontent.com/50317129/118846231-7b54d980-b907-11eb-87b0-6354b55c3b5c.png'
	},
	{
		title: 'Succeeding you, Father.',
		author: 'Arthas Menethil',
		images: 'https://user-images.githubusercontent.com/50317129/118846373-9aec0200-b907-11eb-8b13-04ca3e63d747.png'
	},
	{
		title: 'My life for Aiur',
		author: 'Zeratul',
		images: 'https://user-images.githubusercontent.com/50317129/118846580-d25aae80-b907-11eb-92ff-ad4709f1e3ef.png'
	},
	{
		title: '드디어, 올 것이 왔군.',
		author: 'Tychus J. Findlay',
		images: 'https://user-images.githubusercontent.com/50317129/118846645-e7374200-b907-11eb-9d64-8d11b955d219.png'
	},
	{
		title: '그 여자가 그만한 가치가 있길 바라겠어, 지미...',
		author: 'Tychus J. Findlay...?',
		images: 'https://user-images.githubusercontent.com/50317129/118846876-1e0d5800-b908-11eb-836c-697e3eb1cdc2.png'
	},
	{
		title: '진짤루에여 가짤루에여??? 네????',
		author: '하빵',
		images: 'https://user-images.githubusercontent.com/50317129/118972620-b4468a00-b9ab-11eb-8751-e22b63075321.png'
	},
	{
		title: '장비를 정지합니다.',
		author: '안 되잖아?',
		images: 'https://user-images.githubusercontent.com/50317129/118972896-08ea0500-b9ac-11eb-9923-a40717be81b8.png'
	},
	{
		title: 'I think we\'ll be OK, Leon.',
		author: 'Matilda',
		images: 'https://user-images.githubusercontent.com/50317129/118973091-477fbf80-b9ac-11eb-8b7a-c1275d2bf97b.png'
	},
	{
		title: 'I think we\'ll be OK, Leon.',
		author: 'Matilda',
		images: 'https://user-images.githubusercontent.com/50317129/118973091-477fbf80-b9ac-11eb-8b7a-c1275d2bf97b.png'
	},
	{
		title: 'No kids, No women',
		author: 'Leon',
		images: 'https://user-images.githubusercontent.com/50317129/118973681-e4425d00-b9ac-11eb-8db5-301f55bd6472.png'
	},
	{
		title: '이런 날엔, 너 같은 꼬마들은...',
		author: 'WA! Sxxs!!',
		images: 'https://user-images.githubusercontent.com/50317129/119267705-b9653c80-bc2a-11eb-845c-fac6fcd313f8.gif'
	},
	{
		title: 'Rip and Tear... Until it\'s done.',
		author: 'Doom Slayer',
		images: 'https://user-images.githubusercontent.com/50317129/119292046-936f8480-bc8a-11eb-9400-33f06d901878.gif'
	},
	{
		title: 'If no one else can help, and if you can find them, maybe you can hire',
		author: 'the A-Team',
		images: 'https://user-images.githubusercontent.com/50317129/119294369-4510b480-bc8f-11eb-9a20-f64a071a2110.png'
	},
	{
		title: 'Living in the Sunlight, Loving in the Moonlight',
		author: '&new',
		images: 'https://user-images.githubusercontent.com/50317129/119343456-714d2500-bcd1-11eb-9b6a-3c9921da7959.png'
	},
	{
		title: 'I am Iron man.',
		author: 'Tony Stark',
		images: 'https://user-images.githubusercontent.com/50317129/119344000-1b2cb180-bcd2-11eb-8419-aa62608ff2c5.png'
	},
	{
		title: 'LEEEEEEROY JENKINS!',
		author: 'Leyroy Jenkins',
		images: 'https://user-images.githubusercontent.com/50317129/119344321-78286780-bcd2-11eb-85d0-6fe498abc1db.gif'
	},
	{
		title: '*--- *- -*-* -*-',
		author: 'Are you in there BT?',
		images: 'https://user-images.githubusercontent.com/50317129/129361016-a5329b8a-b96d-4102-9b9e-ef37b44e025f.gif'
	}
];