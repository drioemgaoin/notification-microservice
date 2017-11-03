import * as db from "../db";
import * as Promise from 'bluebird';
import { assign, forEach } from 'lodash';

import * as Model from "../model/notification";

const save = (mailOptions: any) => {
    const model = assign({}, mailOptions, { sent: false });
    const notification = new Model.Notification(model);
    return notification.save();
};

const update = (id: string) => {
        return Model.Notification.findOne({ _id: db.ObjectId(id)})
            .then((notification: any) => {
                notification.sent = true;
                return notification.save();
            });
};

const recover = () => {
    return Model.Notification.find({ sent: false }).exec();
};

export {
    save,
    update,
    recover
};