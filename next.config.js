/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  //--Development
  dev_phase: {
    phase: "development",
    port: 3000,
  },

  //--Production
  pro_phase: {
    phase: "production",
    port: "",
  },
};

module.exports = nextConfig;
