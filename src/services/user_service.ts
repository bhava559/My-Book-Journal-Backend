import { UserModel, IUser } from '../models/user_model';
//TODO: rewrite this
export const createUser = async (firebaseUser: IUser) => {
  const email = firebaseUser.email;
  const name = firebaseUser.name || '';
  const image = firebaseUser.image || '';
  const token = firebaseUser.token || '';

  // console.log('✅ Token received in service:', token);
  // console.log(image);

  const userObject: IUser = {
    email: email,
    name: name,
    image: image,
    // roleArray: ['user'],
    token: token,
  };

  return await UserModel.dbFindOneAndUpdate(userObject); // TODO: need to use findOneAndUpdate() (or) create()

};
