import express from 'express';
const router = express.Router();
import {body} from "express-validator";

import {authUser} from '../middlewares/auth.middleware.js';

import {registerUser, loginUser, logoutUser, getMe } from '../controllers/user.controller.js';

router.post('/register', [ 
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname').isLength({min:3}).withMessage('Fullname must be atleast 3 characters long'),
  body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
],
registerUser
);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min: 6}).withMessage('Password Invalid')
],
loginUser
);
router.post('/getMe', authUser, getMe);

router.get('/logout', authUser, logoutUser);


export default router;