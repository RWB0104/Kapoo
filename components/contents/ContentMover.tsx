/**
 * 컨텐츠 무버 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 17:37:32
 */

// 라이브러리 모듈
import Link from 'next/link';
import { IoArrowBack, IoArrowForward, IoMenu } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import { ContentProps } from '@commons/common';
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/contents/ContentMover.module.scss';

interface Props
{
	page: {
		type: string;
		prev?: ContentProps,
		next?: ContentProps,
	}
}

interface SubProps
{
	className?: string,
	data?: ContentProps,
	isPrev: boolean
}

/**
 * 컨텐츠 무버 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentMover({ page }: Props): JSX.Element | null
{
	const { prev, next } = page;

	const themeState = useRecoilValue(themeAtom);

	return (
		<article className={styles.root}>
			<div className={styles['mover-wrapper']}>
				<SideButton className={styles[`button-${themeState}`]} data={prev} isPrev />
				<SideButton className={styles[`button-${themeState}`]} data={next} />
			</div>

			<hr className={styles.divider} />

			<div>
				<Link href={`/${page.type}`}>
					<a title={`/${page.type}`} className={styles[`button-${themeState}`]}>
						<IoMenu />
						<p>목록</p>
					</a>
				</Link>
			</div>
		</article>
	);
}

/**
 * 사이드 버튼 JSX 반환 함수
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
function SideButton({ className, data, isPrev }: SubProps): JSX.Element | null
{
	return data ? (
		<Link href={`/${data?.header.type}/${data?.url.slice(1, 5).join('/')}`}>
			<a className={className} title={data.header.title} data-prev={isPrev}>
				{isPrev && <IoArrowBack />}
				<p>{data.header.title}</p>
				{!isPrev && <IoArrowForward />}
			</a>
		</Link>
	) : null;
}