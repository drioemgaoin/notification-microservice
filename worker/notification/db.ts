import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';

const uri = 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@cluster0-shard-00-00-keuyy.mongodb.net:27017,cluster0-shard-00-01-keuyy.mongodb.net:27017,cluster0-shard-00-02-keuyy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

const RETRY_TIMEOUT = 5000
let isConnectedBefore = false;
let database: any = mongoose.connection;

const connect = () => {
    mongoose.connect(uri, { 
        useMongoClient: true, 
        server: { 
            auto_reconnect: true,
            reconnectInterval: RETRY_TIMEOUT,
            reconnectTries: 10000
        } 
    })
    .catch(error => console.error('Mongoose connect(...) failed with error: ', error));
};

connect();

database.on('connecting', () => {
    console.log('Connecting...');
});
 
database.on('error', (error: any) => {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

database.on('connected', (error: any) => {
    console.log('Connected');
    isConnectedBefore = true;
});

database.once('open', (error: any) => {
    console.log('Connection open');
});

database.on('reconnected', (error: any) => {
    console.log('Reconnected');
});

database.on('disconnected', (error: any) => {
    console.log('Disconnected');

    if (!isConnectedBefore) {
        setTimeout(() => connect(), RETRY_TIMEOUT);
    }
});

const ObjectId = (id: string) => {
    return mongoose.Types.ObjectId(id);
};

const disconnect = () => database.close();

export {
    disconnect,
    ObjectId
};