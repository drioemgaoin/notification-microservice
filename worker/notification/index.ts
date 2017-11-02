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
    db.connect(() => {
        const options = builder.build(ctx.request.body);
        tracker.save(options, (document_id: string) => {
            mailer.send(options, () => {
                tracker.remove(document_id);
            });
        });
    });
});

const disconnect = () => db.disconnect();
process.on('exit', disconnect);
process.on('SIGTERM', disconnect);
process.on('SIGINT', disconnect);

console.log("Notification Backend started listening on port 3001...");
app.listen(3001);