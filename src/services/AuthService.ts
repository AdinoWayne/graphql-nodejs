import AuthRepository from "../repositories/AuthRepository";
import UserInterface from "../models/interface/UserInterface";
import ErrorException from "../base/ErrorException";
import Response from "../base/Response";
import jwt from "jsonwebtoken";
const bcrypt = require('bcryptjs');
export default class AuthService {
    private repository: AuthRepository;

    constructor(){
        this.repository = new AuthRepository();
    };

    public async findUserById(id: string): Promise<UserInterface | ErrorException> {
        let user: UserInterface = await this.repository.findById(id);

        if(!user) throw new ErrorException(new Response("No user found."), 404);

        return user;
    }

    public async authentication(email: string, password: string): Promise<Response | ErrorException> {
        
        let user: UserInterface = await this.repository.findByGetAll(email, "email");

        if(!user) throw new ErrorException(new Response("Invalid Credentials."), 400);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            new ErrorException(new Response("Invalid Credentials."), 400);
        }
        const payload = {
            user: {
              id: user.id
            }
        };

        return new Response(jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 360000 }
        ));
    }

};