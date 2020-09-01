const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://1.1.1.1:10068/',
            changeOrigin: true,
            // pathRewrite:{'^/api':''}
        })
    );
    app.use(
        '/index',
        createProxyMiddleware({
            target: 'http://2.2.2.2:10068/',
            changeOrigin: true,
            // pathRewrite:{'^/api':''}
        })
    );
};
