import userModel from '../models/User.model.js';


 export const createUser = async ({
  userName, userEmail, password
}) => {
  if(!userName || !userEmail || !password) {
    throw new Error('All fields are required');
  }
  const user = userModel.create({
    userName,
    userEmail,
    password
  })
  return user;
}

