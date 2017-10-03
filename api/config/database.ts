import * as Mongoose from 'mongoose';

export interface IDatabaseService {
    start(): void;
    stop(callback: () => void): void;
}

export default class DatabaseService implements IDatabaseService {
    private isConnectedBefore: boolean = false;
    private retry_timeout: number = 5000;

    constructor(private uri: string) {}

    public start() {
        Mongoose.connection.on('connected', this.onConnection.bind(this));
        Mongoose.connection.on('reconnected', this.onReconnection.bind(this));
        Mongoose.connection.on('error', this.onError.bind(this));
        Mongoose.connection.on('disconnected', this.onDisconnection.bind(this));

        this.connect();
    }

    public stop(callback: () => void) {
        Mongoose.connection.close(this.onClose.bind(this, callback));
    }

    private connect() {
        return Mongoose.connect(this.uri, {
            server:  {
                autoReconnect: true,
                useMongoClient: true,
                keepAlive: 30000,
                reconnectInterval: this.retry_timeout,
                reconnectTries: 10000
            }
        }).catch(this.onError);
    }

    private onConnection() {
        this.isConnectedBefore = true;
        console.log('Mongoose connection opened');
    }

    private onReconnection() {
        console.log('Mongoose connection reconnected');
    }

    private onError(error: any) {
        console.error('Mongoose connection error: ' + error);
    }

    private onDisconnection() {
        console.log('Mongoose connection disconnected');
        if (!this.isConnectedBefore) {
            setTimeout(() => this.connect(), this.retry_timeout);
        }
    }

    private onClose(callback: () => void) {
        console.log('Mongoose connection closed');
        callback();
    }
}
