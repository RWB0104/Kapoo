/**
 * 사전 빌드 모듈
 *
 * @author RWB
 * @since 2022.05.09 Mon 19:56:59
 */

import { getBuildHash, getContentList, getCategoryList, getImageList } from '@commons/api';
import { ContentType, ContentTypeEnum } from '@commons/common';

import fs from 'fs';

run();

/**
 * 동작 메서드
 */
async function run()
{
	console.log('\n==================================================');
	console.log('빌드 전처리 작업 시작');
	console.log();

	genBuildHash();

	await genImageList();

	await genContentList(ContentTypeEnum.POSTS);
	await genContentList(ContentTypeEnum.PROJECTS);

	await genCategoryList(ContentTypeEnum.POSTS);
	await genCategoryList(ContentTypeEnum.PROJECTS);

	console.log('빌드 전처리 작업 종료');
	console.log('==================================================\n\n\n');
}

/**
 * 빌드 해쉬 생성 메서드
 */
function genBuildHash()
{
	console.log('  - 빌드 해쉬 생성');

	const hash = getBuildHash();

	const path = './public/build.txt';

	fs.writeFileSync(path, hash);

	console.log(`    - ${path}`);
	console.log(`    - ✅ hash: ${hash}`);
	console.log();
}

/**
 * 기본 이미지 리스트 생성 메서드
 */
async function genImageList()
{
	console.log('  - 이미지 리스트 생성');

	// 이미지 리스트 생성 시도
	try
	{
		const list = await getImageList();

		const path = './public/image.json';

		console.log(`    - 총 ${list.length}개 이미지 확인`);

		fs.writeFileSync(path, JSON.stringify({ list: list }, null, 4));

		console.log(`    - ${path}`);
		console.log('    - ✅ 이미지 리스트 생성 성공');
		console.log();
	}

	// 예외
	catch (e)
	{
		console.log('    - ❌ 이미지 리스트 생성 실패');
		console.log();
		console.dir(e);

		process.exit(1);
	}
}

/**
 * 컨텐츠 리스트 생성 메서드
 *
 * @param {ContentType} type: 타입
 */
async function genContentList(type: ContentType)
{
	console.log(`  - ${type} 리스트 생성`);

	// type 리스트 생성 시도
	try
	{
		const list = await getContentList(type, false);

		const path = `./public/${type}.json`;

		console.log(`    - 총 ${list.length}개 ${type} 확인`);

		fs.writeFileSync(path, JSON.stringify({ list: list }, null, 4));

		console.log(`    - ${path}`);
		console.log(`    - ✅ ${type} 리스트 생성 성공`);
		console.log();
	}

	// 예외
	catch (e)
	{
		console.log(`    - ❌ ${type} 리스트 생성 실패`);
		console.log();
		console.dir(e);

		process.exit(1);
	}
}

/**
 * 컨텐츠 카테고리 리스트 생성 메서드
 *
 * @param {ContentType} type: 타입
 */
async function genCategoryList(type: ContentType)
{
	console.log(`  - ${type} 카테고리 리스트 생성`);

	// type 카테고리 리스트 생성 시도
	try
	{
		const list = await getCategoryList(type);

		const path = `./public/${type}-category.json`;

		console.log(`    - 총 ${list.length}개 ${type} 카테고리 확인`);

		fs.writeFileSync(path, JSON.stringify({ list: list }, null, 4));

		console.log(`    - ${path}`);
		console.log(`    - ✅ ${type} 카테고리 리스트 생성 성공`);
		console.log();
	}

	// 예외
	catch (e)
	{
		console.log(`    - ❌ ${type} 카테고리 리스트 생성 실패`);
		console.log();
		console.dir(e);

		process.exit(1);
	}
}