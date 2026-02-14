import express from 'express';
const router = express.Router();
import {body} from "express-validator";

import {authUser} from '../middlewares/auth.middleware.js';

import {registerUser, loginUser, logoutUser, checkAuth } from '../controllers/auth-controller/index.js';

router.post('/register', [ 
  body('userEmail').isEmail().withMessage('Invalid Email'),
  body('userName').isLength({min:3}).withMessage('Fullname must be atleast 3 characters long'),
  body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
],
registerUser
);

router.post('/login', [
  body('userEmail').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min: 6}).withMessage('Password Invalid')
],
loginUser
);
router.get('/checkAuth', authUser, checkAuth);

router.get('/logout', authUser, logoutUser);


export default router;