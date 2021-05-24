/**
 * Sitemap 생성 JavaScript
 *
 * @author RWB
 * @since 2021.05.22 Sat 13:59:53
 */

// 라이브러리 모듈
const fs = require("fs");

const base = "https://rwb0104.github.io";
const target = "./out";

const list = getList(target);
const site = list.substr(0, list.length - 1).split(",");

genSitemap(site);

function getList(path)
{
	const root = fs.readdirSync(path, { withFileTypes: true });
	const exclude = [ ".nojekyll", "assets", "favicons", "sitemap", "_next" ];

	const dir = root.filter(element => exclude.indexOf(element.name) === -1);

	const test = dir.reduce((acc, element) =>
	{
		const subPath = `${path}/${element.name}`;

		if (element.isDirectory())
		{
			acc += getList(subPath);
		}

		else
		{
			acc += (subPath.replace(target, base).replace("/index.html", "/")) + ",";
		}

		return acc;
	}, []);

	return test;
}

function genSitemap(list)
{
	const sitemap = list.reduce((acc, element) =>
	{
		acc += `
		<url>
			<loc>${element}</loc>
			<lastmod>${getFormattedDate(new Date())}</lastmod>
		</url>
		`;

		return acc;
	}, "");

	const template = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset
		xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
			${sitemap}
		</urlset>`;

	fs.writeFile(`${target}/sitemap.xml`, template, err =>
	{
		if (err)
		{
			console.log("sitemap.xml 생성 실패");
			console.log(err.stack);
		}

		else
		{
			console.log(`${target}/sitemap.xml 생성 완료`);
		}
	});
}

/**
 * yyyy-MM-ddTHH:mm:ss 날짜 문자열 반환 함수
 *
 * @param {Date} date: 날짜 객체
 *
 * @returns {String} 날짜 문자열
 */
function getFormattedDate(date)
{
	 const year = date.getFullYear();
	 const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	 const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

	 return `${year}-${month}-${day}`;
}