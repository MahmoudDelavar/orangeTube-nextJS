/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  //--Development
  dev_phase: {
    phase: "development",
    port: 3000,
    db_Address: "mongodb://localhost:27017/orangetube2",
  },

  //--Production
  pro_phase: {
    phase: "production",
    port: "",
  },
};

module.exports = nextConfig;
