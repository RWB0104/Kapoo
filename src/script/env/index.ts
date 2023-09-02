/**
 * 환경변수 모듈
 *
 * @author RWB
 * @since 2023.08.19 Sat 05:03:25
 */

export const APP_INFO = {
	baseurl: 'https://blog.itcode.dev',
	description: '𝝅번째 알파카의 우당탕탕 개발 기록',
	title: '𝝅번째 알파카의 개발 낙서장'
};

export const AUTHOR = {
	email: 'psj2716@mensakorea.org',
	nickname: 'RWB',
	social: {
		github: {
			link: 'https://github.com/RWB0104',
			name: 'Kapoo'
		},
		linkedin: {
			link: 'https://www.linkedin.com/in/itcode/',
			name: 'RWB'
		}
	}
};

export const PAGE_INFO = {
	comments: {
		description: '💝 두근대며 읽어보는 중...',
		title: '방명록',
		url: '/comments'
	},
	index: {
		description: `🦙 ${APP_INFO.description}`,
		title: '홈',
		url: '/'
	},
	posts: {
		description: '✒️ 뭔가 끄적끄적 쓰는 중...',
		title: '게시글',
		url: '/posts'
	},
	projects: {
		description: '🖥️ 무언가 뚝딱뚝딱 하는 중...',
		title: '프로젝트',
		url: '/projects'
	}
};