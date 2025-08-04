/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staletimes: {
            dynamic: 30
        },
    },
    serverExternalPackages: ["@node-rs/argon2"]
};

export default nextConfig;