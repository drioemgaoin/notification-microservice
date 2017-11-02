import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as Body from "koa-body";
import * as Http from "http";

require('dotenv').load();

import * as mailer from "./mailer";
import * as builder from "./builder";
import * as db from "./db";
import * as tracker from "./service/tracker";

const app: Koa = new Koa();
const router: Router = new Router();

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
    const notification = builder.build(ctx.request.body);

    let id: string;
    tracker.save(notification)
        .then((document: any) => {
            id = document.id;
            return mailer.send(notification);
        })
        .then(() => tracker.update(id))
        .catch((error: any) => {
            console.log(error);
        });
});

const disconnect = () => db.disconnect();
process.on('exit', disconnect);
process.on('SIGTERM', disconnect);
process.on('SIGINT', disconnect);

console.log("Notification Backend started listening on port 3001...");
app.listen(3001);