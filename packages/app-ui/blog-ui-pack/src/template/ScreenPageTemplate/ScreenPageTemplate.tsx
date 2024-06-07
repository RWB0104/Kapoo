/**
 * 스크린 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 12:38:24
 */

import Screener from '@kapoo/global-ui-pack/organism/Screener';

import PageTemplate, { PageTemplateProps } from '../PageTemplate';

export interface ScreenPageTemplateProps extends PageTemplateProps
{
	/**
	 * 스크리너 소스
	 */
	src?: string;

	/**
	 * 스크린 템플릿
	 */
	template?: JSX.Element;
}

/**
 * 스크린 페이지 template 컴포넌트 반환 메서드
 *
 * @param {PageTemplateProps} param0: PageTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ScreenPageTemplate({ src, template, title, version, children }: ScreenPageTemplateProps): JSX.Element
{
	return (
		<PageTemplate data-component='ScreenPageTemplate' title={title} version={version}>
			<Screener src={src}>
				{template}
			</Screener>

			{children}
		</PageTemplate>
	);
}