import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from 'process';
var target = env.ASPNETCORE_HTTPS_PORT
    ? "https://localhost:".concat(env.ASPNETCORE_HTTPS_PORT)
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'http://localhost:40833';
var context = [
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
module.exports = function (app) {
    var appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        }
    });
    app.use(appProxy);
};
//# sourceMappingURL=setupProxy.js.map