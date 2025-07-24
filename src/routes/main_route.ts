import { Express } from 'express-serve-static-core';
import { ioCheckAuth, ioCheckAdmin } from '../middleware/auth_middleware';
import { verifyToken } from '../middleware/verify_token';
import {
  ioCreateBook,
  ioGetBookArray,
  ioUpdateReadPage,
  ioDeleteBook,
  ioUpdateBook,
} from '../controllers/book_controller';
import { ioCreateUser } from '../controllers/user_controller'; 

export function configureRoutes(app: Express) {
  // app.post('/api/book/create', ioCheckAuth, ioCreateBook);
  // app.post('/api/book/list', ioCheckAuth, ioGetBookArray);
  // app.post('/api/book/update_read', ioCheckAuth, ioUpdateReadPage);
  // app.post('/api/book/delete', ioCheckAuth, ioDeleteBook);
  // app.post('/api/book/update', ioCheckAuth, ioUpdateBook);

  app.post('/api/user/create', verifyToken, ioCreateUser); 
}
 
  
  