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
exports.ioCheckAuth = ioCheckAuth;
exports.ioCheckAdmin = ioCheckAdmin;
const verify_token_1 = require("./verify_token");
const user_model_1 = require("../models/user_model");
const myconfig_1 = require("../config/myconfig");
const user_service_1 = require("../services/user_service");
function ioCheckAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, verify_token_1.verifyToken)(req, res, () => __awaiter(this, void 0, void 0, function* () {
            const firebaseUser = req.firebaseUser;
            console.log('✅ Firebase User:', firebaseUser);
            const firebaseEmail = firebaseUser.email;
            let user = yield user_model_1.UserModel.dbFindOne(firebaseEmail);
            if (!user) {
                try {
                    user = yield (0, user_service_1.createUser)(firebaseUser);
                }
                catch (err) {
                    console.error('❌ Error creating user from token:', err);
                    return res.status(500).json({ success: false, message: 'Failed to create user' });
                }
            }
            if (!req.body)
                req.body = {}; // ← add this
            req.body.currentUser = user;
            next();
        }));
    });
}
function ioCheckAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ioCheckAuth(req, res, () => {
            const currentUser = req.body.currentUser;
            if (currentUser.email !== myconfig_1.adminEmail) {
                return res.status(403).json({ success: false, message: 'Admin access denied' });
            }
            next();
        });
    });
}
