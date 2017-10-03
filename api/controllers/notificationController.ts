import { IRouterContext } from "koa-router";

export default class NotificationController {
    public async getAll(ctx: IRouterContext) {
        console.log('GET ALL')
        ctx.body = {};
    }

    public async findById(ctx: IRouterContext) {
        ctx.body = {};
    }

    public async save(ctx: IRouterContext) {
        ctx.body = {};
    }

    public async update(ctx: IRouterContext) {
        ctx.body = {};
    }

    public async delete(ctx: IRouterContext) {
        ctx.body = {};
    }
}