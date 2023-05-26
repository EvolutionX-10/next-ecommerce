/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["lh3.googleusercontent.com", "files.stripe.com"],
	},
	experimental: {
		typedRoutes: true,
	},
};

module.exports = nextConfig;
