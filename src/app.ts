import dotenv from 'dotenv';
import ServerConfig from './config/ServerConfig';
import MongoConfig from './config/MongoConfig';
import ArticleRoute from './routes/ArticleRoute';
import UserRoute from './routes/UserRoute';
import AuthRoute from './routes/AuthRoute';

dotenv.config();

let mongo: MongoConfig = new MongoConfig(process.env.MONGO_USER, process.env.MONGO_PASSWORD, process.env.MONGO_HOST);
let server: ServerConfig = new ServerConfig();

mongo.connect();
server.initServer([
    new ArticleRoute(),
    new UserRoute(),
    new AuthRoute()
]);