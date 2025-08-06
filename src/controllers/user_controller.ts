import { Request, Response } from 'express';
import { createUser } from '../services/user_service';
import { IUser } from '../models/user_model';


export class UserController {
  static async ioCreateUser(req: Request, res: Response) {
    try {
      const { email, name, image, token } = req.body;
      if (!email) return res.status(500).json({ failure: true, message: 'EmailId is null' });
      if (!name) return res.status(500).json({ failure: true, message: 'Name is null' });
      if (!image) return res.status(500).json({ failure: true, message: 'Image is null' });
      if (!token) return res.status(500).json({ failure: true, message: 'Token is null' });

      const userData: IUser = { email, name, image, token };
      const result = await createUser(userData);
      res.json({ success: true, message: 'User created', data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error creating user' });
    }
  }
}
