"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const firebase_admin_1 = __importDefault(require("../firebase_service/firebase_admin"));
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No or malformed token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.firebaseUser = decoded;
        // (req as any).user = decoded;
        next();
    }
    catch (err) {
        console.error('❌ Token verification failed:', err);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
