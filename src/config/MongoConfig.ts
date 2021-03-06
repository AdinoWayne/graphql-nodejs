import mongoose from 'mongoose';

export default class MongoConfig {

    private user: string;
    private password: string;
    private host: string;

    constructor(user: string, password: string, host: string){
        this.user = user;
        this.password = password;
        this.host = host;
    }

    public async connect(): Promise<void> {
        console.log("[MONGO] Conecting to MongoDB...");

        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
            .then(() => console.log("[MONGO] Connected to MongoDB"))
            .catch(err => console.error(err));        
    }

};