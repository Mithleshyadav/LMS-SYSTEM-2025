import userModel from '../models/user.model.js';
import {createUser} from'../services/user.service.js';
import {validationResult} from 'express-validator';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import { genTokenAndSetCookie } from '../services/genTokenAndSetCookie.js';


export const registerUser = async (req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array() });
  }

  const {fullname,email, password, confirmPassword } = req.body;
try {
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

const isUserAlreadyExist = await userModel.findOne({email});

if(isUserAlreadyExist) {
  res.status(400).json({message: 'User already exist'});
}

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    fullname,
    email, 
    password: hashedPassword
  });

  if(!user){
    return res.status(400).json({message:'User not created'});
  }
  await genTokenAndSetCookie(user._id, res); 

 
} 
catch (error) {
  console.log(error);
  res.status(500).json({ error: "Internal server error" });
}
}


export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  
  const {email, password} = req.body;
    try {
      
  const user = await userModel.findOne({email}).select('+password');

  if(!user) {
    return res.status(401).json({message: 'Invalid email or password'});
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({message: 'Invalid email or password'});
  }

  await genTokenAndSetCookie(user._id, res); 

  // const token = user.generateAuthToken();
  // res.cookie('token', token);
  // res.status(201).json({token, user});
}
catch (error) {
  console.log(error);
  res.status(500).json({ error: "Internal server error" });
}
}


export const logoutUser = async (req, res, next) => {
  try {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided for logout' });
  }
  
  await blacklistTokenModel.create({token});

  res.status(200).json({message: 'Logged out successfully'});
} catch (error) {
  console.log(error);
  res.status(500).json({ error: "Internal server error" });
}
};



export const getMe = async (req, res) => {
  try {
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ message: 'User validation failed' });
    }

    return res.status(200).json(loggedInUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
