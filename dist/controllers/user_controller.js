"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user_service");
class UserController {
    static async ioCreateUser(req, res) {
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
            const result = await (0, user_service_1.createUser)(userData);
            res.json({ success: true, message: 'User created', data: result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: 'Error creating user' });
        }
    }
}
exports.UserController = UserController;
