const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');

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

module.exports = withPWA({
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true
	}
});