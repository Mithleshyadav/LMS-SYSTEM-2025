import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    required: true,
    minlength:[3, 'Full name must be at least 3 characters long'],
  },

userEmail: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
},
password: {
  type: String,
  required: true,
  select: false,
  minlength:[6, 'Password must be at least 6 characters long'],
},

},
{ timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
  
}

const userModel = mongoose.model('user', userSchema);

export default userModel;
