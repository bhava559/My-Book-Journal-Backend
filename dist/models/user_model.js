"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    roleArray: { type: [String], default: ['user'] },
    token: { type: String, default: '' },
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
