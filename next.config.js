/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  port: 3000,
  jwt_key: "hjasd78ASajas09AKSHdkuhhashd87as70asdASD",
  db_Address: "mongodb://127.0.0.1/orangetube2",
  fetchUrl: "http://localhost:3000",
};

module.exports = nextConfig;
