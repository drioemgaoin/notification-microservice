import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as Http from "http";
import { Container } from "typescript-ioc";

import NotificationRoutes from './routes/notificationRoutes';

const app: Koa = new Koa();
const router: Router = new Router();

Container.get(NotificationRoutes).register(router);

app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Notification Api started listening on port 3002...");
app.listen(3002);