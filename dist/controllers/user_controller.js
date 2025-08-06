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
exports.UserController = void 0;
const user_service_1 = require("../services/user_service");
class UserController {
    static ioCreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, image, token } = req.body;
                if (!email)
                    return res.status(500).json({ failure: true, message: 'EmailId is null' });
                if (!name)
                    return res.status(500).json({ failure: true, message: 'Name is null' });
                if (!image)
                    return res.status(500).json({ failure: true, message: 'Image is null' });
                if (!token)
                    return res.status(500).json({ failure: true, message: 'Token is null' });
                const userData = { email, name, image, token };
                const result = yield (0, user_service_1.createUser)(userData);
                res.json({ success: true, message: 'User created', data: result });
            }
            catch (err) {
                res.status(500).json({ success: false, message: 'Error creating user' });
            }
        });
    }
}
exports.UserController = UserController;
