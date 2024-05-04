import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from 'process';

const target: string = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'http://localhost:40833';

const context: string[] = [
  "/api/weatherforecast",
  "/api/doctor",
  "/api/patient",
  "/api/appointment",
  "/api/appointmenttype",
  "/_configuration",
  "/.well-known",
  "/Identity",
  "/connect",
  "/ApplyDatabaseMigrations",
  "/_framework"
];

module.exports = function (app: any) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
