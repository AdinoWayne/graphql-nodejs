import AuthRepository from "../repositories/AuthRepository";
import UserInterface from "../models/interface/UserInterface";
import ErrorException from "../base/ErrorException";
import Response from "../base/Response";
import User from "../models/User";

export default class AuthService {
    private repository: AuthRepository;

    constructor(){
        this.repository = new AuthRepository();
    };

    public async findUserById(id: string): Promise<UserInterface> {
        let user: UserInterface = await this.repository.findBy(id, "id", "-password");

        if(!user) throw new ErrorException(new Response("No user found."), 404);

        return user;
    }

    public async authentication(email: string, password: string): Promise<UserInterface> {
        
        let user: UserInterface = await this.repository.findBy(email, "email");

        if(!user) throw new ErrorException(new Response("Invalid Credentials."), 400);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            new ErrorException(new Response("Invalid Credentials."), 400);
        }

        return user;
    }

};