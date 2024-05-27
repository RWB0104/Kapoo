/**
 * 푸터 링크 버튼 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.27 Sat 11:21:34
 */

import SymbolicButton from '@kapoo/ui-pack/atom/SymbolicButton';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export interface FooterLinkButtonProps extends PropsWithChildren
{
	/**
	 * 링크
	 */
	link: string;
}

/**
 * 푸터 링크 버튼 서브 컴포넌트 반환 메서드
 *
 * @param {FooterLinkButtonProps} param0: FooterLinkButtonProps
 *
 * @returns {JSX.Element} JSX
 */
export default function FooterLinkButton({ link, children }: FooterLinkButtonProps): JSX.Element
{
	return (
		<Link data-component='FooterLinkButton' href={link} target='_blank'>
			<SymbolicButton borderColor='white' height={40} width={40}>
				{children}
			</SymbolicButton>
		</Link>
	);
}