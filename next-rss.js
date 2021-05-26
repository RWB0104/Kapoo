/**
 * RSS 생성 JavaScript
 *
 * @author RWB
 * @since 2021.05.26 Wed 16:45:19
 */

// 라이브러리 모듈
import fs from "fs";
import globby from "globby";

import { getContents } from "./common/api.js";

getSitemap();

async function getSitemap()
{

	//const page = await globby([
	//	"./pages/**/*.js",
	//	"!./pages/_*.js",
	//	"!./pages/**/[slug].js"
	//]);

	const pages = fs.readdirSync("./pages").forEach(e => console.dir(e));

	const posts = getContents("posts");
	const projects = getContents("projects");

	const postsMap = posts.reduce((acc, element) =>
	{
		if (element.publish)
		{
			acc.push(element.slug);
		}

		return acc;
	}, []);

	const projectsMap = projects.reduce((acc, element) =>
	{
		if (element.publish)
		{
			acc.push(element.slug);
		}

		return acc;
	}, []);

	const map = postsMap.concat(projectsMap);

	console.dir(map);


}