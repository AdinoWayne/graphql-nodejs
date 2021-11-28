import UserInterface from '../models/interface/UserInterface';
import User from  '../models/User';
import ErrorException from '../base/ErrorException';
import RepositoryInterface from '../base/RepositoryInterface';

export default class AuthRepository implements RepositoryInterface {
    
    constructor(){};

    public async findBy(id: string, field: string, ): Promise<UserInterface> {
        
        //When the user isn't found I just need to throw the error to the above layer (in this case, the Service)
        let user: UserInterface = await User.findOne({[field]: id}).select('-password').catch(err => {
            throw Error();
        });       

        return user;
    };
    
    public async find(): Promise<UserInterface[]> {
        let users: UserInterface[] = await User.find();
        
        return users;
    };

    public async save(user: UserInterface): Promise<void> {
        await user.save().catch(err => {
            throw new ErrorException(err.message, 500);
        });
    }

    public async edit(id: number, user: UserInterface): Promise<void> {
        let findUser = await User.findByIdAndUpdate(id, user, (err) => {
            if(err) throw new ErrorException(err.message, 500);
        });
    }
    
    public async delete(id: number): Promise<void> {
        let user = await User.findByIdAndDelete(id, (err) => {
            if(err) throw new ErrorException(err.message, 500);
        });
    }
};
