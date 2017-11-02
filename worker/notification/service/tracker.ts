import * as db from "../db";
import * as Model from "../model/notification";
import * as Promise from 'bluebird';
import { assign } from 'lodash';

const save = (mailOptions: any): any => {
    const model = assign({}, mailOptions, { sent: false });
    const notification = new Model.Notification(model);
    return db.connect().then(() => notification.save());
};

const update = (id: string) => {
    return db.connect()
        .then(() => {
            return Model.Notification.findOne({ _id: db.getId(id)})
                .then((notification: any) => {
                    notification.sent = true;
                    return notification.save()
                });
        });
};

export {
    save,
    update
};