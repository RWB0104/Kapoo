/**
 * Google Analytics 모듈
 *
 * @author RWB
 * @since 2022.07.06 Wed 23:32:50
 */

import { ContentType } from './common';

export interface GoogleAuth
{
	access_token: string
	expires_in: number
	scope: string
	token_type: string
}

export interface PopularPage
{
	dimensionHeaders?: {
		name: string
	}[]
	metricHeaders?: {
		name: string
		type: string
	}[]
	rows: {
		dimensionValues: {
			value: string
		}[]
		metricValues: {
			value: string
		}[]
	}[]
	totals?: {
		dimensionValues: {
			value: string
		}[]
		metricValues: {
			value: string
		}[]
	}
	rowCount?: number
	metadata?: {
		currencyCode: string
		timeZone: string
	}
	kind: string
}

/**
 * 인증 반환 메서드
 *
 * @returns {Promise<GoogleAuth>} Promise 객체
 */
export async function authorize(): Promise<GoogleAuth | undefined>
{
	const auth = await fetch('https://accounts.google.com/o/oauth2/token', {
		body: JSON.stringify({
			client_id: '22130300203-s47tft38ah28e6o2jsv5144vqn1cl32p.apps.googleusercontent.com',
			client_secret: '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',
			grant_type: 'refresh_token',
			refresh_token: '1//04iZ6ahFjojgzCgYIARAAGAQSNwF-L9IrOhYq9Wz4MycJH_H2CyuxxhCntZeHhmfsLwfIXgJzV-11rEvDZLmEFNl8k_UnR3LpCOs'
		}),
		method: 'POST'
	});

	if (auth.ok)
	{
		const json: GoogleAuth = await auth.json();

		return json;
	}

	return undefined;
}

/**
 * 인기 페이지 반환 메서드
 *
 * @returns {Promise<PopularPage | undefined>} Promise 객체
 */
export async function getPopularPage(auth: GoogleAuth, type: ContentType): Promise<PopularPage | undefined>
{
	const list = await fetch('https://content-analyticsdata.googleapis.com/v1beta/properties/284521573:runReport?alt=json', {
		body: JSON.stringify({
			dateRanges: [
				{
					endDate: 'today',
					startDate: '30daysAgo'
				}
			],
			dimensionFilter: {
				filter: {
					fieldName: 'pagePath',
					stringFilter: {
						matchType: 'BEGINS_WITH',
						value: `/${type}/2`
					}
				}
			},
			dimensions: [
				{ name: 'pagePath' }
			],
			limit: '10',
			metricAggregations: [
				'TOTAL'
			],
			metrics: [
				{ name: 'active28DayUsers' }
			]
		}),
		headers: { Authorization: `${auth?.token_type} ${auth?.access_token}` },
		method: 'POST'
	});

	if (list.ok)
	{
		const json: PopularPage = await list.json();

		return json;
	}

	return undefined;
}