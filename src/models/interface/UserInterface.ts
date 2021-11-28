import { Document } from 'mongoose';

export default interface UserInterface extends Document {
    name: string,
    email: string,
    avatar?: string,
    date?: Date
};