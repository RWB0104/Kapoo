/**
 * 컨텐츠 무버 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 17:37:32
 */

import { ContentProps } from '@kapoo/commons/common';
import { themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/ContentMover.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { IoArrowBack, IoArrowForward, IoMenu } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

interface Props
{
	page: {
		type: string;
		prev?: ContentProps | null,
		next?: ContentProps | null,
	}
}

interface SubProps
{
	className?: string,
	data?: ContentProps | null,
	isNext?: boolean
}

/**
 * 사이드 버튼 JSX 반환 함수
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
function SideButton({ className, data, isNext }: SubProps): JSX.Element | null
{
	return data ? (
		<Link href={`/${data?.header.type}/${data?.url.slice(1, 5).join('/')}`} legacyBehavior passHref>
			<a className={className} data-prev={isNext} href='#replace' title={data.header.title}>
				{isNext && <IoArrowBack />}
				<p>{data.header.title}</p>
				{!isNext && <IoArrowForward />}
			</a>
		</Link>
	) : null;
}

/**
 * 컨텐츠 무버 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentMover({ page }: Props): JSX.Element
{
	const { prev, next } = page;

	const themeState = useRecoilValue(themeAtom);

	const cn = classNames.bind(styles);

	return (
		<article className={cn('root')}>
			<div className={cn('mover-wrapper')}>
				<div>
					<SideButton className={cn('button', themeState)} data={next} isNext />
				</div>

				<div>
					<SideButton className={cn('button', themeState)} data={prev} />
				</div>
			</div>

			<hr className={cn('divider')} />

			<div>
				<Link href={`/${page.type}`} legacyBehavior passHref>
					<a className={cn('button', themeState)} href='#replace' title={`/${page.type}`}>
						<IoMenu />
						<p>목록</p>
					</a>
				</Link>
			</div>
		</article>
	);
}