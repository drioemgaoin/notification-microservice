import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as Http from "http";

const app: Koa = new Koa();
const router: Router = new Router();

app.use(logger());
app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods());

router.get('/notification/:key', (ctx, next) => {
    // key represents the notification to send
    // return the schema the consumer has to fill out
    ctx.body = "SCHEMA";
});

router.post('/notification/:key', (ctx, next) => {
    // key represents the notification to send
    // send the notification
});

console.log("Notification Backend started listening on port 3001...");
app.listen(3001);
