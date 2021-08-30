/**
 * 빌드 해쉬 JavaScript
 *
 * @author RWB
 * @since 2021.08.29 Sun 15:29:51
 */

// 라이브러리 모듈
const fs = require('fs');

bulidHash();

/**
 * 빌드 해쉬 생성 함수
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