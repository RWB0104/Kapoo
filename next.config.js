const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');

module.exports = withSass({
	cssModules: true
});

module.exports = {
	images: {
		loader: 'imgix'
	},
	productionBrowserSourceMaps: false,
	reactStrictMode: false
};

module.exports = withPWA({
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true
	}
});