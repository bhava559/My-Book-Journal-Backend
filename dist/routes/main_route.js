"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = configureRoutes;
const verify_token_1 = require("../middleware/verify_token");
const auth_middleware_1 = require("../middleware/auth_middleware");
const user_controller_1 = require("../controllers/user_controller");
const book_controller_1 = require("../controllers/book_controller");
const activity_controller_1 = require("../controllers/activity_controller");
const wishlist_controller_1 = require("../controllers/wishlist_controller");
function configureRoutes(app) {
    //User routes
    app.post('/api/user/create', verify_token_1.verifyToken, user_controller_1.UserController.ioCreateUser);
    //Book routes
    app.post('/api/book/create', auth_middleware_1.ioCheckAdmin, book_controller_1.BookController.ioCreateBook); // only admin
    app.post('/api/book/list', auth_middleware_1.ioCheckAuth, book_controller_1.BookController.ioGetBookArray); // all users
    app.post('/api/book/get_by_id', auth_middleware_1.ioCheckAuth, book_controller_1.BookController.ioGetBookById); // all users
    app.post('/api/book/update', auth_middleware_1.ioCheckAdmin, book_controller_1.BookController.ioUpdateBook); // only admin
    app.post('/api/book/delete', auth_middleware_1.ioCheckAdmin, book_controller_1.BookController.ioDeleteBook); // only admin
    app.post('/api/book/update_read', auth_middleware_1.ioCheckAuth, book_controller_1.BookController.ioUpdateReadPages); // all users
    // Activity routes (common)
    app.post('/api/activity/update', verify_token_1.verifyToken, auth_middleware_1.ioCheckAuth, activity_controller_1.ActivityController.ioUpdateActivity);
    app.post('/api/activity/get', verify_token_1.verifyToken, auth_middleware_1.ioCheckAuth, activity_controller_1.ActivityController.ioGetActivity);
    //Wishlist routes
    app.post('/api/wishlist/add', auth_middleware_1.ioCheckAuth, wishlist_controller_1.WishlistController.ioAddToWishlist); // add book to wishlist
    app.post('/api/wishlist/remove', auth_middleware_1.ioCheckAuth, wishlist_controller_1.WishlistController.ioRemoveFromWishlist); // remove book
    app.post('/api/wishlist/get', auth_middleware_1.ioCheckAuth, wishlist_controller_1.WishlistController.ioGetWishlist); // get book list
}
