/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  //--Development
  dev_phase: {
    phase: "development",
    port: 3000,
    jwt_key: "hjasd78ASajas09AKSHdkuhhashd87as70asdASD",
    db_Address: "mongodb://localhost:27017/orangetube2",
    fechUrl: "http://localhost:3000",
  },

  //--Production
  pro_phase: {
    phase: "production",
    port: "",
  },
};

module.exports = nextConfig;
