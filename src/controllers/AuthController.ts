import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import ErrorException from '../base/ErrorException';
import AuthService from '../services/AuthService';

export default class AuthController {
    
    private service: AuthService;

    constructor(){
        this.service = new AuthService();
    }

    onLogin = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            res.send(await this.service.authentication(email, password));
        } catch (ex){
            if(ex instanceof ErrorException) res.status(ex.code).send(ex.message)
            res.status(500).send(ex);
        }
    }

    onAuth = async (req: Request, res: Response) => {
        try {
            const { id } = req.user;
            res.send(await this.service.findUserById(id));
        } catch (ex){
            if(ex instanceof ErrorException) res.status(ex.code).send(ex.message)
            res.status(500).send(ex);
        }
    }
};