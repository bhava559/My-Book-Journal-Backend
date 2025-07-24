"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = configureRoutes;
const verify_token_1 = require("../middleware/verify_token");
const user_controller_1 = require("../controllers/user_controller");
function configureRoutes(app) {
    // app.post('/api/book/create', ioCheckAuth, ioCreateBook);
    // app.post('/api/book/list', ioCheckAuth, ioGetBookArray);
    // app.post('/api/book/update_read', ioCheckAuth, ioUpdateReadPage);
    // app.post('/api/book/delete', ioCheckAuth, ioDeleteBook);
    // app.post('/api/book/update', ioCheckAuth, ioUpdateBook);
    app.post('/api/user/create', verify_token_1.verifyToken, user_controller_1.ioCreateUser);
}
