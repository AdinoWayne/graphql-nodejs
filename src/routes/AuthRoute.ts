import { Application } from 'express';
import RouteInterface from '../models/interface/RouteInterface';
import AuthController from '../controllers/AuthController';
import { check } from 'express-validator/check';
var auth = require('./../middleware/auth');
export default class AuthRoute implements RouteInterface {

    private controller: AuthController;

    constructor(){
        this.controller = new AuthController();
    }

    public applyRoute(app: Application): void {

        app.get('/api/auth', auth, this.controller.onAuth);

        app.post('/api/auth',
        [
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password is required').exists()
        ]
        , this.controller.onLogin);

    }
};
