const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", //3000 => 5000번으로 줌.
      changeOrigin: true,
    })
  );
};
