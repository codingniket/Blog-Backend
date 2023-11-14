import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedArticle: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogs' }],
});

export const UserModel = mongoose.model('users', userSchema);
