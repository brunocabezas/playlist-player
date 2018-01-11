const jeet = require('jeet');

module.exports = {
  port: 3000,
  extendWebpack(config) {
    // Disable progress bar while building
    config.resolve.alias
      .set('react', 'preact-compat')
      .set('react-dom', 'preact-compat')
      .set('create-react-class', 'preact-compat/lib/create-react-class');

    config.devServer.node = {fs:'empty'};

  },
  devServer : {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  },
  presets: [
    require('poi-preset-eslint')({
      mode : "development"
    })
  ],
  transformModules: ['url-regex']
};
