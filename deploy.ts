import { execSync } from 'child_process';

const list = [ 'major', 'minor', 'patch' ];

function vaildTarget(target: string): void
{
	if (!list.includes(target))
	{
		throw Error('major, minor, patch 중 하나의 파라미터를 입력하세요.');
	}
}

function run(): void
{
	try
	{
		const target = process.argv[2];

		console.log('==============================');
		console.log('blog.itcode.dev 배포 시작');
		console.log();

		vaildTarget(target);

		console.log(`버전 업그레이드 종류 - ${target}`);

		console.log('버전 업그레이드 커밋 생성');
		execSync(`npm version ${target}`);

		console.log('업그레이드 커밋 푸시');
		execSync('git push');

		console.log('태그 생성');
		execSync('git push --tag');

		console.log();
		console.log('🚀 blog.itcode.dev 배포 성공');
	}
	catch (e)
	{
		console.error(e);

		console.log();
		console.log('🚨 blog.itcode.dev 배포 실패');
	}
	finally
	{
		console.log();
		console.log('blog.itcode.dev 배포 종료');
		console.log('==============================');
	}
}

run();