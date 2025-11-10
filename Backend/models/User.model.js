import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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
role: {
  type: String,
  enum: ['student', 'instructor'],
  default: 'student',
}

},
{ timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
  
}

// ✅ Prevent OverwriteModelError
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;

