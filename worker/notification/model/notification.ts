import * as Mongoose from 'mongoose';

const notificationSchema = new Mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: String,
    html: String
}); 

const Notification = Mongoose.model('Notification', notificationSchema);

export {
    Notification
};