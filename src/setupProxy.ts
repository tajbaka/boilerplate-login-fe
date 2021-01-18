import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = app => {
  app.use(
    ["/auth/google", "/api/*"],
    createProxyMiddleware({
      target: "http://localhost:3090",
      changeOrigin: true
    })
  );
};
