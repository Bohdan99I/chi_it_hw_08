const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com:3000',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api', // додайте це
      },
      onProxyReq: function(proxyReq, req, res) {
        // Для відладки
        console.log('Original URL:', req.url);
        console.log('Proxy URL:', proxyReq.path);
      },
    })
  );
};