const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');

module.exports = withSass({ cssModules: true });

module.exports = withPWA({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development'
});