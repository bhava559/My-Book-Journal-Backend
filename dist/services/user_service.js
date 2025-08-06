"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_model_1 = require("../models/user_model");
//TODO: rewrite this
const createUser = (firebaseUser) => __awaiter(void 0, void 0, void 0, function* () {
    const email = firebaseUser.email;
    const name = firebaseUser.name || '';
    const image = firebaseUser.image || '';
    const token = firebaseUser.token || '';
    // console.log('✅ Token received in service:', token);
    // console.log(image);
    const userObject = {
        email: email,
        name: name,
        image: image,
        // roleArray: ['user'],
        token: token,
    };
    return yield user_model_1.UserModel.dbFindOneAndUpdate(userObject); // TODO: need to use findOneAndUpdate() (or) create()
});
exports.createUser = createUser;
