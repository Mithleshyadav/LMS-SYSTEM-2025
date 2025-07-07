import userModel from '../models/user.model.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';

import jwt from 'jsonwebtoken';

// Middleware to authenticate a regular user
export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    
    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    // Verify the token and attach the user to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

 