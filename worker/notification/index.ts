import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as Body from "koa-body";
import * as Http from "http";

import * as mailer from "./mailer";
import * as builder from "./builder";

const app: Koa = new Koa();
const router: Router = new Router();

require('dotenv').load();

app.use(logger());
app.use(bodyParser());
app.use(router.routes())
app.use(Body());
app.use(router.allowedMethods());

router.get('/notification/:key', (ctx, next) => {
    // key represents the notification to send
    // return the schema the consumer has to fill out
    ctx.body = "SCHEMA";
});

router.post('/notification/:key', (ctx, next) => {
    const options = builder.build(ctx.request.body);
    mailer.send(options);
});

console.log("Notification Backend started listening on port 3001...");
app.listen(3001);
