import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';

const uri = 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@cluster0-shard-00-00-keuyy.mongodb.net:27017,cluster0-shard-00-01-keuyy.mongodb.net:27017,cluster0-shard-00-02-keuyy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

let connection: any;

const connect = () => {
    return new Promise.Promise((resolve, reject) => {
        if (connection) {
            resolve();
        } else {
             mongoose.connect(uri, { useMongoClient: true })
                .then(() => {
                    console.log('Connection opened sucessfully');
                    connection = mongoose.connection;
                    resolve();
                });
        }
    });
}

const ObjectId = (id: string) => {
    return mongoose.Types.ObjectId(id);
};

const disconnect = () => {
    if (connection) {
        mongoose.disconnect(error => {
            if (error) {
                throw error;
            }

            connection = undefined;
            console.log('Connection disconnected sucessfully');
        });
    }
}

export {
    connect,
    disconnect,
    ObjectId
};