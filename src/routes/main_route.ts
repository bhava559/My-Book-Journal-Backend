import { Express } from 'express-serve-static-core';
import { verifyToken } from '../middleware/verify_token';
import { ioCheckAuth, ioCheckAdmin } from '../middleware/auth_middleware';
import { UserController } from '../controllers/user_controller';
import { BookController } from '../controllers/book_controller';
import { ActivityController } from '../controllers/activity_controller';
import { WishlistController } from '../controllers/wishlist_controller';

export function configureRoutes(app: Express) {

  //User routes
  app.post('/api/user/create', verifyToken, UserController.ioCreateUser);

  //Book routes
  app.post('/api/book/create', ioCheckAdmin, BookController.ioCreateBook); // only admin
  app.post('/api/book/list', ioCheckAuth, BookController.ioGetBookArray);  // all users
  app.post('/api/book/get_by_id', ioCheckAuth, BookController.ioGetBookById);  // all users
  app.post('/api/book/update', ioCheckAdmin, BookController.ioUpdateBook); // only admin
  app.post('/api/book/delete', ioCheckAdmin, BookController.ioDeleteBook); // only admin
  app.post('/api/book/update_read', ioCheckAuth, BookController.ioUpdateReadPages); // all users

  // Activity routes (common)
  app.post('/api/activity/update', verifyToken, ioCheckAuth, ActivityController.ioUpdateActivity);
  app.post('/api/activity/get', verifyToken, ioCheckAuth, ActivityController.ioGetActivity);

  //Wishlist routes
  app.post('/api/wishlist/add', ioCheckAuth, WishlistController.ioAddToWishlist); // add book to wishlist
  app.post('/api/wishlist/remove', ioCheckAuth, WishlistController.ioRemoveFromWishlist); // remove book
  app.post('/api/wishlist/get', ioCheckAuth, WishlistController.ioGetWishlist); // get book list

}