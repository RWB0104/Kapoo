const withSass = require('@zeit/next-sass');

module.exports = withSass({
	cssModules: true
});

module.exports = {
	reactStrictMode: false,
	images: {
		loader: 'imgix'
	}
};