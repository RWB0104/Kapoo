export default function RSS()
{
	return <p>adfadf</p>;
}

export async function getServerSideProps(context)
{
	const res = context.res;

	if (!res)
	{
		return;
	}

	//const blogPosts = genRss();
	res.setHeader("Content-Type", "text/html");
	res.write(<p>dskfkdkdjaj</p>);
	res.end();
}