import * as mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: String,
    html: String,
    sent: Boolean
}); 

const Notification = mongoose.model('Notification', notificationSchema);

export {
    Notification
};