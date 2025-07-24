"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioCheckAuth = ioCheckAuth;
exports.ioCheckAdmin = ioCheckAdmin;
const verify_token_1 = require("./verify_token");
const user_model_1 = require("../models/user_model");
const myconfig_1 = require("../config/myconfig");
const user_service_1 = require("../services/user_service");
async function ioCheckAuth(req, res, next) {
    await (0, verify_token_1.verifyToken)(req, res, async () => {
        const firebaseUser = req.firebaseUser;
        const firebaseEmail = firebaseUser.email;
        let user = await user_model_1.UserModel.findOne({ email: firebaseEmail });
        if (!user) {
            try {
                // ✅ Create user using Firebase token
                user = await (0, user_service_1.createUser)(firebaseUser);
            }
            catch (err) {
                console.error('❌ Error creating user from token:', err);
                return res.status(500).json({ success: false, message: 'Failed to create user' });
            }
        }
        req.body.currentUser = user;
        next();
    });
}
async function ioCheckAdmin(req, res, next) {
    await ioCheckAuth(req, res, () => {
        const currentUser = req.body.currentUser;
        if (currentUser.email !== myconfig_1.adminEmail) {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }
        next();
    });
}
