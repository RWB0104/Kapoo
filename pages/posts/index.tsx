/**
 * 포스트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 11:59:59
 */

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getContentsCategory, getContentsList } from '@commons/api';
import { getRandomIndex, ContentProps, CategoryProps, CONTENT_DIV } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';
import { useEffect, useState } from 'react';

interface Props
{
	posts: ContentProps[],
	category: CategoryProps,
	total: number
}

interface StaticProp
{
	props: Props
}

const type = 'posts';

/**
 * 게시글 페이지 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Posts({ posts, category, total }: Props): JSX.Element | null
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
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={imageState} />

			<Screener title={TITLE} menu={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={imageState} />

			<ContentCategory type={type} list={category} categoryState={categoryState} setCategoryState={setCategoryState} />

			<ContentBoard list={categoryState.length > 0 ? posts.filter(item => categoryState.indexOf(item.header.category) > -1).slice(0, 10 * pageState) : posts.slice(1, 10 * pageState)} />
		</section>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Promise<StaticProp>} 사용자 Props
 */
export async function getStaticProps(): Promise<StaticProp>
{
	const posts = getContentsList(type);

	const category = getContentsCategory(type);

	return {
		props: {
			posts,
			category,
			total: Math.ceil(posts.length / CONTENT_DIV)
		}
	};
}