"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.BaseModel = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
//TODO: remove required.
const userSchema = new mongoose_1.default.Schema({
    userId: { type: String, unique: true, default: () => (0, crypto_1.randomUUID)() },
    email: { type: String },
    name: { type: String },
    image: { type: String, default: '' },
    roleArray: { type: [String], default: ['user'] },
    token: { type: String, default: '' },
});
exports.BaseModel = mongoose_1.default.model('User', userSchema);
class UserModel {
    static async dbFindOne(email) {
        return exports.BaseModel.findOne({ email }).lean();
    }
    static async dbFindOneAndUpdate(user) {
        return exports.BaseModel.findOneAndUpdate({ email: user.email }, { $set: user }, { upsert: true, new: true, setDefaultsOnInsert: true }).lean(); //TODO study this and modify this.
    }
}
exports.UserModel = UserModel;
