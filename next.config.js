const withSass = require('@zeit/next-sass');

module.exports = withSass({
	cssModules: true
});

module.exports = {
	reactStrictMode: false,
	productionBrowserSourceMaps: false,
	images: {
		loader: 'imgix'
	}
};