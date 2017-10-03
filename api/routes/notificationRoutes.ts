import { IRouterContext } from "koa-router";
import { Container, Inject } from "typescript-ioc";
import NoticicationController from "../controllers/NotificationController";
import Route from "../models/Route";
import IRoutes from "./routes";

export default class NotificationRoutes extends IRoutes {
    constructor( @Inject private notificationController: NoticicationController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/notification", "get", (ctx: IRouterContext) => this.notificationController.getAll(ctx)),
            Route.newRoute("/notification/:id", "get", (ctx: IRouterContext) => this.notificationController.findById(ctx)),
            Route.newRoute("/notification", "post", (ctx: IRouterContext) => this.notificationController.save(ctx)),
            Route.newRoute("/notification/:id", "put", (ctx: IRouterContext) => this.notificationController.update(ctx)),
            Route.newRoute("/notification/:id", "delete", (ctx: IRouterContext) => this.notificationController.delete(ctx)),
        ];
    }
}