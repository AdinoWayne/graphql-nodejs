import UserInterface from '../models/interface/UserInterface';
import User from  '../models/User';
import ErrorException from '../base/ErrorException';
import RepositoryInterface from '../base/RepositoryInterface';

export default class UserRepository implements RepositoryInterface {
    
    constructor(){};

    public async findById(id: string): Promise<UserInterface> {

        let user: UserInterface = await User.findOne({"_id": id}).catch(err => {
            throw Error();
        });       

        return user;
    };
    
    public async findByGetAll(id: string, field: string): Promise<UserInterface> {
        
        let user: UserInterface = await User.findOne({[field]: id}).catch(err => {
            throw Error();
        });       

        return user;
    };

    public async store(name:string, email:string, avatar:string, password:string ): Promise<UserInterface> {
        return await new User({
            name,
            email,
            avatar,
            password
        });
    }

    public async find(): Promise<UserInterface[]> {
        let users: UserInterface[] = await User.find();
        
        return users;
    };

    public async save(user: UserInterface): Promise<void> {
        await user.save().catch(err => {
            throw new ErrorException(err.message, 500);
        });
    }

    public async edit(id: number, user: UserInterface): Promise<void> {}
    
    public async delete(id: number): Promise<void> {}
};
