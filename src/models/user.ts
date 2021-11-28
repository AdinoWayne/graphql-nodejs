import mongoose, {Schema} from 'mongoose';
import UserInterface from './interface/UserInterface';

const userSchema: Schema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
}, {
    versionKey: false
});

export default mongoose.model<UserInterface>('User', userSchema);