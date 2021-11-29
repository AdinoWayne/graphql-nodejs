import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import ErrorException from '../base/ErrorException';
import UserService from '../services/UserService';

export default class UserController {
    
    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    onRegister = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password } = req.body;
            res.send(await this.service.storeUser(name, email, password));
        }  catch (ex){
            if(ex instanceof ErrorException) res.status(ex.code).send(ex.message)
            res.status(500).send(ex);
        }
    }
};