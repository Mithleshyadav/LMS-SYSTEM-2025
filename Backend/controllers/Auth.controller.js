const userModel = require('../models/User.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');


module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array() 
      });
    }
    
    const {username, email, password, role, secretkey} = req.body;
    
    if(role === 'Instructor') {
      if(secretkey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Secret key',
          errorCode: 'INVALID_ADMIN_KEY'
        });
      }
    }
    
    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
        errorCode: 'EMAIL_EXISTS'
      });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      username,
      email, 
      password: hashedPassword,
      role
    });

    const token = user.generateAuthToken();
    
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorCode: 'SERVER_ERROR'
    });
  }
}


module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        errorCode: 'AUTH_ERROR'
      });
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        errorCode: 'AUTH_ERROR'
      });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorCode: 'SERVER_ERROR'
    });
  }
}