import UserRepository from "../repositories/UserRepository";
import UserInterface from "../models/interface/UserInterface";
import ErrorException from "../base/ErrorException";
import Response from "../base/Response";
import jwt from "jsonwebtoken";
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
export default class AuthService {
    private repository: UserRepository;

    constructor(){
        this.repository = new UserRepository();
    };

    public async storeUser(name: string, email: string, password: string): Promise<Response | ErrorException> {
        
        let user: UserInterface = await this.repository.findByGetAll(email, "email");

        if(user) throw new ErrorException(new Response("User already exists"), 400);

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        let store = await this.repository.store(name, email, avatar, password);

        const salt = await bcrypt.genSalt(10);

        store.password = await bcrypt.hash(password, salt);

        await this.repository.save(store);
        const payload = {
            store: {
              id: store.id
            }
          };
    
        return new Response(jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 360000 }
        ));
    }

};