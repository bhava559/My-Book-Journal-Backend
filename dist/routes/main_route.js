"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = configureRoutes;
const verify_token_1 = require("../middleware/verify_token");
const auth_middleware_1 = require("../middleware/auth_middleware");
const user_controller_1 = require("../controllers/user_controller");
const book_controller_1 = require("../controllers/book_controller");
function configureRoutes(app) {
    app.post('/api/user/create', verify_token_1.verifyToken, user_controller_1.UserController.ioCreateUser);
    app.post('/api/book/create', auth_middleware_1.ioCheckAdmin, book_controller_1.BookController.ioCreateBook); // only admin
    app.post('/api/book/list', auth_middleware_1.ioCheckAuth, book_controller_1.BookController.ioGetBookArray); // all users
    app.post('/api/book/update', auth_middleware_1.ioCheckAdmin, book_controller_1.BookController.ioUpdateBook); // only admin
    app.post('/api/book/delete', auth_middleware_1.ioCheckAdmin, book_controller_1.BookController.ioDeleteBook); // only admin
    app.post('/api/book/update_read', auth_middleware_1.ioCheckAuth, book_controller_1.BookController.ioUpdateReadPages); // all users
}
