import 'reflect-metadata';
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";

const app: Koa = new Koa();
const router: Router = new Router();

app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', (ctx, next) => {
    ctx.body = 'INDEX PAGE'
});

console.log("Notification Web started listening on port 3000...");
app.listen(3000);
