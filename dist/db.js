"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const myconfig_1 = require("../src/config/myconfig");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(myconfig_1.mongoUrl);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('DB connection error:', err);
    }
};
exports.connectDB = connectDB;
