import { Application } from 'express';
import RouteInterface from '../models/interface/RouteInterface';
import { check } from 'express-validator/check';
import UserController from '../controllers/UserController';

export default class UserRoute implements RouteInterface {

    private controller: UserController;

    constructor(){
        this.controller = new UserController();
    }

    public applyRoute(app: Application): void {

        app.post('/api/users',
        [
            check('name', 'Name is required')
              .not()
              .isEmpty(),
            check('email', 'Please include a valid email').isEmail(),
            check(
              'password',
              'Please enter a password with 6 or more characters'
            ).isLength({ min: 6 })
          ]
        , this.controller.onRegister);

    }
};
