"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_model_1 = require("../models/user_model");
//TODO: rewrite this
const createUser = async (firebaseUser) => {
    const email = firebaseUser.email;
    const name = firebaseUser.name || '';
    const image = firebaseUser.image || '';
    const token = firebaseUser.token || '';
    console.log('✅ Token received in service:', token);
    console.log(image);
    const userObject = {
        email: email,
        name: name,
        image: image,
        // roleArray: ['user'],
        token: token,
    };
    return await user_model_1.UserModel.dbFindOneAndUpdate(userObject); // TODO: need to use findOneAndUpdate() (or) create()
};
exports.createUser = createUser;
