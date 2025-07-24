"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioCreateUser = void 0;
const user_service_1 = require("../services/user_service");
const ioCreateUser = async (req, res) => {
    try {
        const { email, name, image, token } = req.body;
        const result = await (0, user_service_1.createUser)({ email, name, image, token });
        res.json({ success: true, message: 'User created', data: result });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
};
exports.ioCreateUser = ioCreateUser;
