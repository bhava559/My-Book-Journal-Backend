import { UserModel } from '../models/user_model';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (firebaseUser: any) => {
  const email = firebaseUser.email;
  const name = firebaseUser.name || '';
  const image = firebaseUser.image || '';
  const token = firebaseUser.token || '';


  console.log('✅ Token received in service:', token);

  console.log(image);

  let user = await UserModel.findOne({ email: email });

  if (!user) {
    const userId = uuidv4();
    user = new UserModel({
      userId: userId,
      email: email,
      name: name,
      image: image,
      roleArray: ['user'],
      token: token,
    });
    await user.save();
  }

  return user;
};
