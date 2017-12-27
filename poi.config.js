module.exports = {
  port: 3000,
  extendWebpack(config) {
    // Disable progress bar while building
    config.devServer.node = {fs:'empty'}
  },
  devServer : {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  }
};
