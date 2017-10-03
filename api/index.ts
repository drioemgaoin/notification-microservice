import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as Serve from "koa-static";
import * as Http from "http";
import { Container } from "typescript-ioc";

import NotificationRoutes from './routes/notificationRoutes';

const app: Koa = new Koa();

//TODO: refactor it
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Notification API',
        version: '1.0.0',
        description: 'Notification API avaiable endpoints',
    },
    host: 'localhost:3002',
    basePath: '/',
    consumes: [
        'application/x-www-form-urlencoded',
        'application/json'
    ],
    produces: ['application/json'],
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [ `${__dirname}/controllers/definitions/**/*.ts` ],
};

const swaggerSpec = swaggerJSDoc(options);
// END TODO

const router: Router = new Router();

Container.get(NotificationRoutes).register(router);

router.get('/swagger.json', (ctx, next) => {
    ctx.request.header = { 'content-type': 'application/json' };
    ctx.response.body = swaggerSpec;
});

app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(Serve(`${__dirname}/public`));

console.log("Notification Api started listening on port 3002...");
app.listen(3002);
