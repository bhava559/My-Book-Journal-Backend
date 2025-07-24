"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_model_1 = require("../models/user_model");
const uuid_1 = require("uuid");
const createUser = async (firebaseUser) => {
    const email = firebaseUser.email;
    const name = firebaseUser.name || '';
    const image = firebaseUser.image || '';
    const token = firebaseUser.token || '';
    console.log('✅ Token received in service:', token);
    console.log(image);
    let user = await user_model_1.UserModel.findOne({ email: email });
    if (!user) {
        const userId = (0, uuid_1.v4)();
        user = new user_model_1.UserModel({
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
exports.createUser = createUser;
