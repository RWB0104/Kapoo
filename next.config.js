/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development'
});

const nextConfig = withPWA({ output: 'export' });

module.exports = nextConfig;