/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

// 사용자 모듈
import { getContentsCategory, getContentsList } from '@commons/api';
import { CategoryProps, ContentProps, CONTENT_DIV, getContentDiv, getRandomIndex } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentCategory from '@components/contents/ContentCategory';
import ContentBoard from '@components/contents/ContentBoard';
import { useEffect, useState } from 'react';

interface Props
{
	projects: ContentProps[],
	category: CategoryProps,
	total: number
}

interface StaticProp
{
	props: Props
}

const type = 'projects';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Projects({ projects, category, total }: Props): JSX.Element | null
{
	const [ pageState, setPageState ] = useState(1);
	const [ categoryState, setCategoryState ] = useState([] as string[]);

	const [ imageState, setImageState ] = useState('');

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			if (pageState < total && window.scrollY > window.document.documentElement.scrollHeight - 1500)
			{
				setPageState(pageState + 1);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	useEffect(() => setPageState(1), [ categoryState ]);

	useEffect(() =>
	{
		(async () =>
		{
			const a = await fetch('/image.json');
			const json = await a.json();

			const index = getRandomIndex(json.list.length);

			console.dir(json.list);

			setImageState(json.list[index]);
		})();
	}, []);

	return (
		<section>
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={imageState} />

			<Screener title={TITLE} menu={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={imageState} />

			<ContentCategory type={type} list={category} categoryState={categoryState} setCategoryState={setCategoryState} />

			<ContentBoard list={categoryState.length > 0 ? projects.filter(item => categoryState.indexOf(item.header.category) > -1).slice(0, 10 * pageState) : projects.slice(1, 10 * pageState)} />
		</section>
	);
}

/**
 * 정적 프로퍼티 반환 함수
 *
 * @return {Promise<StaticProp>} Promise 객체
 */
export async function getStaticProps(): Promise<StaticProp>
{
	const { start, end } = getContentDiv(1);

	const projects = getContentsList(type);

	const subProjects = projects.slice(start, end);
	subProjects.forEach(e => e.content = '');

	const category = getContentsCategory(type);

	return {
		props: {
			projects: subProjects,
			category,
			total: Math.ceil(projects.length / CONTENT_DIV)
		}
	};
}