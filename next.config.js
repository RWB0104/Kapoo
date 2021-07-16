const withSass = require("@zeit/next-sass");

module.exports = withSass({
	cssModules: true
});

module.exports = {
	images: {
		loader: "imgix",
		path: ""
	},
	webpack: (config, options) =>
	{
		return {
			...config
		};
	}
};