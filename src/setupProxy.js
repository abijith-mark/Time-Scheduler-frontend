const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "http://[::1]:8080/",
      changeOrigin: true
    })
  );
};