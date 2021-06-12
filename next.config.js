module.exports = {
	images: {
		loader: "imgix",
		path: ""
	},
	trailingSlash: true,
	webpack: (config, options) =>
	{
		return {
			...config
		};
	  }
};