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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const firebase_admin_1 = __importDefault(require("../firebase_service/firebase_admin"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No or malformed token provided' });
    }
    const token = authHeader.split(' ')[1];
    // if(token === "FSbTo655bqfDJkbW4ZLt5MOsv9D8DXZA"){
    //   req.firebaseUser = {
    //     //your
    //   }
    //   next();
    //   return;
    // }
    try {
        const decoded = yield firebase_admin_1.default.auth().verifyIdToken(token);
        req.firebaseUser = decoded;
        // (req as any).user = decoded;
        next();
    }
    catch (err) {
        console.error('❌ Token verification failed:', err);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});
exports.verifyToken = verifyToken;
