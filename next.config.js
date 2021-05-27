module.exports = {
	images: {
		loader: "imgix",
		path: ""
	},
	trailingSlash: true,
	async redirects()
	{
		return [
			{
				source: "/rss/",
				destination: "/feed.xml",
				permanent: true
			}
		];
	}
};