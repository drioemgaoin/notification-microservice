import * as db from "../db";
import * as Model from "../model/notification";

const save = (mailOptions: any, done: any) => {
    db.connect(() => {
        const notification = new Model.Notification(mailOptions);
        notification.save((error, notification) => {
            if (error) {
                throw error;
            }

            done(notification.id);
        });
    });
};

const remove = (id: string) => {
    db.connect(() => {
        Model.Notification.remove({ _id: id }, (error) => {
            if (error) {
                throw error;
            }
        });
    });
};

export {
    save,
    remove
};