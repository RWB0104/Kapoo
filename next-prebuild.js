/**
 * 빌드 해쉬 JavaScript
 *
 * @author RWB
 * @since 2021.08.29 Sun 15:29:51
 */

// 라이브러리 모듈
const fs = require('fs');
const fetch = require('node-fetch');

getImage();
bulidHash();

/**
 * 빌드 해쉬 생성 메서드
 */
function bulidHash()
{
	const hash = Math.random().toString(16).substr(2, 11);

	console.log('\n==================================================');
	console.log('빌드 해쉬 생성\n\n');
	console.log(`hash: ${hash}`);
	console.log('==================================================\n');

	fs.writeFileSync('./public/build.txt', hash);
}

/**
 * 기본 이미지 리스트 생성 메서드
 */
async function getImage()
{
	const response = await fetch('https://api.github.com/repos/RWB0104/blog.itcode.dev/issues/43');

	// 응답이 유효할 경우
	if (response.ok)
	{
		const json = await response.json();

		const images = json.body;

		console.log('\n==================================================');
		console.log('이미지 리스트 생성');
		console.log('==================================================\n');

		const result = { list: [] };

		images.replaceAll(/(\r\n|\n|\r)+/g, '\n').split('\n').forEach(e => result.list.push(e));

		fs.writeFileSync('./public/image.json', JSON.stringify(result));
	}

	// 아닐 경우
	else
	{
		console.log('\n==================================================');
		console.log('이미지 리스트 생성 실패');
		console.log('==================================================\n');
	}
}